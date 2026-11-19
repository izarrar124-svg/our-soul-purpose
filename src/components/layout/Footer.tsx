import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { footerQuickLinks } from "@/data/navigation";
import { programs } from "@/data/programs";
import { media } from "@/data/media";
import {
  getActiveSocials,
  hasContactEmail,
  organization,
  type SocialLinks,
} from "@/data/organization";
import { Container } from "@/components/ui/Container";

const socialLabels: Record<keyof SocialLinks, string> = {
  facebook: "Facebook",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  twitter: "X",
  youtube: "YouTube",
};

export function Footer() {
  const socials = getActiveSocials();
  const showEmail = hasContactEmail();
  const showPhone = Boolean(organization.phone?.trim());

  return (
    <footer className="bg-navy text-white">
      <Container className="py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          <div className="lg:col-span-1">
            <Link href="/#home" className="inline-flex items-center gap-3">
              <Image
                src={media.logo.src}
                alt={media.logo.alt}
                width={48}
                height={48}
                className="size-12 rounded-sm bg-cream object-contain p-1"
              />
              <span className="font-heading text-lg font-semibold">
                {organization.name}
              </span>
            </Link>
            <p className="mt-4 font-heading text-base text-white/85 italic">
              {organization.tagline}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-white/70">
              Founded {organization.foundedYear}. Headquartered in Dubai, with
              community presence in Pakistan and the United States.
            </p>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-globe uppercase">
              Quick links
            </h2>
            <ul className="mt-4 space-y-2">
              {footerQuickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-globe uppercase">
              Programs
            </h2>
            <ul className="mt-4 space-y-2">
              {programs.map((program) => (
                <li key={program.id}>
                  <Link
                    href={`/#programs`}
                    className="text-sm text-white/80 transition-colors hover:text-white"
                  >
                    {program.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold tracking-[0.14em] text-globe uppercase">
              Contact
            </h2>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {organization.locations.map((location) => (
                <li key={location.id}>
                  <span className="text-white">{location.name}</span>
                  <span className="text-white/60"> — {location.role}</span>
                </li>
              ))}
              {showEmail ? (
                <li>
                  <a
                    href={`mailto:${organization.email}`}
                    className="transition-colors hover:text-white"
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
                  >
                    {organization.phone}
                  </a>
                </li>
              ) : null}
              {!showEmail && !showPhone ? (
                <li className="text-white/60">
                  Contact details will appear here when published. Use the
                  contact form when Formspree is configured.
                </li>
              ) : null}
            </ul>

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
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {organization.copyrightYear} {organization.name}. All rights
            reserved.
          </p>
          <Link href="/privacy" className="hover:text-white">
            Privacy Policy
          </Link>
        </div>
      </Container>
    </footer>
  );
}
