import type { NextConfig } from 'next';
const config: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  images: { qualities: [75, 90] },
  async redirects() {
    return [
      // The case study was renamed; keep links already shared with the old address working.
      {
        source: '/projetos/sistema-pdv-adegas',
        destination: '/projetos/sistema-pdv',
        permanent: true,
      },
    ];
  },
};
export default config;
