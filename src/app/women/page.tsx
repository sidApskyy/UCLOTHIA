import type { Metadata } from "next";
import { getProductsByGender } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";

export const metadata: Metadata = {
  title: "Women",
  description: "UCLOTHIA Women — sarees, lehengas, gowns, suits, and couture for every occasion.",
  alternates: { canonical: "/women" },
};

export default function WomenPage() {
  const products = getProductsByGender("women");
  return <ProductGrid products={products} title="Women" eyebrow="Ready-to-Wear & Couture" />;
}
