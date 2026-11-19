import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { organization } from "@/data/organization";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description: `Terms and conditions for the ${organization.name} website.`,
};

export default function TermsPage() {
  return (
    <div className="bg-cream py-16 sm:py-20">
      <Container className="max-w-3xl">
        <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-globe uppercase">
          Legal
        </p>
        <h1 className="mt-3 font-heading text-4xl font-semibold text-navy">
          Terms and Conditions
        </h1>
        <p className="mt-4 text-ink leading-relaxed">
          These terms apply to your use of the informational website operated by{" "}
          {organization.name}. They are provided as a clear, plain-language
          template for visitors and do not replace formal legal advice or any
          future registered fundraising terms.
        </p>

        <div className="mt-10 space-y-8 text-ink leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Informational purpose
            </h2>
            <p className="mt-3">
              This website shares information about {organization.name}, its
              mission, programs, and ways to get involved. Content is presented
              in good faith and may be updated as the organization publishes
              additional verified details.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              No active online donations
            </h2>
            <p className="mt-3">
              Online payment processing and live donation charging are not
              enabled on this website. Any donation form shown is preparatory
              only and will not collect or process payments until legal
              eligibility and a payment provider are approved.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Contact submissions
            </h2>
            <p className="mt-3">
              When the contact form is configured, messages you submit are used
              to respond to inquiries. Do not include sensitive personal
              information that is not needed to answer your question.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Intellectual property
            </h2>
            <p className="mt-3">
              Branding, logo artwork, and original website copy belong to{" "}
              {organization.name} or its licensors. You may not reuse them for
              commercial purposes without permission.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              External services
            </h2>
            <p className="mt-3">
              The site may use third-party services such as form handling or map
              embedding. Those services are governed by their own terms and
              privacy policies.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Limitation of liability
            </h2>
            <p className="mt-3">
              The website is provided for general information.{" "}
              {organization.name} does not warrant uninterrupted availability and
              is not liable for decisions made solely on the basis of website
              content.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Updates
            </h2>
            <p className="mt-3">
              These terms may be revised as services, contact channels, or
              fundraising capabilities change. The version published on this page
              is the current website terms.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-navy">
              Questions
            </h2>
            <p className="mt-3">
              For questions about these terms, use the contact form on the
              homepage once configured, or update this section with an official
              contact email when available. Related information is also covered
              in the{" "}
              <Link
                href="/privacy"
                className="font-semibold text-ocean underline-offset-4 hover:underline"
              >
                Privacy Policy
              </Link>
              .
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
