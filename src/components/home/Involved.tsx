"use client";

import { HandHeart, Handshake, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  involvementOptions,
  involvedSection,
  type InvolvementOption,
} from "@/data/involved";

const iconMap: Record<InvolvementOption["icon"], LucideIcon> = {
  handHeart: HandHeart,
  handshake: Handshake,
  sparkles: Sparkles,
};

export function Involved() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="involved" tone="mist">
      <SectionHeading
        eyebrow="Get Involved"
        title={involvedSection.heading}
        description={involvedSection.intro}
        align="center"
        className="mb-14"
      />
      <ul className="grid gap-10 md:grid-cols-3 md:gap-8">
        {involvementOptions.map((option, index) => {
          const Icon = iconMap[option.icon];
          return (
            <motion.li
              key={option.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex h-full flex-col"
            >
              <span className="mb-5 flex size-12 items-center justify-center rounded-full bg-cream text-navy">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <h3 className="font-heading text-2xl font-semibold text-navy">
                {option.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                {option.description}
              </p>
              <Button
                href={option.href}
                className="mt-7 self-start"
                size="sm"
                variant={option.id === "give" ? "primary" : "outline"}
              >
                {option.ctaLabel}
              </Button>
            </motion.li>
          );
        })}
      </ul>
    </Section>
  );
}
