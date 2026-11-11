// Monta a pasta publicar/ só com o que o site precisa, para enviar para o Cloudflare Pages.
// Uso:  node scripts/preparar-publicacao.mjs
// Fica de fora: conteudo/ (originais), .git, .impeccable, .claude, scripts/, versoes/,
// os .md do projeto e os ficheiros .json de origem das imagens.
import { rmSync, mkdirSync, cpSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const raiz = join(dirname(fileURLToPath(import.meta.url)), '..');
const destino = join(raiz, 'publicar');
const paginas = ['index.html', 'ementa.html', 'site.webmanifest', 'apple-touch-icon.png'];

rmSync(destino, { recursive: true, force: true });
mkdirSync(destino);
for (const p of paginas) cpSync(join(raiz, p), join(destino, p));
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
console.log(`publicar/ pronta: ${n} ficheiros, ${(bytes / 1024 / 1024).toFixed(1)} MB (${relative(raiz, destino)})`);
