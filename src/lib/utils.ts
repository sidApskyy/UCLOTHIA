export function formatPrice(price: number, currency: string = "INR"): string {
  if (currency === "INR") {
    return `₹${price.toLocaleString("en-IN")}`;
  }
  return `${currency} ${price.toLocaleString()}`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export const VALID_COUPONS: Record<string, number> = {
  UCLOTHIA10: 0.10,
  WELCOME15: 0.15,
  COUTURE20: 0.20,
};

export const SHIPPING_THRESHOLD = 100000;
export const SHIPPING_FLAT = 2500;

export function calculateDiscount(
  subtotal: number,
  couponRate: number
): number {
  return Math.round(subtotal * couponRate);
}

export function calculateShipping(afterDiscount: number): number {
  if (afterDiscount === 0) return 0;
  return afterDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
}
