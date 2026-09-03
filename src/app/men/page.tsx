import type { Metadata } from "next";
import { getProductsByGender } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export const metadata: Metadata = {
  title: "Men",
  description: "UCLOTHIA Men — sherwanis, bandhgalas, kurta sets, and tailored menswear.",
  alternates: { canonical: "/men" },
};

export default function MenPage() {
  const products = getProductsByGender("men");
  return (
    <>
      <div className="container-luxury pt-24 md:pt-32 pb-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Men" }]} />
      </div>
      <ProductGrid products={products} title="Men" eyebrow="Ready-to-Wear & Couture" />
    </>
  );
}
