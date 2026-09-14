import type { Project, Category } from '../types/project';

export const categories: ('Todos' | Category)[] = [
  'Todos',
  'Sites',
  'Sistemas',
  'E-commerce',
  'Landing Pages',
  'Experimentos',
];

export const projects: Project[] = [
  {
    id: '01',
    slug: 'sistema-pdv-adegas',
    title: 'Operação em fluxo.',
    subtitle: 'Sistema PDV Paradise',
    category: 'Sistemas',
    client: 'Projeto independente · sistema para adegas',
    description:
      'Do balcão ao estoque. Uma operação conectada para vender, organizar e acompanhar o negócio.',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
    cover: '/projects/pdv-cover.png',
    mediaNote:
      'Capa recomposta a partir das telas fornecidas pelo autor, com enquadramento ajustado. As capturas de venda e caixa estão disponíveis abaixo em sua versão original.',
    theme: 'adega',
    featured: true,
    screenshots: [
      {
        src: '/projects/pdv-venda.png',
        alt: 'Tela de venda com busca por código de barras, carrinho e resumo de pagamento',
        caption: 'Venda no balcão · captura fornecida',
        width: 1683,
        height: 624,
      },
      {
        src: '/projects/pdv-caixa.png',
        alt: 'Gestão de terminais de caixa com abertura, suprimento, sangria e fechamento',
        caption: 'Terminais de caixa · captura fornecida',
        width: 1916,
        height: 822,
      },
      {
        src: '/projects/adega-painel-clean.png',
        alt: 'Painel de lojas sem registros cadastrados visíveis',
        caption: 'Painel de lojas · registros removidos',
        width: 2032,
        height: 774,
      },
    ],
    context:
      'Um sistema para conectar as rotinas de uma adega: registrar vendas, consultar produtos, acompanhar pedidos e operar terminais de caixa. Os registros apresentados mostram a interface de venda e a gestão de caixas.',
    challenge:
      'Manter o atendimento rápido sem perder a consistência do estoque. A interface precisa reduzir a troca de telas, deixar as ações prioritárias visíveis e dar clareza sobre o estado de cada pedido.',
    solution:
      'A tela de venda reúne busca por nome ou código de barras, seleção de cliente e resumo do pagamento. A área de caixa concentra abertura, suprimento, sangria e fechamento de terminais, com atalhos de teclado visíveis na operação.',
    results:
      'A interface reúne o fluxo de venda e a organização dos terminais de caixa, com busca de produtos, resumo do pagamento e acesso às ações da operação.',
    development: [
      {
        label: 'Interface',
        value: 'Next.js + TypeScript',
      },
      {
        label: 'Dados e autenticação',
        value: 'Supabase',
      },
      {
        label: 'Banco de dados',
        value: 'PostgreSQL',
      },
    ],
    coverWidth: 1586,
    coverHeight: 992,
    coverAlt:
      'Composição da tela de venda do PDV, com navegação lateral, busca de produtos e resumo de pagamento',
    previewLabel: 'VENDA E GESTÃO',
    galleryNote:
      'Registros da interface de venda, gestão de caixas e painel de lojas. O painel de lojas foi editado para remover seus registros.',
  },
  {
    id: '02',
    slug: 'plataforma-ecommerce',
    title: 'Uma loja. Muitas possibilidades.',
    subtitle: 'Plataforma de e-commerce',
    category: 'E-commerce',
    client: 'Projeto independente · plataforma de e-commerce',
    description:
      'Uma experiência de compra própria, apoiada por uma arquitetura preparada para diferentes operações.',
    stack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
    cover: '/projects/commerce-dashboard.png',
    theme: 'commerce',
    featured: true,
    screenshots: [
      {
        src: '/projects/commerce-dashboard.png',
        alt: 'Dashboard do lojista com pedidos a despachar e estoque no limite',
        caption: 'Visão da operação · dashboard',
        width: 1137,
        height: 661,
      },
      {
        src: '/projects/commerce-produtos.png',
        alt: 'Catálogo administrativo com produtos, categorias, preços e estoque',
        caption: 'Gestão do catálogo · produtos',
        width: 1157,
        height: 666,
      },
      {
        src: '/projects/commerce-pedidos.png',
        alt: 'Lista de pedidos com pagamento e acompanhamento da entrega',
        caption: 'Acompanhamento · pedidos',
        width: 1151,
        height: 654,
      },
      {
        src: '/projects/commerce-login.png',
        alt: 'Tela de acesso ao painel do lojista',
        caption: 'Acesso · painel do lojista',
        width: 1140,
        height: 657,
      },
      {
        src: '/projects/commerce-produto.png',
        alt: 'Página de produto com fotografia, preço, carrinho e itens relacionados',
        caption: 'Experiência de compra · página de produto',
        width: 455,
        height: 641,
      },
    ],
    context:
      'Uma plataforma que aproxima a operação do lojista da experiência de compra. As telas fornecidas mostram o painel administrativo, o catálogo de produtos, os pedidos e uma página de produto da loja.',
    challenge:
      'Conciliar liberdade visual com isolamento de dados entre operações. Carrinho, checkout e pagamentos precisam de estados claros, validação no servidor e tratamento seguro de falhas.',
    solution:
      'O painel organiza pedidos a despachar e alertas de estoque. Produtos e pedidos têm áreas próprias de consulta, enquanto a página de produto reúne fotografia, preço, disponibilidade e acesso ao carrinho em uma composição direta.',
    results:
      'A apresentação conecta a gestão do catálogo, o acompanhamento dos pedidos e a experiência de compra, com áreas próprias para cada rotina do lojista.',
    development: [
      {
        label: 'Storefront',
        value: 'Next.js + TypeScript',
      },
      {
        label: 'Serviços',
        value: 'Node.js + APIs REST',
      },
      {
        label: 'Persistência',
        value: 'PostgreSQL',
      },
    ],
    coverWidth: 1137,
    coverHeight: 661,
    previewLabel: 'PAINEL DO LOJISTA',
    mediaNote: 'Painel do lojista, produtos, pedidos, acesso e página de produto.',
    galleryNote:
      'Da gestão da operação à experiência de compra. Clique em uma imagem para abrir o registro completo.',
  },
  {
    id: '03',
    slug: 'website-nutricionista',
    title: 'Cuidado que começa na experiência.',
    subtitle: 'Website Rayssa Zaniti Nutricionista',
    category: 'Sites',
    client: 'Rayssa Zaniti · nutrição',
    description:
      'Uma presença digital acolhedora, com linguagem editorial e um caminho claro até o atendimento.',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    cover: '/projects/rayssa-home.png',
    theme: 'nutri',
    featured: true,
    screenshots: [
      {
        src: '/projects/rayssa-home.png',
        alt: 'Página inicial de Rayssa Zaniti com apresentação da nutricionista e chamada para acompanhamento',
        caption: 'Apresentação · página inicial',
        width: 1901,
        height: 883,
      },
      {
        src: '/projects/rayssa-acervo.png',
        alt: 'Seção Acervo Nutri com coleção de guias para pacientes',
        caption: 'Conteúdo · Acervo Nutri',
        width: 1905,
        height: 813,
      },
      {
        src: '/projects/rayssa-acompanhamento.png',
        alt: 'Seção final com retrato de Rayssa e convite ao acompanhamento',
        caption: 'Contato · convite ao acompanhamento',
        width: 1905,
        height: 784,
      },
    ],
    context:
      'O website apresenta o trabalho da nutricionista Rayssa Zaniti e organiza a descoberta de sua abordagem, do acompanhamento e dos materiais de apoio. A navegação conecta apresentação profissional, conteúdo e contato.',
    challenge:
      'Criar uma experiência acolhedora, com leitura confortável e uma hierarquia clara para apresentar o acompanhamento. O desafio visual está em equilibrar retratos, textos e chamadas para ação sem sobrecarregar a página.',
    solution:
      'A composição combina tons claros e terrosos, títulos com serifa e retratos da profissional. O Acervo Nutri ganha uma seção própria, enquanto as chamadas para acompanhamento acompanham a leitura e direcionam ao contato.',
    results:
      'Uma presença digital com apresentação profissional, seção de materiais e caminhos para contato, conectando a abordagem de Rayssa Zaniti ao acompanhamento nutricional.',
    development: [
      {
        label: 'Frontend',
        value: 'Next.js + TypeScript',
      },
      {
        label: 'Interface',
        value: 'Tailwind CSS',
      },
      {
        label: 'Descoberta',
        value: 'SEO técnico e dados estruturados',
      },
      {
        label: 'Entrega',
        value: 'Layout responsivo',
      },
    ],
    coverWidth: 1901,
    coverHeight: 883,
    website: 'https://www.rayssazanitinutri.com.br/',
    previewLabel: 'WEBSITE RAYSSA ZANITI',
    mediaNote:
      'Capturas fornecidas pelo autor do website de Rayssa Zaniti. Conheça também a versão publicada pelo link ao final do case.',
    galleryNote:
      'Página inicial, Acervo Nutri e convite ao acompanhamento, apresentados nas capturas fornecidas.',
  },
];

export function filterProjects(category: string) {
  return category === 'Todos'
    ? projects
    : projects.filter((project) => project.category === category);
}
export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
export function getNextProject(slug: string) {
  const index = projects.findIndex((project) => project.slug === slug);
  return index === -1 ? undefined : projects[(index + 1) % projects.length];
}
