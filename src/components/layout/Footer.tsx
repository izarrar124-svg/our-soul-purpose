import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { footerLegalLinks, ctaNav } from "@/data/navigation";
import { media } from "@/data/media";
import { programs } from "@/data/programs";
import {
  getActiveSocials,
  hasContactEmail,
  organization,
  type SocialLinks,
} from "@/data/organization";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

const socialLabels: Record<keyof SocialLinks, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "X",
  youtube: "YouTube",
};

const bandLinks = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/#programs" },
  { label: "Portfolio", href: "/#portfolio" },
  { label: "Donate", href: "/#donate" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const socials = getActiveSocials();
  const showEmail = hasContactEmail();
  const showPhone = Boolean(organization.phone?.trim());

  return (
    <footer className="bg-navy text-white">
      {/* Band A — closing CTA */}
      <div className="relative overflow-hidden border-b border-white/10">
        <div
          className="pointer-events-none absolute -top-24 -right-16 size-80 rounded-full border"
          style={{ borderColor: "rgba(95,164,193,0.2)" }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-20 left-[20%] size-64 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,135,31,0.18), transparent 70%)",
          }}
          aria-hidden
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <p
            className="font-sans text-[0.7rem] font-semibold tracking-[0.22em] uppercase"
            style={{ color: "rgba(95,164,193,0.95)" }}
          >
            Let&apos;s Make a Difference
          </p>
          <h2
            className="mt-5 max-w-4xl font-heading text-4xl tracking-tight sm:text-5xl lg:text-[3.5rem]"
            style={{ fontWeight: 700, color: "#ffffff", lineHeight: 1.08 }}
          >
            Humanity Is Stronger When We Stand Together.
          </h2>
          <p
            className="mt-6 max-w-xl font-sans text-base leading-relaxed"
            style={{ color: "rgba(255,255,255,0.78)" }}
          >
            Join Our Soul Purpose in serving humanity one life at a time —
            through generosity, partnership, and presence across the communities
            we support.
          </p>
          <div className="mt-10">
            <Button href={ctaNav.href} size="lg">
              {ctaNav.label}
            </Button>
          </div>
        </Container>
      </div>

      {/* Band B — brand + links */}
      <div className="border-b border-white/10">
        <Container className="py-12 sm:py-14">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:items-start lg:gap-16">
            <div>
              <Link href="/#home" className="inline-flex items-center gap-3">
                <Image
                  src={media.logoMark.src}
                  alt={media.logoMark.alt}
                  width={44}
                  height={44}
                  className="size-11 rounded-sm bg-cream object-contain p-1"
                />
                <span
                  className="font-heading text-lg"
                  style={{ fontWeight: 600, color: "#ffffff" }}
                >
                  {organization.name}
                </span>
              </Link>
              <p
                className="mt-4 max-w-md font-heading text-base italic"
                style={{ color: "rgba(255,255,255,0.82)" }}
              >
                {organization.tagline}
              </p>
              <p
                className="mt-3 max-w-md text-sm leading-relaxed"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                Founded {organization.foundedYear}. Community presence in Dubai,
                Pakistan, and the United States.
              </p>

              {(showEmail || showPhone || socials.length > 0) && (
                <ul className="mt-5 space-y-2 text-sm">
                  {showEmail ? (
                    <li>
                      <a
                        href={`mailto:${organization.email}`}
                        className="transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {organization.email}
                      </a>
                    </li>
                  ) : null}
                  {showPhone ? (
                    <li>
                      <a
                        href={`tel:${organization.phone.replace(/\s+/g, "")}`}
                        className="transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {organization.phone}
                      </a>
                    </li>
                  ) : null}
                </ul>
              )}

              {socials.length > 0 ? (
                <ul className="mt-5 flex flex-wrap gap-3">
                  {socials.map(({ platform, href }) => (
                    <li key={platform}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex size-9 items-center justify-center rounded-sm bg-white/10 text-white transition-colors hover:bg-white/20"
                        aria-label={socialLabels[platform]}
                      >
                        <ExternalLink className="size-4" aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3
                  className="text-sm font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "rgba(95,164,193,0.95)" }}
                >
                  Explore
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {bandLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3
                  className="text-sm font-semibold tracking-[0.14em] uppercase"
                  style={{ color: "rgba(95,164,193,0.95)" }}
                >
                  Programs
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {programs.map((program) => (
                    <li key={program.id}>
                      <Link
                        href="/#programs"
                        className="text-sm transition-colors hover:text-white"
                        style={{ color: "rgba(255,255,255,0.78)" }}
                      >
                        {program.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Band C — legal */}
      <Container className="flex flex-col gap-3 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p style={{ color: "rgba(255,255,255,0.55)" }}>
          © {organization.copyrightYear} {organization.name}. All rights
          reserved.
        </p>
        <ul className="flex flex-wrap gap-x-5 gap-y-2">
          {footerLegalLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="transition-colors hover:text-white"
                style={{ color: "rgba(255,255,255,0.55)" }}
              >
                {link.label === "Privacy Policy" ? "Privacy" : "Terms"}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </footer>
  );
}
