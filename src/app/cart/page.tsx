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
        <p className="text-eyebrow-accent mb-4">Shopping Bag</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
          Your Bag
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-body text-[var(--color-muted)] mb-4">
              Your bag is empty.
            </p>
            <Link
              href="/new"
              className="text-[0.75rem] font-medium tracking-[0.15em] uppercase text-[var(--color-text)] link-underline"
            >
              Explore New Arrivals →
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12">
            {/* Items */}
            <div>
              <ul className="space-y-10 border-t border-[var(--color-border)] pt-10">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.size}-${item.color}`}
                    className="flex gap-6"
                  >
                    <Link
                      href={`/products/${item.productId}`}
                      className="relative w-28 h-36 flex-shrink-0 bg-[var(--color-surface-alt)]"
                    >
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="112px"
                        className="object-cover"
                      />
                    </Link>
                    <div className="flex-1 flex flex-col">
                      <Link
                        href={`/products/${item.productId}`}
                        className="text-[0.9375rem] font-medium leading-snug hover:text-[var(--color-accent-dark)] transition-colors"
                      >
                        {item.name}
                      </Link>
                      <p className="text-[0.8125rem] text-[var(--color-muted)] mt-1.5">
                        {item.color} — {item.size}
                      </p>
                      <p className="text-[0.9375rem] mt-3">
                        {formatPrice(item.price, "INR")}
                      </p>
                      <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.color, item.quantity - 1)
                            }
                            className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="text-[0.8125rem]">{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.productId, item.size, item.color, item.quantity + 1)
                            }
                            className="w-11 h-11 border border-[var(--color-border)] flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-text)] hover:border-[var(--color-text)] transition-colors"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.productId, item.size, item.color)}
                          className="text-[0.6875rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
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
                className="mt-10 text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Clear Bag
              </button>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-28 h-fit bg-[var(--color-surface-alt)] p-10">
              <h2 className="text-[0.8125rem] font-medium tracking-[0.15em] uppercase mb-8">
                Order Summary
              </h2>
              <div className="space-y-5 text-[0.875rem]">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal, "INR")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text-secondary)]">Shipping</span>
                  <span className="text-[var(--color-muted)]">Calculated at checkout</span>
                </div>
                <div className="border-t border-[var(--color-border)] pt-5 flex justify-between">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">{formatPrice(subtotal, "INR")}</span>
                </div>
              </div>
              <Link href="/checkout" className="btn-primary w-full mt-8">
                Proceed to Checkout
              </Link>
              <Link
                href="/new"
                className="block text-center mt-5 text-[0.75rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
              >
                Continue Shopping
              </Link>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
