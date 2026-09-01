import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Hero } from "@/components/hero/hero";
import { Reveal } from "@/components/motion/reveal";
import { Parallax } from "@/components/motion/parallax";
import { ScrollProgress } from "@/components/motion/scroll-progress";
import { EditorialMarquee } from "@/components/motion/editorial-marquee";
import { LookbookScroll } from "@/components/lookbook/lookbook-scroll";
import { SpecularButton } from "@/components/ui/specular-button";
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
      {/* Global Luxury Scroll Progress Hairline */}
      <ScrollProgress />

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
      <section className="relative min-h-[55vh] flex items-center justify-center py-32 md:py-48 overflow-hidden">
        {/* Subtle luxury ambient breathing glow */}
        <div className="absolute top-1/2 left-1/2 w-[35rem] h-[35rem] bg-[var(--color-accent)] rounded-full blur-3xl pointer-events-none animate-aura" />
        <div className="container-luxury text-center relative z-10">
          <Reveal variant="fade">
            <p
              className="mb-8 uppercase tracking-[0.25em] font-medium"
              style={{ fontSize: "0.75rem", color: "var(--color-accent)" }}
            >
              The House of UCLOTHIA
            </p>
          </Reveal>
          <Reveal variant="mask" delay={150}>
            <h2 className="text-statement text-[var(--color-text)] max-w-2xl mx-auto">
              Where modern silhouettes meet
              <span className="block italic text-[var(--color-muted)] mt-1">
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
            <Reveal variant="image" className="md:col-span-7 relative aspect-[4/5] md:aspect-[3/4] overflow-hidden rounded-2xl" delay={100}>
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
                <Reveal variant="line" className="h-px w-10 bg-[var(--color-accent)]" />
                <p className="text-[0.75rem] uppercase tracking-[0.25em] font-medium text-[var(--color-accent)]">{editorialCollection.season}</p>
              </div>
              <Reveal variant="mask" delay={100}>
                <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-[1.02] tracking-[-0.02em] mb-8">
                  {editorialCollection.name}
                </h2>
              </Reveal>
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

      <div className="h-24 md:h-32" />

      {/* 04 — EDITORIAL CARDS — CINEMATIC COLLECTIONS */}
      <section className="py-24 md:py-40">
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
            <Reveal variant="line" className="h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((collection, i) => (
              <Reveal key={collection.id} delay={i * 120} variant="image">
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block relative aspect-[3/4] md:aspect-[4/5] overflow-hidden rounded-2xl transition-all duration-700 ease-[var(--ease-out)] shadow-lg shadow-black/10 hover:shadow-2xl hover:shadow-black/30"
                >
                  <Image
                    src={collection.heroImage}
                    alt={collection.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover object-[center_30%] transition-all duration-1000 ease-[var(--ease-out)] group-hover:scale-108 group-hover:brightness-105"
                    priority={i === 0}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/5 transition-all duration-700 group-hover:from-black/90 rounded-2xl pointer-events-none" />

                  {/* Gold perimeter hairline trace on hover */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/60 transition-colors duration-700 pointer-events-none z-10" />

                  {/* Index number — top left with decorative line */}
                  <div className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center gap-3 transition-all duration-500 ease-[var(--ease-out)] z-10">
                    <span className="text-[0.75rem] font-medium tracking-[0.2em] text-white/50 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-10" />
                  </div>

                  <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-7 md:p-8 lg:p-10 z-10">
                    <div>
                      <p className="text-[0.75rem] uppercase tracking-[0.25em] text-white/60 mb-4 transition-all duration-500 ease-[var(--ease-out)] group-hover:text-white/90">
                        {collection.season}
                      </p>
                      <h3 className="font-display text-2xl md:text-3xl lg:text-4xl text-white font-light leading-[1.05] tracking-[-0.01em]">
                        {collection.name}
                      </h3>
                    </div>
                    <span className="h-px w-16 bg-white/15 my-6 transition-all duration-500 ease-[var(--ease-out)] group-hover:bg-[var(--color-accent)] group-hover:w-24" />
                    <span className="inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.25em] uppercase text-white/60 group-hover:text-white transition-all duration-500 ease-[var(--ease-out)]">
                      Explore
                      <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" />

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
            <Reveal variant="line" className="h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {(editorialCollection.craftDetails || []).map((craft, i) => (
              <Reveal key={craft.title} delay={i * 120} variant="image">
                <div className="group cursor-pointer">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-2xl mb-6 shadow-md shadow-black/5 hover:shadow-xl hover:shadow-black/20 transition-shadow duration-700">
                    <Image
                      src={craft.image}
                      alt={craft.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover object-[center_30%] transition-all duration-1000 ease-[var(--ease-out)] group-hover:scale-108 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent transition-all duration-700 ease-[var(--ease-out)] group-hover:from-black/85 rounded-2xl pointer-events-none" />

                    {/* Gold hairline border trace */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/60 transition-colors duration-700 pointer-events-none z-10" />

                    {/* Number — top left */}
                    <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                      <span className="text-[0.75rem] font-medium tracking-[0.2em] text-white/60 transition-all duration-500 group-hover:text-[var(--color-accent)]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                    </div>

                    {/* Overlay content — bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7 z-10">
                      <div>
                        <p className="text-[0.75rem] uppercase tracking-[0.25em] text-white/60 mb-3 transition-colors duration-500 group-hover:text-white/90">
                          {craft.title}
                        </p>
                        <h3 className="font-display text-xl md:text-2xl text-white font-light leading-[1.1] mb-3">
                          {craft.description}
                        </h3>
                      </div>
                      <span className="h-px w-12 bg-white/20 transition-all duration-500 group-hover:w-20 group-hover:bg-[var(--color-accent)]" />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" />

      {/* 06 — LOOKBOOK — HORIZONTAL EDITORIAL */}
      <section className="py-24 md:py-40 overflow-hidden">
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
            <Reveal variant="line" className="h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>
        </div>
        <LookbookScroll looks={featuredLooks} />
        <div className="container-luxury pt-14 md:pt-20 flex justify-center">
          <Reveal variant="fade" delay={150}>
            <SpecularButton
              href="/lookbook"
              size="md"
              baseColor="#1a1a1a"
              lineColor="#d4af37"
              textColor="var(--color-text)"
              tint="#ffffff"
              tintOpacity={0.12}
              blur={4}
              intensity={1.4}
              shineSize={12}
              proximity={200}
              followMouse
              className="tracking-[0.2em] uppercase"
            >
              View All Looks
            </SpecularButton>
          </Reveal>
        </div>
      </section>

      <div className="h-16 md:h-24" />

      {/* EDITORIAL RUNWAY MARQUEE RIBBON */}
      <EditorialMarquee />

      <div className="h-16 md:h-24" />

      {/* 07 — WEDDINGS — CINEMATIC */}
      <section className="relative min-h-[85vh] md:min-h-screen w-full overflow-hidden flex items-end">
        <div className="absolute inset-0">
          <Image
            src="/wedding background.png"
            alt="UCLOTHIA Wedding Atelier campaign"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_top]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 w-full pb-16 md:pb-24 lg:pb-28">
          <div className="container-luxury">
            <Reveal
              variant="fade-up"
              delay={200}
              className="max-w-2xl mx-auto"
            >
              <div className="bg-gradient-to-t from-black/75 via-black/40 to-black/10 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/50 rounded-2xl p-8 md:p-12 lg:p-14 text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Reveal variant="line" className="h-px w-8 bg-[var(--color-accent)]" />
                  <p className="text-[0.75rem] uppercase tracking-[0.25em] font-medium text-white/75">
                    Weddings
                  </p>
                </div>
                <Reveal variant="mask" delay={100}>
                  <h2 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.05] tracking-[-0.02em] mb-8">
                    The Wedding Atelier
                  </h2>
                </Reveal>

                <Link
                  href="/weddings"
                  className="inline-flex items-center justify-center gap-3 group text-[0.75rem] font-medium tracking-[0.25em] uppercase text-white/90 hover:text-white transition-all duration-500"
                >
                  <span className="h-px w-10 bg-white/40 transition-all duration-500 group-hover:w-16 group-hover:bg-[var(--color-accent)]" />
                  Discover Weddings
                  <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" />

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
            <Reveal variant="line" className="h-px w-16 bg-[var(--color-border-strong)]" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Left — Editorial image */}
            <Reveal className="md:col-span-5" delay={100}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl group shadow-2xl shadow-black/5">
                <Image
                  src="/women-single-potrait-2.jpeg"
                  alt="UCLOTHIA artisan at work"
                  fill
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent rounded-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                  <p className="text-[0.75rem] uppercase tracking-[0.25em] text-white/70 mb-2">
                    Est. 2024
                  </p>
                  <p className="font-display text-xl md:text-2xl text-white font-light leading-tight">
                    Crafted in India
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right — Story + Pillars */}
            <Reveal className="md:col-span-7 flex flex-col justify-center" delay={200}>
              <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.8] mb-10 max-w-xl font-light">
                UCLOTHIA exists at the intersection of heritage and modernity. We work with
                master artisans across India, preserving techniques that have been refined
                over centuries — and presenting them through a contemporary editorial lens.
              </p>

              <div className="border-t border-b border-[var(--color-border-strong)] divide-y divide-[var(--color-border)]">
                {[
                  { num: "01", title: "Our Story", desc: "A modern fashion house rooted in Indian craft traditions, reimagining heritage for the contemporary wardrobe." },
                  { num: "02", title: "Craft", desc: "Master artisans, heritage techniques, and contemporary execution — every piece hand-finished with precision." },
                  { num: "03", title: "Philosophy", desc: "Restraint, precision, and the quiet confidence of considered design in every collection." },
                ].map((pillar) => (
                  <div
                    key={pillar.num}
                    className="group py-6 md:py-7 px-4 -mx-4 rounded-xl transition-all duration-500 ease-[var(--ease-out)] hover:bg-[var(--color-surface)]/60"
                  >
                    <div className="flex items-baseline gap-6 md:gap-8">
                      <span className="text-[0.75rem] font-medium tracking-[0.25em] text-[var(--color-accent)] shrink-0 transition-all duration-500 group-hover:tracking-[0.3em]">
                        {pillar.num}
                      </span>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-display text-xl md:text-2xl font-light leading-[1.2] text-[var(--color-text)] transition-transform duration-500 group-hover:translate-x-1">
                            {pillar.title}
                          </h3>
                          <span className="h-px flex-1 bg-transparent transition-all duration-500 group-hover:bg-[var(--color-accent)]/30" />
                        </div>
                        <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.7] max-w-lg">
                          {pillar.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <Link
                  href="/house"
                  className="editorial-link text-[var(--color-accent-dark)]"
                >
                  Discover the House
                  <span className="editorial-link-arrow text-[var(--color-accent)]">→</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-24 md:h-32" />

      {/* 09 — PRIVATE CLIENT — EXCLUSIVITY */}
      <section className="relative py-28 md:py-44 bg-[#0e0e0e] text-[var(--color-background)] overflow-hidden border-y border-white/10">
        {/* Ambient warm breathing gold auras */}
        <div className="absolute top-1/3 left-1/4 w-[36rem] h-[36rem] bg-[var(--color-accent)] rounded-full blur-[140px] pointer-events-none animate-aura opacity-30" />
        <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-[#c49a45] rounded-full blur-[120px] pointer-events-none opacity-20" />

        <div className="container-luxury relative z-10">
          {/* Section Header */}
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Reveal variant="line" className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.75rem] uppercase tracking-[0.25em] font-medium text-[var(--color-accent)]">
                Private Client
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-6 max-w-3xl mx-auto">
              A personal atelier experience,
              <span className="block italic text-white/50">tailored entirely to your vision.</span>
            </h2>
            <p className="text-[0.9375rem] md:text-[1rem] text-white/60 font-light max-w-xl mx-auto leading-relaxed">
              Step into our private salon suites for individualized bespoke tailoring, archival access, and dedicated one-on-one styling consultations.
            </p>
          </Reveal>

          {/* 3-Column Luxury Architecture Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
            {[
              {
                num: "01",
                title: "Private Appointments",
                desc: "Dedicated one-on-one sessions with our master couturiers and stylists in our private salon suites or your residence.",
                tag: "In-Salon & Virtual",
              },
              {
                num: "02",
                title: "Personal Styling",
                desc: "Complete wardrobe curation across red carpet, gala evenings, wedding party ensembles, and refined everyday luxury.",
                tag: "Wardrobe Curation",
              },
              {
                num: "03",
                title: "Bespoke Commissions",
                desc: "One-of-one made-to-measure couture crafted to your exact silhouette with hand-drawn embroideries and heritage silks.",
                tag: "Custom Couture",
              },
            ].map((service, i) => (
              <Reveal key={service.title} delay={i * 120} variant="fade-up">
                <Link
                  href="/private-client"
                  className="group relative flex flex-col justify-between h-full p-8 md:p-10 rounded-2xl border border-white/10 bg-white/[0.025] backdrop-blur-md transition-all duration-700 ease-[var(--ease-out)] hover:border-[var(--color-accent)]/60 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/60"
                >
                  <div>
                    {/* Top indicator & tag */}
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-display text-lg tracking-[0.2em] text-[var(--color-accent)] font-light">
                        {service.num}
                      </span>
                      <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-white/70 transition-colors duration-500 font-medium">
                        {service.tag}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display text-2xl md:text-3xl text-white font-light leading-[1.15] mb-4 group-hover:text-white transition-colors duration-500">
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[0.875rem] text-white/65 leading-[1.7] mb-8 font-light">
                      {service.desc}
                    </p>
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[0.75rem] uppercase tracking-[0.25em] text-white/70 group-hover:text-[var(--color-accent)] transition-colors duration-500 font-medium">
                      Inquire Service
                    </span>
                    <span className="text-white/50 group-hover:text-[var(--color-accent)] transition-transform duration-500 group-hover:translate-x-1.5">
                      →
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Centered CTA */}
          <Reveal variant="fade" delay={200}>
            <div className="text-center">
              <Link
                href="/private-client"
                className="relative inline-flex items-center gap-3 px-10 py-4.5 rounded-full border border-white/25 bg-white/5 backdrop-blur-md text-[0.75rem] font-medium tracking-[0.25em] uppercase text-white hover:text-white hover:border-[var(--color-accent)]/80 hover:bg-white/10 transition-all duration-500 group shadow-lg shadow-black/30 overflow-hidden"
              >
                <span className="relative z-10">Book a Private Appointment</span>
                <span className="relative z-10 transition-transform duration-500 group-hover:translate-x-1.5">→</span>
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-24 md:h-32" />

      {/* 10 — STORES — QUIET EDITORIAL */}
      <section className="py-24 md:py-40">
        <div className="container-luxury">
          <Reveal variant="fade" className="mb-14 md:mb-16 text-center">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Reveal variant="line" className="h-px w-12 bg-[var(--color-border-strong)]" />
              <p className="text-[0.75rem] uppercase tracking-[0.25em] font-medium text-[var(--color-accent)]">Visit Us</p>
            </div>
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-[-0.02em]">
              Our Stores
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {stores.map((store, i) => (
              <Reveal key={store.id} delay={i * 120}>
                <Link
                  href={`/stores/${store.slug}`}
                  className="group block relative text-center py-10 px-8 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-out)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)] hover:shadow-2xl hover:shadow-black/5"
                >
                  <p className="text-[0.75rem] uppercase tracking-[0.25em] text-[var(--color-accent)] font-medium mb-5">
                    {String(i + 1).padStart(2, "0")} — India
                  </p>
                  <h3 className="font-display text-2xl md:text-3xl font-light mb-5 text-[var(--color-text)] transition-transform duration-500 group-hover:-translate-y-0.5">
                    {store.city}
                  </h3>
                  <p className="text-[0.8125rem] text-[var(--color-text-secondary)] leading-[1.6] mb-3 max-w-xs mx-auto">
                    {store.address}
                  </p>
                  <p className="text-[0.75rem] text-[var(--color-muted)] tracking-wide mb-8">
                    {store.hours}
                  </p>
                  <span className="inline-flex items-center gap-2 text-[0.75rem] font-medium tracking-[0.2em] uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-dark)] transition-colors duration-500">
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-500 group-hover:w-6" />
                    Book Appointment
                    <span className="transition-transform duration-500 group-hover:translate-x-1.5">→</span>
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
