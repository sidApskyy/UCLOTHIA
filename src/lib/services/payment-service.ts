export interface PaymentOrder {
  id: string;
  amount: number;
  currency: string;
  reference: string;
}

export interface PaymentVerification {
  verified: boolean;
  paymentId?: string;
  error?: string;
}

export interface PaymentProvider {
  createPaymentOrder(order: {
    id: string;
    amount: number;
    currency: string;
    reference: string;
  }): Promise<PaymentOrder>;
  verifyPayment(payment: {
    paymentId: string;
    orderId: string;
    signature: string;
  }): Promise<PaymentVerification>;
  handleWebhook(payload: unknown, signature: string): Promise<{
    event: string;
    orderId?: string;
    paymentStatus: "SUCCESS" | "FAILED";
  }>;
}

export function getPaymentProvider(): PaymentProvider | null {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    return null;
  }

  return createRazorpayProvider(keyId, keySecret);
}

function createRazorpayProvider(
  keyId: string,
  keySecret: string
): PaymentProvider {
  return {
    async createPaymentOrder({ id, amount, currency, reference }) {
      const auth = Buffer.from(`${keyId}:${keySecret}`).toString("base64");
      const res = await fetch("https://api.razorpay.com/v1/orders", {
        method: "POST",
        headers: {
          Authorization: `Basic ${auth}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: amount * 100,
          currency,
          receipt: reference,
          notes: { orderId: id },
        }),
      });

      if (!res.ok) {
        throw new Error(`Razorpay order creation failed: ${res.status}`);
      }

      const data = await res.json();
      return {
        id: data.id,
        amount,
        currency,
        reference,
      };
    },

    async verifyPayment({ paymentId, orderId, signature }) {
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!webhookSecret) {
        return { verified: false, error: "Webhook secret not configured" };
      }

      const crypto = await import("crypto");
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(`${orderId}|${paymentId}`)
        .digest("hex");

      if (expectedSignature !== signature) {
        return { verified: false, error: "Signature mismatch" };
      }

      return { verified: true, paymentId };
    },

    async handleWebhook(payload, signature) {
      const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
      if (!webhookSecret) {
        throw new Error("Webhook secret not configured");
      }

      const crypto = await import("crypto");
      const expectedSignature = crypto
        .createHmac("sha256", webhookSecret)
        .update(JSON.stringify(payload))
        .digest("hex");

      if (expectedSignature !== signature) {
        throw new Error("Webhook signature verification failed");
      }

      const event = (payload as { event: string }).event;
      const paymentEntity = (payload as { payload?: { payment?: { entity?: { order_id?: string; status?: string } } } }).payload?.payment?.entity;

      return {
        event,
        orderId: paymentEntity?.order_id,
        paymentStatus: paymentEntity?.status === "captured" ? "SUCCESS" : "FAILED",
      };
    },
  };
}
