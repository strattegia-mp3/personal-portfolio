/**
 * shared.tsx — Data that is identical in both languages (no translation needed).
 * Keeping it here prevents duplication across pt.tsx / en.tsx.
 */

export const PERSON = {
  firstName: "Victor",
  lastName: "Rocha",
  name: "Victor Rocha",
  role: "Full Stack Developer & CEO @ MythMirror",
  avatar: "/images/avatars/victor.webp",
  email: "strattegiadev@gmail.com",
  location: "America/Sao_Paulo",
} as const;

export const SOCIAL = [
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/strattegia-mp3",
    essential: true,
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "https://www.linkedin.com/in/victor-jrocha",
    essential: true,
  },
  {
    name: "Email",
    icon: "email",
    link: "mailto:strattegiadev@gmail.com",
    essential: true,
  },
] as const;

export const PATHS = {
  home: "/",
  about: "/about",
  blog: "/blog",
  work: "/work",
  gallery: "/gallery",
} as const;

export const OG_IMAGE = "/images/og/about.webp";

/** All gallery images — shared because alt text is already in English and
 *  orientation data has no language dimension. */
export const GALLERY_IMAGES = [
  {
    src: "/images/gallery/dream-theater.webp",
    alt: "Photo taken at a Dream Theater concert",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/dream-theater2.webp",
    alt: "Photo taken at a Dream Theater concert",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/distressed-flower.webp",
    alt: "Abstract flower with dark and colorful textures",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/gentle-chaos.webp",
    alt: "Blue and green abstract landscape with flowing layers",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/greenish-tide.webp",
    alt: "Dark abstract painting with blue and gold streaks",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/gentle-dawn2.webp",
    alt: "Soft pastel abstract with vertical flowing shapes",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/gentle-dawn.webp",
    alt: "Soft abstract composition in pastel tones",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/greenish-tide2.webp",
    alt: "Green and blue abstract painting with marbled textures",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/jojo-nknb.webp",
    alt: "Dark abstract canvas with red circular details",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/junji-ito.webp",
    alt: "Colorful manga-inspired poster with horror artwork",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/nectar-of-smithereens.webp",
    alt: "Blue and yellow abstract painting with splatter patterns",
    orientation: "square",
  },
  {
    src: "/images/gallery/purple-forest.webp",
    alt: "Purple and blue abstract painting with angular shapes",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/look-through-holes.webp",
    alt: "Dark abstract artwork with oval cutout shapes",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/look-at-shadows.webp",
    alt: "Deep green abstract painting with layered brushstrokes",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/sakuras.webp",
    alt: "Cherry blossom trees in pink and blue tones",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/shades-of-red.webp",
    alt: "Dark abstract painting with red and gold marbled lines",
    orientation: "square",
  },
  {
    src: "/images/gallery/soft-lasers.webp",
    alt: "Soft abstract floral painting with pale blue petals",
    orientation: "square",
  },
  {
    src: "/images/gallery/the-skies-open.webp",
    alt: "Abstract wave-like painting with a glowing sky",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/wolf-on-the-prowl.webp",
    alt: "Golden wolf silhouette on a dark background",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/abstract-pastels.webp",
    alt: "Abstract painting with soft pastel geometric shapes",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/abstract-sky.webp",
    alt: "Atmospheric abstract gradient in red and blue",
    orientation: "square",
  },
  {
    src: "/images/gallery/beautiful-chaos2.webp",
    alt: "Orange and blue abstract painting with dynamic textures",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/calculated-chaos.webp",
    alt: "Geometric abstract painting in earthy red and green tones",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/beautiful-flowers.webp",
    alt: "Blue floral painting with soft petals and light background",
    orientation: "horizontal",
  },
  {
    src: "/images/gallery/beautiful-chaos.webp",
    alt: "Dark abstract painting with layered red and gold squares",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/dancing-silhouettes.webp",
    alt: "Abstract artwork with circular cutouts on a dark blue surface",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/decaying-calm.webp",
    alt: "Dark abstract painting with green and purple textures",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/decaying-love.webp",
    alt: "Abstract painting with warm red and pink fragmented forms",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/deep-blue.webp",
    alt: "Blue abstract composition with a glowing central orb",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/delirious-absorption.webp",
    alt: "Abstract painting with green, yellow, and orange flowing textures",
    orientation: "vertical",
  },
  {
    src: "/images/gallery/devourer-feelings.webp",
    alt: "Brown and purple marbled abstract painting with fluid lines",
    orientation: "vertical",
  },
] as const;

/** Skills are language-agnostic at the tag level — only titles/descriptions change */
export const SKILL_TAGS = {
  dev: [
    "JavaScript",
    "TypeScript",
    "C#",
    "Python",
    "Java",
    "React.js",
    "Node.js",
    "TailwindCSS",
    "POO",
    "Arquitetura de Sistemas",
  ],
  qa: [
    "Cypress",
    "Selenium WebDriver",
    "NUnit",
    "BDD / Gherkin",
    "Inteligência Artificial",
    "Prompt Engineering",
    "Automação Operacional",
  ],
  data: [
    "MongoDB",
    "SQL",
    "Git/GitHub",
    "Linux",
    "Redes & Hardware",
    "Maker & Impressão 3D",
  ],
  mgmt: [
    "Empreendedorismo",
    "Liderança",
    "Gestão de Projetos",
    "Metodologias Ágeis",
    "Resolução de Problemas",
    "Comunicação Efetiva",
  ],
} as const;
