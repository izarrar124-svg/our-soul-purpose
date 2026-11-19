"use client";

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
import { paymentProvider } from "@/lib/payments";
import {
  validateDonationForm,
  type DonationFormErrors,
  type DonationFormValues,
} from "@/lib/validation";

const initialValues: DonationFormValues = {
  currency: "AED",
  amount: "100",
  fullName: "",
  email: "",
  country: "",
  phone: "",
  frequency: "one-time",
};

const inputStyle = (error?: string): React.CSSProperties => ({
  width: "100%",
  borderRadius: "2px",
  border: error ? "1px solid #f87171" : "1px solid rgba(22,58,92,0.18)",
  backgroundColor: "#ffffff",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  color: "#163A5C",
  outline: "none",
});

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

    setStatusMessage(`Payment reference ${result.reference} recorded.`);
  }

  return (
    <Section id="donate" tone="white">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <SectionHeading
            eyebrow={donationSection.eyebrow}
            title={donationSection.heading}
            description={donationSection.intro}
            align="center"
            className="mx-auto"
          />
          <p
            className="mx-auto mt-4 max-w-xl text-sm leading-relaxed sm:text-base"
            style={{ color: "#4A5A6A" }}
          >
            {donationSection.body}
          </p>
        </motion.div>

        <motion.form
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.06 }}
          onSubmit={handleSubmit}
          noValidate
          className="mt-10 space-y-5 p-6 text-left sm:p-8"
          style={{
            border: "1px solid rgba(22,58,92,0.12)",
            backgroundColor: "#FBF8F5",
          }}
          aria-describedby="donate-status"
        >
          <div
            className="px-4 py-3 text-sm leading-relaxed"
            style={{
              border: "1px solid rgba(200,135,31,0.35)",
              backgroundColor: "rgba(200,135,31,0.1)",
              color: "#163A5C",
            }}
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
                updateField(
                  "amount",
                  String(nextPresets[1] ?? nextPresets[0] ?? ""),
                );
              }}
              style={inputStyle(errors.currency)}
            >
              {donationCurrencies.map((entry) => (
                <option key={entry.code} value={entry.code}>
                  {entry.label}
                </option>
              ))}
            </select>
          </Field>

          <div>
            <p className="mb-2 text-sm font-medium" style={{ color: "#163A5C" }}>
              Suggested amounts <span style={{ color: "#C8871F" }}>*</span>
            </p>
            <div className="flex flex-wrap gap-2">
              {presets.map((amount) => {
                const selected = values.amount === String(amount);
                return (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => updateField("amount", String(amount))}
                    className="px-3.5 py-2 text-sm font-semibold"
                    style={
                      selected
                        ? { backgroundColor: "#163A5C", color: "#ffffff" }
                        : {
                            backgroundColor: "#ffffff",
                            color: "#163A5C",
                            border: "1px solid rgba(22,58,92,0.12)",
                          }
                    }
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
              style={inputStyle(errors.amount)}
            />
          </Field>

          <fieldset>
            <legend className="mb-2 text-sm font-medium" style={{ color: "#163A5C" }}>
              Frequency <span style={{ color: "#C8871F" }}>*</span>
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
                    className="px-3.5 py-2 text-sm font-semibold"
                    style={
                      selected
                        ? { backgroundColor: "#163A5C", color: "#ffffff" }
                        : {
                            backgroundColor: "#ffffff",
                            color: "#163A5C",
                            border: "1px solid rgba(22,58,92,0.12)",
                          }
                    }
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
              style={inputStyle(errors.fullName)}
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
              style={inputStyle(errors.email)}
            />
          </Field>

          <Field id="country" label="Country" error={errors.country} required>
            <input
              id="country"
              name="country"
              autoComplete="country-name"
              value={values.country}
              onChange={(e) => updateField("country", e.target.value)}
              style={inputStyle(errors.country)}
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
              style={inputStyle(errors.phone)}
            />
          </Field>

          <div className="flex flex-col items-center gap-3 pt-1">
            <Button
              type="submit"
              size="lg"
              disabled={!paymentsEnabled}
              className="w-full sm:w-auto"
            >
              {paymentsEnabled
                ? "Continue to Payment"
                : donationSection.disabledButtonLabel}
            </Button>
            <p
              id="donate-status"
              className="text-center text-sm"
              style={{ color: "#4A5A6A" }}
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
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-medium"
        style={{ color: "#163A5C" }}
      >
        {label}
        {required ? <span style={{ color: "#C8871F" }}> *</span> : null}
      </label>
      {children}
      {error ? <p className="mt-1.5 text-sm text-red-700">{error}</p> : null}
    </div>
  );
}
