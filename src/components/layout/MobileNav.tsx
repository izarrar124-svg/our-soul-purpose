"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { primaryNav, ctaNav } from "@/data/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  activeId?: string;
};

export function MobileNav({ open, onClose, activeId }: MobileNavProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 xl:hidden",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={cn(
          "absolute inset-0 bg-navy/55 transition-opacity duration-300",
          open ? "opacity-100" : "opacity-0",
        )}
        aria-label="Close menu"
        onClick={onClose}
      />
      <nav
        className={cn(
          "absolute top-0 right-0 flex h-full w-[min(100%,22rem)] flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
        aria-label="Mobile"
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-5">
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
        <ul className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-5">
          {primaryNav.map((item) => {
            const isActive = item.sectionId === activeId;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    "block rounded-sm px-4 py-3.5 text-base font-medium transition-colors",
                    isActive
                      ? "bg-mist text-navy"
                      : "text-navy hover:bg-mist/70",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="border-t border-navy/10 p-5">
          <Button href={ctaNav.href} className="w-full" onClick={onClose}>
            {ctaNav.label}
          </Button>
        </div>
      </nav>
    </div>
  );
}
