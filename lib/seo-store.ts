import 'server-only';
import { readFile, mkdir, writeFile, rename } from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { connection } from 'next/server';
import { site } from '@/data/site';
import { validateSeo, type SeoSettings } from '@/lib/seo-schema';

const file = path.join(process.cwd(), 'data', 'seo-settings.json');
export const seoEditorEnabled = () => process.env.SEO_EDITOR_ENABLED === '1';
export const seoDefaults: SeoSettings = {
  title: 'Gabriel Carvalho — Desenvolvedor Web & Product Builder',
  description: site.description,
  url: site.url,
  socialTitle: 'Gabriel Carvalho',
  socialDescription: 'Desenvolvedor Web & Product Builder',
  indexable: site.indexable,
};
export async function readSeo(): Promise<SeoSettings> {
  // Local editing renders fresh metadata; ordinary production builds remain static.
  if (seoEditorEnabled()) await connection();
  try {
    const result = validateSeo(JSON.parse(await readFile(file, 'utf8')));
    if (!result.settings) throw new Error('Configuração de SEO inválida em data/seo-settings.json');
    return result.settings;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return seoDefaults;
    throw error;
  }
}
export async function writeSeo(settings: SeoSettings) {
  await mkdir(path.dirname(file), { recursive: true });
  const temporary = `${file}.${randomUUID()}.tmp`;
  await writeFile(temporary, `${JSON.stringify(settings, null, 2)}\n`, 'utf8');
  await rename(temporary, file);
}
export function isLocalEditor(host: string | null) {
  if (!seoEditorEnabled() || !host) return false;
  try {
    return ['localhost', '127.0.0.1', '[::1]'].includes(new URL(`http://${host}`).hostname);
  } catch {
    return false;
  }
}
