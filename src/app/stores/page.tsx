import Link from "next/link";
import type { Metadata } from "next";
import { stores } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { LineDraw } from "@/components/motion/line-draw";

export const metadata: Metadata = {
  title: "Visit Us — UCLOTHIA Pune",
  description: "Visit the UCLOTHIA flagship salon in Pune for private appointments, fittings, and an intimate view of the collections.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <ParallaxImage
          src="/males-group-potrait.jpeg"
          alt="UCLOTHIA Flagship Salon"
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
                  The Flagship
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              Visit Us
            </h1>
            <p className="mt-8 md:mt-10 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-xl mx-auto leading-[1.7] font-light opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
              An intimate salon for private appointments, fittings, and an up-close view of the collections.
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
              The salon is not a store — it is a space for conversation, craft, and considered choices.
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

      {/* — Store Cards — */}
      <section className="py-20 md:py-32">
        <div className="container-luxury max-w-4xl">
          <Reveal variant="fade" className="mb-14 md:mb-20 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                Our Locations
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] mb-6">
              The <span className="italic text-[var(--color-muted)]">Salon</span>
            </h2>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <div className="space-y-12 md:space-y-20">
            {stores.map((store, i) => {
              const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(store.address)}`;
              return (
                <Reveal key={store.id} variant="fade">
                  <article className="group relative overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)]/30 backdrop-blur-sm transition-all duration-700 ease-[var(--ease-out)] hover:border-[var(--color-accent)]/50 hover:bg-[var(--color-surface)] hover:shadow-2xl hover:shadow-black/5">
                    {/* Gold hairline trace on hover */}
                    <span className="absolute top-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[var(--color-accent)] via-[#e2c882] to-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-full rounded-t-3xl" />

                    <div className="p-10 md:p-16 lg:p-20 text-center">
                      {/* Index */}
                      <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)] mb-8">
                        {String(i + 1).padStart(2, "0")} — India
                      </p>

                      {/* City name — large display */}
                      <h3 className="font-display text-4xl md:text-6xl text-[var(--color-text)] font-light leading-none tracking-[-0.02em] mb-3">
                        {store.city}
                      </h3>
                      <h4 className="font-display text-xl md:text-2xl text-[var(--color-text)] font-light leading-[1.2] mb-10">
                        {store.name}
                      </h4>

                      {/* Decorative separator */}
                      <div className="flex items-center justify-center gap-3 mb-10">
                        <span className="h-px w-8 bg-[var(--color-border-strong)]" />
                        <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
                        <span className="h-px w-8 bg-[var(--color-border-strong)]" />
                      </div>

                      {/* Editorial description */}
                      <p className="font-display text-lg md:text-xl font-light italic text-[var(--color-muted)] max-w-md mx-auto mb-12 leading-[1.5]">
                        {store.city === "Pune" && "Our first atelier. A private salon for fittings, consultations, and craft."}
                      </p>

                      {/* Contact details — refined grid */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-lg mx-auto mb-12 text-left">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
                            <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-muted)]">
                              Address
                            </p>
                          </div>
                          <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.6]">
                            {store.address}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
                            <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-muted)]">
                              Hours
                            </p>
                          </div>
                          <p className="text-[0.875rem] text-[var(--color-text-secondary)] leading-[1.6]">
                            {store.hours}
                          </p>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
                            <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-muted)]">
                              Phone
                            </p>
                          </div>
                          <a href={`tel:${store.phone}`} className="text-[0.875rem] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 leading-[1.6]">
                            {store.phone}
                          </a>
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/50" />
                            <p className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-muted)]">
                              Email
                            </p>
                          </div>
                          <a href={`mailto:${store.email}`} className="text-[0.875rem] text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors duration-300 leading-[1.6]">
                            {store.email}
                          </a>
                        </div>
                      </div>

                      {/* CTAs — bordered with hover inversion */}
                      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                          href={store.appointmentUrl}
                          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 border border-[var(--color-accent)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-background)] transition-all duration-500 group/btn"
                        >
                          Book Appointment
                          <span className="transition-transform duration-500 group-hover/btn:translate-x-1">→</span>
                        </Link>
                        <a
                          href={directionsUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-4 border border-[var(--color-border)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text-secondary)] hover:border-[var(--color-text)] hover:text-[var(--color-text)] transition-all duration-500"
                        >
                          Get Directions
                          <span>↗</span>
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>

          {/* Bottom CTA — private client */}
          <div className="mt-20 text-center">
            <div className="flex items-center justify-center gap-3 mb-6">
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              <span className="w-1 h-1 rotate-45 border border-[var(--color-accent)]/30" />
              <span className="h-px w-6 bg-[var(--color-border-strong)]" />
            </div>
            <p className="font-display text-lg md:text-xl font-light italic text-[var(--color-muted)] mb-8 max-w-md mx-auto leading-[1.5]">
              Prefer a private experience?
            </p>
            <Link
              href="/private-client"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500 group"
            >
              Explore Private Client
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
