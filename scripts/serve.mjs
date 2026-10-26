// Servidor local de desarrollo (sin dependencias).  Uso:  node scripts/serve.mjs
// Reconstruye la página en cada recarga, así ves los cambios de site.config.mjs
// y de /src al instante.

import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { dirname, extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { gzipSync } from "node:zlib";

// --prod: sirve /public tal cual, comprimido y con caché (para medir con Lighthouse)
const PROD = process.argv.includes("--prod");
const run = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC = join(ROOT, "public");
const PORT = Number(process.env.PORT) || 4173;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".json": "application/json",
  ".xml": "application/xml",
  ".txt": "text/plain; charset=utf-8",
};

const rebuild = () => run(process.execPath, [join(ROOT, "build.mjs"), "--quiet"], { cwd: ROOT });

createServer(async (req, res) => {
  try {
    let path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    if (path.endsWith("/")) path += "index.html";
    if (!PROD && (path === "/index.html" || path.startsWith("/assets/"))) await rebuild();
    const file = normalize(join(PUBLIC, path));
    if (!file.startsWith(PUBLIC)) throw Object.assign(new Error("fuera de public"), { code: "ENOENT" });
    let body = await readFile(file);
    const type = TYPES[extname(file)] ?? "application/octet-stream";
    const headers = { "Content-Type": type };
    if (PROD) {
      headers["Cache-Control"] = path.startsWith("/assets/") ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate";
      if (/^(text\/|image\/svg|application\/(json|xml))/.test(type) && /gzip/.test(req.headers["accept-encoding"] ?? "")) {
        body = gzipSync(body);
        headers["Content-Encoding"] = "gzip";
      }
    } else {
      headers["Cache-Control"] = "no-store";
    }
    res.writeHead(200, headers);
    res.end(body);
  } catch (err) {
    res.writeHead(err.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
    res.end(err.code === "ENOENT" ? "No encontrado" : String(err));
  }
}).listen(PORT, () => console.log(`WODITEK landing → http://localhost:${PORT}`));
