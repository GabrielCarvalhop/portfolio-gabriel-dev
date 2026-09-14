import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { getNextProject, getProject, projects } from '@/data/projects';
import { Contact } from '@/components/contact';
import { ImageViewer } from '@/components/image-viewer';
import { pageMetadata } from '@/lib/metadata';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return pageMetadata(
    project.subtitle,
    project.description,
    `/projetos/${slug}`,
    `/projetos/${slug}/opengraph-image`,
  );
}
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const next = getNextProject(slug)!;
  return (
    <main id="main">
      <article className={`case-page ${project.theme}`}>
        <div className="container">
          <Link className="text-link back-link" href="/projetos">
            <ArrowLeft size={16} /> Todos os projetos
          </Link>
          <div className="case-heading" data-inspect-label="Case / introduction">
            <h1>
              {project.subtitle}
              <span className="accent">.</span>
            </h1>
            <p>{project.description}</p>
          </div>
          <dl className="case-facts">
            <div>
              <dt>Categoria</dt>
              <dd>{project.category}</dd>
            </div>
            {project.year && (
              <div>
                <dt>Ano</dt>
                <dd>{project.year}</dd>
              </div>
            )}
            <div>
              <dt>Contexto</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Tecnologias</dt>
              <dd>{project.stack.join(' / ')}</dd>
            </div>
          </dl>
          <div className="case-cover" data-inspect-label="Case / cover">
            <ImageViewer
              src={project.cover}
              alt={project.coverAlt || project.screenshots[0].alt}
              caption={`Capa — ${project.subtitle}`}
            >
              <Image
                src={project.cover}
                alt={project.coverAlt || project.screenshots[0].alt}
                width={project.coverWidth || 1200}
                height={project.coverHeight || 850}
                sizes="(max-width: 1440px) 92vw, 1328px"
                priority
                style={{ viewTransitionName: `cover-${project.slug}` }}
              />
            </ImageViewer>
          </div>
          {project.mediaNote && <p className="case-disclosure">{project.mediaNote}</p>}
          <div className="case-story" data-inspect-label="Case / narrative">
            <div className="case-story-title">
              <h2>
                Por trás
                <br />
                da interface.
              </h2>
              <span className="mono">CONTEXTO → DECISÕES → CONSTRUÇÃO</span>
            </div>
            <div className="case-story-content">
              <section>
                <h2>O contexto</h2>
                <p>{project.context}</p>
              </section>
              <section>
                <h2>O desafio</h2>
                <p>{project.challenge}</p>
              </section>
              <section>
                <h2>A abordagem</h2>
                <p>{project.solution}</p>
              </section>
            </div>
          </div>
          <section className="case-development" data-arrive>
            <h2>Uma base para evoluir.</h2>
            <dl>
              {project.development.map((item) => (
                <div key={item.label}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section className="case-screenshots">
            <div className="section-heading">
              <h2>A experiência, de perto.</h2>
              <span className="mono quiet">
                {project.previewLabel ? 'REGISTROS DO PROJETO' : 'ESTUDOS VISUAIS'}
              </span>
            </div>
            <div className={`screens-grid${project.previewLabel ? ' screens-grid--captures' : ''}`}>
              {project.screenshots.map((screenshot) => (
                <figure key={screenshot.src}>
                  <ImageViewer
                    className="screen-image-link"
                    src={screenshot.src}
                    alt={screenshot.alt}
                    caption={screenshot.caption}
                  >
                    <Image
                      src={screenshot.src}
                      alt={screenshot.alt}
                      width={screenshot.width || 1200}
                      height={screenshot.height || 850}
                      sizes="(max-width: 767px) 90vw, 60vw"
                    />
                  </ImageViewer>
                  <figcaption>{screenshot.caption}</figcaption>
                </figure>
              ))}
            </div>
            <p className="case-disclosure">
              {project.galleryNote ||
                'Estudos de desktop e telas compactas, explorando a hierarquia e a leitura da interface em diferentes formatos.'}
            </p>
          </section>
          <section className="case-result">
            <span className="mono quiet">DIREÇÃO DE RESULTADO</span>
            <div>
              <h2>O que esta construção busca.</h2>
              <p>{project.results}</p>
              {project.website && (
                <a
                  className="text-link"
                  href={project.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visitar projeto <ArrowUpRight size={18} />
                </a>
              )}
            </div>
          </section>
          <a className="next-project" href={`/projetos/${next.slug}`}>
            <div>
              <span className="mono">PRÓXIMO PROJETO</span>
              <h2>{next.subtitle}</h2>
            </div>
            <div className="next-project-preview">
              <Image
                src={next.cover}
                alt=""
                width={240}
                height={170}
                sizes="180px"
                style={{ viewTransitionName: `cover-${next.slug}` }}
              />
            </div>
            <ArrowUpRight strokeWidth={1} />
          </a>
        </div>
      </article>
      <Contact />
    </main>
  );
}
