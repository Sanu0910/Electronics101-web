import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getSeries, series } from "@/content/series";
import { courses } from "@/content/courses";
import { resources } from "@/content/resources";
import { projects } from "@/content/misc";
import {
  Badge,
  ButtonLink,
  Card,
  Container,
  PlaceholderTag,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { CourseCard, ResourceCard } from "@/components/cards";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

/** Pre-render every series — there are eleven and they never change per request. */
export function generateStaticParams() {
  return series.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getSeries(slug);
  if (!item) return { title: "Series not found" };
  return {
    title: item.title,
    description: item.description,
    alternates: { canonical: `/series/${item.slug}` },
    openGraph: {
      title: `${item.title} · ${site.name}`,
      description: item.description,
      url: `/series/${item.slug}`,
    },
  };
}

export default async function SeriesDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getSeries(slug);
  if (!item) notFound();

  const related = courses.filter((c) =>
    c.domains.some((d) => item.domains.includes(d)),
  );
  const relatedResources = resources.filter((r) =>
    r.domains.some((d) => item.domains.includes(d)),
  );
  const relatedProjects = projects.filter((p) => p.relatedSeries === item.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: item.title,
    description: item.description,
    provider: {
      "@type": "EducationalOrganization",
      name: site.name,
      sameAs: site.url,
    },
    educationalLevel: item.level,
    teaches: item.topics.map((t) => t.title),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section className="pb-0">
        <Container wide>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm">
            <Link href="/series" className="text-faint transition-colors hover:text-accent">
              Series
            </Link>
            <span className="mx-2 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-muted">{item.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="accent">
              Series {String(item.index).padStart(2, "0")}
            </Badge>
            <Badge>{item.level}</Badge>
            {item.domains.map((d) => (
              <Badge key={d}>{d}</Badge>
            ))}
            {item.placeholder ? <PlaceholderTag /> : null}
          </div>

          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted">{item.description}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/contact">Join a Programme</ButtonLink>
            <ButtonLink href="/study-material" variant="secondary">
              Study Material
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- episodes */}
      <Section>
        <Container wide>
          <SectionHead
            eyebrow="Episodes"
            title="What this series covers"
            lead={`${item.topics.length} topics. Each one is an episode with its own worked examples.`}
          />

          <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {item.topics.map((topic, i) => (
              <li key={topic.title}>
                <Card className="flex h-full items-start gap-4 p-4">
                  <span className="mt-0.5 font-mono text-sm font-semibold text-accent tabular">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 font-medium">{topic.title}</span>
                </Card>
              </li>
            ))}
          </ol>

          {!item.episodeCount ? (
            <p className="mt-8 max-w-2xl text-sm text-faint">
              Episode releases are announced on the community channels first. The
              topic list above is the committed scope for this series.
            </p>
          ) : null}
        </Container>
      </Section>

      {/* ------------------------------------------------------- resources */}
      {relatedResources.length ? (
        <Section tone="subtle">
          <Container wide>
            <SectionHead
              eyebrow="Resources"
              title="Material for this series"
              lead="Notes, formula sheets and guides that stay useful after the episodes."
            />
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedResources.slice(0, 6).map((r) => (
                <ResourceCard key={r.slug} item={r} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* -------------------------------------------------------- projects */}
      {relatedProjects.length ? (
        <Section>
          <Container wide>
            <SectionHead eyebrow="Projects" title="Built with these ideas" />
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {relatedProjects.map((p) => (
                <Card key={p.slug} className="p-6">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone="accent">{p.domain}</Badge>
                    {p.placeholder ? <PlaceholderTag /> : null}
                  </div>
                  <h3 className="mt-3 text-xl font-bold">
                    <Link
                      href={`/projects#${p.slug}`}
                      className="transition-colors hover:text-accent"
                    >
                      {p.title}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm text-muted">{p.problem}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* --------------------------------------------------------- courses */}
      {related.length ? (
        <Section tone="subtle">
          <Container wide>
            <SectionHead
              eyebrow="Related Courses"
              title="Take it further"
              lead="Structured programmes covering the same ground in more depth, with a deliverable at the end."
            />
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {related.map((c) => (
                <CourseCard key={c.slug} item={c} />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}
    </>
  );
}
