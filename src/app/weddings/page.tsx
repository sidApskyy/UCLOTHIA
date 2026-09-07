import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { LineDraw } from "@/components/motion/line-draw";
import { ParallaxImage } from "@/components/motion/parallax-image";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "UCLOTHIA Weddings — bridal, groom, and occasion wear. A wedding garment is not simply clothing — it is a memory made material.",
  alternates: { canonical: "/weddings" },
};

const weddingCategories = [
  { label: "Bridal", href: "/women?occasion=bridal", desc: "Couture lehengas, sarees, and gowns for the bride.", img: "/women-single-potrait.jpeg", hoverImg: "/whatsapp-image-1.jpeg" },
  { label: "Groom", href: "/men?occasion=groom", desc: "Sherwanis, bandhgalas, and kurta sets for the groom.", img: "/male-single-potrait.jpeg", hoverImg: "/hover-single-male-1.jpeg" },
  { label: "Sangeet", href: "/women?occasion=cocktail", desc: "Vibrant pieces for the sangeet and mehendi.", img: "/f1.jpeg", hoverImg: "/f2.jpeg" },
  { label: "Reception", href: "/women?occasion=reception", desc: "Elegant evening wear for the reception.", img: "/women-single-potrait-2.jpeg", hoverImg: "/whatsapp-image-2.jpeg" },
  { label: "Wedding Guest", href: "/women?occasion=festive", desc: "Refined options for the wedding guest.", img: "/mf-2.jpeg", hoverImg: "/f1.jpeg" },
  { label: "Jewellery", href: "/accessories", desc: "Finishing pieces for the complete look.", img: "/f2.jpeg", hoverImg: "/women-single-potrait.jpeg" },
];

export default function WeddingsPage() {
  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <ParallaxImage
          src="/mf-1.jpeg"
          alt="UCLOTHIA Wedding Atelier"
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
                    The Wedding Atelier
                  </p>
                </div>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] max-w-4xl opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
                A memory<br />made material
              </h1>
              <p className="mt-6 md:mt-8 text-[0.9375rem] md:text-[1.125rem] text-white/75 max-w-xl leading-[1.7] font-light italic opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
                Couture for the moments that become memories — bridal, groom, and occasion wear crafted with intention.
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

      {/* — Editorial Quote Band — */}
      <section className="py-20 md:py-36 overflow-hidden bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl text-center">
          <Reveal variant="fade">
            <span className="block font-display text-7xl md:text-8xl leading-none text-[var(--color-accent)]/30 mb-4 select-none">&ldquo;</span>
            <p className="font-display text-2xl md:text-4xl lg:text-5xl font-light italic leading-[1.3] tracking-[-0.01em] text-[var(--color-text)]">
              A wedding garment is not simply clothing — it is the material form of a memory.
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

      {/* — Philosophy — asymmetric editorial layout */}
      <section className="py-24 md:py-40">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <Reveal className="md:col-span-4">
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-6 bg-[var(--color-accent)]" />
                <p className="text-eyebrow-accent">Philosophy</p>
              </div>
              <LineDraw width="3rem" />
            </Reveal>
            <Reveal className="md:col-span-8" delay={100}>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] text-[var(--color-text)] mb-10">
                Each piece is designed with the understanding that it will be photographed, remembered, and passed down.
              </p>
              <p className="text-body-lg max-w-2xl">
                We approach wedding commissions with a level of care that goes beyond fit and fabric. From the first sketch to the final fitting, every decision is made in service of a single day — and a lifetime of memory.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Category Cards — luxury grid with hover crossfade */}
      <section className="pb-24 md:pb-40">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-14 md:mb-20">
            <p className="text-eyebrow-accent mb-4">The Categories</p>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6">
              Every moment, <span className="italic text-[var(--color-muted)]">considered</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {weddingCategories.map((cat, i) => (
              <Reveal key={cat.label} variant="fade" delay={i * 80}>
                <Link
                  href={cat.href}
                  className="group relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-alt)] rounded-2xl image-editorial block"
                >
                  {/* Base image */}
                  <Image
                    src={cat.img}
                    alt={cat.label}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-[center_30%] transition-all duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105 group-hover:opacity-0"
                  />
                  {/* Hover image — crossfade */}
                  <Image
                    src={cat.hoverImg}
                    alt={`${cat.label} — alternate view`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover object-[center_30%] opacity-0 scale-105 transition-all duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:opacity-100 group-hover:scale-100"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent rounded-2xl pointer-events-none" />
                  {/* Gold hairline border trace */}
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                  {/* Index number */}
                  <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                    <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                  </div>
                  {/* Bottom content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                    <h3 className="font-display text-xl md:text-2xl text-white font-light leading-[1.2] mb-2">
                      {cat.label}
                    </h3>
                    <p className="text-[0.8125rem] text-white/60 font-light leading-[1.5] max-w-xs">
                      {cat.desc}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-[0.625rem] uppercase tracking-[0.2em] text-white/40 group-hover:text-[var(--color-accent)] transition-colors duration-500 font-medium">
                        Explore
                      </span>
                      <span className="text-white/40 group-hover:text-[var(--color-accent)] transition-all duration-500 group-hover:translate-x-1 text-xs">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Editorial Showcase — dual image staggered */}
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-14 md:mb-20">
            <p className="text-eyebrow-accent mb-4">The Craft</p>
            <h2 className="font-display text-3xl md:text-5xl font-light tracking-[-0.02em] mb-6">
              Heritage <span className="italic text-[var(--color-muted)]">reimagined</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <Reveal variant="mask-sweep">
              <div className="group relative overflow-hidden bg-[var(--color-surface)] image-editorial aspect-[3/4] rounded-2xl">
                <Image
                  src="/women-single-potrait.jpeg"
                  alt="Bridal couture — heritage craft"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
                <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                  <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                    01
                  </span>
                  <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                </div>
                <div className="absolute bottom-5 left-5 z-10">
                  <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-white/50 transition-colors duration-500 group-hover:text-white/80">
                    The Bride — Heritage Craft
                  </p>
                </div>
              </div>
            </Reveal>
            <Reveal variant="mask-sweep" delay={100}>
              <div className="group relative overflow-hidden bg-[var(--color-surface)] image-editorial aspect-[3/4] rounded-2xl md:mt-16">
                <Image
                  src="/male-single-potrait.jpeg"
                  alt="Groom couture — modern precision"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-[center_30%] transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                />
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
                <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                  <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                    02
                  </span>
                  <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                </div>
                <div className="absolute bottom-5 left-5 z-10">
                  <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-white/50 transition-colors duration-500 group-hover:text-white/80">
                    The Groom — Modern Precision
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* — Consultation CTA — dark luxury */}
      <section id="consultation" className="relative py-32 md:py-48 bg-[#0c0c0c] text-[var(--color-background)] overflow-hidden">
        {/* Subtle centered gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] bg-[var(--color-accent)] rounded-full blur-[180px] pointer-events-none opacity-[0.06]" />

        {/* Vertical gold hairline — center axis */}
        <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-b from-transparent via-[var(--color-accent)]/15 to-transparent pointer-events-none" />

        <div className="container-luxury relative z-10 max-w-2xl text-center">
          <Reveal variant="fade">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.35em] font-medium text-[var(--color-accent)]">
                Wedding Consultation
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.1] mb-8">
              Begin with a private<br />conversation
            </h2>
            <p className="font-display text-lg md:text-xl font-light italic text-white/40 max-w-xl mx-auto leading-[1.5] mb-10">
              Our consultations are personal — we discuss your vision, timeline, and preferences
            </p>
            {/* Decorative ornament */}
            <div className="flex items-center justify-center gap-3 mb-10">
              <span className="h-px w-6 bg-white/15" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
              <span className="h-px w-6 bg-white/15" />
            </div>
            <Link
              href="/private-client"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white hover:bg-white hover:text-[#0c0c0c] transition-all duration-500 group"
            >
              Book a Consultation
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
            <p className="text-[0.625rem] uppercase tracking-[0.2em] text-white/20 font-light mt-6">
              By appointment only · Limited availability
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
