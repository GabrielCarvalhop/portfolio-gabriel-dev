'use client';
import { useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { categories, filterProjects } from '@/data/projects';
import { ProjectCard } from './project-card';

export function ProjectFilter({ technology }: { technology?: string }) {
  const [selected, setSelected] = useState('Todos');
  const requested = useRef('Todos');
  const activeTransition = useRef<ViewTransition | null>(null);
  const visible = filterProjects(selected).filter(
    (project) => !technology || project.stack.includes(technology),
  );
  function select(category: string) {
    if (category === requested.current) return;
    requested.current = category;
    activeTransition.current?.skipTransition();
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setSelected(category);
      return;
    }
    const transition = document.startViewTransition(() => {
      flushSync(() => setSelected(requested.current));
    });
    activeTransition.current = transition;
    // Rapid repeated selection may skip a snapshot; the state update must still complete.
    transition.ready.catch(() => {});
  }
  return (
    <>
      <div className="filter-bar" role="group" aria-label="Filtrar projetos por categoria">
        {categories.map((category) => (
          <button
            key={category}
            aria-pressed={selected === category}
            onClick={() => select(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {technology && (
        <div className="technology-filter">
          <span>
            Stack / <strong>{technology}</strong>
          </span>
          <Link href="/projetos">
            Remover filtro <span aria-hidden="true">×</span>
          </Link>
        </div>
      )}
      <p className="filter-status sr-only" role="status">
        {visible.length} {visible.length === 1 ? 'projeto encontrado' : 'projetos encontrados'}
      </p>
      {visible.length ? (
        <div className="project-grid">
          {visible.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <span className="mono">LAB / EM ABERTO</span>
          <h2>
            {technology ? (
              'Nenhum projeto nesta combinação.'
            ) : (
              <>
                O próximo experimento
                <br />
                ainda está em construção.
              </>
            )}
          </h2>
          <p>Enquanto isso, explore os sites e sistemas desta seleção.</p>
          <button className="text-link" onClick={() => select('Todos')}>
            Ver todos os projetos <ArrowUpRight size={18} />
          </button>
        </div>
      )}
    </>
  );
}
