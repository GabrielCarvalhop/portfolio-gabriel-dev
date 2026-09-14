# Rodapé — 9 de setembro de 2026

O rodapé com nome gigante foi substituído por uma composição compacta: assinatura, navegação e acesso à estrutura da interface. A implementação está em `components/footer.tsx`, com estilos `closing-*` em `app/creative.css`.

O diagrama SVG separa suas camadas no hover, foco ou modo construção ativo. Uma trilha se desenha uma vez ao chegar à seção. O botão usa o modo construção já existente em `Experience`, com estado pressionado, rótulo visual de saída e retorno de foco após Escape. Não foram adicionados contatos, dependências ou loops contínuos.

Verificações concluídas:

- Build de produção com TypeScript e ESLint aprovados.
- Larguras 375, 390, 620, 768, 1024, 1440 e 1920 sem overflow.
- Axe: zero violações WCAG A/AA no rodapé em desktop e celular.
- Ativação por Enter, saída por Escape e pelo botão, estado visual e foco.
- Movimento reduzido mantém diagrama estático e controles funcionais.
- Retorno ao topo, navegação para Projetos e presença do rodapé nessa página.

Evidências: `footer-report.json`, `footer-detector.json`, `footer-new-1440.png`, `footer-new-390.png`. Execute `node scripts/verify-footer.mjs` com localhost:3000 ativo. Resultados Lighthouse de revisões anteriores não foram medidos novamente nesta mudança localizada.
