# Verificação do refinamento — 8 de setembro de 2026

Build de produção local, Chrome no Windows, Next.js 16.3.4, React 19.2.8. Identidade, conteúdo, paleta e composição preservados. Nenhuma dependência de animação adicionada.

## Medição móvel

| Página | Desempenho | Acessibilidade | Boas práticas | SEO | LCP | CLS | TBT |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Home | 98 | 100 | 100 | 69 | 2,5 s | 0 | 10 ms |
| Projetos | 98 | 100 | 100 | 69 | 2,5 s | 0 | 20 ms |
| Case PDV | 98 | 100 | 100 | 69 | 2,5 s | 0 | 0 ms |

Relatórios completos em `../lighthouse-*.json`. Lighthouse usa simulação móvel; não representa tráfego real ou uma garantia em outros dispositivos. SEO 69 decorre do bloqueio de indexação intencional da prévia local sem domínio configurado.

## Interações verificadas

O roteiro `scripts/verify-refinement.mjs` testa o comportamento renderizado em Chrome:

- Hero com três estados reais, resposta limitada ao ponteiro e retorno ao repouso.
- Imagem compartilhada entre preview e case: evento nativo de transição confirmado, nome correspondente e retorno pelo navegador.
- Stack abrindo projetos filtrados por tecnologia; combinação com categoria, estado vazio, remoção e cliques rápidos com a última seleção prevalecendo.
- Modo construção com controle acessível, regiões anotadas, Escape e devolução de foco.
- Menu móvel com fundo inerte, acessibilidade automática, convivência com modo construção e limpeza ao redimensionar para desktop.
- Movimento reduzido e ausência da API de transição preservando mudanças de estado e navegação.
- Entrada por toque e navegação entre Home e case com JavaScript desativado.

Resultado detalhado em `interactions.json`. Nenhum erro de página capturado. Axe sem violações WCAG A/AA nos estados adicionais de construção e menu; isto não substitui testes com pessoas ou leitores de tela reais.

O roteiro geral `scripts/verify-ui.mjs` cobre Home, índice, cinco cases e 404, nove larguras de 375 a 1920 px, overflow, imagens, filtros, teclado, menu e acessibilidade automática. Lint, compilação TypeScript e build de produção aprovados; os três testes de consistência de dados também passaram.

## Revisão visual

Capturas antes/depois de desktop e mobile e estados de hero, hover, construção e menu estão nesta pasta. A revisão visual confirmou a continuidade da composição original, áreas de toque legíveis e efeitos subordinados ao conteúdo. Movimento usa CSS e APIs nativas com alternativas funcionais; animações entre documentos dependem de suporte do navegador. Não houve teste em aparelhos físicos ou Safari/Firefox nesta rodada.
