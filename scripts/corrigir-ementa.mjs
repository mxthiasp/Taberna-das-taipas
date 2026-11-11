// Aplica scripts/correcoes-ementa.mjs à ementa.html (nomes e descrições dos pratos).
// Uso: node scripts/corrigir-ementa.mjs
// Pode correr-se várias vezes: o que já está corrigido não muda. Os ids (âncoras) não mudam.
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { NOMES, DESCRICOES } from './correcoes-ementa.mjs';

const f = join(dirname(fileURLToPath(import.meta.url)), '..', 'ementa.html');
let html = readFileSync(f, 'utf8');
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

let nomes = 0, descricoes = 0;
const porAplicar = [];
for (const [de, para] of Object.entries(NOMES)) {
  // o nome inteiro dentro do <p class="item__nome">: só espaço ou uma etiqueta a seguir
  const re = new RegExp(`(<p class="item__nome">\\s*)${esc(de)}(?=\\s*<)`, 'g');
  const antes = html;
  html = html.replace(re, (_, a) => a + para);
  if (html !== antes) nomes += (antes.match(re) || []).length;
  else if (!new RegExp(`<p class="item__nome">\\s*${esc(para)}(?=\\s*<)`).test(html)) porAplicar.push(de);
}
for (const [de, para] of Object.entries(DESCRICOES)) {
  const re = new RegExp(`(<p class="item__meta">\\s*)${esc(de)}`, 'g');
  const antes = html;
  html = html.replace(re, (_, a) => a + para);
  if (html !== antes) descricoes += (antes.match(re) || []).length;
  else if (!html.includes(para)) porAplicar.push(de);
}
writeFileSync(f, html);
console.log(`ementa.html: ${nomes} nomes e ${descricoes} descrições corrigidos.`);
if (porAplicar.length) {
  console.error('Não encontrados (nem corrigidos nem por corrigir):\n  ' + porAplicar.join('\n  '));
  process.exit(1);
}
