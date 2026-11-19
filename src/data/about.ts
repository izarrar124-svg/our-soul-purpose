/**
 * About content for the website.
 * `source: "verified"` = confirmed organizational fact from brand guidelines.
 * `source: "proposed"` = professional introductory copy for the site; replace when official copy is supplied.
 */

export type ContentBlock = {
  title: string;
  body: string;
  source: "verified" | "proposed";
};

export const aboutSection = {
  heading: "More Than Charity. A Commitment to Humanity.",
  /** Proposed website copy — aligned with brand personality */
  introduction: {
    title: "Who We Are",
    body: "Our Soul Purpose is a humanitarian organization founded in 2025, headquartered in Dubai and serving communities in Pakistan and the United States. We believe meaningful change begins with dignity — meeting people where they are, and walking with them toward hope.",
    source: "proposed" as const,
  },
  mission: {
    title: "Our Mission",
    body: "Serving Humanity One Life at a Time. We deliver compassionate, practical support through food, shelter, clean water, education, healthcare, and care for orphans — always with respect, transparency, and steadfast hope.",
    source: "verified" as const,
  },
  vision: {
    title: "Our Vision",
    body: "A world where every individual has the opportunity to live with dignity, hope, and purpose — and where communities rise together through kindness, accountability, and shared responsibility.",
    source: "proposed" as const,
  },
} as const;
