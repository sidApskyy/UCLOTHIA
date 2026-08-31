export type Availability = "READY TO SHIP" | "MADE TO ORDER" | "PRE-ORDER" | "BESPOKE";

export type Gender = "women" | "men" | "unisex";

export interface ProductImage {
  src: string;
  alt: string;
  type: "editorial" | "front" | "back" | "detail" | "texture" | "construction";
}

export interface ProductVariant {
  size: string;
  color: string;
  colorHex: string;
  inStock: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  category: string;
  gender: Gender;
  collection?: string;
  availability: Availability;
  description: string;
  material: string;
  craft: string;
  fit: string;
  shipping: string;
  returns: string;
  images: ProductImage[];
  variants: ProductVariant[];
  occasion?: string[];
  featured?: boolean;
  newArrival?: boolean;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  season: string;
  concept: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  campaignImages: { src: string; alt: string }[];
  craftDetails?: { title: string; description: string; image: string; imageAlt: string }[];
  productIds: string[];
}

export interface Look {
  id: string;
  slug: string;
  name: string;
  collection: string;
  image: string;
  imageAlt: string;
  productIds: string[];
}

export interface JournalArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  heroImage: string;
  heroImageAlt: string;
  content: { type: "paragraph" | "heading" | "image" | "quote"; text?: string; src?: string; alt?: string }[];
  relatedProductIds?: string[];
  relatedCollectionIds?: string[];
}

export interface Store {
  id: string;
  slug: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  image?: string;
  imageAlt?: string;
  appointmentUrl: string;
}

export interface NavItem {
  label: string;
  href: string;
  megaMenu?: {
    columns: {
      title: string;
      links: { label: string; href: string }[];
    }[];
    featured?: {
      title: string;
      href: string;
      image: string;
      imageAlt: string;
    };
  };
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export type OrderStatus =
  | "PENDING"
  | "PAYMENT_PENDING"
  | "PAID"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "REFUNDED";

export type PaymentStatus =
  | "NONE"
  | "INITIATED"
  | "SUCCESS"
  | "FAILED"
  | "REFUNDED";

export interface OrderItem {
  productId: string;
  name: string;
  size: string;
  color: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  reference: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: OrderItem[];
  couponCode?: string;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: string;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  paymentProviderRef?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CheckoutPayload {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  items: {
    productId: string;
    size: string;
    color: string;
    quantity: number;
  }[];
  couponCode?: string;
}
