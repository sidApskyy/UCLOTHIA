import type { Metadata } from "next";
import { getProductsByGender } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";

export const metadata: Metadata = {
  title: "Men",
  description: "UCLOTHIA Men — sherwanis, bandhgalas, kurta sets, and tailored menswear.",
  alternates: { canonical: "/men" },
};

export default function MenPage() {
  const products = getProductsByGender("men");
  return <ProductGrid products={products} title="Men" eyebrow="Ready-to-Wear & Couture" />;
}
