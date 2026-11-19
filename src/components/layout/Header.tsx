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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b transition-all duration-300",
          scrolled
            ? "border-navy/10 bg-cream/95 shadow-sm backdrop-blur-md"
            : "border-transparent bg-cream/80 backdrop-blur-sm",
        )}
      >
        <Container className="flex h-16 items-center justify-between gap-4 sm:h-[4.25rem]">
          <Link
            href="/#home"
            className="flex min-w-0 items-center gap-3"
            aria-label={`${organization.name} home`}
          >
            <Image
              src={media.logo.src}
              alt=""
              width={44}
              height={44}
              className="size-10 object-contain sm:size-11"
              priority
            />
            <span className="truncate font-heading text-base font-semibold tracking-tight text-navy sm:text-lg">
              {organization.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-sm px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-mist hover:text-navy"
              >
                {item.label}
              </Link>
            ))}
            <Button href={ctaNav.href} size="sm" className="ml-2">
              {ctaNav.label}
            </Button>
          </nav>

          <button
            type="button"
            className="rounded-sm p-2 text-navy hover:bg-mist lg:hidden"
            aria-label="Open navigation menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </Container>
      </header>
      <MobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
