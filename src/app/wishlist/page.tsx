"use client";

import Link from "next/link";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { products } from "@/lib/data/products";
import { ProductCard } from "@/components/product/product-card";

export default function WishlistPage() {
  const productIds = useWishlistStore((s) => s.productIds);
  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        <p className="text-eyebrow-accent mb-4">Wishlist</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
          Your Saved Pieces
        </h1>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-24 max-w-md mx-auto">
            <p className="text-eyebrow text-[var(--color-accent)] mb-4">Empty</p>
            <p className="font-display text-xl md:text-2xl font-light mb-3">
              No saved pieces yet.
            </p>
            <p className="text-body text-[var(--color-muted)] mb-10">
              Tap the heart icon on any product to save it here.
            </p>
            <Link
              href="/new"
              className="editorial-link text-[var(--color-text)]"
            >
              Explore New Arrivals <span className="editorial-link-arrow">→</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
            {wishlistProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
