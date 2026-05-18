import type { Product, StoreSettings } from "@/lib/services";
import { DEMO_IMAGES } from "@/mock/demoImages";

const ts = (daysAgo: number) => {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
};

export const initialCategories = [
  {
    id: 1,
    name: "Huiles Moteur",
    slug: "huiles-moteur",
    image_url: DEMO_IMAGES.categories.huilesMoteur,
    is_active: true,
    created_at: ts(90),
    updated_at: ts(5),
  },
  {
    id: 2,
    name: "Additifs & Entretien",
    slug: "additifs-entretien",
    image_url: DEMO_IMAGES.categories.additifs,
    is_active: true,
    created_at: ts(90),
    updated_at: ts(5),
  },
  {
    id: 3,
    name: "Graisses & Fluides",
    slug: "graisses-fluides",
    image_url: DEMO_IMAGES.categories.graisses,
    is_active: true,
    created_at: ts(90),
    updated_at: ts(5),
  },
];

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "Total Quartz 9000 Energy 5W-40",
    slug: "total-quartz-9000-5w40",
    description:
      "Huile synthétique haute performance pour moteurs essence et diesel. Protection optimale à haute température.",
    price: 89.9,
    promo_price: 79.9,
    is_on_promo: true,
    stock: 24,
    category_id: 1,
    image_url: DEMO_IMAGES.products.totalQuartz,
    is_active: true,
    is_visible: true,
    viscosity: "5W-40",
    motor_type: "Essence / Diesel",
    volume: "5L",
    packaging: "Bidon",
  },
  {
    id: 2,
    name: "Castrol EDGE 5W-30",
    slug: "castrol-edge-5w30",
    description:
      "Huile 100% synthétique avec technologie Fluid Titanium. Réduit les frictions pour une performance maximale.",
    price: 95.5,
    is_on_promo: false,
    stock: 18,
    category_id: 1,
    image_url: DEMO_IMAGES.products.castrolEdge,
    is_active: true,
    is_visible: true,
    viscosity: "5W-30",
    motor_type: "Essence",
    volume: "4L",
    packaging: "Bidon",
  },
  {
    id: 3,
    name: "Elf Evolution 900 NF 10W-40",
    slug: "elf-evolution-10w40",
    description:
      "Huile semi-synthétique adaptée aux véhicules récents. Excellente tenue à l'oxydation.",
    price: 62.0,
    promo_price: 54.9,
    is_on_promo: true,
    stock: 32,
    category_id: 1,
    image_url: DEMO_IMAGES.products.elfEvolution,
    is_active: true,
    is_visible: true,
    viscosity: "10W-40",
    motor_type: "Essence / Diesel",
    volume: "5L",
    packaging: "Bidon",
  },
  {
    id: 4,
    name: "Liqui Moly Leichtlauf Diesel 5W-40",
    slug: "liqui-moly-diesel-5w40",
    description:
      "Huile spéciale moteurs diesel turbo. Réduit la consommation et prolonge la durée de vie du moteur.",
    price: 118.0,
    is_on_promo: false,
    stock: 12,
    category_id: 1,
    image_url: DEMO_IMAGES.products.liquiMoly,
    is_active: true,
    is_visible: true,
    viscosity: "5W-40",
    motor_type: "Diesel",
    volume: "5L",
    packaging: "Bidon",
  },
  {
    id: 5,
    name: "Wynn's Nettoyant Injecteurs Diesel",
    slug: "wynns-nettoyant-injecteurs",
    description:
      "Additif nettoyant pour injecteurs diesel. Améliore la combustion et réduit les fumées noires.",
    price: 28.5,
    is_on_promo: false,
    stock: 45,
    category_id: 2,
    image_url: DEMO_IMAGES.products.wynnsInjecteurs,
    is_active: true,
    is_visible: true,
    viscosity: "N/A",
    motor_type: "Diesel",
    volume: "325ml",
    packaging: "Bouteille",
  },
  {
    id: 6,
    name: "Bardahl Additif Anti-fuite Moteur",
    slug: "bardahl-anti-fuite",
    description:
      "Traitement anti-fuite pour joints et segments. Régénère les joints souples sans démonter le moteur.",
    price: 35.0,
    promo_price: 29.9,
    is_on_promo: true,
    stock: 20,
    category_id: 2,
    image_url: DEMO_IMAGES.products.bardahlAntiFuite,
    is_active: true,
    is_visible: true,
    viscosity: "N/A",
    motor_type: "Essence / Diesel",
    volume: "500ml",
    packaging: "Bouteille",
  },
  {
    id: 7,
    name: "Motul Graisse Haute Température",
    slug: "motul-graisse-ht",
    description:
      "Graisse lithium complexe pour roulements et articulations soumises à fortes chaleurs.",
    price: 42.0,
    is_on_promo: false,
    stock: 15,
    category_id: 3,
    image_url: DEMO_IMAGES.products.motulGraisse,
    is_active: true,
    is_visible: true,
    viscosity: "N/A",
    motor_type: "Universel",
    volume: "400g",
    packaging: "Tube",
  },
];

export const initialCustomers = [
  {
    id: 1,
    full_name: "Ahmed Ben Salah",
    phone: "+216 22 345 678",
    governorate: "Tunis",
    city: "La Marsa",
    address: "12 Avenue Habib Bourguiba",
    total_orders: 4,
    total_spent: 412.5,
    total_returns: 0,
    created_at: ts(120),
    updated_at: ts(2),
  },
  {
    id: 2,
    full_name: "Fatma Trabelsi",
    phone: "+216 98 112 334",
    governorate: "Sfax",
    city: "Sfax Ville",
    address: "Zone Industrielle Route de Gabès",
    total_orders: 2,
    total_spent: 187.4,
    total_returns: 1,
    created_at: ts(80),
    updated_at: ts(8),
  },
  {
    id: 3,
    full_name: "Mohamed Jebali",
    phone: "+216 55 887 221",
    governorate: "Sousse",
    city: "Kantaoui",
    address: "Résidence Les Palmiers Bloc B",
    total_orders: 3,
    total_spent: 298.0,
    total_returns: 0,
    created_at: ts(60),
    updated_at: ts(4),
  },
  {
    id: 4,
    full_name: "Sonia Gharbi",
    phone: "+216 27 990 445",
    governorate: "Nabeul",
    city: "Hammamet",
    address: "45 Rue des Oliviers",
    total_orders: 1,
    total_spent: 79.9,
    total_returns: 0,
    created_at: ts(15),
    updated_at: ts(1),
  },
];

function buildOrderItems(
  orderId: number,
  items: { product_id: number; quantity: number }[],
  products: Product[]
) {
  let itemId = orderId * 10;
  return items.map(({ product_id, quantity }) => {
    const product = products.find((p) => p.id === product_id)!;
    const unit = product.is_on_promo && product.promo_price ? product.promo_price : product.price;
    itemId += 1;
    return {
      id: itemId,
      order_id: orderId,
      product_id,
      variant_id: null,
      quantity,
      unit_price: unit,
      total_price: Number((unit * quantity).toFixed(2)),
      Product: { ...product },
    };
  });
}

export function buildInitialOrders(products: Product[]) {
  const o1Items = buildOrderItems(1, [{ product_id: 1, quantity: 2 }], products);
  const o2Items = buildOrderItems(2, [{ product_id: 5, quantity: 3 }, { product_id: 6, quantity: 1 }], products);
  const o3Items = buildOrderItems(3, [{ product_id: 2, quantity: 1 }], products);
  const o4Items = buildOrderItems(4, [{ product_id: 4, quantity: 1 }, { product_id: 7, quantity: 2 }], products);
  const o5Items = buildOrderItems(5, [{ product_id: 3, quantity: 2 }], products);
  const o6Items = buildOrderItems(6, [{ product_id: 1, quantity: 1 }], products);

  const sum = (items: { total_price: number }[]) =>
    items.reduce((s, i) => s + Number(i.total_price), 0);

  return [
    {
      id: 1,
      customer_id: 1,
      customer_name: "Ahmed Ben Salah",
      customer_phone: "+216 22 345 678",
      governorate: "Tunis",
      city: "La Marsa",
      address: "12 Avenue Habib Bourguiba",
      note: "Livraison après 18h",
      status: "delivered",
      total_price: sum(o1Items),
      created_at: ts(14),
      updated_at: ts(10),
      Customer: initialCustomers[0],
      OrderItems: o1Items,
    },
    {
      id: 2,
      customer_id: 2,
      customer_name: "Fatma Trabelsi",
      customer_phone: "+216 98 112 334",
      governorate: "Sfax",
      city: "Sfax Ville",
      address: "Zone Industrielle Route de Gabès",
      note: "",
      status: "shipped",
      total_price: sum(o2Items),
      created_at: ts(5),
      updated_at: ts(3),
      Customer: initialCustomers[1],
      OrderItems: o2Items,
    },
    {
      id: 3,
      customer_id: 3,
      customer_name: "Mohamed Jebali",
      customer_phone: "+216 55 887 221",
      governorate: "Sousse",
      city: "Kantaoui",
      address: "Résidence Les Palmiers Bloc B",
      note: "",
      status: "confirmed",
      total_price: sum(o3Items),
      created_at: ts(3),
      updated_at: ts(2),
      Customer: initialCustomers[2],
      OrderItems: o3Items,
    },
    {
      id: 4,
      customer_id: 1,
      customer_name: "Ahmed Ben Salah",
      customer_phone: "+216 22 345 678",
      governorate: "Tunis",
      city: "Ariana",
      address: "Cité Ennasr",
      note: "Appeler avant livraison",
      status: "delivered",
      total_price: sum(o4Items),
      created_at: ts(20),
      updated_at: ts(15),
      Customer: initialCustomers[0],
      OrderItems: o4Items,
    },
    {
      id: 5,
      customer_id: 4,
      customer_name: "Sonia Gharbi",
      customer_phone: "+216 27 990 445",
      governorate: "Nabeul",
      city: "Hammamet",
      address: "45 Rue des Oliviers",
      note: "",
      status: "pending",
      total_price: sum(o5Items),
      created_at: ts(1),
      updated_at: ts(1),
      Customer: initialCustomers[3],
      OrderItems: o5Items,
    },
    {
      id: 6,
      customer_id: 2,
      customer_name: "Fatma Trabelsi",
      customer_phone: "+216 98 112 334",
      governorate: "Sfax",
      city: "Sfax Ville",
      address: "Zone Industrielle Route de Gabès",
      note: "",
      status: "returned",
      total_price: sum(o6Items),
      created_at: ts(25),
      updated_at: ts(20),
      Customer: initialCustomers[1],
      OrderItems: o6Items,
    },
  ];
}

export const initialReturns = [
  {
    id: 1,
    order_id: 6,
    customer_id: 2,
    reason: "Produit non conforme à la commande — bidon endommagé à la réception",
    status: "returned",
    created_at: ts(18),
  },
];

export const initialStoreSettings: StoreSettings = {
  id: 1,
  store_name: "Huiles Moteurs Tunisie",
  logo_url: DEMO_IMAGES.branding.logo,
  hero_title: "Huiles & Lubrifiants Premium pour votre Moteur",
  hero_subtitle:
    "Huiles moteur, additifs et graisses de grandes marques. Livraison dans toute la Tunisie — paiement à la livraison.",
  banner_image_url: DEMO_IMAGES.branding.banner,
  facebook_url: "https://facebook.com/huilesmoteurstn",
  instagram_url: "https://instagram.com/huilesmoteurstn",
  email: "contact@huilesmoteurs.tn",
  phone: "+216 70 123 456",
};

export const statsRevenue = { revenue: 892.6 };

export const statsAverageBasket = { average_basket: 148.77 };

export const statsReturnsRate = { returns_rate: 16.67 };

export const statsSalesOverTime = [
  { date: ts(28).split("T")[0], total_revenue: 118.0 },
  { date: ts(25).split("T")[0], total_revenue: 79.9 },
  { date: ts(22).split("T")[0], total_revenue: 202.0 },
  { date: ts(20).split("T")[0], total_revenue: 159.8 },
  { date: ts(14).split("T")[0], total_revenue: 159.8 },
  { date: ts(10).split("T")[0], total_revenue: 95.5 },
  { date: ts(5).split("T")[0], total_revenue: 122.5 },
  { date: ts(2).split("T")[0], total_revenue: 109.8 },
];

export const statsTopProducts = [
  { id: 1, name: "Total Quartz 9000 Energy 5W-40", total_quantity: 12 },
  { id: 5, name: "Wynn's Nettoyant Injecteurs Diesel", total_quantity: 9 },
  { id: 3, name: "Elf Evolution 900 NF 10W-40", total_quantity: 7 },
  { id: 6, name: "Bardahl Additif Anti-fuite Moteur", total_quantity: 5 },
  { id: 4, name: "Liqui Moly Leichtlauf Diesel 5W-40", total_quantity: 4 },
];

export const statsOrdersByGovernorate = [
  { governorate: "Tunis", count: 8 },
  { governorate: "Sfax", count: 5 },
  { governorate: "Sousse", count: 4 },
  { governorate: "Nabeul", count: 3 },
  { governorate: "Bizerte", count: 2 },
];
