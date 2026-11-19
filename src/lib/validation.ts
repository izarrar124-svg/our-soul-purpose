export type ContactFormValues = {
  fullName: string;
  email: string;
  country: string;
  inquiryType: string;
  message: string;
};

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const inquiryTypes = [
  "General inquiry",
  "Volunteer",
  "Partnership",
  "Community",
  "Programs",
  "Media",
  "Other",
] as const;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.country.trim()) {
    errors.country = "Please enter your country.";
  }

  if (!values.inquiryType.trim()) {
    errors.inquiryType = "Please select an inquiry type.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}

export type DonationFormValues = {
  currency: "AED" | "USD" | "PKR";
  amount: string;
  fullName: string;
  email: string;
  country: string;
  phone: string;
  frequency: "one-time" | "monthly";
};

export type DonationFormErrors = {
  [K in keyof DonationFormValues]?: string;
};

export function validateDonationForm(
  values: DonationFormValues,
): DonationFormErrors {
  const errors: DonationFormErrors = {};

  if (!values.currency) {
    errors.currency = "Please select a currency.";
  }

  const amountNumber = Number(values.amount);
  if (!values.amount.trim()) {
    errors.amount = "Please enter or select an amount.";
  } else if (!Number.isFinite(amountNumber) || amountNumber <= 0) {
    errors.amount = "Please enter a valid amount greater than zero.";
  } else if (amountNumber > 1_000_000) {
    errors.amount = "Please enter a smaller amount.";
  }

  if (!values.fullName.trim()) {
    errors.fullName = "Please enter your full name.";
  } else if (values.fullName.trim().length < 2) {
    errors.fullName = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.country.trim()) {
    errors.country = "Please enter your country.";
  }

  if (values.phone.trim() && values.phone.trim().length < 7) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (values.frequency !== "one-time" && values.frequency !== "monthly") {
    errors.frequency = "Please choose one-time or monthly.";
  }

  return errors;
}
