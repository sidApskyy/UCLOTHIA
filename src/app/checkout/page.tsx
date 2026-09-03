"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useTransition } from "react";
import { useCartStore } from "@/lib/stores/cart-store";
import {
  formatPrice,
  VALID_COUPONS,
  SHIPPING_THRESHOLD,
  calculateDiscount,
  calculateShipping,
} from "@/lib/utils";
import { submitCheckout } from "@/app/actions/checkout";

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponError, setCouponError] = useState("");
  const [isGuest, setIsGuest] = useState(true);
  const [serverErrors, setServerErrors] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const subtotal = getSubtotal();

  const discount = appliedCoupon ? calculateDiscount(subtotal, VALID_COUPONS[appliedCoupon]) : 0;
  const afterDiscount = subtotal - discount;
  const shipping = calculateShipping(afterDiscount);
  const total = afterDiscount + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (VALID_COUPONS[code]) {
      setAppliedCoupon(code);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code.");
      setAppliedCoupon(null);
    }
  };

  if (placed) {
    return (
      <div className="pt-8">
        <div className="container-luxury py-32 text-center max-w-md mx-auto">
          <div className="w-14 h-14 mx-auto mb-8 border border-[var(--color-text)] rounded-full flex items-center justify-center">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <p className="text-eyebrow text-[var(--color-accent)] mb-4">Request Received</p>
          <h1 className="font-display text-3xl md:text-4xl font-light mb-4">
            Thank you for your request
          </h1>
          <p className="text-body mb-2">
            Your request reference is
          </p>
          <p className="font-display text-xl font-medium mb-6 tracking-wide">{orderNumber}</p>
          <p className="text-body mb-8">
            Our team will contact you within 48 hours to confirm details, arrange payment,
            and begin processing your order.
          </p>
          <Link href="/new" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="pt-8">
        <div className="container-luxury py-32 text-center">
          <h1 className="font-display text-3xl md:text-4xl font-light mb-4">
            Your bag is empty
          </h1>
          <p className="text-body text-[var(--color-muted)] mb-6">
            Add pieces to your bag before checking out.
          </p>
          <Link href="/new" className="btn-primary">
            Explore New Arrivals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 md:pt-32">
      <div className="container-luxury py-20 md:py-28">
        <p className="text-eyebrow-accent mb-4">Checkout</p>
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em]">
          Complete Your Order
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const cartItems = items.map((item) => ({
                productId: item.productId,
                size: item.size,
                color: item.color,
                quantity: item.quantity,
              }));
              setServerErrors([]);
              startTransition(async () => {
                const result = await submitCheckout(formData, cartItems, appliedCoupon || undefined);
                if (result.success) {
                  setOrderNumber(result.reference || "");
                  setPlaced(true);
                  clearCart();
                } else {
                  if (result.serverErrors) {
                    setServerErrors(result.serverErrors);
                  }
                }
              });
            }}
            className="space-y-12"
          >
            {/* Checkout mode */}
            <section>
              <div className="flex gap-8 border-b border-[var(--color-border)] pb-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="checkout-mode"
                    autoComplete="off"
                    checked={isGuest}
                    onChange={() => setIsGuest(true)}
                    className="accent-[var(--color-text)]"
                  />
                  <span className="text-[0.875rem]">Guest Checkout</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="checkout-mode"
                    autoComplete="off"
                    onChange={() => setIsGuest(false)}
                    className="accent-[var(--color-text)]"
                  />
                  <span className="text-[0.875rem]">Sign In</span>
                </label>
              </div>
              {isGuest && (
                <p className="text-[0.75rem] text-[var(--color-muted)] mt-4">
                  Checkout as a guest — no account needed. You can create one after placing your order.
                </p>
              )}
            </section>

            <section>
              <h2 className="text-[0.8125rem] font-medium tracking-[0.15em] uppercase mb-8">
                Contact Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="checkout-first-name" className="text-eyebrow block mb-2 text-[var(--color-text)]">First Name</label>
                  <input id="checkout-first-name" name="firstName" type="text" required autoComplete="given-name" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                </div>
                <div>
                  <label htmlFor="checkout-last-name" className="text-eyebrow block mb-2 text-[var(--color-text)]">Last Name</label>
                  <input id="checkout-last-name" name="lastName" type="text" required autoComplete="family-name" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                </div>
                <div>
                  <label htmlFor="checkout-email" className="text-eyebrow block mb-2 text-[var(--color-text)]">Email</label>
                  <input id="checkout-email" name="email" type="email" required autoComplete="email" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                </div>
                <div>
                  <label htmlFor="checkout-phone" className="text-eyebrow block mb-2 text-[var(--color-text)]">Phone</label>
                  <input id="checkout-phone" name="phone" type="tel" required autoComplete="tel" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[0.8125rem] font-medium tracking-[0.15em] uppercase mb-8">
                Shipping Address
              </h2>
              <div className="space-y-5">
                <div>
                  <label htmlFor="checkout-address" className="text-eyebrow block mb-2 text-[var(--color-text)]">Address</label>
                  <input id="checkout-address" name="address" type="text" required autoComplete="street-address" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="checkout-city" className="text-eyebrow block mb-2 text-[var(--color-text)]">City</label>
                    <input id="checkout-city" name="city" type="text" required autoComplete="address-level2" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                  </div>
                  <div>
                    <label htmlFor="checkout-state" className="text-eyebrow block mb-2 text-[var(--color-text)]">State</label>
                    <input id="checkout-state" name="state" type="text" required autoComplete="address-level1" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                  </div>
                  <div>
                    <label htmlFor="checkout-pincode" className="text-eyebrow block mb-2 text-[var(--color-text)]">PIN Code</label>
                    <input id="checkout-pincode" name="pincode" type="text" required autoComplete="postal-code" className="w-full border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem]" />
                  </div>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-[0.8125rem] font-medium tracking-[0.15em] uppercase mb-8">
                Payment Method
              </h2>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" autoComplete="off" defaultChecked className="accent-[var(--color-text)]" />
                  <span className="text-[0.875rem]">Bank Transfer (NEFT / IMPS)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" autoComplete="off" className="accent-[var(--color-text)]" />
                  <span className="text-[0.875rem]">Credit / Debit Card</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="radio" name="payment" autoComplete="off" className="accent-[var(--color-text)]" />
                  <span className="text-[0.875rem]">UPI</span>
                </label>
              </div>
            </section>

            {serverErrors.length > 0 && (
              <div className="border border-[var(--color-accent-dark)] p-4 text-[0.8125rem] text-[var(--color-accent-dark)]">
                {serverErrors.map((err, i) => (
                  <p key={i}>{err}</p>
                ))}
              </div>
            )}
            <button type="submit" disabled={isPending} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {isPending ? "Submitting…" : "Submit Order Request"}
            </button>
          </form>

          {/* Summary */}
          <aside className="lg:sticky lg:top-28 h-fit bg-[var(--color-surface-alt)] p-10">
            <h2 className="text-[0.8125rem] font-medium tracking-[0.15em] uppercase mb-8">
              Order Summary
            </h2>
            <ul className="space-y-6 mb-8">
              {items.map((item) => (
                <li key={`${item.productId}-${item.size}-${item.color}`} className="flex gap-3">
                  <div className="relative w-16 h-20 flex-shrink-0 bg-[var(--color-surface)]">
                    <Image src={item.image} alt={item.name} fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[0.8125rem] font-medium leading-snug truncate">{item.name}</p>
                    <p className="text-[0.75rem] text-[var(--color-muted)] mt-1">
                      {item.color} — {item.size} · Qty {item.quantity}
                    </p>
                    <p className="text-[0.8125rem] mt-1">{formatPrice(item.price * item.quantity, "INR")}</p>
                  </div>
                </li>
              ))}
            </ul>
            {/* Coupon */}
            <form onSubmit={handleApplyCoupon} className="mb-6">
              <label htmlFor="checkout-coupon" className="text-eyebrow block mb-2 text-[var(--color-text)]">Promo Code</label>
              <div className="flex gap-3">
                <input
                  id="checkout-coupon"
                  name="coupon"
                  type="text"
                  autoComplete="off"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 border-b border-[var(--color-border)] py-2 bg-transparent focus:border-[var(--color-text)] outline-none transition-colors text-[0.9375rem] uppercase tracking-wide"
                />
                <button type="submit" className="btn-secondary px-6 py-2 text-[0.75rem]">
                  Apply
                </button>
              </div>
              {couponError && (
                <p className="text-[0.75rem] text-[var(--color-accent-dark)] mt-2">{couponError}</p>
              )}
              {appliedCoupon && (
                <div className="flex items-center justify-between mt-3 bg-[var(--color-surface)] px-4 py-3">
                  <span className="text-[0.75rem] font-medium tracking-wide">
                    {appliedCoupon} — {VALID_COUPONS[appliedCoupon] * 100}% off
                  </span>
                  <button
                    type="button"
                    onClick={() => { setAppliedCoupon(null); setCouponCode(""); }}
                    className="text-[0.6875rem] tracking-[0.1em] uppercase text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
                  >
                    Remove
                  </button>
                </div>
              )}
            </form>

            <div className="space-y-4 text-[0.875rem] border-t border-[var(--color-border)] pt-5">
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal, "INR")}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-[var(--color-accent-dark)]">
                  <span>Discount ({appliedCoupon})</span>
                  <span>−{formatPrice(discount, "INR")}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[var(--color-text-secondary)]">Shipping</span>
                <span className="text-[var(--color-text-secondary)]">
                  {shipping === 0 ? "Complimentary" : formatPrice(shipping, "INR")}
                </span>
              </div>
              {shipping === 0 && afterDiscount > 0 && (
                <p className="text-[0.6875rem] text-[var(--color-muted)] italic">
                  Complimentary shipping on orders above {formatPrice(SHIPPING_THRESHOLD, "INR")}
                </p>
              )}
              <div className="border-t border-[var(--color-border)] pt-3 flex justify-between">
                <span className="font-medium">Total</span>
                <span className="font-medium text-[1.0625rem]">{formatPrice(total, "INR")}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
