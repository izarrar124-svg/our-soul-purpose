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
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <SectionHeading
          eyebrow="Our Values"
          title={valuesSection.heading}
          description={valuesSection.intro}
          className="lg:col-span-4"
        />
        <ul className="grid gap-0 sm:grid-cols-2 lg:col-span-8">
          {values.map((value, index) => {
            const Icon = iconMap[value.icon];
            return (
              <motion.li
                key={value.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="border-t border-navy/10 px-0 py-8 sm:px-6 sm:odd:border-r sm:odd:pr-8 sm:even:pl-8"
              >
                <span className="mb-5 flex size-11 items-center justify-center rounded-full bg-mist text-navy">
                  <Icon className="size-5" strokeWidth={1.5} aria-hidden />
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
      </div>
    </Section>
  );
}
