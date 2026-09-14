# Verificação da entrega

> Registro da entrega inicial. O relatório atual do refinamento está em [refinement/VERIFICACAO.md](refinement/VERIFICACAO.md). Os arquivos Lighthouse na raiz de `quality/` contêm a medição mais recente.

Ambiente: build de produção local, Next.js 16.3.4, React 19.2.8, Node.js 24.14.1 e Chrome no Windows. As medições usam simulação móvel, não tráfego de um domínio publicado.

## Lighthouse

| Página | Desempenho | Acessibilidade | Boas práticas | SEO |
| --- | ---: | ---: | ---: | ---: |
| Home | 98 | 100 | 100 | 69 |
| Projetos | 98 | 98 | 100 | 69 |
| Case PDV | 98 | 100 | 100 | 69 |

LCP de 2,5 s nas três rotas, CLS 0 e bloqueio de thread principal de 20–40 ms. Resultados podem variar conforme máquina, rede e ambiente. Os arquivos `lighthouse-*.json` preservam as auditorias completas.

**SEO 69:** a única auditoria SEO reprovada foi a permissão de rastreamento. A prévia local usa `noindex` e `Disallow: /` deliberadamente porque ainda não há domínio real. Configure `NEXT_PUBLIC_SITE_URL` antes de gerar o build público. Não foi medida uma nota de SEO em produção publicada.

## Cobertura funcional

- Build de produção, TypeScript, lint e três testes de consistência dos projetos: aprovados.
- Home, índice, cinco cases e 404: status esperados e um H1 por página.
- Nove larguras: 375, 390, 430, 768, 820, 1024, 1280, 1440 e 1920 px. Sem overflow horizontal nas rotas verificadas.
- Filtros: Todos, Sites, Sistemas, E-commerce, Landing Pages e Experimentos; estado vazio e recuperação funcionando.
- Fluxo índice → case → próximo case funcionando.
- Hero: três camadas com estado `aria-pressed` correto.
- Serviços: disclosures nativos operáveis.
- Menu móvel: navegação, Escape, restauração e contenção de foco, bloqueio de rolagem.
- Contato: link alternativo leva ao índice de projetos; nenhum canal inventado.
- Preferência por redução de movimento respeitada.
- Imagens existentes e carregadas; screenshots completos aguardam o carregamento tardio.
- Nenhum erro JavaScript capturado.

## Acessibilidade e metadados

Axe, com regras WCAG 2 A/AA e 2.1 AA, não apontou violações nas oito rotas. Esse resultado é uma verificação automática, não uma certificação. Lighthouse complementou a revisão com a correspondência entre texto visível e nome acessível; os rótulos foram corrigidos.

A nota 98 no índice foi medida antes de corrigir sua sequência de títulos. Os nomes dos projetos agora usam H2 no índice e H3 sob a seção da Home. O build posterior passou; a tabela mantém as notas efetivamente medidas, sem presumir uma nova pontuação.

Canonical e títulos individuais verificados. Imagens Open Graph da Home e de um case responderam HTTP 200 em 1200 × 630. Sitemap e robots responderam HTTP 200. JSON-LD usa apenas identidade, atuação e tecnologias fornecidas no briefing.

## Revisão visual independente

Veredito final: **ship**.

| Achado | Resultado |
| --- | --- |
| Capturas com imagens ainda não carregadas | Resolvido: todos os previews aparecem nas capturas finais |
| Instruções de edição no conteúdo público | Resolvido: orientações transferidas para documentação |
| Seção de contato sem próximo passo ativo | Resolvido: link visível para projetos |

Nenhum achado material dessa revisão ficou aberto.

## Limites conhecidos

Os cases e suas imagens são apresentações conceituais provisórias. Não há métricas, clientes, anos, depoimentos ou screenshots de produção presumidos. Os canais de contato seguem desativados por solicitação do proprietário. O site não foi publicado em um domínio externo.
