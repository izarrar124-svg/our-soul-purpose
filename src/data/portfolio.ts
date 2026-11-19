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
    "A curated look at Our Soul Purpose relief work — packaged with dignity, delivered with care.",
} as const;

/**
 * Curated gallery (not every available photo).
 * Captions stay factual — no invented beneficiary names.
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
    id: "p20",
    src: "/images/portfolio/portfolio-20.jpg",
    category: "food-relief",
    title: "Packing staples into relief kits",
    description:
      "Grains, canned goods, and essentials packed for food relief kits.",
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
    id: "p15",
    src: "/images/portfolio/portfolio-15.jpg",
    category: "food-relief",
    title: "Team carrying relief boxes",
    description: "Volunteers transport branded packages for distribution.",
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
    id: "p25",
    src: "/images/portfolio/portfolio-25.jpg",
    category: "ramadan-fridges",
    title: "Ramadan food package received",
    description: "Relief box and grain support shared during Ramadan.",
    source: "organization",
  },
  {
    id: "p30",
    src: "/images/portfolio/portfolio-30.jpg",
    category: "ramadan-fridges",
    title: "Outdoor Ramadan relief handoff",
    description:
      "A relief package and staple sack shared during distribution.",
    source: "organization",
  },
  {
    id: "p03",
    src: "/images/portfolio/portfolio-03.jpg",
    category: "food-relief",
    title: "Community food relief moment",
    description: "Relief packages shared during a local distribution gathering.",
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
    id: "p08",
    src: "/images/portfolio/portfolio-08.jpg",
    category: "ramadan-fridges",
    title: "Ramadan distribution gathering",
    description: "Relief boxes delivered under Our Soul Purpose banners.",
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
];
