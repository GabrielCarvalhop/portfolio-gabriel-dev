# Gabriel Carvalho — portfólio profissional

Site em português com Next.js 16, App Router, React 19, TypeScript e Tailwind CSS. Interface editorial escura, fonte Instrument Sans local e previews vetoriais originais. Não depende de banco de dados, CMS, chaves de API ou serviços externos para funcionar.

## Executar

Requisito: Node.js 20.9 ou superior, conforme [documentação do Next.js](https://nextjs.org/docs/app/getting-started/installation). O projeto foi verificado com Node.js 24.

```sh
npm ci
npm run dev
```

Abra http://localhost:3000. Para a versão de produção:

```sh
npm run build
npm start
```

## O que está pronto

- Home com hero interativo, tecnologias, projetos selecionados, apresentação, stack, processo, serviços e seção final.
- `/projetos` com seis filtros, contagem dinâmica e estado vazio.
- `/projetos/[slug]` com contexto, desafio, abordagem, desenvolvimento, imagens, direção de resultado e próximo projeto.
- Cinco apresentações iniciais: PDV para adegas, e-commerce, nutrição, odontologia e energia solar.
- Menu móvel com Escape, contenção de foco e bloqueio de rolagem; links e controles operáveis por teclado.
- Metadados individuais, canonical, JSON-LD, sitemap, robots e imagens Open Graph de 1200 × 630.
- Página 404 e estado de erro; navegação nativa mantém a página atual até o próximo documento estar pronto.
- Animações CSS com `prefers-reduced-motion`, fontes locais e componentes de servidor para o conteúdo estático.

## Editar projetos

O conteúdo está em `data/projects.ts`; o tipo está em `types/project.ts`. Adicione um objeto à lista `projects` e preencha os mesmos campos. Rotas, filtro, contagem, metadados e navegação para o próximo case são gerados a partir dessa lista.

- `title`: título editorial usado na Home.
- `subtitle`: nome objetivo do projeto, usado no índice e case.
- `slug`: identificador único da rota.
- `category`: uma das categorias de `types/project.ts`.
- `year`, `client`, `stack`: informações verificadas do projeto.
- `cover`: caminho a partir de `public`, como `/projects/meu-projeto.webp`.
- `screenshots`: lista de imagens, textos alternativos e legendas.
- `context`, `challenge`, `solution`, `results`: conteúdo do case.
- `development`: pares de área e tecnologia.
- `website`: URL real opcional; sem valor, o botão externo não aparece.
- `featured`: inclui o projeto na seleção da Home.
- `theme`: classe visual; reutilize uma existente ou acrescente uma em `app/globals.css`.

Os cases de PDV Paradise, e-commerce e Rayssa Zaniti usam as capturas fornecidas pelo proprietário. As galerias preservam os registros originais, com acesso à imagem completa; a capa do PDV é uma recomposição identificada no case para melhorar o enquadramento. Capas e imagens das galerias abrem em um visualizador dentro do site, com “Voltar ao projeto”, botão de fechar e Escape, preservando a posição e o foco ao retornar. Os demais estudos continuam identificados como conceituais. A origem dos arquivos está em `quality/refinement/project-assets-provenance.json` e a recomposição em `quality/refinement/pdv-cover-generation.md`. Anos e tecnologias ainda não confirmados permanecem sinalizados nos cases.

Para regenerar as ilustrações vetoriais após editar sua composição:

```sh
node scripts/create-previews.mjs
```

## Contato

O WhatsApp autorizado pelo proprietário está disponível na seção de contato e no rodapé, apontando para `https://wa.me/5532984931920`. O botão abre o WhatsApp em uma nova aba; nenhuma mensagem é enviada automaticamente. Para adicionar outros canais, preencha `contacts` em `data/site.ts` com links verificados:

```ts
contacts: [
  { label: 'E-mail', href: 'mailto:SEU_EMAIL' },
  { label: 'GitHub', href: 'https://github.com/SEU_USUARIO' },
];
```

Nenhuma mensagem é enviada pelo site. Não há formulário ou coleta de dados.

## Publicação e SEO

Este projeto é entregue com prévia local; nenhum domínio foi publicado. O painel `/configuracoes/seo` permite editar título, descrição, compartilhamento social, domínio canônico e indexação, com prévias ao vivo, validação, recuperação de rascunho e exportação do JSON salvo. As verificações indicam preenchimento, não uma nota de ranking.

O painel salva em `data/seo-settings.json`. Esse arquivo tem prioridade sobre `NEXT_PUBLIC_SITE_URL`; a variável serve como fallback apenas quando o arquivo não existe. A configuração atual usa `http://localhost:3107` e mantém a indexação desativada. Cada case mantém seu título e sua descrição específicos.

Para executar o editor local no PowerShell, habilite a variável tanto no build quanto no servidor e vincule o processo ao endereço local:

```powershell
$env:SEO_EDITOR_ENABLED = '1'
npm run build
npx next start --hostname 127.0.0.1 --port 3107
```

O link SEO aparece na navegação quando o editor está habilitado. O painel e a API aceitam somente hosts locais; a API também verifica a origem da gravação. Não se trata de um painel administrativo público com autenticação. Rascunhos ficam na sessão do navegador; apenas “Salvar alterações” grava a configuração no projeto.

Antes de publicar, configure no painel o domínio HTTPS real e a preferência de indexação. Em seguida, execute o build de publicação com `SEO_EDITOR_ENABLED` desativado. Publique junto o arquivo `data/seo-settings.json`: metadados, imagem social, canonical, JSON-LD, robots e sitemap usam essa configuração. Mudanças feitas depois no editor local exigem uma nova publicação para aparecer no domínio online. Veja também `.env.example` e `quality/refinement/seo-surface.md`.

## Verificações

```sh
npm run lint
npm run typecheck
npm test
```

Com `npm start` em execução e Google Chrome instalado:

```sh
node scripts/verify-ui.mjs
node scripts/audit.mjs
```

Os relatórios e screenshots ficam em `quality/`. A verificação cobre 375, 390, 430, 768, 820, 1024, 1280, 1440 e 1920 px, rotas, filtros, menu, imagens e acessibilidade automática. Testes automáticos não substituem validação com pessoas ou testes no domínio final. Lighthouse usa emulação móvel e seus resultados podem variar conforme máquina e ambiente.

## Decisões de implementação

O refinamento de interação está em `app/motion.css` e `components/experience.tsx`. Para explorar: alterne as camadas do hero, mova o mouse sobre um preview, abra um case, use os links de tecnologias na Stack e acione “Ver a construção” no footer. Escape encerra o modo construção. Contatos e conteúdo dos cases foram preservados.

As imagens dos projetos usam transições nativas entre documentos. Os links de case são âncoras intencionalmente; navegadores compatíveis interpolam a mesma imagem entre páginas. Nos demais, a navegação continua normalmente. Filtros têm transição nativa de estado com tratamento de interrupções. A preferência por movimento reduzido e dispositivos de toque mantêm os mesmos caminhos funcionais.

Para verificar as novas interações, com o servidor local ativo:

```sh
node scripts/verify-refinement.mjs
node scripts/verify-effects.mjs
node scripts/verify-sections.mjs
node scripts/verify-process-motion.mjs
node scripts/verify-creative.mjs
node scripts/verify-footer.mjs
node scripts/verify-contact-atmosphere.mjs
```

O roteiro testa também cliques rápidos nos filtros, query de tecnologia, retorno pelo navegador, toque, menu durante redimensionamento, Escape, ausência da API de transição e navegação de projetos sem JavaScript. Registros ficam em `quality/refinement/`.

O fundo do hero apresenta trilhas SVG animadas sobre uma malha em perspectiva. “Pausar fundo” interrompe as trilhas; elas também param fora da tela, quando a aba fica oculta e com movimento reduzido. O painel `hero.tsx` acompanha a camada selecionada. Os previews recebem uma varredura breve no hover/foco e os botões principais uma passagem de luz. A composição usa CSS e SVG, sem novas dependências ou loop de desenho em JavaScript.

A estrutura visual é documentada em `DESIGN.md`. Header, hero, filtro e a camada progressiva `Experience` cuidam das interações; o conteúdo estático é renderizado no servidor. Animações CSS resolvem as interações previstas sem uma dependência adicional de motion. SVGs originais têm tamanho explícito, usam `next/image` e carregamento tardio; uma eventual troca por fotografias WebP/AVIF mantém a mesma interface.

Instrument Sans usa licença SIL Open Font License, incluída em `public/fonts/LICENSE.txt`. Lucide Icons fornece o sistema de ícones. Os arquivos sincronizados em `sources/`, se existirem, são referências somente para leitura.

O refinamento visual mais recente está em `app/creative.css`: galeria panorâmica, hierarquia editorial ampliada, fundos em camadas e assinatura no rodapé. A espiral do hero foi removida a pedido do autor; permanecem as trilhas discretas e os controles de camadas da interface. O roteiro `verify-creative.mjs` verifica ponteiro, movimento reduzido, conteúdo sem JavaScript e acessibilidade em desktop/mobile.
