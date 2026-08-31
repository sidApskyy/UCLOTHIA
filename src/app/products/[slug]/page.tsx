import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/lib/data/products";
import { ProductDetail } from "@/components/product/product-detail";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical: `/products/${product.slug}` },
    openGraph: {
      title: `${product.name} — UCLOTHIA`,
      description: product.description,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.id !== product.id && p.gender === product.gender)
    .slice(0, 4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://uclothia.com${product.images[0].src}`,
    brand: {
      "@type": "Brand",
      name: "UCLOTHIA",
    },
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: product.currency,
      availability:
        product.availability === "READY TO SHIP"
          ? "https://schema.org/InStock"
          : product.availability === "PRE-ORDER"
          ? "https://schema.org/PreOrder"
          : product.availability === "MADE TO ORDER"
          ? "https://schema.org/MadeToOrder"
          : "https://schema.org/BackOrder",
      url: `https://uclothia.com/products/${product.slug}`,
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://uclothia.com/" },
      { "@type": "ListItem", position: 2, name: product.gender, item: `https://uclothia.com/${product.gender}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `https://uclothia.com/products/${product.slug}` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Breadcrumb */}
      <div className="container-luxury pt-24 md:pt-28">
        <nav className="flex items-center gap-3 text-micro" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-[var(--color-text)] transition-colors">Home</Link>
          <span className="text-[var(--color-border-strong)]">/</span>
          <Link href={`/${product.gender}`} className="hover:text-[var(--color-text)] transition-colors capitalize">
            {product.gender}
          </Link>
          <span className="text-[var(--color-border-strong)]">/</span>
          <span className="text-[var(--color-text)] truncate">{product.name}</span>
        </nav>
      </div>

      <ProductDetail product={product} />

      {/* Related products */}
      <section className="py-24 md:py-32 mt-16 border-t border-[var(--color-border)]">
        <div className="container-luxury">
          <Reveal className="mb-14 md:mb-16">
            <p className="text-eyebrow-accent mb-3">Related</p>
            <h2 className="font-display text-3xl md:text-4xl font-light">
              More to Explore
            </h2>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {related.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
