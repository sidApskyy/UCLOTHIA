import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Weddings",
  description:
    "UCLOTHIA Weddings — bridal, groom, and occasion wear. A wedding garment is not simply clothing — it is a memory made material.",
  alternates: { canonical: "/weddings" },
};

const weddingCategories = [
  { label: "Bridal", href: "/women?occasion=bridal", desc: "Couture lehengas, sarees, and gowns for the bride." },
  { label: "Groom", href: "/men?occasion=groom", desc: "Sherwanis, bandhgalas, and kurta sets for the groom." },
  { label: "Sangeet", href: "/women?occasion=cocktail", desc: "Vibrant pieces for the sangeet and mehendi." },
  { label: "Reception", href: "/women?occasion=reception", desc: "Elegant evening wear for the reception." },
  { label: "Wedding Guest", href: "/women?occasion=festive", desc: "Refined options for the wedding guest." },
  { label: "Jewellery", href: "/accessories", desc: "Finishing pieces for the complete look." },
];

export default function WeddingsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <Image
          src="/mf-1.jpeg"
          alt="UCLOTHIA Wedding Atelier"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
        <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24">
          <div className="container-luxury max-w-3xl">
            <p className="text-eyebrow text-white/70 mb-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_0ms_forwards]">The Wedding Atelier</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-8xl text-white font-light leading-[1.0] tracking-[-0.02em] opacity-0 animate-[fadeUp_800ms_var(--ease-out)_100ms_forwards]">
              A memory made material.
            </h1>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-24 md:py-32">
        <div className="container-luxury max-w-3xl">
          <Reveal>
            <p className="text-eyebrow-accent mb-6">Philosophy</p>
            <p className="text-body-lg leading-relaxed">
              A wedding garment is not simply clothing. It is the material form of a
              memory — one that will be photographed, remembered, and passed down.
              We approach each piece with that understanding.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-24 md:pb-40">
        <div className="container-luxury max-w-3xl">
          <Reveal className="mb-12 md:mb-16">
            <p className="text-eyebrow-accent mb-4">The Categories</p>
            <h2 className="font-display text-3xl md:text-4xl font-light">
              Every moment, considered.
            </h2>
          </Reveal>
          <div className="space-y-0">
            {weddingCategories.map((cat, i) => (
              <Reveal key={cat.label} delay={i * 60}>
                <Link
                  href={cat.href}
                  className="group flex items-start justify-between gap-8 border-t border-[var(--color-border)] py-8 last:border-b"
                >
                  <div className="flex items-start gap-6">
                    <p className="text-micro pt-1 flex-shrink-0">{String(i + 1).padStart(2, "0")}</p>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-light mb-2">
                        {cat.label}
                      </h3>
                      <p className="text-body text-[0.875rem] max-w-md">{cat.desc}</p>
                    </div>
                  </div>
                  <span className="text-[0.6875rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text-secondary)] group-hover:text-[var(--color-text)] transition-colors flex-shrink-0 pt-1">
                    Explore
                    <span className="inline-block ml-2 transition-transform duration-[var(--duration-medium)] group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section id="consultation" className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-2xl text-center">
          <Reveal>
            <p className="text-eyebrow-accent mb-4">Wedding Consultation</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8">
              Begin with a private conversation.
            </h2>
            <p className="text-body-lg mb-10">
              Our wedding consultations are personal — we discuss your vision, timeline,
              and preferences, and guide you through the process of commissioning a piece
              that is entirely yours.
            </p>
            <Link href="/private-client" className="btn-primary">
              Book a Consultation
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
