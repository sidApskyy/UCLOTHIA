import type { Metadata } from "next";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
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
    <div>
      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <Image
          src="/WhatsApp Image 2026-08-26 at 12.08.38 AM.jpeg"
          alt="UCLOTHIA Private Client"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
        <div className="absolute bottom-0 left-0 right-0 pb-16 md:pb-24">
          <div className="container-luxury max-w-3xl">
            <p className="text-eyebrow text-white/70 mb-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_0ms_forwards]">Private Client</p>
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-white font-light leading-[1.0] tracking-[-0.02em] opacity-0 animate-[fadeUp_800ms_var(--ease-out)_100ms_forwards]">
              A personal atelier experience.
            </h1>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 md:py-32">
        <div className="container-luxury max-w-3xl">
          <Reveal>
            <p className="text-eyebrow-accent mb-6">Our Services</p>
            <h2 className="text-editorial text-[var(--color-text)] mb-14">
              Tailored to you, in every sense.
            </h2>
          </Reveal>
          <div className="space-y-0">
            {services.map((service, i) => (
              <Reveal key={service.title} delay={i * 80}>
                <div className="border-t border-[var(--color-border)] py-10 last:border-b">
                  <div className="flex items-start gap-8">
                    <p className="text-micro pt-1 flex-shrink-0">{String(i + 1).padStart(2, "0")}</p>
                    <div>
                      <h3 className="font-display text-xl md:text-2xl font-light mb-3">
                        {service.title}
                      </h3>
                      <p className="text-body max-w-md">{service.desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bespoke section */}
      <section id="bespoke" className="py-24 md:py-40 bg-[var(--color-surface-alt)]">
        <div className="container-luxury max-w-3xl">
          <Reveal>
            <p className="text-eyebrow-accent mb-4">Bespoke</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-8">
              Made entirely for you.
            </h2>
            <p className="text-body-lg mb-8">
              Our bespoke service begins with a conversation — about the occasion,
              the silhouette, the material, the embroidery. From there, our team
              creates a piece that exists only for you. The process takes 8-12 weeks
              and includes multiple fittings.
            </p>
            <Link href="/stores" className="btn-secondary">
              Visit Our Ateliers
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Appointment form */}
      <section className="py-24 md:py-40">
        <div className="container-luxury max-w-2xl">
          <Reveal>
            <p className="text-eyebrow-accent mb-4">Book an Appointment</p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-10">
              Begin the conversation.
            </h2>
            <AppointmentForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
