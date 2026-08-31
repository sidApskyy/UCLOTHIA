"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { searchProducts } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";

const popularSearches = [
  "Lehenga", "Sherwani", "Saree", "Gown", "Bandhgala", "Silk", "Velvet", "Bridal",
];

const browseCategories = [
  { label: "Women", href: "/women", desc: "Sarees, lehengas, gowns & suits" },
  { label: "Men", href: "/men", desc: "Sherwanis, bandhgalas & kurta sets" },
  { label: "New Arrivals", href: "/new", desc: "Just landed this season" },
  { label: "Collections", href: "/collections", desc: "Explore all collections" },
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
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        <p className="text-eyebrow-accent mb-4">Search</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
          Find Your Piece
        </h1>

        <div className="max-w-xl mx-auto relative">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, collections, categories..."
            className="w-full border-b border-[var(--color-border)] py-4 text-[1.0625rem] bg-transparent focus:border-[var(--color-text)] outline-none transition-colors"
            autoFocus
            aria-label="Search products"
          />
        </div>

        {!query.trim() && (
          <div className="max-w-2xl mx-auto mt-16 space-y-12">
            <div className="text-center">
              <p className="text-eyebrow text-[var(--color-accent)] mb-5">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-3">
                {popularSearches.map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-4 py-2 text-[0.8125rem] border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-eyebrow text-[var(--color-accent)] mb-5 text-center">Browse by Category</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {browseCategories.map((cat) => (
                  <Link
                    key={cat.label}
                    href={cat.href}
                    className="group text-center p-6 border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors"
                  >
                    <p className="font-display text-lg font-light mb-1 group-hover:text-[var(--color-accent-dark)] transition-colors">
                      {cat.label}
                    </p>
                    <p className="text-[0.75rem] text-[var(--color-muted)]">{cat.desc}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {query.trim() && (
          <div className="mt-16">
            <p className="text-body text-center mb-10">
              {results.length} {results.length === 1 ? 'result' : 'results'} for &lsquo;{query}&rsquo;
            </p>
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {results.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-eyebrow text-[var(--color-accent)] mb-4">No Results</p>
                <p className="text-body text-[var(--color-text-secondary)] mb-8">
                  We couldn&rsquo;t find what you&rsquo;re looking for.
                </p>
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                  {popularSearches.slice(0, 4).map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 text-[0.8125rem] border border-[var(--color-border)] hover:border-[var(--color-text)] transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
                <Link
                  href="/collections"
                  className="editorial-link text-[var(--color-text)]"
                >
                  Explore the Collections <span className="editorial-link-arrow">→</span>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="pt-20 md:pt-24"><div className="container-luxury py-20 md:py-28" /></div>}>
      <SearchContent />
    </Suspense>
  );
}
