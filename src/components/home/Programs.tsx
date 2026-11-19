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
  const [featured, ...rest] = programs;

  return (
    <Section id="programs" tone="white">
      <SectionHeading
        eyebrow="Our Programs"
        title={programsSection.heading}
        description={programsSection.intro}
        className="mb-14 max-w-3xl"
      />

      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        {featured ? (
          <motion.article
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-between border-t border-navy/15 pt-8 lg:col-span-5"
          >
            <div>
              <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-mist text-navy">
                {(() => {
                  const Icon = iconMap[featured.icon];
                  return <Icon className="size-6" strokeWidth={1.5} aria-hidden />;
                })()}
              </div>
              <p className="text-[0.65rem] font-semibold tracking-[0.18em] text-gold uppercase">
                Featured focus
              </p>
              <h3 className="mt-3 font-heading text-3xl font-semibold text-navy">
                {featured.title}
              </h3>
              <p className="mt-4 text-base leading-relaxed text-ink">
                {featured.summary}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setActive(featured)}
              className="mt-8 self-start text-sm font-semibold text-navy underline-offset-4 hover:text-ocean hover:underline"
            >
              Learn More
              <span className="sr-only"> about {featured.title}</span>
            </button>
          </motion.article>
        ) : null}

        <ul className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:col-span-7">
          {rest.map((program, index) => {
            const Icon = iconMap[program.icon];
            return (
              <motion.li
                key={program.id}
                initial={reduceMotion ? false : { opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
              >
                <article className="group h-full border-t border-navy/10 pt-5 transition-colors hover:border-gold/50">
                  <div className="mb-4 flex size-11 items-center justify-center rounded-full bg-mist text-navy">
                    <Icon className="size-5" strokeWidth={1.5} aria-hidden />
                  </div>
                  <h3 className="font-heading text-xl font-semibold text-navy">
                    {program.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {program.summary}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActive(program)}
                    className="mt-4 text-sm font-semibold text-navy underline-offset-4 hover:text-ocean hover:underline"
                  >
                    Learn More
                    <span className="sr-only"> about {program.title}</span>
                  </button>
                </article>
              </motion.li>
            );
          })}
        </ul>
      </div>

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
