"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { primaryNav, ctaNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  activeId?: string;
};

export function MobileNav({ open, onClose, activeId }: MobileNavProps) {
  const reduceMotion = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open || !panelRef.current) return;
    const focusable = panelRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])',
    );
    focusable[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
          <motion.button
            type="button"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 bg-navy/60"
            aria-label="Close menu"
            onClick={onClose}
          />
          <motion.nav
            ref={panelRef}
            initial={reduceMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={reduceMotion ? undefined : { x: "100%" }}
            transition={{ type: "spring", stiffness: 380, damping: 36 }}
            className="absolute top-0 right-0 flex h-full w-[min(100%,22rem)] flex-col bg-cream shadow-2xl"
            aria-label="Mobile"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
              <p className="font-heading text-lg font-semibold text-navy">Menu</p>
              <button
                type="button"
                onClick={onClose}
                className="rounded-sm p-2 text-navy transition-colors hover:bg-mist"
                aria-label="Close navigation"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
              {primaryNav.map((item, index) => {
                const isActive = item.sectionId === activeId;
                return (
                  <motion.li
                    key={item.href}
                    initial={reduceMotion ? false : { opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * index, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "block border-l-2 px-4 py-3.5 text-[0.95rem] font-medium transition-colors",
                        isActive
                          ? "border-gold bg-mist/80 text-navy"
                          : "border-transparent text-navy hover:bg-mist/60",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
            <div className="border-t border-navy/10 p-5">
              <Button href={ctaNav.href} className="w-full" onClick={onClose}>
                {ctaNav.label}
              </Button>
            </div>
          </motion.nav>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
