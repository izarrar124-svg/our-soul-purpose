/**
 * Temporary atmospheric imagery for layout and atmosphere.
 * These images are licensed stock placeholders — not OSP beneficiaries or completed projects.
 * Replace files in /public/images and update paths here when original photography is available.
 */

export type MediaAsset = {
  src: string;
  alt: string;
  credit: string;
  note: string;
};

export const media = {
  hero: {
    src: "/images/hero/hero.jpg",
    alt: "Atmospheric photograph of people gathered in mutual support — illustrative imagery",
    credit: "Unsplash",
    note: "",
  },
  about: {
    src: "/images/about/about.jpg",
    alt: "Community volunteers working together",
    credit: "Unsplash",
    note: "",
  },
  programs: {
    src: "/images/programs/programs.jpg",
    alt: "Hands offering care and support",
    credit: "Unsplash",
    note: "",
  },
  presence: {
    src: "/images/map/presence.jpg",
    alt: "World map of Our Soul Purpose locations",
    credit: "Unsplash",
    note: "",
  },
  logo: {
    src: "/images/brand/logo-primary.jpeg",
    alt: "Our Soul Purpose logo — two caring hands holding a globe with a hopeful figure at its heart",
    credit: "Our Soul Purpose",
    note: "Approved brand logo",
  },
} as const satisfies Record<string, MediaAsset>;
