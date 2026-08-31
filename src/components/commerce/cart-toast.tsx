"use client";

import { useEffect, useState } from "react";
import { useCartStore } from "@/lib/stores/cart-store";

export function CartToast() {
  const lastAdded = useCartStore((s) => s.lastAdded);
  const isOpen = useCartStore((s) => s.isOpen);
  const openCart = useCartStore((s) => s.openCart);
  const [dismissedKey, setDismissedKey] = useState<string | null>(null);

  const currentItemKey = lastAdded
    ? `${lastAdded.productId}-${lastAdded.size}-${lastAdded.color}`
    : null;
  const visible = currentItemKey !== null && dismissedKey !== currentItemKey && !isOpen;

  useEffect(() => {
    if (currentItemKey) {
      const timer = setTimeout(() => setDismissedKey(currentItemKey), 4000);
      return () => clearTimeout(timer);
    }
  }, [currentItemKey]);

  return (
    <>
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {lastAdded && `${lastAdded.name} added to your shopping bag`}
      </div>
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[var(--z-cart-drawer)] transition-all duration-[var(--duration-medium)] ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        role="status"
      >
        <div className="bg-[var(--color-text)] text-[var(--color-background)] px-6 py-4 flex items-center gap-4 shadow-lg">
          <div className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center flex-shrink-0">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-[0.625rem] tracking-[0.15em] uppercase text-white/60">
              Added to Bag
            </span>
            <span className="text-[0.8125rem] font-medium leading-snug">
              {lastAdded?.name}
            </span>
          </div>
          <button
            onClick={() => {
              setDismissedKey(currentItemKey);
              openCart();
            }}
            className="text-[0.6875rem] tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors border-b border-white/30 hover:border-white pb-0.5 ml-2"
          >
            View Bag
          </button>
        </div>
      </div>
    </>
  );
}
