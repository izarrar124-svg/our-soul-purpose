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
