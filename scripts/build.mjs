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

// Ficheiros da raiz que vão para o site: em vez de uma lista fechada, uma regra.
// Entra qualquer página (.html), o manifest, ícones e imagens da raiz (.png, .ico, .svg),
// robots.txt e os ficheiros de configuração do Cloudflare Pages (_headers, _redirects).
// Uma página ou ícone novo na raiz entra sozinho, sem mexer neste script.
// Fica sempre de fora o que é do projeto e não do site: .md, .json, pastas e ficheiros escondidos.
const DO_SITE = /\.(html|webmanifest|png|ico|svg|txt)$/i;
const CONFIG_PAGES = ['_headers', '_redirects'];
const SEMPRE_FORA = /\.(md|json|mjs|js|cjs|zip)$/i;

const RAIZ = readdirSync(raiz)
  .filter((p) => statSync(join(raiz, p)).isFile())
  .filter((p) => !p.startsWith('.') && !SEMPRE_FORA.test(p))
  .filter((p) => DO_SITE.test(p) || CONFIG_PAGES.includes(p))
  .sort();

// O mínimo que o site tem de ter: se faltar, o build para (protege contra apagar por engano).
const OBRIGATORIOS = ['index.html', 'ementa.html', '404.html', 'qr-mesa.html', 'site.webmanifest', 'apple-touch-icon.png'];
for (const p of OBRIGATORIOS) {
  if (!RAIZ.includes(p)) { console.error(`Falta ${p} na raiz do projeto.`); process.exit(1); }
}
// os ícones do manifest têm de existir
const manifest = JSON.parse(readFileSync(join(raiz, 'site.webmanifest'), 'utf8'));
for (const i of manifest.icons || []) {
  if (!existsSync(join(raiz, i.src))) { console.error(`site.webmanifest aponta para ${i.src}, que não existe.`); process.exit(1); }
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
console.log(`Raiz: ${RAIZ.join(", ")}`);
console.log(`${relative(raiz, destino)}/ pronta: ${n} ficheiros, ${(bytes / 1024 / 1024).toFixed(1)} MB, SITE_URL = ${SITE_URL}`);
