"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { aboutSection } from "@/data/about";
import { media } from "@/data/media";

export function About() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="about" tone="cream">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
          className="lg:col-span-6"
        >
          <SectionHeading
            eyebrow="About Us"
            title={aboutSection.heading}
            description={aboutSection.introduction.body}
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10">
            <div className="border-t border-gold pt-5">
              <h3 className="font-heading text-xl font-semibold text-navy">
                {aboutSection.mission.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                {aboutSection.mission.body}
              </p>
            </div>
            <div className="border-t border-globe pt-5">
              <h3 className="font-heading text-xl font-semibold text-navy">
                {aboutSection.vision.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink sm:text-base">
                {aboutSection.vision.body}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative lg:col-span-6"
        >
          <div className="relative min-h-[26rem] overflow-hidden sm:min-h-[32rem] lg:min-h-[40rem]">
            <Image
              src={media.about.src}
              alt={media.about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className="object-cover"
            />
          </div>
          <div
            className="pointer-events-none absolute -bottom-4 -left-4 hidden h-24 w-24 border border-gold/40 lg:block"
            aria-hidden
          />
        </motion.figure>
      </div>
    </Section>
  );
}
