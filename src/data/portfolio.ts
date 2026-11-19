export type PortfolioCategory =
  | "food-relief"
  | "housing-relief"
  | "clean-water"
  | "education"
  | "ramadan-fridges"
  | "healthcare"
  | "orphan-support";

export type PortfolioItem = {
  id: string;
  src: string;
  category: PortfolioCategory;
  title: string;
  description: string;
  source: "organization";
  featured?: boolean;
};

export const portfolioFilters: { id: "all" | PortfolioCategory; label: string }[] =
  [
    { id: "all", label: "All" },
    { id: "food-relief", label: "Food Relief" },
    { id: "housing-relief", label: "Housing Relief" },
    { id: "clean-water", label: "Clean Water" },
    { id: "education", label: "Education" },
    { id: "ramadan-fridges", label: "Ramadan Fridges" },
    { id: "healthcare", label: "Healthcare" },
    { id: "orphan-support", label: "Orphan Support" },
  ];

export const portfolioSection = {
  eyebrow: "Portfolio",
  heading: "Small Actions. Meaningful Change.",
  intro:
    "Field photography from Our Soul Purpose relief work — packaged with dignity, delivered with care, and shared without inventing names or unverified claims.",
} as const;

/**
 * Captions describe what the photos show (organization field photography).
 * Categories map to program areas; most current assets document Ramadan food relief.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: "p01",
    src: "/images/portfolio/portfolio-01.jpg",
    category: "food-relief",
    title: "Ramadan relief packages prepared",
    description:
      "Branded food relief boxes staged for distribution during Ramadan.",
    source: "organization",
    featured: true,
  },
  {
    id: "p02",
    src: "/images/portfolio/portfolio-02.jpg",
    category: "food-relief",
    title: "Essential relief packing",
    description: "Volunteers prepare sealed packages for community distribution.",
    source: "organization",
  },
  {
    id: "p03",
    src: "/images/portfolio/portfolio-03.jpg",
    category: "ramadan-fridges",
    title: "Ramadan food relief distribution",
    description: "Community members receive Ramadan relief packages with care.",
    source: "organization",
  },
  {
    id: "p04",
    src: "/images/portfolio/portfolio-04.jpg",
    category: "food-relief",
    title: "Dignity-centered handoff",
    description: "Relief packages shared during a local distribution gathering.",
    source: "organization",
  },
  {
    id: "p05",
    src: "/images/portfolio/portfolio-05.jpg",
    category: "ramadan-fridges",
    title: "Ramadan relief with community",
    description:
      "Our Soul Purpose banners and packaged relief shared during Ramadan.",
    source: "organization",
  },
  {
    id: "p06",
    src: "/images/portfolio/portfolio-06.jpg",
    category: "food-relief",
    title: "Sealed relief boxes ready",
    description: "Labeled packages prepared for families in need.",
    source: "organization",
  },
  {
    id: "p07",
    src: "/images/portfolio/portfolio-07.jpg",
    category: "food-relief",
    title: "Community distribution moment",
    description: "Field photography from an Our Soul Purpose relief day.",
    source: "organization",
  },
  {
    id: "p08",
    src: "/images/portfolio/portfolio-08.jpg",
    category: "ramadan-fridges",
    title: "Ramadan distribution gathering",
    description: "Relief boxes delivered under Our Soul Purpose banners.",
    source: "organization",
  },
  {
    id: "p09",
    src: "/images/portfolio/portfolio-09.jpg",
    category: "food-relief",
    title: "Relief packages in transit",
    description: "Boxes prepared and moved for same-day community support.",
    source: "organization",
  },
  {
    id: "p10",
    src: "/images/portfolio/portfolio-10.jpg",
    category: "ramadan-fridges",
    title: "Ramadan essential relief handoff",
    description: "A sealed Ramadan relief package shared with a household.",
    source: "organization",
  },
  {
    id: "p11",
    src: "/images/portfolio/portfolio-11.jpg",
    category: "food-relief",
    title: "Organized relief staging",
    description: "Packages arranged ahead of community distribution.",
    source: "organization",
  },
  {
    id: "p12",
    src: "/images/portfolio/portfolio-12.jpg",
    category: "food-relief",
    title: "Field distribution day",
    description: "Our Soul Purpose team supporting families with packaged aid.",
    source: "organization",
  },
  {
    id: "p13",
    src: "/images/portfolio/portfolio-13.jpg",
    category: "ramadan-fridges",
    title: "Ramadan community support",
    description: "Relief packages shared during the blessed month.",
    source: "organization",
  },
  {
    id: "p14",
    src: "/images/portfolio/portfolio-14.jpg",
    category: "food-relief",
    title: "Careful package handoff",
    description: "Aid delivered with respect for privacy and dignity.",
    source: "organization",
  },
  {
    id: "p15",
    src: "/images/portfolio/portfolio-15.jpg",
    category: "food-relief",
    title: "Team carrying relief boxes",
    description: "Volunteers transport branded packages for distribution.",
    source: "organization",
  },
  {
    id: "p16",
    src: "/images/portfolio/portfolio-16.jpg",
    category: "ramadan-fridges",
    title: "Ramadan relief branding on site",
    description: "Banners and packages marking a local Ramadan relief effort.",
    source: "organization",
  },
  {
    id: "p17",
    src: "/images/portfolio/portfolio-17.jpg",
    category: "food-relief",
    title: "Household food support",
    description: "Essential packages prepared for families facing hardship.",
    source: "organization",
  },
  {
    id: "p18",
    src: "/images/portfolio/portfolio-18.jpg",
    category: "food-relief",
    title: "Distribution courtyard",
    description: "Community space used for calm, organized relief delivery.",
    source: "organization",
  },
  {
    id: "p19",
    src: "/images/portfolio/portfolio-19.jpg",
    category: "ramadan-fridges",
    title: "Ramadan package presentation",
    description: "Labeled relief boxes presented during Ramadan outreach.",
    source: "organization",
  },
  {
    id: "p20",
    src: "/images/portfolio/portfolio-20.jpg",
    category: "food-relief",
    title: "Packing staples into relief boxes",
    description:
      "Grains, canned goods, and essentials packed for food relief kits.",
    source: "organization",
  },
  {
    id: "p21",
    src: "/images/portfolio/portfolio-21.jpg",
    category: "food-relief",
    title: "Logistics of compassion",
    description: "Boxes stacked and ready before a community distribution.",
    source: "organization",
  },
  {
    id: "p22",
    src: "/images/portfolio/portfolio-22.jpg",
    category: "ramadan-fridges",
    title: "Ramadan relief shared nearby",
    description: "A household receives a sealed Ramadan food package.",
    source: "organization",
  },
  {
    id: "p23",
    src: "/images/portfolio/portfolio-23.jpg",
    category: "food-relief",
    title: "Prepared boxes awaiting delivery",
    description: "Our Soul Purpose relief kits staged for same-day support.",
    source: "organization",
  },
  {
    id: "p24",
    src: "/images/portfolio/portfolio-24.jpg",
    category: "food-relief",
    title: "Community relief exchange",
    description: "Field photography from a local food relief distribution.",
    source: "organization",
  },
  {
    id: "p25",
    src: "/images/portfolio/portfolio-25.jpg",
    category: "ramadan-fridges",
    title: "Ramadan food package received",
    description: "Relief box and grain support shared during Ramadan.",
    source: "organization",
  },
  {
    id: "p26",
    src: "/images/portfolio/portfolio-26.jpg",
    category: "food-relief",
    title: "Support delivered with care",
    description: "Packages handed over quietly and respectfully.",
    source: "organization",
  },
  {
    id: "p27",
    src: "/images/portfolio/portfolio-27.jpg",
    category: "food-relief",
    title: "Relief supplies on site",
    description: "Food staples and sealed boxes prepared for distribution.",
    source: "organization",
  },
  {
    id: "p28",
    src: "/images/portfolio/portfolio-28.jpg",
    category: "ramadan-fridges",
    title: "Ramadan outreach day",
    description: "Branded relief packages shared under mission banners.",
    source: "organization",
  },
  {
    id: "p29",
    src: "/images/portfolio/portfolio-29.jpg",
    category: "food-relief",
    title: "Family food support kit",
    description: "A sealed kit prepared as part of food relief efforts.",
    source: "organization",
  },
  {
    id: "p30",
    src: "/images/portfolio/portfolio-30.jpg",
    category: "ramadan-fridges",
    title: "Ramadan relief handoff outdoors",
    description:
      "A relief package and staple sack shared during Ramadan distribution.",
    source: "organization",
  },
  {
    id: "p31",
    src: "/images/portfolio/portfolio-31.jpg",
    category: "food-relief",
    title: "Closing a distribution day",
    description: "Field photography capturing the close of a relief effort.",
    source: "organization",
  },
];
