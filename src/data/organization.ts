/**
 * Central configuration for Our Soul Purpose.
 * Update contact and social fields when verified details are available.
 * Empty optional fields are hidden in the UI — do not invent values.
 */

export type SocialLinks = {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
};

export type LocationPresence = {
  id: string;
  name: string;
  shortLabel: string;
  role: string;
  description: string;
  /** Approximate map coordinates for country/city-level markers only — not street addresses */
  lat: number;
  lng: number;
  /** Verified from brand guidelines */
  source: "verified" | "proposed";
};

export const organization = {
  name: "Our Soul Purpose",
  shortName: "OSP",
  tagline: "Serving Humanity One Life at a Time",
  /** Verified from OSP Brand Guidelines v1.0 (November 2026) */
  foundedYear: 2025,
  /** Leave empty until a public email is confirmed */
  email: "" as string,
  /** Leave empty until a public phone is confirmed */
  phone: "" as string,
  /** Do not invent street addresses; presence + country/city markers only */
  locations: [
    {
      id: "dubai",
      name: "Dubai, UAE",
      shortLabel: "Dubai",
      role: "Community presence",
      description:
        "We maintain a community presence in Dubai, connecting supporters with our international humanitarian work.",
      lat: 25.2048,
      lng: 55.2708,
      source: "verified" as const,
    },
    {
      id: "pakistan",
      name: "Pakistan",
      shortLabel: "Pakistan",
      role: "Community presence",
      description:
        "We maintain a community presence in Pakistan, supporting families through local programs.",
      lat: 30.3753,
      lng: 69.3451,
      source: "verified" as const,
    },
    {
      id: "united-states",
      name: "United States",
      shortLabel: "United States",
      role: "Community presence",
      description:
        "We maintain a community presence in the United States, connecting supporters with our mission.",
      lat: 39.8283,
      lng: -98.5795,
      source: "verified" as const,
    },
  ] satisfies LocationPresence[],
  /** Add URLs when official profiles exist; empty keys are omitted from the footer */
  socials: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  } satisfies SocialLinks,
  copyrightYear: new Date().getFullYear(),
} as const;

export function getActiveSocials(): { platform: keyof SocialLinks; href: string }[] {
  return (Object.entries(organization.socials) as [keyof SocialLinks, string][])
    .filter(([, href]) => Boolean(href?.trim()))
    .map(([platform, href]) => ({ platform, href: href.trim() }));
}

export function hasContactEmail(): boolean {
  return Boolean(organization.email?.trim());
}
