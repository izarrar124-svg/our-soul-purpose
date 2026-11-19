"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  donationCurrencies,
  donationSection,
  formatDonationAmount,
  getPresetsForCurrency,
  type DonationCurrency,
  type DonationFrequency,
} from "@/data/donation";
import { media } from "@/data/media";
import { paymentProvider } from "@/lib/payments";
import {
  validateDonationForm,
  type DonationFormErrors,
  type DonationFormValues,
} from "@/lib/validation";
import { cn } from "@/lib/cn";

const initialValues: DonationFormValues = {
  currency: "AED",
  amount: "100",
  fullName: "",
  email: "",
  country: "",
  phone: "",
  frequency: "one-time",
};

export function Donate() {
  const reduceMotion = useReducedMotion();
  const [values, setValues] = useState<DonationFormValues>(initialValues);
  const [errors, setErrors] = useState<DonationFormErrors>({});
  const [statusMessage, setStatusMessage] = useState("");

  const presets = useMemo(
    () => getPresetsForCurrency(values.currency as DonationCurrency),
    [values.currency],
  );

  const paymentsEnabled = paymentProvider.enabled;

  function updateField<K extends keyof DonationFormValues>(
    key: K,
    value: DonationFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
    setStatusMessage("");
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateDonationForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const result = await paymentProvider.createPayment({
      amount: Number(values.amount),
      currency: values.currency,
      frequency: values.frequency,
      donorName: values.fullName.trim(),
      email: values.email.trim(),
      country: values.country.trim(),
      phone: values.phone.trim() || undefined,
    });

    if (!result.ok) {
      setStatusMessage(
        result.reason === "not_enabled"
          ? donationSection.disabledBanner
          : "Unable to start a payment right now. Please try again later.",
      );
      return;
    }

    // Live providers would redirect / confirm here. Never invent success.
    setStatusMessage(`Payment reference ${result.reference} recorded.`);
  }

  return (
    <Section id="donate" tone="white">
      <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeading
            eyebrow={donationSection.eyebrow}
            title={donationSection.heading}
            description={donationSection.intro}
          />
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink sm:text-base">
            {donationSection.body}
          </p>
          <figure className="relative mt-8 min-h-[18rem] overflow-hidden bg-mist sm:min-h-[22rem]">
            <Image
              src={media.donate.src}
              alt={media.donate.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </figure>
        </motion.div>

        <motion.form
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: 0.05 }}
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 border border-navy/10 bg-cream p-6 sm:p-8"
          aria-describedby="donate-status"
        >
          <div
            className="border border-gold/35 bg-gold/10 px-4 py-3 text-sm leading-relaxed text-navy"
            role="status"
          >
            {donationSection.disabledBanner}
          </div>

          <Field id="currency" label="Currency" error={errors.currency} required>
            <select
              id="currency"
              name="currency"
              value={values.currency}
              onChange={(e) => {
                const currency = e.target.value as DonationCurrency;
                const nextPresets = getPresetsForCurrency(currency);
                updateField("currency", currency);
                updateField("amount", String(nextPresets[1] ?? nextPresets[0] ?? ""));
              }}
              className={fieldClass(errors.currency)}
            >
              {donationCurrencies.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.label}
                </option>
              ))}
            </select>
          </Field>

          <div>
            <p className="mb-2 text-sm font-medium text-navy">
              Suggested amounts <span className="text-gold">*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {presets.map((amount) => {
                const selected = values.amount === String(amount);
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => updateField("amount", String(amount))}
                    className={cn(
                      "px-3.5 py-2 text-sm font-semibold transition-colors",
                      selected
                        ? "bg-navy text-white"
                        : "bg-white text-navy hover:bg-mist",
                    )}
                  >
                    {formatDonationAmount(
                      amount,
                      values.currency as DonationCurrency,
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Field id="amount" label="Custom amount" error={errors.amount} required>
            <input
              id="amount"
              name="amount"
              inputMode="decimal"
              value={values.amount}
              onChange={(e) => updateField("amount", e.target.value)}
              aria-invalid={Boolean(errors.amount)}
              className={fieldClass(errors.amount)}
            />
          </Field>

          <fieldset>
            <legend className="mb-2 text-sm font-medium text-navy">
              Frequency <span className="text-gold">*</span>
            </legend>
            <div className="flex flex-wrap gap-2">
              {(
                [
                  { id: "one-time", label: "One-time" },
                  { id: "monthly", label: "Monthly" },
                ] as { id: DonationFrequency; label: string }[]
              ).map((option) => {
                const selected = values.frequency === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => updateField("frequency", option.id)}
                    className={cn(
                      "px-3.5 py-2 text-sm font-semibold transition-colors",
                      selected
                        ? "bg-navy text-white"
                        : "bg-white text-navy hover:bg-mist",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {errors.frequency ? (
              <p className="mt-1.5 text-sm text-red-700">{errors.frequency}</p>
            ) : null}
          </fieldset>

          <Field id="fullName" label="Full name" error={errors.fullName} required>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              value={values.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              className={fieldClass(errors.fullName)}
            />
          </Field>

          <Field id="email" label="Email" error={errors.email} required>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(e) => updateField("email", e.target.value)}
              className={fieldClass(errors.email)}
            />
          </Field>

          <Field id="country" label="Country" error={errors.country} required>
            <input
              id="country"
              name="country"
              autoComplete="country-name"
              value={values.country}
              onChange={(e) => updateField("country", e.target.value)}
              className={fieldClass(errors.country)}
            />
          </Field>

          <Field id="phone" label="Phone (optional)" error={errors.phone}>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={values.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              className={fieldClass(errors.phone)}
            />
          </Field>

          <div className="flex flex-col gap-3 pt-1">
            <Button type="submit" size="lg" disabled={!paymentsEnabled}>
              {paymentsEnabled
                ? "Continue to Payment"
                : donationSection.disabledButtonLabel}
            </Button>
            <p
              id="donate-status"
              className="text-sm text-ink/70"
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}

function Field({
  id,
  label,
  error,
  required,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}

function fieldClass(error?: string) {
  return cn(
    "w-full rounded-sm border bg-white px-3 py-2.5 text-sm text-navy outline-none transition-colors",
    "placeholder:text-ink/40 disabled:cursor-not-allowed disabled:opacity-60",
    error
      ? "border-red-400 focus:border-red-500"
      : "border-navy/15 focus:border-globe",
  );
}
