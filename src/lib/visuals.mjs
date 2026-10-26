// Ilustraciones y mockups hechos 100 % con SVG / CSS (sin imágenes de stock).

import { broadcast, googleG, icon, stars } from "./icons.mjs";
import { GOOGLE, esc } from "./util.mjs";

/** Marca de WODITEK: tile blanco con el símbolo de transmisión en colores Google. */
export const logoMark = () => {
  const cx = 20;
  const cy = 27;
  const a = (47 * Math.PI) / 180;
  const arcs = [
    { r: 5.2, color: "#34A853" },
    { r: 9.4, color: "#FBBC05" },
    { r: 13.6, color: "#4285F4" },
  ]
    .map(({ r, color }) => {
      const x = Math.sin(a) * r;
      const y = cy - Math.cos(a) * r;
      return `<path d="M${(cx - x).toFixed(1)} ${y.toFixed(1)}A${r} ${r} 0 0 1 ${(cx + x).toFixed(1)} ${y.toFixed(1)}" stroke="${color}"/>`;
    })
    .join("");
  return `<svg class="logo__mark" viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" focusable="false"><rect width="40" height="40" rx="11" fill="#fff"/><g fill="none" stroke-width="3.2" stroke-linecap="round">${arcs}</g><circle cx="${cx}" cy="${cy}" r="2.6" fill="#EA4335"/></svg>`;
};

/** Letras de «Google» en sus colores, como en la tarjeta del producto. */
const googleWord = () => {
  const letters = [
    ["G", "#4285F4"],
    ["o", "#EA4335"],
    ["o", "#FBBC05"],
    ["g", "#4285F4"],
    ["l", "#34A853"],
    ["e", "#EA4335"],
  ];
  return letters.map(([l, c]) => `<span style="color:${c}">${l}</span>`).join("");
};

/**
 * La tarjeta NFC blanca (vertical, como la del producto real).
 * Se escala con font-size: todo está en em.
 */
export const nfcCard = (cfg, { animated = false } = {}) => `
<div class="nfc-card${animated ? " is-animated" : ""}" role="img" aria-label="Tarjeta NFC blanca con el logo de Google, el símbolo de transmisión y cinco estrellas amarillas">
  <div class="nfc-card__face" aria-hidden="true">
    ${broadcast({ cls: "nfc-card__wave" })}
    ${googleG({ cls: "nfc-card__g", size: 120 })}
    <span class="nfc-card__stars">${stars(5, { size: 24 })}</span>
    <span class="nfc-card__title">${esc(cfg.hero.cardTitle)}</span>
    <span class="nfc-card__brand">${esc(cfg.hero.cardSub)} ${googleWord()}</span>
    <span class="nfc-card__shine"></span>
  </div>
</div>`;

/** Avatar plano ilustrado (sin fotos de stock). */
export const avatar = ({ bg = "#4285F4", skin = "#F1C9A5", hair = "#2B1B12", shirt = "#101B3F", size = 56 } = {}) =>
  `<svg class="avatar" viewBox="0 0 64 64" width="${size}" height="${size}" aria-hidden="true" focusable="false"><rect width="64" height="64" fill="${bg}"/><path d="M8 66c2-14 12-21 24-21s22 7 24 21z" fill="${shirt}"/><rect x="27" y="34" width="10" height="13" rx="5" fill="${skin}"/><circle cx="32" cy="27" r="11" fill="${skin}"/><path d="M20.5 27c-1-9 4.5-14 11.5-14s12.5 5 11.5 14c-2.5-4.5-6.5-6.5-11.5-6.5s-9 2-11.5 6.5z" fill="${hair}"/></svg>`;

/** Hoja de símbolos reutilizables (mini tarjeta) — va una sola vez en el <body>. */
export const spriteSheet = () => `
<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="mc-ring" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#EA4335"/><stop offset=".35" stop-color="#FBBC05"/>
      <stop offset=".65" stop-color="#34A853"/><stop offset="1" stop-color="#4285F4"/>
    </linearGradient>
    <symbol id="mini-card" viewBox="0 0 60 86">
      <rect x="1" y="1" width="58" height="84" rx="9" fill="#fff"/>
      <rect x=".5" y=".5" width="59" height="85" rx="9.5" fill="none" stroke="#d7ddee"/>
      <g fill="none" stroke="#14192e" stroke-width="2.4" stroke-linecap="round">
        <path d="M24 15a8 8 0 0 1 12 0"/><path d="M20.5 11.5a13 13 0 0 1 19 0"/>
      </g>
      <circle cx="30" cy="19.5" r="1.9" fill="#14192e"/>
      <circle cx="30" cy="42" r="11" fill="none" stroke="url(#mc-ring)" stroke-width="6"/>
      <g fill="#FBBC05"><circle cx="17" cy="64" r="2.4"/><circle cx="23.5" cy="64" r="2.4"/><circle cx="30" cy="64" r="2.4"/><circle cx="36.5" cy="64" r="2.4"/><circle cx="43" cy="64" r="2.4"/></g>
      <rect x="14" y="71" width="32" height="3.4" rx="1.7" fill="#14192e" opacity=".8"/>
    </symbol>
    <symbol id="scene-base" viewBox="0 0 420 300">
      <rect x="0" y="222" width="420" height="78" fill="#101B3F"/>
      <rect x="0" y="222" width="420" height="8" fill="#1d2b5e"/>
      <ellipse cx="206" cy="226" rx="62" ry="6" fill="rgba(0,0,0,.28)"/>
      <rect x="176" y="214" width="60" height="12" rx="4" fill="#dfe5f4"/>
      <use href="#mini-card" width="64" height="92" x="174" y="128"/>
      <g class="scene__waves" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round">
        <path d="M268 156a26 26 0 0 0 0-30"/><path d="M280 162a38 38 0 0 0 0-42"/>
      </g>
      <g transform="translate(300 96) rotate(10)">
        <rect width="62" height="112" rx="11" fill="#0B1230"/>
        <rect x="4" y="5" width="54" height="102" rx="8" fill="#fff"/>
        <rect x="21" y="8" width="20" height="4" rx="2" fill="#0B1230"/>
        <g fill="#FBBC05"><circle cx="14" cy="42" r="3.6"/><circle cx="24" cy="42" r="3.6"/><circle cx="34" cy="42" r="3.6"/><circle cx="44" cy="42" r="3.6"/><circle cx="54" cy="42" r="3.6" opacity=".35"/></g>
        <rect x="12" y="58" width="38" height="5" rx="2.5" fill="#d7ddee"/>
        <rect x="12" y="68" width="30" height="5" rx="2.5" fill="#d7ddee"/>
        <rect x="12" y="86" width="38" height="12" rx="6" fill="#4285F4"/>
      </g>
    </symbol>
  </defs>
</svg>`;

/** Ilustración de cada pack: cuántas tarjetas incluye (y soportes / stickers). */
export const packArt = (id) => {
  const card = (x, y, rot, s = 1) =>
    `<use href="#mini-card" x="0" y="0" width="${60 * s}" height="${86 * s}" transform="translate(${x} ${y}) rotate(${rot})"/>`;
  if (id === "basico") {
    return `<svg class="pack__art" viewBox="0 0 200 120" aria-hidden="true" focusable="false"><ellipse cx="100" cy="108" rx="52" ry="7" fill="rgba(0,0,0,.25)"/>${card(66, 14, -5, 1.05)}</svg>`;
  }
  if (id === "negocio") {
    return `<svg class="pack__art" viewBox="0 0 200 120" aria-hidden="true" focusable="false"><ellipse cx="100" cy="108" rx="78" ry="7" fill="rgba(0,0,0,.25)"/>${card(30, 26, -12, 0.9)}${card(114, 22, 11, 0.9)}<rect x="62" y="96" width="76" height="9" rx="4.5" fill="#fff" opacity=".18"/>${card(66, 10, 0, 1.05)}</svg>`;
  }
  return `<svg class="pack__art" viewBox="0 0 200 120" aria-hidden="true" focusable="false"><ellipse cx="100" cy="108" rx="90" ry="7" fill="rgba(0,0,0,.25)"/>${card(8, 30, -14, 0.72)}${card(46, 22, -7, 0.78)}${card(112, 22, 7, 0.78)}${card(150, 30, 14, 0.72)}${card(76, 8, 0, 0.95)}<circle cx="181" cy="22" r="13" fill="#4285F4"/><path d="M175 22a6 6 0 0 1 12 0M178 25a3 3 0 0 1 6 0" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round"/></svg>`;
};

/**
 * Escena plana por rubro: mostrador + tarjeta + celular tocándola.
 * Se tiñe con el color de Google asignado al rubro.
 */
export const industryScene = (item, iconBody) => {
  const c = GOOGLE[item.color] ?? GOOGLE.blue;
  // Solo lo que cambia por rubro; el mostrador, la tarjeta y el celular viven en #scene-base.
  return `<svg class="scene" viewBox="0 0 420 300" role="img" aria-label="Ilustración: tarjeta NFC en un negocio de tipo ${esc(item.name)}" focusable="false" style="color:${c.deep}">
  <rect width="420" height="300" rx="28" fill="${c.soft}"/>
  <circle cx="318" cy="92" r="104" fill="${c.base}" opacity=".13"/>
  <circle cx="82" cy="236" r="64" fill="${c.base}" opacity=".12"/>
  <g transform="translate(34 34)">
    <rect width="112" height="112" rx="30" fill="#fff" opacity=".9"/>
    <g transform="translate(19 19) scale(3.15)" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${iconBody}</g>
  </g>
  <use href="#scene-base" width="420" height="300"/>
</svg>`;
};

/** Mini teléfono-icono (pasos de «cómo funciona»), con wrapper para animar. */
export const stepIcon = (name) => `<span class="step__icon" data-icon="${esc(name)}">${icon(name, { size: 28 })}</span>`;
