// Servidor local para ver o site no PC e no telemóvel (mesma rede Wi-Fi).
// Uso:  node scripts/servidor.mjs          (porta 4173)
//       node scripts/servidor.mjs 8080     (outra porta)
// Sem dependências. Só serve ficheiros; não é para produção.
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { substituir } from './paginas.mjs';

const raiz = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const porta = Number(process.argv[2] || 4173);
const tipos = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.png': 'image/png', '.webp': 'image/webp', '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2', '.ico': 'image/x-icon'
};
// Pastas que não devem ser servidas para a rede.
const privadas = ['/conteudo', '/.git', '/.impeccable', '/.claude', '/scripts', '/dist', '/publicar'];

// Envia um ficheiro; as páginas .html passam pelos mesmos marcadores do build.
function enviar(res, f, data, estado) {
  const ext = path.extname(f).toLowerCase();
  let corpo = data;
  if (ext === '.html') {
    try { corpo = substituir(data.toString('utf8')); }
    catch (e) { res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end(`${path.basename(f)}: ${e.message}`); }
  }
  res.writeHead(estado, { 'Content-Type': tipos[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  res.end(corpo);
}

// Como no Cloudflare Pages: o que não existe recebe a 404.html, com o estado 404.
function naoEncontrado(res) {
  const f404 = path.join(raiz, '404.html');
  fs.readFile(f404, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    enviar(res, f404, data, 404);
  });
}

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400); return res.end(); }
  if (privadas.some((d) => p === d || p.startsWith(d + '/'))) return naoEncontrado(res);
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(raiz, p);
  if (f !== raiz && !f.startsWith(raiz + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (err, data) => {
    if (err) return naoEncontrado(res);
    enviar(res, f, data, 200);
  });
}).listen(porta, '0.0.0.0', () => {
  console.log(`No PC:      http://localhost:${porta}/`);
  for (const lista of Object.values(os.networkInterfaces())) {
    for (const i of lista || []) {
      if (i.family === 'IPv4' && !i.internal) console.log(`No iPhone:  http://${i.address}:${porta}/`);
    }
  }
  console.log('Ctrl+C para parar.');
});
