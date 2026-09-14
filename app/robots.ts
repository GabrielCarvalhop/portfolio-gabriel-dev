import type { MetadataRoute } from 'next';
import { readSeo } from '@/lib/seo-store';
export default async function robots(): Promise<MetadataRoute.Robots> {
  const site = await readSeo();
  return {
    rules: {
      userAgent: '*',
      ...(site.indexable
        ? { allow: '/', disallow: ['/configuracoes/', '/api/'] }
        : { disallow: '/' }),
    },
    ...(site.indexable ? { sitemap: `${site.url}/sitemap.xml` } : {}),
  };
}
