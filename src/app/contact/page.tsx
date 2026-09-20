import type { Metadata } from "next";
import { Suspense } from "react";
import { Container, Section, SectionHead, Card } from "@/components/ui/primitives";
import { ContactPageBody } from "./ContactPageBody";
import { site, socials } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Enquire about courses, workshops, corporate training, engineering services, mentorship or collaboration.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <Section>
      <Container>
        <SectionHead
          eyebrow="Contact"
          title="Tell us what you are trying to do"
          lead="Describe the problem rather than the service. If something is not worth taking on, you will be told that."
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
          {/* the ?topic= query is read in the browser, so the page stays static */}
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-elevated" />}>
            <ContactPageBody />
          </Suspense>

          <aside className="space-y-6">
            <Card className="p-6">
              <h2 className="font-bold">What happens next</h2>
              <ol className="mt-4 space-y-3 text-sm text-muted">
                {[
                  "Your enquiry is read by a person, not a queue.",
                  "You get a reply within two working days.",
                  "If it needs a call, one is offered at that point.",
                ].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="font-mono text-xs font-semibold text-accent tabular">
                      {i + 1}
                    </span>
                    <span className="min-w-0">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>

            {site.email ? (
              <Card className="p-6">
                <h2 className="font-bold">Prefer email?</h2>
                <p className="mt-2 text-sm text-muted">
                  The form reaches the same inbox, but if you would rather write
                  directly — or need to attach a drawing, a datasheet or an
                  S-parameter file — use this.
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-4 inline-block font-medium break-all text-accent hover:underline"
                >
                  {site.email}
                </a>
              </Card>
            ) : null}

            <Card className="p-6">
              <h2 className="font-bold">Community channels</h2>
              <p className="mt-2 text-sm text-muted">
                For quick questions, the community is usually faster than email.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {socials.map((s) => (
                  <li key={s.id} className="flex items-center justify-between gap-3">
                    <span className="text-muted">{s.label}</span>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-accent hover:underline"
                      >
                        {s.cta}
                      </a>
                    ) : (
                      <span className="text-xs text-faint">Coming soon</span>
                    )}
                  </li>
                ))}
              </ul>
            </Card>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
