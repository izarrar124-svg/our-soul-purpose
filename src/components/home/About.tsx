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
      <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55 }}
        >
          <SectionHeading
            eyebrow="About Us"
            title={aboutSection.heading}
            description={aboutSection.introduction.body}
          />
          <div className="mt-8 space-y-6">
            <div className="border-l-2 border-gold pl-5">
              <h3 className="font-heading text-xl font-semibold text-navy">
                {aboutSection.mission.title}
              </h3>
              <p className="mt-2 text-ink leading-relaxed">
                {aboutSection.mission.body}
              </p>
            </div>
            <div className="border-l-2 border-globe pl-5">
              <h3 className="font-heading text-xl font-semibold text-navy">
                {aboutSection.vision.title}
              </h3>
              <p className="mt-2 text-ink leading-relaxed">
                {aboutSection.vision.body}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.figure
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="relative"
        >
          <div className="relative min-h-[28rem] overflow-hidden sm:min-h-[34rem] lg:min-h-[40rem]">
            <Image
              src={media.about.src}
              alt={media.about.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </motion.figure>
      </div>
    </Section>
  );
}
