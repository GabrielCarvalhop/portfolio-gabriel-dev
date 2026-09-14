import type { Metadata } from 'next';
import { site } from '@/data/site';
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = '/opengraph-image',
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: site.name,
      locale: 'pt_BR',
      type: 'website',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [image] },
  };
}
