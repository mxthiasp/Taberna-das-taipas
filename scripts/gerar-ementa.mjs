#!/usr/bin/env node
// Gera ementa.html a partir de conteudo/ementa.json.
// Uso (na pasta do projeto):  node scripts/gerar-ementa.mjs
// Sem dependências: só Node 18 ou mais recente.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const origem = join(raiz, 'conteudo', 'ementa.json');
const destino = join(raiz, 'ementa.html');

// ——— Configuração editável ———

// Pratos de assinatura, marcados "da casa" na ementa.
// `nome` tem de ser igual ao do JSON; `comeca` marca todos os que começam assim.
const DA_CASA = [
  { categoria: 'Tapas', nome: 'Ovos rotos com presunto' },
  { categoria: 'Tapas', nome: 'Fondue de queijo brie, crocante de pão e frutos do bosque (5 un.)' },
  { categoria: 'Tapas', nome: 'Camarão selvagem, azeite e alho, whisky flambé (5 un.)' },
  { categoria: 'Snacks', nome: 'Francesinha (lombo de boi) especial à taberna' },
  { categoria: 'Vegetariano', nome: 'Francesinha especial' },
  { categoria: 'Sangrias', comeca: 'De espumante' },
];

// Categorias de bebidas que se juntam num só bloco, com subtítulos.
const JUNTAR = [
  { titulo: 'Cervejas', id: 'cervejas', prefixo: 'Cervejas de ' },
  { titulo: 'Vinhos', id: 'vinhos', prefixo: 'Vinhos - ' },
];

// Títulos mais legíveis para algumas categorias (o resto usa o nome do JSON).
const TITULOS = {
  'Cervejas de pressão': 'De pressão',
  'Cervejas de garrafa importada': 'De garrafa, importadas',
  'Vinhos - verdes brancos': 'Verdes brancos',
  'Vinhos - verdes tintos': 'Verdes tintos',
  'Vinhos - rosés': 'Rosés',
  'Vinhos - alvarinho': 'Alvarinho',
  'Vinhos - maduros douro branco': 'Douro branco',
  'Vinhos - maduros douro tinto': 'Douro tinto',
  'Vinhos - maduros alentejo tinto': 'Alentejo tinto',
  'Vinhos - maduros alentejo branco': 'Alentejo branco',
  'Vinhos - lisboa branco': 'Lisboa branco',
  'Vinhos - península de setúbal branco': 'Península de Setúbal branco',
  'Bebidas': 'Refrescos',
  'Aperitivos digestivos': 'Aperitivos e digestivos',
  'Espumantes & champagnes': 'Espumantes e champanhes',
};

// Notas por confirmar, mostradas por baixo do título da categoria.
const NOTAS_PC = {
  'Vegetariano': 'Confirme com a equipa quais destes pratos são vegetarianos.',
};

// ——— Fim da configuração ———

const TELEFONE = '+351937305687';
const TELEFONE_TEXTO = '937 305 687';
const THEFORK = 'https://www.thefork.pt/restaurante/taberna-das-taipas-r754633';

const esc = (s) => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const slug = (s) => s.normalize('NFD').replace(/[̀-ͯ]/g, '')
  .toLowerCase().replace(/&/g, 'e').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const capitaliza = (s) => s.charAt(0).toLocaleUpperCase('pt-PT') + s.slice(1);

const preco = (n) => {
  if (typeof n !== 'number' || Number.isNaN(n)) return '';
  return n.toFixed(2).replace('.', ',') + ' €';
};

const tituloDe = (cat) => TITULOS[cat] ?? cat;

function eDaCasa(categoria, nome) {
  return DA_CASA.some((d) => d.categoria === categoria &&
    (d.nome ? d.nome === nome : nome.startsWith(d.comeca)));
}

function validar(dados) {
  const erros = [];
  if (!Array.isArray(dados.categorias)) erros.push('falta a lista "categorias"');
  for (const [i, c] of (dados.categorias ?? []).entries()) {
    if (!c.categoria) erros.push(`categoria ${i + 1} sem nome`);
    if (!['Comida', 'Bebidas'].includes(c.grupo)) erros.push(`"${c.categoria}": grupo tem de ser Comida ou Bebidas`);
    for (const [j, it] of (c.itens ?? []).entries()) {
      if (!it.nome) erros.push(`"${c.categoria}", item ${j + 1}: sem nome`);
      if (typeof it.preco !== 'number') erros.push(`"${c.categoria}" › "${it.nome}": preço em falta ou não numérico`);
    }
  }
  return erros;
}

const icoDaCasa = '<svg class="item__ico" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="10" cy="10" r="4.5" fill="none" stroke="currentColor" stroke-width="1.5"/></svg>';

function itemHTML(categoria, it) {
  let nome = it.nome.trim();
  const un = Number.isInteger(it.unidades) ? it.unidades : null;
  if (un) nome = nome.replace(/\s*\(\s*\d+\s*un\.?\s*\)\s*$/i, '');
  const casa = eDaCasa(categoria, it.nome.trim());
  const meta = [];
  if (it.descricao) meta.push(esc(it.descricao));
  if (un) meta.push(`${un} un.`);
  return `          <li class="item${casa ? ' item--casa' : ''}">
            <p class="item__nome">${esc(capitaliza(nome))}${casa ? ` <span class="item__casa">${icoDaCasa}da casa</span>` : ''}</p>
            <p class="item__preco preco">${preco(it.preco)}</p>${meta.length ? `\n            <p class="item__meta">${meta.join(' · ')}</p>` : ''}
          </li>`;
}

function listaHTML(c) {
  return `        <ul class="itens">
${c.itens.map((it) => itemHTML(c.categoria, it)).join('\n')}
        </ul>`;
}

function notasHTML(c) {
  const n = [];
  if (c.nota) n.push(`<p class="categoria__nota">${esc(capitaliza(c.nota.trim()))}.</p>`);
  if (NOTAS_PC[c.categoria]) n.push(`<p class="categoria__nota"><span class="pc">${esc(NOTAS_PC[c.categoria])}</span><span class="sr-only"> (por confirmar)</span></p>`);
  return n.length ? '\n        ' + n.join('\n        ') : '';
}

// Agrupa categorias: simples ou juntas (Cervejas, Vinhos).
function blocos(categorias) {
  const saida = [];
  for (const c of categorias) {
    const j = JUNTAR.find((x) => c.categoria.startsWith(x.prefixo));
    if (j) {
      let bloco = saida.find((b) => b.juntar === j);
      if (!bloco) { bloco = { juntar: j, titulo: j.titulo, id: j.id, partes: [] }; saida.push(bloco); }
      bloco.partes.push(c);
    } else {
      saida.push({ titulo: tituloDe(c.categoria), id: slug(tituloDe(c.categoria)), partes: [c] });
    }
  }
  return saida;
}

function blocoHTML(b) {
  const total = b.partes.reduce((n, c) => n + c.itens.length, 0);
  if (!b.juntar) {
    const c = b.partes[0];
    return `      <section class="categoria" id="${b.id}" aria-labelledby="t-${b.id}">
        <h3 class="categoria__titulo" id="t-${b.id}">${esc(b.titulo)} <span class="categoria__conta">${total}</span></h3>${notasHTML(c)}
${listaHTML(c)}
      </section>`;
  }
  return `      <section class="categoria" id="${b.id}" aria-labelledby="t-${b.id}">
        <h3 class="categoria__titulo" id="t-${b.id}">${esc(b.titulo)} <span class="categoria__conta">${total}</span></h3>
${b.partes.map((c) => `        <h4 class="categoria__sub" id="${slug(c.categoria)}">${esc(tituloDe(c.categoria))}</h4>${notasHTML(c)}
${listaHTML(c)}`).join('\n')}
      </section>`;
}

function indiceHTML(grupos) {
  return grupos.map(({ nome, id, blocos: bs }) => `
        <li class="indice__grupo"><a href="#${id}">${nome}</a></li>
${bs.map((b) => `        <li><a href="#${b.id}">${esc(b.titulo)}</a></li>`).join('\n')}`).join('');
}

const telefoneSVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/></svg>';

function pagina(dados) {
  const comida = dados.categorias.filter((c) => c.grupo === 'Comida' && c.itens?.length);
  const bebidas = dados.categorias.filter((c) => c.grupo === 'Bebidas' && c.itens?.length);
  const grupos = [
    { nome: 'Comida', id: 'comida', blocos: blocos(comida) },
    { nome: 'Bebidas', id: 'bebidas', blocos: blocos(bebidas) },
  ];
  const nItens = dados.categorias.reduce((n, c) => n + (c.itens?.length ?? 0), 0);

  return `<!doctype html>
<!-- Gerado por scripts/gerar-ementa.mjs a partir de conteudo/ementa.json. Não editar à mão: altere o JSON e volte a correr o script. -->
<html lang="pt-PT">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>Ementa · Taberna das Taipas</title>
  <meta name="description" content="Ementa completa da Taberna das Taipas, com preços: tapas, peixe, carne, snacks, sobremesas, cervejas, vinhos e sangrias.">
  <meta name="theme-color" content="#86401e">
  <meta name="format-detection" content="telephone=no">
  <!-- Partilha (Open Graph e Twitter). Domínio por confirmar: troca https://tabernadastaipas.pt nas duas páginas e no gerador. -->
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Taberna das Taipas">
  <meta property="og:locale" content="pt_PT">
  <meta property="og:url" content="https://tabernadastaipas.pt/ementa.html">
  <meta property="og:title" content="Ementa · Taberna das Taipas">
  <meta property="og:description" content="Ementa completa da Taberna das Taipas, com preços: tapas, peixe, carne, snacks, sobremesas, cervejas, vinhos e sangrias.">
  <meta property="og:image" content="https://tabernadastaipas.pt/assets/img/partilha-1200x630.jpg">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Logótipo da Taberna das Taipas ao lado de uma francesinha com ovo e molho, numa taça de grés.">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="Ementa · Taberna das Taipas">
  <meta name="twitter:description" content="Ementa completa da Taberna das Taipas, com preços: tapas, peixe, carne, snacks, sobremesas, cervejas, vinhos e sangrias.">
  <meta name="twitter:image" content="https://tabernadastaipas.pt/assets/img/partilha-1200x630.jpg">
  <meta name="twitter:image:alt" content="Logótipo da Taberna das Taipas ao lado de uma francesinha com ovo e molho, numa taça de grés.">
  <link rel="icon" href="assets/img/favicon.png" type="image/png">
  <link rel="preload" href="assets/fonts/bubblegum-sans-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="assets/fonts/figtree-latin.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="assets/css/site.css">
</head>
<body class="pagina-ementa">
  <a class="saltar" href="#carta">Saltar para a ementa</a>

  <header class="cabeca">
    <a class="cabeca__logo" href="./" aria-label="Taberna das Taipas, início">
      <img src="assets/img/logo-320.webp" width="320" height="320" alt="">
    </a>
    <nav class="cabeca__nav" aria-label="Principal">
      <ul>
        <li><a href="./" >Início</a></li>
        <li><a href="ementa.html" aria-current="page">Ementa</a></li>
        <li><a href="./#onde">Onde</a></li>
      </ul>
    </nav>
  </header>

  <main id="conteudo">
    <section class="ementa-abertura" aria-labelledby="titulo">
      <h1 class="abertura__titulo" id="titulo">Ementa</h1>
      <p class="abertura__sub">${nItens} pratos e bebidas para pôr ao centro da mesa. Os marcados <span class="marca-casa">${icoDaCasa}da casa</span> são os de assinatura.</p>
      <ul class="avisos">
        <li><strong>Alergénios:</strong> pergunte à equipa antes de pedir. A lista por prato está a ser preparada.</li>
        <li><span class="pc">Preços em euros, IVA incluído.</span><span class="sr-only"> (por confirmar)</span></li>
      </ul>
    </section>

    <div class="ementa">
      <div class="ementa__lado">
      <nav class="indice" aria-label="Categorias da ementa">
        <ul>${indiceHTML(grupos)}
        </ul>
      </nav>
      <aside class="talao" aria-labelledby="talao-titulo">
        <div class="talao__topo">
          <p class="talao__titulo" id="talao-titulo">Reservar mesa</p>
          <p class="talao__horas" id="talao-horas"><span class="pc">Seg–Sáb 18:00–00:00 · Dom 12:00–15:00 e 17:00–22:30</span><span class="sr-only"> (horário por confirmar)</span></p>
        </div>
        <div class="talao__acoes">
          <a class="btn btn--gema" href="${THEFORK}" rel="noopener">Reservar no TheFork</a>
          <a class="btn btn--linha" href="tel:${TELEFONE}" aria-label="Ligar para o ${TELEFONE_TEXTO} (número por confirmar)">
            ${telefoneSVG}
            Ligar</a>
        </div>
      </aside>
      </div>

      <div class="carta papel" id="carta">
${grupos.map((g) => `        <section class="grupo" id="${g.id}" aria-labelledby="t-${g.id}">
          <h2 class="grupo__titulo" id="t-${g.id}">${g.nome}</h2>
${g.blocos.map(blocoHTML).join('\n')}
        </section>`).join('\n')}
        <p class="carta__fim">Ementa de ${esc(dados.fonte?.match(/\d{4}-\d{2}-\d{2}/)?.[0]?.split('-').reverse().join('/') ?? '')}. <span class="pc">Pode haver pratos fora da carta ao fim de semana.</span><span class="sr-only"> (por confirmar)</span></p>
      </div>
    </div>
  </main>

  <footer class="rodape">
    <div class="rodape__grelha">
      <div>
        <h2>Taberna das Taipas</h2>
        <address class="morada" style="font-size:inherit">Rua Professor Manuel José Pereira, 630 R/C<br>4805-128 Caldas das Taipas, Guimarães</address>
      </div>
      <div>
        <h2>Reservas</h2>
        <ul>
          <li><a href="${THEFORK}" rel="noopener">TheFork</a></li>
          <li><a href="tel:+351937305687"><span class="pc">937 305 687</span><span class="sr-only"> (por confirmar)</span></a></li>
          <li><a href="tel:+351937593888"><span class="pc">937 593 888</span><span class="sr-only"> (por confirmar)</span></a></li>
        </ul>
      </div>
      <div>
        <h2>Redes</h2>
        <ul>
          <li><a href="https://www.instagram.com/taberna_das_taipas/" rel="noopener">Instagram</a></li>
          <li><a href="https://www.facebook.com/tabernadastaipas/" rel="noopener">Facebook</a></li>
        </ul>
      </div>
      <div>
        <h2>Legal</h2>
        <ul>
          <li><a href="https://www.livroreclamacoes.pt/Inicio/" rel="noopener">Livro de Reclamações</a></li>
          <li><span class="pc" style="display:inline-flex;min-height:44px;align-items:center">Política de privacidade</span><span class="sr-only"> (por fazer)</span></li>
        </ul>
      </div>
    </div>
    <div class="rodape__legenda">
      <p>Protótipo. O que está <span class="pc">sublinhado a tracejado</span> ainda está por confirmar com o restaurante.</p>
      <p>© Taberna das Taipas</p>
    </div>
  </footer>



  <script src="assets/js/hoje.js" defer></script>
</body>
</html>
`;
}

let dados;
try {
  dados = JSON.parse(readFileSync(origem, 'utf8'));
} catch (e) {
  console.error(`Não consegui ler ${origem}:\n  ${e.message}`);
  process.exit(1);
}

const erros = validar(dados);
if (erros.length) {
  console.error('O ementa.json tem problemas; a ementa.html não foi alterada:');
  for (const e of erros) console.error('  - ' + e);
  process.exit(1);
}

const marcados = dados.categorias.flatMap((c) => c.itens.filter((it) => eDaCasa(c.categoria, it.nome.trim())));
for (const d of DA_CASA) {
  const existe = dados.categorias.some((c) => c.categoria === d.categoria &&
    c.itens.some((it) => (d.nome ? it.nome.trim() === d.nome : it.nome.startsWith(d.comeca))));
  if (!existe) console.warn(`Aviso: o prato da casa "${d.nome ?? d.comeca + '…'}" (${d.categoria}) já não está no JSON.`);
}

writeFileSync(destino, pagina(dados));
const total = dados.categorias.reduce((n, c) => n + c.itens.length, 0);
console.log(`ementa.html gerada: ${dados.categorias.length} categorias, ${total} itens, ${marcados.length} da casa.`);
