import type { Metadata } from "next";
import { services } from "@/content/services";
import {
  Badge,
  Bullets,
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHead,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Engineering Services",
  description:
    "Antenna design, RF and microwave design, HFSS simulation, RF PCB design, technical training and mentorship.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Engineering Services"
            title="Design, simulation and training"
            lead="Work delivered with the reasoning attached — what was assumed, what was verified, and what the result does not cover."
          />
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-6 lg:grid-cols-2">
            {services.map((s) => (
              <Card key={s.slug} id={s.slug} className="flex flex-col p-7">
                <div className="flex flex-wrap items-center gap-2">
                  {s.domains.map((d) => (
                    <Badge key={d} tone="accent">
                      {d}
                    </Badge>
                  ))}
                </div>
                <h2 className="mt-4 text-2xl font-bold">{s.title}</h2>
                <p className="mt-2 text-muted">{s.summary}</p>
                <div className="mt-6 flex-1">
                  <Bullets items={s.bullets} />
                </div>
                <ButtonLink
                  href={`/contact?topic=${encodeURIComponent(s.title)}`}
                  variant="secondary"
                  className="mt-7 self-start"
                >
                  Request Consultation
                </ButtonLink>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container wide>
          <Card className="flex flex-wrap items-center justify-between gap-6 p-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold">Not sure which of these you need?</h2>
              <p className="mt-2 text-muted">
                Describe the problem rather than the service. If it is not something
                worth taking on, you will be told that instead of sold something.
              </p>
            </div>
            <ButtonLink href="/contact" size="lg">
              Start a Conversation
            </ButtonLink>
          </Card>
        </Container>
      </Section>
    </>
  );
}
