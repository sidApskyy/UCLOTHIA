import { describe, it, expect } from "vitest";
import { calculateOrder } from "@/lib/services/order-service";

describe("calculateOrder", () => {
  it("calculates order with valid items", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 1 },
      ],
    });

    expect(result.errors).toHaveLength(0);
    expect(result.items).toHaveLength(1);
    expect(result.items[0].name).toBe("Ivory Silk Saree with Gold Embroidery");
    expect(result.subtotal).toBe(185000);
    expect(result.discount).toBe(0);
    expect(result.shipping).toBe(0);
    expect(result.total).toBe(185000);
  });

  it("rejects invalid product ID", () => {
    const result = calculateOrder({
      items: [
        { productId: "invalid", size: "M", color: "Black", quantity: 1 },
      ],
    });

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.items).toHaveLength(0);
  });

  it("rejects invalid variant", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "XXL", color: "Purple", quantity: 1 },
      ],
    });

    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects invalid quantity (0)", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 0 },
      ],
    });

    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("rejects invalid quantity (100+)", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 100 },
      ],
    });

    expect(result.errors.length).toBeGreaterThan(0);
  });

  it("applies coupon correctly", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 1 },
      ],
      couponCode: "UCLOTHIA10",
    });

    expect(result.errors).toHaveLength(0);
    expect(result.discount).toBe(18500);
    expect(result.total).toBe(185000 - 18500);
  });

  it("rejects invalid coupon", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 1 },
      ],
      couponCode: "FAKE50",
    });

    expect(result.errors.length).toBeGreaterThan(0);
    expect(result.discount).toBe(0);
  });

  it("calculates shipping for orders below threshold", () => {
    const result = calculateOrder({
      items: [
        { productId: "p011", size: "One Size", color: "Cream", quantity: 1 },
      ],
    });

    expect(result.errors).toHaveLength(0);
    expect(result.shipping).toBe(2500);
  });

  it("calculates free shipping for orders above threshold", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 1 },
        { productId: "p002", size: "M", color: "Crimson", quantity: 1 },
      ],
    });

    expect(result.errors).toHaveLength(0);
    expect(result.shipping).toBe(0);
  });

  it("handles multiple items correctly", () => {
    const result = calculateOrder({
      items: [
        { productId: "p001", size: "Free Size", color: "Ivory", quantity: 2 },
        { productId: "p010", size: "Free Size", color: "Rose Gold", quantity: 1 },
      ],
    });

    expect(result.errors).toHaveLength(0);
    expect(result.items).toHaveLength(2);
    expect(result.items[0].quantity).toBe(2);
  });
});
