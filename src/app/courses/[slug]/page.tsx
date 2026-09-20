import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { courses, getCourse } from "@/content/courses";
import { getInstructor } from "@/content/misc";
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
import { Accordion } from "@/components/ui/Accordion";
import { priceLabel } from "@/lib/utils";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getCourse(slug);
  if (!item) return { title: "Course not found" };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/courses/${item.slug}` },
    openGraph: {
      title: `${item.title} · ${site.name}`,
      description: item.summary,
      url: `/courses/${item.slug}`,
    },
  };
}

export default async function CourseDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getCourse(slug);
  if (!item) notFound();

  const instructor = getInstructor(item.instructorId);

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
    teaches: item.outcomes,
    coursePrerequisites: item.prerequisites,
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
            <Link href="/courses" className="text-faint transition-colors hover:text-accent">
              Courses
            </Link>
            <span className="mx-2 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-muted">{item.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="accent">{item.level}</Badge>
                <Badge>{item.mode}</Badge>
                <Badge tone={item.status === "Open" ? "ok" : "neutral"}>{item.status}</Badge>
                {item.placeholder ? <PlaceholderTag /> : null}
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                {item.title}
              </h1>
              <p className="mt-5 text-lg text-muted">{item.description}</p>
            </div>

            <Card className="h-fit p-6">
              <p className="text-3xl font-bold tabular">{priceLabel(item.priceInr)}</p>
              <dl className="mt-6 space-y-3 text-sm">
                {[
                  ["Duration", item.duration],
                  ["Modules", String(item.moduleCount)],
                  ["Format", item.mode],
                  ["Certificate", item.certificate ? "Yes" : "No"],
                  ["Tools", item.tools.join(", ")],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 border-b border-line pb-3">
                    <dt className="text-faint">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
              <ButtonLink href="/contact" size="lg" className="mt-6 w-full">
                {item.status === "Open" ? "Enrol Now" : "Register Interest"}
              </ButtonLink>
              <p className="mt-3 text-center text-xs text-faint">
                {item.status === "Open"
                  ? "Secure payment on the next step"
                  : "You will hear before it is announced publicly"}
              </p>
            </Card>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- outcomes */}
      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="Outcomes" title="What you will be able to do" />
              <div className="mt-8">
                <Bullets items={item.outcomes} />
              </div>
            </div>
            <div className="space-y-10">
              <div>
                <SectionHead eyebrow="Prerequisites" title="What you need first" />
                <div className="mt-8">
                  <Bullets items={item.prerequisites} />
                </div>
              </div>
              <div>
                <SectionHead eyebrow="Software" title="What to install" />
                <div className="mt-8">
                  <Bullets items={item.softwareRequirements} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------- curriculum */}
      <Section tone="subtle">
        <Container wide>
          <SectionHead
            eyebrow="Curriculum"
            title={`${item.moduleCount} modules`}
            lead="Expand a module to see the lessons inside it."
          />
          <div className="mt-10">
            <Accordion
              items={item.curriculum.map((m, i) => ({
                id: `module-${i}`,
                title: `${String(i + 1).padStart(2, "0")} · ${m.title}`,
                meta: m.duration,
                body: (
                  <ul className="space-y-2">
                    {m.lessons.map((l) => (
                      <li key={l} className="flex gap-3 text-muted">
                        <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="min-w-0">{l}</span>
                      </li>
                    ))}
                  </ul>
                ),
              }))}
            />
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------- projects */}
      <Section>
        <Container wide>
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <SectionHead eyebrow="Projects" title="What you will build" />
              <div className="mt-8">
                <Bullets items={item.projects} />
              </div>
            </div>

            {instructor ? (
              <div>
                <SectionHead eyebrow="Instructor" title="Who teaches it" />
                <Card className="mt-8 p-6">
                  <p className="text-lg font-bold">
                    {instructor.name ?? instructor.title}
                  </p>
                  {instructor.name ? (
                    <p className="text-sm text-accent">{instructor.title}</p>
                  ) : null}
                  <p className="mt-3 text-sm text-muted">{instructor.bio}</p>
                  {instructor.placeholder ? <PlaceholderTag className="mt-4" /> : null}
                </Card>
              </div>
            ) : null}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------ faq */}
      <Section tone="subtle">
        <Container wide>
          <SectionHead eyebrow="FAQ" title="Common questions" />
          <div className="mt-10 max-w-3xl">
            <Accordion
              items={item.faqs.map((f, i) => ({
                id: `faq-${i}`,
                title: f.q,
                body: <p className="text-muted">{f.a}</p>,
              }))}
            />
          </div>
        </Container>
      </Section>
    </>
  );
}
