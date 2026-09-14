import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { SeoEditor } from '@/components/seo-editor';
import { isLocalEditor, readSeo } from '@/lib/seo-store';
import './seo.css';

export const metadata: Metadata = {
  title: 'Configurações de SEO',
  robots: { index: false, follow: false },
};
export default async function SeoPage() {
  if (!isLocalEditor((await headers()).get('host'))) notFound();
  return (
    <main id="main" className="seo-page container">
      <SeoEditor initial={await readSeo()} />
    </main>
  );
}
