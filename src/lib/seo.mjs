// SEO: <head>, datos estructurados (JSON-LD), sitemap y robots.

import { esc, interpolate, plain } from "./util.mjs";

const FONT_URL = "https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;800&display=swap";

/** JSON seguro para incrustar dentro de <script>. */
export const safeJson = (data) =>
  JSON.stringify(data).replace(/</g, "\\u003c").replace(/>/g, "\\u003e").replace(/\u2028|\u2029/g, "");

const isPlaceholderUrl = (url) => /TU_USUARIO/.test(url);

export function jsonLd(cfg) {
  const vars = { delivery: cfg.delivery.days };
  const base = cfg.site.url.replace(/\/$/, "");
  const image = `${base}/assets/img/og-image.png`;
  const org = {
    "@type": "Organization",
    "@id": `${base}/#organization`,
    name: cfg.brand.name,
    url: `${base}/`,
    logo: image,
    areaServed: cfg.country.name === "Perú" ? "PE" : cfg.country.name,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${cfg.whatsapp.number}`,
      contactType: "sales",
      availableLanguage: "es",
    },
    sameAs: cfg.social.filter((s) => s.url && !isPlaceholderUrl(s.url)).map((s) => s.url),
  };

  const products = cfg.packs.items
    .filter((pk) => pk.price != null)
    .map((pk) => ({
      "@type": "Product",
      "@id": `${base}/#${pk.id}`,
      name: `${pk.name} · Tarjetas NFC para reseñas en Google`,
      description: `${pk.tagline}. Incluye: ${pk.features.join("; ")}.`,
      image: [image],
      sku: pk.id,
      brand: { "@type": "Brand", name: cfg.brand.name },
      offers: {
        "@type": "Offer",
        url: `${base}/#packs`,
        price: pk.price,
        priceCurrency: cfg.country.currency,
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: { "@id": `${base}/#organization` },
      },
    }));

  const faqPage = {
    "@type": "FAQPage",
    "@id": `${base}/#faq`,
    mainEntity: cfg.faq.items.map((it) => ({
      "@type": "Question",
      name: plain(it.q, vars),
      acceptedAnswer: { "@type": "Answer", text: plain(it.a, vars) },
    })),
  };

  return { "@context": "https://schema.org", "@graph": [org, ...products, faqPage] };
}

export function headHtml(cfg, css) {
  const s = cfg.site;
  const base = s.url.replace(/\/$/, "");
  const image = `${base}/assets/img/og-image.png`;
  const alt = `${cfg.brand.name}: tarjeta NFC blanca para conseguir reseñas en Google con un toque`;
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(s.title)}</title>
<meta name="description" content="${esc(s.description)}">
<meta name="theme-color" content="${esc(s.themeColor)}">
<meta name="robots" content="index,follow,max-image-preview:large">
<link rel="canonical" href="${esc(base)}/">

<meta property="og:type" content="website">
<meta property="og:locale" content="${esc(s.locale)}">
<meta property="og:site_name" content="${esc(cfg.brand.name)}">
<meta property="og:title" content="${esc(s.title)}">
<meta property="og:description" content="${esc(s.description)}">
<meta property="og:url" content="${esc(base)}/">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(s.title)}">
<meta name="twitter:description" content="${esc(s.description)}">
<meta name="twitter:image" content="${esc(image)}">

<link rel="icon" href="assets/img/favicon.svg" type="image/svg+xml">

<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preload" as="style" href="${FONT_URL}" onload="this.onload=null;this.rel='stylesheet'">
<noscript><link rel="stylesheet" href="${FONT_URL}"></noscript>
<style>${css}</style>

<script>
  /* Marca JS activo (para las animaciones de scroll) y evita contenido oculto si el script falla. */
  document.documentElement.classList.add("js");
  window.__revealGuard = setTimeout(function () { document.documentElement.classList.add("no-reveal"); }, 3500);
</script>
<script type="application/ld+json">${safeJson(jsonLd(cfg))}</script>`;
}

export function sitemapXml(cfg, date) {
  const base = cfg.site.url.replace(/\/$/, "");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${esc(base)}/</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
`;
}

export function robotsTxt(cfg) {
  const base = cfg.site.url.replace(/\/$/, "");
  return `User-agent: *\nAllow: /\n\nSitemap: ${base}/sitemap.xml\n`;
}

export { interpolate };
