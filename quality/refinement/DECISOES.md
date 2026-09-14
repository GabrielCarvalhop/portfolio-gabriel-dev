# Refinamento — análise antes da implementação

## Diagnóstico

Revisados estrutura de rotas, componentes, estilos, dados, metadados, estados de erro/loading, testes existentes e a Home renderizada em desktop e mobile. A identidade, copy, paleta, projetos e composição editorial são a autoridade visual.

- O hero já promete três camadas, mas sua estrutura é quase vazia e a interação fica restrita aos botões.
- Os previews já têm rotação própria; falta resposta espacial contida e continuidade até o case.
- O CSS habilita transições entre documentos, mas os links SPA não chegam a usá-las.
- O menu móvel aparece e desaparece sem sequência. Seu foco pode continuar preso ao redimensionar para desktop.
- Os filtros desmontam a lista abruptamente; a stack exibe setas sem destinos.
- As seções longas não oferecem sinal de avanço; processo e passagem ao próximo case podem esclarecer a leitura.
- Conteúdo, imagens e navegação precisam continuar disponíveis sem efeitos, sem ponteiro fino e com redução de movimento.

## Tese de movimento

**Momento principal:** revelar a construção por trás do produto. O hero permite inspecionar estrutura/interface/produto; uma descoberta no footer estende essa ideia às regiões reais da página.

**Continuidade:** previews compartilham a mesma imagem com a abertura do case usando transições nativas entre documentos. Os filtros usam transição de estado nativa quando disponível, com fallback imediato. Nenhuma navegação aguarda uma animação artificial.

**Feedback:** deslocamento óptico de poucos pixels nos previews, marcador de leitura, menu com entrada/saída curta, linhas de processo desenhadas em sequência e stack ligada a cases relevantes.

**Orçamento:** CSS e APIs nativas, sem novas dependências. Eventos de ponteiro limitados às regiões relevantes; uma atualização por frame, zero loop ocioso. Conteúdo visível por padrão. Nada de scroll hijacking, cursor global ou rotação no touch. Estados funcionam com reduced motion.

## Referências conceituais

- [Bruno Simon](https://bruno-simon.com/): descoberta opcional e demonstração de domínio através da própria experiência. Não adotar seu universo de jogo.
- [Ramotion](https://www.ramotion.com/): articulação entre produto, identidade e apresentação dos trabalhos. Sem copiar composição.
- [Transições entre documentos, Chrome](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document): continuidade nativa com fallback para navegação normal.
- [MDN: startViewTransition](https://developer.mozilla.org/en-US/docs/Web/API/Document/startViewTransition): transições de estado progressivas.

## Mantido

Toda copy profissional, cinco projetos provisórios, monograma, cores, fontes, layouts alternados, contatos desativados, modelo de dados e semântica de conteúdo. Novos textos se limitam a instruções de interação e navegação.

## Ajustes encontrados na verificação

- Cliques rápidos nos filtros podiam aplicar uma seleção antiga enquanto a transição preparava o próximo frame. A intenção mais recente agora prevalece e interrompe a transição anterior.
- O subtítulo do header condensado precisava de mais contraste. A opacidade foi elevada e a combinação passou na auditoria WCAG AA.
- A antiga fronteira global `loading.tsx` mantinha o conteúdo transmitido pelo servidor oculto em navegação sem JavaScript. A fronteira e seu indicador foram removidos; conteúdo e links nativos passaram no teste com JavaScript desativado.
- O modo construção é suspenso visualmente e fica inerte durante o menu móvel. Escape fecha primeiro o menu e preserva o modo; redimensionar para desktop restaura foco e rolagem.
