export type SeoSettings = {
  title: string;
  description: string;
  url: string;
  socialTitle: string;
  socialDescription: string;
  indexable: boolean;
};
export type SeoErrors = Partial<Record<keyof SeoSettings, string>>;

export function validateSeo(input: unknown): { settings?: SeoSettings; errors: SeoErrors } {
  const value = input && typeof input === 'object' ? (input as Record<string, unknown>) : {};
  const errors: SeoErrors = {};
  const settings = {} as SeoSettings;
  for (const [key, max] of [
    ['title', 120],
    ['description', 320],
    ['url', 240],
    ['socialTitle', 120],
    ['socialDescription', 320],
  ] as const) {
    const text = typeof value[key] === 'string' ? value[key].trim() : '';
    settings[key] = text;
    if (!text) errors[key] = 'Preencha este campo.';
    else if (text.length > max) errors[key] = `Use até ${max} caracteres.`;
  }
  settings.indexable = value.indexable === true;
  if (typeof value.indexable !== 'boolean')
    errors.indexable = 'Escolha se o site pode ser indexado.';
  try {
    const url = new URL(settings.url);
    const local = ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname);
    if (
      (!local && url.protocol !== 'https:') ||
      (local && !['https:', 'http:'].includes(url.protocol)) ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      url.pathname !== '/'
    ) {
      errors.url = 'Use apenas o domínio completo, com HTTPS e sem caminhos ou parâmetros.';
    }
    if (settings.indexable && (local || !url.hostname.includes('.'))) {
      errors.indexable = 'Configure um domínio público antes de permitir a indexação.';
    }
    settings.url = url.origin;
  } catch {
    errors.url = 'Informe uma URL válida, como https://seudominio.com.br.';
  }
  return Object.keys(errors).length ? { errors } : { settings, errors };
}
