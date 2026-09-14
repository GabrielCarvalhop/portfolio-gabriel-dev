import Link from 'next/link';
import { ArrowUpRight, ArrowRight, PanelTop, Blocks, ShoppingBag, Code2 } from 'lucide-react';
import { Hero } from '@/components/hero';
import { ProjectCard } from '@/components/project-card';
import { Contact } from '@/components/contact';
import { projects } from '@/data/projects';
import { ProfileBlueprint } from '@/components/profile-blueprint';
import { StackWorkbench, ProcessWorkbench } from '@/components/engineering-workbench';

const stack = [
  {
    title: 'O que você vê.',
    label: 'Frontend',
    items: ['Next.js', 'React', 'TypeScript', 'JavaScript', 'Tailwind CSS'],
  },
  {
    title: 'O que faz funcionar.',
    label: 'Backend & dados',
    items: ['Node.js', 'Supabase', 'PostgreSQL', 'APIs REST'],
  },
];
const process = [
  [
    'Descobrir',
    'Antes de abrir o editor, entender o contexto. Negócio, pessoas, restrições e o que realmente precisa mudar.',
  ],
  [
    'Estruturar',
    'Dar forma ao caminho: experiência, páginas, componentes, dados e decisões de arquitetura.',
  ],
  [
    'Construir',
    'Desenhar e desenvolver em conjunto. Validar as interações e cuidar dos detalhes que chegam ao usuário.',
  ],
  [
    'Entregar e evoluir',
    'Testar, publicar e acompanhar. Performance, acessibilidade e espaço para o próximo ciclo.',
  ],
];
const services = [
  [
    'Presença digital',
    'Websites personalizados e landing pages que apresentam seu negócio com clareza.',
    'Sites · Landing pages · SEO técnico',
  ],
  [
    'Produtos & sistemas',
    'Ferramentas construídas em torno da operação, do primeiro MVP aos processos do dia a dia.',
    'Sistemas web · SaaS · MVPs · Dashboards',
  ],
  [
    'Comércio conectado',
    'Experiências de compra próprias, com catálogo, pedidos e serviços trabalhando juntos.',
    'E-commerce · Integrações · APIs',
  ],
  [
    'Interfaces & evolução',
    'Aprimoramento de produtos existentes, da usabilidade ao tempo de carregamento.',
    'Frontend · Interfaces · Performance',
  ],
];
const serviceIcons = [PanelTop, Blocks, ShoppingBag, Code2];
export default function Home() {
  return (
    <main id="main">
      <Hero />
      <div className="tech-strip">
        <div className="container">
          <span className="strip-label">FERRAMENTAS, NÃO LIMITES.</span>
          <div>
            {['Next.js', 'React', 'TypeScript', 'Supabase', 'Node.js', 'PostgreSQL', 'Vercel'].map(
              (tech) => (
                <span key={tech}>{tech}</span>
              ),
            )}
          </div>
        </div>
      </div>
      <section className="container section selected-projects" id="selecionados">
        <div className="section-heading showcase-heading" data-arrive>
          <div>
            <h2>
              Projetos
              <br />
              <span className="accent">selecionados.</span>
            </h2>
            <p>Diferentes contextos. O mesmo cuidado em cada entrega.</p>
          </div>
          <Link className="text-link" href="/projetos">
            Todos os projetos <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="showcase-list">
          {projects
            .filter((project) => project.featured)
            .map((project) => (
              <ProjectCard key={project.slug} project={project} featured />
            ))}
        </div>
      </section>
      <section className="about-section section" id="sobre" data-inspect-label="About / editorial">
        <div className="container about-grid">
          <div className="about-label">
            <ProfileBlueprint />
          </div>
          <div className="about-copy" data-arrive>
            <h2>
              <span className="title-line">Olhar de produto.</span>
              <br />
              <span className="title-line accent">Mão no código.</span>
            </h2>
            <p className="about-lead">
              Sou Gabriel Carvalho. Desenvolvo para aproximar o que um negócio precisa da
              experiência que as pessoas merecem.
            </p>
            <p>
              Gosto de participar da construção por inteiro: entender o problema, organizar a
              experiência, definir a arquitetura e colocar o produto no ar. É nessa conexão entre
              decisões que o trabalho ganha consistência.
            </p>
            <p>
              Meu foco está em interfaces bem resolvidas e sistemas que respeitam o contexto de quem
              vai usá-los. Cada projeto pede uma combinação própria de design, engenharia e atenção.
            </p>
            <div className="journey">
              <h3>Frentes que se conectam</h3>
              <div>
                <span>Desenvolvimento web</span>
                <ArrowRight size={14} />
                <span>Front-end & full-stack</span>
                <ArrowRight size={14} />
                <span>Produtos independentes</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="container section stack-section"
        id="stack"
        data-inspect-label="Stack / toolkit"
      >
        <div className="section-heading" data-arrive>
          <div>
            <h2>
              A base de cada construção<span className="accent">.</span>
            </h2>
            <p>A tecnologia acompanha o problema. Nunca o contrário.</p>
          </div>
          <Code2 className="section-code-mark" size={48} strokeWidth={1} aria-hidden="true" />
        </div>
        <StackWorkbench
          groups={stack}
          linkedTechnologies={[...new Set(projects.flatMap((project) => project.stack))]}
        />
      </section>
      <section
        className="process-section section"
        id="processo"
        data-inspect-label="Process / sequence"
      >
        <div className="container">
          <div className="section-heading" data-arrive>
            <div>
              <h2 className="process-heading">
                <span className="title-line">Um processo claro.</span>
                <br />
                <span className="title-line">Do começo ao próximo passo.</span>
              </h2>
            </div>
            <p>
              Decisões compartilhadas.
              <br />
              Construção com direção.
            </p>
          </div>
          <ProcessWorkbench steps={process} />
        </div>
      </section>
      <section
        className="container section services-section"
        data-inspect-label="Services / capabilities"
      >
        <div className="services-intro" data-arrive>
          <h2>
            Onde posso
            <br />
            contribuir<span className="accent">.</span>
          </h2>
          <p>
            Da primeira presença online
            <br />à próxima versão do seu produto.
          </p>
          <Link className="text-link" href="/projetos">
            Veja na prática <ArrowUpRight size={17} />
          </Link>
          <div className="service-system" aria-hidden="true">
            <div className="service-browser">
              <span />
              <span />
              <span />
              <Code2 size={16} />
              <div>
                <i />
                <i />
                <i />
              </div>
            </div>
            <svg viewBox="0 0 340 95" fill="none">
              <path d="M170 0 V32 H50 V80 M170 32 V80 M170 32 H290 V80" />
            </svg>
            <div className="service-ports">
              <span>interface</span>
              <span>lógica</span>
              <span>dados</span>
            </div>
            <p>Partes conectadas. Um produto seu.</p>
          </div>
        </div>
        <div className="services-list">
          {services.map(([title, description, tags], index) => {
            const Icon = serviceIcons[index];
            return (
              <details key={title} name="services">
                <summary>
                  <Icon size={23} strokeWidth={1.4} aria-hidden="true" />
                  <span>{title}</span>
                  <span className="details-plus" aria-hidden="true" />
                </summary>
                <div className="service-content">
                  <p>{description}</p>
                  <small>{tags}</small>
                </div>
              </details>
            );
          })}
        </div>
      </section>
      <Contact />
    </main>
  );
}
