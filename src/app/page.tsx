import Image from "next/image";
import Link from "next/link";
import { series, teachingAreas } from "@/content/series";
import { upcomingWorkshops } from "@/content/workshops";
import { courses } from "@/content/courses";
import { differentiators, publishedTestimonials } from "@/content/misc";
import { socials } from "@/config/site";
import { asset } from "@/lib/paths";
import {
  ButtonLink,
  Container,
  Section,
  SectionHead,
  Card,
  Badge,
  EmptyState,
} from "@/components/ui/primitives";
import { SeriesCard, WorkshopCard, CourseCard } from "@/components/cards";
import { TestimonialCarousel } from "@/components/home/TestimonialCarousel";
import { Countdown } from "@/components/home/Countdown";
import { SafeImage } from "@/components/ui/SafeImage";

export default function HomePage() {
  const next = upcomingWorkshops();
  const featuredWorkshop = next[0];

  return (
    <>
      {/* ------------------------------------------------------------ hero */}
      <section className="relative isolate overflow-hidden">
        {/* the generated field pattern sits right; the copy sits in its empty left */}
        <Image
          src={asset("/images/hero-field.jpg")!}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover object-right opacity-90"
        />
        <div
          className="absolute inset-0 -z-10 bg-gradient-to-r from-bg via-bg/85 to-transparent"
          aria-hidden="true"
        />

        <Container wide className="py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              Learn. Build. Simulate. Innovate.
            </p>

            <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Learn Electronics.
              <br />
              <span className="text-accent">Build Real Skills.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg text-muted">
              An independent technical platform for practical electronics, RF and
              microwave engineering, antenna design, PCB and EMI/EMC, semiconductor
              technology and simulation. Every result is derived and then checked —
              because a number you cannot check is not a result.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/courses" size="lg">
                Explore Courses
              </ButtonLink>
              <ButtonLink href="/workshops" variant="secondary" size="lg">
                Upcoming Workshops
              </ButtonLink>
              <ButtonLink href="/series" variant="secondary" size="lg">
                Join a Programme
              </ButtonLink>
              <ButtonLink href="/study-material" variant="ghost" size="lg">
                Explore Study Material
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------------- what we teach */}
      <Section tone="subtle">
        <Container wide>
          <SectionHead
            eyebrow="What We Teach"
            title="Ten domains, one engineering method"
            lead="Each area is a full learning track with its own episodes, resources and projects."
          />
          <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {teachingAreas.map((area) => (
              <li key={area.href}>
                <Link
                  href={area.href}
                  className="flex h-full items-center rounded-xl border border-line bg-elevated p-4 text-sm font-semibold transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  {area.label}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* --------------------------------------------- featured programmes */}
      <Section>
        <Container wide>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Featured Programmes"
              title="Structured paths, not playlists"
              lead="Each series builds on the last, so the ideas compound instead of repeating."
            />
            <ButtonLink href="/series" variant="secondary">
              All 11 Series
            </ButtonLink>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {series.slice(0, 6).map((item) => (
              <SeriesCard key={item.slug} item={item} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------ upcoming events */}
      <Section tone="subtle" id="events">
        <Container wide>
          <SectionHead
            eyebrow="Upcoming Events"
            title="Live workshops and technical sessions"
            lead="Small cohorts, hands-on, with the model files and material to keep."
          />

          {featuredWorkshop ? (
            <div className="mt-12 grid gap-6 lg:grid-cols-[1.15fr_1fr]">
              <Card className="overflow-hidden">
                <div className="grid gap-0 sm:grid-cols-2">
                  {featuredWorkshop.image ? (
                    <div className="relative min-h-52 bg-subtle">
                      <SafeImage
                        src={featuredWorkshop.image}
                        sizes="(max-width: 640px) 100vw, 30vw"
                      />
                    </div>
                  ) : null}
                  <div className="p-6">
                    <Badge tone="ok">{featuredWorkshop.status}</Badge>
                    <h3 className="mt-3 text-2xl font-bold">{featuredWorkshop.title}</h3>
                    <p className="mt-2 text-sm text-muted">{featuredWorkshop.summary}</p>
                    <Countdown iso={featuredWorkshop.startsAt} className="mt-5" />
                    <div className="mt-6 flex flex-wrap gap-3">
                      <ButtonLink href={`/workshops/${featuredWorkshop.slug}`}>
                        View Details
                      </ButtonLink>
                      <ButtonLink
                        href={`/workshops/${featuredWorkshop.slug}#register`}
                        variant="secondary"
                      >
                        Register Now
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="grid gap-6">
                {next.slice(1, 3).map((w) => (
                  <WorkshopCard key={w.slug} item={w} />
                ))}
              </div>
            </div>
          ) : (
            <div className="mt-12">
              <EmptyState
                title="No scheduled events right now"
                body="New workshops are announced here first. The series and study material are available meanwhile."
                action={<ButtonLink href="/series">Browse the Series</ButtonLink>}
              />
            </div>
          )}
        </Container>
      </Section>

      {/* ---------------------------------------------------------- why us */}
      <Section>
        <Container wide>
          <SectionHead
            eyebrow="Why Electronics 101?"
            title="Built for people who will have to make it work"
            lead="The audience is engineering students, working RF and electronics engineers, and teams who need the real thing rather than a certificate."
          />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentiators.map((d) => (
              <Card key={d.title} className="p-5">
                <h3 className="font-bold text-accent">{d.title}</h3>
                <p className="mt-2 text-sm text-muted">{d.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* --------------------------------------------------------- courses */}
      <Section tone="subtle">
        <Container wide>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="Courses"
              title="Go deeper, with a deliverable at the end"
              lead="Longer programmes with curriculum, projects and a certificate."
            />
            <ButtonLink href="/courses" variant="secondary">
              All Courses
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {courses.slice(0, 3).map((c) => (
              <CourseCard key={c.slug} item={c} />
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------- social proof */}
      <Section>
        <Container wide>
          <SectionHead
            eyebrow="Feedback"
            title="What participants say"
            lead="Reviews are published only after approval. The entries below are placeholders until real submissions arrive."
            align="center"
          />
          <div className="mt-12">
            <TestimonialCarousel items={publishedTestimonials} />
          </div>
          <div className="mt-10 flex justify-center">
            <ButtonLink href="/feedback" variant="secondary">
              Submit Your Feedback
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* ----------------------------------------------------------- social */}
      <Section tone="subtle">
        <Container wide>
          <SectionHead
            eyebrow="Community"
            title="Follow the work"
            lead="Episodes, build notes and workshop announcements."
            align="center"
          />
          <ul className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {socials.map((s) => (
              <li key={s.id}>
                <Card className="flex h-full flex-col p-5">
                  <h3 className="font-bold">{s.label}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{s.blurb}</p>
                  {s.href ? (
                    <ButtonLink
                      href={s.href}
                      external
                      variant="secondary"
                      size="sm"
                      className="mt-4 self-start"
                    >
                      {s.cta}
                    </ButtonLink>
                  ) : (
                    <p className="mt-4 text-xs text-faint">Link coming soon</p>
                  )}
                </Card>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
    </>
  );
}
