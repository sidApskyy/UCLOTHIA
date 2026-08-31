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
        className={`fixed inset-0 bg-[var(--color-overlay)] z-[var(--z-cart-drawer)] transition-opacity duration-[var(--duration-medium)] ${
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
        <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--color-border)]">
          <h2 className="text-[0.8125rem] font-medium tracking-[0.15em] uppercase">
            Shopping Bag ({items.length})
          </h2>
          <button
            onClick={closeCart}
            className="p-2.5 -mr-2.5 text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Close bag"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <p className="text-body text-[var(--color-muted)]">
                Your bag is empty.
              </p>
              <Link
                href="/new"
                onClick={closeCart}
                className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text)] link-underline"
              >
                Explore New Arrivals
              </Link>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-4"
                >
                  <div className="relative w-20 h-28 flex-shrink-0 bg-[var(--color-surface-alt)]">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-[0.8125rem] font-medium leading-snug">
                      {item.name}
                    </h3>
                    <p className="text-[0.75rem] text-[var(--color-muted)] mt-1">
                      {item.color} — {item.size}
                    </p>
                    <p className="text-[0.8125rem] mt-2">
                      {formatPrice(item.price, "INR")}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity - 1
                            )
                          }
                          className="w-11 h-11 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="text-[0.75rem] min-w-[1.5rem] text-center">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.size,
                              item.color,
                              item.quantity + 1
                            )
                          }
                          className="w-11 h-11 flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="text-[0.6875rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors py-1"
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
          <div className="border-t border-[var(--color-border)] px-6 py-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[0.8125rem] tracking-[0.1em] uppercase">
                Subtotal
              </span>
              <span className="text-[0.9375rem] font-medium">
                {formatPrice(subtotal, "INR")}
              </span>
            </div>
            <p className="text-[0.75rem] text-[var(--color-muted)]">
              Shipping and taxes calculated at checkout.
            </p>
            {subtotal >= 100000 && (
              <p className="text-[0.6875rem] text-[var(--color-accent-dark)] italic">
                You qualify for complimentary shipping.
              </p>
            )}
            <Link
              href="/checkout"
              onClick={closeCart}
              className="btn-primary w-full"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="w-full text-center text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
