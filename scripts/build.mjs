// Build: monta a pasta dist/ só com o que o site precisa, para enviar para o Cloudflare Pages.
// Uso:  node scripts/build.mjs
// Publicar: npx wrangler pages deploy dist --project-name tt-prototipo --branch v2
//
// Fica de fora: conteudo/ (originais), .git, .impeccable, .claude, scripts/, versoes/,
// os .md do projeto e os ficheiros .json de origem das imagens.
import { rmSync, mkdirSync, cpSync, readdirSync, statSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, substituir } from './paginas.mjs';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'dist');

// Ficheiros da raiz do site. As páginas .html passam por substituir() (marcadores {{…}}).
const RAIZ = ['index.html', 'ementa.html', '404.html', 'qr-mesa.html', 'site.webmanifest', 'apple-touch-icon.png'];

for (const p of RAIZ) {
  if (!existsSync(join(raiz, p))) { console.error(`Falta ${p} na raiz do projeto.`); process.exit(1); }
}

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino);
for (const p of RAIZ) {
  if (p.endsWith('.html')) {
    let html;
    try { html = substituir(readFileSync(join(raiz, p), 'utf8')); }
    catch (e) { console.error(`${p}: ${e.message}`); process.exit(1); }
    writeFileSync(join(destino, p), html);
  } else {
    cpSync(join(raiz, p), join(destino, p));
  }
}
cpSync(join(raiz, 'assets'), join(destino, 'assets'), {
  recursive: true,
  filter: (f) => !f.endsWith('.json') && !/(^|[\\/])(Thumbs\.db|desktop\.ini|\.DS_Store)$/.test(f)
});

let n = 0, bytes = 0;
(function contar(d) {
  for (const f of readdirSync(d)) {
    const c = join(d, f), s = statSync(c);
    if (s.isDirectory()) contar(c); else { n++; bytes += s.size; }
  }
})(destino);
console.log(`${relative(raiz, destino)}/ pronta: ${n} ficheiros, ${(bytes / 1024 / 1024).toFixed(1)} MB, SITE_URL = ${SITE_URL}`);
