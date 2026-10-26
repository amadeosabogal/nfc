# WODITEK · Landing de tarjetas NFC para reseñas en Google

Landing de una sola página, mobile-first, hecha con **HTML + CSS + JavaScript puro** (sin librerías ni frameworks).
Todo el contenido —textos, precios, WhatsApp, redes, rubros, preguntas— vive en **un solo archivo**: [`site.config.mjs`](site.config.mjs).

```
landing-woditek/
├─ site.config.mjs        ← ÚNICO archivo que editas (textos, precios, WhatsApp, redes, analítica…)
├─ build.mjs              ← genera /public a partir de la configuración
├─ package.json           ← atajos: npm run build · npm run dev
├─ netlify.toml           ← configuración de Netlify
├─ vercel.json            ← configuración de Vercel
├─ src/
│  ├─ assets/css/styles.css   ← estilos (tokens de color y tipografía al inicio)
│  ├─ assets/js/main.js       ← interacciones: demo, pestañas, FAQ, formulario, analítica
│  ├─ assets/img/             ← favicon.svg y og-image.png (imagen al compartir el enlace)
│  └─ lib/                    ← generadores de HTML (sections, icons, visuals, seo)
├─ scripts/
│  ├─ serve.mjs           ← servidor local de desarrollo
│  └─ make-og.mjs         ← regenera la imagen para compartir (og-image.png)
└─ public/                ← LA PÁGINA LISTA PARA PUBLICAR (generada)
   ├─ index.html · sitemap.xml · robots.txt
   └─ assets/
```

> Solo necesitas **Node 18 o superior** (nada que instalar con `npm install`).

---

## 1 · Ver la página

- **Rápido:** abre `public/index.html` con doble clic (funciona sin servidor).
- **Con recarga automática de cambios:**
  ```bash
  npm run dev      # → http://localhost:4173
  ```
  Cada vez que recargas el navegador se reconstruye la página con tus últimos cambios.

## 2 · Cambiar textos, precios, WhatsApp, redes…

Abre [`site.config.mjs`](site.config.mjs), edita y luego ejecuta:

```bash
npm run build     # o: node build.mjs
```

Eso regenera `public/`. Qué cambiar y dónde:

| Quiero cambiar…                         | En `site.config.mjs`                                   |
| --------------------------------------- | ------------------------------------------------------ |
| Número de WhatsApp                      | `whatsapp.number` (código de país + número, solo dígitos: `51907030003`) |
| Mensajes prellenados de WhatsApp        | `whatsapp.messages.*`                                  |
| Precios, cantidades y qué incluye cada pack | `packs.items[]` → `price`, `features`, `featured`, `badge` |
| Precio «Cotizar» en vez de un monto     | `price: null`                                          |
| Días de entrega                         | `delivery.days` (se usa en hero, packs, FAQ y CTA)     |
| Titulares y subtítulos                  | `hero`, `problem`, `how`, `benefits`, `cta`…           |
| Palabras con degradado de Google        | encierra el texto en `{{ }}` → `"Consigue más {{reseñas}}"` |
| Rubros (pestañas)                       | `industries.items[]`                                   |
| Preguntas frecuentes                    | `faq.items[]`                                          |
| Testimonios y contadores                | `testimonials.items[]`, `testimonials.stats[]`         |
| Redes sociales                          | `social[]` (si dejas `url` vacío, el ícono no se muestra) |
| Correo para el formulario               | `contact.email`                                        |
| Título / descripción para Google (SEO)  | `site.title`, `site.description`                       |
| Dominio                                 | `site.url` (canonical, sitemap, Open Graph, datos estructurados) |

Al construir, el script **imprime la lista de datos de ejemplo pendientes** (`pending` en el config). Bórralos de esa lista a medida que pongas el dato real.

### Colores, tipografía y espaciado

Están como variables al inicio de [`src/assets/css/styles.css`](src/assets/css/styles.css) (`:root`):
`--blue/--red/--yellow/--green` (colores de Google), `--ink` y `--navy` (fondos oscuros), `--paper` (fondo claro), `--wa` (verde de WhatsApp), `--font`, radios y espaciados.

### Imagen al compartir el enlace (Open Graph)

`src/assets/img/og-image.png` (1200×630) es la miniatura que aparece al compartir el link por WhatsApp, Facebook o LinkedIn.
Si cambias el nombre, el titular o la tarjeta, regenérala (usa tu Chrome o Edge):

```bash
node scripts/make-og.mjs && node build.mjs
```

---

## 3 · Publicar

### Netlify (lo más fácil)
1. Entra a <https://app.netlify.com/drop> y **arrastra la carpeta `public/`**. Listo, ya tienes URL.
2. O conecta el repositorio: Netlify lee `netlify.toml` (comando `node build.mjs`, carpeta `public`).
3. Conecta tu dominio en *Domain settings* y pon ese mismo dominio en `site.url`; vuelve a construir.

### Vercel
1. `npx vercel` dentro de esta carpeta (o importa el repositorio en vercel.com).
2. Vercel lee `vercel.json` (comando `node build.mjs`, salida `public`).

### Cualquier hosting estático (cPanel, Hostinger, GitHub Pages…)
Sube **el contenido de `public/`** a la carpeta pública del hosting. No necesita servidor ni base de datos.

### Después de publicar
- Sube `https://tu-dominio.com/sitemap.xml` en **Google Search Console**.
- Prueba los datos estructurados en <https://search.google.com/test/rich-results> (Product y FAQPage).
- Comparte el link por WhatsApp para confirmar que se ve la miniatura.

---

## 4 · Analítica y eventos de WhatsApp

En `site.config.mjs` completa uno o ambos IDs (vacío = apagado, no carga nada):

```js
analytics: { ga4: "G-XXXXXXXXXX", metaPixel: "123456789012345" }
```

Eventos que se envían automáticamente (también a `dataLayer`, por si usas Google Tag Manager):

| Evento           | Cuándo                                            | Parámetros               |
| ---------------- | ------------------------------------------------- | ------------------------ |
| `whatsapp_click` | Cada botón de WhatsApp (header, hero, packs, rubros, FAQ, CTA, flotante, footer) | `source`, `pack` |
| `generate_lead`  | Se envía el formulario (WhatsApp o correo)        | `method`, `industry`     |
| `demo_play`      | Se reproduce la demostración interactiva          | —                        |

En Meta Pixel, `whatsapp_click` se registra como **Contact** y `generate_lead` como **Lead**.

> Si activas analítica, recuerda informar el uso de cookies/analítica en tu política de privacidad (en Perú rige la Ley 29733 de Protección de Datos Personales).

---

## 5 · Qué incluye (resumen técnico)

- **Secciones:** hero con tarjeta NFC flotante · problema · cómo funciona con demo interactiva · beneficios · 3 packs · rubros con pestañas · FAQ · testimonios con contadores · CTA con formulario · footer legal.
- **Diseño:** fondo azul marino `#070B1A → #101B3F` con luces en los colores de Google, secciones claras alternadas, tarjetas «cristal», Archivo 600/800, gradiente animado en palabras clave. Todo en SVG/CSS (sin fotos de stock).
- **Accesibilidad:** skip-link, foco visible, tabs y acordeón con ARIA y teclado (flechas, Home/End), `prefers-reduced-motion` respetado, formulario con errores anunciados.
- **SEO:** `title` y `meta description`, canonical, Open Graph + Twitter Card, JSON-LD (`Organization`, 3 × `Product`, `FAQPage`), `sitemap.xml`, `robots.txt`, `lang="es-PE"`.
- **Sin JavaScript** el contenido sigue siendo legible (pestañas y FAQ se muestran desplegadas).
- **Rendimiento:** CSS minificado e incrustado, JS de ~14 KB sin dependencias, sin imágenes pesadas, fuente con `display=swap`.
  Medido con Lighthouse local (HTML comprimido): **móvil 92 · escritorio 98** en rendimiento; **100** en accesibilidad, buenas prácticas y SEO.
  *Tip:* la fuente de Google Fonts es lo único que frena el puntaje móvil (al probar sin ella medí 100). Si descargas Archivo y la sirves desde `assets/` con `@font-face` (licencia OFL, permitido), el rendimiento móvil sube.

---

## 6 · Lista para revisar antes de publicar

- [ ] `site.url` con tu dominio real.
- [ ] Precios, cantidades y días de entrega reales.
- [ ] **Testimonios reales** (los actuales son de ejemplo y están marcados «Ejemplo · reemplazar»; quita `placeholder: true` al reemplazarlos). No publiques testimonios inventados.
- [ ] Cifras reales en `proof.businesses` y `testimonials.stats`.
- [ ] URLs de Instagram / Facebook / TikTok (hoy dicen `TU_USUARIO`).
- [ ] Respuestas del FAQ revisadas: que coincidan con tu servicio real (reprogramación del enlace, plazos, compatibilidad).
- [ ] IDs de analítica (si los usarás).
- [ ] Probar el botón de WhatsApp desde tu celular.

## 7 · Aviso sobre Google

La página usa el logotipo «G» de Google para explicar el servicio. Google es marca registrada de Google LLC; el footer ya aclara que WODITEK **no está afiliado** a Google. El servicio solo facilita el acceso al formulario de reseñas: no compres, filtres ni incentives reseñas, para cumplir las políticas de contenido de Google Maps.
