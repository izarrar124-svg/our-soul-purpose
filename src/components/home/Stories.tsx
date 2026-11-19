"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Modal } from "@/components/ui/Modal";
import { stories, storiesSection, type Story } from "@/data/stories";

export function Stories() {
  const [active, setActive] = useState<Story | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <Section id="stories" tone="cream">
      <SectionHeading
        eyebrow="Stories of Change"
        title={storiesSection.heading}
        description={storiesSection.intro}
        className="mb-16 max-w-3xl"
      />

      <ul className="space-y-16 lg:space-y-24">
        {stories.map((story, index) => {
          const reverse = index % 2 === 1;
          return (
            <motion.li
              key={story.id}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: index * 0.04 }}
            >
              <article
                className={`grid items-center gap-8 lg:grid-cols-12 lg:gap-14 ${
                  reverse ? "lg:[&>figure]:order-2" : ""
                }`}
              >
                <figure
                  className={`relative overflow-hidden bg-mist ${
                    reverse
                      ? "aspect-[4/5] min-h-[20rem] lg:col-span-5"
                      : "aspect-[5/6] min-h-[22rem] lg:col-span-6"
                  }`}
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover"
                  />
                </figure>
                <div
                  className={
                    reverse ? "lg:col-span-7" : "lg:col-span-6 lg:pl-4"
                  }
                >
                  <p className="text-[0.65rem] font-semibold tracking-[0.16em] text-gold uppercase">
                    Illustrative example
                  </p>
                  <h3 className="mt-4 font-heading text-3xl font-semibold text-navy sm:text-4xl">
                    {story.title}
                  </h3>
                  <div className="mt-5 h-px w-12 bg-navy/20" aria-hidden />
                  <p className="mt-5 max-w-lg text-base leading-relaxed text-ink">
                    {story.summary}
                  </p>
                  {story.location ? (
                    <p className="mt-5 text-xs tracking-[0.12em] text-ink/60 uppercase">
                      {story.location}
                    </p>
                  ) : null}
                  <button
                    type="button"
                    onClick={() => setActive(story)}
                    className="mt-7 text-sm font-semibold text-navy underline-offset-4 hover:text-ocean hover:underline"
                  >
                    Read More
                    <span className="sr-only">: {story.title}</span>
                  </button>
                </div>
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
            <p className="inline-block bg-mist px-2 py-1 text-[0.65rem] font-semibold tracking-[0.14em] text-navy uppercase">
              Illustrative example — not a verified testimonial
            </p>
            <p className="text-ink leading-relaxed">{active.body}</p>
          </div>
        ) : null}
      </Modal>
    </Section>
  );
}
