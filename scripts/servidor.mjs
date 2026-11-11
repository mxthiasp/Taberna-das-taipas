// Servidor local para ver o site no PC e no telemóvel (mesma rede Wi-Fi).
// Uso:  node scripts/servidor.mjs          (porta 4173)
//       node scripts/servidor.mjs 8080     (outra porta)
// Sem dependências. Só serve ficheiros; não é para produção.
import http from 'node:http';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
const privadas = ['/conteudo', '/.git', '/.impeccable', '/.claude', '/scripts'];

http.createServer((req, res) => {
  let p;
  try { p = decodeURIComponent(new URL(req.url, 'http://x').pathname); }
  catch { res.writeHead(400); return res.end(); }
  if (privadas.some((d) => p === d || p.startsWith(d + '/'))) { res.writeHead(404); return res.end('404'); }
  if (p.endsWith('/')) p += 'index.html';
  const f = path.join(raiz, p);
  if (f !== raiz && !f.startsWith(raiz + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(f, (err, data) => {
    if (err) { res.writeHead(404); return res.end('404'); }
    res.writeHead(200, {
      'Content-Type': tipos[path.extname(f).toLowerCase()] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(data);
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
