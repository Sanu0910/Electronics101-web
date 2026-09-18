import type { Metadata } from "next";
import { workshops, upcomingWorkshops } from "@/content/workshops";
import {
  Container,
  Section,
  SectionHead,
  EmptyState,
  ButtonLink,
} from "@/components/ui/primitives";
import { WorkshopCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "Live Workshops",
  description:
    "Live, hands-on RF, antenna, HFSS and PCB workshops with study material, model files and a certificate.",
  alternates: { canonical: "/workshops" },
};

export default function WorkshopsPage() {
  const upcoming = upcomingWorkshops();
  const past = workshops.filter((w) => !upcoming.includes(w));

  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Live Workshops"
            title="Small cohorts, real tools, work you keep"
            lead="Every workshop is live rather than recorded, so you can ask the question that is actually blocking you. Material and model files are yours afterwards."
          />
        </Container>
      </Section>

      <Section>
        <Container wide>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Upcoming
          </h2>
          <div className="mt-8">
            {upcoming.length ? (
              <div className="grid gap-6 lg:grid-cols-2">
                {upcoming.map((w) => (
                  <WorkshopCard key={w.slug} item={w} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No workshops scheduled right now"
                body="New dates are announced here and on the community channels first."
                action={<ButtonLink href="/contact">Ask about the next one</ButtonLink>}
              />
            )}
          </div>
        </Container>
      </Section>

      {past.length ? (
        <Section tone="subtle">
          <Container wide>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-faint">
              Past sessions
            </h2>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {past.map((w) => (
                <WorkshopCard key={w.slug} item={w} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
