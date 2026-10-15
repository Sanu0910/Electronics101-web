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
  bookRecommendations,
  librarySections,
  matlabPath,
  openSourceToolCategories,
  openSourceTools,
} from "@/content/rf-resources";

export const metadata: Metadata = {
  title: "RF Resource Library",
  description:
    "A curated RF and microwave library: where to start, the lecture series and references worth your time, the textbooks worth owning, a self-paced MATLAB path, and the open-source EM and RF tools that cost nothing to run.",
  alternates: { canonical: "/resources" },
};

/**
 * The jump bar. Hand-written rather than derived from `librarySections`,
 * because the page has four more anchors than there are link sections and
 * the reading order is an editorial decision, not a data one.
 */
const JUMP = [
  { href: "#start-here", label: "Start here" },
  { href: "#study", label: "Study resources" },
  { href: "#notes", label: "Reference notes" },
  { href: "#channels", label: "Channels" },
  { href: "#books", label: "Books" },
  { href: "#matlab", label: "MATLAB path" },
  { href: "#open-source", label: "Open-source tools" },
];

/** The outbound arrow, used on every external anchor on the page. */
function ExternalArrow() {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        className="size-3.5 shrink-0 text-faint transition-colors group-hover:text-accent"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
      >
        <path d="M7 17 17 7M9 7h8v8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="sr-only">(opens in a new tab)</span>
    </>
  );
}

export default function ResourcesPage() {
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
              RF Resource Library
            </p>
            <h1
              className="text-4xl font-bold tracking-tight sm:text-5xl animate-rise"
              style={{ animationDelay: "60ms" }}
            >
              Everything worth reading in RF, in the order worth reading it.
            </h1>
            <p
              className="mt-5 text-lg text-muted animate-rise"
              style={{ animationDelay: "120ms" }}
            >
              A working engineer&rsquo;s reading list for RF and microwave
              engineering — lecture courses, vendor notes, textbooks, a MATLAB
              path and the free solvers that will run on your own laptop. Each
              entry says who published it and why it is here.
            </p>

            <div
              className="mt-8 flex flex-wrap gap-3 animate-rise"
              style={{ animationDelay: "180ms" }}
            >
              <ButtonLink href="#start-here" size="lg">
                Start here
              </ButtonLink>
              <ButtonLink href="/study-material" variant="secondary" size="lg">
                Our own notes
              </ButtonLink>
            </div>
          </div>

          {/* jump bar — a long page needs a table of contents */}
          <nav aria-label="On this page" className="mt-12">
            <ul className="flex flex-wrap gap-2">
              {JUMP.map((j) => (
                <li key={j.href}>
                  <a
                    href={j.href}
                    className="inline-flex items-center rounded-full border border-line bg-elevated px-4 py-1.5 text-sm font-medium text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    {j.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </Section>

      {/* ------------------------------------------------- curated sections */}
      {librarySections.map((section, i) => (
        <Section
          key={section.id}
          id={section.id}
          tone={i % 2 === 1 ? "subtle" : "default"}
          /* scroll-mt clears the sticky header when an anchor is followed */
          className="scroll-mt-20"
        >
          <Container wide>
            <Reveal>
              <SectionHead title={section.title} lead={section.description} />
            </Reveal>

            <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item, j) => (
                <li key={item.href}>
                  <Reveal delay={Math.min(j, 5) * 40}>
                    <Card interactive className="group relative h-full p-5">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge tone="accent">{item.format}</Badge>
                        {item.domains?.map((d) => (
                          <Badge key={d}>{d}</Badge>
                        ))}
                      </div>

                      <h3 className="mt-3 flex items-start gap-2 font-bold">
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="after:absolute after:inset-0"
                        >
                          {item.title}
                        </a>
                        <span className="mt-1">
                          <ExternalArrow />
                        </span>
                      </h3>

                      <p className="mt-2 text-sm text-muted">{item.blurb}</p>
                      <p className="mt-4 border-t border-line pt-3 text-xs text-faint">
                        {item.source}
                      </p>
                    </Card>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ))}

      {/* ----------------------------------------------------------- books */}
      <Section id="books" className="scroll-mt-20">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow="Recommended reading"
              title="The textbooks worth owning"
              lead="Linked to the publisher, not copied here. A scanned textbook on someone's website is both an infringement and a stale edition — and these are books worth having properly."
            />
          </Reveal>

          <ul className="mt-10 grid gap-4 lg:grid-cols-2">
            {bookRecommendations.map((book, i) => (
              <li key={book.title}>
                <Reveal delay={Math.min(i, 5) * 40}>
                  <Card
                    interactive={Boolean(book.href)}
                    className="group relative h-full p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {book.domains.map((d) => (
                        <Badge key={d} tone="accent">
                          {d}
                        </Badge>
                      ))}
                      {book.edition ? <Badge>{book.edition}</Badge> : null}
                    </div>

                    <h3 className="mt-3 flex items-start gap-2 text-lg font-bold">
                      {/*
                        `href: null` means no stable publisher page was found.
                        The citation then renders as plain text — the same rule
                        the social links follow, for the same reason: a
                        plausible-looking dead link costs more than no link.
                      */}
                      {book.href ? (
                        <>
                          <a
                            href={book.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="after:absolute after:inset-0"
                          >
                            {book.title}
                          </a>
                          <span className="mt-1.5">
                            <ExternalArrow />
                          </span>
                        </>
                      ) : (
                        book.title
                      )}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-accent">
                      {book.authors}
                    </p>
                    <p className="mt-3 text-sm text-muted">{book.why}</p>

                    {book.href ? null : (
                      <p className="mt-4 border-t border-line pt-3 text-xs text-faint">
                        Search by title and author — this one has no stable
                        publisher page to link.
                      </p>
                    )}
                  </Card>
                </Reveal>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ----------------------------------------------------- matlab path */}
      <Section tone="subtle" id={matlabPath.id} className="scroll-mt-20">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow={matlabPath.provider}
              title={matlabPath.title}
              lead={matlabPath.description}
            />
          </Reveal>

          {matlabPath.note ? (
            <Reveal>
              <p className="mt-6 max-w-2xl text-sm text-faint">{matlabPath.note}</p>
            </Reveal>
          ) : null}

          <ol className="mt-10 space-y-3">
            {matlabPath.steps.map((step, i) => (
              <li key={step.href}>
                <Reveal delay={Math.min(i, 6) * 30}>
                  <Card interactive className="group relative flex gap-5 p-5">
                    <span
                      aria-hidden="true"
                      className="shrink-0 font-mono text-sm font-semibold text-accent"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex items-start gap-2 font-bold">
                        <a
                          href={step.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="after:absolute after:inset-0"
                        >
                          {step.title}
                        </a>
                        <span className="mt-1">
                          <ExternalArrow />
                        </span>
                      </h3>
                      <p className="mt-1 text-sm text-muted">{step.blurb}</p>
                    </div>
                  </Card>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------- open-source tools */}
      <Section id="open-source" className="scroll-mt-20">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow="Open source"
              title="Simulation that costs nothing to run"
              lead="HFSS and ADS are what the industry uses, and neither is free. These are the open-source solvers capable enough to learn on and, in several cases, to publish with."
            />
          </Reveal>

          <div className="mt-10 space-y-12">
            {openSourceToolCategories.map((category) => {
              const inCategory = openSourceTools.filter(
                (t) => t.category === category,
              );
              if (inCategory.length === 0) return null;

              return (
                <section key={category}>
                  <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-faint">
                    {category}
                  </h3>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {inCategory.map((tool, i) => (
                      <li key={tool.href}>
                        <Reveal delay={Math.min(i, 5) * 40}>
                          <Card interactive className="group relative h-full p-5">
                            <h4 className="flex items-start gap-2 font-bold">
                              <a
                                href={tool.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="after:absolute after:inset-0"
                              >
                                {tool.name}
                              </a>
                              <span className="mt-1">
                                <ExternalArrow />
                              </span>
                            </h4>
                            <p className="mt-2 text-sm text-muted">{tool.blurb}</p>
                          </Card>
                        </Reveal>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>

          <Reveal>
            <Card className="mt-12 p-7">
              <h3 className="text-xl font-bold">
                Looking for a calculator rather than a solver?
              </h3>
              <p className="mt-2 max-w-2xl text-muted">
                The filter designer, antenna calculator, microstrip designer and
                Smith chart lab run in your browser, need no account and compute
                on your own device.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <ButtonLink href="/tools">Open the tools</ButtonLink>
                <ButtonLink href="/study-material" variant="secondary">
                  Study material
                </ButtonLink>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------------ contribute */}
      <Section tone="subtle">
        <Container wide>
          <Reveal>
            <Card className="flex flex-col gap-6 p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-bold">
                  Know something that belongs here?
                </h2>
                <p className="mt-2 text-muted">
                  This list is curated, not crowdsourced — but it grows on
                  suggestions. Send a paper, a lecture series or a tool that
                  earned its place, and say what it taught you.
                </p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3">
                <ButtonLink href="/contact">Suggest a resource</ButtonLink>
                <Link
                  href="/links"
                  className="inline-flex items-center text-sm font-semibold text-accent hover:underline"
                >
                  General engineering links <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Card>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
