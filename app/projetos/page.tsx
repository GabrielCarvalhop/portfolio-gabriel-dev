import { ProjectFilter } from '@/components/project-filter';
import { Contact } from '@/components/contact';
import { pageMetadata } from '@/lib/metadata';
import { projects } from '@/data/projects';
export const metadata = pageMetadata(
  'Projetos',
  'Explore sistemas, e-commerce e websites em apresentações de projeto por Gabriel Carvalho.',
  '/projetos',
);
export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ tech?: string }>;
}) {
  const { tech } = await searchParams;
  const technology = projects.some((project) => project.stack.includes(tech || ''))
    ? tech
    : undefined;
  return (
    <main id="main">
      <section className="container portfolio-page">
        <div className="portfolio-intro">
          <div>
            <h1>
              Contextos diferentes.
              <br />
              <span className="muted-heading">Construções com intenção.</span>
            </h1>
            <p>
              Sites, sistemas e experiências digitais. Explore as decisões por trás de cada
              proposta.
            </p>
          </div>
        </div>
        <div className="index-note">
          <span className="status-dot" />
          <p>Capturas dos projetos e estudos de interface, com o contexto de cada construção.</p>
        </div>
        <ProjectFilter key={technology || 'all'} technology={technology} />
      </section>
      <Contact />
    </main>
  );
}
