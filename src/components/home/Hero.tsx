"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { media } from "@/data/media";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-navy pb-20 pt-32 sm:min-h-[100vh] sm:items-center sm:pb-28 sm:pt-36"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        initial={reduceMotion ? false : { scale: 1 }}
        animate={reduceMotion ? undefined : { scale: 1.08 }}
        transition={{
          duration: 22,
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
          className="object-cover object-center"
        />
      </motion.div>

      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(105deg, rgba(22,58,92,0.94) 0%, rgba(22,58,92,0.82) 42%, rgba(15,76,110,0.62) 100%)",
        }}
        aria-hidden
      />

      <Container className="relative w-full">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <p
            className="mb-5 font-sans text-[0.7rem] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            Our Soul Purpose · Humanity First
          </p>
          <h1
            className="font-heading text-4xl leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.85rem]"
            style={{ fontWeight: 700, color: "#ffffff" }}
          >
            Together, We Can Make a World of Difference.
          </h1>
          <p
            className="mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
            style={{ color: "rgba(255,255,255,0.94)" }}
          >
            Compassion in action. Hope in every heart. Serving humanity one life
            at a time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button href="/#donate" size="lg">
              Join Our Mission
            </Button>
            <Button href="/#about" variant="secondary" size="lg">
              Discover Our Purpose
            </Button>
          </div>
          <p
            className="mt-10 font-sans text-xs font-medium tracking-[0.16em] uppercase"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            Dubai · Pakistan · United States
          </p>
        </motion.div>
      </Container>
    </section>
  );
}
