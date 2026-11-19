"use client";

import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-navy pb-20 pt-28 sm:min-h-[100vh] sm:pb-28 sm:pt-32"
    >
      {/* Layered abstract graphics — no photography */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 15% 20%, rgba(15,76,110,0.95) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 85% 75%, rgba(95,164,193,0.28) 0%, transparent 50%), linear-gradient(145deg, #163A5C 0%, #0F4C6E 48%, #163A5C 100%)",
          }}
        />

        <motion.div
          className="absolute -top-[12%] -right-[8%] size-[42rem] rounded-full border border-white/10"
          initial={false}
          animate={
            reduceMotion
              ? undefined
              : { rotate: [0, 8, 0], scale: [1, 1.04, 1] }
          }
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderColor: "rgba(255,255,255,0.08)" }}
        />
        <motion.div
          className="absolute top-[18%] right-[8%] size-[22rem] rounded-full"
          initial={false}
          animate={
            reduceMotion ? undefined : { y: [0, -18, 0], x: [0, 10, 0] }
          }
          transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(95,164,193,0.22) 0%, transparent 70%)",
          }}
        />
        <motion.div
          className="absolute bottom-[-10%] left-[-6%] size-[28rem] rounded-full border"
          initial={false}
          animate={reduceMotion ? undefined : { rotate: [0, -12, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
          style={{ borderColor: "rgba(200,135,31,0.22)" }}
        />
        <div
          className="absolute top-1/2 left-[42%] hidden h-[min(70vh,28rem)] w-px lg:block"
          style={{ background: "rgba(255,255,255,0.12)" }}
        />
        <div
          className="absolute right-[18%] bottom-[22%] h-px w-24"
          style={{ background: "rgba(200,135,31,0.55)" }}
        />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <Container className="relative w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-8">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <p
              className="mb-6 font-sans text-[0.7rem] font-semibold tracking-[0.24em] uppercase"
              style={{ color: "rgba(95,164,193,0.95)" }}
            >
              Our Soul Purpose · Humanity First
            </p>
            <h1
              className="font-heading text-[2.65rem] leading-[1.05] tracking-tight sm:text-5xl lg:text-[4.15rem]"
              style={{ fontWeight: 700, color: "#ffffff" }}
            >
              Humanity Begins
              <br className="hidden sm:block" /> With the Way
              <br className="hidden sm:block" /> We Care.
            </h1>
            <p
              className="mt-7 max-w-xl font-sans text-lg leading-relaxed sm:text-xl"
              style={{ color: "rgba(255,255,255,0.88)" }}
            >
              Every act of kindness creates an opportunity for hope, dignity and
              a better tomorrow.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button href="/#donate" size="lg">
                Join Our Mission
              </Button>
              <Button href="/#about" variant="secondary" size="lg">
                Discover Our Purpose
              </Button>
            </div>
            <p
              className="mt-12 font-sans text-xs font-medium tracking-[0.18em] uppercase"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Dubai · Pakistan · United States
            </p>
          </motion.div>

          <motion.div
            className="relative mx-auto hidden aspect-square w-full max-w-md lg:block"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          >
            <div
              className="absolute inset-[8%] rounded-full border"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            />
            <div
              className="absolute inset-[22%] rounded-full border"
              style={{ borderColor: "rgba(95,164,193,0.35)" }}
            />
            <div
              className="absolute inset-[36%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle at 35% 35%, rgba(95,164,193,0.35), rgba(22,58,92,0.2) 70%)",
              }}
            />
            <motion.div
              className="absolute top-[12%] right-[18%] size-3 rounded-full bg-gold"
              animate={reduceMotion ? undefined : { opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 3.5, repeat: Infinity }}
            />
            <motion.div
              className="absolute bottom-[28%] left-[14%] size-2 rounded-full"
              style={{ background: "rgba(95,164,193,0.9)" }}
              animate={reduceMotion ? undefined : { opacity: [0.3, 0.9, 0.3] }}
              transition={{ duration: 4.2, repeat: Infinity, delay: 0.6 }}
            />
            <div
              className="absolute top-1/2 left-1/2 h-px w-[70%] -translate-x-1/2 -translate-y-1/2 rotate-[28deg]"
              style={{ background: "rgba(255,255,255,0.1)" }}
            />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
