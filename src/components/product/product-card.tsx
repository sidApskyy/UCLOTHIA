"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useWishlistStore } from "@/lib/stores/wishlist-store";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const inWishlist = useWishlistStore((s) => s.has(product.id));

  const primaryImage = product.images.find((i) => i.type === "front") || product.images[0];
  const hoverImage = product.images.find((i) => i.type === "back") || product.images.find((i) => i.type === "editorial");

  return (
    <div
      className="group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-alt)]">
          {/* Primary image */}
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className={`object-cover object-[center_30%] transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
              hovered && hoverImage
                ? "opacity-0 scale-105"
                : hovered
                  ? "scale-110"
                  : "opacity-100 scale-100"
            }`}
            priority={priority}
          />
          {/* Hover image — crossfade with zoom */}
          {hoverImage && (
            <Image
              src={hoverImage.src}
              alt={hoverImage.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className={`object-cover transition-all duration-[var(--duration-slow)] ease-[var(--ease-out)] ${
                hovered ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            />
          )}

          {/* Subtle gradient overlay on hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/5 to-transparent transition-opacity duration-[var(--duration-medium)] ease-[var(--ease-out)] ${
              hovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Availability badge */}
          {product.availability !== "READY TO SHIP" && (
            <span className="absolute top-4 left-4 bg-[var(--color-surface)]/90 backdrop-blur-sm px-3 py-1.5 text-[0.625rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text)] z-10">
              {product.availability}
            </span>
          )}

          {/* Wishlist button — slides in from top on hover */}
          <button
            onClick={(e) => {
              e.preventDefault();
              wishlistToggle(product.id);
            }}
            className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-[var(--color-surface)]/90 backdrop-blur-sm transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] z-10 ${
              hovered || inWishlist
                ? "opacity-100 translate-y-0"
                : "opacity-80 translate-y-0 md:opacity-0 md:-translate-y-3"
            }`}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill={inWishlist ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="1.5"
              className={inWishlist ? "text-[var(--color-text)]" : "text-[var(--color-text-secondary)]"}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          </button>

          {/* Quick view bar — slides up from bottom on hover (desktop) */}
          <div
            className={`absolute bottom-0 left-0 right-0 bg-[var(--color-surface)]/95 backdrop-blur-md py-3.5 text-center transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)] hidden md:block z-10 ${
              hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}
          >
            <span className="text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)]">
              View Details
            </span>
          </div>
        </div>

        {/* Product info */}
        <div className={`mt-5 space-y-2 transition-transform duration-[var(--duration-medium)] ease-[var(--ease-out)] ${hovered ? "md:-translate-y-1" : ""}`}>
          <p className="text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
            {product.category.replace(/-/g, " ")}
          </p>
          <h3 className="text-[0.875rem] font-medium leading-snug text-[var(--color-text)]">
            {product.name}
          </h3>
          <p className="text-[0.875rem] text-[var(--color-text-secondary)] tracking-wide">
            {formatPrice(product.price, product.currency)}
          </p>
          <div className="flex items-center gap-1.5 pt-2">
            {product.variants.slice(0, 4).map((v, i) => (
              <span
                key={i}
                className="w-2.5 h-2.5 rounded-full border border-[var(--color-border)] transition-transform duration-[var(--duration-fast)] ease-[var(--ease-out)] hover:scale-150"
                style={{ backgroundColor: v.colorHex }}
                title={v.color}
              />
            ))}
            {product.variants.length > 4 && (
              <span className="text-[0.625rem] text-[var(--color-muted)]">
                +{product.variants.length - 4}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
