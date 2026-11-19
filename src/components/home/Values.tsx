"use client";

import {
  HeartHandshake,
  ShieldCheck,
  Sun,
  Users,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { values, valuesSection, type ValueItem } from "@/data/values";

const iconMap: Record<ValueItem["icon"], LucideIcon> = {
  heartHandshake: HeartHandshake,
  shieldCheck: ShieldCheck,
  users: Users,
  sun: Sun,
};

export function Values() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="values" tone="white">
      <SectionHeading
        eyebrow="Our Values"
        title={valuesSection.heading}
        description={valuesSection.intro}
        align="center"
        className="mb-12"
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((value, index) => {
          const Icon = iconMap[value.icon];
          return (
            <motion.li
              key={value.id}
              initial={reduceMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="border border-navy/10 bg-cream p-6 text-center"
            >
              <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-mist text-navy">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-heading text-xl font-semibold text-navy">
                {value.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink">
                {value.description}
              </p>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
