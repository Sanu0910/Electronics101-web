import type { Metadata } from "next";
import { mentorshipDomains, mentorshipPlans } from "@/content/services";
import {
  Badge,
  Bullets,
  ButtonLink,
  Card,
  Container,
  PlaceholderTag,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { priceLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Mentorship",
  description:
    "One-to-one, project, research and industry-skill mentorship in RF, antennas, HFSS, ADS, RFIC/MMIC, semiconductors and PCB/EMI-EMC.",
  alternates: { canonical: "/mentorship" },
};

export default function MentorshipPage() {
  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Mentorship"
            title="Sustained guidance on your own work"
            lead="Not a one-off consultation. A mentor who reads what you have actually done, tells you where it is wrong, and stays with it until it works."
          />

          <ul className="mt-10 flex flex-wrap gap-2">
            {mentorshipDomains.map((d) => (
              <li key={d}>
                <Badge tone="accent">{d}</Badge>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-6 lg:grid-cols-2">
            {mentorshipPlans.map((plan) => (
              <Card
                key={plan.slug}
                className={`flex flex-col p-7 ${plan.featured ? "border-accent/50" : ""}`}
              >
                <div className="flex flex-wrap items-center gap-2">
                  {plan.featured ? <Badge tone="accent">Most requested</Badge> : null}
                  {plan.placeholder ? <PlaceholderTag /> : null}
                </div>

                <h2 className="mt-3 text-2xl font-bold">{plan.title}</h2>
                <p className="mt-2 text-muted">{plan.summary}</p>

                <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-line py-5 text-sm">
                  <div>
                    <dt className="text-xs text-faint">Duration</dt>
                    <dd className="mt-0.5 font-medium">{plan.durationLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-faint">Sessions</dt>
                    <dd className="mt-0.5 font-medium">{plan.sessions}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs text-faint">Who it is for</dt>
                    <dd className="mt-0.5 font-medium">{plan.forWho}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex-1">
                  <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-faint">
                    Included
                  </p>
                  <Bullets items={plan.includes} />
                </div>

                <p className="mt-6 text-2xl font-bold tabular">
                  {priceLabel(plan.priceInr)}
                </p>
                <ButtonLink
                  href={`/contact?topic=${encodeURIComponent(`Mentorship — ${plan.title}`)}`}
                  className="mt-4"
                >
                  Apply Now
                </ButtonLink>
              </Card>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm text-faint">
            Applications go through the form rather than a direct inbox, so every
            enquiry carries the context needed to answer it properly.
          </p>
        </Container>
      </Section>
    </>
  );
}
