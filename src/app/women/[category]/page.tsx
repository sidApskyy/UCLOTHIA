import type { Metadata } from "next";
import { products } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/product-grid";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

const VALID_CATEGORIES = ["sarees", "lehengas", "gowns", "suits", "kurtas", "kurta-sets", "jewellery"];

export function generateStaticParams() {
  return VALID_CATEGORIES.map((category) => ({ category }));
}

export function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  return params.then(({ category }) => {
    const label = category.replace(/-/g, " ");
    return {
      title: `Women — ${label.charAt(0).toUpperCase() + label.slice(1)}`,
      description: `UCLOTHIA Women — ${label} for every occasion.`,
      alternates: { canonical: `/women/${category}` },
    };
  });
}

export default async function WomenCategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;

  const categoryMap: Record<string, string> = {
    kurtas: "kurta-sets",
  };
  const actualCategory = categoryMap[category] || category;

  const filtered = products.filter(
    (p) => p.gender === "women" && p.category === actualCategory
  );

  const label = category.replace(/-/g, " ");

  return (
    <>
      <div className="container-luxury pt-24 md:pt-32 pb-4">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Women", href: "/women" }, { label: label.charAt(0).toUpperCase() + label.slice(1) }]} />
      </div>
      <ProductGrid
        products={filtered}
        title={label.charAt(0).toUpperCase() + label.slice(1)}
        eyebrow="Women"
      />
    </>
  );
}
