"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";
import { Reveal } from "@/components/motion/reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const clearWishlist = useWishlistStore((s) => s.clear);
  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-[var(--color-accent)]" />
            <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
              Wishlist
            </p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
            Your Saved <span className="italic text-[var(--color-muted)]">Pieces</span>
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          /* Empty state — editorial luxury */
          <div className="text-center py-24 md:py-32 max-w-lg mx-auto">
            {/* Heart icon */}
            <div className="flex items-center justify-center mb-10">
              <div className="relative">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--color-accent)]/30">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
            </div>

            {/* Decorative ornament */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            </div>

            <p className="font-display text-3xl md:text-4xl font-light italic text-[var(--color-text)] mb-5">
              No saved pieces yet
            </p>
            <p className="text-[0.8125rem] text-[var(--color-muted)] leading-[1.7] mb-12 max-w-sm mx-auto">
              Tap the heart icon on any product to save it here for later. Your curated selection will appear on this page.
            </p>

            {/* Browse categories */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-12">
              {[
                { label: "Women", href: "/women" },
                { label: "Men", href: "/men" },
                { label: "Collections", href: "/collections" },
                { label: "New Arrivals", href: "/new" },
              ].map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="group inline-flex flex-col items-center gap-1.5"
                >
                  <span className="font-display text-[0.9375rem] font-light tracking-[0.05em] text-[var(--color-text)] group-hover:text-[var(--color-accent-dark)] transition-colors duration-500">
                    {cat.label}
                  </span>
                  <span className="h-px w-0 bg-[var(--color-text)] group-hover:w-full group-hover:bg-[var(--color-accent)] transition-all duration-500 ease-[var(--ease-out)]" />
                </Link>
              ))}
            </div>

            {/* Decorative diamond ornament */}
            <div className="flex items-center justify-center gap-3">
              <span className="h-px w-6 bg-[var(--color-border)]" />
              <span className="w-1 h-1 rotate-45 border border-[var(--color-accent)]/20" />
              <span className="h-px w-6 bg-[var(--color-border)]" />
            </div>
          </div>
        ) : (
          <>
            {/* Summary bar */}
            <Reveal variant="fade" className="flex items-center justify-between pb-8 mb-12 border-b border-[var(--color-border)]">
              <div className="flex items-center gap-4">
                <span className="text-[0.625rem] uppercase tracking-[0.25em] font-medium text-[var(--color-muted)]">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? "Piece" : "Pieces"}
                </span>
                {/* Gold dot separator */}
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]/40" />
                <span className="text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                  Saved
                </span>
              </div>
              <button
                onClick={clearWishlist}
                className="group inline-flex items-center gap-2 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                <span className="h-px w-0 bg-[var(--color-text)] transition-all duration-300 ease-[var(--ease-out)] group-hover:w-4" />
                Clear All
              </button>
            </Reveal>

            {/* Product grid */}
            <StaggerGroup className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
              {wishlistProducts.map((product, i) => (
                <ProductCard key={product.id} product={product} priority={i < 4} />
              ))}
            </StaggerGroup>

            {/* Bottom CTA — continue shopping */}
            <div className="mt-20 text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="h-px w-6 bg-[var(--color-border-strong)]" />
                <span className="w-1 h-1 rotate-45 border border-[var(--color-accent)]/30" />
                <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              </div>
              <Link
                href="/women"
                className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500 group"
              >
                Continue Shopping
                <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
