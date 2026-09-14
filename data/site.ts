export const site = {
  name: 'Gabriel Carvalho',
  role: 'Desenvolvedor Web & Product Builder',
  description:
    'Desenvolvimento de sites, sistemas e produtos digitais sob medida. Conheça os projetos e a abordagem de Gabriel Carvalho: da experiência à engenharia.',
  // Configure a verified production URL before enabling search engine indexing.
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  indexable: Boolean(process.env.NEXT_PUBLIC_SITE_URL),
  contacts: [{ label: 'WhatsApp', href: 'https://wa.me/5532984931920' }] as {
    label: string;
    href: string;
  }[],
};
