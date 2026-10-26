// Constructores de HTML de cada sección. Todo el texto viene de site.config.mjs.

import { broadcast, fillIcon, googleG, icon, iconBody, stars } from "./icons.mjs";
import { GOOGLE, esc, interpolate, money, rich, waLink } from "./util.mjs";
import { avatar, industryScene, nfcCard, packArt, spriteSheet } from "./visuals.mjs";

/** Atributos de animación al hacer scroll (con retraso opcional en ms). */
const rv = (delay = 0) => `data-reveal${delay ? ` style="--d:${delay}ms"` : ""}`;
/** Igual, pero se anima solo con CSS al cargar (para lo que está en pantalla desde el inicio: no depende de JS). */
const rvNow = (delay = 0) => `data-reveal="now"${delay ? ` style="--d:${delay}ms"` : ""}`;

export function createSections(cfg) {
  const vars = { delivery: cfg.delivery.days };
  const t = (text) => interpolate(text, vars);
  const wa = (message) => waLink(cfg, message);
  const waGeneral = wa(cfg.whatsapp.messages.general);

  /** Botón de WhatsApp con seguimiento de analítica (data-wa = origen del clic). */
  const waButton = ({ source, label, href = waGeneral, cls = "", pack = "" }) =>
    `<a class="btn btn--wa ${cls}" href="${esc(href)}" target="_blank" rel="noopener" data-wa="${esc(source)}"${pack ? ` data-pack="${esc(pack)}"` : ""}>${fillIcon("whatsapp", { size: 22, cls: "btn__icon" })}<span>${esc(label)}</span></a>`;

  const head = ({ eyebrow, title, lead, cls = "" }) => `
    <header class="sec-head ${cls}">
      <p class="eyebrow" ${rv()}>${esc(eyebrow)}</p>
      <h2 class="h2" ${rv(80)}>${rich(title, vars)}</h2>
      ${lead ? `<p class="lead" ${rv(160)}>${rich(lead, vars)}</p>` : ""}
    </header>`;

  const glows = (...colors) =>
    colors.map((c, i) => `<span class="glow glow--${c} glow--${i + 1}" aria-hidden="true"></span>`).join("");

  // ---------------------------------------------------------------- HEADER
  const header = () => `
<a class="skip-link" href="#contenido">Saltar al contenido</a>
<header class="site-header" data-header>
  <div class="container header__inner">
    <a class="logo" href="#inicio" aria-label="${esc(cfg.brand.name)}, ir al inicio"><span class="logo__word">${esc(cfg.brand.name)}</span></a>
    <nav class="nav" aria-label="Principal">
      <ul>${cfg.nav.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>
    </nav>
    ${waButton({ source: "header", label: cfg.nav.cta, cls: "btn--sm header__cta" })}
    <button class="menu-btn" type="button" aria-expanded="false" aria-controls="menu-movil" aria-label="Abrir menú" data-menu-btn>
      <span class="menu-btn__open">${icon("menu", { size: 26 })}</span><span class="menu-btn__close">${icon("x", { size: 26 })}</span>
    </button>
  </div>
  <div class="mobile-menu" id="menu-movil" data-menu hidden>
    <nav aria-label="Menú móvil">
      <ul>${cfg.nav.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>
    </nav>
    ${waButton({ source: "menu", label: cfg.nav.cta, cls: "btn--block" })}
  </div>
</header>`;

  // ------------------------------------------------------------------ HERO
  const hero = () => {
    const h = cfg.hero;
    const p = cfg.proof;
    const avatars = p.avatars
      .map((bg, i) => avatar({ bg, size: 40, skin: ["#F1C9A5", "#D9A57A", "#E7B891", "#C98F62"][i % 4], hair: ["#2B1B12", "#6B3F23", "#1C1C24", "#3B2417"][i % 4] }))
      .join("");
    return `
<section class="hero sec sec--dark" id="inicio" aria-labelledby="hero-title">
  ${glows("blue", "red", "green", "yellow")}
  <div class="container hero__grid">
    <div class="hero__copy">
      <h1 class="display" id="hero-title" ${rvNow(80)}>${rich(h.title, vars)}</h1>
      <p class="lead" ${rvNow(160)}>${esc(h.subtitle)}</p>
      <div class="hero__actions" ${rvNow(240)}>
        ${waButton({ source: "hero", label: h.ctaPrimary, cls: "btn--lg" })}
        <a class="btn btn--ghost btn--lg" href="#como-funciona"><span>${esc(h.ctaSecondary)}</span>${icon("arrow-right", { size: 20, cls: "btn__icon" })}</a>
      </div>
      <ul class="trust" ${rvNow(320)}>${h.trust.map((x) => `<li>${icon("check-circle", { size: 20 })}<span>${esc(t(x))}</span></li>`).join("")}</ul>
    </div>

    <div class="hero__visual" data-tilt ${rvNow(120)}>
      <div class="rings" aria-hidden="true"><span></span><span></span><span></span></div>
      <div class="hero__tilt">
        <div class="hero__float">${nfcCard(cfg, { animated: true })}</div>
      </div>
      <div class="chip chip--toast" aria-hidden="true">
        <span class="chip__g">${googleG({ size: 26 })}</span>
        <span class="chip__text"><strong>${esc(h.toast.title)}</strong><span>${esc(h.toast.text)}</span></span>
      </div>
      <div class="chip chip--score" aria-hidden="true"><span class="chip__star">${fillIcon("star", { size: 22 })}</span><strong>${esc(p.rating)}</strong></div>
    </div>
  </div>

  <div class="container">
    <div class="proof glass" ${rvNow(200)}>
      <div class="proof__avatars">${avatars}</div>
      <p class="proof__text"><strong>+<span data-count="${p.businesses}">${p.businesses}</span></strong> ${esc(p.label)}</p>
      <div class="proof__rating" role="img" aria-label="Calificación ${esc(p.rating)} de 5"><span class="proof__stars">${stars(5, { size: 18 })}</span><strong>${esc(p.rating)}</strong></div>
    </div>
  </div>
</section>`;
  };

  // -------------------------------------------------------------- PROBLEMA
  const problem = () => {
    const p = cfg.problem;
    const c = p.compare;
    const why = p.why
      .map((w, i) => {
        const g = GOOGLE[w.color] ?? GOOGLE.blue;
        return `<article class="card card--why" ${rv(i * 100)}>
          <span class="tile" style="--tile-bg:${g.soft};--tile-fg:${g.deep}">${icon(w.icon, { size: 26 })}</span>
          <h4>${esc(w.title)}</h4><p>${esc(w.text)}</p></article>`;
      })
      .join("");
    const whyNot = p.whyNot
      .map(
        (w, i) => `<li ${rv(i * 100)}><span class="tile tile--sm tile--bad">${icon(w.icon, { size: 22 })}</span>
          <div><h4>${esc(w.title)}</h4><p>${esc(w.text)}</p></div></li>`
      )
      .join("");
    const chain = c.withoutSteps.map((s, i) => `<li><span class="chain__n">${i + 1}</span>${esc(s)}</li>`).join("");
    return `
<section class="sec sec--light problem" id="problema" aria-labelledby="problema-title">
  <div class="container">
    ${head({ eyebrow: p.eyebrow, title: p.title, lead: p.lead }).replace("<h2 ", '<h2 id="problema-title" ')}
    <h3 class="sub-title" ${rv()}>${esc(p.whyTitle)}</h3>
    <div class="grid grid--3 grid--odd">${why}</div>

    <div class="problem__split">
      <div class="problem__whynot">
        <h3 class="sub-title" ${rv()}>${esc(p.whyNotTitle)}</h3>
        <ul class="list-icons">${whyNot}</ul>
      </div>
      <div class="compare" ${rv(120)}>
        <div class="compare__col compare__col--bad">
          <div class="compare__head"><h4>${esc(c.withoutTitle)}</h4><span class="pill pill--bad">${esc(c.withoutBadge)}</span></div>
          <ol class="chain">${chain}</ol>
        </div>
        <div class="compare__col compare__col--good">
          <div class="compare__head"><h4>${esc(c.withTitle)}</h4><span class="pill pill--good">${esc(c.withBadge)}</span></div>
          <div class="tap">
            <span class="tap__waves" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="tap__icon">${icon("nfc", { size: 40 })}</span>
          </div>
          <p class="compare__big">${esc(c.withText)}</p>
          <p class="compare__note">${esc(c.withNote)}</p>
        </div>
      </div>
    </div>
  </div>
</section>`;
  };

  // ---------------------------------------------------------- CÓMO FUNCIONA
  const how = () => {
    const h = cfg.how;
    const d = h.demo;
    const steps = h.steps
      .map(
        (s, i) => `<li class="step" data-step="${i + 1}" ${rv(i * 120)}>
        <span class="step__num" aria-hidden="true">${i + 1}</span>
        <span class="step__icon">${icon(s.icon, { size: 26 })}</span>
        <div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`
      )
      .join("");
    return `
<section class="sec sec--dark how" id="como-funciona" aria-labelledby="how-title">
  ${glows("blue", "green", "red")}
  <div class="container">
    ${head({ eyebrow: h.eyebrow, title: h.title, lead: h.lead }).replace("<h2 ", '<h2 id="how-title" ')}
    <div class="how__grid">
      <ol class="steps" data-steps>${steps}</ol>

      <div class="demo" data-demo data-state="idle" ${rv(120)}>
        <div class="demo__stage" data-demo-stage>
          <div class="demo__ground" aria-hidden="true"></div>
          <div class="demo__card" aria-hidden="true">${nfcCard(cfg)}</div>
          <div class="demo__waves" aria-hidden="true"><i></i><i></i><i></i></div>
          <div class="demo__phone" aria-hidden="true">
            <div class="phone">
              <span class="phone__notch"></span>
              <div class="phone__screen">
                <div class="scr scr--lock">
                  <span class="lock__time">${esc(d.lockTime)}</span>
                  <span class="lock__chip">${icon("nfc", { size: 16 })}${esc(d.lockLabel)}</span>
                </div>
                <div class="scr scr--review">
                  <div class="rev__top">${googleG({ size: 18 })}<span>Google</span></div>
                  <strong class="rev__biz">${esc(d.reviewTitle)}</strong>
                  <span class="rev__sub">${esc(d.reviewSub)}</span>
                  <span class="rev__stars">${stars(5, { size: 22, cls: "rev-star" })}</span>
                  <span class="rev__box">${esc(d.reviewPlaceholder)}</span>
                  <span class="rev__btn">${esc(d.reviewButton)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="demo__bar">
          <button class="btn btn--glass btn--sm" type="button" data-demo-play data-label-play="${esc(d.play)}" data-label-replay="${esc(d.replay)}"><span>${esc(d.play)}</span></button>
          <span class="demo__hint">${esc(d.hint)}</span>
        </div>
        <p class="sr-only" role="status" aria-live="polite" data-demo-status></p>
      </div>
    </div>
  </div>
</section>`;
  };

  // ------------------------------------------------------------ BENEFICIOS
  const benefits = () => {
    const b = cfg.benefits;
    const items = b.items
      .map((it, i) => {
        const g = GOOGLE[it.color] ?? GOOGLE.blue;
        return `<article class="card card--benefit" ${rv((i % 3) * 100)}>
          <span class="tile" style="--tile-bg:${g.soft};--tile-fg:${g.deep}">${icon(it.icon, { size: 26 })}</span>
          <h3>${esc(it.title)}</h3><p>${esc(it.text)}</p></article>`;
      })
      .join("");
    return `
<section class="sec sec--light benefits" id="beneficios" aria-labelledby="ben-title">
  <div class="container">
    ${head({ eyebrow: b.eyebrow, title: b.title, lead: b.lead }).replace("<h2 ", '<h2 id="ben-title" ')}
    <div class="grid grid--3">${items}</div>
  </div>
</section>`;
  };

  // ----------------------------------------------------------------- PACKS
  const packs = () => {
    const p = cfg.packs;
    const cards = p.items
      .map((pk, i) => {
        const href = wa(interpolate(cfg.whatsapp.messages.pack, { pack: pk.name }));
        const price =
          pk.price == null
            ? `<span class="pack__amount pack__amount--quote">Cotizar</span>`
            : `${pk.pricePrefix ? `<span class="pack__prefix">${esc(pk.pricePrefix)}</span>` : ""}<span class="pack__amount">${esc(money(cfg, pk.price))}</span><span class="pack__note">${esc(p.payNote)}</span>`;
        return `<article class="pack glass${pk.featured ? " pack--featured" : ""}" ${rv(i * 120)}>
          ${pk.badge ? `<span class="pack__badge">${fillIcon("star", { size: 14 })}${esc(pk.badge)}</span>` : ""}
          ${packArt(pk.id)}
          <h3 class="pack__name">${esc(pk.name)}</h3>
          <p class="pack__tag">${esc(pk.tagline)}</p>
          <p class="pack__price">${price}</p>
          <ul class="pack__features">${pk.features.map((f) => `<li>${icon("check", { size: 18 })}<span>${esc(f)}</span></li>`).join("")}</ul>
          ${waButton({ source: `pack-${pk.id}`, label: p.cta, href, cls: "btn--block", pack: pk.name })}
        </article>`;
      })
      .join("");
    return `
<section class="sec sec--dark packs" id="packs" aria-labelledby="packs-title">
  ${glows("yellow", "blue", "green")}
  <div class="container">
    ${head({ eyebrow: p.eyebrow, title: p.title, lead: p.lead }).replace("<h2 ", '<h2 id="packs-title" ')}
    <div class="packs__grid">${cards}</div>
    <ul class="packs__trust" ${rv()}>${cfg.hero.trust.map((x) => `<li>${icon("check-circle", { size: 18 })}<span>${esc(t(x))}</span></li>`).join("")}</ul>
  </div>
</section>`;
  };

  // ---------------------------------------------------------------- RUBROS
  const industries = () => {
    const ind = cfg.industries;
    const tabs = ind.items
      .map(
        (it, i) => `<button class="tab" role="tab" type="button" id="tab-${it.id}" aria-selected="${i === 0}" aria-controls="panel-${it.id}" tabindex="${i === 0 ? 0 : -1}" data-tab="${it.id}">${icon(it.icon, { size: 20 })}<span>${esc(it.name)}</span></button>`
      )
      .join("");
    const panels = ind.items
      .map((it, i) => {
        const href = wa(interpolate(cfg.whatsapp.messages.industry, { industry: it.name }));
        return `<div class="tabpanel" role="tabpanel" id="panel-${it.id}" aria-labelledby="tab-${it.id}" tabindex="0"${i === 0 ? "" : " hidden"}>
          <div class="industry">
            <div class="industry__art">${industryScene(it, iconBody(it.icon))}</div>
            <div class="industry__body">
              <h3>${esc(it.name)}</h3>
              <dl class="industry__list">
                <div><dt>${icon("map-pin", { size: 18 })}${esc(ind.whereLabel)}</dt><dd>${esc(it.where)}</dd></div>
                <div><dt>${icon("clock", { size: 18 })}${esc(ind.momentLabel)}</dt><dd>${esc(it.moment)}</dd></div>
                <div><dt>${icon("sparkles", { size: 18 })}${esc(ind.tipLabel)}</dt><dd>${esc(it.tip)}</dd></div>
              </dl>
              ${waButton({ source: `rubro-${it.id}`, label: ind.cta, href, cls: "btn--sm" })}
            </div>
          </div>
        </div>`;
      })
      .join("");
    return `
<section class="sec sec--light industries" id="rubros" aria-labelledby="rub-title">
  <div class="container">
    ${head({ eyebrow: ind.eyebrow, title: ind.title, lead: ind.lead }).replace("<h2 ", '<h2 id="rub-title" ')}
    <div class="tabs" data-tabs ${rv(100)}>
      <div class="tablist-wrap"><div class="tablist" role="tablist" aria-label="Rubros de negocio">${tabs}</div></div>
      <div class="tabpanels">${panels}</div>
    </div>
  </div>
</section>`;
  };

  // ------------------------------------------------------------------- FAQ
  const faq = () => {
    const f = cfg.faq;
    const items = f.items
      .map(
        (it, i) => `<li class="faq__item glass" ${rv(i * 60)}>
        <h3><button class="faq__q" type="button" id="faq-q${i}" aria-expanded="false" aria-controls="faq-a${i}"><span>${esc(it.q)}</span>${icon("chevron-down", { size: 22, cls: "faq__chev" })}</button></h3>
        <div class="faq__a" id="faq-a${i}" role="region" aria-labelledby="faq-q${i}"><div class="faq__a-inner"><p>${rich(it.a, vars)}</p></div></div>
      </li>`
      )
      .join("");
    return `
<section class="sec sec--dark faq" id="preguntas" aria-labelledby="faq-title">
  ${glows("blue", "red")}
  <div class="container faq__grid">
    <div class="faq__intro">
      ${head({ eyebrow: f.eyebrow, title: f.title, cls: "sec-head--left" }).replace("<h2 ", '<h2 id="faq-title" ')}
      <div ${rv(200)}>${waButton({ source: "faq", label: cfg.nav.cta })}</div>
    </div>
    <ul class="faq__list">${items}</ul>
  </div>
</section>`;
  };

  // ----------------------------------------------------------- TESTIMONIOS
  const testimonials = () => {
    const ts = cfg.testimonials;
    const cards = ts.items
      .map((it, i) => {
        const bg = ["#4285F4", "#34A853", "#EA4335"][i % 3];
        return `<figure class="card card--quote" ${rv(i * 120)}>
          ${it.placeholder ? `<span class="tag-example">${esc(ts.exampleLabel)}</span>` : ""}
          <span class="quote__stars" role="img" aria-label="5 de 5 estrellas">${stars(5, { size: 20 })}</span>
          <blockquote><p>${esc(it.quote)}</p></blockquote>
          <span class="pill pill--good quote__result">${icon("trending-up", { size: 16 })}${esc(it.result)}</span>
          <figcaption>${avatar({ bg, skin: it.skin, hair: it.hair, size: 52 })}<span><strong>${esc(it.name)}</strong><small>${esc(it.business)}</small></span></figcaption>
        </figure>`;
      })
      .join("");
    const stats = ts.stats
      .map(
        (s) => `<div class="stat"><strong class="stat__n">${esc(s.prefix ?? "")}<span data-count="${s.value}">${s.value}</span>${esc(s.suffix ?? "")}</strong><span class="stat__l">${esc(s.label)}</span></div>`
      )
      .join("");
    return `
<section class="sec sec--light testimonials" id="testimonios" aria-labelledby="test-title">
  <div class="container">
    ${head({ eyebrow: ts.eyebrow, title: ts.title }).replace("<h2 ", '<h2 id="test-title" ')}
    <div class="grid grid--3 grid--odd">${cards}</div>
    <div class="stats" ${rv()}>${stats}</div>
  </div>
</section>`;
  };

  // ----------------------------------------------------------- LLAMADO FINAL
  const cta = () => {
    const c = cfg.cta;
    const f = c.form;
    const options = [...cfg.industries.items.map((i) => i.name), f.industryOther]
      .map((n) => `<option value="${esc(n)}">${esc(n)}</option>`)
      .join("");
    return `
<section class="sec sec--dark cta" id="contacto" aria-labelledby="cta-title">
  ${glows("blue", "red", "yellow", "green")}
  <div class="container">
    <div class="cta__panel glass" ${rv()}>
      <div class="cta__copy">
        <h2 class="h2 h2--xl" id="cta-title">${rich(c.title, vars)}</h2>
        <p class="lead">${esc(c.text)}</p>
        ${waButton({ source: "cta-final", label: c.button, cls: "btn--lg" })}
        <ul class="trust trust--inline">${c.micro.map((x) => `<li>${icon("check-circle", { size: 18 })}<span>${esc(t(x))}</span></li>`).join("")}</ul>
      </div>
      <form class="form" data-form novalidate aria-labelledby="form-title">
        <h3 id="form-title">${esc(f.title)}</h3>
        <div class="field"><label for="f-name">${esc(f.name)}</label><input id="f-name" name="name" type="text" autocomplete="name" required aria-describedby="f-name-err"><span class="field__err" id="f-name-err" role="alert"></span></div>
        <div class="field"><label for="f-business">${esc(f.business)}</label><input id="f-business" name="business" type="text" autocomplete="organization" required aria-describedby="f-business-err"><span class="field__err" id="f-business-err" role="alert"></span></div>
        <div class="field"><label for="f-phone">${esc(f.phone)}</label><input id="f-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" placeholder="9XX XXX XXX" required aria-describedby="f-phone-err"><span class="field__err" id="f-phone-err" role="alert"></span></div>
        <div class="field"><label for="f-industry">${esc(f.industry)}</label><select id="f-industry" name="industry" required aria-describedby="f-industry-err"><option value="">${esc(f.industryPlaceholder)}</option>${options}</select><span class="field__err" id="f-industry-err" role="alert"></span></div>
        <button class="btn btn--wa btn--block" type="submit">${fillIcon("whatsapp", { size: 22, cls: "btn__icon" })}<span>${esc(f.submit)}</span></button>
        ${cfg.contact.email ? `<button class="btn btn--ghost btn--block" type="button" data-form-email>${icon("mail", { size: 20, cls: "btn__icon" })}<span>${esc(f.submitEmail)}</span></button>` : ""}
        <p class="form__status" role="status" aria-live="polite" data-form-status></p>
      </form>
    </div>
  </div>
</section>`;
  };

  // ---------------------------------------------------------------- FOOTER
  const footer = () => {
    const f = cfg.footer;
    const social = cfg.social
      .filter((s) => s.url)
      .map(
        (s) => `<li><a class="social" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer me" aria-label="${esc(s.label)}">${icon(s.id, { size: 22 })}</a></li>`
      )
      .join("");
    return `
<footer class="footer sec--ink" id="footer">
  <div class="container">
    <div class="footer__grid">
      <div class="footer__brand">
        <a class="logo" href="#inicio" aria-label="${esc(cfg.brand.name)}, ir al inicio"><span class="logo__word">${esc(cfg.brand.name)}</span></a>
        <p>${esc(f.text)}</p>
        ${social ? `<ul class="footer__social" aria-label="${esc(f.socialTitle)}">${social}</ul>` : ""}
      </div>
      <nav class="footer__col" aria-label="${esc(f.linksTitle)}">
        <h3>${esc(f.linksTitle)}</h3>
        <ul>${cfg.nav.links.map((l) => `<li><a href="${esc(l.href)}">${esc(l.label)}</a></li>`).join("")}</ul>
      </nav>
      <div class="footer__col">
        <h3>${esc(f.contactTitle)}</h3>
        <ul>
          <li><a href="${esc(waGeneral)}" target="_blank" rel="noopener" data-wa="footer">${fillIcon("whatsapp", { size: 18 })}<span>WhatsApp ${esc(cfg.whatsapp.display)}</span></a></li>
          ${cfg.contact.email ? `<li><a href="mailto:${esc(cfg.contact.email)}">${icon("mail", { size: 18 })}<span>${esc(cfg.contact.email)}</span></a></li>` : ""}
        </ul>
      </div>
    </div>
    <div class="footer__legal">
      <h3>${esc(f.legalTitle)}</h3>
      ${f.legal.map((p) => `<p>${esc(p)}</p>`).join("")}
    </div>
    <p class="footer__copy">© ${new Date().getFullYear()} ${esc(cfg.brand.name)}. ${esc(f.rights)}</p>
  </div>
</footer>`;
  };

  // --------------------------------------------------- WHATSAPP FLOTANTE
  const floating = () => `
<a class="wa-float" href="${esc(waGeneral)}" target="_blank" rel="noopener" data-wa="floating" aria-label="${esc(cfg.nav.cta)} por WhatsApp">
  ${fillIcon("whatsapp", { size: 30, cls: "wa-float__icon" })}<span class="wa-float__label">${esc(cfg.nav.cta)}</span>
</a>`;

  return { spriteSheet, header, hero, problem, how, benefits, packs, industries, faq, testimonials, cta, footer, floating };
}
