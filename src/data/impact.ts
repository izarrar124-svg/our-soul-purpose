/**
 * Impact content is narrative-only until verified statistics are supplied.
 * Do not invent lives supported, families assisted, or project counts.
 */

export type ImpactMetric = {
  label: string;
  value: string;
  source: "verified";
};

/** Populate only with organization-verified figures */
export const impactMetrics: ImpactMetric[] = [];

export const impactSection = {
  heading: "Every Action Creates a Ripple of Change.",
  intro: {
    body: "Impact is not only measured in totals — it is felt in restored dignity, shared meals, safer water, and a child who can return to school. As Our Soul Purpose grows, we will share verified figures with the same transparency we bring to every act of service.",
    source: "proposed" as const,
  },
  pillars: [
    {
      title: "Lives supported with dignity",
      description:
        "We centre every initiative on the individual — one life, treated with respect.",
    },
    {
      title: "Families strengthened",
      description:
        "Food, shelter, and care that help households steady themselves in difficult seasons.",
    },
    {
      title: "Communities renewed",
      description:
        "Clean water, education, and healthcare that lift whole neighbourhoods over time.",
    },
  ],
  note: "Verified impact statistics will appear here once supplied by the organization. No provisional numbers are displayed.",
} as const;
