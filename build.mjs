// Genera la carpeta /public (index.html, sitemap.xml, robots.txt y assets)
// a partir de site.config.mjs.   Uso:  node build.mjs
//
// No tiene dependencias: solo necesita Node 18 o superior.

import { createHash } from "node:crypto";
import { cpSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createSections } from "./src/lib/sections.mjs";
import { headHtml, robotsTxt, safeJson, sitemapXml } from "./src/lib/seo.mjs";

const ROOT = dirname(fileURLToPath(import.meta.url));
const OUT = join(ROOT, "public");

/** Minificado conservador (sin dependencias): quita comentarios y espacios sobrantes. */
export const minifyCss = (css) =>
  css
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\s+/g, " ")
    .replace(/\s*([{};,])\s*/g, "$1")
    .replace(/:\s+/g, ":")
    .replace(/;}/g, "}")
    .trim();

export async function build({ quiet = false } = {}) {
  // ?t= evita la caché de módulos cuando se reconstruye desde el servidor de desarrollo
  const { default: cfg } = await import(`${pathToFileURL(join(ROOT, "site.config.mjs")).href}?t=${Date.now()}`);
  const s = createSections(cfg);
  // El CSS va incrustado (minificado) en el HTML: se elimina una petición que bloquea el primer pintado.
  const css = minifyCss(readFileSync(join(ROOT, "src", "assets", "css", "styles.css"), "utf8"));

  // ?v=<hash> cambia cuando editas main.js, así el navegador nunca usa una copia vieja
  const jsHash = createHash("md5").update(readFileSync(join(ROOT, "src", "assets", "js", "main.js"))).digest("hex").slice(0, 8);

  // Datos que necesita main.js (se leen desde un <script type="application/json">)
  const siteData = {
    whatsapp: { number: cfg.whatsapp.number, formMessage: cfg.whatsapp.messages.form },
    email: cfg.contact.email,
    analytics: cfg.analytics,
    form: cfg.cta.form,
    demoStatus: cfg.how.demo.status,
  };

  const html = `<!doctype html>
<html lang="${cfg.site.lang}">
<head>
${headHtml(cfg, css)}
</head>
<body>
${s.spriteSheet()}
${s.header()}
<main id="contenido" tabindex="-1">
${s.hero()}
${s.problem()}
${s.how()}
${s.benefits()}
${s.packs()}
${s.industries()}
${s.faq()}
${s.testimonials()}
${s.cta()}
</main>
${s.footer()}
${s.floating()}
<script type="application/json" id="site-data">${safeJson(siteData)}</script>
<script src="assets/js/main.js?v=${jsHash}" defer></script>
</body>
</html>
`;

  mkdirSync(OUT, { recursive: true });
  cpSync(join(ROOT, "src", "assets"), join(OUT, "assets"), { recursive: true, filter: (src) => !/[\\/]css([\\/]|$)/.test(src) });
  writeFileSync(join(OUT, "index.html"), html);
  writeFileSync(join(OUT, "sitemap.xml"), sitemapXml(cfg, new Date().toISOString().slice(0, 10)));
  writeFileSync(join(OUT, "robots.txt"), robotsTxt(cfg));

  if (!quiet) {
    const kb = (Buffer.byteLength(html) / 1024).toFixed(1);
    console.log(`✔ public/index.html generado (${kb} KB)`);
    if (cfg.pending?.length) {
      console.log("\n⚠ Datos de EJEMPLO pendientes de reemplazar en site.config.mjs:");
      for (const item of cfg.pending) console.log(`   • ${item}`);
    }
  }
  return { html, cfg };
}

if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  build({ quiet: process.argv.includes("--quiet") }).catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
