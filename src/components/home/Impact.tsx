"use client";

import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { impactMetrics, impactSection } from "@/data/impact";

export function Impact() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="impact" tone="navy" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "radial-gradient(circle at 18% 18%, #5fa4c1 0%, transparent 42%), radial-gradient(circle at 82% 72%, #0f4c6e 0%, transparent 38%)",
        }}
        aria-hidden
      />
      <div className="relative">
        <SectionHeading
          eyebrow="Our Impact"
          title={impactSection.heading}
          description={impactSection.intro.body}
          tone="light"
          align="center"
          className="mb-14"
        />

        {impactMetrics.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric) => (
              <li
                key={metric.label}
                className="border border-white/15 bg-white/5 p-6 text-center"
              >
                <p className="font-heading text-3xl font-semibold text-gold">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-white/80">{metric.label}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-8 md:grid-cols-3 md:gap-10">
            {impactSection.pillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="md:border-l md:border-white/15 md:pl-8 first:md:border-l-0 first:md:pl-0"
              >
                <p
                  className="mb-3 font-sans text-[0.65rem] font-semibold tracking-[0.2em] uppercase"
                  style={{ color: "rgba(200,135,31,0.95)" }}
                >
                  0{index + 1}
                </p>
                <h3
                  className="font-heading text-xl text-white"
                  style={{ fontWeight: 600, color: "#ffffff" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="mt-3 text-sm leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.85)" }}
                >
                  {pillar.description}
                </p>
              </motion.li>
            ))}
          </ul>
        )}

        <p
          className="mt-12 text-center text-sm"
          style={{ color: "rgba(255,255,255,0.58)" }}
        >
          {impactSection.note}
        </p>
      </div>
    </Section>
  );
}
