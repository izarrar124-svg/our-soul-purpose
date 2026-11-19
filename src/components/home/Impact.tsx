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
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #5fa4c1 0%, transparent 45%), radial-gradient(circle at 80% 70%, #0f4c6e 0%, transparent 40%)",
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
          className="mb-12"
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
          <ul className="grid gap-5 md:grid-cols-3">
            {impactSection.pillars.map((pillar, index) => (
              <motion.li
                key={pillar.title}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                className="border p-6"
                style={{
                  borderColor: "rgba(255,255,255,0.18)",
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
              >
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
          className="mt-10 text-center text-sm"
          style={{ color: "rgba(255,255,255,0.6)" }}
        >
          {impactSection.note}
        </p>
      </div>
    </Section>
  );
}
