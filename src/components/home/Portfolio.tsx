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
    activeIndex !== null ? filtered[activeIndex] ?? null : null;

  function openItem(item: PortfolioItem) {
    const index = filtered.findIndex((entry) => entry.id === item.id);
    setActiveIndex(index >= 0 ? index : null);
  }

  return (
    <Section id="portfolio" tone="cream">
      <SectionHeading
        eyebrow={portfolioSection.eyebrow}
        title={portfolioSection.heading}
        description={portfolioSection.intro}
        className="mb-10 max-w-3xl"
      />

      <div
        className="mb-10 flex flex-wrap gap-2"
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
                "px-3.5 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-navy text-white"
                  : "bg-white text-navy hover:bg-mist",
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
        <div className="grid gap-4 lg:grid-cols-12 lg:gap-5">
          {featured ? (
            <motion.button
              type="button"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              onClick={() => openItem(featured)}
              className="group relative min-h-[22rem] overflow-hidden bg-mist text-left sm:min-h-[28rem] lg:col-span-7 lg:min-h-[36rem]"
            >
              <Image
                src={featured.src}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 45%, rgba(22,58,92,0.78) 100%)",
                }}
                aria-hidden
              />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                <span className="inline-block bg-gold px-2.5 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-white uppercase">
                  {categoryLabels[featured.category]}
                </span>
                <p
                  className="mt-3 font-heading text-2xl font-semibold sm:text-3xl"
                  style={{ color: "#ffffff" }}
                >
                  {featured.title}
                </p>
              </div>
            </motion.button>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:gap-5">
            {rest.slice(0, 4).map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                onClick={() => openItem(item)}
                className="group relative min-h-[11rem] overflow-hidden bg-mist text-left sm:min-h-[12.5rem]"
              >
                <Image
                  src={item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 50vw, 28vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, transparent 40%, rgba(22,58,92,0.72) 100%)",
                  }}
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <span className="text-[0.65rem] font-semibold tracking-[0.14em] text-gold uppercase">
                    {categoryLabels[item.category]}
                  </span>
                  <p
                    className="mt-1 font-heading text-lg font-semibold"
                    style={{ color: "#ffffff" }}
                  >
                    {item.title}
                  </p>
                </div>
              </motion.button>
            ))}
          </div>

          {rest.length > 4 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-12 lg:grid-cols-4">
              {rest.slice(4).map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.03 }}
                >
                  <button
                    type="button"
                    onClick={() => openItem(item)}
                    className="group relative block aspect-[4/3] w-full overflow-hidden bg-mist text-left"
                  >
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      sizes="(max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 35%, rgba(22,58,92,0.75) 100%)",
                      }}
                      aria-hidden
                    />
                    <span className="absolute bottom-3 left-3 bg-cream/95 px-2 py-1 text-[0.65rem] font-semibold tracking-[0.12em] text-navy uppercase opacity-0 transition-opacity group-hover:opacity-100">
                      {categoryLabels[item.category]}
                    </span>
                  </button>
                </motion.li>
              ))}
            </ul>
          ) : null}
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
        hasNext={
          activeIndex !== null && activeIndex < filtered.length - 1
        }
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
