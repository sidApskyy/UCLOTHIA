import type { Collection, Look, JournalArticle, Store } from "@/lib/types";

export const collections: Collection[] = [
  {
    id: "c001",
    slug: "evening-edit",
    name: "The Evening Edit",
    season: "Autumn Winter 2026",
    concept:
      "A study in after-dark elegance — architectural silhouettes, deep jewel tones, and a restrained approach to embellishment.",
    description:
      "The Evening Edit explores the tension between structure and fluidity. Each piece is designed for the hours that demand presence without excess. Velvet, crepe, and tulle are cut into clean lines, with embellishment placed strategically rather than liberally.",
    heroImage: "/whatsapp-image-1.jpeg",
    heroImageAlt: "The Evening Edit — campaign hero",
    campaignImages: [
      { src: "/women-single-potrait-2.jpeg", alt: "Evening Edit — look 01" },
      { src: "/f1.jpeg", alt: "Evening Edit — look 02" },
    ],
    productIds: ["p002", "p003", "p007"],
  },
  {
    id: "c002",
    slug: "grooms-atelier",
    name: "The Groom's Atelier",
    season: "Autumn Winter 2026",
    concept:
      "Redefining menswear for the modern groom — heritage silhouettes reimagined with contemporary precision.",
    description:
      "The Groom's Atelier is built on the principle that menswear deserves the same level of craft and consideration as couture. Raw silk sherwanis, wool bandhgalas, and linen kurtas are tailored with an eye for proportion, structure, and quiet luxury.",
    heroImage: "/male-single-potrait.jpeg",
    heroImageAlt: "The Groom's Atelier — campaign hero",
    campaignImages: [
      { src: "/single-male-potraite-2.jpeg", alt: "Groom's Atelier — look 01" },
      { src: "/hover-single-male-1.jpeg", alt: "Groom's Atelier — look 02" },
    ],
    productIds: ["p005", "p006"],
  },
  {
    id: "c003",
    slug: "heritage-revival",
    name: "Heritage Revival",
    season: "Couture 2026",
    concept:
      "Returning to the roots of Indian craft — reviving traditional techniques through a modern editorial lens.",
    description:
      "Heritage Revival is an ongoing dialogue between past and present. Each piece draws from the vocabulary of Indian textile traditions — zardozi, resham, mirror work — and recontextualizes them for the contemporary wardrobe. This is not nostalgia. This is continuity.",
    heroImage: "/women-single-potrait.jpeg",
    heroImageAlt: "Heritage Revival — campaign hero",
    campaignImages: [
      { src: "/f2.jpeg", alt: "Heritage Revival — look 01" },
      { src: "/mf-2.jpeg", alt: "Heritage Revival — look 02" },
    ],
    craftDetails: [
      {
        title: "The Silhouette",
        description: "Traditional drape reimagined with modern tailoring precision.",
        image: "/hover-single-male-1.jpeg",
        imageAlt: "Drape and silhouette detail",
      },
      {
        title: "The Material",
        description: "Pure Mysore silk, raw silk, and silk organza from heritage sources.",
        image: "/hover-single-male-2.jpeg",
        imageAlt: "Silk texture close-up",
      },
      {
        title: "The Craft",
        description: "Zardozi, resham, and mirror work by master karigars across India.",
        image: "/hover-single-male-3.jpeg",
        imageAlt: "Traditional embroidery detail",
      },
    ],
    productIds: ["p001", "p004", "p010", "p012"],
  },
];

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export const looks: Look[] = [
  {
    id: "l001",
    slug: "look-01-the-column",
    name: "Look 01 — The Column",
    collection: "evening-edit",
    image: "/women-single-potrait.jpeg",
    imageAlt: "Look 01 — The Column",
    productIds: ["p003", "p008"],
  },
  {
    id: "l002",
    slug: "look-02-the-drape",
    name: "Look 02 — The Drape",
    collection: "heritage-revival",
    image: "/women-single-potrait-2.jpeg",
    imageAlt: "Look 02 — The Drape",
    productIds: ["p001", "p008"],
  },
  {
    id: "l003",
    slug: "look-03-the-groom",
    name: "Look 03 — The Groom",
    collection: "grooms-atelier",
    image: "/male-single-potrait.jpeg",
    imageAlt: "Look 03 — The Groom",
    productIds: ["p005", "p011"],
  },
  {
    id: "l004",
    slug: "look-04-the-mirror",
    name: "Look 04 — The Mirror",
    collection: "evening-edit",
    image: "/f1.jpeg",
    imageAlt: "Look 04 — The Mirror",
    productIds: ["p002"],
  },
  {
    id: "l005",
    slug: "look-05-the-bridal",
    name: "Look 05 — The Bridal",
    collection: "heritage-revival",
    image: "/f2.jpeg",
    imageAlt: "Look 05 — The Bridal",
    productIds: ["p012", "p008"],
  },
  {
    id: "l006",
    slug: "look-06-the-evening",
    name: "Look 06 — The Evening",
    collection: "evening-edit",
    image: "/mf-2.jpeg",
    imageAlt: "Look 06 — The Evening",
    productIds: ["p007"],
  },
];

export function getLookBySlug(slug: string): Look | undefined {
  return looks.find((l) => l.slug === slug);
}

export const journalArticles: JournalArticle[] = [
  {
    id: "j001",
    slug: "the-art-of-zardozi",
    title: "The Art of Zardozi",
    excerpt:
      "Tracing the journey of gold thread embroidery from Mughal courts to contemporary couture.",
    category: "Craft",
    date: "2026-08-15",
    readTime: "6 min read",
    heroImage: "/whatsapp-image-2.jpeg",
    heroImageAlt: "Zardozi embroidery — editorial",
    content: [
      {
        type: "paragraph",
        text: "Zardozi — the art of embroidering with gold and silver threads — has been practised in India for centuries. Born in the courts of the Mughals, it found its way into the vocabulary of Indian bridal wear, where it remains indispensable today.",
      },
      {
        type: "heading",
        text: "The Process",
      },
      {
        type: "paragraph",
        text: "Each motif begins as a drawing on tracing paper, transferred to fabric using a mixture of chalk and kerosene. The artisan then works with a hooked needle called an ari, pulling metallic thread through the fabric to create raised, textured patterns.",
      },
      {
        type: "paragraph",
        text: "A single saree can take four to six weeks, depending on the density of the work. The master karigar leads a small team, each member specialising in a particular technique — the couching, the filling, the outlining.",
      },
      {
        type: "heading",
        text: "A Living Tradition",
      },
      {
        type: "paragraph",
        text: "At UCLOTHIA, we work with clusters in Lucknow and Bareilly, where zardozi has been practised for generations. Our role is not to preserve these techniques as museum pieces, but to give them a contemporary context — to let them live on the bodies of women who wear them with intention.",
      },
      {
        type: "quote",
        text: "Craft is not nostalgia. It is the continuous act of making meaning with your hands.",
      },
    ],
    relatedProductIds: ["p001", "p012"],
    relatedCollectionIds: ["c003"],
  },
  {
    id: "j002",
    slug: "behind-the-evening-edit",
    title: "Behind the Evening Edit",
    excerpt:
      "A conversation with the design team on architecture, restraint, and the after-dark wardrobe.",
    category: "Behind the Scenes",
    date: "2026-07-28",
    readTime: "5 min read",
    heroImage: "/women-single-potrait-2.jpeg",
    heroImageAlt: "Behind the Evening Edit — editorial",
    content: [
      {
        type: "paragraph",
        text: "The Evening Edit began with a simple question: what does elegance look like after dark? Not opulence. Not spectacle. Elegance.",
      },
      {
        type: "heading",
        text: "The Starting Point",
      },
      {
        type: "paragraph",
        text: "We looked at the work of architects — the way they think about negative space, about the relationship between structure and light. We wanted to bring that same discipline to evening wear.",
      },
      {
        type: "paragraph",
        text: "The result is a collection that privileges line over ornament. Embellishment is placed where it catches light — at the shoulder, along the hem — and absent everywhere else.",
      },
      {
        type: "quote",
        text: "Restraint is the ultimate luxury. Knowing what to leave out.",
      },
    ],
    relatedProductIds: ["p002", "p003", "p007"],
    relatedCollectionIds: ["c001"],
  },
  {
    id: "j003",
    slug: "the-modern-groom",
    title: "The Modern Groom",
    excerpt:
      "How menswear is being redefined — heritage silhouettes, contemporary tailoring, and the end of the rental sherwani.",
    category: "Fashion",
    date: "2026-07-10",
    readTime: "4 min read",
    heroImage: "/hover-single-male-3.jpeg",
    heroImageAlt: "The modern groom — detail",
    content: [
      {
        type: "paragraph",
        text: "For too long, menswear for Indian weddings has been an afterthought — a rented sherwani, a default colour, a generic cut. The Groom's Atelier is our response to that.",
      },
      {
        type: "heading",
        text: "A New Vocabulary",
      },
      {
        type: "paragraph",
        text: "We approach menswear with the same rigour as our womenswear. Proportion, drape, structure, material — every element is considered. The sherwani is not a costume. It is a garment that deserves to be tailored, fitted, and worn with intention.",
      },
      {
        type: "paragraph",
        text: "The result is a collection that feels both rooted and modern. A bandhgala cut from Italian wool. A sherwani in raw silk with tonal gold thread. A linen kurta for the morning ceremony.",
      },
    ],
    relatedProductIds: ["p005", "p006", "p009"],
    relatedCollectionIds: ["c002"],
  },
];

export function getArticleBySlug(slug: string): JournalArticle | undefined {
  return journalArticles.find((a) => a.slug === slug);
}

export const stores: Store[] = [
  {
    id: "s001",
    slug: "pune",
    name: "UCLOTHIA Pune",
    city: "Pune",
    address: "Pune, Maharashtra, India",
    phone: "+91 20 4000 5000",
    email: "pune@uclothia.com",
    hours: "Monday — Saturday: 11am — 8pm | Sunday: By appointment",
    appointmentUrl: "/private-client?store=pune",
  },
];

export function getStoreBySlug(slug: string): Store | undefined {
  return stores.find((s) => s.slug === slug);
}
