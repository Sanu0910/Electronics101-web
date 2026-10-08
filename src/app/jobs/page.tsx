import type { Metadata } from "next";
import Link from "next/link";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/Reveal";
import {
  openings,
  salaryBands,
  salarySource,
  skillGroups,
  topOfMarket,
} from "@/content/jobs";
import { formatDate, formatInr } from "@/lib/utils";

export const metadata: Metadata = {
  title: "RF & Antenna Jobs",
  description:
    "What the highest-paying RF, antenna and EM simulation roles in India actually pay, the skills they ask for, and openings hiring now.",
  alternates: { canonical: "/jobs" },
};

/** ₹ lakhs per annum, written the way the audience says it. */
const lpa = (n: number) => `₹${n}L`;

export default function JobsPage() {
  const usdPerMonth = Math.round(topOfMarket.perMonthInr / topOfMarket.usdRate);
  const usdPerYear = Math.round(
    (topOfMarket.perYearLpa * 100000) / topOfMarket.usdRate / 1000,
  );

  return (
    <>
      {/* ----------------------------------------------------------- hero */}
      <Section className="relative overflow-hidden pb-0">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />
        <Container wide className="relative">
          <div className="max-w-3xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent animate-rise">
              Careers in RF
            </p>
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl animate-rise"
              style={{ animationDelay: "60ms" }}
            >
              The RF jobs that pay the most — and the skills they ask for.
            </h1>
            <p
              className="mt-5 text-lg text-muted animate-rise"
              style={{ animationDelay: "120ms" }}
            >
              Antenna design, phased arrays and EM simulation are among the
              best-paid specialisms in Indian electronics, and among the hardest
              to hire for. This is what the market pays, what employers actually
              ask for, and where to apply — with every number traceable to its
              source.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3 animate-rise"
              style={{ animationDelay: "180ms" }}
            >
              <ButtonLink href="#skills" size="lg">
                See the skills
              </ButtonLink>
              <ButtonLink href="#openings" variant="secondary" size="lg">
                Hiring now
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- salary */}
      <Section id="pay">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow="What it pays"
              title="The money, with its sources attached"
              lead="Pay data is self-reported or modelled wherever you find it. Every figure below names where it came from, so you can judge it yourself."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <Card className="h-full overflow-hidden">
                <div className="border-b border-line p-5">
                  <h3 className="font-bold">Base salary by experience</h3>
                  <p className="mt-1 text-sm text-muted">
                    RF engineers in India, base pay only — bonuses sit on top.
                  </p>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line text-left text-xs uppercase tracking-wider text-faint">
                      <th scope="col" className="px-5 py-3 font-medium">Level</th>
                      <th scope="col" className="px-5 py-3 font-medium">Experience</th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">Median</th>
                      <th scope="col" className="px-5 py-3 text-right font-medium">Top 10%</th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryBands.map((b) => (
                      <tr key={b.level} className="border-b border-line last:border-0">
                        <th scope="row" className="px-5 py-3 text-left font-semibold">
                          {b.level}
                        </th>
                        <td className="px-5 py-3 text-muted">{b.experience}</td>
                        <td className="px-5 py-3 text-right tabular">{lpa(b.medianLpa)}</td>
                        <td className="px-5 py-3 text-right font-semibold text-accent tabular">
                          {lpa(b.topLpa)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="border-t border-line p-5 text-xs text-faint">
                  Source:{" "}
                  <a
                    href={salarySource.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-accent"
                  >
                    {salarySource.label}
                  </a>
                  . Modelled estimates, not antenna-specific.
                </div>
              </Card>
            </Reveal>

            <Reveal delay={80}>
              <Card className="flex h-full flex-col border-accent/40 p-6 accent-glow">
                <Badge tone="accent">Top of market</Badge>
                <p className="mt-4 text-4xl font-bold tabular">
                  {formatInr(topOfMarket.perMonthInr)}
                  <span className="text-lg font-semibold text-muted"> / month</span>
                </p>
                <p className="mt-1 text-sm text-muted tabular">
                  ≈ {lpa(topOfMarket.perYearLpa)} per annum
                </p>

                <p className="mt-5 text-sm text-muted">
                  Reported for senior RF and antenna roles at{" "}
                  <span className="font-semibold text-fg">
                    {topOfMarket.companyLabel}
                  </span>{" "}
                  by{" "}
                  <a
                    href={topOfMarket.sourceHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline transition-colors hover:text-accent"
                  >
                    {topOfMarket.sourceLabel}
                  </a>
                  . Well above the bands on the left, so treat it as the ceiling
                  a specialist can reach rather than a number to expect.
                </p>

                <div className="mt-auto pt-6">
                  <p className="rounded-xl border border-line bg-subtle p-4 text-xs text-faint">
                    <span className="font-semibold text-muted">In dollars:</span>{" "}
                    ≈ ${usdPerMonth.toLocaleString("en-IN")} a month, or about $
                    {usdPerYear}K a year, at ≈₹{topOfMarket.usdRate} to the
                    dollar. Worth knowing that a figure which is excellent in
                    India converts to a modest one abroad — cost of living is
                    doing most of the work.
                  </p>
                </div>
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- skills */}
      <Section tone="subtle" id="skills">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow="What gets you hired"
              title="Eight things these roles ask for"
              lead="Drawn from what the postings themselves list. Each one links to the track here that covers it."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 2) * 70} className="h-full">
                <Card className="flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1">
                  <h3 className="text-lg font-bold">{g.title}</h3>
                  <p className="mt-2 text-sm text-muted">{g.why}</p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {g.skills.map((s) => (
                      <li key={s} className="flex gap-3 text-sm">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="min-w-0 text-muted">{s}</span>
                      </li>
                    ))}
                  </ul>

                  {g.seriesSlug ? (
                    <Link
                      href={`/series/${g.seriesSlug}`}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-accent transition-opacity hover:opacity-80"
                    >
                      Learn this here
                      <span aria-hidden="true">›</span>
                    </Link>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- openings */}
      <Section id="openings">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow="Hiring now"
              title="Open roles worth a look"
              lead="Live postings at the time of listing. Job adverts close without warning — check the posting before you spend an evening on the application."
            />
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            {openings.map((job, i) => (
              <Reveal key={job.href} delay={i * 70} className="h-full">
                <Card
                  interactive
                  className="group relative flex h-full flex-col p-6"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="ok">Open</Badge>
                    <Badge>{job.location}</Badge>
                  </div>

                  <h3 className="mt-4 text-xl font-bold">
                    <a
                      href={job.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="after:absolute after:inset-0"
                    >
                      {job.title}
                    </a>
                  </h3>
                  <p className="mt-1 font-semibold text-accent">{job.company}</p>

                  <ul className="mt-5 flex-1 space-y-2">
                    {job.asks.map((a) => (
                      <li key={a} className="flex gap-3 text-sm text-muted">
                        <span
                          aria-hidden="true"
                          className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent"
                        />
                        <span className="min-w-0">{a}</span>
                      </li>
                    ))}
                  </ul>

                  <p className="mt-5 border-t border-line pt-4 text-xs text-faint">
                    Listed{" "}
                    <time dateTime={job.listedOn}>{formatDate(job.listedOn)}</time>
                    {" · "}opens on the employer&rsquo;s site
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <p className="mt-8 text-sm text-faint">
              Electronics 101 is not a recruiter and has no connection to these
              employers. These are public postings, shared because they show what
              the field is asking for.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ cta */}
      <Section tone="subtle">
        <Container wide>
          <Reveal>
            <Card className="flex flex-wrap items-center justify-between gap-6 p-8">
              <div className="max-w-xl">
                <h2 className="text-2xl font-bold">
                  Most of this list is simulation and arrays.
                </h2>
                <p className="mt-2 text-muted">
                  That is exactly what the workshops cover — HFSS done properly,
                  phased arrays, and the solver-choice judgement the senior roles
                  are really testing for.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <ButtonLink href="/workshops" size="lg">
                  See workshops
                </ButtonLink>
                <ButtonLink href="/series" variant="secondary" size="lg">
                  Free series
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
