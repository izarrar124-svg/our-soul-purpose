/**
 * Site imagery paths and credits.
 * Portfolio field photography lives ONLY in /public/images/portfolio
 * and must not be referenced outside the Portfolio gallery.
 */

export type MediaAsset = {
  src: string;
  alt: string;
  credit: string;
  note: string;
};

export const media = {
  about: {
    src: "/images/about/about.jpg",
    alt: "Hands joined in care — a symbol of shared humanity",
    credit: "Unsplash",
    note: "Atmospheric editorial image; not OSP field photography",
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
  logoMark: {
    src: "/images/brand/logo-mark.png",
    alt: "Our Soul Purpose emblem",
    credit: "Our Soul Purpose",
    note: "Approved brand mark",
  },
} as const satisfies Record<string, MediaAsset>;
