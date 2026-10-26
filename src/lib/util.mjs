// Utilidades de texto compartidas por los constructores de HTML.

const HTML_ESCAPES = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escapa texto para usarlo dentro de HTML o atributos. */
export const esc = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);

/**
 * Texto enriquecido de la configuración:
 *   {{palabras}} → degradado de Google,  **palabras** → negrita.
 * Primero se escapa todo, así que el contenido nunca inyecta HTML.
 */
export const rich = (value, vars = {}) => {
  let text = interpolate(String(value ?? ""), vars);
  text = esc(text);
  return text
    .replace(/\{\{(.+?)\}\}/g, '<span class="g-text">$1</span>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
};

/** Reemplaza {clave} por vars.clave (las {{…}} se respetan). */
export const interpolate = (text, vars = {}) =>
  text.replace(/\{(\w+)\}/g, (match, key) => (key in vars ? vars[key] : match));

/** Texto plano (sin marcas de formato) para meta tags y JSON-LD. */
export const plain = (value, vars = {}) =>
  interpolate(String(value ?? ""), vars).replace(/\{\{(.+?)\}\}/g, "$1").replace(/\*\*(.+?)\*\*/g, "$1");

/** Enlace de WhatsApp con mensaje prellenado. */
export const waLink = (config, message) =>
  `https://wa.me/${config.whatsapp.number}?text=${encodeURIComponent(message)}`;

/** «S/ 59» o «S/ 59.90» */
export const money = (config, amount) => {
  const formatted = Number.isInteger(amount)
    ? String(amount)
    : amount.toLocaleString("es-PE", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${config.country.symbol} ${formatted}`;
};

/** Las 4 variantes de color de Google por nombre. */
export const GOOGLE = {
  blue: { base: "#4285F4", deep: "#1A73E8", soft: "#E8F0FE" },
  red: { base: "#EA4335", deep: "#D93025", soft: "#FCE8E6" },
  yellow: { base: "#FBBC05", deep: "#B06000", soft: "#FEF7E0" },
  green: { base: "#34A853", deep: "#188038", soft: "#E6F4EA" },
};
