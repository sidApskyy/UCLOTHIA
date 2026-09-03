"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { Product, ProductVariant } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/lib/stores/cart-store";
import { useWishlistStore } from "@/lib/stores/wishlist-store";
import { SizeGuideModal } from "@/components/product/size-guide-modal";
import { flyToCart } from "@/components/product/fly-to-cart";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export function ProductDetail({ product }: { product: Product }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showDetails, setShowDetails] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notifySent, setNotifySent] = useState(false);
  const [stickyBarVisible, setStickyBarVisible] = useState(false);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const addToCartRef = useRef<HTMLButtonElement>(null);

  const addItem = useCartStore((s) => s.addItem);
  const wishlistToggle = useWishlistStore((s) => s.toggle);
  const inWishlist = useWishlistStore((s) => s.has(product.id));

  const handleAddToCart = () => {
    if (!selectedVariant) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0].src,
      size: selectedVariant.size,
      color: selectedVariant.color,
      quantity,
    });
    if (mainImageRef.current) {
      const imgEl = mainImageRef.current.querySelector("img") as HTMLElement;
      if (imgEl) flyToCart(imgEl, product.images[0].src);
    }
  };

  const uniqueColors = Array.from(
    new Map(product.variants.map((v) => [v.color, v])).values()
  );
  const sizesForColor = selectedVariant
    ? product.variants.filter((v) => v.color === selectedVariant.color)
    : product.variants;

  useEffect(() => {
    const onScroll = () => {
      setStickyBarVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="pt-12 md:pt-16 pb-20 md:pb-0">
      <div className="container-luxury">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: product.gender === "women" ? "Women" : "Men", href: product.gender === "women" ? "/women" : "/men" },
            { label: product.name },
          ]}
          className="mb-8"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 lg:gap-24">
          {/* Gallery */}
          <div className="flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnails — hidden when only 1 image */}
            {product.images.length > 1 && (
            <div className="flex md:flex-col gap-3 overflow-x-auto scrollbar-hide md:max-h-[600px]">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative flex-shrink-0 w-16 h-20 md:w-20 md:h-24 overflow-hidden border transition-colors ${
                    selectedImage === i
                      ? "border-[var(--color-text)]"
                      : "border-[var(--color-border)] hover:border-[var(--color-text)]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            )}

            {/* Main image */}
            <div ref={mainImageRef} className="flex-1 relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-alt)]">
              <Image
                src={product.images[selectedImage].src}
                alt={product.images[selectedImage].alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
                className="object-cover object-[center_25%]"
              />
            </div>
          </div>

          {/* Info */}
          <div className="md:py-8 md:sticky md:top-28 md:self-start">
            <p className="text-eyebrow text-[var(--color-text-secondary)] mb-4 capitalize">
              {product.category.replace(/-/g, " ")}
            </p>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] tracking-[-0.01em] mb-3">
              {product.name}
            </h1>
            <p className="text-[1.0625rem] font-medium tracking-wide mb-6">
              {formatPrice(product.price, product.currency)}
            </p>

            <p className="text-eyebrow text-[var(--color-accent)] mb-10">
              {product.availability}
            </p>

            {/* Color selection */}
            <div className="mb-8">
              <p className="text-eyebrow mb-4 text-[var(--color-text)]">
                Colour{selectedVariant && `: ${selectedVariant.color}`}
              </p>
              <div className="flex gap-3">
                {uniqueColors.map((variant) => (
                  <button
                    key={variant.color}
                    onClick={() =>
                      setSelectedVariant(
                        product.variants.find(
                          (v) => v.color === variant.color && v.inStock
                        ) || variant
                      )
                    }
                    className={`w-9 h-9 rounded-full border transition-all duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${
                      selectedVariant?.color === variant.color
                        ? "border-[var(--color-text)] ring-1 ring-[var(--color-text)] ring-offset-2 ring-offset-[var(--color-background)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-text)]"
                    }`}
                    style={{ backgroundColor: variant.colorHex }}
                    title={variant.color}
                    aria-label={`Select colour: ${variant.color}`}
                  />
                ))}
              </div>
            </div>

            {/* Size selection */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <p className="text-eyebrow text-[var(--color-text)]">
                  Size{selectedVariant?.size && `: ${selectedVariant.size}`}
                </p>
                <button
                  onClick={() => setShowSizeGuide(true)}
                  className="text-micro text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors link-underline"
                >
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {sizesForColor.map((variant) => (
                  <button
                    key={`${variant.size}-${variant.color}`}
                    onClick={() => setSelectedVariant(variant)}
                    disabled={!variant.inStock}
                    className={`min-w-[3.5rem] px-4 py-2.5 text-[0.75rem] border transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-background)] ${
                      !variant.inStock
                        ? "border-[var(--color-border)] text-[var(--color-muted)] line-through cursor-not-allowed"
                        : selectedVariant?.size === variant.size && selectedVariant?.color === variant.color
                        ? "border-[var(--color-text)] bg-[var(--color-text)] text-[var(--color-background)]"
                        : "border-[var(--color-border)] hover:border-[var(--color-text)]"
                    }`}
                  >
                    {variant.size}
                  </button>
                ))}
              </div>
              {sizesForColor.some((v) => !v.inStock) && (
                <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
                  {notifySent ? (
                    <p className="text-[0.8125rem] text-[var(--color-accent-dark)] flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                      Thank you — we will notify you when this size is back in stock.
                    </p>
                  ) : (
                    <form
                      onSubmit={(e) => { e.preventDefault(); setNotifySent(true); }}
                      className="space-y-3"
                    >
                      <p className="text-[0.75rem] text-[var(--color-muted)]">
                        Some sizes are unavailable. Get notified when they return.
                      </p>
                      <div className="flex gap-3">
                        <input
                          type="email"
                          id="notify-email"
                          name="email"
                          autoComplete="email"
                          required
                          value={notifyEmail}
                          onChange={(e) => setNotifyEmail(e.target.value)}
                          placeholder="Email address"
                          aria-label="Email for back-in-stock notification"
                          className="flex-1 border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.875rem]"
                        />
                        <button type="submit" className="btn-secondary px-5 py-2 text-[0.6875rem] whitespace-nowrap">
                          Notify Me
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>
            <div className="mb-10">
              <p className="text-eyebrow mb-3 text-[var(--color-text)]">Quantity</p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="text-[0.9375rem] font-medium w-8 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-10">
              <button
                ref={addToCartRef}
                onClick={handleAddToCart}
                disabled={!selectedVariant}
                className={`btn-primary flex-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)] ${
                  !selectedVariant ? "opacity-40 cursor-not-allowed" : ""
                }`}
              >
                {product.availability === "BESPOKE"
                  ? "Enquire for Bespoke"
                  : !selectedVariant
                  ? "Select a Size"
                  : "Add to Bag"}
              </button>
              <button
                onClick={() => wishlistToggle(product.id)}
                className="w-12 h-12 border border-[var(--color-border)] flex items-center justify-center hover:border-[var(--color-text)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-background)]"
                aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill={inWishlist ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Delivery / Service */}
            <div className="border-t border-[var(--color-border)] pt-6 mb-8">
              <dl className="space-y-4 text-[0.8125rem]">
                <div className="flex justify-between">
                  <dt className="text-[var(--color-text-secondary)]">Shipping</dt>
                  <dd className="text-[var(--color-text)] text-right max-w-[60%]">{product.shipping}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-[var(--color-text-secondary)]">Returns</dt>
                  <dd className="text-[var(--color-text)] text-right max-w-[60%]">{product.returns}</dd>
                </div>
              </dl>
            </div>

            {/* Details accordion */}
            <div className="border-t border-[var(--color-border)] pt-6">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-between w-full py-3 text-[0.8125rem] font-medium tracking-[0.1em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-text)] focus-visible:ring-offset-2"
                aria-expanded={showDetails}
              >
                Product Details
                <svg
                  className={`transition-transform duration-[var(--duration-fast)] ${
                    showDetails ? "rotate-180" : ""
                  }`}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {showDetails && (
                <dl className="space-y-5 py-4 text-[0.875rem] overflow-hidden transition-all duration-[var(--duration-medium)] ease-[var(--ease-out)]">
                  <div>
                    <dt className="text-eyebrow mb-1">Material</dt>
                    <dd className="text-[var(--color-text-secondary)]">{product.material}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow mb-1">Craft</dt>
                    <dd className="text-[var(--color-text-secondary)]">{product.craft}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow mb-1">Fit</dt>
                    <dd className="text-[var(--color-text-secondary)]">{product.fit}</dd>
                  </div>
                  <div>
                    <dt className="text-eyebrow mb-1">Description</dt>
                    <dd className="text-[var(--color-text-secondary)]">{product.description}</dd>
                  </div>
                </dl>
              )}
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal
        open={showSizeGuide}
        onClose={() => setShowSizeGuide(false)}
        gender={product.gender}
      />

      {/* Sticky mobile CTA */}
      <div
        className={`sticky-cart-bar ${stickyBarVisible ? "is-visible" : ""}`}
        style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      >
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[0.625rem] tracking-[0.1em] uppercase text-[var(--color-muted)] truncate">{product.name}</p>
            <p className="text-[0.875rem] font-medium">{formatPrice(product.price, product.currency)}</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!selectedVariant}
            className={`btn-primary flex-shrink-0 ${!selectedVariant ? "opacity-40" : ""}`}
          >
            {product.availability === "BESPOKE"
              ? "Enquire"
              : !selectedVariant
              ? "Select Size"
              : "Add to Bag"}
          </button>
        </div>
      </div>
    </div>
  );
}
