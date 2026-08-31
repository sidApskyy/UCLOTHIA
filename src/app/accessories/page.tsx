import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";

export const metadata: Metadata = {
  title: "Accessories",
  description: "UCLOTHIA Accessories — jewellery, bags, footwear, and stoles.",
  alternates: { canonical: "/accessories" },
};

export default function AccessoriesPage() {
  const accessories = products.filter(
    (p) =>
      p.category === "jewellery" ||
      p.category === "stoles" ||
      p.category === "bags" ||
      p.category === "footwear"
  );
  return <ProductGrid products={accessories} title="Accessories" eyebrow="Finishing Pieces" />;
}
