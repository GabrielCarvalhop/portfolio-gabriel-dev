import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Code2, FileSearch, ShieldCheck } from 'lucide-react';
import { Contact } from '@/components/contact';
import { pageMetadata } from '@/lib/metadata';
import './seo-service.css';

export const metadata = pageMetadata(
  'Auditoria de SEO',
  'Auditoria técnica de SEO para WordPress e outros CMS. Diagnóstico com dados reais, prioridades claras e verificação ao vivo antes e depois das correções.',
  '/auditoria-seo',
);

const capabilities = [
  [
    'Análise técnica em escala',
    'Auditoria via API do CMS para analisar centenas de páginas sem navegar manualmente por cada uma. Identificação de padrões como imagens sem texto alternativo, inclusive as usadas no compartilhamento social, e tags canonical quebradas.',
  ],
  [
    'Conteúdo duplicado e canibalização',
    'Diagnóstico de páginas com conteúdo duplicado e de páginas do próprio site que competem pelo mesmo termo de busca sem necessidade.',
  ],
  [
    'Links internos e redirecionamentos',
    'Mapeamento de links quebrados e URLs antigas em erro 404, com plano de redirecionamento 301. Cada destino é testado ao vivo antes de ser sugerido.',
  ],
  [
    'Metadados e dados estruturados',
    'Auditoria de títulos SEO, meta descriptions, tags canonical e dados estruturados com schema.org, considerando o conteúdo de cada página.',
  ],
  [
    'Evidências do Search Console',
    'Cruzamento com relatórios de páginas não indexadas, soft 404 e erros de servidor para distinguir problemas confirmados de ruído nos relatórios.',
  ],
  [
    'Sitemap e robots.txt',
    'Auditoria de sitemap.xml e robots.txt para identificar inconsistências no mapeamento das URLs e nas instruções de rastreamento.',
  ],
];

const safeguards = [
  [
    'Confirmação antes de aplicar',
    'Nenhuma alteração é aplicada sem confirmação. Cada correção é verificada ao vivo, antes e depois, para conferir o resultado e evitar regressões.',
  ],
  [
    'Atenção ao tráfego pago',
    'Páginas com campanhas ativas só são alteradas com confirmação explícita do time de mídia.',
  ],
  [
    'Conteúdo fiel à página',
    'Nenhum texto de SEO alega um serviço, tratamento ou produto que não exista de verdade naquela página específica.',
  ],
  [
    'Decisões documentadas',
    'Registro claro do que foi encontrado, decidido e corrigido. O histórico fica disponível para quem cuida do site.',
  ],
];

export default function SeoAuditPage() {
  return (
    <main id="main" className="seo-service">
      <section className="container section seo-intro">
        <div>
          <p className="mono seo-eyebrow">Auditoria de SEO · WordPress e outros CMS</p>
          <h1>
            Diagnóstico com dados.
            <br />
            <span className="accent">Correções com critério.</span>
          </h1>
          <p className="seo-lead">
            Uma auditoria não é uma lista genérica de boas práticas. É investigar o que limita a
            visibilidade e a conversão do seu site — e definir o que corrigir, com evidências.
          </p>
          <div className="hero-actions">
            <Link href="#contato" className="button button-primary">
              Solicitar uma auditoria <ArrowUpRight size={18} />
            </Link>
            <Link href="#escopo" className="text-link">
              O que será analisado <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <aside className="seo-evidence" aria-label="Fontes do diagnóstico">
          <FileSearch size={28} strokeWidth={1.3} aria-hidden="true" />
          <h2>
            O problema precisa
            <br />
            de evidência.
          </h2>
          <dl>
            <div>
              <dt>API do CMS</dt>
              <dd>Conteúdo e padrões em escala</dd>
            </div>
            <div>
              <dt>Código-fonte</dt>
              <dd>O que a página realmente entrega</dd>
            </div>
            <div>
              <dt>Search Console</dt>
              <dd>Sinais de indexação e erros</dd>
            </div>
            <div>
              <dt>Navegador</dt>
              <dd>Verificação ao vivo, antes e depois</dd>
            </div>
          </dl>
          <p>Fontes cruzadas. Decisões justificadas.</p>
        </aside>
      </section>
      <section id="escopo" className="container section seo-scope">
        <div className="section-heading" data-arrive>
          <div>
            <h2>
              Do rastreamento
              <br />
              <span className="accent">ao conteúdo.</span>
            </h2>
            <p>O que entra na auditoria técnica do seu site.</p>
          </div>
          <Code2 size={42} strokeWidth={1} aria-hidden="true" />
        </div>
        <div className="seo-capabilities">
          {capabilities.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
        <div className="seo-report">
          <span className="mono">A entrega</span>
          <div>
            <h3>Clareza sobre o que resolver primeiro.</h3>
            <p>
              Relatório organizado por prioridade e impacto, com evidências e justificativas. Você
              sabe o que precisa de atenção, em qual ordem e por quê.
            </p>
          </div>
        </div>
      </section>
      <section className="section seo-method">
        <div className="container seo-method-grid">
          <div>
            <ShieldCheck size={30} strokeWidth={1.3} className="accent" aria-hidden="true" />
            <h2>
              Seu site continua
              <br />
              <span className="accent">sendo prioridade.</span>
            </h2>
            <p>
              Corrigir exige o mesmo cuidado que diagnosticar. O processo considera o funcionamento
              do site, o conteúdo real e as campanhas em andamento.
            </p>
          </div>
          <div className="seo-safeguards">
            {safeguards.map(([title, description]) => (
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
            Vamos entender
            <br />
            <span>o que seu site precisa.</span>
          </>
        }
        description={
          <>
            Envie o endereço do site e o que você está observando.
            <br />
            Vamos conversar sobre o escopo da auditoria.
          </>
        }
        actionLabel="Solicitar auditoria no WhatsApp"
      />
    </main>
  );
}
