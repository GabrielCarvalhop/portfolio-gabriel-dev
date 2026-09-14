import { writeFileSync, mkdirSync } from 'node:fs';

// Original vector interface studies. No external images or client screenshots.
mkdirSync('public/projects', { recursive: true });
const rect = (x, y, w, h, fill, r = 0, stroke = 'none') =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const text = (
  x,
  y,
  value,
  size = 16,
  color = '#243023',
  weight = 400,
  family = 'Arial, sans-serif',
) =>
  `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${color}">${value}</text>`;
const line = (x1, y1, x2, y2, color = '#d9ded4') =>
  `<path d="M${x1} ${y1}H${x2}" stroke="${color}"/>`;
const circle = (x, y, r, fill) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`;
const svg = (content, bg = '#f4f5ef') =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">${rect(0, 0, 1200, 850, bg)}${content}</svg>`;
const browser = (name, color = '#e6e9df') =>
  `${rect(0, 0, 1200, 40, color)}${[20, 34, 48].map((x) => circle(x, 20, 4, '#8f9987')).join('')}${text(470, 25, `${name} / estudo de interface`, 11, '#63705a')}`;
function bottle(x, y, color = '#2d3827', label = '#eee5c9', scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">${rect(25, 0, 21, 38, color, 3)}${rect(25, 0, 21, 10, '#d8cfae', 2)}<path d="M25 32C25 48 7 45 7 63V153Q7 162 17 162H54Q64 162 64 153V63C64 45 46 48 46 32Z" fill="${color}"/>${rect(9, 91, 53, 45, label, 1)}${text(35, 109, 'A', 15, color, 600)}${text(19, 124, 'SELEÇÃO', 6, color)}<path d="M17 66V85" stroke="#ffffff30" stroke-width="5" stroke-linecap="round"/></g>`;
}
function chair(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><ellipse cx="127" cy="292" rx="137" ry="20" fill="#3a231317"/><path d="M21 68Q25 12 94 10H185Q226 14 228 65L216 158H27Z" fill="#9c4f32"/><path d="M30 87Q64 75 100 78L207 91L200 171H30Z" fill="#b36b47"/><path d="M21 150Q39 128 78 135L224 155L233 205Q148 229 11 192Z" fill="#bb744f"/><path d="M25 195L12 293M217 207L241 291M59 201L69 263M188 213L177 270" stroke="#613f2c" stroke-width="13"/><path d="M10 95L0 172Q2 186 25 188M233 97L244 175Q244 191 228 192" stroke="#68432d" stroke-width="11" fill="none"/><path d="M7 94L71 102M230 98L176 106" stroke="#87573b" stroke-width="17" stroke-linecap="round"/></g>`;
}
function leaves(x, y, scale = 1) {
  return `<g transform="translate(${x} ${y}) scale(${scale})"><path d="M12 390Q170 150 255 5" stroke="#687955" stroke-width="4" fill="none"/>${[
    [60, 295, -30],
    [104, 237, 20],
    [149, 165, -28],
    [195, 92, 28],
    [225, 30, -16],
  ]
    .map(
      ([lx, ly, r], i) =>
        `<g transform="translate(${lx} ${ly}) rotate(${r})"><path d="M0 0Q-116 -8 -85 -94Q-20 -107 0 0" fill="${i % 2 ? '#718064' : '#4e6747'}"/><path d="M0 0Q91 28 107 -54Q40 -88 0 0" fill="${i % 2 ? '#879475' : '#657d56'}"/><path d="M-80 -83L0 0L91 -45" stroke="#becaa4" stroke-width="1" fill="none"/></g>`,
    )
    .join('')}</g>`;
}
let adega = browser('adega');
adega += rect(0, 40, 83, 810, '#1e2a20') + text(26, 92, 'a.', 40, '#c4e99b', 600);
['▦', '○', '□', '◇'].forEach((v, i) => {
  adega +=
    rect(20, 133 + i * 69, 43, 43, i === 0 ? '#c3dfaa' : '#2d3b2b', 6) +
    text(33, 161 + i * 69, v, 20, i === 0 ? '#243321' : '#9aae8f');
});
adega +=
  text(115, 96, 'Frente de caixa', 28, '#263324', 600) +
  text(115, 124, 'Organize a venda. Cuide do atendimento.', 13, '#72806a');
adega +=
  rect(115, 154, 668, 46, '#fff', 6, '#dce3d7') +
  text(136, 183, 'Buscar no catálogo...', 14, '#7c8775');
['Todos', 'Vinhos', 'Cervejas', 'Destilados', 'Sem álcool'].forEach((label, i) => {
  adega +=
    rect(115 + i * 131, 220, 119, 35, i === 0 ? '#29402b' : '#e8ede2', 5) +
    text(130 + i * 131, 242, label, 12, i === 0 ? '#edf2e9' : '#53634a');
});
const drinks = [
  'Vinho tinto reserva',
  'Cerveja artesanal',
  'Whisky seleção',
  'Vinho branco',
  'Gin botânico',
  'Espumante brut',
];
drinks.forEach((name, i) => {
  const x = 115 + (i % 3) * 229,
    y = 277 + Math.floor(i / 3) * 254;
  adega +=
    rect(x, y, 211, 235, '#fff', 7, '#e1e5db') +
    rect(x + 10, y + 10, 191, 149, '#f0f2e9', 4) +
    bottle(
      x + 83,
      y + 17,
      ['#3a352a', '#75502a', '#6c4329', '#64704b', '#3e5950', '#3a4930'][i],
      '#eee9d5',
      0.8,
    ) +
    text(x + 14, y + 182, name, 13, '#293627', 500) +
    text(
      x + 14,
      y + 215,
      ['R$ 89,90', 'R$ 18,90', 'R$ 129,90', 'R$ 79,90', 'R$ 99,90', 'R$ 69,90'][i],
      14,
      '#253922',
      600,
    ) +
    rect(x + 169, y + 191, 28, 28, '#e2ecd9', 5) +
    text(x + 178, y + 211, '+', 19, '#36552c');
});
adega +=
  rect(824, 40, 376, 810, '#fff') +
  text(851, 93, 'Pedido atual', 22, '#253322', 600) +
  text(1117, 91, '#032', 12, '#7a8971') +
  line(850, 121, 1175, 121) +
  rect(850, 145, 326, 44, '#f0f3eb', 5) +
  text(867, 173, '+ Vincular cliente', 13, '#65735b');
['Vinho tinto reserva', 'Cerveja artesanal'].forEach((label, i) => {
  let y = 216 + i * 102;
  adega +=
    rect(850, y, 59, 71, '#f0f2e8', 5) +
    bottle(868, y + 7, i ? '#75502a' : '#3a352a', '#e6dfc8', 0.34) +
    text(923, y + 23, label, 13, '#283723', 500) +
    text(923, y + 46, i ? '2 × R$ 18,90' : '1 × R$ 89,90', 11, '#738066') +
    text(923, y + 67, i ? 'R$ 37,80' : 'R$ 89,90', 13, '#283723', 600);
});
adega +=
  line(850, 572, 1175, 572) +
  text(850, 606, 'Subtotal', 13, '#75836a') +
  text(1095, 606, 'R$ 127,70', 13, '#35482c') +
  text(850, 640, 'Desconto', 13, '#75836a') +
  text(1107, 640, 'R$ 0,00', 13, '#35482c') +
  line(850, 661, 1175, 661) +
  text(850, 698, 'Total', 20, '#293c22', 600) +
  text(1056, 698, 'R$ 127,70', 24, '#293c22', 600) +
  rect(850, 725, 326, 57, '#2e4a29', 6) +
  text(936, 760, 'Finalizar venda  →', 16, '#f5f8f0', 500) +
  text(928, 809, 'DADOS DEMONSTRATIVOS', 9, '#7b8b6f');
writeFileSync('public/projects/adega.svg', svg(adega));

let commerce =
  browser('forma', '#dfd9ce') +
  text(54, 109, 'forma', 36, '#3a332a', 500) +
  text(500, 105, 'Coleção', 13, '#5a5044') +
  text(599, 105, 'Objetos', 13, '#5a5044') +
  text(704, 105, 'Nossa essência', 13, '#5a5044') +
  text(1070, 105, 'Sacola (0)', 13, '#5a5044') +
  line(54, 141, 1146, 141, '#cec6b8');
commerce +=
  text(58, 211, 'OBJETOS PARA FICAR.', 11, '#746958') +
  text(54, 300, 'O essencial.', 71, '#3e332b', 400, 'Georgia, serif') +
  text(54, 380, 'Com presença.', 71, '#3e332b', 400, 'Georgia, serif') +
  text(59, 432, 'Formas honestas. Materiais que contam histórias.', 17, '#7f705d') +
  text(59, 461, 'Peças pensadas para fazer parte do seu tempo.', 17, '#7f705d') +
  rect(59, 502, 197, 49, '#4c3b2d', 1) +
  text(87, 533, 'Explorar coleção  ↗', 14, '#f7f2e8');
commerce +=
  circle(895, 367, 208, '#d9cbbb') +
  chair(748, 204, 1.15) +
  text(810, 601, 'POLTRONA ORIGEM', 10, '#6a5643') +
  text(810, 627, 'Madeira, textura e tempo.', 13, '#6a5643') +
  line(55, 671, 1145, 671, '#cfc5b7') +
  text(55, 714, 'Escolhas que fazem a casa.', 29, '#47392e', 400, 'Georgia, serif');
['Madeira maciça', 'Produção cuidadosa', 'Design para o cotidiano'].forEach((label, i) => {
  commerce +=
    circle(65 + i * 382, 769, 4, '#9b6546') + text(81 + i * 382, 775, label, 14, '#73604c');
});
writeFileSync('public/projects/commerce.svg', svg(commerce, '#eee9df'));

let nutri =
  browser('essência', '#e0e4d6') +
  text(61, 111, 'essência', 32, '#3f5138', 400, 'Georgia, serif') +
  text(528, 106, 'Abordagem', 13, '#66715a') +
  text(660, 106, 'Acompanhamento', 13, '#66715a') +
  text(851, 106, 'Sobre', 13, '#66715a') +
  rect(992, 78, 153, 44, '#4d603f', 25) +
  text(1026, 106, 'Atendimento', 13, '#f3f4e9');
nutri +=
  text(66, 228, 'NUTRIÇÃO COM ESCUTA E PRESENÇA', 11, '#7a876c') +
  text(60, 319, 'Comer bem.', 73, '#40513a', 400, 'Georgia, serif') +
  text(60, 405, 'Viver leve.', 73, '#40513a', 400, 'Georgia, serif') +
  text(65, 466, 'Um cuidado que respeita sua história,', 18, '#78826c') +
  text(65, 495, 'sua rotina e seu jeito de viver.', 18, '#78826c') +
  rect(65, 544, 231, 52, '#4d603f', 27) +
  text(94, 577, 'Conhecer a abordagem  ↗', 14, '#f3f4e9');
nutri +=
  rect(738, 172, 391, 461, '#d9dfc9', 195) +
  leaves(767, 194, 0.9) +
  circle(900, 490, 88, '#c6d0b2') +
  leaves(833, 341, 0.45) +
  line(64, 704, 1136, 704, '#c6ceba') +
  text(64, 758, 'Saúde não cabe em uma fórmula.', 30, '#4a5b40', 400, 'Georgia, serif') +
  text(64, 792, 'Ela se constrói com escolhas possíveis, todos os dias.', 15, '#7b856f') +
  text(1010, 777, 'COM CUIDADO ↗', 10, '#6e7d61');
writeFileSync('public/projects/nutri.svg', svg(nutri, '#f0f2e7'));

let dental =
  browser('alva', '#e1e6e2') +
  text(59, 111, 'alva', 40, '#42544f', 400, 'Georgia, serif') +
  text(151, 104, 'ODONTOLOGIA', 9, '#657871') +
  text(601, 103, 'A clínica', 13, '#66766f') +
  text(717, 103, 'Especialidades', 13, '#66766f') +
  text(875, 103, 'Nossa equipe', 13, '#66766f') +
  rect(1022, 78, 128, 43, '#587069', 2) +
  text(1055, 105, 'Agendar ↗', 12, '#f1f4ef');
dental +=
  text(60, 229, 'CUIDADO QUE VOCÊ SENTE.', 11, '#778780') +
  text(58, 319, 'Seu sorriso,', 74, '#40564d', 400, 'Georgia, serif') +
  text(58, 406, 'em boas mãos.', 74, '#40564d', 400, 'Georgia, serif') +
  text(64, 468, 'Acolhimento, atenção e uma odontologia', 17, '#74817a') +
  text(64, 497, 'pensada para cada fase da sua vida.', 17, '#74817a') +
  rect(65, 540, 228, 52, '#587069', 2) +
  text(92, 573, 'Conheça nosso cuidado  ↗', 14, '#f1f4ef');
dental +=
  rect(754, 180, 381, 444, '#d9dfd7', 170) +
  rect(805, 235, 280, 389, '#edf0e8', 140) +
  rect(856, 288, 177, 336, '#b8c6bb', 90) +
  rect(897, 337, 95, 287, '#607d71', 47) +
  `<path d="M745 624H1145L1200 699H670Z" fill="#cad4c9"/>` +
  line(60, 709, 1140, 709, '#c9d3ca') +
  text(65, 766, 'Atenção em cada etapa.', 31, '#42584c', 400, 'Georgia, serif') +
  text(745, 766, 'PREVENÇÃO   /   ESTÉTICA   /   REABILITAÇÃO', 11, '#6b8175') +
  text(65, 802, 'Uma experiência tranquila, desde o primeiro contato.', 14, '#7b8a80');
writeFileSync('public/projects/dental.svg', svg(dental, '#f0f2eb'));

let solar =
  browser('solare', '#203b43') +
  text(57, 111, 'solare', 35, '#ecf0e9', 600) +
  text(560, 103, 'Soluções', 13, '#b5c7c7') +
  text(680, 103, 'Como funciona', 13, '#b5c7c7') +
  text(857, 103, 'Projetos', 13, '#b5c7c7') +
  rect(992, 77, 159, 47, '#d5b26c', 3) +
  text(1017, 107, 'Vamos conversar ↗', 12, '#263e3e');
solar +=
  text(60, 228, 'O FUTURO JÁ NASCEU.', 11, '#d5b26c') +
  text(58, 310, 'Uma nova', 75, '#eaf0e8', 500) +
  text(58, 395, 'energia para', 75, '#eaf0e8', 500) +
  text(58, 480, 'o seu espaço.', 75, '#d5b26c', 500) +
  text(64, 537, 'Projetos solares pensados para a sua realidade.', 16, '#b0c5c3') +
  rect(62, 577, 210, 51, '#d5b26c', 3) +
  text(88, 609, 'Conhecer as soluções  ↗', 13, '#243d3f');
solar +=
  circle(948, 310, 142, '#d4b16b') +
  circle(948, 310, 178, 'none') +
  `<g transform="translate(708 380) skewY(-10)">${rect(0, 0, 409, 202, '#4f7985', 4, '#b1c8c3')}${Array.from({ length: 8 }, (_, i) => `<path d="M${i * 51} 0V202" stroke="#a0baba" stroke-width="2"/>`).join('')}${Array.from({ length: 5 }, (_, i) => `<path d="M0 ${i * 50}H409" stroke="#a0baba" stroke-width="2"/>`).join('')}<path d="M20 202L2 246M385 202L408 246" stroke="#9ab1aa" stroke-width="10"/></g>` +
  line(60, 718, 1140, 718, '#476366') +
  text(61, 770, 'Da avaliação à instalação.', 29, '#e9efdf') +
  text(63, 805, 'Um processo transparente. Um projeto para o seu contexto.', 14, '#a3bfb9') +
  text(981, 780, 'ENERGIA EM EVOLUÇÃO', 10, '#d5b26c');
writeFileSync('public/projects/solar.svg', svg(solar, '#18343d'));

// Compact, original companion studies with mobile framing.
const themes = [
  [
    'adega',
    '#e7ece0',
    '#2e4a29',
    'Seu pedido.',
    'Tudo à vista.',
    'Resumo da venda',
    'Vinho tinto reserva',
    'Cerveja artesanal',
  ],
  [
    'commerce',
    '#e9dfd2',
    '#684a36',
    'Design para',
    'o seu tempo.',
    'Poltrona Origem',
    'Madeira natural',
    'Acabamento artesanal',
  ],
  [
    'nutri',
    '#e7ebdc',
    '#4d603f',
    'Cuidado que',
    'cabe na rotina.',
    'Sua jornada',
    'Escuta e acolhimento',
    'Acompanhamento próximo',
  ],
  [
    'dental',
    '#e6ebe3',
    '#587069',
    'Seu cuidado,',
    'por inteiro.',
    'Nossa abordagem',
    'Prevenção e atenção',
    'Conforto em cada etapa',
  ],
  [
    'solar',
    '#dfe8e0',
    '#25494f',
    'Uma nova',
    'energia.',
    'Seu próximo passo',
    'Entender o seu consumo',
    'Avaliar o seu espaço',
  ],
];
for (const [key, bg, ink, title1, title2, section, row1, row2] of themes) {
  let body =
    text(50, 75, 'DETALHE / EXPERIÊNCIA COMPACTA', 13, ink) +
    rect(341, 40, 519, 775, '#1b251e', 40) +
    rect(357, 57, 487, 741, bg, 29) +
    rect(499, 65, 200, 19, '#1b251e', 10) +
    text(
      388,
      115,
      key === 'adega'
        ? 'adega'
        : key === 'commerce'
          ? 'forma'
          : key === 'nutri'
            ? 'essência'
            : key === 'dental'
              ? 'alva'
              : 'solare',
      21,
      ink,
      500,
    ) +
    text(786, 112, '≡', 25, ink) +
    text(389, 184, title1, 39, ink, 500) +
    text(389, 232, title2, 39, ink, 500);
  if (key === 'commerce') body += chair(540, 275, 0.65);
  else if (key === 'nutri') body += rect(391, 270, 418, 234, '#d0d9bf', 8) + leaves(524, 272, 0.55);
  else if (key === 'adega')
    body +=
      rect(391, 270, 418, 234, '#d3dec7', 8) +
      bottle(492, 290, '#3a352a', '#e9dfbf', 1.2) +
      bottle(630, 326, '#775032', '#ede0bb', 0.95);
  else if (key === 'dental')
    body +=
      rect(391, 270, 418, 234, '#cbd8cd', 8) +
      rect(514, 284, 179, 220, '#f0f2eb', 85) +
      rect(550, 320, 108, 184, '#829e8d', 53);
  else
    body +=
      rect(391, 270, 418, 234, '#b4c9c4', 8) +
      circle(674, 346, 61, '#d5b26c') +
      rect(461, 393, 268, 79, ink, 4) +
      Array.from(
        { length: 7 },
        (_, i) => `<path d="M${461 + i * 44} 393V472" stroke="#c5d8cf" stroke-width="2"/>`,
      ).join('');
  body +=
    text(390, 549, section, 20, ink, 500) +
    line(391, 569, 808, 569, '#adbba4') +
    text(394, 600, row1, 14, ink) +
    text(776, 600, '↗', 18, ink) +
    line(391, 617, 808, 617, '#adbba4') +
    text(394, 648, row2, 14, ink) +
    text(776, 648, '↗', 18, ink) +
    rect(390, 688, 421, 53, ink, 5) +
    text(529, 721, 'Conhecer mais  ↗', 15, '#f4f5eb') +
    text(62, 780, 'COMPOSIÇÃO', 11, ink) +
    text(62, 800, 'CONCEITUAL', 11, ink);
  writeFileSync(`public/projects/${key}-detail.svg`, svg(body, bg));
}
console.log('Created 10 original SVG interface studies.');
