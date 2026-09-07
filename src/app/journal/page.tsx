import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { journalArticles } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { LineDraw } from "@/components/motion/line-draw";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "UCLOTHIA Journal — stories on craft, culture, fashion, and the house.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [featured, ...rest] = journalArticles;

  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[70vh] md:h-[85vh] w-full overflow-hidden">
        <ParallaxImage
          src={featured.heroImage}
          alt="UCLOTHIA Journal — Editorial"
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
                  The House Journal
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-light leading-[0.95] tracking-[-0.03em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              Journal
            </h1>
            <p className="mt-8 md:mt-10 text-[0.9375rem] md:text-[1.125rem] text-white/80 max-w-xl mx-auto leading-[1.7] font-light opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_400ms_forwards]">
              Stories on craft, culture, fashion, and the house — conversations with the artisans who shape UCLOTHIA.
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
              Every garment carries a story — woven by hands, worn with intention.
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

      {/* — Featured Article — */}
      <section className="py-20 md:py-32">
        <div className="container-luxury">
          <Reveal variant="fade" className="mb-14 md:mb-20 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                Featured Story
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
            <LineDraw width="4rem" className="mx-auto" />
          </Reveal>

          <Reveal variant="fade">
            <Link href={`/journal/${featured.slug}`} className="group block">
              <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-[var(--color-surface-alt)] image-editorial rounded-2xl mb-10">
                <Image
                  src={featured.heroImage}
                  alt={featured.heroImageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 100vw"
                  priority
                  className="object-cover transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-2xl pointer-events-none" />
                <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
              </div>
              <div className="max-w-2xl mx-auto text-center">
                <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)] mb-4">
                  {featured.category}
                </p>
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-6 group-hover:text-[var(--color-accent-dark)] transition-colors duration-500">
                  {featured.title}
                </h2>
                <p className="text-[0.9375rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] leading-[1.7] font-light mb-6">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-center gap-4">
                  <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                    {formatDate(featured.date)} · {featured.readTime}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 mt-8 text-[0.625rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] group-hover:text-[var(--color-accent-dark)] transition-colors duration-500">
                  Read Article
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* — Article Grid — */}
      <section className="py-20 md:py-32 bg-[var(--color-surface-alt)]">
        <div className="container-luxury">
          <Reveal variant="fade" className="mb-14 md:mb-20 text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="h-px w-8 bg-[var(--color-accent)]" />
              <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                More Stories
              </p>
              <span className="h-px w-8 bg-[var(--color-accent)]" />
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {rest.map((article, i) => (
              <Reveal key={article.id} delay={i * 100} className="relative">
                <Link href={`/journal/${article.slug}`} className="group block">
                  <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-surface)] image-editorial rounded-2xl mb-6">
                    <Image
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl pointer-events-none" />
                    <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                  </div>
                  <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)] mb-3">
                    {article.category}
                  </p>
                  <h3 className="font-display text-xl md:text-2xl font-light leading-snug mb-3 group-hover:text-[var(--color-accent-dark)] transition-colors duration-500">
                    {article.title}
                  </h3>
                  <p className="text-[0.8125rem] text-[var(--color-text-secondary)] leading-[1.6] line-clamp-2 mb-4">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className="text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                      {formatDate(article.date)} · {article.readTime}
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
