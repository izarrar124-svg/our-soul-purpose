"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import {
  portfolioFilters,
  portfolioItems,
  portfolioSection,
  type PortfolioCategory,
  type PortfolioItem,
} from "@/data/portfolio";
import { cn } from "@/lib/cn";

const categoryLabels = Object.fromEntries(
  portfolioFilters.map((f) => [f.id, f.label]),
) as Record<"all" | PortfolioCategory, string>;

const aspectCycle = [
  "aspect-[4/5]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[5/4]",
  "aspect-[4/3]",
] as const;

export function Portfolio() {
  const reduceMotion = useReducedMotion();
  const [filter, setFilter] = useState<"all" | PortfolioCategory>("all");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const filtered = useMemo(() => {
    if (filter === "all") return portfolioItems;
    return portfolioItems.filter((item) => item.category === filter);
  }, [filter]);

  const featured = filtered.find((item) => item.featured) ?? filtered[0];
  const rest = filtered.filter((item) => item.id !== featured?.id);

  const activeItem =
    activeIndex !== null ? (filtered[activeIndex] ?? null) : null;

  function openItem(item: PortfolioItem) {
    const index = filtered.findIndex((entry) => entry.id === item.id);
    setActiveIndex(index >= 0 ? index : null);
  }

  return (
    <Section id="portfolio" tone="mist">
      <SectionHeading
        eyebrow={portfolioSection.eyebrow}
        title={portfolioSection.heading}
        description={portfolioSection.intro}
        className="mb-10 max-w-3xl"
      />

      <div
        className="mb-12 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Portfolio filters"
      >
        {portfolioFilters.map((entry) => {
          const count =
            entry.id === "all"
              ? portfolioItems.length
              : portfolioItems.filter((item) => item.category === entry.id)
                  .length;
          if (entry.id !== "all" && count === 0) return null;

          const isActive = filter === entry.id;
          return (
            <button
              key={entry.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(entry.id)}
              className={cn(
                "border px-3.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "border-navy bg-navy text-white"
                  : "border-navy/15 bg-transparent text-navy hover:border-navy/35",
              )}
            >
              {entry.label}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-ink/70">
          No portfolio photos in this category yet.
        </p>
      ) : (
        <div className="space-y-5">
          {featured ? (
            <motion.button
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => openItem(featured)}
              className="group relative grid w-full overflow-hidden bg-cream text-left lg:grid-cols-12"
            >
              <div className="relative min-h-[22rem] lg:col-span-8 lg:min-h-[34rem]">
                <Image
                  src={featured.src}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  priority
                />
              </div>
              <div className="flex flex-col justify-end p-6 sm:p-8 lg:col-span-4 lg:p-10">
                <span className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold uppercase">
                  {categoryLabels[featured.category]}
                </span>
                <p className="mt-3 font-heading text-2xl font-semibold text-navy sm:text-3xl">
                  {featured.title}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  {featured.description}
                </p>
                <span className="mt-6 text-sm font-semibold text-navy underline-offset-4 group-hover:underline">
                  View photo
                </span>
              </div>
            </motion.button>
          ) : null}

          <ul className="columns-1 gap-5 sm:columns-2 lg:columns-3">
            {rest.map((item, index) => (
              <motion.li
                key={item.id}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: Math.min(index * 0.03, 0.3) }}
                className="mb-5 break-inside-avoid"
              >
                <button
                  type="button"
                  onClick={() => openItem(item)}
                  className="group relative block w-full overflow-hidden bg-cream text-left"
                >
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      aspectCycle[index % aspectCycle.length],
                    )}
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 40%, rgba(22,58,92,0.78) 100%)",
                      }}
                      aria-hidden
                    />
                  </div>
                  <div className="p-4">
                    <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-ocean uppercase">
                      {categoryLabels[item.category]}
                    </span>
                    <p className="mt-1.5 font-heading text-lg font-semibold text-navy">
                      {item.title}
                    </p>
                  </div>
                </button>
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      <Lightbox
        open={activeIndex !== null}
        onClose={() => setActiveIndex(null)}
        item={
          activeItem
            ? {
                src: activeItem.src,
                title: activeItem.title,
                description: activeItem.description,
                categoryLabel: categoryLabels[activeItem.category],
              }
            : null
        }
        hasPrev={activeIndex !== null && activeIndex > 0}
        hasNext={activeIndex !== null && activeIndex < filtered.length - 1}
        onPrev={() =>
          setActiveIndex((prev) =>
            prev !== null && prev > 0 ? prev - 1 : prev,
          )
        }
        onNext={() =>
          setActiveIndex((prev) =>
            prev !== null && prev < filtered.length - 1 ? prev + 1 : prev,
          )
        }
      />
    </Section>
  );
}
