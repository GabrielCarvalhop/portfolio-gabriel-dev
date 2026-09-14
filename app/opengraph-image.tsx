import { socialImage } from '@/lib/social-image';
import { readSeo } from '@/lib/seo-store';
export const alt = 'Gabriel Carvalho — Developer & Product Builder';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export default async function Image() {
  const seo = await readSeo();
  return socialImage(seo.socialTitle, seo.socialDescription);
}
