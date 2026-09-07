"use client";

import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, clearCart } = useCartStore();
  const subtotal = getSubtotal();

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-6 bg-[var(--color-accent)]" />
            <p className="text-[0.625rem] uppercase tracking-[0.3em] font-medium text-[var(--color-accent)]">
              Shopping Bag
            </p>
          </div>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
            Your <span className="italic text-[var(--color-muted)]">Bag</span>
          </h1>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 md:py-32">
            {/* Decorative ornament */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
              <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
              <span className="h-px w-8 bg-[var(--color-border-strong)]" />
            </div>
            <p className="font-display text-2xl md:text-3xl font-light italic text-[var(--color-muted)] mb-8">
              Your bag is empty
            </p>
            <Link
              href="/new"
              className="inline-flex items-center gap-3 px-10 py-4 border border-[var(--color-text)] text-[0.6875rem] font-medium tracking-[0.25em] uppercase text-[var(--color-text)] hover:bg-[var(--color-text)] hover:text-[var(--color-background)] transition-all duration-500 group"
            >
              Explore New Arrivals
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Items */}
            <div>
              <ul className="space-y-0 border-t border-[var(--color-border)]">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="group flex gap-6 py-8 border-b border-[var(--color-border)]"
                  >
                    <Link
                      href={`/products/${item.productId}`}
                      className="relative w-28 h-36 flex-shrink-0 bg-[var(--color-surface-alt)] overflow-hidden"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <Link
                        href={`/products/${item.productId}`}
                        className="font-display text-lg font-medium leading-snug hover:text-[var(--color-accent-dark)] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[0.6875rem] uppercase tracking-[0.15em] text-[var(--color-muted)] mt-2">
                        {item.color} · {item.size}
                      </p>
                      <p className="text-[0.9375rem] font-medium mt-3">
                        {formatPrice(item.price, "INR")}
                      </p>
                      <div className="flex items-center justify-between mt-auto pt-4">
                        {/* Quantity selector — bordered pill */}
                        <div className="flex items-center border border-[var(--color-border)] rounded">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                            }
                            className="w-9 h-9 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M5 12h14" />
                            </svg>
                          </button>
                          <span className="text-[0.8125rem] min-w-[2rem] text-center tabular-nums">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                            }
                            className="w-9 h-9 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                            aria-label="Increase quantity"
                          >
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M12 5v14M5 12h14" />
                            </svg>
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <button
                onClick={clearCart}
                className="mt-8 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Clear Bag
              </button>
            </div>

            {/* Summary — luxury card */}
            <aside className="lg:sticky lg:top-28 h-fit">
              <div className="relative bg-[var(--color-surface-alt)] p-10 rounded-2xl overflow-hidden">
                {/* Gold corner accents */}
                <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[var(--color-accent)]/30 rounded-tl-2xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[var(--color-accent)]/30 rounded-tr-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[var(--color-accent)]/30 rounded-bl-2xl pointer-events-none" />
                <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[var(--color-accent)]/30 rounded-br-2xl pointer-events-none" />

                {/* Header */}
                <div className="flex items-center gap-3 mb-8">
                  <span className="h-px w-4 bg-[var(--color-accent)]" />
                  <h2 className="text-[0.6875rem] font-medium tracking-[0.25em] uppercase">
                    Order Summary
                  </h2>
                </div>

                <div className="space-y-5 text-[0.875rem]">
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                    <span className="font-medium tabular-nums">{formatPrice(subtotal, "INR")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[var(--color-text-secondary)]">Shipping</span>
                    <span className="text-[var(--color-muted)]">Calculated at checkout</span>
                  </div>

                  {/* Complimentary shipping note */}
                  {subtotal >= 100000 && (
                    <p className="text-[0.6875rem] text-[var(--color-accent-dark)] italic flex items-center gap-2 pt-1">
                      <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                      Complimentary shipping unlocked
                    </p>
                  )}

                  <div className="border-t border-[var(--color-border)] pt-5 flex justify-between items-center">
                    <span className="font-display text-base font-medium">Total</span>
                    <span className="font-display text-xl font-medium tabular-nums">{formatPrice(subtotal, "INR")}</span>
                  </div>
                </div>

                {/* Checkout button */}
                <Link
                  href="/checkout"
                  className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-text)] text-[var(--color-background)] text-[0.6875rem] font-medium tracking-[0.2em] uppercase hover:bg-[var(--color-accent-dark)] transition-colors duration-500 group mt-8"
                >
                  Proceed to Checkout
                  <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
                </Link>

                {/* Continue shopping */}
                <Link
                  href="/new"
                  className="block text-center mt-5 text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                >
                  Continue Shopping
                </Link>

                {/* Trust badges */}
                <div className="mt-8 pt-6 border-t border-[var(--color-border)] flex items-center justify-center gap-6 text-[0.625rem] uppercase tracking-[0.15em] text-[var(--color-muted)]">
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--color-accent)]/60">
                      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z M19 10v2a7 7 0 0 1-14 0v-2 M12 19v4 M8 23h8" />
                    </svg>
                    Secure
                  </span>
                  <span className="flex items-center gap-2">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-[var(--color-accent)]/60">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10" />
                    </svg>
                    White-Glove
                  </span>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
