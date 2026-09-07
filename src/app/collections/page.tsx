import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { collections } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";
import { LineDraw } from "@/components/motion/line-draw";
import { ParallaxImage } from "@/components/motion/parallax-image";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Explore UCLOTHIA collections — couture, ready-to-wear, and seasonal campaigns from the house archive.",
  alternates: { canonical: "/collections" },
};

export default function CollectionsPage() {
  return (
    <>
      {/* — Editorial Hero — */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <ParallaxImage
          src="/og-campaign.jpg"
          alt="UCLOTHIA Collections — Campaign"
          priority
          sizes="100vw"
          objectPosition="center 30%"
          speed={0.25}
          className="ken-burns-intro"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-[3]">
          <div className="container-luxury">
            <div className="opacity-0 animate-[fade-in-up_800ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
              <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] md:text-[0.75rem] uppercase tracking-[0.3em] font-medium text-white/70">
                  The House Archive
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              Collections
            </h1>
            <p className="mt-8 md:mt-10 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-xl mx-auto leading-[1.7] font-light opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
              Couture, ready-to-wear, and seasonal campaigns — each a conversation between heritage and modernity.
            </p>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2">
          <span className="text-[0.625rem] uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <span className="w-px h-12 bg-white/20 scroll-indicator" />
        </div>
      </section>

      {/* — Editorial Quote Band — */}
      <section className="py-20 md:py-36 overflow-hidden bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl text-center">
          <Reveal variant="fade">
            <span className="block font-display text-7xl md:text-8xl leading-none text-[var(--color-accent)]/30 mb-4 select-none">&ldquo;</span>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light italic leading-[1.3] tracking-[-0.01em] text-[var(--color-text)]">
              Every collection is a chapter — written in silk, gold thread, and the quiet confidence of the wearer.
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

      {/* — Collection Cards — */}
      <section className="py-20 md:py-32">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-14 md:mb-20">
            <p className="text-eyebrow-accent mb-4">Explore the Archive</p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6">
              A World of <span className="italic text-[var(--color-muted)]">Craft</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <div className="space-y-24 md:space-y-40">
            {collections.map((collection, i) => (
              <Reveal key={collection.id} variant="fade" delay={i * 100}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
                  {/* Image */}
                  <Link
                    href={`/collections/${collection.slug}`}
                    className={`group relative aspect-[4/5] md:aspect-[3/4] overflow-hidden bg-[var(--color-surface-alt)] rounded-2xl image-editorial ${i % 2 === 1 ? "md:order-2" : "md:order-1"}`}
                  >
                    <Image
                      src={collection.heroImage}
                      alt={collection.heroImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-2xl pointer-events-none" />
                    {/* Gold hairline border trace */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                    {/* Index number */}
                    <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-3 z-10">
                      <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                    </div>
                    {/* Season label — bottom */}
                    <div className="absolute bottom-5 left-5 md:bottom-7 md:left-7 z-10">
                      <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-white/50 transition-colors duration-500 group-hover:text-white/80">
                        {collection.season}
                      </p>
                    </div>
                  </Link>

                  {/* Text */}
                  <div className={`md:px-8 lg:px-12 ${i % 2 === 1 ? "md:order-1" : "md:order-2"}`}>
                    {/* Gold line + season */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="h-px w-6 bg-[var(--color-accent)]" />
                      <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                        {collection.season}
                      </p>
                    </div>

                    <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-[-0.02em] mb-6">
                      {collection.name}
                    </h2>

                    <p className="font-display text-lg md:text-xl font-light italic text-[var(--color-muted)] mb-6 max-w-md leading-[1.5]">
                      {collection.concept}
                    </p>

                    <p className="text-body-lg mb-10 max-w-md">
                      {collection.description}
                    </p>

                    <Link
                      href={`/collections/${collection.slug}`}
                      className="editorial-link text-[var(--color-text)]"
                    >
                      Explore Collection <span className="editorial-link-arrow">→</span>
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
