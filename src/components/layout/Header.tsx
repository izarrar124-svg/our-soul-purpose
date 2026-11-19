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
    const onScroll = () => setScrolled(window.scrollY > 16);
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
        rootMargin: "-28% 0px -58% 0px",
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
          "sticky top-0 z-40 border-b transition-shadow duration-300",
          scrolled
            ? "shadow-[0_6px_20px_rgba(22,58,92,0.06)]"
            : "shadow-none",
        )}
        style={{
          backgroundColor: "rgba(251,248,245,0.97)",
          borderColor: "rgba(22,58,92,0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container className="flex h-16 items-center justify-between gap-6 lg:h-[4.5rem]">
          <Link
            href="/#home"
            className="flex min-w-0 items-center gap-2.5"
            aria-label={`${organization.name} home`}
          >
            <Image
              src={media.logoMark.src}
              alt=""
              width={40}
              height={40}
              className="size-9 object-contain sm:size-10"
              priority
            />
            <span
              className="hidden truncate font-heading text-[1.05rem] font-semibold tracking-tight sm:inline"
              style={{ color: "#163A5C" }}
            >
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
                  className="group relative px-2.5 py-2 text-[0.78rem] font-medium tracking-[0.02em] transition-opacity hover:opacity-100"
                  style={{
                    color: isActive ? "#163A5C" : "#4A5A6A",
                    opacity: isActive ? 1 : 0.9,
                  }}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute inset-x-2.5 -bottom-0.5 h-[1.5px] origin-left transition-transform duration-300",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50",
                    )}
                    style={{ backgroundColor: "#C8871F" }}
                    aria-hidden
                  />
                </Link>
              );
            })}
            <Button href={ctaNav.href} size="sm" className="ml-4 px-4 py-2 text-[0.78rem]">
              {ctaNav.label}
            </Button>
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <Button
              href={ctaNav.href}
              size="sm"
              className="hidden px-3.5 py-2 text-[0.78rem] sm:inline-flex"
            >
              {ctaNav.label}
            </Button>
            <button
              type="button"
              className="rounded-sm p-2 transition-colors hover:bg-mist"
              style={{ color: "#163A5C" }}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
            >
              <Menu className="size-5" aria-hidden />
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
