"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { Reveal } from "@/components/motion/reveal";
import { ParallaxImage } from "@/components/motion/parallax-image";
import { LineDraw } from "@/components/motion/line-draw";

const popularSearches = [
  "Lehenga", "Sherwani", "Saree", "Gown", "Bandhgala", "Silk", "Velvet", "Bridal",
];

const browseCategories = [
  { label: "Women", href: "/women", desc: "Sarees, lehengas, gowns & suits", img: "/women-single-potrait.jpeg" },
  { label: "Men", href: "/men", desc: "Sherwanis, bandhgalas & kurta sets", img: "/male-single-potrait.jpeg" },
  { label: "New Arrivals", href: "/new", desc: "Just landed this season", img: "/whatsapp-image-2.jpeg" },
  { label: "Collections", href: "/collections", desc: "Explore all collections", img: "/women-single-potrait-2.jpeg" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(urlQuery);
  const [prevUrlQuery, setPrevUrlQuery] = useState(urlQuery);

  if (urlQuery !== prevUrlQuery) {
    setPrevUrlQuery(urlQuery);
    setQuery(urlQuery);
  }

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchProducts(query);
  }, [query]);

  return (
    <>
      {/* — Parallax Hero — */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <ParallaxImage
          src="/og-campaign.jpg"
          alt="UCLOTHIA Search"
          priority
          sizes="100vw"
          objectPosition="center 35%"
          speed={0.25}
          className="ken-burns-intro"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/65 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-black/15 pointer-events-none" />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-[3]">
          <div className="container-luxury">
            <div className="opacity-0 animate-[fade-in-up_800ms_cubic-bezier(0.16,1,0.3,1)_forwards]">
              <div className="flex items-center justify-center gap-4 mb-6 md:mb-8">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] md:text-[0.75rem] uppercase tracking-[0.3em] font-medium text-white/70">
                  Search the Collection
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white font-light leading-[0.95] tracking-[-0.03em] opacity-0 animate-[fade-in-up_1000ms_cubic-bezier(0.16,1,0.3,1)_150ms_forwards]">
              Find Your <span className="italic">Piece</span>
            </h1>
            <p className="mt-6 md:mt-8 text-[0.9375rem] md:text-[1.0625rem] text-white/70 max-w-lg mx-auto leading-[1.7] font-light opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_300ms_forwards]">
              Search across our collections — couture, ready-to-wear, and accessories.
            </p>

            {/* Search input — glass-morphism container overlaid on hero */}
            <form
              onSubmit={(e) => e.preventDefault()}
              className="max-w-lg mx-auto mt-10 md:mt-12 relative opacity-0 animate-[fade-in_1000ms_cubic-bezier(0.16,1,0.3,1)_500ms_forwards]"
              role="search"
            >
              <div className="relative flex items-center bg-white/[0.06] backdrop-blur-md border border-white/15 rounded-full pl-6 pr-3 py-1.5 transition-all duration-500 focus-within:border-[var(--color-accent)]/60 focus-within:bg-white/[0.1]">
                <span className="text-white/40 pointer-events-none mr-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="11" cy="11" r="7" />
                    <path d="m21 21-4.3-4.3" />
                  </svg>
                </span>
                <input
                  type="search"
                  id="search-input"
                  name="q"
                  autoComplete="off"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, collections, categories..."
                  className="w-full bg-transparent py-3 text-[1rem] outline-none transition-colors duration-500 text-left text-white placeholder:text-white/35"
                  autoFocus
                  aria-label="Search products"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="shrink-0 ml-2 p-2 text-white/40 hover:text-white transition-colors duration-300"
                    aria-label="Clear search"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] hidden md:flex flex-col items-center gap-2">
          <span className="text-[0.625rem] uppercase tracking-[0.3em] text-white/40">Scroll</span>
          <span className="w-px h-12 bg-white/20 scroll-indicator" />
        </div>
      </section>

      {/* — Editorial Quote Band — */}
      {!query.trim() && (
        <section className="py-16 md:py-24 overflow-hidden bg-[var(--color-surface-alt)]">
          <div className="container-luxury max-w-3xl text-center">
            <Reveal variant="fade">
              <span className="block font-display text-7xl md:text-8xl leading-none text-[var(--color-accent)]/30 mb-4 select-none">&ldquo;</span>
              <p className="font-display text-2xl md:text-3xl lg:text-4xl font-light italic leading-[1.3] tracking-[-0.01em] text-[var(--color-text)]">
                Every piece tells a story — find yours.
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
      )}

      {/* — Popular Searches — */}
      {!query.trim() && (
        <section className="py-24 md:py-40">
          <div className="container-luxury max-w-5xl">
            <Reveal variant="fade" className="text-center">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                  Popular Searches
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-light tracking-[-0.02em] mb-8">
                Trending <span className="italic text-[var(--color-muted)]">Now</span>
              </h2>
              <LineDraw width="3rem" className="mx-auto mb-14" />
              <div className="flex flex-wrap justify-center gap-3">
                {popularSearches.map((term, i) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="group relative px-6 py-3 text-[0.8125rem] font-medium tracking-[0.05em] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5 transition-all duration-500 ease-[var(--ease-out)] rounded-full overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-[0.625rem] text-[var(--color-muted)] group-hover:text-[var(--color-accent)]/60 transition-colors duration-500">{String(i + 1).padStart(2, "0")}</span>
                      {term}
                    </span>
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent transition-all duration-700 ease-[var(--ease-out)] group-hover:w-full" />
                  </button>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* — Browse by Category — */}
      {!query.trim() && (
        <section className="pb-24 md:pb-40">
          <div className="container-luxury max-w-5xl">
            <Reveal variant="fade" className="text-center mb-16 md:mb-20">
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                  Browse by Category
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-light tracking-[-0.02em] mb-8">
                Explore the <span className="italic text-[var(--color-muted)]">House</span>
              </h2>
              <LineDraw width="4rem" className="mx-auto" />
            </Reveal>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {browseCategories.map((cat, i) => (
                <Reveal key={cat.label} variant="fade" delay={i * 80}>
                  <Link
                    href={cat.href}
                    className="group relative block overflow-hidden rounded-2xl bg-[var(--color-surface-alt)]"
                  >
                    <div className="relative aspect-[3/4] overflow-hidden">
                      <Image
                        src={cat.img}
                        alt={cat.label}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover object-[center_30%] transition-all duration-[var(--duration-cinematic)] ease-[var(--ease-out)] group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 group-hover:from-black/80" />
                      {/* Border trace on hover */}
                      <div className="absolute inset-0 rounded-2xl border border-white/10 group-hover:border-[var(--color-accent)]/50 transition-colors duration-700 pointer-events-none z-10" />
                      {/* Index number */}
                      <div className="absolute top-5 left-5 md:top-6 md:left-6 flex items-center gap-3 z-10">
                        <span className="text-[0.6875rem] font-medium tracking-[0.2em] text-white/40 transition-all duration-500 group-hover:text-[var(--color-accent)] group-hover:tracking-[0.25em]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="h-px w-0 bg-[var(--color-accent)] transition-all duration-700 ease-[var(--ease-out)] group-hover:w-8" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 text-white z-10">
                      <p className="font-display text-lg md:text-xl font-light mb-1 group-hover:text-[var(--color-accent)] transition-colors duration-500">
                        {cat.label}
                      </p>
                      <p className="text-[0.6875rem] md:text-[0.75rem] text-white/55 leading-[1.5]">
                        {cat.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 mt-3 text-[0.625rem] font-medium tracking-[0.25em] uppercase text-white/0 group-hover:text-white/70 transition-all duration-500">
                        Explore
                        <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* — Search results — */}
      {query.trim() && (
        <section className="py-20 md:py-28">
          <div className="container-luxury">
            <Reveal variant="fade" className="text-center mb-12 md:mb-16">
              <div className="flex items-center justify-center gap-4 mb-6">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                  {results.length} {results.length === 1 ? "result" : "results"}
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>
              <p className="font-display text-3xl md:text-5xl font-light text-[var(--color-text)] tracking-[-0.02em]">
                for &lsquo;{query}&rsquo;
              </p>
              <LineDraw width="3rem" className="mx-auto mt-6" />
              <button
                onClick={() => setQuery("")}
                className="mt-6 inline-flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.25em] font-medium text-[var(--color-muted)] hover:text-[var(--color-accent)] transition-colors duration-300"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Clear Search
              </button>
            </Reveal>

            {results.length > 0 ? (
              <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {results.map((product, i) => (
                  <ProductCard key={product.id} product={product} priority={i < 4} />
                ))}
              </StaggerGroup>
            ) : (
              <Reveal variant="fade">
                <div className="text-center py-24 md:py-32 max-w-lg mx-auto">
                  {/* Large decorative ornament */}
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <span className="h-px w-12 bg-[var(--color-border-strong)]" />
                    <span className="w-2 h-2 rotate-45 border border-[var(--color-accent)]/40" />
                    <span className="h-px w-12 bg-[var(--color-border-strong)]" />
                  </div>
                  <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)] mb-6">
                    No Results
                  </p>
                  <p className="font-display text-3xl md:text-4xl font-light text-[var(--color-text)] mb-2">
                    We couldn&rsquo;t find
                  </p>
                  <p className="font-display text-3xl md:text-4xl font-light italic text-[var(--color-muted)] mb-8">
                    that piece
                  </p>
                  <div className="flex items-center justify-center gap-3 mb-10">
                    <span className="h-px w-6 bg-[var(--color-border-strong)]" />
                    <span className="w-1 h-1 rotate-45 border border-[var(--color-accent)]/30" />
                    <span className="h-px w-6 bg-[var(--color-border-strong)]" />
                  </div>
                  <p className="text-[0.875rem] text-[var(--color-muted)] mb-12 leading-[1.7] font-light">
                    Try a different search term, or explore our collections.
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {popularSearches.slice(0, 4).map((term) => (
                      <button
                        key={term}
                        onClick={() => setQuery(term)}
                        className="px-5 py-2.5 text-[0.8125rem] font-medium tracking-[0.05em] border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:-translate-y-0.5 transition-all duration-500 ease-[var(--ease-out)] rounded-full"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                  <Link
                    href="/collections"
                    className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500 group"
                  >
                    Explore Collections
                    <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* — Bottom CTA — */}
      {!query.trim() && (
        <section className="py-28 md:py-44 bg-[var(--color-surface-alt)] overflow-hidden">
          <div className="container-luxury max-w-3xl text-center">
            <Reveal variant="fade">
              {/* Gold accent eyebrow */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <span className="h-px w-8 bg-[var(--color-accent)]" />
                <p className="text-[0.6875rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
                  Need Assistance
                </p>
                <span className="h-px w-8 bg-[var(--color-accent)]" />
              </div>

              {/* Heading */}
              <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] text-[var(--color-text)] mb-6">
                Can&rsquo;t find what<br className="hidden md:block" />
                you&rsquo;re <span className="italic text-[var(--color-muted)]">looking for?</span>
              </h2>
              <LineDraw width="4rem" className="mx-auto mb-10" />

              {/* Description */}
              <p className="text-[1rem] md:text-[1.0625rem] text-[var(--color-text-secondary)] max-w-xl mx-auto leading-[1.8] font-light mb-14">
                Explore our full collection or speak with a private client advisor for a bespoke, one-on-one consultation.
              </p>

              {/* Dual CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
                <Link
                  href="/collections"
                  className="inline-flex items-center gap-3 px-12 py-4 bg-[var(--color-text)] text-[var(--color-background)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase hover:bg-[var(--color-accent-dark)] transition-all duration-500 group rounded-full"
                >
                  Explore Collections
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
                <Link
                  href="/private-client"
                  className="inline-flex items-center gap-3 px-12 py-4 border border-[var(--color-border-strong)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text-secondary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-500 group rounded-full"
                >
                  Private Client
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>
              </div>

              {/* Bottom decorative ornament */}
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[var(--color-border-strong)]" />
                <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/30" />
                <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </>
  );
}

function SearchFallback() {
  return (
    <>
      <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <div className="skeleton absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="container-luxury">
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="skeleton h-px w-8" aria-hidden="true" />
              <div className="skeleton h-3 w-24" aria-hidden="true" />
              <span className="skeleton h-px w-8" aria-hidden="true" />
            </div>
            <div className="skeleton h-14 md:h-16 w-64 mx-auto mb-10" aria-hidden="true" />
            <div className="skeleton h-12 w-full max-w-lg mx-auto" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="container-luxury py-20 md:py-32 max-w-4xl">
        <div className="text-center mb-20">
          <div className="skeleton h-3 w-32 mx-auto mb-8" aria-hidden="true" />
          <div className="flex flex-wrap justify-center gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="skeleton h-10 w-24 rounded-full" aria-hidden="true" />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchFallback />}>
      <SearchContent />
    </Suspense>
  );
}
