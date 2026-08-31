import type { Product } from "@/lib/types";

export const products: Product[] = [
  {
    id: "p001",
    slug: "ivory-silk-saree",
    name: "Ivory Silk Saree with Gold Embroidery",
    price: 185000,
    currency: "INR",
    category: "sarees",
    gender: "women",
    collection: "heritage-revival",
    availability: "MADE TO ORDER",
    description:
      "A handwoven ivory silk saree with intricate gold zardozi embroidery along the pallu and border. Each motif is crafted by artisans over six weeks, reflecting the house's commitment to preserving traditional craft.",
    material: "Pure Mysore silk with gold zardozi thread",
    craft: "Hand-embroidered by master karigars in Lucknow",
    fit: "Drape style — 6.3m length, 1.1m width",
    shipping: "Made to order — 4-6 weeks delivery",
    returns: "Made-to-order pieces are non-returnable",
    images: [
      { src: "/women-single-potrait.jpeg", alt: "Ivory silk saree with gold embroidery", type: "front" },
    ],
    variants: [
      { size: "Free Size", color: "Ivory", colorHex: "#F8F4EE", inStock: true },
    ],
    occasion: ["bridal", "festive", "reception"],
    featured: true,
    newArrival: true,
  },
  {
    id: "p002",
    slug: "crimson-velvet-lehenga",
    name: "Crimson Velvet Lehenga with Mirror Work",
    price: 320000,
    currency: "INR",
    category: "lehengas",
    gender: "women",
    collection: "evening-edit",
    availability: "MADE TO ORDER",
    description:
      "A deep crimson velvet lehenga set featuring hand-applied mirror work and resham embroidery. The blouse is structured with internal boning for a sculpted silhouette.",
    material: "Italian velvet with silk lining",
    craft: "Hand-embroidered mirror work and resham thread",
    fit: "High-waisted skirt with structured blouse",
    shipping: "Made to order — 6-8 weeks delivery",
    returns: "Made-to-order pieces are non-returnable",
    images: [
      { src: "/f1.jpeg", alt: "Crimson velvet lehenga with mirror work", type: "front" },
    ],
    variants: [
      { size: "XS", color: "Crimson", colorHex: "#9B1B30", inStock: true },
      { size: "S", color: "Crimson", colorHex: "#9B1B30", inStock: true },
      { size: "M", color: "Crimson", colorHex: "#9B1B30", inStock: true },
      { size: "L", color: "Crimson", colorHex: "#9B1B30", inStock: false },
    ],
    occasion: ["bridal", "reception", "cocktail"],
    featured: true,
    newArrival: true,
  },
  {
    id: "p003",
    slug: "black-structured-gown",
    name: "Black Structured Column Gown",
    price: 245000,
    currency: "INR",
    category: "gowns",
    gender: "women",
    collection: "evening-edit",
    availability: "READY TO SHIP",
    description:
      "A floor-length black column gown with architectural draping and a sculpted shoulder. Cut from heavyweight crepe with a matte finish.",
    material: "Heavyweight stretch crepe",
    craft: "Precision draping and internal corsetry",
    fit: "Slim column — true to size",
    shipping: "Ships within 2-3 business days",
    returns: "7-day return window",
    images: [
      { src: "/women-single-potrait-2.jpeg", alt: "Black structured column gown", type: "front" },
    ],
    variants: [
      { size: "XS", color: "Black", colorHex: "#1A1A1A", inStock: true },
      { size: "S", color: "Black", colorHex: "#1A1A1A", inStock: true },
      { size: "M", color: "Black", colorHex: "#1A1A1A", inStock: true },
      { size: "L", color: "Black", colorHex: "#1A1A1A", inStock: true },
    ],
    occasion: ["cocktail", "reception"],
    featured: true,
    newArrival: false,
  },
  {
    id: "p004",
    slug: "emerald-silk-suit",
    name: "Emerald Silk Suit with Resham Embroidery",
    price: 145000,
    currency: "INR",
    category: "suits",
    gender: "women",
    collection: "heritage-revival",
    availability: "MADE TO ORDER",
    description:
      "A three-piece emerald silk suit with delicate resham embroidery on the kurta and dupatta. Tailored with a relaxed yet refined silhouette.",
    material: "Mulberry silk with cotton lining",
    craft: "Hand-embroidered resham thread work",
    fit: "Relaxed fit — size down for fitted look",
    shipping: "Made to order — 3-5 weeks delivery",
    returns: "Made-to-order pieces are non-returnable",
    images: [
      { src: "/mf-1.jpeg", alt: "Emerald silk suit with resham embroidery", type: "front" },
    ],
    variants: [
      { size: "XS", color: "Emerald", colorHex: "#0B5D3B", inStock: true },
      { size: "S", color: "Emerald", colorHex: "#0B5D3B", inStock: true },
      { size: "M", color: "Emerald", colorHex: "#0B5D3B", inStock: true },
      { size: "L", color: "Emerald", colorHex: "#0B5D3B", inStock: true },
      { size: "XL", color: "Emerald", colorHex: "#0B5D3B", inStock: false },
    ],
    occasion: ["festive", "daywear"],
    featured: false,
    newArrival: true,
  },
  {
    id: "p005",
    slug: "ivory-sherwani",
    name: "Ivory Sherwani with Gold Thread Work",
    price: 285000,
    currency: "INR",
    category: "sherwanis",
    gender: "men",
    collection: "grooms-atelier",
    availability: "MADE TO ORDER",
    description:
      "An ivory raw silk sherwani with tonal gold thread embroidery along the placket and cuffs. Paired with a silk kurta and churidar.",
    material: "Raw silk with silk-blend lining",
    craft: "Hand-embroidered gold thread work",
    fit: "Tailored fit — structured shoulder",
    shipping: "Made to order — 4-6 weeks delivery",
    returns: "Made-to-order pieces are non-returnable",
    images: [
      { src: "/male-single-potrait.jpeg", alt: "Ivory sherwani with gold thread work", type: "front" },
    ],
    variants: [
      { size: "38", color: "Ivory", colorHex: "#F8F4EE", inStock: true },
      { size: "40", color: "Ivory", colorHex: "#F8F4EE", inStock: true },
      { size: "42", color: "Ivory", colorHex: "#F8F4EE", inStock: true },
      { size: "44", color: "Ivory", colorHex: "#F8F4EE", inStock: true },
      { size: "46", color: "Ivory", colorHex: "#F8F4EE", inStock: false },
    ],
    occasion: ["groom", "reception"],
    featured: true,
    newArrival: true,
  },
  {
    id: "p006",
    slug: "midnight-blue-bandhgala",
    name: "Midnight Blue Bandhgala Suit",
    price: 195000,
    currency: "INR",
    category: "bandhgalas",
    gender: "men",
    collection: "grooms-atelier",
    availability: "READY TO SHIP",
    description:
      "A midnight blue bandhgala suit cut from Italian wool. Features a mandarin collar and covered buttons. Tailored for a sharp, contemporary silhouette.",
    material: "Italian wool",
    craft: "Half-canvas construction",
    fit: "Slim fit — true to size",
    shipping: "Ships within 2-3 business days",
    returns: "7-day return window",
    images: [
      { src: "/single-male-potraite-2.jpeg", alt: "Midnight blue bandhgala suit", type: "front" },
    ],
    variants: [
      { size: "38", color: "Midnight Blue", colorHex: "#1B2A4A", inStock: true },
      { size: "40", color: "Midnight Blue", colorHex: "#1B2A4A", inStock: true },
      { size: "42", color: "Midnight Blue", colorHex: "#1B2A4A", inStock: true },
      { size: "44", color: "Midnight Blue", colorHex: "#1B2A4A", inStock: false },
    ],
    occasion: ["reception", "sangeet"],
    featured: false,
    newArrival: true,
  },
  {
    id: "p007",
    slug: "blush-tulle-gown",
    name: "Blush Tulle Gown with Floral Appliques",
    price: 210000,
    currency: "INR",
    category: "gowns",
    gender: "women",
    collection: "evening-edit",
    availability: "PRE-ORDER",
    description:
      "A layered blush tulle gown with hand-applied floral appliques. The silhouette is fluid and romantic with a fitted bodice and flowing skirt.",
    material: "Silk tulle with satin lining",
    craft: "Hand-applied floral appliques",
    fit: "Fitted bodice, relaxed skirt",
    shipping: "Pre-order — 6-8 weeks delivery",
    returns: "Pre-order pieces are non-returnable",
    images: [
      { src: "/whatsapp-image-2.jpeg", alt: "Blush tulle gown with floral appliques", type: "front" },
    ],
    variants: [
      { size: "XS", color: "Blush", colorHex: "#E8C4C8", inStock: true },
      { size: "S", color: "Blush", colorHex: "#E8C4C8", inStock: true },
      { size: "M", color: "Blush", colorHex: "#E8C4C8", inStock: true },
    ],
    occasion: ["reception", "cocktail"],
    featured: false,
    newArrival: true,
  },
  {
    id: "p008",
    slug: "gold-pearl-choker",
    name: "Gold and Pearl Choker Necklace",
    price: 88000,
    currency: "INR",
    category: "jewellery",
    gender: "women",
    availability: "READY TO SHIP",
    description:
      "A handcrafted gold-plated choker with freshwater pearls. Designed to complement both traditional and contemporary ensembles.",
    material: "Gold-plated brass with freshwater pearls",
    craft: "Hand-assembled by master jewellers",
    fit: "Adjustable — 14-16 inch length",
    shipping: "Ships within 1-2 business days",
    returns: "7-day return window",
    images: [
      { src: "/mf-2.jpeg", alt: "Gold and pearl choker necklace", type: "front" },
    ],
    variants: [
      { size: "One Size", color: "Gold", colorHex: "#C4A653", inStock: true },
    ],
    occasion: ["bridal", "festive", "reception"],
    featured: false,
    newArrival: true,
  },
  {
    id: "p009",
    slug: "charcoal-kurta-set",
    name: "Charcoal Linen Kurta Set",
    price: 65000,
    currency: "INR",
    category: "kurta-sets",
    gender: "men",
    availability: "READY TO SHIP",
    description:
      "A charcoal linen kurta set with subtle tone-on-tone embroidery. Relaxed fit for effortless daywear and intimate gatherings.",
    material: "Pure linen",
    craft: "Tone-on-tone machine embroidery",
    fit: "Relaxed fit — true to size",
    shipping: "Ships within 2-3 business days",
    returns: "7-day return window",
    images: [
      { src: "/males-group-potrait.jpeg", alt: "Charcoal linen kurta set", type: "front" },
    ],
    variants: [
      { size: "38", color: "Charcoal", colorHex: "#36454F", inStock: true },
      { size: "40", color: "Charcoal", colorHex: "#36454F", inStock: true },
      { size: "42", color: "Charcoal", colorHex: "#36454F", inStock: true },
      { size: "44", color: "Charcoal", colorHex: "#36454F", inStock: true },
    ],
    occasion: ["festive", "daywear"],
    featured: false,
    newArrival: false,
  },
  {
    id: "p010",
    slug: "rose-gold-embroidered-saree",
    name: "Rose Gold Embroidered Saree",
    price: 165000,
    currency: "INR",
    category: "sarees",
    gender: "women",
    collection: "heritage-revival",
    availability: "MADE TO ORDER",
    description:
      "A rose gold organza saree with delicate sequin and bead embroidery. Lightweight and luminous, designed for evening occasions.",
    material: "Silk organza with sequin embroidery",
    craft: "Hand-embroidered sequin and bead work",
    fit: "Drape style — 5.5m length, 1.1m width",
    shipping: "Made to order — 3-5 weeks delivery",
    returns: "Made-to-order pieces are non-returnable",
    images: [
      { src: "/f2.jpeg", alt: "Rose gold embroidered saree", type: "front" },
    ],
    variants: [
      { size: "Free Size", color: "Rose Gold", colorHex: "#B76E79", inStock: true },
    ],
    occasion: ["cocktail", "reception", "festive"],
    featured: false,
    newArrival: false,
  },
  {
    id: "p011",
    slug: "cream-silk-dupatta-stole",
    name: "Cream Silk Stole with Thread Border",
    price: 28000,
    currency: "INR",
    category: "stoles",
    gender: "unisex",
    availability: "READY TO SHIP",
    description:
      "A cream silk stole with an intricately embroidered thread border. Versatile and lightweight — a refined finishing piece.",
    material: "Pure silk",
    craft: "Hand-embroidered thread border",
    fit: "2.2m x 0.9m",
    shipping: "Ships within 1-2 business days",
    returns: "7-day return window",
    images: [
      { src: "/hover-single-male-2.jpeg", alt: "Cream silk stole with thread border", type: "front" },
    ],
    variants: [
      { size: "One Size", color: "Cream", colorHex: "#F4E9D8", inStock: true },
    ],
    occasion: ["festive", "daywear"],
    featured: false,
    newArrival: false,
  },
  {
    id: "p012",
    slug: "deep-maroon-lehenga",
    name: "Deep Maroon Bridal Lehenga with Gold Work",
    price: 450000,
    currency: "INR",
    category: "lehengas",
    gender: "women",
    collection: "heritage-revival",
    availability: "BESPOKE",
    description:
      "A deep maroon bridal lehenga with extensive gold zardozi and pearl embroidery. The blouse features a deep back with tassel ties. Available through bespoke consultation only.",
    material: "Raw silk with velvet panels",
    craft: "Hand-embroidered zardozi with pearl detailing",
    fit: "Custom fitted through private consultation",
    shipping: "Bespoke — 8-12 weeks delivery",
    returns: "Bespoke pieces are non-returnable",
    images: [
      { src: "/whatsapp-image-1.jpeg", alt: "Deep maroon bridal lehenga with gold work", type: "front" },
    ],
    variants: [
      { size: "Custom", color: "Deep Maroon", colorHex: "#6B2B2B", inStock: true },
    ],
    occasion: ["bridal"],
    featured: true,
    newArrival: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function getProductsByGender(gender: string): Product[] {
  if (gender === "women") return products.filter((p) => p.gender === "women");
  if (gender === "men") return products.filter((p) => p.gender === "men");
  return products;
}

export function getProductsByCollection(collectionSlug: string): Product[] {
  return products.filter((p) => p.collection === collectionSlug);
}

export function getNewArrivals(): Product[] {
  return products.filter((p) => p.newArrival);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.occasion?.some((o) => o.includes(q))
  );
}
