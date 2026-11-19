export type DonationCurrency = "AED" | "USD" | "PKR";
export type DonationFrequency = "one-time" | "monthly";

export type DonationPreset = {
  currency: DonationCurrency;
  amounts: number[];
};

export const donationCurrencies: {
  code: DonationCurrency;
  label: string;
  symbol: string;
}[] = [
  { code: "AED", label: "UAE Dirham (AED)", symbol: "AED" },
  { code: "USD", label: "US Dollar (USD)", symbol: "$" },
  { code: "PKR", label: "Pakistani Rupee (PKR)", symbol: "PKR" },
];

export const donationPresets: DonationPreset[] = [
  { currency: "AED", amounts: [50, 100, 250, 500] },
  { currency: "USD", amounts: [15, 25, 50, 100] },
  { currency: "PKR", amounts: [2500, 5000, 10000, 25000] },
];

export const donationSection = {
  eyebrow: "Donate",
  heading: "Your Kindness Can Change a Life.",
  intro:
    "Every contribution helps sustain food, shelter, water, education, healthcare, and orphan support — delivered with dignity.",
  body: "Choose a currency familiar to you, select an amount, and tell us how to stay in touch. Online payment processing is not active yet; this form prepares the experience honestly until fundraising and provider approval are complete.",
  disabledBanner:
    "Fundraising and payment processing are not active yet. Donations cannot be charged until legal eligibility and a payment provider are approved. You can still review the form layout below.",
  disabledButtonLabel: "Payments Not Available Yet",
} as const;

export function formatDonationAmount(
  amount: number,
  currency: DonationCurrency,
): string {
  const preset = donationCurrencies.find((entry) => entry.code === currency);
  if (currency === "USD") {
    return `${preset?.symbol ?? "$"}${amount}`;
  }
  return `${amount.toLocaleString("en-US")} ${currency}`;
}

export function getPresetsForCurrency(currency: DonationCurrency): number[] {
  return (
    donationPresets.find((entry) => entry.currency === currency)?.amounts ?? []
  );
}
