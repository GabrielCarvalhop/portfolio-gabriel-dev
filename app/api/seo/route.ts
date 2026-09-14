import { revalidatePath } from 'next/cache';
import { isLocalEditor, writeSeo } from '@/lib/seo-store';
import { validateSeo } from '@/lib/seo-schema';

export async function PUT(request: Request) {
  const host = request.headers.get('host');
  if (!isLocalEditor(host))
    return Response.json({ message: 'Editor local indisponível.' }, { status: 404 });
  const origin = request.headers.get('origin');
  if (!origin || !['http:', 'https:'].some((protocol) => origin === `${protocol}//${host}`)) {
    return Response.json(
      { message: 'Reabra o editor neste endereço e tente novamente.' },
      { status: 403 },
    );
  }
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return Response.json({ message: 'Formato não aceito.' }, { status: 415 });
  }
  let body;
  try {
    const text = await request.text();
    if (text.length > 8192)
      return Response.json({ message: 'Configuração muito extensa.' }, { status: 413 });
    body = JSON.parse(text);
  } catch {
    return Response.json({ message: 'Não foi possível ler os dados enviados.' }, { status: 400 });
  }
  const { settings, errors } = validateSeo(body);
  if (!settings)
    return Response.json({ message: 'Revise os campos destacados.', errors }, { status: 422 });
  try {
    await writeSeo(settings);
    revalidatePath('/', 'layout');
    revalidatePath('/robots.txt');
    revalidatePath('/sitemap.xml');
    revalidatePath('/opengraph-image');
    return Response.json({ settings });
  } catch {
    return Response.json(
      {
        message: 'Não foi possível salvar. Seus ajustes continuam no formulário; tente novamente.',
      },
      { status: 500 },
    );
  }
}
