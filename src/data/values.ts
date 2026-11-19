export type ValueItem = {
  id: string;
  title: string;
  description: string;
  icon: "heartHandshake" | "shieldCheck" | "users" | "sun";
};

export const valuesSection = {
  heading: "What Guides Us",
  intro:
    "Our values shape every program, partnership, and conversation — warm, clear, and respectful.",
} as const;

export const values: ValueItem[] = [
  {
    id: "compassion",
    title: "Compassion",
    description:
      "We meet people with warmth and empathy — never pity — honouring their dignity in every interaction.",
    icon: "heartHandshake",
  },
  {
    id: "integrity",
    title: "Integrity",
    description:
      "We speak plainly, act accountably, and report with honesty so trust can grow with every step.",
    icon: "shieldCheck",
  },
  {
    id: "community",
    title: "Community",
    description:
      "We believe lasting change is shared — neighbours, volunteers, and partners rising together.",
    icon: "users",
  },
  {
    id: "hope",
    title: "Hope",
    description:
      "We focus on solutions and possibility, celebrating progress one life at a time.",
    icon: "sun",
  },
];
