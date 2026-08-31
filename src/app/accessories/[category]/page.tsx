import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";

const ACCESSORY_CATEGORIES = ["jewellery", "stoles", "bags", "footwear", "men-stoles", "men-footwear", "brooches"];

export function generateStaticParams() {
  return ACCESSORY_CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  return params.then(({ category }) => {
    const label = category.replace(/-/g, " ");
    return {
      title: `Accessories — ${label.charAt(0).toUpperCase() + label.slice(1)}`,
      description: `UCLOTHIA Accessories — ${label}.`,
      alternates: { canonical: `/accessories/${category}` },
    };
  });
}

export default async function AccessoriesCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const categoryMap: Record<string, string[]> = {
    "men-stoles": ["stoles"],
    "men-footwear": ["footwear"],
  };
  const categories = categoryMap[category] || [category];

  const filtered = products.filter((p) => categories.includes(p.category));

  const label = category.replace(/-/g, " ");

  return (
    <ProductGrid
      products={filtered}
      title={label.charAt(0).toUpperCase() + label.slice(1)}
      eyebrow="Accessories"
    />
  );
}
