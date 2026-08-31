import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";

const VALID_CATEGORIES = ["sherwanis", "bandhgalas", "kurta-sets", "suits"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  return params.then(({ category }) => {
    const label = category.replace(/-/g, " ");
    return {
      title: `Men — ${label.charAt(0).toUpperCase() + label.slice(1)}`,
      description: `UCLOTHIA Men — ${label} for every occasion.`,
      alternates: { canonical: `/men/${category}` },
    };
  });
}

export default async function MenCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const filtered = products.filter(
    (p) => p.gender === "men" && p.category === category
  );

  const label = category.replace(/-/g, " ");

  return (
    <ProductGrid
      products={filtered}
      title={label.charAt(0).toUpperCase() + label.slice(1)}
      eyebrow="Men"
    />
  );
}
