import type { Order, CheckoutPayload, OrderItem } from "@/lib/types";
import { products } from "@/lib/data/products";
import {
  VALID_COUPONS,
  calculateDiscount,
  calculateShipping,
} from "@/lib/utils";

function generateReference(): string {
  const date = new Date();
  const ymd = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, "0")}${String(date.getDate()).padStart(2, "0")}`;
  const random = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `UCL-${ymd}-${random}`;
}

export interface OrderCalculation {
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  currency: string;
  errors: string[];
}

export function calculateOrder(
  payload: Pick<CheckoutPayload, "items" | "couponCode">
): OrderCalculation {
  const errors: string[] = [];
  const orderItems: OrderItem[] = [];
  let subtotal = 0;

  for (const item of payload.items) {
    const product = products.find((p) => p.id === item.productId);
    if (!product) {
      errors.push(`Product not found: ${item.productId}`);
      continue;
    }

    const variant = product.variants.find(
      (v) => v.size === item.size && v.color === item.color
    );
    if (!variant) {
      errors.push(`Variant not found: ${item.size} / ${item.color} for ${product.name}`);
      continue;
    }

    if (!variant.inStock) {
      errors.push(`${product.name} (${item.size} / ${item.color}) is out of stock`);
      continue;
    }

    if (item.quantity < 1 || item.quantity > 99) {
      errors.push(`Invalid quantity for ${product.name}`);
      continue;
    }

    const unitPrice = product.price;
    subtotal += unitPrice * item.quantity;

    orderItems.push({
      productId: product.id,
      name: product.name,
      size: item.size,
      color: item.color,
      quantity: item.quantity,
      unitPrice,
    });
  }

  let discount = 0;
  if (payload.couponCode) {
    const coupon = VALID_COUPONS[payload.couponCode.toUpperCase()];
    if (!coupon) {
      errors.push(`Invalid coupon code: ${payload.couponCode}`);
    } else {
      discount = calculateDiscount(subtotal, coupon);
    }
  }

  const afterDiscount = subtotal - discount;
  const shipping = calculateShipping(afterDiscount);
  const total = afterDiscount + shipping;

  return {
    items: orderItems,
    subtotal,
    discount,
    shipping,
    total,
    currency: "INR",
    errors,
  };
}

export function createOrder(
  payload: CheckoutPayload,
  calculation: OrderCalculation
): Order {
  const now = new Date().toISOString();
  return {
    id: crypto.randomUUID(),
    reference: generateReference(),
    customerName: payload.customerName,
    email: payload.email,
    phone: payload.phone,
    shippingAddress: payload.shippingAddress,
    items: calculation.items,
    couponCode: payload.couponCode,
    subtotal: calculation.subtotal,
    discount: calculation.discount,
    shipping: calculation.shipping,
    total: calculation.total,
    currency: calculation.currency,
    paymentStatus: "NONE",
    orderStatus: "PENDING",
    createdAt: now,
    updatedAt: now,
  };
}
