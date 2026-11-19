"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/data/media";
import { organization } from "@/data/organization";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy pb-20 pt-28 sm:min-h-[100vh] sm:items-center sm:pb-28 sm:pt-32"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduceMotion ? false : { scale: 1 }}
        animate={reduceMotion ? undefined : { scale: 1.06 }}
        transition={{
          duration: 18,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          src={media.hero.src}
          alt={media.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Explicit rgba — Tailwind opacity modifiers were not applying to brand colors */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(22,58,92,0.92) 0%, rgba(22,58,92,0.82) 45%, rgba(15,76,110,0.72) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative w-full">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p
            className="mb-4 font-sans text-xs font-semibold tracking-[0.22em] uppercase"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            {organization.tagline}
          </p>
          <h1
            className="font-heading text-4xl leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.75rem]"
            style={{ fontWeight: 700, color: "#ffffff" }}
          >
            A Better Tomorrow Begins With One Life.
          </h1>
          <p
            className="mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
            style={{ color: "rgba(255,255,255,0.95)" }}
          >
            We believe meaningful change starts with compassion, dignity and
            action. Together, we work towards a world where every individual
            has the opportunity to live with hope and purpose.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/#involved" size="lg">
              Join Our Mission
            </Button>
            <Button href="/#programs" variant="secondary" size="lg">
              Explore Our Programs
            </Button>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
