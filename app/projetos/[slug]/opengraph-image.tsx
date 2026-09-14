import { socialImage } from '@/lib/social-image';
import { getProject } from '@/data/projects';
export const alt = 'Projeto de Gabriel Carvalho';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return socialImage(
    project?.subtitle || 'Projetos selecionados',
    project ? `${project.category} / ${project.stack.slice(0, 3).join(' + ')}` : undefined,
  );
}
