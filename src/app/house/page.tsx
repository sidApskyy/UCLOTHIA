import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { LineDraw } from "@/components/motion/line-draw";

export const metadata: Metadata = {
  title: "The House",
  description:
    "UCLOTHIA — a luxury fashion house built on craft, restraint, and the belief that garments carry meaning.",
  alternates: { canonical: "/house" },
};

export default function HousePage() {
  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <ParallaxImage
          src="/males-group-potrait.jpeg"
          alt="The UCLOTHIA atelier"
          priority
          sizes="100vw"
          objectPosition="center 30%"
          speed={0.25}
          className="ken-burns-intro"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/20" />

        <div className="absolute inset-0 flex items-end z-[3]">
          <div className="w-full pb-16 md:pb-24">
            <div className="container-luxury max-w-3xl">
              <div className="opacity-0 animate-[fade-in-up_800ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
                <div className="flex items-center gap-4 mb-6">
                  <span className="h-px w-8 bg-[var(--color-accent)]" />
                  <p className="text-[0.6875rem] md:text-[0.75rem] uppercase tracking-[0.3em] font-medium text-white/70">
                    The House
                  </p>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-white font-light leading-[1.0] tracking-[-0.02em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
                A house built on<br />craft and <span className="italic">intention.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* — Story — */}
      <section className="py-24 md:py-40">
        <div className="container-luxury max-w-3xl">
          <Reveal variant="fade">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-[var(--color-accent)]" />
              <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                Our Story
              </p>
            </div>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] mb-10">
              UCLOTHIA exists at the intersection of <span className="italic text-[var(--color-muted)]">heritage</span> and modernity.
            </p>
            <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.8] font-light mb-8">
              We work with master artisans across India — in Lucknow, Bareilly, Banaras,
              and beyond — preserving techniques that have been refined over centuries.
              Zardozi, resham, mirror work, handloom weaving: these are not decorative
              traditions. They are living languages of craft.
            </p>
            <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.8] font-light">
              Our role is not to preserve these techniques as museum pieces, but to give
              them a contemporary context — to let them live on the bodies of women and
              men who wear them with intention. Every garment we make is a conversation
              between past and present.
            </p>
          </Reveal>
        </div>
      </section>

      {/* — Philosophy — */}
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl">
          <Reveal variant="fade">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-[var(--color-accent)]" />
              <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                Philosophy
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light tracking-[-0.02em] mb-12 leading-[1.1]">
              Restraint is the ultimate <span className="italic text-[var(--color-muted)]">luxury.</span>
            </h2>
            <div className="space-y-0">
              {[
                { num: "01", title: "On Craft", desc: "We believe in the hand. Every piece in our collection passes through the hands of artisans who have spent decades perfecting their craft. We do not rush this process." },
                { num: "02", title: "On Design", desc: "We design with negative space. Knowing what to leave out is as important as knowing what to include. Our garments are not loud — they are confident." },
                { num: "03", title: "On Material", desc: "We source from heritage mills and weavers. Pure Mysore silk, Italian velvet, raw silk, linen — materials that age beautifully and carry the memory of their making." },
                { num: "04", title: "On Service", desc: "We believe luxury is personal. Our private client services exist because we understand that the right garment is not found — it is made, together." },
              ].map((pillar) => (
                <div
                  key={pillar.num}
                  className="group border-t border-[var(--color-border)] py-8 last:border-b"
                >
                  <div className="flex items-baseline gap-6 md:gap-8">
                    <span className="text-[0.75rem] font-medium tracking-[0.25em] text-[var(--color-accent)] shrink-0 transition-all duration-500 group-hover:tracking-[0.3em]">
                      {pillar.num}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-display text-lg md:text-xl font-light transition-transform duration-500 group-hover:translate-x-1">
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
          </Reveal>
        </div>
      </section>

      {/* — Craft — */}
      <section className="py-24 md:py-40">
        <div className="container-luxury">
          <Reveal variant="fade" className="text-center mb-16 md:mb-24">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                The Crafts
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6">
              Heritage <span className="italic text-[var(--color-muted)]">techniques</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { title: "Zardozi", desc: "Gold and silver thread embroidery, practised since the Mughal era.", img: "/hover-single-male-1.jpeg" },
              { title: "Resham", desc: "Silk thread embroidery, delicate and precise, in the hands of master karigars.", img: "/hover-single-male-2.jpeg" },
              { title: "Handloom", desc: "Handwoven textiles from heritage weaving clusters across India.", img: "/hover-single-male-3.jpeg" },
            ].map((craft, i) => (
              <div key={craft.title} className={`group ${i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}`}>
                <div className="relative aspect-square overflow-hidden bg-[var(--color-surface-alt)] image-editorial rounded-2xl mb-6">
                  <Image
                    src={craft.img}
                    alt={`UCLOTHIA ${craft.title} craft`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl pointer-events-none" />
                  <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                  <div className="absolute top-5 left-5 flex items-center gap-3 z-10">
                    <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                  </div>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-light mb-3">
                  {craft.title}
                </h3>
                <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.7]">{craft.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* — CTA — */}
      <section className="relative py-32 md:py-48 bg-[#0c0c0c] text-[var(--color-background)] overflow-hidden">
        {/* Subtle gold glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[30rem] bg-[var(--color-accent)] rounded-full blur-[180px] pointer-events-none opacity-[0.06]" />

        <div className="container-luxury relative z-10 text-center max-w-2xl mx-auto">
          <Reveal variant="fade">
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.35em] font-medium text-[var(--color-accent)]">
                Private Client
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light leading-[1.1] mb-8">
              Experience the house <span className="block italic text-white/40">in person.</span>
            </h2>
            <p className="text-[0.9375rem] md:text-[1.0625rem] text-white/50 leading-[1.7] font-light mb-12 max-w-lg mx-auto">
              Private appointments, bespoke commissions, and wedding consultations
              at our atelier.
            </p>
            {/* Decorative ornament */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <span className="h-px w-6 bg-white/15" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
              <span className="h-px w-6 bg-white/15" />
            </div>
            <Link
              href="/private-client"
              className="inline-flex items-center gap-3 px-10 py-4 border border-white/20 text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-white hover:bg-white hover:text-[#0c0c0c] transition-all duration-500 group"
            >
              Book an Appointment
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
