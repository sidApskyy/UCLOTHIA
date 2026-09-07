import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { collections, getCollectionBySlug } from "@/lib/data/content";
import { getProductsByCollection } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";
import { LineDraw } from "@/components/motion/line-draw";
import { ParallaxImage } from "@/components/motion/parallax-image";
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

      {/* — Parallax Campaign Hero — */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <ParallaxImage
          src={collection.heroImage}
          alt={collection.heroImageAlt}
          priority
          sizes="100vw"
          objectPosition="center 30%"
          speed={0.25}
          className="ken-burns-intro"
        />
        {/* Layered gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/15 to-black/60 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />

        {/* Hero text — bottom aligned, staggered entrance */}
        <div className="absolute inset-0 flex items-end z-[3]">
          <div className="w-full pb-16 md:pb-24">
            <div className="container-luxury">
              <div className="opacity-0 animate-[fade-in-up_800ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-8 bg-[var(--color-accent)]" />
                  <p className="text-[0.6875rem] md:text-[0.75rem] uppercase tracking-[0.3em] font-medium text-white/70">
                    {collection.season}
                  </p>
                </div>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] max-w-4xl opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
                {collection.name}
              </h1>
              <p className="mt-6 md:mt-8 text-[0.9375rem] md:text-[1.125rem] text-white/75 max-w-xl leading-[1.7] font-light italic opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
                {collection.concept}
              </p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-[3] hidden md:flex flex-col items-center gap-2">
          <span className="text-[0.625rem] uppercase tracking-[0.3em] text-white/40 [writing-mode:vertical-rl]">Scroll</span>
          <span className="w-px h-12 bg-white/20 scroll-indicator" />
        </div>
      </section>

      {/* — Collection Concept — asymmetric editorial layout */}
      <section className="py-24 md:py-40">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <Reveal className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-[var(--color-accent)]" />
                <p className="text-eyebrow-accent">The Concept</p>
              </div>
              <LineDraw width="3rem" />
            </Reveal>
            <Reveal className="md:col-span-8" delay={100}>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] text-[var(--color-text)] mb-10">
                {collection.concept}
              </p>
              <p className="text-body-lg max-w-2xl">
                {collection.description}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Campaign Images — staggered editorial with hover effects */}
      <section className="pb-24 md:pb-40">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {collection.campaignImages.map((img, i) => (
              <Reveal key={i} variant="mask-sweep" delay={i * 100}>
                <div className={`group relative overflow-hidden bg-[var(--color-surface-alt)] image-editorial aspect-[3/4] rounded-2xl ${i === 1 ? "md:mt-16" : ""}`}>
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                  />
                  {/* Gold hairline border trace */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
                  {/* Index number */}
                  <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                    <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                  </div>
                  {/* Bottom label */}
                  <div className="absolute bottom-5 left-5 z-10">
                    <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Campaign {String(i + 1).padStart(2, "0")} — {collection.name}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Craft Details — with gold accents and hover effects */}
      {collection.craftDetails && collection.craftDetails.length > 0 && (
        <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
          <div className="container-luxury">
            <Reveal className="mb-14 md:mb-16">
              <div className="flex items-center gap-4 mb-4">
                <span className="h-px w-12 bg-[var(--color-border-strong)]" />
                <p className="text-eyebrow-accent">The Craft</p>
              </div>
              <h2 className="text-editorial text-[var(--color-text)]">
                Behind the <span className="italic text-[var(--color-muted)]">Collection</span>
              </h2>
              <LineDraw width="3rem" className="mt-6" />
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
              {collection.craftDetails.map((craft, i) => (
                <Reveal key={craft.title} variant="mask-sweep" delay={i * 120}>
                  <div className="group relative aspect-square overflow-hidden bg-[var(--color-surface)] image-editorial rounded-2xl mb-6">
                    <Image
                      src={craft.image}
                      alt={craft.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    {/* Gold hairline border trace */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                    {/* Index number */}
                    <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                      <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                    </div>
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

      {/* — Products — with luxury section header */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <Reveal className="flex items-end justify-between mb-14 md:mb-16 border-t border-[var(--color-border)] pt-10 md:pt-14">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-[var(--color-accent)]" />
                <p className="text-eyebrow-accent">Shop the Collection</p>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em]">
                The <span className="italic text-[var(--color-muted)]">Pieces</span>
              </h2>
            </div>
            <p className="text-micro pb-2">
              {products.length} {products.length === 1 ? "piece" : "pieces"}
            </p>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {products.map((product, i) => (
              <Reveal key={product.id} variant="mask-sweep" delay={i * 80}>
                <ProductCard product={product} priority={i < 2} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Back to Collections — */}
      <section className="pb-24 md:pb-32">
        <div className="container-luxury text-center">
          <Reveal variant="fade">
            <LineDraw width="3rem" className="mx-auto mb-8" />
            <Link
              href="/collections"
              className="editorial-link text-[var(--color-text)]"
            >
              ← All Collections
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
