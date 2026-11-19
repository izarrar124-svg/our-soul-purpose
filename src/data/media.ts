/**
 * Site imagery paths and credits.
 * Portfolio field photography lives in /public/images/portfolio.
 */

export type MediaAsset = {
  src: string;
  alt: string;
  credit: string;
  note: string;
};

export const media = {
  hero: {
    src: "/images/portfolio/portfolio-01.jpg",
    alt: "Our Soul Purpose relief distribution — compassion in action",
    credit: "Our Soul Purpose",
    note: "",
  },
  about: {
    src: "/images/portfolio/portfolio-02.jpg",
    alt: "Our Soul Purpose community support work",
    credit: "Our Soul Purpose",
    note: "",
  },
  programs: {
    src: "/images/programs/programs.jpg",
    alt: "Hands offering care and support",
    credit: "Unsplash",
    note: "",
  },
  donate: {
    src: "/images/portfolio/portfolio-03.jpg",
    alt: "Humanitarian relief packages prepared with dignity",
    credit: "Our Soul Purpose",
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
