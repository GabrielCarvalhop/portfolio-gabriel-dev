# SEO e imagens dos projetos

## Contrato da superfície

Extensão funcional do portfólio existente, destinada ao proprietário. Mantém Instrument Sans, fundo escuro e verde-lima. O editor organiza Busca, Compartilhamento e Indexação em abas; a prévia fica ao lado em telas largas e abaixo em telas estreitas. Os controles têm foco visível, indicação de erro, estado de salvamento e ação para descartar mudanças. A prévia clara representa o contexto de busca, sem redefinir o sistema visual global.

`DESIGN.md` e `.impeccable/design.json` foram preservados. Não foram introduzidos nova identidade, bibliotecas de animação ou canais de contato.

## Comportamento implementado

- Configuração persistida em `data/seo-settings.json` por escrita atômica.
- Título, descrição, URL canônica, compartilhamento e indexação ligados à saída real do servidor.
- Editor habilitado explicitamente por variável de ambiente e restrito ao host local; origem da gravação validada.
- Validação no cliente e servidor, erros associados aos campos e navegação por teclado entre abas.
- Rascunho recuperável durante a sessão, separado da configuração salva; exportação usa o JSON salvo.
- Sem indexação do editor e sem inclusão dele no sitemap.
- Imagem social com tamanho de texto adaptável e quebra de palavras longas.

## Registros dos projetos

PDV Paradise recebe as capturas de Venda e Caixa, uma capa recomposta e o painel de lojas previamente limpo. E-commerce recebe cinco capturas: dashboard, produtos, pedidos, login e página do produto. Rayssa Zaniti recebe três capturas e o link fornecido pelo proprietário. As galerias usam dimensões reais, texto alternativo e links para a imagem completa.

As numerações decorativas de cards, hero, processo, menu e navegação de cases foram removidas. Valores funcionais e informações presentes nas capturas foram preservados.

## Verificação final

- Build Next.js, TypeScript, ESLint e testes existentes de projetos concluídos sem erros.
- Página inicial, três cases e painel SEO responderam com HTTP 200 e referências às novas imagens.
- Gravação e recarregamento verificados; alterações de teste foram revertidas à configuração original.
- Metadados HTML, robots, sitemap e imagem social responderam à configuração salva.
- Payload inválido rejeitado com 422; origem externa rejeitada com 403.
- Recuperação de rascunho, descarte e foco por teclado conferidos no navegador.
- Preview móvel conferido sem transbordamento horizontal; capa do PDV visível integralmente no card.
- `seo-long-social-final.png` registra o teste de 120 caracteres de título e 320 de descrição sem corte lateral.

A revisão independente inicial apontou três problemas: corte de textos longos na imagem social, perda do rascunho ao navegar e foco persistente após erro. Os três foram corrigidos e conferidos. A revisão final e a documentação foram concluídas diretamente pelo agente principal, pois os agentes auxiliares atingiram o limite de uso; não houve nova aprovação independente.

## Limites de entrega

Preview disponível em `http://localhost:3107`. O editor grava neste projeto local. Não houve publicação externa; alterações online dependem de novo build e publicação. As verificações descritas não representam auditoria de ranking ou teste de desempenho em produção.
