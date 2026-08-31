import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { LookbookScroll } from "@/components/lookbook/lookbook-scroll";
import { collections, looks, stores } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "UCLOTHIA — Couture, Ready-to-Wear & Craftsmanship",
  description:
    "A modern luxury fashion house where heritage Indian craftsmanship meets contemporary editorial vision. Couture, ready-to-wear, and made-to-order pieces for the modern wardrobe.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "UCLOTHIA — Couture, Ready-to-Wear & Craftsmanship",
    description:
      "A modern luxury fashion house where heritage Indian craftsmanship meets contemporary editorial vision.",
    images: [{ url: "/whatsapp-image-1.jpeg", alt: "UCLOTHIA Campaign" }],
    type: "website",
  },
};

export default function Home() {
  const heroCollection = collections[0];
  const editorialCollection = collections[2];
  const featuredLooks = looks.slice(0, 5);

  return (
    <>
      {/* 01 — HERO — CINEMATIC */}
      <Hero
        images={[
          { src: "/og-campaign.jpg", alt: "UCLOTHIA — Campaign" },
          { src: "/hero-image-2.png", alt: "UCLOTHIA — Editorial" },
          { src: "/hero-image-3.png", alt: "UCLOTHIA — Atelier" },
        ]}
        label={heroCollection.season}
        title={heroCollection.name}
      />
      {/* 02 — BRAND MANIFESTO — MINIMAL */}
      <section className="min-h-[55vh] flex items-center justify-center py-32 md:py-48">
        <div className="container-luxury text-center">
          <Reveal variant="fade">
            <p
              className="mb-14 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "1.125rem", color: "var(--color-accent)" }}
            >
              The House of UCLOTHIA
            </p>
            <h2 className="text-statement text-[var(--color-text)] max-w-2xl mx-auto">
              Where modern silhouettes meet
              <span className="block italic text-[var(--color-muted)]">
                the enduring language of craft.
              </span>
            </h2>
          </Reveal>
        </div>
      </section>

      {/* 03 — FEATURED COLLECTION — EDITORIAL SPLIT */}
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            {/* Media — left, larger */}
            <Reveal className="md:col-span-7 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden" delay={100}>
              <Link href={`/collections/${editorialCollection.slug}`}>
                <video
                  src="/potrait-video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/women-single-potrait-2.jpeg"
                  aria-label="UCLOTHIA Heritage Revival collection campaign video"
                  className="w-full h-full object-cover"
                >
                  <track kind="descriptions" srcLang="en" label="Collection campaign video" />
                </video>
              </Link>
            </Reveal>
            {/* Text — right, in negative space */}
            <Reveal className="md:col-span-5 md:pl-8 lg:pl-12" delay={200}>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-px w-10 bg-[var(--color-accent)]" />
                <p className="text-eyebrow-accent">{editorialCollection.season}</p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.02] tracking-[-0.02em] mb-8">
                {editorialCollection.name}
              </h2>
              <p className="text-body-lg mb-10 max-w-md leading-relaxed">
                {editorialCollection.description}
              </p>
              <Link
                href={`/collections/${editorialCollection.slug}`}
                className="editorial-link text-[var(--color-accent-dark)]"
              >
                Explore Collection
                <span className="editorial-link-arrow text-[var(--color-accent)]">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 04 — EDITORIAL CARDS — CINEMATIC COLLECTIONS */}
      <section className="py-10 md:py-20">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <p
              className="mb-6 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}
            >
              The Collections
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-6">
              Where dreams are draped in couture
              <span className="block italic text-[var(--color-muted)]">and stars become muse.</span>
            </h2>
            <span className="inline-block h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection, i) => (
              <Reveal key={collection.id} delay={i * 150} variant="fade-up">
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] md:shadow-none md:hover:shadow-2xl md:hover:shadow-black/30 md:hover:-translate-y-2"
                >
                  <Image
                    src={collection.heroImage}
                    alt={collection.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-110"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5 transition-all duration-[var(--duration-medium)] group-hover:from-black/90 rounded-2xl" />

                  {/* Index number — top left with decorative line */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]">
                    <span className="text-[0.625rem] font-medium tracking-[0.2em] text-white/40 transition-colors duration-[var(--duration-medium)] group-hover:text-white/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-white/40 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-8" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-7 md:p-8 lg:p-10">
                    <div className="transition-transform duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:-translate-y-2">
                      <p className="text-[0.625rem] uppercase tracking-[0.3em] text-white/50 mb-4 transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:text-white/80">
                        {collection.season}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white font-light leading-[1.05] tracking-[-0.01em]">
                        {collection.name}
                      </h3>
                    </div>
                    <span className="h-px w-16 bg-white/10 my-6 transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:bg-white/25 group-hover:w-24" />
                    <span className="inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white/50 group-hover:text-white transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]">
                      Explore
                      <span className="h-px w-6 bg-white/30 transition-all duration-[var(--duration-medium)] group-hover:w-10 group-hover:bg-white/70" />
                      <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 05 — CRAFT / DETAILS — MACRO DETAIL */}
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <p
              className="mb-6 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}
            >
              The Details
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-6">
              Hand-finished.
              <span className="block italic text-[var(--color-muted)]">Every element considered.</span>
            </h2>
            <span className="inline-block h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {(editorialCollection.craftDetails || []).map((craft, i) => (
              <Reveal key={craft.title} delay={i * 150} variant="fade-up">
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6">
                    <Image
                      src={craft.image}
                      alt={craft.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:from-black/80 rounded-2xl" />

                    {/* Top accent line on hover */}
                    <span className="absolute top-0 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-full rounded-2xl" />

                    {/* Number — top left */}
                    <div className="absolute top-5 left-5 flex items-center gap-3">
                      <span className="text-[0.625rem] font-medium tracking-[0.2em] text-white/50 transition-colors duration-[var(--duration-medium)] group-hover:text-white/80">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-0 bg-white/40 transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-6" />
                    </div>

                    {/* Overlay content — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
                      <div className="transition-transform duration-[var(--duration-medium)] ease-[var(--ease-out)] group-hover:-translate-y-1">
                        <p className="text-[0.625rem] uppercase tracking-[0.25em] text-white/60 mb-3 transition-colors duration-[var(--duration-medium)] group-hover:text-white/90">
                          {craft.title}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl text-white font-light leading-[1.1] mb-3">
                          {craft.description}
                        </h3>
                      </div>
                      <span className="h-px w-12 bg-white/20 transition-all duration-[var(--duration-medium)] group-hover:w-20 group-hover:bg-white/40" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 06 — LOOKBOOK — HORIZONTAL EDITORIAL */}
      <section className="py-20 md:py-32 overflow-hidden">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <p
              className="mb-6 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}
            >
              Lookbook
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-6">
              The Looks
            </h2>
            <span className="inline-block h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>
        </div>
        <LookbookScroll looks={featuredLooks} />
        <div className="container-luxury mt-14 md:mt-20 flex flex-col items-center gap-6">
          <Link
            href="/lookbook"
            className="inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group"
          >
            <span className="h-px w-8 bg-[var(--color-border-strong)] transition-all duration-[var(--duration-medium)] group-hover:w-12" />
            View All Looks
            <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
          </Link>
          <div className="md:hidden">
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)] flex items-center gap-2">
              <span>Swipe</span>
              <svg width="16" height="8" viewBox="0 0 16 8" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M0 4h14M10 1l4 3-4 3" />
              </svg>
            </p>
          </div>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 07 — WEDDINGS — CINEMATIC */}
      <section className="relative h-[85vh] md:h-screen w-full overflow-hidden">
        <Image
          src="/mf-1.jpeg"
          alt="UCLOTHIA Wedding Atelier campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />

        <div className="absolute inset-0 flex items-end">
          <div className="w-full pb-16 md:pb-24 lg:pb-32">
            <div className="container-luxury">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <span className="h-px w-10 bg-white/50" />
                  <p className="text-[0.75rem] uppercase tracking-[0.25em] font-medium text-white/70">
                    Weddings
                  </p>
                </div>
                <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] tracking-[-0.02em] mb-10">
                  The Wedding Atelier
                </h2>

                <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:divide-x sm:divide-white/15 mb-12">
                  {[
                    { label: "Bridal", href: "/weddings" },
                    { label: "Groom", href: "/weddings" },
                    { label: "Occasion", href: "/weddings" },
                  ].map((category) => (
                    <Link
                      key={category.label}
                      href={category.href}
                      className="group inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white/70 hover:text-white transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] sm:px-8 first:sm:pl-0"
                    >
                      <span className="h-px w-6 bg-white/30 transition-all duration-[var(--duration-medium)] group-hover:w-10 group-hover:bg-white/70" />
                      {category.label}
                    </Link>
                  ))}
                </div>

                <Link
                  href="/weddings"
                  className="inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white hover:text-white transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group"
                >
                  <span className="h-px w-8 bg-white/50 transition-all duration-[var(--duration-medium)] group-hover:w-12 group-hover:bg-white" />
                  Discover Weddings
                  <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 08 — THE HOUSE — STORYTELLING */}
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury">
          {/* Section header */}
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <p
              className="mb-6 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}
            >
              The House
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-6">
              A house built on craft, restraint,
              <span className="block italic text-[var(--color-muted)]">and the belief that garments carry meaning.</span>
            </h2>
            <span className="inline-block h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">
            {/* Left — Editorial image */}
            <Reveal className="md:col-span-5" delay={100}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group">
                <Image
                  src="/women-single-potrait-2.jpeg"
                  alt="UCLOTHIA artisan at work"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <p className="text-[0.625rem] uppercase tracking-[0.25em] text-white/60 mb-2">
                    Est. 2024
                  </p>
                  <p className="font-display text-xl md:text-2xl text-white font-light leading-tight">
                    Crafted in India
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right — Story + Pillars */}
            <Reveal className="md:col-span-7" delay={200}>
              <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.8] mb-12 max-w-xl">
                UCLOTHIA exists at the intersection of heritage and modernity. We work with
                master artisans across India, preserving techniques that have been refined
                over centuries — and presenting them through a contemporary editorial lens.
              </p>

              <div className="space-y-0">
                {[
                  { num: "01", title: "Our Story", desc: "A modern fashion house rooted in Indian craft traditions, reimagining heritage for the contemporary wardrobe." },
                  { num: "02", title: "Craft", desc: "Master artisans, heritage techniques, and contemporary execution — every piece hand-finished with precision." },
                  { num: "03", title: "Philosophy", desc: "Restraint, precision, and the quiet confidence of considered design in every collection." },
                ].map((pillar, i) => (
                  <div
                    key={pillar.num}
                    className="group border-t border-[var(--color-border-strong)] py-8 transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] hover:border-[var(--color-accent)]"
                  >
                    <div className="flex items-start gap-6">
                      <span className="text-[0.625rem] font-medium tracking-[0.2em] text-[var(--color-muted)] pt-1.5 transition-colors duration-[var(--duration-medium)] group-hover:text-[var(--color-accent)]">
                        {pillar.num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="font-display text-xl md:text-2xl font-light leading-[1.1]">{pillar.title}</h3>
                          <span className="h-px flex-1 bg-[var(--color-border)] transition-all duration-[var(--duration-medium)] group-hover:bg-[var(--color-accent)]" />
                        </div>
                        <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.7] max-w-md">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/house"
                className="inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group mt-10"
              >
                <span className="h-px w-8 bg-[var(--color-border-strong)] transition-all duration-[var(--duration-medium)] group-hover:w-12" />
                Discover the House
                <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 09 — PRIVATE CLIENT — EXCLUSIVITY */}
      <section className="py-32 md:py-48 bg-[var(--color-text)] text-[var(--color-background)]">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <p
              className="mb-6 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}
            >
              Private Client
            </p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-6 max-w-2xl mx-auto">
              A personal atelier experience,
              <span className="block italic text-white/50">tailored entirely to you.</span>
            </h2>
            <span className="inline-block h-px w-16 bg-white/20" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-px md:bg-white/10 max-w-4xl mx-auto mb-16 md:mb-20 rounded-2xl md:rounded-none overflow-hidden">
            {[
              { num: "01", title: "Private Appointments", desc: "Dedicated one-on-one sessions with our atelier team, at your convenience." },
              { num: "02", title: "Personal Styling", desc: "Curated wardrobe consultation — from everyday elegance to occasion dressing." },
              { num: "03", title: "Bespoke Commissions", desc: "Made-to-measure pieces crafted to your exact specifications and vision." },
            ].map((service, i) => (
              <Reveal key={service.title} delay={i * 150} variant="fade-up">
                <div className="group bg-[var(--color-text)] p-8 md:p-10 flex flex-col h-full transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] hover:bg-white/[0.03] md:rounded-none rounded-2xl md:hover:-translate-y-2 relative overflow-hidden">
                  {/* Top accent line — slides in on hover */}
                  <span className="absolute top-0 left-0 h-px w-0 bg-[var(--color-accent)] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] group-hover:w-full" />

                  {/* Number */}
                  <span className="font-display text-3xl md:text-4xl font-light text-white/10 mb-6 transition-colors duration-[var(--duration-medium)] group-hover:text-white/20">
                    {service.num}
                  </span>

                  {/* Title with decorative line */}
                  <div className="flex items-center gap-3 mb-5">
                    <span className="h-px w-6 bg-white/20 transition-all duration-[var(--duration-medium)] group-hover:w-10 group-hover:bg-white/50" />
                    <span className="text-[0.625rem] uppercase tracking-[0.2em] text-white/40 transition-colors duration-[var(--duration-medium)] group-hover:text-white/70">
                      {service.title}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[0.875rem] text-white/60 leading-[1.7] flex-1">
                    {service.desc}
                  </p>

                  {/* Bottom arrow — appears on hover */}
                  <span className="inline-flex items-center gap-2 mt-6 text-[0.625rem] uppercase tracking-[0.2em] text-white/0 group-hover:text-white/60 transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]">
                    Learn More
                    <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal variant="fade" delay={200}>
            <div className="text-center">
              <p className="text-[0.9375rem] md:text-[1.0625rem] text-white/70 leading-relaxed mb-10 max-w-lg mx-auto">
                Wedding consultations and private viewings available by appointment.
              </p>
              <Link
                href="/private-client"
                className="inline-flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white/70 hover:text-white transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] group"
              >
                <span className="h-px w-8 bg-white/40 transition-all duration-[var(--duration-medium)] group-hover:w-12 group-hover:bg-white" />
                Book an Appointment
                <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-28 md:h-40" />

      {/* 10 — STORES — QUIET EDITORIAL */}
      <section className="py-24 md:py-32">
        <div className="container-luxury">
          <Reveal variant="fade" className="mb-14 md:mb-16">
            <div className="flex items-center gap-4 mb-4">
              <span className="h-px w-12 bg-[var(--color-border-strong)]" />
              <p className="text-eyebrow-accent">Visit Us</p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-light">
              Our Stores
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-10">
            {stores.map((store, i) => (
              <Reveal key={store.id} delay={i * 100}>
                <Link href={`/stores/${store.slug}`} className="group block border-t border-[var(--color-border)] pt-8 md:pt-10">
                  <p className="text-micro mb-4">{String(i + 1).padStart(2, "0")} — India</p>
                  <h3 className="font-display text-2xl md:text-3xl font-light mb-6">
                    {store.city}
                  </h3>
                  <p className="text-body text-[0.8125rem] mb-3 max-w-xs">{store.address}</p>
                  <p className="text-meta text-[var(--color-muted)] mb-6">{store.hours}</p>
                  <span className="inline-flex items-center gap-2 text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors">
                    Book Appointment
                    <span className="transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
