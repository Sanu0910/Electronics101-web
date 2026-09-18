import type { Metadata } from "next";
import { affiliationNotice, site } from "@/config/site";
import { series } from "@/content/series";
import {
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHead,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "About",
  description:
    "Electronics 101 is an independent technical learning platform built to make engineering education practical, accessible and industry-oriented.",
  alternates: { canonical: "/about" },
};

const MISSION = [
  { step: "Learn the fundamentals", body: "Start from what is actually true, not from a formula to memorise." },
  { step: "Understand the engineering", body: "Know why the result has the shape it does, and what breaks it." },
  { step: "Simulate", body: "Model it in the tools the job uses, and learn to distrust a pretty answer." },
  { step: "Build", body: "Make the thing. Measure it. Find out where the model was wrong." },
  { step: "Solve real problems", body: "Apply it to work that has a deadline and a specification." },
];

export default function AboutPage() {
  return (
    <>
      <Section className="pb-0">
        <Container>
          <SectionHead
            eyebrow="About"
            title="An independent platform for practical engineering"
            lead={`${site.name} exists to make engineering education practical, accessible and industry-oriented — for people who will have to make something work, not just pass an exam about it.`}
          />
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            The method
          </h2>
          <ol className="mt-8 space-y-4">
            {MISSION.map((m, i) => (
              <li key={m.step}>
                <Card className="flex gap-5 p-6">
                  <span className="font-mono text-lg font-bold text-accent tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold">{m.step}</h3>
                    <p className="mt-1 text-muted">{m.body}</p>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHead
            eyebrow="Scope"
            title={`${series.length} series, across the whole stack`}
            lead="From Ohm's law to MMIC processes, with simulation and hardware in between. Each series is built to be taken on its own, and to make the next one easier."
          />
          <ul className="mt-10 grid gap-3 sm:grid-cols-2">
            {[...series]
              .sort((a, b) => a.index - b.index)
              .map((s) => (
                <li
                  key={s.slug}
                  className="flex items-baseline gap-3 rounded-xl border border-line p-4"
                >
                  <span className="font-mono text-xs font-semibold text-accent tabular">
                    {String(s.index).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="font-semibold">{s.title}</span>
                    <span className="block text-sm text-faint">{s.short}</span>
                  </span>
                </li>
              ))}
          </ul>
        </Container>
      </Section>

      <Section>
        <Container>
          <Card className="border-warn-400/30 bg-warn-400/5 p-8">
            <h2 className="text-xl font-bold">Independence</h2>
            <p className="mt-3 text-muted">{affiliationNotice}</p>
          </Card>

          <Card className="mt-6 flex flex-wrap items-center justify-between gap-6 p-8">
            <div className="max-w-xl">
              <h2 className="text-2xl font-bold">Built to grow beyond one person</h2>
              <p className="mt-2 text-muted">
                The platform is structured so that additional instructors, mentors and
                technical contributors can be added without the brand depending on any
                single name.
              </p>
            </div>
            <ButtonLink href="/contact" size="lg">
              Get in Touch
            </ButtonLink>
          </Card>
        </Container>
      </Section>
    </>
  );
}
