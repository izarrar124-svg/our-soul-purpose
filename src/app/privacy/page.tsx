import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { organization } from "@/data/organization";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for the ${organization.name} website.`,
};

export default function PrivacyPage() {
  return (
    <div className="bg-cream py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-globe uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-navy">
          Privacy Policy
        </h1>
        <p className="mt-4 text-ink leading-relaxed">
          This informational website is operated by {organization.name}. It
          does not provide user accounts, donations, or payment processing. This
          page explains how visitor information may be handled when you use the
          site.
        </p>

        <div className="mt-10 space-y-8 text-ink leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Information we collect
            </h2>
            <p className="mt-3">
              If the contact form is configured with Formspree, messages you
              submit may include your name, email address, country, inquiry
              type, and message content. Those details are sent to the form
              service solely to respond to your inquiry.
            </p>
            <p className="mt-3">
              Until Formspree is configured, the contact form remains inactive
              and does not transmit submissions.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              How information is used
            </h2>
            <p className="mt-3">
              Contact information is used to reply to inquiries about
              volunteering, partnerships, programs, or general questions. We do
              not sell personal information.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Third-party services
            </h2>
            <p className="mt-3">
              Form submissions may be processed by Formspree when enabled.
              Hosting and analytics providers (if added later) may process
              technical data such as IP address and browser type according to
              their own policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Cookies
            </h2>
            <p className="mt-3">
              This site does not set marketing cookies by default. Essential
              cookies required by the hosting platform may still be used for
              basic operation and security.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Contact
            </h2>
            <p className="mt-3">
              For privacy questions, use the contact form on the homepage once
              it is configured, or update this section with an official contact
              email when available.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Updates
            </h2>
            <p className="mt-3">
              This policy may be updated as the organization publishes
              additional contact details or services. The website will reflect
              the latest version.
            </p>
          </section>
        </div>

        <p className="mt-12">
          <Link
            href="/#home"
            className="text-sm font-semibold text-ocean underline-offset-4 hover:underline"
          >
            Return to homepage
          </Link>
        </p>
      </Container>
    </div>
  );
}
