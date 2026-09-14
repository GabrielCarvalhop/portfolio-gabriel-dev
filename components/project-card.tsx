import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '@/types/project';

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const Heading = featured ? 'h3' : 'h2';
  return (
    <article
      className={featured ? `project-showcase ${project.theme}` : `project-card ${project.theme}`}
      data-arrive={featured ? '' : undefined}
      data-inspect-label={`Projeto / ${project.subtitle}`}
    >
      <a
        href={`/projetos/${project.slug}`}
        className="project-visual"
        aria-label={`Explorar case: ${project.subtitle}`}
        data-depth
      >
        <div className="project-stage-floor" aria-hidden="true" />
        <div className="project-frame">
          <Image
            src={project.cover}
            alt={project.coverAlt || project.screenshots[0].alt}
            width={project.coverWidth || 1200}
            height={project.coverHeight || 850}
            sizes={featured ? '(max-width: 767px) 90vw, 60vw' : '(max-width: 767px) 90vw, 45vw'}
            style={{ viewTransitionName: `cover-${project.slug}` }}
          />
        </div>
        <span className="project-scan" aria-hidden="true" />
        <span className="preview-caption mono">
          {project.previewLabel || 'ESTUDO DE INTERFACE'}
        </span>
        <span className="project-open">
          <ArrowUpRight size={23} />
        </span>
        <span className="project-invitation" aria-hidden="true">
          Abrir case <ArrowUpRight size={15} />
        </span>
      </a>
      <div className="project-copy">
        <div className="project-meta mono">
          <span>{project.category}</span>
        </div>
        <Heading className="project-title">
          <a href={`/projetos/${project.slug}`}>{featured ? project.title : project.subtitle}</a>
        </Heading>
        {featured && <span className="project-subtitle">{project.subtitle}</span>}
        <p>{project.description}</p>
        <div className="tech-tags">
          {project.stack.slice(0, 3).map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>
        {featured && (
          <a className="text-link case-link" href={`/projetos/${project.slug}`}>
            Explorar case <ArrowUpRight size={18} />
          </a>
        )}
      </div>
    </article>
  );
}
