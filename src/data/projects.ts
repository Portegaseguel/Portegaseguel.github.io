export type Project = {
  title: string;
  category: string;
  summary: string;
  role: string;
  tech: string[];
  image: string;
  url?: string;
  palette: {
    bg: string;
    ink: string;
    accent: string;
    accent2: string;
  };
};

export const commercialProjects: Project[] = [
  {
    title: 'Gecko Wear',
    category: 'E-commerce · Outdoor',
    summary:
      'Tienda online de ropa y accesorios outdoor orientada a catálogo, ventas y presencia de marca.',
    role:
      'Diseño, arquitectura de contenidos, e-commerce, integraciones, optimización, publicación y mantenimiento.',
    tech: [
      'WordPress',
      'WooCommerce',
      'Elementor',
      'PHP',
      'MySQL',
      'JavaScript',
    ],
    image: '/images/gecko.png',
    url: 'https://geckowear.cl/',
    palette: {
      bg: '#eef0e7',
      ink: '#20372d',
      accent: '#315c48',
      accent2: '#d9ab25',
    },
  },

  {
    title: 'Palazzo',
    category: 'E-commerce · Moda',
    summary:
      'Tienda online especializada en pantalones palazzo y vestuario femenino.',
    role:
      'Diseño, estructura de contenidos, catálogo, pagos, integraciones, publicación y mantenimiento.',
    tech: [
      'WordPress',
      'WooCommerce',
      'Elementor',
      'Stripe',
      'JavaScript',
    ],
    image: '/images/palazzo.png',
    url: 'https://palazzo.cl/',
    palette: {
      bg: '#f2e6d8',
      ink: '#3c302e',
      accent: '#8f4647',
      accent2: '#caa893',
    },
  },

  {
    title: 'Terrenos El Tabo',
    category: 'Inmobiliario · Captación',
    summary:
      'Sitio comercial para promoción y venta de terrenos urbanos en El Tabo.',
    role:
      'Diseño, estructura comercial, formularios, WhatsApp, agenda de visitas, optimización y mantenimiento.',
    tech: [
      'WordPress',
      'Elementor',
      'Calendly',
      'LiteSpeed',
      'JavaScript',
    ],
    image: '/images/terrenos.png',
    url: 'https://terrenoseltabo.cl/',
    palette: {
      bg: '#eaf4e4',
      ink: '#29414b',
      accent: '#56b93e',
      accent2: '#a4d88e',
    },
  },

  {
    title: 'Vive París Voilà',
    category: 'Turismo · Servicios · Agenda',
    summary:
      'Tours, experiencias, asesorías y servicios en París con agenda y reservas.',
    role:
      'Diseño, arquitectura de contenidos, tours y servicios, e-commerce, formularios, agenda e integraciones.',
    tech: [
      'WordPress',
      'WooCommerce',
      'Elementor',
      'Gutenberg',
      'JavaScript',
    ],
    image: '/images/paris.png',
    url: 'https://viveparisvoila.com/',
    palette: {
      bg: '#eef6fb',
      ink: '#163b58',
      accent: '#277fbe',
      accent2: '#c84c47',
    },
  },

  {
    title: 'Viajes Chile',
    category: 'Frontend · Turismo',
    summary:
      'Landing responsive para descubrir destinos y experiencias a lo largo de Chile.',
    role:
      'Frontend responsive con carrusel, secciones dinámicas, formulario, modales y navegación.',
    tech: [
      'HTML5',
      'SCSS',
      'JavaScript',
      'Bootstrap 5',
      'jQuery',
    ],
    image: '/images/viajes.png',
    url: 'https://portegaseguel.github.io/Viajes_Chile_2.0/',
    palette: {
      bg: '#080b0c',
      ink: '#f7f7f3',
      accent: '#2fb6c2',
      accent2: '#729ca4',
    },
  },

  {
    title: 'JW Sport Management',
    category: 'Sitio corporativo · Sports Management',
    summary:
      'Sitio web corporativo multilingüe para una agencia de representación y desarrollo de futbolistas, orientado a presentar sus servicios, metodología, cobertura internacional y proceso de evaluación.',
    role:
      'Diseño y desarrollo completo del sitio, arquitectura de contenidos, implementación responsive, configuración multidioma, formularios y publicación.',
    tech: [
      'WordPress',
      'Elementor',
      'Astra',
      'GTranslate',
      'WPForms',
      'PHP',
      'MySQL',
    ],
    image: '/images/jw.png',
    palette: {
      bg: '#090909',
      ink: '#ffffff',
      accent: '#ff1f2d',
      accent2: '#c8c8c8',
    },
  },

  {
    title: 'Sirenas en la Luna',
    category: 'E-commerce · Bienestar · Tienda especializada',
    summary:
      'Tienda online de productos rituales y bienestar, con catálogo por categorías, productos destacados, testimonios y experiencia de compra.',
    role:
      'Diseño y desarrollo completo del sitio, arquitectura de contenidos, e-commerce, catálogo, experiencia responsive, integraciones, publicación y mantenimiento.',
    tech: [
      'WordPress',
      'WooCommerce',
      'Elementor',
      'PHP',
      'MySQL',
      'JavaScript',
    ],
    image: '/images/sirenas.png',
    palette: {
      bg: '#e9e0eb',
      ink: '#4a2457',
      accent: '#7d3b8f',
      accent2: '#b9a3d1',
    },
  },
];

export const technicalProjects = [
  {
    title: 'Busca Comercio',
    meta: 'Android · Kotlin · Firebase',
    desc:
      'Autenticación, CRUD, búsquedas, valoraciones y Firestore.',
    url:
      'https://github.com/Portegaseguel/busca-comercio',
  },
  {
    title: 'Registro de Actividades',
    meta: 'Android · MVVM',
    desc:
      'ViewModel, LiveData, Navigation, RecyclerView y Coroutines.',
    url:
      'https://github.com/Portegaseguel/App_Registro_Actividades',
  },
  {
    title: 'SuperHero API Explorer',
    meta: 'Frontend · REST API',
    desc:
      'JavaScript, AJAX, jQuery, Bootstrap y visualización de datos.',
    url:
      'https://github.com/Portegaseguel/superhero-api-explorer',
  },
];

export const tech = [
  'HTML5',
  'CSS3',
  'SCSS',
  'JavaScript',
  'Vue.js',
  'Bootstrap',
  'jQuery',
  'WordPress',
  'WooCommerce',
  'PHP',
  'MySQL',
  'Git',
  'GitHub',
  'Firebase',
  'Kotlin',
  'Android',
  'REST API',
  'SEO',
];