/**
 * Story cards are illustrative examples for website structure.
 * They are clearly labeled and must not be presented as verified beneficiary testimonials.
 */

export type Story = {
  id: string;
  title: string;
  summary: string;
  body: string;
  image: string;
  imageAlt: string;
  kind: "illustrative";
  /** Only set when a verified location exists; omit invented places */
  location?: string;
};

export const storiesSection = {
  heading: "Behind Every Number, There Is a Human Story.",
  intro:
    "Stories remind us why this work matters. Until verified accounts are ready to share with consent, the examples below illustrate the kinds of change our programs aim to support.",
} as const;

export const stories: Story[] = [
  {
    id: "illustrative-nourishment",
    title: "When a Meal Restores the Day",
    summary:
      "An illustrative look at how food relief can steady a household through a hard week.",
    body: "In communities where resources are stretched thin, reliable access to food can restore calm to a home. This illustrative example reflects the spirit of our Food Relief program: practical support offered with dignity, so families can focus on tomorrow with a little more hope.",
    image: "/images/stories/story-1.jpg",
    imageAlt:
      "Atmospheric photograph of hands sharing food — illustrative imagery, not an Our Soul Purpose beneficiary",
    kind: "illustrative",
  },
  {
    id: "illustrative-water",
    title: "Water That Changes a Morning",
    summary:
      "An illustrative vignette on what clean water can mean for daily life.",
    body: "Fetching unsafe water costs time, energy, and health. This illustrative story reflects the promise of Clean Water Wells: when a village gains safer drinking water, mornings become lighter and futures feel more reachable — one well, many lives.",
    image: "/images/stories/story-2.jpg",
    imageAlt:
      "Atmospheric photograph suggesting access to water — illustrative imagery, not a completed OSP project",
    kind: "illustrative",
  },
  {
    id: "illustrative-learning",
    title: "A Uniform, A Classroom, A Chance",
    summary:
      "An illustrative portrait of educational support opening a path to learning.",
    body: "Fees, books, and uniforms should never be the reason a student stays home. This illustrative example mirrors our Educational Support program — removing practical barriers so young people can pursue learning with dignity and ambition.",
    image: "/images/stories/story-3.jpg",
    imageAlt:
      "Atmospheric photograph related to learning and community — illustrative imagery, not an identified student",
    kind: "illustrative",
  },
];
