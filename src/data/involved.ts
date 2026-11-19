export type InvolvementOption = {
  id: string;
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
  icon: "handHeart" | "handshake" | "sparkles";
};

export const involvedSection = {
  heading: "Be Part of Something Meaningful.",
  intro:
    "Whether you give your time, collaborate as a partner, or simply walk with us — there is a place for you in this mission.",
} as const;

export const involvementOptions: InvolvementOption[] = [
  {
    id: "volunteer",
    title: "Become a Volunteer",
    description:
      "Share your skills and presence where compassion meets action. Volunteers help programs reach further with care.",
    ctaLabel: "Talk to Us",
    href: "/#contact",
    icon: "handHeart",
  },
  {
    id: "partner",
    title: "Become a Partner",
    description:
      "Organizations and community leaders can amplify impact through collaboration built on trust and shared purpose.",
    ctaLabel: "Start a Conversation",
    href: "/#contact",
    icon: "handshake",
  },
  {
    id: "community",
    title: "Join Our Community",
    description:
      "Stay connected to our journey. Follow our mission, share our story, and help hope travel further.",
    ctaLabel: "Get in Touch",
    href: "/#contact",
    icon: "sparkles",
  },
];
