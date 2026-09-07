"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCartStore } from "@/lib/stores/cart-store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal } =
    useCartStore();

  const subtotal = getSubtotal();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-[var(--color-overlay)] backdrop-blur-sm z-[var(--z-cart-drawer)] transition-opacity duration-[var(--duration-medium)] ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-full max-w-md bg-[var(--color-surface)] z-[var(--z-cart-drawer)] flex flex-col transition-transform duration-[var(--duration-medium)] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "var(--ease-out)" }}
        aria-label="Shopping bag"
      >
        {/* Header */}
        <div className="relative px-6 py-6 border-b border-[var(--color-border)]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Bag icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="text-[var(--color-text)]">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <h2 className="text-[0.75rem] font-medium tracking-[0.2em] uppercase text-[var(--color-text)]">
                Shopping Bag
              </h2>
              <span className="text-[0.625rem] uppercase tracking-[0.15em] text-[var(--color-muted)] tabular-nums">
                {items.length} {items.length === 1 ? "Item" : "Items"}
              </span>
            </div>
            <button
              onClick={closeCart}
              className="w-9 h-9 flex items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text)] transition-all duration-300"
              aria-label="Close bag"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Subtle gold accent line at bottom of header */}
          <div className="absolute bottom-0 left-6 w-12 h-px bg-[var(--color-accent)]/40" />
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-5">
              {/* Decorative ornament */}
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="h-px w-6 bg-[var(--color-border-strong)]" />
                <span className="w-1.5 h-1.5 rotate-45 border border-[var(--color-accent)]/40" />
                <span className="h-px w-6 bg-[var(--color-border-strong)]" />
              </div>
              <p className="font-display text-2xl font-light italic text-[var(--color-text)]">
                Your bag is empty
              </p>
              <p className="text-[0.6875rem] text-[var(--color-muted)] max-w-[18rem] leading-[1.6]">
                Discover our latest arrivals and add your favourites to your bag.
              </p>
              {/* Gold accent separator */}
              <span className="h-px w-8 bg-[var(--color-accent)]/30 mt-2" />
              <Link
                href="/new"
                onClick={closeCart}
                className="group inline-flex flex-col items-center gap-2 pt-1"
              >
                <span className="font-display text-[0.9375rem] font-light tracking-[0.05em] text-[var(--color-text)] group-hover:text-[var(--color-accent-dark)] transition-colors duration-500">
                  Explore New Arrivals
                </span>
                <span className="h-px w-0 bg-[var(--color-text)] group-hover:w-full group-hover:bg-[var(--color-accent)] transition-all duration-500 ease-[var(--ease-out)]" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-0">
              {items.map((item, index) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className={`group flex gap-5 py-6 ${index !== 0 ? "border-t border-[var(--color-border)]" : ""}`}
                >
                  <div className="relative w-20 h-28 flex-shrink-0 bg-[var(--color-surface-alt)] overflow-hidden rounded">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover transition-transform duration-700 ease-[var(--ease-out)] group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="font-display text-[0.9375rem] font-medium leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[0.6875rem] uppercase tracking-[0.1em] text-[var(--color-muted)] mt-1.5">
                      {item.color} · {item.size}
                    </p>
                    <p className="text-[0.8125rem] font-medium mt-2">
                      {formatPrice(item.price, "INR")}
                    </p>
                    <div className="flex items-center justify-between mt-auto pt-3">
                      {/* Quantity selector */}
                      <div className="flex items-center border border-[var(--color-border)] rounded">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M5 12h14" />
                          </svg>
                        </button>
                        <span className="text-[0.75rem] min-w-[1.75rem] text-center tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M12 5v14M5 12h14" />
                          </svg>
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="text-[0.625rem] uppercase tracking-[0.15em] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                        aria-label={`Remove ${item.name} from bag`}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-[var(--color-border)] px-6 py-6 space-y-5">
            {/* Subtotal row */}
            <div className="flex items-center justify-between">
              <span className="text-[0.6875rem] uppercase tracking-[0.2em] text-[var(--color-muted)]">
                Subtotal
              </span>
              <span className="font-display text-lg font-medium tabular-nums">
                {formatPrice(subtotal, "INR")}
              </span>
            </div>

            {/* Complimentary shipping note */}
            {subtotal >= 100000 ? (
              <p className="text-[0.6875rem] text-[var(--color-accent-dark)] italic flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]" />
                You qualify for complimentary shipping
              </p>
            ) : (
              <p className="text-[0.6875rem] text-[var(--color-muted)]">
                Shipping and taxes calculated at checkout
              </p>
            )}

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[var(--color-text)] text-[var(--color-background)] text-[0.6875rem] font-medium tracking-[0.2em] uppercase hover:bg-[var(--color-accent-dark)] transition-colors duration-500 group"
            >
              Proceed to Checkout
              <span className="transition-transform duration-500 group-hover:translate-x-1">→</span>
            </Link>

            {/* Continue shopping */}
            <button
              onClick={closeCart}
              className="w-full text-center text-[0.625rem] uppercase tracking-[0.2em] text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
