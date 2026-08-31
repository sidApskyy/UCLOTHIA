import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { journalArticles } from "@/lib/data/content";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Journal",
  description: "UCLOTHIA Journal — stories on craft, culture, fashion, and the house.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  const [featured, ...rest] = journalArticles;

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        <p className="text-eyebrow-accent mb-4">Journal</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
          Stories from the House
        </h1>
      </div>

      {/* Featured article */}
      <div className="container-luxury pb-20 md:pb-28">
        <Reveal>
          <Link href={`/journal/${featured.slug}`} className="group block">
            <div className="relative aspect-[16/9] md:aspect-[2/1] overflow-hidden bg-[var(--color-surface-alt)] image-editorial mb-10">
              <Image
                src={featured.heroImage}
                alt={featured.heroImageAlt}
                fill
                sizes="(max-width: 768px) 100vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <div className="max-w-2xl">
              <p className="text-eyebrow-accent mb-3">{featured.category}</p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] mb-4 group-hover:text-[var(--color-accent-dark)] transition-colors">
                {featured.title}
              </h2>
              <p className="text-body-lg">{featured.excerpt}</p>
              <p className="text-meta mt-4">
                {formatDate(featured.date)} · {featured.readTime}
              </p>
            </div>
          </Link>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="container-luxury pb-24 md:pb-40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 border-t border-[var(--color-border)] pt-20">
          {rest.map((article, i) => (
            <Reveal key={article.id} delay={i * 100}>
              <Link href={`/journal/${article.slug}`} className="group block">
                <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-surface-alt)] image-editorial mb-6">
                  <Image
                    src={article.heroImage}
                    alt={article.heroImageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <p className="text-eyebrow-accent mb-2">{article.category}</p>
                <h3 className="font-display text-xl md:text-2xl font-light leading-snug mb-2 group-hover:text-[var(--color-accent-dark)] transition-colors">
                  {article.title}
                </h3>
                <p className="text-body text-[0.8125rem] line-clamp-2">{article.excerpt}</p>
                <p className="text-meta mt-3">{formatDate(article.date)} · {article.readTime}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
