import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/content/misc";
import {
  Badge,
  Card,
  Container,
  PlaceholderTag,
  Section,
  SectionHead,
} from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Antenna, RF, microwave, PCB, semiconductor, embedded and AI projects — problem, approach, tools and measured results.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Projects"
            title="Work, with the reasoning attached"
            lead="Each entry states the problem, what was actually done, and what the result was — including where it fell short."
          />
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-6 lg:grid-cols-2">
            {projects.map((p) => (
              <Card key={p.slug} id={p.slug} className="flex flex-col p-7">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="accent">{p.domain}</Badge>
                  {p.year ? <Badge>{p.year}</Badge> : null}
                  {p.placeholder ? <PlaceholderTag /> : null}
                </div>

                <h2 className="mt-4 text-2xl font-bold">{p.title}</h2>

                <dl className="mt-5 space-y-4 text-sm">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                      Problem
                    </dt>
                    <dd className="mt-1 text-muted">{p.problem}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                      Approach
                    </dt>
                    <dd className="mt-1 text-muted">{p.approach}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wider text-faint">
                      Results
                    </dt>
                    <dd className="mt-1">
                      <ul className="space-y-2">
                        {p.results.map((r) => (
                          <li key={r} className="flex gap-3 text-muted">
                            <span
                              aria-hidden="true"
                              className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                            />
                            <span className="min-w-0">{r}</span>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-line pt-5">
                  {p.tools.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-line px-2.5 py-0.5 font-mono text-xs text-faint"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {p.relatedSeries ? (
                  <Link
                    href={`/series/${p.relatedSeries}`}
                    className="mt-5 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                  >
                    Learn the ideas behind this <span aria-hidden="true">→</span>
                  </Link>
                ) : null}

                {p.gallery.length === 0 ? (
                  <p className="mt-5 text-xs text-faint">
                    Photographs and measured plots will be added as this work is
                    documented.
                  </p>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
