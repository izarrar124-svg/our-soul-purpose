export type Program = {
  id: string;
  title: string;
  summary: string;
  details: string;
  icon: "utensils" | "home" | "droplets" | "graduationCap" | "refrigerator" | "heartPulse" | "baby";
  source: "verified" | "proposed";
};

/**
 * Program titles and short descriptions are verified from brand guidelines.
 * Extended modal details are proposed website copy for visitor clarity.
 */
export const programs: Program[] = [
  {
    id: "food-relief",
    title: "Food Relief",
    summary: "Food packs and meals for families in need.",
    details:
      "Our food relief efforts focus on providing nutritious meals and essential food packs to families facing hardship. Support is delivered with dignity — never pity — so households can meet immediate needs while communities work toward longer-term stability.",
    icon: "utensils",
    source: "verified",
  },
  {
    id: "housing-relief",
    title: "Housing Relief",
    summary: "Shelter, repairs and winter support.",
    details:
      "Safe shelter is foundational to wellbeing. Through housing relief, we help with emergency shelter needs, essential repairs, and seasonal support so families can face winter and difficult periods with greater security and warmth.",
    icon: "home",
    source: "verified",
  },
  {
    id: "clean-water-wells",
    title: "Clean Water Wells",
    summary: "Safe drinking water for whole villages.",
    details:
      "Access to clean water transforms daily life. Our clean water well initiatives aim to bring safe drinking water to communities, reducing the burden of water scarcity and supporting healthier homes and futures.",
    icon: "droplets",
    source: "verified",
  },
  {
    id: "educational-support",
    title: "Educational Support",
    summary: "Fees, books and uniforms for students.",
    details:
      "Education opens doors. We support students with school fees, books, and uniforms so learning remains within reach — helping young people pursue their potential with confidence and dignity.",
    icon: "graduationCap",
    source: "verified",
  },
  {
    id: "ramadan-fridges",
    title: "Ramadan Fridges",
    summary: "Community fridges stocked through Ramadan.",
    details:
      "During Ramadan, community fridges help neighbors share sustenance with care. This program stocks communal fridges so families can access food throughout the blessed month in a spirit of solidarity and generosity.",
    icon: "refrigerator",
    source: "verified",
  },
  {
    id: "healthcare-support",
    title: "Healthcare Support",
    summary: "Treatment, medicine and medical camps.",
    details:
      "Health is hope in action. Our healthcare support includes assistance with treatment and medicine, alongside medical camps that bring care closer to communities who need it most.",
    icon: "heartPulse",
    source: "verified",
  },
  {
    id: "orphan-support",
    title: "Orphan Support",
    summary: "Care, schooling and Eid gifts for orphans.",
    details:
      "Every child deserves care, opportunity, and celebration. Orphan support provides schooling and thoughtful Eid gifts, offered with privacy and respect — never exploiting vulnerability for attention.",
    icon: "baby",
    source: "verified",
  },
];

export const programsSection = {
  heading: "Our Programs. Our Commitment.",
  intro:
    "Seven focused programs guide our work — each designed to meet real needs with compassion, clarity, and lasting care.",
} as const;
