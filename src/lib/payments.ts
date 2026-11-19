export type PaymentIntent = {
  amount: number;
  currency: string;
  frequency: "one-time" | "monthly";
  donorName: string;
  email: string;
  country: string;
  phone?: string;
};

export type PaymentResult =
  | { ok: true; reference: string }
  | { ok: false; reason: "not_enabled" | "validation" | "provider_error" };

export interface PaymentProvider {
  readonly id: string;
  readonly enabled: boolean;
  createPayment(intent: PaymentIntent): Promise<PaymentResult>;
}

/**
 * Placeholder provider used until legal/fundraising approval
 * and a live processor (e.g. Stripe) are configured.
 */
export class DisabledPaymentProvider implements PaymentProvider {
  readonly id = "disabled";
  readonly enabled = false;

  async createPayment(_intent: PaymentIntent): Promise<PaymentResult> {
    void _intent;
    return { ok: false, reason: "not_enabled" };
  }
}

export const paymentProvider: PaymentProvider = new DisabledPaymentProvider();
