# Circuito de dados — expansão visual

A pedido do proprietário, o fundo ganhou presença e a linguagem de programação tornou-se explícita. A composição editorial, conteúdo profissional e paleta foram preservados.

O momento principal conecta trilhas de sinal SVG, malha em perspectiva e o trecho de código que acompanha a seleção de camadas do hero. Os sinais percorrem seis caminhos em ciclos de 18 segundos; o usuário pode pausar e retomar. Um observador suspende o movimento fora da tela e uma mudança de visibilidade suspende-o quando a aba é ocultada. A preferência por movimento reduzido oferece a composição estática.

O restante da página usa uma textura pontilhada nas margens. Nos projetos, uma varredura de 950 ms acompanha hover/foco; os botões principais recebem uma passagem de luz de 650 ms. Ambos são efeitos finitos, sem bloquear a ação ou alterar o destino.

`app/developer.css` concentra o tratamento visual. `components/developer-backdrop.tsx` contém as trilhas e sua suspensão. As cores derivam da paleta existente; o âmbar `#e7c79a` aparece apenas em números de código e `#82907f` na numeração de linhas. A família monoespaçada fica restrita ao código. Sem novas dependências.

Verificação: build de produção e TypeScript; lint; `scripts/verify-effects.mjs` testa deslocamento real das trilhas, pausa/retomada, suspensão fora da tela, sincronização do código, varredura, acessibilidade Axe, seis larguras de 375 a 1920 px, movimento reduzido e erros de página. Revisão visual com capturas desktop e mobile em `effects-desktop.png` e `effects-mobile.png`.
