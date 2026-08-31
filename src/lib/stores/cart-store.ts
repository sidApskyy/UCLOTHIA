"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem } from "@/lib/types";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  lastAdded: CartItem | null;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
  getSubtotal: () => number;
  getCount: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      lastAdded: null,

      addItem: (item) =>
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === item.productId &&
              i.size === item.size &&
              i.color === item.color
          );
          if (existing) {
            return {
              items: state.items.map((i) =>
                i === existing
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
              isOpen: true,
              lastAdded: item,
            };
          }
          return { items: [...state.items, item], isOpen: true, lastAdded: item };
        }),

      removeItem: (productId, size, color) =>
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.productId === productId && i.size === size && i.color === color)
          ),
        })),

      updateQuantity: (productId, size, color, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: Math.max(1, quantity) }
              : i
          ),
        })),

      clearCart: () => set({ items: [] }),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      getSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getCount: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "uclothia-cart",
      partialize: (s) => ({ items: s.items }),
      onRehydrateStorage: () => (state) => {
        if (state && !Array.isArray(state.items)) {
          state.items = [];
        }
      },
    }
  )
);
