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

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
  country: "",
  inquiryType: "",
  message: "",
};

const inputStyle = (error?: string): React.CSSProperties => ({
  width: "100%",
  borderRadius: "2px",
  border: error ? "1px solid #f87171" : "1px solid rgba(22,58,92,0.18)",
  backgroundColor: "#FBF8F5",
  padding: "0.625rem 0.75rem",
  fontSize: "0.875rem",
  color: "#163A5C",
  outline: "none",
});

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
      <div className="mx-auto max-w-2xl">
        <SectionHeading
          eyebrow="Contact"
          title="We Would Love to Hear From You"
          description="Share a question, partnership idea, or interest in volunteering. Until a public email address is published, this form is the planned channel for inquiries."
          align="center"
          className="mx-auto mb-10"
        />

        <form
          onSubmit={handleSubmit}
          noValidate
          className="space-y-5 p-6 sm:p-8"
          style={{
            border: "1px solid rgba(22,58,92,0.12)",
            backgroundColor: "#ffffff",
          }}
          aria-describedby="contact-form-status"
        >
          {!formReady ? (
            <div
              className="px-4 py-3 text-sm"
              style={{
                border: "1px solid rgba(200,135,31,0.35)",
                backgroundColor: "rgba(200,135,31,0.1)",
                color: "#163A5C",
              }}
              role="status"
            >
              The contact form is not active yet. Set{" "}
              <code
                className="px-1.5 py-0.5 text-xs"
                style={{ backgroundColor: "#E6EEF6" }}
              >
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
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.email)}
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
              disabled={!formReady || status === "submitting"}
              aria-invalid={Boolean(errors.country)}
              style={inputStyle(errors.country)}
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
              style={inputStyle(errors.inquiryType)}
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
              style={{ ...inputStyle(errors.message), minHeight: "7rem", resize: "vertical" }}
            />
          </Field>

          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              type="submit"
              disabled={!formReady || status === "submitting"}
              size="lg"
              className="w-full sm:w-auto"
            >
              {status === "submitting" ? "Sending…" : "Send Message"}
            </Button>
            <p
              id="contact-form-status"
              className="text-center text-sm"
              style={{
                color:
                  status === "success"
                    ? "#0F4C6E"
                    : status === "error"
                      ? "#b91c1c"
                      : "#4A5A6A",
              }}
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
