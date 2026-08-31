import { describe, it, expect } from "vitest";
import {
  formatPrice,
  VALID_COUPONS,
  calculateDiscount,
  calculateShipping,
  SHIPPING_THRESHOLD,
  SHIPPING_FLAT,
} from "@/lib/utils";

describe("formatPrice", () => {
  it("formats INR with rupee symbol", () => {
    expect(formatPrice(185000, "INR")).toBe("₹1,85,000");
  });

  it("formats with Indian number system", () => {
    expect(formatPrice(100000, "INR")).toBe("₹1,00,000");
  });

  it("defaults to INR", () => {
    expect(formatPrice(2500)).toBe("₹2,500");
  });

  it("formats non-INR currency", () => {
    expect(formatPrice(100, "USD")).toBe("USD 100");
  });
});

describe("calculateDiscount", () => {
  it("calculates 10% discount correctly", () => {
    expect(calculateDiscount(100000, VALID_COUPONS.UCLOTHIA10)).toBe(10000);
  });

  it("calculates 15% discount correctly", () => {
    expect(calculateDiscount(100000, VALID_COUPONS.WELCOME15)).toBe(15000);
  });

  it("calculates 20% discount correctly", () => {
    expect(calculateDiscount(100000, VALID_COUPONS.COUTURE20)).toBe(20000);
  });

  it("rounds to nearest rupee", () => {
    expect(calculateDiscount(999, 0.10)).toBe(100);
  });

  it("returns 0 for 0% discount", () => {
    expect(calculateDiscount(100000, 0)).toBe(0);
  });
});

describe("calculateShipping", () => {
  it("returns 0 for orders above threshold", () => {
    expect(calculateShipping(SHIPPING_THRESHOLD)).toBe(0);
  });

  it("returns 0 for orders above threshold (well above)", () => {
    expect(calculateShipping(200000)).toBe(0);
  });

  it("returns flat shipping for orders below threshold", () => {
    expect(calculateShipping(50000)).toBe(SHIPPING_FLAT);
  });

  it("returns 0 for empty cart (afterDiscount = 0)", () => {
    expect(calculateShipping(0)).toBe(0);
  });

  it("returns flat shipping for order just below threshold", () => {
    expect(calculateShipping(SHIPPING_THRESHOLD - 1)).toBe(SHIPPING_FLAT);
  });
});

describe("VALID_COUPONS", () => {
  it("has exactly 3 coupons", () => {
    expect(Object.keys(VALID_COUPONS)).toHaveLength(3);
  });

  it("has UCLOTHIA10 at 10%", () => {
    expect(VALID_COUPONS.UCLOTHIA10).toBe(0.10);
  });

  it("has WELCOME15 at 15%", () => {
    expect(VALID_COUPONS.WELCOME15).toBe(0.15);
  });

  it("has COUTURE20 at 20%", () => {
    expect(VALID_COUPONS.COUTURE20).toBe(0.20);
  });
});
