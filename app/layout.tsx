import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Experience } from '@/components/experience';
import { Preloader } from '@/components/preloader';
import { site } from '@/data/site';
import { pageMetadata } from '@/lib/metadata';
import { readSeo, seoEditorEnabled } from '@/lib/seo-store';
import './globals.css';
import './motion.css';
import './developer.css';
import './engineering.css';
import './process-motion.css';
import './creative.css';
import './contact-atmosphere.css';
import './profile.css';
import './preloader.css';

const instrument = localFont({
  src: '../public/fonts/instrument-sans.woff2',
  variable: '--font-instrument',
  display: 'swap',
});
export async function generateMetadata(): Promise<Metadata> {
  const seo = await readSeo();
  return {
    metadataBase: new URL(seo.url),
    ...pageMetadata(seo.title, seo.description, '/'),
    title: {
      default: seo.title,
      template: '%s | Gabriel Carvalho',
    },
    openGraph: {
      ...pageMetadata(seo.socialTitle, seo.socialDescription, '/').openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.socialTitle,
      description: seo.socialDescription,
      images: ['/opengraph-image'],
    },
    robots: { index: seo.indexable, follow: seo.indexable },
  };
}
export const viewport: Viewport = { themeColor: '#0b0e0c', colorScheme: 'dark' };
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const seo = await readSeo();
  return (
    <html lang="pt-BR" className={instrument.variable} suppressHydrationWarning>
      <body id="top">
        <a href="#main" className="skip-link">
          Pular para o conteúdo
        </a>
        <Script id="preloader-skip" strategy="beforeInteractive">
          {"try{if(sessionStorage.getItem('gc-intro-seen')||matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.setAttribute('data-skip-intro','')}}catch(e){}"}
        </Script>
        <Preloader />
        <Header seoEditor={seoEditorEnabled()} />
        {children}
        <Footer />
        <Experience />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: site.name,
              jobTitle: site.role,
              url: seo.url,
              knowsAbout: [
                'Desenvolvimento web',
                'Design de interfaces',
                'Sistemas web',
                'Next.js',
                'TypeScript',
              ],
              sameAs: site.contacts
                .filter((contact) => contact.href.startsWith('https://'))
                .map((contact) => contact.href),
            }).replace(/</g, '\\u003c'),
          }}
        />
      </body>
    </html>
  );
}
