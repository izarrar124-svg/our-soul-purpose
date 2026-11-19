"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import { primaryNav, ctaNav } from "@/data/navigation";
import { media } from "@/data/media";
import { organization } from "@/data/organization";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "@/components/layout/MobileNav";
import { cn } from "@/lib/cn";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeId, setActiveId] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = primaryNav
      .map((item) => item.sectionId)
      .filter(Boolean) as string[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-navy/10 bg-cream/95 shadow-[0_8px_24px_rgba(22,58,92,0.06)] backdrop-blur-md"
            : "border-transparent bg-cream/90 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-[4.25rem] items-center justify-between gap-6 lg:h-[4.75rem]">
          <Link
            href="/#home"
            className="flex min-w-0 items-center gap-3"
            aria-label={`${organization.name} home`}
          >
            <Image
              src={media.logoMark?.src ?? media.logo.src}
              alt=""
              width={48}
              height={48}
              className="size-11 object-contain sm:size-12"
              priority
            />
            <span className="hidden truncate font-heading text-lg font-semibold tracking-tight text-navy sm:inline">
              {organization.name}
            </span>
          </Link>

          <nav
            className="hidden items-center gap-0.5 xl:flex"
            aria-label="Primary"
          >
            {primaryNav.map((item) => {
              const isActive = item.sectionId === activeId;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-[0.8125rem] font-medium tracking-wide transition-colors",
                    isActive
                      ? "text-navy"
                      : "text-ink hover:text-navy",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0",
                    )}
                    aria-hidden
                  />
                </Link>
              );
            })}
            <Button href={ctaNav.href} size="sm" className="ml-3">
              {ctaNav.label}
            </Button>
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <Button
              href={ctaNav.href}
              size="sm"
              className="hidden sm:inline-flex"
            >
              {ctaNav.label}
            </Button>
            <button
              type="button"
              className="rounded-sm p-2 text-navy transition-colors hover:bg-mist"
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-6" aria-hidden />
            </button>
          </div>
        </Container>
      </header>
      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        activeId={activeId}
      />
    </>
  );
}
