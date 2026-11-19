"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Section } from "@/components/layout/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { organization } from "@/data/organization";
import { cn } from "@/lib/cn";

const PresenceMap = dynamic(
  () =>
    import("@/components/home/PresenceMap").then((mod) => mod.PresenceMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(70vh,34rem)] items-center justify-center border border-navy/10 bg-cream text-sm text-ink sm:h-[36rem]">
        Loading map…
      </div>
    ),
  },
);

export function Presence() {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<string | null>("dubai");

  return (
    <Section id="presence" tone="white">
      <SectionHeading
        eyebrow="Global Presence"
        title="One Mission. Across Communities."
        description="Our Soul Purpose is headquartered in Dubai and maintains community presence in Pakistan and the United States — one mission, shared across continents."
        className="mb-12 max-w-3xl"
      />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.35fr)] lg:gap-12">
        <motion.ul
          initial={reduceMotion ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="space-y-2"
        >
          {organization.locations.map((location) => {
            const isActive = activeId === location.id;
            return (
              <li key={location.id}>
                <button
                  type="button"
                  onClick={() => setActiveId(location.id)}
                  className={cn(
                    "flex w-full gap-4 px-3 py-4 text-left transition-colors",
                    isActive
                      ? "border-l-2 border-gold bg-cream/80"
                      : "border-l-2 border-transparent hover:bg-cream/50",
                  )}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full",
                      isActive ? "bg-gold text-white" : "bg-cream text-navy",
                    )}
                  >
                    <MapPin className="size-4" aria-hidden />
                  </span>
                  <div>
                    <p className="font-heading text-lg font-semibold text-navy">
                      {location.name}
                    </p>
                    <p className="text-sm font-medium tracking-wide text-ocean uppercase">
                      {location.role}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-ink">
                      {location.description}
                    </p>
                  </div>
                </button>
              </li>
            );
          })}
        </motion.ul>

        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.99 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
        >
          <PresenceMap activeId={activeId} onSelect={setActiveId} />
        </motion.div>
      </div>
    </Section>
  );
}
