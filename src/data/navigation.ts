export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/#home" },
  { label: "About Us", href: "/#about" },
  { label: "Our Programs", href: "/#programs" },
  { label: "Our Impact", href: "/#impact" },
  { label: "Get Involved", href: "/#involved" },
  { label: "Contact", href: "/#contact" },
];

export const footerQuickLinks: NavItem[] = [
  { label: "About Us", href: "/#about" },
  { label: "Our Programs", href: "/#programs" },
  { label: "Our Impact", href: "/#impact" },
  { label: "Stories of Change", href: "/#stories" },
  { label: "Get Involved", href: "/#involved" },
  { label: "Contact", href: "/#contact" },
  { label: "Privacy Policy", href: "/privacy" },
];

export const ctaNav = {
  label: "Join Our Mission",
  href: "/#involved",
} as const;
