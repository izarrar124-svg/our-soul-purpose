import { organization } from "./organization";

export const siteSeo = {
  title: `${organization.name} | ${organization.tagline}`,
  shortTitle: organization.name,
  description:
    "Our Soul Purpose is an international humanitarian organization serving communities with compassion, dignity, and hope — one life at a time.",
  keywords: [
    "Our Soul Purpose",
    "humanitarian",
    "NGO",
    "charity",
    "Dubai",
    "Pakistan",
    "United States",
    "food relief",
    "clean water",
    "education",
  ],
  ogImage: "/images/brand/logo-primary.jpeg",
  locale: "en_US",
  url: "", // set when a production domain is confirmed
} as const;
