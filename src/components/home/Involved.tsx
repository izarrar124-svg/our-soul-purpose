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
    <Section id="involved" tone="mist" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-20 -bottom-24 size-72 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(95,164,193,0.35), transparent 70%)",
        }}
        aria-hidden
      />
      <SectionHeading
        eyebrow="Get Involved"
        title={involvedSection.heading}
        description={involvedSection.intro}
        className="mb-14 max-w-3xl"
      />
      <ul className="relative grid gap-0 md:grid-cols-3">
        {involvementOptions.map((option, index) => {
          const Icon = iconMap[option.icon];
          return (
            <motion.li
              key={option.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="flex h-full flex-col border-t border-navy/15 py-8 md:border-t-0 md:border-l md:px-8 md:py-0 md:first:border-l-0 md:first:pl-0"
            >
              <span className="mb-5 flex size-11 items-center justify-center rounded-full bg-cream text-navy">
                <Icon className="size-5" strokeWidth={1.5} aria-hidden />
              </span>
              <h3 className="font-heading text-2xl font-semibold text-navy">
                {option.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink">
                {option.description}
              </p>
              <Button
                href={option.href}
                className="mt-8 self-start"
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
