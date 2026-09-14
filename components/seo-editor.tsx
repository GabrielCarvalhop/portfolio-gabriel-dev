'use client';

import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight,
  Check,
  Download,
  Globe2,
  LockKeyhole,
  RotateCcw,
  Save,
  Search,
  Share2,
  SlidersHorizontal,
} from 'lucide-react';
import { validateSeo, type SeoSettings, type SeoErrors } from '@/lib/seo-schema';
import { BrandMark } from '@/components/brand-mark';

const tabs = [
  { id: 'busca', label: 'Busca', icon: Search },
  { id: 'social', label: 'Compartilhamento', icon: Share2 },
  { id: 'indexacao', label: 'Indexação', icon: Globe2 },
] as const;
type Tab = (typeof tabs)[number]['id'];
type TextField = Exclude<keyof SeoSettings, 'indexable'>;
const fieldTabs: Record<keyof SeoSettings, Tab> = {
  title: 'busca',
  description: 'busca',
  socialTitle: 'social',
  socialDescription: 'social',
  url: 'indexacao',
  indexable: 'indexacao',
};

export function SeoEditor({ initial }: { initial: SeoSettings }) {
  const [saved, setSaved] = useState(initial);
  const [draft, setDraft] = useState(initial);
  const [tab, setTab] = useState<Tab>('busca');
  const [errors, setErrors] = useState<SeoErrors>({});
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [failed, setFailed] = useState(false);
  const [device, setDevice] = useState<'desktop' | 'mobile'>('desktop');
  const focusField = useRef<keyof SeoSettings | null>(null);
  const [draftReady, setDraftReady] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  useEffect(() => {
    let live = true;
    queueMicrotask(() => {
      if (!live) return;
      try {
        const stored = JSON.parse(sessionStorage.getItem('portfolio-seo-draft') || 'null');
        if (
          stored?.base === JSON.stringify(initial) &&
          stored.draft &&
          Object.keys(initial).every(
            (key) => typeof stored.draft[key] === typeof initial[key as keyof SeoSettings],
          )
        ) {
          setDraft(stored.draft);
          setMessage('Rascunho recuperado. Revise e salve quando estiver pronto.');
        }
      } catch {
        /* Storage can be unavailable in private browsing. */
      }
      setDraftReady(true);
    });
    return () => {
      live = false;
    };
  }, [initial]);
  useEffect(() => {
    if (!draftReady) return;
    try {
      if (dirty)
        sessionStorage.setItem(
          'portfolio-seo-draft',
          JSON.stringify({ base: JSON.stringify(saved), draft }),
        );
      else sessionStorage.removeItem('portfolio-seo-draft');
    } catch {
      /* Saving to the project remains available without browser storage. */
    }
  }, [draft, saved, dirty, draftReady]);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => {
      event.preventDefault();
    };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  useEffect(() => {
    if (focusField.current) {
      form.current?.querySelector<HTMLElement>(`#seo-${focusField.current}`)?.focus();
      focusField.current = null;
    }
  }, [tab, errors]);

  function update<K extends keyof SeoSettings>(key: K, value: SeoSettings[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setMessage('');
  }
  function showErrors(next: SeoErrors) {
    setErrors(next);
    const field = Object.keys(next)[0] as keyof SeoSettings | undefined;
    if (field) {
      setTab(fieldTabs[field]);
      focusField.current = field;
    }
  }
  async function save() {
    const result = validateSeo(draft);
    if (!result.settings) {
      showErrors(result.errors);
      return;
    }
    setBusy(true);
    setMessage('');
    setFailed(false);
    try {
      const response = await fetch('/api/seo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.settings),
      });
      const body = await response.json();
      if (!response.ok) {
        if (body.errors) showErrors(body.errors);
        throw new Error(body.message || 'Não foi possível salvar. Tente novamente.');
      }
      setSaved(body.settings);
      setDraft(body.settings);
      setErrors({});
      setMessage('Alterações salvas e aplicadas ao site local.');
    } catch (error) {
      setFailed(true);
      setMessage(
        error instanceof Error ? error.message : 'Falha de conexão. Seus ajustes continuam aqui.',
      );
    } finally {
      setBusy(false);
    }
  }
  function download() {
    const file = URL.createObjectURL(
      new Blob([JSON.stringify(saved, null, 2)], { type: 'application/json' }),
    );
    const link = document.createElement('a');
    link.href = file;
    link.download = 'seo-settings.json';
    link.click();
    setTimeout(() => URL.revokeObjectURL(file), 1000);
  }
  const field = (key: TextField, label: string, hint: string, max: number, multiline = false) => {
    const common = {
      id: `seo-${key}`,
      name: key,
      value: draft[key],
      maxLength: max,
      'aria-invalid': Boolean(errors[key]),
      'aria-describedby': `seo-${key}-hint${errors[key] ? ` seo-${key}-error` : ''}`,
      onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        update(key, event.target.value),
    };
    return (
      <div className="seo-field">
        <label htmlFor={common.id}>{label}</label>
        {multiline ? (
          <textarea {...common} rows={4} />
        ) : (
          <input {...common} type={key === 'url' ? 'url' : 'text'} spellCheck={key !== 'url'} />
        )}
        <div className="seo-field-help">
          <p id={`seo-${key}-hint`}>{hint}</p>
          <span className="mono">
            {draft[key].length}/{max}
          </span>
        </div>
        {errors[key] && (
          <p className="seo-error" id={`seo-${key}-error`} role="alert">
            {errors[key]}
          </p>
        )}
      </div>
    );
  };
  let domain = 'seudominio.com.br';
  try {
    domain = new URL(draft.url).host;
  } catch {
    /* The preview stays usable while a URL is being entered. */
  }

  return (
    <>
      <div className="seo-heading">
        <div>
          <h1>
            Seu site, <span>bem apresentado.</span>
          </h1>
          <p>Configure o que aparece antes do primeiro clique.</p>
        </div>
        <a className="seo-back text-link" href="/" target="_blank" rel="noopener noreferrer">
          Ver portfólio <ArrowUpRight size={16} />
        </a>
      </div>
      <div className="seo-toolbar">
        <div>
          <SlidersHorizontal size={18} />
          <h2>Configurações de SEO</h2>
        </div>
        <span className="seo-local">
          <LockKeyhole size={13} /> Editor local
        </span>
      </div>
      <div className="seo-workspace">
        <form
          ref={form}
          onSubmit={(event) => {
            event.preventDefault();
            void save();
          }}
          noValidate
        >
          <div className="seo-tabs" role="tablist" aria-label="Configurações de SEO">
            {tabs.map(({ id, label, icon: Icon }, index) => (
              <button
                key={id}
                type="button"
                id={`tab-${id}`}
                role="tab"
                aria-selected={tab === id}
                aria-controls={`panel-${id}`}
                tabIndex={tab === id ? 0 : -1}
                onClick={() => setTab(id)}
                onKeyDown={(event) => {
                  const next =
                    event.key === 'ArrowRight'
                      ? (index + 1) % tabs.length
                      : event.key === 'ArrowLeft'
                        ? (index + tabs.length - 1) % tabs.length
                        : event.key === 'Home'
                          ? 0
                          : event.key === 'End'
                            ? tabs.length - 1
                            : -1;
                  if (next >= 0) {
                    event.preventDefault();
                    setTab(tabs[next].id);
                    document.getElementById(`tab-${tabs[next].id}`)?.focus();
                  }
                }}
              >
                <Icon size={16} />
                <span>{label}</span>
              </button>
            ))}
          </div>
          <fieldset disabled={busy} className="seo-fields">
            <legend className="sr-only">Dados de SEO</legend>
            <div
              role="tabpanel"
              id="panel-busca"
              aria-labelledby="tab-busca"
              hidden={tab !== 'busca'}
            >
              <h3>A primeira impressão nas buscas.</h3>
              <p className="seo-intro">
                Título e descrição da página inicial. Cada projeto mantém seus próprios metadados.
              </p>
              {field('title', 'Título da página', 'Diga quem você é e o que faz.', 120)}
              {field(
                'description',
                'Descrição',
                'Apresente seu trabalho com clareza, em poucas frases.',
                320,
                true,
              )}
              <p className="seo-footnote">
                A prévia é uma aproximação. O buscador pode adaptar o texto e o recorte.{' '}
                <a
                  href="https://developers.google.com/search/docs/appearance/snippet"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Como funciona <ArrowUpRight size={12} />
                </a>
              </p>
            </div>
            <div
              role="tabpanel"
              id="panel-social"
              aria-labelledby="tab-social"
              hidden={tab !== 'social'}
            >
              <h3>Uma boa apresentação, em qualquer conversa.</h3>
              <p className="seo-intro">
                Personalize o cartão exibido ao compartilhar a página inicial.
              </p>
              {field(
                'socialTitle',
                'Título de compartilhamento',
                'Uma mensagem curta para identificar o portfólio.',
                120,
              )}
              {field(
                'socialDescription',
                'Descrição de compartilhamento',
                'Complemente o título com sua especialidade.',
                320,
                true,
              )}
              <div className="seo-image-note">
                <Share2 size={18} />
                <p>
                  A imagem é gerada com estes textos e a identidade do portfólio. Ela é atualizada
                  ao salvar.
                </p>
              </div>
            </div>
            <div
              role="tabpanel"
              id="panel-indexacao"
              aria-labelledby="tab-indexacao"
              hidden={tab !== 'indexacao'}
            >
              <h3>O endereço certo. As regras certas.</h3>
              <p className="seo-intro">Defina o domínio usado nos links canônicos e no sitemap.</p>
              {field(
                'url',
                'Endereço principal do site',
                'Domínio completo, sem caminhos. Exemplo: https://seudominio.com.br',
                240,
              )}
              <label className="seo-toggle" htmlFor="seo-indexable">
                <span>
                  <strong>Permitir indexação</strong>
                  <small>Autoriza os buscadores a indexar as páginas públicas.</small>
                </span>
                <input
                  id="seo-indexable"
                  type="checkbox"
                  role="switch"
                  checked={draft.indexable}
                  onChange={(event) => update('indexable', event.target.checked)}
                  aria-describedby="index-help"
                  aria-invalid={Boolean(errors.indexable)}
                />
              </label>
              <p
                id="index-help"
                className={errors.indexable ? 'seo-error' : 'seo-footnote'}
                role={errors.indexable ? 'alert' : undefined}
              >
                {errors.indexable ||
                  'Mantenha desativado enquanto o site estiver em preparação. Ativar não garante presença ou posição nas buscas.'}
              </p>
              <div className="seo-resources">
                <a href="/robots.txt" target="_blank" rel="noopener noreferrer">
                  <span>Regras de indexação</span>
                  <code>robots.txt</code>
                  <ArrowUpRight size={15} />
                </a>
                <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer">
                  <span>Mapa das páginas</span>
                  <code>sitemap.xml</code>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </fieldset>
          <div className="seo-savebar">
            <span className="seo-state">
              {busy ? 'Salvando…' : dirty ? 'Alterações não salvas' : 'Tudo salvo'}
            </span>
            <div>
              <button
                className="seo-reset"
                type="button"
                disabled={!dirty || busy}
                onClick={() => {
                  setDraft(saved);
                  setErrors({});
                  setMessage('Alterações descartadas.');
                  setFailed(false);
                }}
              >
                <RotateCcw size={15} /> Descartar
              </button>
              <button className="button button-primary" type="submit" disabled={!dirty || busy}>
                <Save size={16} />
                {busy ? 'Salvando…' : 'Salvar alterações'}
              </button>
            </div>
          </div>
          <p
            className={`seo-feedback ${failed ? 'seo-error' : ''}`}
            role="status"
            aria-live="polite"
          >
            {message}
          </p>
        </form>
        <aside className="seo-preview" aria-label="Prévia de SEO">
          <div className="seo-preview-heading">
            <span>Prévia ao vivo</span>
            <span className="seo-preview-status">
              <i />
              {dirty ? 'Rascunho' : 'Salvo'}
            </span>
          </div>
          {tab === 'social' ? (
            <div className="seo-social-preview">
              <div className="seo-social-art">
                <span className="seo-social-monogram">
                  <BrandMark width="6.3cqi" height="5.1cqi" />
                </span>
                <strong
                  style={{
                    fontSize:
                      draft.socialTitle.length > 65
                        ? '3.33cqi'
                        : draft.socialTitle.length > 38
                          ? '4.5cqi'
                          : '6cqi',
                  }}
                >
                  {draft.socialTitle || 'Título de compartilhamento'}
                </strong>
                <span
                  style={{ fontSize: draft.socialDescription.length > 160 ? '1.75cqi' : '2.25cqi' }}
                >
                  {draft.socialDescription || 'Descrição de compartilhamento'}
                </span>
                <div>DESIGN + CÓDIGO + PRODUTO</div>
              </div>
              <div className="seo-social-caption">
                <span>{domain}</span>
                <strong>{draft.socialTitle || 'Título de compartilhamento'}</strong>
                <p>{draft.socialDescription || 'Descrição de compartilhamento'}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="seo-device" role="group" aria-label="Formato da prévia">
                <button
                  type="button"
                  aria-pressed={device === 'desktop'}
                  onClick={() => setDevice('desktop')}
                >
                  Desktop
                </button>
                <button
                  type="button"
                  aria-pressed={device === 'mobile'}
                  onClick={() => setDevice('mobile')}
                >
                  Celular
                </button>
              </div>
              <div className={`seo-search-preview ${device}`}>
                <div className="seo-search-address">
                  <span className="seo-favicon">
                    <BrandMark />
                  </span>
                  <div>
                    <strong>Gabriel Carvalho</strong>
                    <span>{domain}</span>
                  </div>
                </div>
                <h3>{draft.title || 'Título da página'}</h3>
                <p>{draft.description || 'A descrição do seu portfólio aparece aqui.'}</p>
              </div>
            </>
          )}
          <div className="seo-checks">
            <h3>O que está configurado</h3>
            {[
              [Boolean(draft.title.trim()), 'Título da página'],
              [Boolean(draft.description.trim()), 'Descrição da página'],
              [!validateSeo(draft).errors.url, 'Endereço canônico'],
            ].map(([valid, text]) => (
              <div key={String(text)}>
                <span>{text}</span>
                <span>
                  {valid ? (
                    <>
                      <Check size={14} /> Preenchido
                    </>
                  ) : (
                    'Pendente'
                  )}
                </span>
              </div>
            ))}
            <div>
              <span>Indexação</span>
              <span>{draft.indexable ? 'Permitida' : 'Desativada'}</span>
            </div>
          </div>
          <p className="seo-preview-note">
            Estas verificações conferem o preenchimento. Não representam uma nota de ranking.
          </p>
        </aside>
      </div>
      <div className="seo-bottom">
        <p>
          <LockKeyhole size={16} />
          <span>
            Salvo neste projeto. Para colocar as alterações online, publique uma nova versão do
            portfólio.
          </span>
        </p>
        <button type="button" onClick={download}>
          <Download size={16} /> Exportar configuração salva
        </button>
      </div>
    </>
  );
}
