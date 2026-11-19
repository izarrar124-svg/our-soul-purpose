export type NavItem = {
  label: string;
  href: string;
  /** Section id without hash, used for scroll-spy */
  sectionId?: string;
};

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/#home", sectionId: "home" },
  { label: "About Us", href: "/#about", sectionId: "about" },
  { label: "Programs", href: "/#programs", sectionId: "programs" },
  { label: "Portfolio", href: "/#portfolio", sectionId: "portfolio" },
  { label: "Our Impact", href: "/#impact", sectionId: "impact" },
  { label: "Donate", href: "/#donate", sectionId: "donate" },
  { label: "Contact", href: "/#contact", sectionId: "contact" },
];

export const footerAboutLinks: NavItem[] = [
  { label: "About Us", href: "/#about" },
  { label: "Our Impact", href: "/#impact" },
  { label: "Get Involved", href: "/#involved" },
  { label: "Contact", href: "/#contact" },
];

export const footerExploreLinks: NavItem[] = [
  { label: "Programs", href: "/#programs" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Donate", href: "/#donate" },
  { label: "Global Presence", href: "/#presence" },
];

export const footerLegalLinks: NavItem[] = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
];

/** @deprecated use footerAboutLinks / footerExploreLinks */
export const footerQuickLinks: NavItem[] = [
  ...footerAboutLinks,
  ...footerExploreLinks,
  ...footerLegalLinks,
];

export const ctaNav = {
  label: "Join Our Mission",
  href: "/#donate",
} as const;
