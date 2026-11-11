// Monta a pasta publicar/ só com o que o site precisa, para enviar para o Cloudflare Pages.
// Uso:  node scripts/preparar-publicacao.mjs
// Fica de fora: conteudo/ (originais), .git, .impeccable, .claude, scripts/, versoes/,
// os .md do projeto e os ficheiros .json de origem das imagens.
import { rmSync, mkdirSync, cpSync, readdirSync, statSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'publicar');
// Endereço público do site, usado nas meta tags de partilha (og:url, og:image, twitter:image).
// As páginas têm o marcador {{SITE_URL}}; aqui é trocado pelo endereço, sem barra no fim.
// Quando o domínio .pt existir, muda esta linha, ou usa sem mexer no ficheiro:
//   SITE_URL=https://www.exemplo.pt node scripts/preparar-publicacao.mjs   (bash)
//   $env:SITE_URL='https://www.exemplo.pt'; node scripts/preparar-publicacao.mjs   (PowerShell)
const SITE_URL_PADRAO = 'https://v2.tt-prototipo.pages.dev';
const SITE_URL = (process.env.SITE_URL || SITE_URL_PADRAO).trim().replace(/\/+$/, '');
if (!/^https:\/\/[^\s/]+$/.test(SITE_URL)) {
  console.error(`SITE_URL inválido: "${SITE_URL}". Usa só https://domínio, sem caminho.`);
  process.exit(1);
}

const paginas = ['index.html', 'ementa.html', 'site.webmanifest', 'apple-touch-icon.png'];

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino);
for (const p of paginas) cpSync(join(raiz, p), join(destino, p));
cpSync(join(raiz, 'assets'), join(destino, 'assets'), {
  recursive: true,
  filter: (f) => !f.endsWith('.json') && !/(^|[\\/])(Thumbs\.db|desktop\.ini|\.DS_Store)$/.test(f)
});

// Troca {{SITE_URL}} nas páginas copiadas (os originais no projeto ficam com o marcador).
for (const p of paginas.filter((p) => p.endsWith('.html'))) {
  const f = join(destino, p);
  const html = readFileSync(f, 'utf8').replaceAll('{{SITE_URL}}', SITE_URL);
  if (html.includes('{{')) { console.error(`Ficou um marcador {{…}} por trocar em ${p}.`); process.exit(1); }
  writeFileSync(f, html);
}

let n = 0, bytes = 0;
(function contar(d) {
  for (const f of readdirSync(d)) {
    const c = join(d, f), s = statSync(c);
    if (s.isDirectory()) contar(c); else { n++; bytes += s.size; }
  }
})(destino);
console.log(`publicar/ pronta: ${n} ficheiros, ${(bytes / 1024 / 1024).toFixed(1)} MB (${relative(raiz, destino)}), SITE_URL = ${SITE_URL}`);
