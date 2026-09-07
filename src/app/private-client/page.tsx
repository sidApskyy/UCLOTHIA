import type { Metadata } from "next";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { LineDraw } from "@/components/motion/line-draw";
import { AppointmentForm } from "@/components/layout/appointment-form";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Private Client",
  description:
    "UCLOTHIA Private Client — private appointments, personal styling, bespoke commissions, and wedding consultations.",
  alternates: { canonical: "/private-client" },
};

const services = [
  {
    title: "Private Appointment",
    desc: "A dedicated session in our atelier with a stylist and access to the full collection, including pieces not available online.",
  },
  {
    title: "Personal Styling",
    desc: "Our stylists work with you to curate a wardrobe that reflects your personal style, occasion, and aesthetic.",
  },
  {
    title: "Bespoke",
    desc: "Commission a piece made entirely to your specifications — from silhouette and fabric to embroidery and finishing.",
  },
  {
    title: "Custom Fitting",
    desc: "Our tailors ensure every piece fits you perfectly, with alterations and adjustments available on all made-to-order garments.",
  },
  {
    title: "Wedding Consultation",
    desc: "A comprehensive consultation for bridal, groom, and wedding party attire — from concept to final fitting.",
  },
];

export default function PrivateClientPage() {
  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <ParallaxImage
          src="/whatsapp-image-2.jpeg"
          alt="UCLOTHIA Private Client"
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
                    Private Client
                  </p>
                </div>
              </div>
              <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.0] tracking-[-0.02em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
                A personal atelier <span className="italic">experience.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* — Services — */}
      <section className="py-24 md:py-32">
        <div className="container-luxury max-w-3xl">
          <Reveal variant="fade">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-[var(--color-accent)]" />
              <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                Our Services
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-14">
              Tailored to you, in every <span className="italic text-[var(--color-muted)]">sense.</span>
            </h2>
          </Reveal>
          <div className="space-y-0">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <div className="group border-t border-[var(--color-border)] py-10 last:border-b">
                  <div className="flex items-start gap-6 md:gap-8">
                    <span className="text-[0.75rem] font-medium tracking-[0.25em] text-[var(--color-accent)] pt-1 shrink-0 transition-all duration-500 group-hover:tracking-[0.3em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-display text-xl md:text-2xl font-light transition-transform duration-500 group-hover:translate-x-1">
                          {service.title}
                        </h3>
                        <span className="h-px flex-1 bg-transparent transition-all duration-500 group-hover:bg-[var(--color-accent)]/30" />
                      </div>
                      <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.7] max-w-md">{service.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* — Bespoke — */}
      <section id="bespoke" className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl">
          <Reveal variant="fade">
            <div className="flex items-center gap-3 mb-8">
              <span className="h-px w-6 bg-[var(--color-accent)]" />
              <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                Bespoke
              </p>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8">
              Made entirely for <span className="italic text-[var(--color-muted)]">you.</span>
            </h2>
            <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.8] font-light mb-10 max-w-xl">
              Our bespoke service begins with a conversation — about the occasion,
              the silhouette, the material, the embroidery. From there, our team
              creates a piece that exists only for you. The process takes 8-12 weeks
              and includes multiple fittings.
            </p>
            {/* Decorative ornament */}
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
            </div>
            <Link
              href="/stores"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500 group"
            >
              Visit Our Atelier
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* — Appointment Form — */}
      <section className="py-24 md:py-40">
        <div className="container-luxury max-w-2xl">
          <Reveal variant="fade">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                  Book an Appointment
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-6">
                Begin the <span className="italic text-[var(--color-muted)]">conversation.</span>
              </h2>
              <LineDraw width="4rem" className="mx-auto" />
            </div>
            <AppointmentForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
