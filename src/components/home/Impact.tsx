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
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 50% 40% at 10% 0%, rgba(95,164,193,0.2), transparent), radial-gradient(ellipse 40% 35% at 90% 100%, rgba(15,76,110,0.5), transparent)",
        }}
        aria-hidden
      />
      <div className="relative">
        <SectionHeading
          eyebrow="Our Impact"
          title={impactSection.heading}
          description={impactSection.intro.body}
          tone="light"
          className="mb-16 max-w-3xl"
        />

        {impactMetrics.length > 0 ? (
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {impactMetrics.map((metric) => (
              <li key={metric.label} className="border-t border-white/20 pt-6">
                <p className="font-heading text-4xl font-semibold text-gold">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm text-white/75">{metric.label}</p>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="grid gap-12 md:grid-cols-3 md:gap-10">
            {impactSection.pillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <p
                  className="font-heading text-5xl font-semibold tracking-tight sm:text-6xl"
                  style={{ color: "rgba(200,135,31,0.45)" }}
                >
                  0{index + 1}
                </p>
                <h3
                  className="mt-4 font-heading text-2xl"
                  style={{ fontWeight: 600, color: "#ffffff" }}
                >
                  {pillar.title}
                </h3>
                <p
                  className="mt-4 text-sm leading-relaxed sm:text-base"
                  style={{ color: "rgba(255,255,255,0.82)" }}
                >
                  {pillar.description}
                </p>
              </motion.li>
            ))}
          </ul>
        )}

        <p
          className="mt-14 max-w-2xl text-sm"
          style={{ color: "rgba(255,255,255,0.5)" }}
        >
          {impactSection.note}
        </p>
      </div>
    </Section>
  );
}
