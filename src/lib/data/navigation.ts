import type { NavItem } from "@/lib/types";

export const navigation: NavItem[] = [
  {
    label: "Women",
    href: "/women",
    megaMenu: {
      columns: [
        {
          title: "Ready-to-Wear",
          links: [
            { label: "All Women", href: "/women" },
            { label: "Sarees", href: "/women/sarees" },
            { label: "Lehengas", href: "/women/lehengas" },
            { label: "Gowns", href: "/women/gowns" },
            { label: "Suits & Sets", href: "/women/suits" },
            { label: "Kurtas", href: "/women/kurtas" },
          ],
        },
        {
          title: "Occasion",
          links: [
            { label: "Bridal", href: "/women?occasion=bridal" },
            { label: "Reception", href: "/women?occasion=reception" },
            { label: "Festive", href: "/women?occasion=festive" },
            { label: "Cocktail", href: "/women?occasion=cocktail" },
            { label: "Daywear", href: "/women?occasion=daywear" },
          ],
        },
        {
          title: "Accessories",
          links: [
            { label: "Jewellery", href: "/accessories/jewellery" },
            { label: "Bags", href: "/accessories/bags" },
            { label: "Footwear", href: "/accessories/footwear" },
            { label: "Stoles & Dupattas", href: "/accessories/stoles" },
          ],
        },
      ],
      featured: {
        title: "The Evening Edit",
        href: "/collections/evening-edit",
        image: "/whatsapp-image-1.jpeg",
        imageAlt: "The Evening Edit collection",
      },
    },
  },
  {
    label: "Men",
    href: "/men",
    megaMenu: {
      columns: [
        {
          title: "Ready-to-Wear",
          links: [
            { label: "All Men", href: "/men" },
            { label: "Sherwanis", href: "/men/sherwanis" },
            { label: "Kurta Sets", href: "/men/kurta-sets" },
            { label: "Suits", href: "/men/suits" },
            { label: "Bandhgalas", href: "/men/bandhgalas" },
          ],
        },
        {
          title: "Occasion",
          links: [
            { label: "Groom", href: "/men?occasion=groom" },
            { label: "Reception", href: "/women?occasion=reception" },
            { label: "Festive", href: "/men?occasion=festive" },
            { label: "Sangeet", href: "/men?occasion=sangeet" },
          ],
        },
        {
          title: "Accessories",
          links: [
            { label: "Stoles", href: "/accessories/men-stoles" },
            { label: "Footwear", href: "/accessories/men-footwear" },
            { label: "Brooches", href: "/accessories/brooches" },
          ],
        },
      ],
      featured: {
        title: "The Groom's Atelier",
        href: "/collections/grooms-atelier",
        image: "/male-single-potrait.jpeg",
        imageAlt: "The Groom's Atelier collection",
      },
    },
  },
  {
    label: "Collections",
    href: "/collections",
    megaMenu: {
      columns: [
        {
          title: "Current",
          links: [
            { label: "All Collections", href: "/collections" },
            { label: "Evening Edit", href: "/collections/evening-edit" },
            { label: "The Groom's Atelier", href: "/collections/grooms-atelier" },
            { label: "Heritage Revival", href: "/collections/heritage-revival" },
          ],
        },
        {
          title: "Explore",
          links: [
            { label: "Lookbook", href: "/lookbook" },
            { label: "Journal", href: "/journal" },
            { label: "The House", href: "/house" },
          ],
        },
      ],
      featured: {
        title: "Heritage Revival",
        href: "/collections/heritage-revival",
        image: "/women-single-potrait.jpeg",
        imageAlt: "Heritage Revival collection",
      },
    },
  },
  {
    label: "Weddings",
    href: "/weddings",
  },
  {
    label: "Accessories",
    href: "/accessories",
  },
];

export const utilityNav = [
  { label: "Search", href: "/search", icon: "search" },
  { label: "Wishlist", href: "/wishlist", icon: "heart" },
  { label: "Bag", href: "/cart", icon: "bag" },
];

export const footerNav = {
  shop: [
    { label: "New Arrivals", href: "/new" },
    { label: "Women", href: "/women" },
    { label: "Men", href: "/men" },
    { label: "Accessories", href: "/accessories" },
    { label: "Collections", href: "/collections" },
    { label: "Lookbook", href: "/lookbook" },
  ],
  house: [
    { label: "Our Story", href: "/house" },
    { label: "Journal", href: "/journal" },
    { label: "Weddings", href: "/weddings" },
  ],
  service: [
    { label: "Private Client", href: "/private-client" },
    { label: "Bespoke", href: "/private-client#bespoke" },
    { label: "Stores", href: "/stores" },
    { label: "Wedding Consultation", href: "/weddings#consultation" },
  ],
  care: [
    { label: "Shopping Bag", href: "/cart" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Search", href: "/search" },
    { label: "Contact", href: "/stores" },
  ],
};
