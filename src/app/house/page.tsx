import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "The House",
  description:
    "UCLOTHIA — a luxury fashion house built on craft, restraint, and the belief that garments carry meaning.",
  alternates: { canonical: "/house" },
};

export default function HousePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <Image
          src="/males group potrait.jpeg"
          alt="The UCLOTHIA atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
        <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24">
          <div className="container-luxury max-w-3xl">
            <p className="text-eyebrow text-white/70 mb-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_0ms_forwards]">The House</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-white font-light leading-[1.0] tracking-[-0.02em] opacity-0 animate-[fadeUp_800ms_var(--ease-out)_100ms_forwards]">
              A house built on craft and intention.
            </h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 md:py-40">
        <div className="container-luxury max-w-3xl">
          <Reveal>
            <p className="text-eyebrow-accent mb-6">Our Story</p>
            <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light leading-[1.3] tracking-[-0.01em] mb-10">
              UCLOTHIA exists at the intersection of heritage and modernity.
            </p>
            <p className="text-body-lg mb-8">
              We work with master artisans across India — in Lucknow, Bareilly, Banaras,
              and beyond — preserving techniques that have been refined over centuries.
              Zardozi, resham, mirror work, handloom weaving: these are not decorative
              traditions. They are living languages of craft.
            </p>
            <p className="text-body-lg">
              Our role is not to preserve these techniques as museum pieces, but to give
              them a contemporary context — to let them live on the bodies of women and
              men who wear them with intention. Every garment we make is a conversation
              between past and present.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl">
          <Reveal>
            <p className="text-eyebrow-accent mb-6">Philosophy</p>
            <h2 className="text-editorial text-[var(--color-text)] mb-12">
              Restraint is the ultimate luxury.
            </h2>
            <div className="space-y-10">
              <div className="border-t border-[var(--color-border)] pt-6">
                <p className="text-micro mb-2">01</p>
                <h3 className="font-display text-lg font-light mb-3">On Craft</h3>
                <p className="text-body">
                  We believe in the hand. Every piece in our collection passes through
                  the hands of artisans who have spent decades perfecting their craft.
                  We do not rush this process.
                </p>
              </div>
              <div className="border-t border-[var(--color-border)] pt-6">
                <p className="text-micro mb-2">02</p>
                <h3 className="font-display text-lg font-light mb-3">On Design</h3>
                <p className="text-body">
                  We design with negative space. Knowing what to leave out is as important
                  as knowing what to include. Our garments are not loud — they are confident.
                </p>
              </div>
              <div className="border-t border-[var(--color-border)] pt-6">
                <p className="text-micro mb-2">03</p>
                <h3 className="font-display text-lg font-light mb-3">On Material</h3>
                <p className="text-body">
                  We source from heritage mills and weavers. Pure Mysore silk, Italian
                  velvet, raw silk, linen — materials that age beautifully and carry
                  the memory of their making.
                </p>
              </div>
              <div className="border-t border-[var(--color-border)] pt-6">
                <p className="text-micro mb-2">04</p>
                <h3 className="font-display text-lg font-light mb-3">On Service</h3>
                <p className="text-body">
                  We believe luxury is personal. Our private client services exist because
                  we understand that the right garment is not found — it is made, together.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Craft */}
      <section className="py-24 md:py-40">
        <div className="container-luxury">
          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { title: "Zardozi", desc: "Gold and silver thread embroidery, practised since the Mughal era.", img: "/hover single male 1.jpeg" },
              { title: "Resham", desc: "Silk thread embroidery, delicate and precise, in the hands of master karigars.", img: "/hover single male 2.jpeg" },
              { title: "Handloom", desc: "Handwoven textiles from heritage weaving clusters across India.", img: "/hover single male 3.jpeg" },
            ].map((craft, i) => (
              <div key={craft.title} className={i === 1 ? "md:mt-16" : i === 2 ? "md:mt-32" : ""}>
                <div className="relative aspect-square overflow-hidden bg-[var(--color-surface-alt)] image-editorial mb-6">
                  <Image
                    src={craft.img}
                    alt={`UCLOTHIA ${craft.title} craft`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-micro mb-3">{String(i + 1).padStart(2, "0")} — {craft.title}</p>
                <h3 className="font-display text-xl md:text-2xl font-light mb-3">
                  {craft.title}
                </h3>
                <p className="text-body">{craft.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-40 bg-[var(--color-text)] text-[var(--color-background)]">
        <div className="container-luxury text-center max-w-2xl mx-auto">
          <Reveal>
            <p className="text-eyebrow-accent mb-4">Private Client</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8">
              Experience the house in person.
            </h2>
            <p className="text-white/70 mb-10">
              Private appointments, bespoke commissions, and wedding consultations
              at our ateliers in Mumbai, Delhi, and Bangalore.
            </p>
            <Link
              href="/private-client"
              className="editorial-link text-white"
            >
              Book an Appointment <span className="editorial-link-arrow">→</span>
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
