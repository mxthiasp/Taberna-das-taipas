// Marcadores das páginas, partilhados pelo build (scripts/build.mjs) e pelo servidor local
// (scripts/servidor.mjs), para o que se vê no PC ser igual ao que se publica.
//
//   {{SITE_URL}}     endereço público do site, sem barra no fim (meta tags de partilha)
//   {{URL_EMENTA}}   endereço da ementa, para mostrar por extenso por baixo do QR
//   {{QR_EMENTA}}    código QR em SVG que abre a ementa (qr-mesa.html)
//   {{ESTATISTICAS}} script do Cloudflare Web Analytics, ou nada enquanto estiver desligado
//
// Blocos condicionais (na política de privacidade):
//   <!-- com-estatisticas --> … <!-- /com-estatisticas -->   ficam só com as estatísticas ligadas
//   <!-- sem-estatisticas --> … <!-- /sem-estatisticas -->   ficam só com as estatísticas desligadas
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

// ——— Estatísticas: Cloudflare Web Analytics (sem cookies) ———
// DESLIGADO até haver domínio próprio. Para ligar:
//   1. No painel da Cloudflare: Analytics & Logs → Web Analytics → Add a site → o domínio .pt.
//      Copiar o token que aparece no código JS (data-cf-beacon='{"token": "…"}').
//   2. Pôr o token em ESTATISTICAS_TOKEN_PADRAO, aqui em baixo (é público: vai no HTML de todas as páginas).
//   3. Mudar SITE_URL_PADRAO para o domínio, construir e publicar.
// Só liga com token E domínio próprio: com um endereço *.pages.dev fica desligado, mesmo com token.
// A política de privacidade troca sozinha para a versão que menciona as estatísticas.
const ESTATISTICAS_TOKEN_PADRAO = '';   // ← o token do Cloudflare Web Analytics, quando houver domínio
const ESTATISTICAS_TOKEN = (process.env.ESTATISTICAS_TOKEN ?? ESTATISTICAS_TOKEN_PADRAO).trim();
export const ESTATISTICAS = Boolean(ESTATISTICAS_TOKEN) && !/\.pages\.dev$/.test(SITE_URL);
if (ESTATISTICAS_TOKEN && !ESTATISTICAS) {
  console.warn('Estatísticas: há token, mas o site ainda está num endereço *.pages.dev. Ficam desligadas até haver domínio.');
}
if (ESTATISTICAS_TOKEN && !/^[0-9a-f]{32}$/i.test(ESTATISTICAS_TOKEN)) {
  console.error('ESTATISTICAS_TOKEN inválido: o token do Cloudflare Web Analytics tem 32 caracteres hexadecimais.');
  process.exit(1);
}
const SCRIPT_ESTATISTICAS = ESTATISTICAS
  ? `<script defer src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "${ESTATISTICAS_TOKEN}"}'></script>`
  : '';

const BLOCO_COM = /[ \t]*<!-- com-estatisticas -->[\s\S]*?<!-- \/com-estatisticas -->\r?\n?/g;
const BLOCO_SEM = /[ \t]*<!-- sem-estatisticas -->[\s\S]*?<!-- \/sem-estatisticas -->\r?\n?/g;

let qrEmenta;

// Troca os marcadores numa página. Lança um erro se ficar algum {{…}} por trocar.
export function substituir(html) {
  let out = html.replaceAll('{{SITE_URL}}', SITE_URL).replaceAll('{{URL_EMENTA}}', URL_EMENTA)
    .replaceAll('{{ESTATISTICAS}}', SCRIPT_ESTATISTICAS)
    // blocos condicionais: fica um, o outro sai inteiro
    .replace(ESTATISTICAS ? BLOCO_SEM : BLOCO_COM, '')
    .replace(/<!-- \/?(com|sem)-estatisticas -->/g, '');
  if (out.includes('{{QR_EMENTA}}')) {
    qrEmenta ??= qrSvg(URL_EMENTA, 'Código QR que abre a ementa: ' + URL_EMENTA);
    out = out.replaceAll('{{QR_EMENTA}}', qrEmenta);
  }
  const resto = out.match(/\{\{[A-Z_]+\}\}/);
  if (resto) throw new Error(`ficou o marcador ${resto[0]} por trocar.`);
  return out;
}
