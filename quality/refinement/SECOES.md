# Refinamento das cinco seções

Escopo: Sobre, Stack, Processo, Serviços e CTA/footer, conforme as cinco imagens fornecidas. Hero e projetos selecionados preservados. Contatos externos continuam desativados.

- Sobre: diagrama autoral liga design e código a interfaces e sistemas, com o monograma no centro. Traços conectam uma vez na entrada e respondem de forma limitada ao ponteiro.
- Stack: três camadas selecionáveis explicam responsabilidades e fluxos. Links de tecnologias continuam levando aos projetos relacionados. No celular, a explicação acompanha visualmente a camada escolhida.
- Processo: cada etapa mostra um entregável ilustrativo. No desktop a sequência fica ao lado do painel; no celular os seletores compactos ficam acima e a descrição acompanha o resultado. Nenhuma informação profissional ou entrega passada foi inventada.
- Serviços: disclosures nativos exclusivos com ícones e diagrama de interface/lógica/dados que reage ao item aberto, inclusive sem JavaScript.
- CTA: superfície escura, circuito, destaque verde-lima e link principal para projetos; footer recebe o mesmo acabamento de controles.

Build, TypeScript e lint aprovados. `scripts/verify-sections.mjs` passou em nove larguras (375–1920 px), sem overflow; verificou seleção de camadas, teclado, posição da explicação mobile, entregáveis, disclosures exclusivos, CTA e movimento reduzido. Axe sem violações WCAG A/AA em desktop e mobile nos estados testados. Relatório em `sections-report.json`.

Regressão geral com `scripts/verify-ui.mjs`: Home, índice, cinco cases e 404, navegação, filtros, imagens, menu e acessibilidade automática. Registro em `sections-regression.log`. Sem erros de página capturados. Esta rodada não refez Lighthouse nem testes em dispositivos físicos; os resultados Lighthouse anteriores são históricos.

Capturas individuais desktop/mobile em `*-section-1440.png` e `*-section-390.png`. Durante essas capturas, apenas header fixo e skip-link são ocultados para evitar sobreposição ao enquadrar seções mais altas que a janela; testes de acessibilidade e navegação usam a página completa normalmente.

Uma rodada visual identificou a distância entre seleção e resultado em telas estreitas. O ajuste agrupou a explicação da Stack junto à seleção e compactou os controles do processo. A rodada de confirmação passou. O detector encontrou apenas avisos sobre malha, valores de máscara, tons existentes, tipografia utilitária e cantos derivados do monograma; essas escolhas mantêm a linguagem do projeto.
