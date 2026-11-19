"use client";

import { useState } from "react";
import {
  Baby,
  Droplets,
  GraduationCap,
  HeartPulse,
  Home,
  Refrigerator,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { programs, programsSection, type Program } from "@/data/programs";

const iconMap: Record<Program["icon"], LucideIcon> = {
  utensils: Utensils,
  home: Home,
  droplets: Droplets,
  graduationCap: GraduationCap,
  refrigerator: Refrigerator,
  heartPulse: HeartPulse,
  baby: Baby,
};

export function Programs() {
  const [active, setActive] = useState<Program | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="programs" tone="white">
      <SectionHeading
        eyebrow="Our Programs"
        title={programsSection.heading}
        description={programsSection.intro}
        align="center"
        className="mb-12"
      />

      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {programs.map((program, index) => {
          const Icon = iconMap[program.icon];
          return (
            <motion.li
              key={program.id}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.04 }}
            >
              <article className="flex h-full flex-col border border-navy/10 bg-cream p-6 transition-colors hover:border-globe/50">
                <div className="mb-5 flex size-12 items-center justify-center rounded-full bg-mist text-navy">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="font-heading text-xl font-semibold text-navy">
                  {program.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-ink">
                  {program.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setActive(program)}
                  className="mt-5 self-start text-sm font-semibold text-navy underline-offset-4 hover:text-ocean hover:underline"
                >
                  Learn More
                  <span className="sr-only"> about {program.title}</span>
                </button>
              </article>
            </motion.li>
          );
        })}
      </ul>

      <Modal
        open={Boolean(active)}
        onClose={() => setActive(null)}
        title={active?.title ?? ""}
      >
        {active ? (
          <div className="space-y-4">
            <p className="text-ink leading-relaxed">{active.details}</p>
            <p className="text-xs text-ink/60">
              Program summary verified from brand guidelines. Extended
              description is proposed website copy pending official review.
            </p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
