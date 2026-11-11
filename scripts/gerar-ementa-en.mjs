// Gera en/ementa.html (rascunho em inglês) a partir de ementa.html.
// Uso: node scripts/gerar-ementa-en.mjs
// Os nomes dos pratos ficam em português (lang="pt-PT"); cada prato ganha uma descrição em inglês
// (scripts/ementa-en.mjs). Se faltar a tradução de algum prato, título ou nota, o script para e diz qual.
// Correr outra vez sempre que a ementa.html mudar.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { TITULOS, SUBTITULOS, NOTAS, AUTO, DESCRICOES } from './ementa-en.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
let html = readFileSync(join(raiz, 'ementa.html'), 'utf8');
const faltas = [];

// troca exata, contando ocorrências (vazio = não encontrado é erro)
function troca(de, para, { todas = false } = {}) {
  const n = html.split(de).length - 1;
  if (n === 0) { faltas.push('texto não encontrado: ' + de.slice(0, 80)); return; }
  if (n > 1 && !todas) { faltas.push(`texto repetido ${n}x: ` + de.slice(0, 80)); return; }
  html = html.split(de).join(para);
}

// ——— cabeça ———
html = html.replace(/<!-- Gerado por [^>]*-->/, '<!-- Gerado por scripts/gerar-ementa-en.mjs a partir de ementa.html. Rascunho em inglês, por aprovar: não editar à mão. -->');
troca('<html lang="pt-PT">', '<html lang="en">');
troca('<title>Ementa · Taberna das Taipas</title>', '<title>Menu · Taberna das Taipas</title>');
html = html.replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="The full menu of Taberna das Taipas, with prices: tapas, fish, meat, snacks, desserts, beer, wine and sangria. Dish names in Portuguese, described in English.">');
// sem partilha nem dados para motores de busca enquanto for rascunho
html = html.replace(/\s*<!-- Partilha \(Open Graph e Twitter\)[\s\S]*?<meta name="twitter:image:alt"[^>]*>/, '');
// caminhos: a página fica em en/
html = html.replace(/(href|src)="assets\//g, '$1="../assets/');
troca('href="site.webmanifest"', 'href="../site.webmanifest"');
troca('href="apple-touch-icon.png"', 'href="../apple-touch-icon.png"');

// ——— cabeçalho ———
// o seletor da página portuguesa (EN) sai; entra o da página inglesa (PT), mais abaixo
html = html.replace(/\s*<!-- Seletor de língua:[^>]*-->\s*<li class="lingua"[\s\S]*?<\/li>/, '');
troca('<a class="saltar" href="#carta">Saltar para a ementa</a>', '<a class="saltar" href="#carta">Skip to the menu</a>');
troca('aria-label="Taberna das Taipas, início"', 'aria-label="Taberna das Taipas, home"');
troca('<nav class="cabeca__nav" aria-label="Principal">', '<nav class="cabeca__nav" aria-label="Main">');
troca('<li><a href="./">Início</a></li>', '<li><a href="./">Home</a></li>');
troca('<li><a href="ementa.html" aria-current="page">Ementa</a></li>', '<li><a href="ementa.html" aria-current="page">Menu</a></li>');
troca('<li><a href="./#onde">Onde</a></li>',
  '<li><a href="./#onde">Find us</a></li>\n' +
  '        <!-- Seletor de língua: desligado até o inglês ser aprovado. Para ligar, tirar o hidden. -->\n' +
  '        <li class="lingua" hidden><a href="../ementa.html" hreflang="pt-PT" lang="pt-PT"><span class="sr-only">Ementa em português</span><span aria-hidden="true">PT</span></a></li>');

// ——— abertura ———
troca('<h1 id="titulo">Ementa</h1>', '<h1 id="titulo">Menu</h1>');
html = html.replace(/<p class="sub">255 pratos e bebidas para pôr ao centro da mesa\. Os marcados (<span class="marca-casa">[\s\S]*?<\/svg>)da casa(<\/span>) são os de assinatura\.<\/p>/,
  (_, a, b) => `<p class="sub">255 dishes and drinks to share at the centre of the table. Those marked ${a}house${b} are our signature dishes. Dish names are in Portuguese, each with a short description in English.</p>`);
if (html.includes('255 pratos e bebidas')) faltas.push('abertura da ementa');
troca('<li><strong>Alergénios:</strong> pergunte à equipa antes de pedir. A lista por prato está a ser preparada.</li>',
  '<li><strong>Allergens:</strong> please ask our team before ordering. A list for each dish is being prepared.</li>');
troca('<span class="pc">Preços em euros, IVA incluído.</span>', '<span class="pc">Prices in euros, VAT included.</span>');

// ——— índice ———
troca('aria-label="Categorias da ementa"', 'aria-label="Menu categories"');
html = html.replace(/(<nav class="indice"[\s\S]*?<\/nav>)/, (nav) => nav.replace(/<a href="#([^"]+)">([^<]*)<\/a>/g, (m, id) => {
  if (!TITULOS[id]) { faltas.push('título de categoria: ' + id); return m; }
  return `<a href="#${id}">${TITULOS[id]}</a>`;
}));

// ——— talão ———
troca('<p class="talao__titulo" id="talao-titulo">Reservar mesa</p>', '<p class="talao__titulo" id="talao-titulo">Book a table</p>');
troca('<span class="pc">Seg–Sáb 18:00–00:00 · Dom 12:00–15:00 e 17:00–22:30</span><span class="sr-only"> (horário por confirmar)</span>',
  '<span class="pc">Mon–Sat 18:00–00:00 · Sun 12:00–15:00 and 17:00–22:30</span><span class="sr-only"> (hours to be confirmed)</span>');
troca('rel="noopener">Reservar no TheFork</a>', 'rel="noopener">Book on TheFork</a>');
troca('aria-label="Ligar para o 937 305 687 (número por confirmar)"', 'aria-label="Call +351 937 305 687 (number to be confirmed)"');
html = html.replace(/(<svg[^>]*>[\s\S]*?<\/svg>\s*)Ligar<\/a>/, '$1Call</a>');

// ——— títulos de grupo, categoria e subcategoria ———
html = html.replace(/(<h2 class="grupo__titulo" id="t-([^"]+)">)[^<]*/g, (m, a, id) => TITULOS[id] ? a + TITULOS[id] : (faltas.push('grupo: ' + id), m));
html = html.replace(/(<h3 class="categoria__titulo" id="t-([^"]+)">)[^<]*?( <span)/g, (m, a, id, b) => TITULOS[id] ? a + TITULOS[id] + b : (faltas.push('categoria: ' + id), m));
html = html.replace(/(<h4 class="categoria__sub" id="([^"]+)">)[^<]*/g, (m, a, id) => SUBTITULOS[id] ? a + SUBTITULOS[id] : (faltas.push('subcategoria: ' + id), m));
html = html.replace(/(<p class="categoria__nota">(?:<span class="pc">)?)([^<]+)/g, (m, a, txt) => NOTAS[txt.trim()] ? a + NOTAS[txt.trim()] : (faltas.push('nota: ' + txt), m));

// ——— pratos ———
// subcategoria e categoria de cada prato, para as descrições automáticas
let categoriaAtual = '', subAtual = '';
html = html.replace(/<section class="categoria" id="([^"]+)"|<h4 class="categoria__sub" id="([^"]+)"|<li class="(item[^"]*)" id="([^"]+)">([\s\S]*?)<\/li>/g, (m, cat, sub, classe, id, corpo) => {
  if (cat) { categoriaAtual = cat; subAtual = ''; return m; }
  if (sub) { subAtual = sub; return m; }
  const desc = DESCRICOES[id] ?? AUTO[subAtual] ?? AUTO[categoriaAtual];
  if (!desc) { faltas.push('prato sem descrição: ' + id); return m; }
  // nome em português, marcado como tal; “da casa” → “house”
  corpo = corpo.replace('<p class="item__nome">', '<p class="item__nome" lang="pt-PT">')
    .replace(/(<span class="item__casa">[\s\S]*?<\/svg>)da casa(<\/span>)/, '$1<span lang="en">house</span>$2');
  // a linha de baixo: descrição inglesa e quantidade (“5 un.” → “5 pieces”); a descrição portuguesa sai
  const un = corpo.match(/<p class="item__meta">\s*(\d+) un\.\s*<\/p>/);
  corpo = corpo.replace(/\s*<p class="item__meta">[\s\S]*?<\/p>/, '');
  const meta = desc + (un ? ` · ${un[1]} ${un[1] === '1' ? 'piece' : 'pieces'}` : '');
  corpo = corpo.replace(/\s*$/, `\n            <p class="item__meta">${meta}</p>\n          `);
  return `<li class="${classe}" id="${id}">${corpo}</li>`;
});

// ——— fim da carta, voltar ao topo ———
troca('<p class="carta__fim">Ementa de 09/11/2026. <span class="pc">Pode haver pratos fora da carta ao fim de semana.</span><span class="sr-only"> (por confirmar)</span></p>',
  '<p class="carta__fim">Menu as of 9 November 2026. <span class="pc">There may be off-menu specials at the weekend.</span><span class="sr-only"> (to be confirmed)</span></p>');
troca('<span class="ao-topo__texto">Voltar ao topo</span>', '<span class="ao-topo__texto">Back to top</span>');

// ——— rodapé ———
troca('<h2>Reservas</h2>', '<h2>Bookings</h2>');
troca('<h2>Redes</h2>', '<h2>Social</h2>');
troca('rel="noopener">Livro de Reclamações</a>', 'rel="noopener" hreflang="pt-PT">Complaints book <span lang="pt-PT">(Livro de Reclamações)</span></a>');
troca('<li><a href="privacidade.html">Política de privacidade</a></li>', '<li><a href="../privacidade.html" hreflang="pt-PT">Privacy policy (in Portuguese)</a></li>');
troca('<p>Protótipo. O que está <span class="pc">sublinhado a tracejado</span> ainda está por confirmar com o restaurante.</p>',
  '<p>Prototype. Anything <span class="pc">with a dashed underline</span> is still to be confirmed with the restaurant.</p>');
troca('<span class="sr-only"> (por confirmar)</span>', '<span class="sr-only"> (to be confirmed)</span>', { todas: true });

// ——— verificação: não pode sobrar interface em português ———
const restos = ['Reservar', 'Ligar</a>', 'por confirmar', 'Ementa<', 'Início', 'Saltar', 'Voltar ao topo', 'Alergénios', 'Comida<', 'Bebidas<'];
for (const r of restos) if (html.includes(r)) faltas.push('ficou em português: ' + r);
if (faltas.length) { console.error('en/ementa.html não foi gerada:\n  ' + faltas.join('\n  ')); process.exit(1); }

mkdirSync(join(raiz, 'en'), { recursive: true });
writeFileSync(join(raiz, 'en', 'ementa.html'), html);
const n = (html.match(/<li class="item/g) || []).length;
console.log(`en/ementa.html gerada: ${n} pratos, todos com descrição em inglês.`);
