import type { MetadataRoute } from 'next';
import { readSeo } from '@/lib/seo-store';
import { projects } from '@/data/projects';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const site = await readSeo();
  return ['', '/projetos', ...projects.map((project) => `/projetos/${project.slug}`)].map(
    (path) => ({
      url: `${site.url}${path}`,
      changeFrequency: 'monthly',
      priority: path === '' ? 1 : path === '/projetos' ? 0.9 : 0.7,
    }),
  );
}
