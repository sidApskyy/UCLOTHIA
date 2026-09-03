import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getProductsByGender } from "@/lib/data/products";
import { WomenCollection } from "@/components/women/women-collection";
import { Reveal } from "@/components/motion/reveal";
import { LineDraw } from "@/components/motion/line-draw";
import { ParallaxImage } from "@/components/motion/parallax-image";

export const metadata: Metadata = {
  title: "Women — Couture, Ready-to-Wear & Craftsmanship",
  description:
    "UCLOTHIA Women — sarees, lehengas, gowns, suits, and couture for every occasion. Heritage Indian craftsmanship meets contemporary editorial vision.",
  alternates: { canonical: "/women" },
};

const categories = [
  { label: "Sarees", href: "/women/sarees", desc: "Handwoven silks & organza", img: "/women-single-potrait.jpeg", hoverImg: "/whatsapp-image-1.jpeg" },
  { label: "Lehengas", href: "/women/lehengas", desc: "Bridal & celebration", img: "/f1.jpeg", hoverImg: "/whatsapp-image-1.jpeg" },
  { label: "Gowns", href: "/women/gowns", desc: "Architectural eveningwear", img: "/women-single-potrait-2.jpeg", hoverImg: "/whatsapp-image-2.jpeg" },
  { label: "Suits & Sets", href: "/women/suits", desc: "Refined daywear", img: "/mf-1.jpeg", hoverImg: "/f2.jpeg" },
  { label: "Kurtas", href: "/women/kurtas", desc: "Effortless elegance", img: "/f2.jpeg", hoverImg: "/women-single-potrait.jpeg" },
  { label: "Jewellery", href: "/accessories/jewellery", desc: "Handcrafted finishing", img: "/mf-2.jpeg", hoverImg: "/f1.jpeg" },
];

export default function WomenPage() {
  const products = getProductsByGender("women");
  const featured = products.find((p) => p.featured && p.category === "lehengas") || products.find((p) => p.featured);

  return (
    <>
      {/* — Editorial Hero Banner with Parallax — */}
      <section className="relative h-[70vh] md:h-[90vh] w-full overflow-hidden">
        <ParallaxImage
          src="/whatsapp-image-1.jpeg"
          alt="UCLOTHIA Women — Campaign"
          priority
          sizes="100vw"
          objectPosition="center 30%"
          speed={0.25}
          className="ken-burns-intro"
        />
        {/* Layered gradients for depth + text legibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />

        {/* Hero text — centered with refined stagger */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-[3]">
          <div className="container-luxury">
            <div className="opacity-0 animate-[fade-in-up_800ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
              <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] md:text-[0.75rem] uppercase tracking-[0.3em] font-medium text-white/70">
                  Autumn Winter 2026
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              Women
            </h1>
            <p className="mt-8 md:mt-10 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-xl mx-auto leading-[1.7] font-light opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
              Couture, ready-to-wear, and made-to-order pieces where heritage Indian craftsmanship meets contemporary editorial vision.
            </p>
            <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fade-in_800ms_cubic-bezier(0.16,1,0.3,1)_600ms_forwards]">
              <Link
                href="#collection"
                className="inline-flex items-center gap-3 px-8 py-4 border border-white/25 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white hover:bg-white hover:text-[var(--color-text)] transition-all duration-500 group"
              >
                Explore Collection
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
              <Link
                href="/lookbook"
                className="inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white/70 hover:text-white transition-colors duration-300"
              >
                View Lookbook
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator — bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2">
          <span className="text-[0.625rem] uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <span className="w-px h-12 bg-white/20 scroll-indicator" />
        </div>
      </section>

      {/* — Editorial Quote Band — */}
      <section className="py-20 md:py-36 overflow-hidden bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl text-center">
          <Reveal variant="fade">
            {/* Decorative quotation mark */}
            <span className="block font-display text-7xl md:text-8xl leading-none text-[var(--color-accent)]/30 mb-4 select-none">“</span>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light italic leading-[1.3] tracking-[-0.01em] text-[var(--color-text)]">
              Every piece is a conversation between the artisan&rsquo;s hand and the wearer&rsquo;s silhouette.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-muted)]">
                The UCLOTHIA Atelier
              </p>
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* — Featured Editorial Highlight — */}
      {featured && (
        <section id="collection" className="py-20 md:py-36 bg-[var(--color-surface-alt)]">
          <div className="container-luxury">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
              {/* Image — cleaner overlay, no duplicate product name */}
              <Reveal variant="mask-sweep" className="md:col-span-7 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl group shadow-2xl shadow-black/5">
                <Link href={`/products/${featured.slug}`}>
                  <Image
                    src={featured.images[0].src}
                    alt={featured.images[0].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl pointer-events-none" />
                  {/* Gold hairline border trace */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                  {/* Index number — top left */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 z-10">
                    <span className="text-[0.6875rem] font-medium tracking-[0.25em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)]">
                      01
                    </span>
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-10" />
                  </div>
                  {/* "Featured" label — bottom left, minimal */}
                  <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8 z-10">
                    <p className="text-[0.625rem] uppercase tracking-[0.35em] font-medium text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      Featured
                    </p>
                  </div>
                </Link>
              </Reveal>

              {/* Text — editorial layout with improved hierarchy */}
              <Reveal variant="fade-up" delay={200} className="md:col-span-5 md:pl-4 lg:pl-12">
                {/* Availability badge */}
                <div className="flex items-center gap-3 mb-8">
                  <LineDraw width="2rem" />
                  <p className="text-[0.625rem] uppercase tracking-[0.35em] font-medium text-[var(--color-accent)]">
                    {featured.availability}
                  </p>
                </div>

                {/* Section heading */}
                <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.15] tracking-[-0.02em] mb-6">
                  The Art of <span className="italic text-[var(--color-muted)]">Couture</span>
                </h2>

                {/* Product name — the actual piece */}
                <p className="font-display text-xl md:text-2xl text-[var(--color-text)] font-light leading-[1.3] mb-8">
                  {featured.name}
                </p>

                {/* Description */}
                <p className="text-[0.9375rem] md:text-[1rem] text-[var(--color-text-secondary)] mb-10 max-w-md leading-[1.75] font-light">
                  {featured.description}
                </p>

                {/* Details */}
                <dl className="space-y-4 mb-10 border-t border-[var(--color-border)] pt-6">
                  <div className="flex gap-4 items-baseline">
                    <dt className="text-[0.625rem] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)] w-24 shrink-0">Material</dt>
                    <dd className="text-[0.8125rem] text-[var(--color-text-secondary)] leading-relaxed">{featured.material}</dd>
                  </div>
                  <div className="flex gap-4 items-baseline">
                    <dt className="text-[0.625rem] uppercase tracking-[0.2em] font-medium text-[var(--color-muted)] w-24 shrink-0">Craft</dt>
                    <dd className="text-[0.8125rem] text-[var(--color-text-secondary)] leading-relaxed">{featured.craft}</dd>
                  </div>
                </dl>

                {/* CTA */}
                <Link
                  href={`/products/${featured.slug}`}
                  className="editorial-link text-[var(--color-text)]"
                >
                  Discover the Piece
                  <span className="editorial-link-arrow">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      )}


      {/* — Category Cards — */}
      <section className="py-20 md:py-32">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-14 md:mb-20">
            <p className="text-eyebrow-accent mb-4">Explore by Category</p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6">
              The <span className="italic text-[var(--color-muted)]">Wardrobe</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {categories.map((cat, i) => (
              <Reveal key={cat.href} variant="mask-sweep" delay={i * 80}>
                <Link
                  href={cat.href}
                  className="group relative aspect-[3/4] overflow-hidden bg-[var(--color-surface)] rounded-xl md:rounded-2xl block"
                >
                  {/* Primary image */}
                  <Image
                    src={cat.img}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover object-[center_30%] transition-all duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-108 group-hover:opacity-0"
                  />
                  {/* Hover image — crossfade swap */}
                  <Image
                    src={cat.hoverImg}
                    alt={`${cat.label} alternate`}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover object-[center_30%] opacity-0 scale-105 transition-all duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:opacity-100 group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-700 group-hover:from-black/85 rounded-xl md:rounded-2xl pointer-events-none" />
                  {/* Gold hairline border trace */}
                  <div className="absolute inset-0 rounded-xl md:rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                  {/* Index number */}
                  <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-3 z-10">
                    <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8 text-center z-10">
                    <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight mb-1 md:mb-2 transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1">
                      {cat.label}
                    </h3>
                    <p className="text-[0.625rem] md:text-[0.6875rem] uppercase tracking-[0.2em] text-white/50 transition-colors duration-500 group-hover:text-white/80">
                      {cat.desc}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-4 text-[0.625rem] font-medium tracking-[0.25em] uppercase text-white/0 group-hover:text-white/70 transition-all duration-500">
                      Explore
                      <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Full Product Collection with In-Page Filtering — */}
      <WomenCollection products={products} />
    </>
  );
}
