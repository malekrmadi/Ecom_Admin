/**
 * Images de démo — URLs externes (Unsplash).
 * Remplacer par des fichiers locaux dans `public/uploads/` en production.
 *
 * Plan d'intégration locale :
 * 1. Télécharger les visuels listés dans IMAGE_CHECKLIST
 * 2. Les placer sous public/uploads/{products,categories,branding}/
 * 3. Remplacer les URLs https:// par /uploads/... dans data.ts
 * 4. Garder getImageUrl() qui accepte déjà http et chemins relatifs
 */

const u = (id: string, w = 600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const DEMO_IMAGES = {
  branding: {
    logo: "/uploads/uploads/logo.png",
    banner: "/uploads/uploads/banner.jfif",
  },
  categories: {
    huilesMoteur: "/uploads/uploads/Huiles Moteur.jfif",
    additifs: "/uploads/uploads/Additifs & Entretien.jfif",
    graisses: "/uploads/uploads/Graisses & Fluides.jfif",
    placeholder: "/placeholder.svg",
  },
  products: {
    totalQuartz: "/uploads/uploads/Total Quartz 9000.jfif",
    castrolEdge: "/uploads/uploads/Castrol EDGE.jfif",
    elfEvolution: "/uploads/uploads/Elf Evolution.jfif",
    liquiMoly: "/uploads/uploads/Liqui Moly Diesel.jfif",
    wynnsInjecteurs: "/uploads/uploads/Wynn's Nettoyant Injecteurs.jfif",
    bardahlAntiFuite: "/uploads/uploads/Bardahl Anti-fuite.jfif",
    motulGraisse: "/uploads/uploads/Motul Graisse.jfif",
    placeholder: "/placeholder.svg",
  },
} as const;

/** Inventaire pour remplacement par fichiers locaux */
export const IMAGE_CHECKLIST = [
  {
    id: "branding-logo",
    usage: "Logo boutique (sidebar, navbar storefront)",
    mockField: "store_settings.logo_url",
    suggestedPath: "public/uploads/branding/logo.png",
    demoUrl: DEMO_IMAGES.branding.logo,
    size: "200×80 px, PNG fond transparent",
  },
  {
    id: "branding-banner",
    usage: "Bannière hero page d'accueil",
    mockField: "store_settings.banner_image_url",
    suggestedPath: "public/uploads/branding/banner.jpg",
    demoUrl: DEMO_IMAGES.branding.banner,
    size: "1920×600 px, JPG",
  },
  {
    id: "cat-huiles-moteur",
    usage: "Catégorie Huiles Moteur",
    mockField: "categories[0].image_url",
    suggestedPath: "public/uploads/categories/huiles-moteur.jpg",
    demoUrl: DEMO_IMAGES.categories.huilesMoteur,
    size: "800×800 px",
  },
  {
    id: "cat-additifs",
    usage: "Catégorie Additifs & Entretien",
    mockField: "categories[1].image_url",
    suggestedPath: "public/uploads/categories/additifs.jpg",
    demoUrl: DEMO_IMAGES.categories.additifs,
    size: "800×800 px",
  },
  {
    id: "cat-graisses",
    usage: "Catégorie Graisses & Fluides",
    mockField: "categories[2].image_url",
    suggestedPath: "public/uploads/categories/graisses.jpg",
    demoUrl: DEMO_IMAGES.categories.graisses,
    size: "800×800 px",
  },
  {
    id: "prod-total-quartz",
    usage: "Produit Total Quartz 9000",
    mockField: "products[0].image_url",
    suggestedPath: "public/uploads/products/total-quartz-9000.jpg",
    demoUrl: DEMO_IMAGES.products.totalQuartz,
    size: "800×800 px, fond neutre",
  },
  {
    id: "prod-castrol",
    usage: "Produit Castrol EDGE",
    suggestedPath: "public/uploads/products/castrol-edge.jpg",
    demoUrl: DEMO_IMAGES.products.castrolEdge,
    size: "800×800 px",
  },
  {
    id: "prod-elf",
    usage: "Produit Elf Evolution",
    suggestedPath: "public/uploads/products/elf-evolution.jpg",
    demoUrl: DEMO_IMAGES.products.elfEvolution,
    size: "800×800 px",
  },
  {
    id: "prod-liqui-moly",
    usage: "Produit Liqui Moly Diesel",
    suggestedPath: "public/uploads/products/liqui-moly-diesel.jpg",
    demoUrl: DEMO_IMAGES.products.liquiMoly,
    size: "800×800 px",
  },
  {
    id: "prod-wynns",
    usage: "Produit Wynn's Nettoyant",
    suggestedPath: "public/uploads/products/wynns-injecteurs.jpg",
    demoUrl: DEMO_IMAGES.products.wynnsInjecteurs,
    size: "800×800 px",
  },
  {
    id: "prod-bardahl",
    usage: "Produit Bardahl Anti-fuite",
    suggestedPath: "public/uploads/products/bardahl-anti-fuite.jpg",
    demoUrl: DEMO_IMAGES.products.bardahlAntiFuite,
    size: "800×800 px",
  },
  {
    id: "prod-motul",
    usage: "Produit Motul Graisse",
    suggestedPath: "public/uploads/products/motul-graisse.jpg",
    demoUrl: DEMO_IMAGES.products.motulGraisse,
    size: "800×800 px",
  },
  {
    id: "placeholder-product",
    usage: "Fallback produit sans image",
    mockField: "getPlaceholderImage()",
    suggestedPath: "public/uploads/products/placeholder.jpg",
    demoUrl: DEMO_IMAGES.products.placeholder,
    size: "400×400 px",
  },
  {
    id: "placeholder-category",
    usage: "Fallback nouvelle catégorie",
    suggestedPath: "public/uploads/categories/placeholder.jpg",
    demoUrl: DEMO_IMAGES.categories.placeholder,
    size: "400×400 px",
  },
] as const;
