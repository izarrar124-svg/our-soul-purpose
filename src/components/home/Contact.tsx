"use client";

import { useMemo, useState } from "react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getFormspreeEndpoint } from "@/lib/formspree";
import {
  inquiryTypes,
  validateContactForm,
  type ContactFormValues,
} from "@/lib/validation";
import { cn } from "@/lib/cn";

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  country: "",
  inquiryType: "",
  message: "",
};

export function Contact() {
  const endpoint = useMemo(() => getFormspreeEndpoint(), []);
  const formReady = Boolean(endpoint);

  const [values, setValues] = useState<ContactFormValues>(initialValues);
  const [errors, setErrors] = useState<Partial<ContactFormValues>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  const [statusMessage, setStatusMessage] = useState("");

  function updateField<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!endpoint) return;

    const nextErrors = validateContactForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    setStatusMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: values.fullName.trim(),
          email: values.email.trim(),
          country: values.country.trim(),
          inquiryType: values.inquiryType,
          message: values.message.trim(),
          _subject: `Our Soul Purpose inquiry — ${values.inquiryType}`,
        }),
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      setStatus("success");
      setStatusMessage("Thank you. Your message has been sent.");
      setValues(initialValues);
    } catch {
      setStatus("error");
      setStatusMessage(
        "Something went wrong while sending your message. Please try again later.",
      );
    }
  }

  return (
    <Section id="contact" tone="cream">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Contact"
            title="We Would Love to Hear From You"
            description="Share a question, partnership idea, or interest in volunteering. Until a public email address is published, this form is the planned channel for inquiries."
          />
          <div
            className="mt-10 hidden h-px w-16 bg-gold/60 lg:block"
            aria-hidden
          />
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 border-t border-navy/15 pt-8 sm:border sm:border-navy/10 sm:bg-white sm:p-8 sm:pt-8"
          aria-describedby="contact-form-status"
        >
          {!formReady ? (
            <div
              className="border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-navy"
              role="status"
            >
              The contact form is not active yet. Set{" "}
              <code className="rounded bg-mist px-1.5 py-0.5 text-xs">
                NEXT_PUBLIC_FORMSPREE_ID
              </code>{" "}
              in your environment to enable submissions. Fields below are shown
              for layout only.
            </div>
          ) : null}

          <Field id="fullName" label="Full name" error={errors.fullName} required>
            <input
              id="fullName"
              name="fullName"
              autoComplete="name"
              value={values.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.fullName)}
              aria-describedby={errors.fullName ? "fullName-error" : undefined}
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
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
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
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.country)}
              aria-describedby={errors.country ? "country-error" : undefined}
              className={fieldClass(errors.country)}
            />
          </Field>

          <Field
            id="inquiryType"
            label="Inquiry type"
            error={errors.inquiryType}
            required
          >
            <select
              id="inquiryType"
              name="inquiryType"
              value={values.inquiryType}
              onChange={(e) => updateField("inquiryType", e.target.value)}
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.inquiryType)}
              aria-describedby={
                errors.inquiryType ? "inquiryType-error" : undefined
              }
              className={fieldClass(errors.inquiryType)}
            >
              <option value="">Select an option</option>
              {inquiryTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </Field>

          <Field id="message" label="Message" error={errors.message} required>
            <textarea
              id="message"
              name="message"
              rows={5}
              value={values.message}
              onChange={(e) => updateField("message", e.target.value)}
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "message-error" : undefined}
              className={cn(fieldClass(errors.message), "min-h-28 resize-y")}
            />
          </Field>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              type="submit"
              disabled={!formReady || status === "submitting"}
              size="lg"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </Button>
            <p
              id="contact-form-status"
              className={cn(
                "text-sm",
                status === "success" && "text-ocean",
                status === "error" && "text-red-700",
                status === "idle" && "text-ink/70",
              )}
              role="status"
              aria-live="polite"
            >
              {statusMessage}
            </p>
          </div>
        </form>
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
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-navy">
        {label}
        {required ? <span className="text-gold"> *</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function fieldClass(error?: string) {
  return cn(
    "w-full rounded-sm border bg-cream px-3 py-2.5 text-sm text-navy outline-none transition-colors",
    "placeholder:text-ink/40 disabled:cursor-not-allowed disabled:opacity-60",
    error
      ? "border-red-400 focus:border-red-500"
      : "border-navy/15 focus:border-globe",
  );
}
