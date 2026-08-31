import type { Metadata } from "next";
import { getNewArrivals } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";

export const metadata: Metadata = {
  title: "New Arrivals",
  description: "The latest pieces from UCLOTHIA — new arrivals in ready-to-wear and couture.",
  alternates: { canonical: "/new" },
};

export default function NewPage() {
  const products = getNewArrivals();
  return <ProductGrid products={products} title="New Arrivals" eyebrow="Just Arrived" />;
}
