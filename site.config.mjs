// =============================================================================
//  WODITEK · CONFIGURACIÓN ÚNICA DE LA LANDING
// =============================================================================
//  Este es el ÚNICO archivo que necesitas editar para cambiar textos, precios,
//  número de WhatsApp, redes, rubros, preguntas frecuentes y analítica.
//
//  Después de editar:   node build.mjs      (o:  npm run build)
//  Eso regenera la carpeta /public lista para publicar.
//
//  Sintaxis especial en los textos:
//    {{palabras}}   →  se pintan con el degradado animado de Google
//    **palabras**   →  negrita
//    {delivery}     →  se reemplaza por delivery.days
// =============================================================================

export default {
  // ---------------------------------------------------------------------------
  //  PENDIENTES: lista de datos de EJEMPLO que debes reemplazar antes de publicar.
  //  Al construir (node build.mjs) se imprimen como recordatorio. Borra cada
  //  línea a medida que pongas el dato real.
  // ---------------------------------------------------------------------------
  pending: [
    "site.url — dominio real (afecta canonical, sitemap y Open Graph)",
    "proof.businesses y stats — cifras de EJEMPLO: usa tus números reales",
    "packs[].price y packs[].cards — precios y cantidades de EJEMPLO",
    "delivery.days — plazo de entrega de EJEMPLO",
    "testimonials — textos de EJEMPLO: reemplaza por reseñas reales de clientes",
    "social.* — usuarios de redes (TU_USUARIO)",
    "analytics.ga4 / analytics.metaPixel — vacío = analítica apagada",
    "contact.email — vacío = el formulario solo envía por WhatsApp",
  ],

  // ---------------------------------------------------------------------------
  //  MARCA Y SITIO
  // ---------------------------------------------------------------------------
  brand: {
    name: "WODITEK",
    tagline: "Tarjetas NFC para reseñas en Google",
  },

  site: {
    url: "https://www.woditek.com", // ← PENDIENTE: dominio real, sin "/" final
    lang: "es-PE",
    locale: "es_PE",
    themeColor: "#070B1A",
    title: "Tarjetas NFC para reseñas en Google | WODITEK Perú",
    description:
      "Consigue más reseñas en Google con tarjetas NFC: tu cliente acerca el celular y se abre directo tu página de reseñas. Sin app, sin QR, sin mensualidades. Pide tu cotización por WhatsApp.",
  },

  country: { name: "Perú", currency: "PEN", symbol: "S/" },

  // ---------------------------------------------------------------------------
  //  CONTACTO
  //  number: código de país + número, SOLO dígitos (51 = Perú).
  // ---------------------------------------------------------------------------
  whatsapp: {
    number: "51907030003",
    display: "907 030 003",
    messages: {
      general:
        "Hola WODITEK 👋 Quiero más reseñas en Google. ¿Me pueden cotizar las tarjetas NFC?",
      // {pack} se reemplaza por el nombre del pack elegido
      pack: "Hola WODITEK 👋 Quiero pedir el {pack} de tarjetas NFC para reseñas en Google.",
      // la usan los botones de la sección de rubros; {industry} = rubro elegido
      industry:
        "Hola WODITEK 👋 Tengo un negocio de rubro «{industry}» y quiero más reseñas en Google. ¿Me cotizan las tarjetas NFC?",
      // la usa el formulario; {name}, {business}, {phone}, {industry}
      form: "Hola WODITEK 👋 Quiero más reseñas en Google.\n\nNombre: {name}\nNegocio: {business}\nRubro: {industry}\nMi WhatsApp: {phone}\n\n¿Me pueden cotizar?",
    },
  },

  contact: {
    email: "", // ← PENDIENTE: ej. "hola@woditek.com". Vacío = sin envío por correo
  },

  social: [
    { id: "instagram", label: "Instagram", url: "https://instagram.com/TU_USUARIO" },
    { id: "facebook", label: "Facebook", url: "https://facebook.com/TU_USUARIO" },
    { id: "tiktok", label: "TikTok", url: "https://tiktok.com/@TU_USUARIO" },
  ],

  // ---------------------------------------------------------------------------
  //  ANALÍTICA (vacío = desactivada). Los clics a WhatsApp ya envían eventos.
  // ---------------------------------------------------------------------------
  analytics: {
    ga4: "", // ej. "G-XXXXXXXXXX"
    metaPixel: "", // ej. "123456789012345"
  },

  delivery: { days: "3 a 5" }, // ← PENDIENTE

  // ---------------------------------------------------------------------------
  //  NAVEGACIÓN
  // ---------------------------------------------------------------------------
  nav: {
    links: [
      { href: "#como-funciona", label: "Cómo funciona" },
      { href: "#packs", label: "Packs" },
      { href: "#rubros", label: "Rubros" },
      { href: "#preguntas", label: "Preguntas" },
    ],
    cta: "Quiero más reseñas",
  },

  // ---------------------------------------------------------------------------
  //  1 · HERO
  // ---------------------------------------------------------------------------
  hero: {
    title: "Consigue más {{reseñas en Google}} al instante, con un solo toque",
    subtitle:
      "Tu cliente acerca el celular a la tarjeta y se abre directo tu página de reseñas. Sin escanear QR, sin buscar tu negocio, sin complicarse.",
    ctaPrimary: "Quiero más reseñas",
    ctaSecondary: "Ver cómo funciona",
    trust: [
      "Sin mensualidades",
      "Entrega en {delivery} días",
      "Instalación en 1 minuto",
    ],
    cardTitle: "Déjanos tu reseña",
    cardSub: "en",
    toast: { title: "Nueva reseña", text: "★★★★★ «Excelente atención»" },
  },

  // Franja de prueba social bajo el hero  (← PENDIENTE: cifra de ejemplo)
  proof: {
    businesses: 120,
    label: "negocios ya reciben más reseñas",
    rating: "5.0",
    avatars: ["#4285F4", "#EA4335", "#FBBC05", "#34A853"],
  },

  // ---------------------------------------------------------------------------
  //  2 · EL PROBLEMA
  // ---------------------------------------------------------------------------
  problem: {
    eyebrow: "El problema",
    title: "Tus clientes quedan felices… pero casi nunca lo dicen en Google",
    lead: "Hoy, antes de visitarte, llamarte o comprarte, la gente busca tu negocio en Google. Lo que ve ahí decide si te elige a ti o a tu competencia.",
    whyTitle: "Por qué las reseñas importan",
    why: [
      {
        icon: "shield-check",
        color: "blue",
        title: "Generan confianza",
        text: "La gente confía en la opinión de otros clientes antes de dar el primer paso. Una buena calificación te abre la puerta.",
      },
      {
        icon: "map-pin",
        color: "red",
        title: "Te posicionan en Google Maps",
        text: "La cantidad y la calidad de tus reseñas influyen en qué tan arriba apareces cuando te buscan cerca.",
      },
      {
        icon: "trending-up",
        color: "green",
        title: "Deciden la compra",
        text: "En segundos, las estrellas y los comentarios inclinan la balanza entre tu negocio y el de al lado.",
      },
    ],
    whyNotTitle: "Y por qué tus clientes satisfechos no las dejan",
    whyNot: [
      {
        icon: "frown",
        title: "Es incómodo",
        text: "Hay que buscar el negocio, abrir Maps y encontrar el botón correcto.",
      },
      {
        icon: "help-circle",
        title: "No saben cómo",
        text: "Muchos nunca han dejado una reseña y no saben por dónde empezar.",
      },
      {
        icon: "clock",
        title: "Se les olvida",
        text: "Apenas salen del local, siguen con su día. La intención se pierde.",
      },
    ],
    compare: {
      withoutTitle: "Sin tarjeta",
      withoutSteps: [
        "Abrir Google",
        "Buscar tu negocio",
        "Entrar a tu ficha",
        "Tocar «Escribir reseña»",
        "Iniciar sesión",
        "Recién escribir",
      ],
      withTitle: "Con tarjeta WODITEK",
      withoutBadge: "6 pasos",
      withText: "Acercar el celular",
      withNote: "Un toque y tu cliente ya está escribiendo su reseña.",
      withBadge: "1 toque",
    },
  },

  // ---------------------------------------------------------------------------
  //  3 · CÓMO FUNCIONA
  // ---------------------------------------------------------------------------
  how: {
    eyebrow: "Cómo funciona",
    title: "Tres pasos. Cero fricción.",
    lead: "Así de simple es para tu cliente, y así de simple es para ti.",
    steps: [
      {
        icon: "smile",
        title: "Das un buen servicio",
        text: "Tu cliente sale contento. Ese es el mejor momento para pedir su opinión.",
      },
      {
        icon: "nfc",
        title: "Acerca su celular a la tarjeta",
        text: "Un toque y listo. Sin app, sin QR y sin buscar tu negocio.",
      },
      {
        icon: "star",
        title: "Deja sus 5 estrellas",
        text: "Se abre tu ficha de Google con el formulario de reseña listo para escribir.",
      },
    ],
    demo: {
      hint: "Pasa el mouse o toca la escena",
      play: "Ver demostración",
      replay: "Repetir demostración",
      lockTime: "9:41",
      lockLabel: "Tarjeta detectada",
      reviewTitle: "Tu Negocio",
      reviewSub: "Califica tu experiencia",
      reviewPlaceholder: "Cuéntanos cómo te fue…",
      reviewButton: "Publicar",
      status: [
        "Demostración lista.",
        "El celular se acerca a la tarjeta.",
        "La tarjeta es detectada.",
        "Se abre la reseña de Google y se llenan las 5 estrellas.",
      ],
    },
  },

  // ---------------------------------------------------------------------------
  //  4 · BENEFICIOS
  // ---------------------------------------------------------------------------
  benefits: {
    eyebrow: "Beneficios",
    title: "Más reseñas, menos esfuerzo",
    lead: "Todo lo que necesitas para que tus clientes hablen bien de ti donde más importa.",
    items: [
      {
        icon: "zap",
        color: "yellow",
        title: "Más reseñas en menos tiempo",
        text: "Reducimos el proceso a un toque, así más clientes terminan dejando su opinión.",
      },
      {
        icon: "map-pin",
        color: "red",
        title: "Mejor posicionamiento local",
        text: "Reseñas nuevas y constantes ayudan a que Google Maps te muestre a quienes buscan cerca.",
      },
      {
        icon: "nfc",
        color: "blue",
        title: "Sin app ni QR",
        text: "El cliente solo acerca el celular. Nada que descargar, nada que escanear.",
      },
      {
        icon: "smartphone",
        color: "green",
        title: "Funciona con iPhone y Android",
        text: "Compatible con iPhone XS/XR y posteriores, y con la mayoría de Android con NFC. Incluye QR de respaldo.",
      },
      {
        icon: "battery-off",
        color: "blue",
        title: "Sin batería ni mensualidades",
        text: "La tarjeta no se carga ni se desconecta. Pagas una vez y es tuya.",
      },
      {
        icon: "settings",
        color: "green",
        title: "Se configura una sola vez",
        text: "La dejamos lista con el enlace de tu negocio. Tú solo la pones en el mostrador.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  //  5 · PACKS  (← PENDIENTE: precios y cantidades de ejemplo)
  //  price: número (soles). Usa null para mostrar «Cotizar» en lugar del precio.
  // ---------------------------------------------------------------------------
  packs: {
    eyebrow: "Packs",
    title: "Elige tu pack y empieza a recibir reseñas",
    lead: "Pago único en soles. Sin mensualidades ni costos ocultos.",
    payNote: "pago único",
    cta: "Pedir por WhatsApp",
    items: [
      {
        id: "basico",
        name: "Pack Básico",
        tagline: "Para empezar a recibir reseñas",
        price: 59,
        pricePrefix: "",
        badge: "",
        featured: false,
        features: [
          "1 tarjeta NFC con diseño estándar",
          "QR de respaldo impreso en la tarjeta",
          "Configurada con el enlace de reseñas de tu negocio",
          "Guía rápida para pedir la reseña",
        ],
      },
      {
        id: "negocio",
        name: "Pack Negocio",
        tagline: "El favorito de los negocios locales",
        price: 169,
        pricePrefix: "",
        badge: "Más popular",
        featured: true,
        features: [
          "3 tarjetas NFC",
          "Soporte de mostrador incluido",
          "Diseño con el logo de tu negocio",
          "QR de respaldo en cada tarjeta",
          "Configuración y prueba contigo en vivo",
        ],
      },
      {
        id: "cadena",
        name: "Pack Cadena / Sucursales",
        tagline: "Para negocios con varias ubicaciones",
        price: 449,
        pricePrefix: "Desde",
        badge: "",
        featured: false,
        features: [
          "10 tarjetas NFC",
          "Soportes de mostrador",
          "Stickers NFC para la puerta",
          "Configuración de varias ubicaciones (un enlace por sucursal)",
          "Atención prioritaria",
        ],
      },
    ],
  },

  // ---------------------------------------------------------------------------
  //  6 · RUBROS
  // ---------------------------------------------------------------------------
  industries: {
    eyebrow: "Para tu negocio",
    title: "Hecha para negocios locales como el tuyo",
    lead: "Elige tu rubro y mira dónde colocar la tarjeta para que nadie se vaya sin dejar su reseña.",
    cta: "Pedir para mi negocio",
    whereLabel: "Dónde colocarla",
    momentLabel: "Mejor momento",
    tipLabel: "Consejo",
    items: [
      {
        id: "restaurante",
        name: "Restaurante",
        icon: "utensils",
        color: "red",
        where: "En cada mesa, junto a la carta o en el posavasos, y en la caja.",
        moment: "Al entregar la cuenta, cuando el cliente ya disfrutó su plato.",
        tip: "Que el mozo diga: «¿Nos regalas una reseña? Solo acerca tu celular aquí».",
      },
      {
        id: "cafeteria",
        name: "Cafetería",
        icon: "coffee",
        color: "yellow",
        where: "En el mostrador, junto al lector de pagos, y en la barra de pedidos.",
        moment: "Cuando entregas el pedido y el café ya está en la mano.",
        tip: "Un cartelito amable junto a la tarjeta ayuda a que la vean.",
      },
      {
        id: "barberia",
        name: "Barbería",
        icon: "scissors",
        color: "blue",
        where: "En el espejo de cada silla y en la recepción.",
        moment: "Al terminar el corte, cuando el cliente se mira al espejo y le gusta.",
        tip: "Que el barbero la mencione mientras cobra: es el momento más feliz.",
      },
      {
        id: "salon",
        name: "Salón de belleza",
        icon: "sparkles",
        color: "red",
        where: "En el tocador de cada estación y en el mostrador de caja.",
        moment: "Cuando muestras el resultado final del peinado o las uñas.",
        tip: "Pide la reseña justo cuando tu cliente se toma la foto del resultado.",
      },
      {
        id: "clinica",
        name: "Clínica / Dentista",
        icon: "stethoscope",
        color: "green",
        where: "En recepción y en la sala de espera; entrega la tarjeta tras la consulta.",
        moment: "Al salir de la consulta, con el tratamiento bien explicado.",
        tip: "La confianza pesa mucho al elegir un doctor: las reseñas la construyen.",
      },
      {
        id: "gimnasio",
        name: "Gimnasio",
        icon: "dumbbell",
        color: "blue",
        where: "En recepción, en la salida y en la zona de casilleros.",
        moment: "Después del entrenamiento o al lograr una meta.",
        tip: "Celebra los logros de tus socios y pide la reseña en ese momento.",
      },
      {
        id: "hotel",
        name: "Hotel",
        icon: "bed",
        color: "yellow",
        where: "En recepción, en el check-out y en la mesa de noche de cada habitación.",
        moment: "Durante el check-out o tras una buena estadía.",
        tip: "Deja la tarjeta con una nota de agradecimiento en la habitación.",
      },
      {
        id: "taller",
        name: "Taller mecánico",
        icon: "wrench",
        color: "red",
        where: "En caja y entregada junto con las llaves del vehículo.",
        moment: "Al entregar el auto ya reparado.",
        tip: "Muestra el antes y el después, y luego pide la reseña.",
      },
      {
        id: "tienda",
        name: "Tienda",
        icon: "shopping-bag",
        color: "green",
        where: "Junto a la caja registradora y dentro de la bolsa de compra.",
        moment: "Al momento de pagar o de entregar el producto.",
        tip: "Colócala a la altura de los ojos, junto al lector de pagos.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  //  7 · PREGUNTAS FRECUENTES
  //  Ajusta las respuestas para que coincidan con tu servicio real.
  // ---------------------------------------------------------------------------
  faq: {
    eyebrow: "Preguntas frecuentes",
    title: "Lo que casi todos preguntan",
    items: [
      {
        q: "¿Funciona con todos los celulares?",
        a: "Funciona con iPhone XS/XR y modelos posteriores, y con la gran mayoría de celulares Android que tienen NFC activado. Si el celular no lo soporta, el cliente puede escanear el QR de respaldo impreso en la tarjeta.",
      },
      {
        q: "¿Necesita app?",
        a: "No. Ni tú ni tu cliente instalan nada. El celular lee la tarjeta y abre el navegador directo en tu formulario de reseñas de Google.",
      },
      {
        q: "¿Qué pasa si el celular no tiene NFC?",
        a: "Cada tarjeta incluye un código QR de respaldo. El cliente lo escanea con la cámara y llega exactamente al mismo lugar.",
      },
      {
        q: "¿Cuánto tarda la entrega?",
        a: "Entregamos en {delivery} días después de confirmar tu pedido y los datos de tu negocio. Te confirmamos el plazo exacto por WhatsApp.",
      },
      {
        q: "¿Puedo cambiar el enlace después?",
        a: "Sí. Las tarjetas se pueden reprogramar: si cambias de local o de ficha de Google, actualizamos el enlace sin que tengas que comprar otra tarjeta.",
      },
      {
        q: "¿Hay mensualidad?",
        a: "No. Pagas una sola vez. La tarjeta no usa batería ni suscripción.",
      },
      {
        q: "¿Esto cumple las políticas de Google?",
        a: "Sí. La tarjeta solo facilita el acceso: abre directamente el formulario para que tu cliente deje su reseña, de forma libre y honesta. No compramos reseñas, no filtramos opiniones ni ofrecemos incentivos a cambio. Te recomendamos pedirla a todos tus clientes por igual.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  //  8 · TESTIMONIOS  (← PENDIENTE: son TEXTOS DE EJEMPLO)
  //  Mientras placeholder sea true, la tarjeta muestra la etiqueta
  //  «Ejemplo · reemplazar». Cuando pongas un testimonio real, cambia a false.
  // ---------------------------------------------------------------------------
  testimonials: {
    eyebrow: "Resultados",
    title: "Negocios que ya cambiaron su historia en Google",
    exampleLabel: "Ejemplo · reemplazar",
    items: [
      {
        name: "Nombre Apellido",
        business: "Barbería (ejemplo)",
        quote:
          "Antes casi nadie nos dejaba reseñas. Ahora el barbero acerca la tarjeta al cobrar y el cliente la deja en segundos.",
        result: "De 14 a 96 reseñas en 3 meses",
        skin: "#F1C9A5",
        hair: "#2B1B12",
        placeholder: true,
      },
      {
        name: "Nombre Apellido",
        business: "Cafetería (ejemplo)",
        quote:
          "La tarjeta junto al lector de pagos funciona sola. Los clientes preguntan qué es y terminan dejando sus 5 estrellas.",
        result: "4.3 → 4.8 estrellas en Google",
        skin: "#D9A57A",
        hair: "#6B3F23",
        placeholder: true,
      },
      {
        name: "Nombre Apellido",
        business: "Clínica dental (ejemplo)",
        quote:
          "Es elegante, no incomoda al paciente y nos ahorra explicar cómo dejar la reseña. La recepción la entrega al salir.",
        result: "3 veces más reseñas por mes",
        skin: "#E7B891",
        hair: "#1C1C24",
        placeholder: true,
      },
    ],
    // Contadores animados (← PENDIENTE: cifras de ejemplo)
    stats: [
      { value: 2400, prefix: "+", label: "reseñas nuevas conseguidas" },
      { value: 120, prefix: "+", label: "negocios activos" },
      { value: 1, prefix: "", suffix: " min", label: "para instalar tu tarjeta" },
    ],
  },

  // ---------------------------------------------------------------------------
  //  9 · LLAMADO FINAL + FORMULARIO
  // ---------------------------------------------------------------------------
  cta: {
    title: "¿Listo para tener {{más reseñas}}?",
    text: "Escríbenos por WhatsApp y te respondemos con tu cotización. Sin compromiso.",
    button: "Quiero más reseñas",
    micro: ["Sin mensualidades", "Entrega en {delivery} días", "Instalación en 1 minuto"],
    form: {
      title: "O déjanos tus datos",
      name: "Tu nombre",
      business: "Nombre de tu negocio",
      phone: "Tu WhatsApp",
      industry: "Rubro",
      industryPlaceholder: "Elige tu rubro",
      industryOther: "Otro",
      submit: "Enviar por WhatsApp",
      submitEmail: "Prefiero enviar por correo",
      errors: {
        name: "Escribe tu nombre.",
        business: "Escribe el nombre de tu negocio.",
        phone: "Escribe un número válido (9 dígitos).",
        industry: "Elige tu rubro.",
      },
      ok: "Abriendo WhatsApp con tus datos…",
    },
  },

  // ---------------------------------------------------------------------------
  //  10 · FOOTER
  // ---------------------------------------------------------------------------
  footer: {
    text: "Tarjetas NFC que convierten clientes felices en reseñas de 5 estrellas en Google.",
    linksTitle: "Navegación",
    socialTitle: "Síguenos",
    contactTitle: "Contacto",
    legalTitle: "Aviso legal",
    legal: [
      "Google y el logotipo de Google son marcas registradas de Google LLC. WODITEK es un servicio independiente y no está afiliado, patrocinado ni respaldado por Google.",
      "WODITEK facilita el acceso al formulario de reseñas de tu negocio. No compramos, vendemos ni filtramos reseñas, y recomendamos cumplir siempre las políticas de contenido de Google Maps.",
      "Los precios están expresados en soles peruanos (PEN) y pueden variar. Las imágenes son ilustrativas.",
    ],
    rights: "Todos los derechos reservados.",
  },
};
