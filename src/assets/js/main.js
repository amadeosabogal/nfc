/* ==========================================================================
   WODITEK · main.js — JavaScript puro, sin librerías.
   Lee los datos del sitio desde <script id="site-data"> (generado por build.mjs).

   ÍNDICE
   1 Utilidades · 2 Analítica · 3 Aparición al scroll · 4 Contadores
   5 Header y menú · 6 Pestañas · 7 FAQ · 8 Demo interactiva
   9 Inclinación de la tarjeta · 10 Formulario
   ========================================================================== */
(() => {
  "use strict";

  /* 1 · UTILIDADES ---------------------------------------------------------- */
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  let data = {};
  try {
    data = JSON.parse($("#site-data").textContent);
  } catch (err) {
    /* la página funciona igual; solo se desactivan formulario y analítica */
  }
  clearTimeout(window.__revealGuard); // el script cargó bien: no hace falta el plan B

  /* 2 · ANALÍTICA ------------------------------------------------------------
     Pon tus IDs en site.config.mjs → analytics.ga4 / analytics.metaPixel.
     Eventos enviados:
       whatsapp_click  (cada botón de WhatsApp; incluye el origen y el pack)
       generate_lead   (envío del formulario)
       demo_play       (demostración interactiva)
  ---------------------------------------------------------------------------- */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  const analytics = data.analytics || {};

  function track(name, params = {}) {
    try {
      window.dataLayer.push({ event: name, ...params }); // compatible con Google Tag Manager
      if (analytics.ga4) gtag("event", name, params);
      if (analytics.metaPixel && window.fbq) {
        const standard = { whatsapp_click: "Contact", generate_lead: "Lead" }[name];
        if (standard) window.fbq("track", standard, params);
        else window.fbq("trackCustom", name, params);
      }
    } catch (err) { /* la analítica nunca debe romper la página */ }
  }

  function loadAnalytics() {
    if (analytics.ga4) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(analytics.ga4)}`;
      document.head.appendChild(s);
      gtag("js", new Date());
      gtag("config", analytics.ga4);
    }
    if (analytics.metaPixel) {
      /* eslint-disable */
      !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () { n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments); };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = "2.0"; n.queue = [];
        t = b.createElement(e); t.async = !0; t.src = v; s = b.getElementsByTagName(e)[0]; s.parentNode.insertBefore(t, s);
      }(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
      /* eslint-enable */
      window.fbq("init", analytics.metaPixel);
      window.fbq("track", "PageView");
    }
  }
  if (analytics.ga4 || analytics.metaPixel) {
    const start = () => ("requestIdleCallback" in window ? requestIdleCallback(loadAnalytics) : setTimeout(loadAnalytics, 1));
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
  }

  // Clics en cualquier enlace de WhatsApp (delegación de eventos)
  document.addEventListener("click", (e) => {
    const link = e.target.closest("a[data-wa]");
    if (!link) return;
    track("whatsapp_click", { source: link.dataset.wa, pack: link.dataset.pack || undefined });
  });

  /* 3 · APARICIÓN AL HACER SCROLL --------------------------------------------- */
  const revealEls = $$('[data-reveal]:not([data-reveal="now"])'); // "now" se anima solo con CSS
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          en.target.classList.add("in");
          io.unobserve(en.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  /* 4 · CONTADORES ------------------------------------------------------------ */
  const counters = $$("[data-count]");
  const format = (n) => n.toLocaleString("es-PE");
  function runCounter(el) {
    const target = Number(el.dataset.count);
    if (reduceMotion || !Number.isFinite(target)) { el.textContent = format(target); return; }
    const duration = 1700;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          runCounter(en.target);
          cio.unobserve(en.target);
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((el) => { el.textContent = "0"; cio.observe(el); });
  }

  /* 5 · HEADER Y MENÚ MÓVIL --------------------------------------------------- */
  const header = $("[data-header]");
  const menuBtn = $("[data-menu-btn]");
  const menu = $("[data-menu]");
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
      ticking = false;
    });
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  function setMenu(open) {
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.hidden = !open;
    header.classList.toggle("is-open", open);
  }
  menuBtn.addEventListener("click", () => setMenu(menuBtn.getAttribute("aria-expanded") !== "true"));
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { setMenu(false); menuBtn.focus(); }
  });
  window.matchMedia("(min-width: 900px)").addEventListener("change", (m) => { if (m.matches) setMenu(false); });

  /* 6 · PESTAÑAS DE RUBROS (WAI-ARIA tabs) ------------------------------------ */
  const tabsRoot = $("[data-tabs]");
  if (tabsRoot) {
    const tabs = $$('[role="tab"]', tabsRoot);
    const panels = $$('[role="tabpanel"]', tabsRoot);
    const select = (tab, { focus = false } = {}) => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute("aria-selected", String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panels.forEach((p) => { p.hidden = p.id !== tab.getAttribute("aria-controls"); });
      if (focus) tab.focus();
      tab.scrollIntoView({ block: "nearest", inline: "center", behavior: reduceMotion ? "auto" : "smooth" });
    };
    tabs.forEach((tab, i) => {
      tab.addEventListener("click", () => select(tab));
      tab.addEventListener("keydown", (e) => {
        const keys = { ArrowRight: i + 1, ArrowLeft: i - 1, Home: 0, End: tabs.length - 1 };
        if (!(e.key in keys)) return;
        e.preventDefault();
        select(tabs[(keys[e.key] + tabs.length) % tabs.length], { focus: true });
      });
    });
  }

  /* 7 · FAQ (acordeón accesible) ---------------------------------------------- */
  const faqItems = $$(".faq__item");
  faqItems.forEach((item) => {
    const btn = $(".faq__q", item);
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      btn.setAttribute("aria-expanded", String(open));
      item.classList.toggle("is-open", open);
    });
  });
  if (faqItems[0]) { // la primera pregunta abierta invita a leer
    $(".faq__q", faqItems[0]).setAttribute("aria-expanded", "true");
    faqItems[0].classList.add("is-open");
  }

  /* 8 · DEMOSTRACIÓN INTERACTIVA ---------------------------------------------
     idle → approach (el celular se acerca) → tap (ondas) → review (aparece la
     reseña y se llenan las estrellas) → done.  Todo el movimiento vive en el CSS
     según [data-state]; aquí solo se maneja la línea de tiempo.
  ---------------------------------------------------------------------------- */
  const demo = $("[data-demo]");
  if (demo) {
    const stage = $("[data-demo-stage]", demo);
    const playBtn = $("[data-demo-play]", demo);
    const label = $("span", playBtn);
    const status = $("[data-demo-status]", demo);
    const steps = $$(".step");
    const msgs = data.demoStatus || [];
    let timers = [];

    const setState = (state, stepNo, msg) => {
      demo.dataset.state = state;
      steps.forEach((s) => s.classList.toggle("is-current", Number(s.dataset.step) === stepNo));
      if (status && msgs[msg]) status.textContent = msgs[msg];
    };
    const at = (ms, fn) => timers.push(setTimeout(fn, ms));
    const markDone = () => { setState("done", 3, 3); label.textContent = playBtn.dataset.labelReplay; };

    function play() {
      timers.forEach(clearTimeout);
      timers = [];
      if (reduceMotion) { markDone(); return; }
      demo.classList.add("is-reset"); // vuelve al inicio sin animar
      setState("idle", 1, 0);
      void demo.offsetWidth;
      demo.classList.remove("is-reset");
      track("demo_play");
      at(80, () => setState("approach", 2, 1));
      at(1250, () => setState("tap", 2, 2));
      at(2450, () => setState("review", 3, 3));
      at(4500, markDone);
    }
    const busy = () => ["approach", "tap", "review"].includes(demo.dataset.state);

    playBtn.addEventListener("click", play);
    stage.addEventListener("click", () => { if (!busy()) play(); });
    stage.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse" && !busy()) play(); });

    if (reduceMotion) {
      markDone();
    } else if ("IntersectionObserver" in window) {
      const dio = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) { dio.disconnect(); setTimeout(play, 500); }
        },
        { threshold: 0.6 }
      );
      dio.observe(stage);
    }
  }

  /* 9 · INCLINACIÓN 3D DE LA TARJETA DEL HERO (solo mouse) --------------------- */
  const tiltHost = $("[data-tilt]");
  if (tiltHost && finePointer && !reduceMotion) {
    const tilt = $(".hero__tilt", tiltHost);
    let raf = 0;
    tiltHost.addEventListener("pointermove", (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = tiltHost.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tilt.style.setProperty("--ry", `${(x * 16).toFixed(2)}deg`);
        tilt.style.setProperty("--rx", `${(-y * 12).toFixed(2)}deg`);
      });
    });
    tiltHost.addEventListener("pointerleave", () => {
      tilt.style.setProperty("--ry", "0deg");
      tilt.style.setProperty("--rx", "0deg");
    });
  }

  /* 10 · FORMULARIO DE CONTACTO (envía por WhatsApp o por correo) --------------- */
  const form = $("[data-form]");
  if (form && data.whatsapp) {
    const text = data.form || {};
    const errors = text.errors || {};
    const statusEl = $("[data-form-status]", form);

    // Teléfono peruano: 9 dígitos que empiezan con 9 (admite +51 y espacios)
    const cleanPhone = (v) => {
      let d = String(v).replace(/\D/g, "");
      if (d.length === 11 && d.startsWith("51")) d = d.slice(2);
      return d;
    };
    const rules = {
      name: (v) => v.trim().length >= 2,
      business: (v) => v.trim().length >= 2,
      phone: (v) => /^9\d{8}$/.test(cleanPhone(v)),
      industry: (v) => v.trim() !== "",
    };

    function validate() {
      let firstBad = null;
      Object.keys(rules).forEach((key) => {
        const input = form.elements[key];
        const err = $(`#f-${key}-err`, form);
        const ok = rules[key](input.value);
        input.setAttribute("aria-invalid", String(!ok));
        err.textContent = ok ? "" : errors[key] || "";
        if (!ok && !firstBad) firstBad = input;
      });
      if (firstBad) firstBad.focus();
      return !firstBad;
    }
    // Limpia el error apenas el usuario corrige el campo
    form.addEventListener("input", (e) => {
      const key = e.target.name;
      if (rules[key] && rules[key](e.target.value)) {
        e.target.setAttribute("aria-invalid", "false");
        $(`#f-${key}-err`, form).textContent = "";
      }
    });

    const fill = (tpl, v) =>
      tpl.replace(/\{(\w+)\}/g, (m, k) => (k in v ? v[k] : m));
    const values = () => ({
      name: form.elements.name.value.trim(),
      business: form.elements.business.value.trim(),
      industry: form.elements.industry.value,
      phone: cleanPhone(form.elements.phone.value),
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!validate()) return;
      const url = `https://wa.me/${data.whatsapp.number}?text=${encodeURIComponent(fill(data.whatsapp.formMessage, values()))}`;
      track("generate_lead", { method: "form_whatsapp", industry: form.elements.industry.value });
      statusEl.textContent = text.ok || "";
      if (!window.open(url, "_blank", "noopener")) window.location.href = url;
    });

    const emailBtn = $("[data-form-email]", form);
    if (emailBtn && data.email) {
      emailBtn.addEventListener("click", () => {
        if (!validate()) return;
        const body = fill(data.whatsapp.formMessage, values());
        track("generate_lead", { method: "form_email", industry: form.elements.industry.value });
        window.location.href = `mailto:${data.email}?subject=${encodeURIComponent("Cotización de tarjetas NFC")}&body=${encodeURIComponent(body)}`;
      });
    }
  }
})();
