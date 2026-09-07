import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { looks } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { LineDraw } from "@/components/motion/line-draw";

export const metadata: Metadata = {
  title: "Lookbook",
  description: "UCLOTHIA Lookbook — editorial looks from our collections, styled and shot for the season.",
  alternates: { canonical: "/lookbook" },
};

export default function LookbookPage() {
  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <ParallaxImage
          src="/women-single-potrait-2.jpeg"
          alt="UCLOTHIA Lookbook — Editorial"
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
                  Editorial
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              Lookbook
            </h1>
            <p className="mt-8 md:mt-10 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-xl mx-auto leading-[1.7] font-light opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
              Each look is a composed story — silhouette, material, and detail in conversation.
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
              Style is not what you wear — it is how you wear it.
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

      {/* — Look Grid — */}
      <section className="py-20 md:py-32">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-14 md:mb-20">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                The Collection
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6">
              The <span className="italic text-[var(--color-muted)]">Looks</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {looks.map((look, i) => (
              <Reveal key={look.id} delay={(i % 2) * 100} className="relative">
                <Link
                  href={`/lookbook/${look.slug}`}
                  className="group block"
                >
                  <div className={`relative overflow-hidden bg-[var(--color-surface-alt)] image-editorial rounded-2xl ${
                    i % 3 === 0 ? "aspect-[4/5]" : i % 3 === 1 ? "aspect-[3/4]" : "aspect-[1/1]"
                  }`}>
                    <Image
                      src={look.image}
                      alt={look.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-700 rounded-2xl pointer-events-none" />
                    {/* Gold hairline border trace */}
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                    {/* Index number */}
                    <div className="absolute top-5 left-5 md:top-7 md:left-7 flex items-center gap-3 z-10">
                      <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                    </div>
                    {/* Bottom content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                      <p className="text-[0.625rem] uppercase tracking-[0.25em] text-white/50 mb-2 transition-colors duration-500 group-hover:text-white/80">
                        {look.collection.replace(/-/g, " ")}
                      </p>
                      <h3 className="font-display text-xl md:text-2xl lg:text-3xl text-white font-light leading-tight transition-transform duration-500 ease-[var(--ease-out)] group-hover:-translate-y-1">
                        {look.name}
                      </h3>
                      <span className="inline-flex items-center gap-2 mt-4 text-[0.625rem] font-medium tracking-[0.25em] uppercase text-white/0 group-hover:text-white/70 transition-all duration-500">
                        Shop the Look
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="mt-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              <span className="w-1 h-1 rotate-45 border border-[var(--color-accent)]/30" />
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
            </div>
            <Link
              href="/collections"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500 group"
            >
              Explore Collections
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
