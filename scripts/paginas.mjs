// Marcadores das páginas, partilhados pelo build (scripts/build.mjs) e pelo servidor local
// (scripts/servidor.mjs), para o que se vê no PC ser igual ao que se publica.
//
//   {{SITE_URL}}     endereço público do site, sem barra no fim (meta tags de partilha)
//   {{URL_EMENTA}}   endereço da ementa, para mostrar por extenso por baixo do QR
//   {{QR_EMENTA}}    código QR em SVG que abre a ementa (qr-mesa.html)
//
// Endereço público: quando o domínio .pt existir, muda SITE_URL_PADRAO, ou usa sem mexer no ficheiro:
//   SITE_URL=https://www.exemplo.pt node scripts/build.mjs                    (bash)
//   $env:SITE_URL='https://www.exemplo.pt'; node scripts/build.mjs            (PowerShell)
// O código QR muda com o endereço: volta a imprimir os cartões das mesas depois de mudar o domínio.
import { createRequire } from 'node:module';

const SITE_URL_PADRAO = 'https://v2.tt-prototipo.pages.dev';

export const SITE_URL = (process.env.SITE_URL || SITE_URL_PADRAO).trim().replace(/\/+$/, '');
if (!/^https:\/\/[^\s/]+$/.test(SITE_URL)) {
  console.error(`SITE_URL inválido: "${SITE_URL}". Usa só https://domínio, sem caminho.`);
  process.exit(1);
}

// “/ementa” funciona no Cloudflare Pages e no GitHub Pages, e deixa o código QR mais simples.
export const URL_EMENTA = SITE_URL + '/ementa';

// qrcode-generator 1.4.4 (MIT), em scripts/vendor/. Correção de erros M (~15 %),
// suficiente para um cartão impresso, com margem de 4 módulos como pede a norma.
const qrcode = createRequire(import.meta.url)('./vendor/qrcode-generator-1.4.4.cjs');

export function qrSvg(texto, titulo) {
  const qr = qrcode(0, 'M');
  qr.addData(texto, 'Byte');
  qr.make();
  const n = qr.getModuleCount();
  const margem = 4, lado = n + margem * 2;
  // um único caminho: um quadrado por módulo escuro, juntando os seguidos na mesma linha
  let d = '';
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      if (!qr.isDark(y, x)) continue;
      let w = 1;
      while (x + w < n && qr.isDark(y, x + w)) w++;
      d += `M${x + margem} ${y + margem}h${w}v1h-${w}z`;
      x += w - 1;
    }
  }
  return `<svg class="qr" viewBox="0 0 ${lado} ${lado}" role="img" aria-label="${titulo}" shape-rendering="crispEdges" xmlns="http://www.w3.org/2000/svg">` +
    `<rect width="${lado}" height="${lado}" fill="#fff"/><path fill="#000" d="${d}"/></svg>`;
}

let qrEmenta;

// Troca os marcadores numa página. Lança um erro se ficar algum {{…}} por trocar.
export function substituir(html) {
  let out = html.replaceAll('{{SITE_URL}}', SITE_URL).replaceAll('{{URL_EMENTA}}', URL_EMENTA);
  if (out.includes('{{QR_EMENTA}}')) {
    qrEmenta ??= qrSvg(URL_EMENTA, 'Código QR que abre a ementa: ' + URL_EMENTA);
    out = out.replaceAll('{{QR_EMENTA}}', qrEmenta);
  }
  const resto = out.match(/\{\{[A-Z_]+\}\}/);
  if (resto) throw new Error(`ficou o marcador ${resto[0]} por trocar.`);
  return out;
}
