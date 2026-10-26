// Genera src/assets/img/og-image.png (1200×630) — la imagen que se ve al compartir
// el enlace en WhatsApp, Facebook, LinkedIn, etc.
//
// Reutiliza el CSS y la tarjeta de la landing y la «fotografía» con Chrome en modo
// headless, así queda idéntica al diseño.   Uso:  node scripts/make-og.mjs
// (Necesita Chrome o Edge instalado; opcional: CHROME_PATH=/ruta/a/chrome)

import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { minifyCss } from "../build.mjs";
import { logoMark, nfcCard } from "../src/lib/visuals.mjs";
import { rich } from "../src/lib/util.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "src", "assets", "img", "og-image.png");

const candidates = [
  process.env.CHROME_PATH,
  "C:/Program Files/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);
const chrome = candidates.find((p) => existsSync(p));
if (!chrome) {
  console.error("No encontré Chrome/Edge. Define CHROME_PATH con la ruta del ejecutable.");
  process.exit(1);
}

const { default: cfg } = await import(pathToFileURL(join(ROOT, "site.config.mjs")).href);
const css = minifyCss(readFileSync(join(ROOT, "src", "assets", "css", "styles.css"), "utf8"));

const html = `<!doctype html><html lang="es"><head><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;600;800&display=swap">
<style>${css}
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#070B1A}
.og{position:relative;overflow:hidden;width:1200px;height:630px;display:grid;grid-template-columns:1fr 400px;align-items:center;gap:30px;padding:0 80px;
  background:linear-gradient(135deg,#070B1A 0%,#101B3F 100%);color:#fff;font-family:Archivo,system-ui,sans-serif}
.og .glow{opacity:.5;animation:none}
.og__copy{display:grid;gap:26px;justify-items:start}
.og .logo{font-size:26px}.og .logo__mark{width:52px;height:52px}
.og h1{margin:0;font-size:78px;font-weight:800;line-height:1.02;letter-spacing:-.035em}
.og p{margin:0;font-size:30px;color:#c3ccea}
.og__pill{display:inline-flex;align-items:center;gap:12px;padding:12px 22px;border-radius:999px;background:rgba(255,255,255,.09);border:1px solid rgba(255,255,255,.2);font-size:24px;font-weight:600}
.og__pill i{width:12px;height:12px;border-radius:50%;background:#34A853;box-shadow:0 0 0 5px rgba(52,168,83,.3)}
.og__card{position:relative;display:grid;place-items:center;font-size:21px}
.og__card .nfc-card{transform:rotate(6deg)}
</style></head><body class="sec--dark"><div class="og">
<span class="glow glow--blue glow--1"></span><span class="glow glow--red glow--2"></span><span class="glow glow--green glow--3"></span>
<div class="og__copy">
  <a class="logo">${logoMark()}<span class="logo__word">${cfg.brand.name}</span></a>
  <h1>Más {{reseñas en Google}}, con un solo toque</h1>
  <p>Tarjetas NFC para negocios locales</p>
  <span class="og__pill"><i></i>Sin app · Sin QR · Sin mensualidades</span>
</div>
<div class="og__card">${nfcCard(cfg)}</div>
</div></body></html>`.replace("{{reseñas en Google}}", '<span class="g-text">reseñas en Google</span>');

const tmp = mkdtempSync(join(tmpdir(), "woditek-og-"));
const file = join(tmp, "og.html");
writeFileSync(file, html);
execFileSync(
  chrome,
  ["--headless=new", "--hide-scrollbars", "--disable-gpu", "--window-size=1200,630", "--virtual-time-budget=10000",
   `--screenshot=${OUT}`, pathToFileURL(file).href],
  { stdio: "ignore" }
);
console.log(`✔ ${OUT}`);
