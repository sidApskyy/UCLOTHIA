import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { journalArticles, getArticleBySlug } from "@/lib/data/content";
import { products, getProductBySlug } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  return journalArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/journal/${article.slug}` },
    openGraph: {
      title: `${article.title} — UCLOTHIA Journal`,
      description: article.excerpt,
      type: "article",
      images: [{ url: article.heroImage, alt: article.heroImageAlt }],
    },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const relatedProducts = (article.relatedProductIds || [])
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as NonNullable<ReturnType<typeof getProductBySlug>>[];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `https://uclothia.com${article.heroImage}`,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "UCLOTHIA",
    },
    publisher: {
      "@type": "Organization",
      name: "UCLOTHIA",
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://uclothia.com" },
      { "@type": "ListItem", position: 2, name: "Journal", item: "https://uclothia.com/journal" },
      { "@type": "ListItem", position: 3, name: article.title, item: `https://uclothia.com/journal/${article.slug}` },
    ],
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <Image
          src={article.heroImage}
          alt={article.heroImageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-black/55" />
        <div className="absolute bottom-0 left-0 right-0 pb-12 md:pb-20">
          <div className="container-luxury max-w-3xl">
            <p className="text-eyebrow text-white/70 mb-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_0ms_forwards]">{article.category}</p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-white font-light leading-[1.05] tracking-[-0.01em] opacity-0 animate-[fadeUp_800ms_var(--ease-out)_100ms_forwards]">
              {article.title}
            </h1>
            <p className="text-meta text-white/60 mt-4 opacity-0 animate-[fadeUp_800ms_var(--ease-out)_200ms_forwards]">
              {formatDate(article.date)} · {article.readTime}
            </p>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-24 md:py-32">
        <div className="container-luxury max-w-2xl">
          <Reveal>
            <p className="text-body-lg mb-12 font-display text-xl md:text-2xl font-light leading-relaxed text-[var(--color-text)]">
              {article.excerpt}
            </p>
          </Reveal>

            {article.content.map((block, i) => {
              if (block.type === "heading") {
                return (
                  <Reveal key={i}>
                    <h2 className="font-display text-2xl md:text-3xl font-light mt-14 mb-8 text-[var(--color-text)]">
                      {block.text}
                    </h2>
                  </Reveal>
                );
              }
              if (block.type === "paragraph") {
                return (
                  <Reveal key={i}>
                    <p className="text-body-lg mb-8">{block.text}</p>
                  </Reveal>
                );
              }
              if (block.type === "image") {
                return (
                  <Reveal key={i}>
                    <figure className="my-12">
                      <div className="relative aspect-[3/2] overflow-hidden bg-[var(--color-surface-alt)]">
                        <Image
                          src={block.src || ""}
                          alt={block.alt || ""}
                          fill
                          sizes="(max-width: 768px) 100vw, 672px"
                          className="object-cover"
                        />
                      </div>
                      {block.alt && (
                        <figcaption className="text-meta mt-3 text-center">
                          {block.alt}
                        </figcaption>
                      )}
                    </figure>
                  </Reveal>
                );
              }
              if (block.type === "quote") {
                return (
                  <Reveal key={i}>
                    <blockquote className="my-16 md:my-24">
                      <p className="editorial-quote">
                        {block.text}
                      </p>
                    </blockquote>
                  </Reveal>
                );
              }
              return null;
            })}
        </div>
      </section>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section className="py-24 md:py-32 bg-[var(--color-surface-alt)]">
          <div className="container-luxury">
            <Reveal className="mb-14 md:mb-16">
              <p className="text-eyebrow-accent mb-3">Shop the Story</p>
              <h2 className="font-display text-3xl md:text-4xl font-light">
                Related Pieces
              </h2>
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {relatedProducts.map((product, i) => (
                <Reveal key={product.id} delay={i * 80}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back */}
      <div className="container-luxury py-20 md:py-28">
        <Link
          href="/journal"
          className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors link-underline"
        >
          ← Back to Journal
        </Link>
      </div>
    </article>
  );
}
