import type { Metadata } from "next";
import Image from "next/image";
import { collections, getCollectionBySlug } from "@/lib/data/content";
import { getProductsByCollection } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return collections.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) return { title: "Collection Not Found" };

  return {
    title: collection.name,
    description: collection.concept,
    alternates: { canonical: `/collections/${collection.slug}` },
    openGraph: {
      title: `${collection.name} — UCLOTHIA`,
      description: collection.concept,
      images: [{ url: collection.heroImage, alt: collection.heroImageAlt }],
    },
  };
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);
  if (!collection) notFound();

  const products = getProductsByCollection(slug);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://uclothia.com" },
      { "@type": "ListItem", position: 2, name: "Collections", item: "https://uclothia.com/collections" },
      { "@type": "ListItem", position: 3, name: collection.name, item: `https://uclothia.com/collections/${collection.slug}` },
    ],
  };

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Campaign Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src={collection.heroImage}
          alt={collection.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/50" />
        <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24">
          <div className="container-luxury">
            <p className="text-eyebrow text-white/70 mb-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_0ms_forwards]">{collection.season}</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-white font-light leading-[1.0] tracking-[-0.02em] max-w-3xl opacity-0 animate-[fadeUp_800ms_var(--ease-out)_100ms_forwards]">
              {collection.name}
            </h1>
            <p className="mt-6 text-[0.9375rem] md:text-[1.0625rem] text-white/70 max-w-lg leading-relaxed font-light italic opacity-0 animate-[fadeUp_800ms_var(--ease-out)_200ms_forwards]">
              {collection.concept}
            </p>
          </div>
        </div>
      </section>

      {/* Collection Intro — asymmetric */}
      <section className="py-24 md:py-40">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <Reveal className="md:col-span-4">
              <p className="text-eyebrow-accent mb-4">The Concept</p>
            </Reveal>
            <Reveal className="md:col-span-8" delay={100}>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] text-[var(--color-text)]">
                {collection.concept}
              </p>
              <p className="text-body-lg mt-10 max-w-2xl">
                {collection.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Campaign Images — staggered editorial */}
      <section className="pb-24 md:pb-40">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {collection.campaignImages.map((img, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className={`relative overflow-hidden bg-[var(--color-surface-alt)] image-editorial aspect-[3/4] ${i === 1 ? "md:mt-16" : ""}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_30%]"
                  />
                </div>
                <p className="text-micro mt-4">
                  Campaign {String(i + 1).padStart(2, "0")} — {collection.name}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Craft Details */}
      {collection.craftDetails && collection.craftDetails.length > 0 && (
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury">
          <Reveal className="mb-14 md:mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-12 bg-[var(--color-border-strong)]" />
              <p className="text-eyebrow-accent">The Craft</p>
            </div>
            <h2 className="text-editorial text-[var(--color-text)]">
              Behind the Collection
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {collection.craftDetails.map((craft, i) => (
              <Reveal key={craft.title} delay={i * 120}>
                <div className="relative aspect-square overflow-hidden bg-[var(--color-surface)] image-editorial mb-6">
                  <Image
                    src={craft.image}
                    alt={craft.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-micro mb-3">
                  {String(i + 1).padStart(2, "0")} — {craft.title}
                </p>
                <h3 className="font-display text-xl md:text-2xl font-light mb-3">
                  {craft.title}
                </h3>
                <p className="text-body">{craft.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Products */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <Reveal className="flex items-end justify-between mb-14 md:mb-16 border-t border-[var(--color-border)] pt-10 md:pt-14">
            <div>
              <p className="text-eyebrow-accent mb-3">Shop the Collection</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                The Pieces
              </h2>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, i) => (
              <Reveal key={product.id} delay={i * 80}>
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
