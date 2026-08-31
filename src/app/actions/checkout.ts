"use server";

import type { CheckoutPayload } from "@/lib/types";
import { calculateOrder, createOrder } from "@/lib/services/order-service";
import { validateCheckoutForm } from "@/lib/validation";

export interface CheckoutResult {
  success: boolean;
  reference?: string;
  errors?: Record<string, string>;
  serverErrors?: string[];
}

export async function submitCheckout(
  formData: FormData,
  cartItems: CheckoutPayload["items"],
  couponCode?: string
): Promise<CheckoutResult> {
  const firstName = formData.get("firstName")?.toString() || "";
  const lastName = formData.get("lastName")?.toString() || "";
  const email = formData.get("email")?.toString() || "";
  const phone = formData.get("phone")?.toString() || "";
  const address = formData.get("address")?.toString() || "";
  const city = formData.get("city")?.toString() || "";
  const state = formData.get("state")?.toString() || "";
  const pincode = formData.get("pincode")?.toString() || "";

  const validation = validateCheckoutForm({
    firstName,
    lastName,
    email,
    phone,
    address,
    city,
    state,
    pincode,
  });

  if (!validation.valid) {
    return { success: false, errors: validation.errors };
  }

  if (!cartItems || cartItems.length === 0) {
    return {
      success: false,
      serverErrors: ["Cart is empty."],
    };
  }

  const payload: CheckoutPayload = {
    customerName: `${firstName} ${lastName}`.trim(),
    email,
    phone,
    shippingAddress: {
      line1: address,
      city,
      state,
      postalCode: pincode,
      country: "India",
    },
    items: cartItems,
    couponCode: couponCode || undefined,
  };

  const calculation = calculateOrder(payload);

  if (calculation.errors.length > 0) {
    return { success: false, serverErrors: calculation.errors };
  }

  const order = createOrder(payload, calculation);

  return {
    success: true,
    reference: order.reference,
  };
}
