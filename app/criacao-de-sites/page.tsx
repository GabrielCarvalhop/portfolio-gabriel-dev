import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Braces, Layers3, PanelTop } from 'lucide-react';
import { Contact } from '@/components/contact';
import { pageMetadata } from '@/lib/metadata';
import './site-creation.css';

export const metadata = pageMetadata(
  'Criação de sites',
  'Criação de sites institucionais, landing pages e produtos digitais sob medida. Design responsivo, código próprio e performance real — do briefing ao site no ar.',
  '/criacao-de-sites',
);

const process = [
  ['Descobrir', 'Entender o negócio, o público e o que o site precisa comunicar antes de desenhar qualquer tela.'],
  ['Estruturar', 'Organizar páginas, conteúdo e jornada, para que cada seção tenha um motivo claro de existir.'],
  ['Construir', 'Desenhar e codificar a interface, com atenção ao detalhe que separa um site pronto de um site bom.'],
  ['Publicar e evoluir', 'Colocar no ar, testar em condições reais e deixar espaço para o próximo passo do negócio.'],
];

const includes = [
  [
    'Design responsivo',
    'Interface pensada para funcionar bem em qualquer tela, do celular ao desktop, sem gambiarra.',
  ],
  [
    'Performance técnica',
    'Imagens otimizadas, código limpo e carregamento rápido desde o primeiro deploy, não como ajuste posterior.',
  ],
  [
    'SEO técnico de base',
    'Estrutura, metadados e dados estruturados corretos desde o início, para o site nascer pronto para ser encontrado.',
  ],
  [
    'Domínio e hospedagem',
    'Configuração completa, do domínio ao certificado de segurança. Você recebe o site no ar, não um projeto pela metade.',
  ],
  [
    'Formulários e integrações',
    'Contato, WhatsApp e as ferramentas que o seu negócio já usa, conectadas ao site desde o lançamento.',
  ],
  [
    'Suporte pós-entrega',
    'Acompanhamento depois do site no ar. O trabalho não termina na entrega.',
  ],
];

const differences = [
  [
    'Código, não um molde pronto',
    'Feito com Next.js e React — não WordPress genérico nem construtores de arrastar-e-soltar. Mais controle, mais performance, sem mensalidade de plataforma.',
  ],
  [
    'Performance como prioridade',
    'Não é só bonito: carrega rápido e passa nos testes técnicos que o Google usa para avaliar um site.',
  ],
  [
    'Acompanhamento real',
    'Da estrutura ao suporte depois do lançamento. Ninguém some depois que o site vai para o ar.',
  ],
];

export default function SiteCreationPage() {
  return (
    <main id="main" className="site-creation">
      <section className="container section sc-intro">
        <div>
          <p className="mono sc-eyebrow">Criação de sites · Institucional, landing pages e produtos</p>
          <h1>
            Seu site, construído
            <br />
            para <span className="accent">gerar resultado.</span>
          </h1>
          <p className="sc-lead">
            Nada de templates genéricos. Cada site é planejado, desenhado e codificado sob medida —
            pensado para carregar rápido, converter e crescer junto com o seu negócio.
          </p>
          <div className="hero-actions">
            <Link href="#contato" className="button button-primary">
              Solicitar orçamento <ArrowUpRight size={18} />
            </Link>
            <Link href="#processo" className="text-link">
              Ver o processo <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <aside className="sc-evidence" aria-label="O que compõe o site">
          <PanelTop size={28} strokeWidth={1.3} aria-hidden="true" />
          <h2>
            Da primeira ideia
            <br />
            ao site no ar.
          </h2>
          <dl>
            <div>
              <dt>Design responsivo</dt>
              <dd>Pensado para toda tela</dd>
            </div>
            <div>
              <dt>Código próprio</dt>
              <dd>Sem builders, sem templates</dd>
            </div>
            <div>
              <dt>Performance real</dt>
              <dd>Carregamento rápido de verdade</dd>
            </div>
            <div>
              <dt>Domínio e deploy</dt>
              <dd>Site publicado, pronto para crescer</dd>
            </div>
          </dl>
          <p>Sem builders. Sem atalhos.</p>
        </aside>
      </section>

      <section id="processo" className="container section sc-process">
        <div className="section-heading" data-arrive>
          <div>
            <h2>
              Do briefing
              <br />
              <span className="accent">ao site no ar.</span>
            </h2>
            <p>Um processo claro, do começo ao lançamento.</p>
          </div>
          <Layers3 size={42} strokeWidth={1} aria-hidden="true" />
        </div>
        <ol className="sc-process-list">
          {process.map(([title, description], index) => (
            <li key={title}>
              <span className="mono">{String(index + 1).padStart(2, '0')}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="section sc-includes">
        <div className="container">
          <div className="section-heading" data-arrive>
            <div>
              <h2>
                O que está
                <br />
                <span className="accent">incluso.</span>
              </h2>
              <p>Tudo que um site precisa para sair do papel e funcionar de verdade.</p>
            </div>
          </div>
          <div className="sc-includes-grid">
            {includes.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section sc-difference">
        <div className="container sc-difference-grid">
          <div>
            <Braces size={30} strokeWidth={1.3} className="accent" aria-hidden="true" />
            <h2>
              Código, não
              <br />
              <span className="accent">um molde pronto.</span>
            </h2>
            <p>
              Um site bem feito é uma decisão de engenharia, não só de layout. Por isso cada projeto é
              construído com o mesmo cuidado técnico de um sistema.
            </p>
            <Link href="/auditoria-seo" className="text-link">
              Já tem site? Veja a Auditoria de SEO <ArrowUpRight size={16} />
            </Link>
          </div>
          <div className="sc-difference-list">
            {differences.map(([title, description]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact
        title={
          <>
            Vamos colocar
            <br />
            <span>seu site no ar.</span>
          </>
        }
        description={
          <>
            Conta o que você precisa e onde seu negócio está hoje.
            <br />A gente monta o escopo junto.
          </>
        }
        actionLabel="Pedir orçamento no WhatsApp"
      />
    </main>
  );
}
