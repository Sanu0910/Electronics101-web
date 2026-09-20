import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkshop, workshops } from "@/content/workshops";
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
import { Countdown } from "@/components/home/Countdown";
import { Reveal } from "@/components/ui/Reveal";
import { DayTimeline } from "@/components/workshops/DayTimeline";
import { cn, formatDate, formatDateTime, formatInr, priceLabel } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";
import { site } from "@/config/site";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return workshops.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkshop(slug);
  if (!item) return { title: "Workshop not found" };
  return {
    title: item.title,
    description: item.summary,
    alternates: { canonical: `/workshops/${item.slug}` },
    openGraph: {
      title: `${item.title} · ${site.name}`,
      description: item.summary,
      url: `/workshops/${item.slug}`,
    },
  };
}

export default async function WorkshopDetailPage({ params }: Params) {
  const { slug } = await params;
  const item = getWorkshop(slug);
  if (!item) notFound();

  const tiers = item.tiers ?? [];
  /* A certificate is bought alongside a seat, so it is not offered as one. */
  const seatTiers = tiers.filter((t) => !t.addOn);
  const addOnTiers = tiers.filter((t) => t.addOn);

  /*
   * An early-bird date is a price change; applyBy is a hard close. Both drive
   * the same countdown, but they must not be announced in the same words.
   */
  const deadline = item.earlyBirdUntil ?? item.applyBy;
  const deadlineIsPriceChange = Boolean(item.earlyBirdUntil);

  const instructor = getInstructor(item.instructorId);

  /* A wide poster cannot go in the portrait slot beside the copy. */
  const portraitPoster = Boolean(item.image) && item.imageOrientation !== "landscape";
  const landscapePoster = Boolean(item.image) && item.imageOrientation === "landscape";

  /*
   * Sections alternate tone, and the optional ones are what shift the rhythm,
   * so the order is derived once here rather than hardcoded per section.
   */
  const optionalSections = [
    item.audience?.length ? "audience" : null,
    item.valueProps?.length ? "value" : null,
    instructor ? "instructor" : null,
  ].filter((x): x is string => x !== null);

  const toneAt = (i: number): "subtle" | "default" =>
    i % 2 === 0 ? "subtle" : "default";
  const toneOf = (name: string) => toneAt(optionalSections.indexOf(name));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EducationEvent",
    name: item.title,
    description: item.summary,
    startDate: item.startsAt,
    ...(item.endsAt ? { endDate: item.endsAt } : {}),
    eventAttendanceMode:
      item.mode === "Live Online"
        ? "https://schema.org/OnlineEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    organizer: { "@type": "Organization", name: site.name, url: site.url },
    /* Only seats with a confirmed price are offered — an offer without one
       tells search engines less than saying nothing. */
    ...(seatTiers.some((t) => t.priceInr !== null)
      ? {
          offers: seatTiers
            .filter((t) => t.priceInr !== null)
            .map((t) => ({
              "@type": "Offer",
              name: t.label,
              price: t.priceInr,
              priceCurrency: "INR",
              availability:
                item.status === "Closed"
                  ? "https://schema.org/SoldOut"
                  : "https://schema.org/InStock",
              url: t.href ?? `${site.url}/workshops/${item.slug}/`,
            })),
        }
      : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ----------------------------------------------------------- hero */}
      <Section className="relative overflow-hidden pb-0">
        {/* a soft accent wash behind the hero, purely decorative */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-accent/10 blur-3xl"
        />

        <Container wide className="relative">
          <nav aria-label="Breadcrumb" className="mb-8 text-sm animate-rise">
            <Link href="/workshops" className="text-faint transition-colors hover:text-accent">
              Workshops
            </Link>
            <span className="mx-2 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-muted">{item.title}</span>
          </nav>

          <div className={cn("grid gap-10", portraitPoster && "lg:grid-cols-[1.5fr_1fr]")}>
            <div>
              <div
                className="flex flex-wrap items-center gap-2 animate-rise"
                style={{ animationDelay: "60ms" }}
              >
                <Badge tone={item.status === "Open" ? "ok" : "neutral"}>{item.status}</Badge>
                <Badge>{item.mode}</Badge>
                <Badge tone="accent">{item.level}</Badge>
                {item.placeholder ? <PlaceholderTag /> : null}
              </div>

              <h1
                className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl animate-rise"
                style={{ animationDelay: "120ms" }}
              >
                {item.title}
              </h1>
              {item.subtitle ? (
                <p
                  className="mt-3 text-xl font-semibold text-accent animate-rise"
                  style={{ animationDelay: "180ms" }}
                >
                  {item.subtitle}
                </p>
              ) : null}
              <p
                className="mt-5 text-lg text-muted animate-rise"
                style={{ animationDelay: "240ms" }}
              >
                {item.description}
              </p>

              {/* the capability chips, staggered in after the copy */}
              {item.days && item.topics.length ? (
                <ul className="mt-7 flex flex-wrap gap-2">
                  {item.topics.map((t, i) => (
                    <li
                      key={t}
                      className="animate-rise"
                      style={{ animationDelay: `${300 + i * 45}ms` }}
                    >
                      <span className="inline-flex rounded-full border border-line px-3.5 py-1.5 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent">
                        {t}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : null}

              <dl
                className="mt-8 grid gap-4 sm:grid-cols-3 animate-rise"
                style={{ animationDelay: "320ms" }}
              >
                <div className="rounded-xl border border-line p-4 transition-colors duration-200 hover:border-accent/40">
                  <dt className="text-xs uppercase tracking-wider text-faint">Starts</dt>
                  <dd className="mt-1 font-semibold tabular">
                    <time dateTime={item.startsAt}>{formatDateTime(item.startsAt)}</time>
                  </dd>
                </div>
                <div className="rounded-xl border border-line p-4 transition-colors duration-200 hover:border-accent/40">
                  <dt className="text-xs uppercase tracking-wider text-faint">Duration</dt>
                  <dd className="mt-1 font-semibold">{item.durationLabel}</dd>
                </div>
                <div className="rounded-xl border border-line p-4 transition-colors duration-200 hover:border-accent/40">
                  <dt className="text-xs uppercase tracking-wider text-faint">Format</dt>
                  <dd className="mt-1 font-semibold">{item.mode}</dd>
                  {item.liveOnly ? (
                    <dd className="mt-1 text-xs text-warn-400">
                      Live only — not recorded
                    </dd>
                  ) : null}
                </div>
              </dl>

              <div
                className="mt-8 flex flex-wrap items-center gap-4 animate-rise"
                style={{ animationDelay: "380ms" }}
              >
                <ButtonLink href="#register" size="lg">
                  {item.priceInr !== null
                    ? `Reserve a seat — from ${formatInr(item.priceInr)}`
                    : "Reserve a seat"}
                </ButtonLink>
                <ButtonLink href="#curriculum" variant="secondary" size="lg">
                  See curriculum
                </ButtonLink>
              </div>
            </div>

            {portraitPoster && item.image ? (
              /* the poster is portrait and carries the whole programme in it,
                 so it is contained rather than cropped to a landscape box */
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-line bg-subtle">
                <SafeImage
                  src={item.image}
                  priority
                  fit="contain"
                  alt={`${item.title} workshop poster`}
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
            ) : null}
          </div>

          {landscapePoster && item.image ? (
            /* rendered at its own aspect ratio, so nothing is cropped out of
               a picture whose whole point is the radiation patterns */
            <div
              className="mx-auto mt-14 max-w-5xl animate-rise"
              style={{ animationDelay: "440ms" }}
            >
              <div className="relative aspect-[10/7] overflow-hidden rounded-2xl border border-line bg-subtle">
                <SafeImage
                  src={item.image}
                  priority
                  alt={`${item.title} — phased array, beamforming and multi-user tracking`}
                  sizes="(max-width: 1024px) 100vw, 64rem"
                />
              </div>
            </div>
          ) : null}
        </Container>
      </Section>

      {/* ----------------------------------------------------- curriculum */}
      <Section id="curriculum">
        <Container wide>
          {item.days ? (
            <>
              <Reveal>
                <SectionHead
                  eyebrow="Curriculum"
                  title="What you will learn"
                  lead={`${item.days.length} days · ${item.durationLabel}. Open a day to see what it covers.`}
                />
              </Reveal>

              <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
                <Reveal>
                  <DayTimeline days={item.days} />
                </Reveal>

                <div className="space-y-8">
                  <Reveal delay={80}>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                        {item.includesNote ? "Premium batch includes" : "What you get"}
                      </h3>
                      <div className="mt-6">
                        <Bullets items={item.includes} />
                      </div>
                      {item.includesNote ? (
                        <p className="mt-5 rounded-xl border border-line bg-subtle p-4 text-xs text-faint">
                          {item.includesNote}
                        </p>
                      ) : null}
                    </div>
                  </Reveal>
                </div>
              </div>

              {item.projectFlow?.length ? (
                <Reveal delay={60}>
                  <div className="mt-14 rounded-2xl border border-line bg-elevated p-6 sm:p-8">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                      Final mini-project
                    </h3>
                    <ol className="mt-5 flex flex-wrap items-center gap-2">
                      {item.projectFlow.map((step, i) => {
                        const last = i === item.projectFlow!.length - 1;
                        return (
                          <li key={step} className="flex items-center gap-2">
                            <span
                              className={cn(
                                "inline-flex rounded-xl border px-4 py-2 text-sm font-semibold transition-colors duration-200",
                                last
                                  ? "border-warn-400/50 bg-warn-400/10 text-warn-400"
                                  : "border-line hover:border-accent/50 hover:text-accent",
                              )}
                            >
                              {step}
                            </span>
                            {!last ? (
                              <span aria-hidden="true" className="text-faint">
                                ›
                              </span>
                            ) : null}
                          </li>
                        );
                      })}
                    </ol>
                  </div>
                </Reveal>
              ) : null}

              {item.pitch ? (
                <Reveal delay={80}>
                  <div className="mt-6 rounded-2xl border border-line border-l-4 border-l-accent bg-elevated p-6 sm:p-8">
                    <p className="text-lg font-bold">{item.pitch.title}</p>
                    <p className="mt-1 text-muted">{item.pitch.body}</p>
                  </div>
                </Reveal>
              ) : null}
            </>
          ) : (
            /* the original two-column layout, for workshops without days */
            <div className="grid gap-12 lg:grid-cols-2">
              <div>
                <SectionHead eyebrow="Curriculum" title="What you will learn" />
                <ol className="mt-8 space-y-2">
                  {(item.modules ?? item.topics.map((t) => ({ title: t, detail: "" }))).map(
                    (mod, i) => (
                      <li
                        key={mod.title}
                        className="flex gap-4 rounded-xl border border-line p-4"
                      >
                        <span className="mt-0.5 font-mono text-sm font-semibold text-accent tabular">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold">{mod.title}</span>
                          {mod.detail ? (
                            <span className="mt-0.5 block text-sm text-muted">{mod.detail}</span>
                          ) : null}
                        </span>
                      </li>
                    ),
                  )}
                </ol>
              </div>

              <div>
                <SectionHead eyebrow="Included" title="What you get" />
                <div className="mt-8">
                  <Bullets items={item.includes} />
                </div>
              </div>
            </div>
          )}
        </Container>
      </Section>

      {/* ------------------------------------------------------- audience */}
      {item.audience?.length ? (
        <Section tone={toneOf("audience")}>
          <Container wide>
            <Reveal>
              <SectionHead
                eyebrow="Who it is for"
                title="Who should attend"
                lead="Built for engineers and researchers who already model antennas and need the methods that larger problems demand."
              />
            </Reveal>
            <ul className="mt-10 flex flex-wrap gap-3">
              {item.audience.map((who, i) => (
                <li key={who}>
                  <Reveal delay={i * 35}>
                    <span className="inline-flex rounded-full border border-line bg-elevated px-4 py-2 text-sm text-muted transition-colors duration-200 hover:border-accent/50 hover:text-accent">
                      {who}
                    </span>
                  </Reveal>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------- value */}
      {item.valueProps?.length ? (
        <Section tone={toneOf("value")}>
          <Container wide>
            <Reveal>
              <SectionHead
                eyebrow="Why this one"
                title="What the seat actually buys"
                lead="Four reasons that survive a sceptical read."
              />
            </Reveal>
            <div className="mt-10 grid gap-6 sm:grid-cols-2">
              {item.valueProps.map((v, i) => (
                <Reveal key={v.title} delay={i * 70} className="h-full">
                  <Card className="h-full p-6 transition-transform duration-200 hover:-translate-y-1">
                    <h3 className="text-lg font-bold">{v.title}</h3>
                    <p className="mt-2 text-muted">{v.body}</p>
                  </Card>
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ----------------------------------------------------- instructor */}
      {instructor ? (
        <Section tone={toneOf("instructor")}>
          <Container wide>
            <Reveal>
              <SectionHead eyebrow="Who teaches it" title="Your instructor" />
            </Reveal>
            <Reveal delay={60}>
              <Card className="mt-10 p-6 sm:p-8">
                <div className="flex flex-wrap items-start gap-6">
                  {instructor.image ? (
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-2xl border border-line bg-subtle">
                      <SafeImage
                        src={instructor.image}
                        alt={`${instructor.name ?? "Instructor"} — ${instructor.title}`}
                        sizes="96px"
                      />
                    </div>
                  ) : null}

                  <div className="min-w-0 flex-1">
                    {/* presented by credentials when there is no name to show */}
                    <p className="text-2xl font-bold">
                      {instructor.name ?? instructor.title}
                    </p>
                    {instructor.name ? (
                      <p className="mt-1 font-semibold text-accent">{instructor.title}</p>
                    ) : null}
                    <p className="mt-4 max-w-3xl text-muted">{instructor.bio}</p>

                    {instructor.credentials?.length ? (
                      <ul className="mt-6 flex flex-wrap gap-2">
                        {instructor.credentials.map((c) => (
                          <li key={c}>
                            <Badge tone="ok">{c}</Badge>
                          </li>
                        ))}
                      </ul>
                    ) : null}

                    {instructor.placeholder ? <PlaceholderTag className="mt-6" /> : null}
                  </div>
                </div>
              </Card>
            </Reveal>
          </Container>
        </Section>
      ) : null}

      {/* ------------------------------------------------------- register */}
      <Section tone={toneAt(optionalSections.length)} id="register">
        <Container wide>
          <Reveal>
            <SectionHead
              eyebrow="Registration"
              title="Reserve a seat"
              lead="Payment is handled on Razorpay's secure page. This site never sees your card details."
            />
          </Reveal>

          {deadline ? (
            <Reveal>
              <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-warn-400/40 bg-warn-400/5 p-5">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-warn-400">
                    {deadlineIsPriceChange ? "Early-bird pricing ends" : "Applications close"}{" "}
                    <time dateTime={deadline}>{formatDate(deadline)}</time>
                  </p>
                  <p className="mt-1 text-sm text-muted">
                    {deadlineIsPriceChange
                      ? "Seats stay open after that, at the standard price."
                      : "Early-bird pricing applies until then."}
                  </p>
                </div>
                <Countdown iso={deadline} />
              </div>
            </Reveal>
          ) : null}

          {seatTiers.length ? (
            <>
              <div
                className={cn(
                  "mt-10 grid gap-6",
                  seatTiers.length > 2 ? "lg:grid-cols-3" : "lg:grid-cols-2",
                )}
              >
                {seatTiers.map((tier, i) => (
                  <Reveal key={tier.id} delay={i * 70} className="h-full">
                    <Card
                      className={cn(
                        "flex h-full flex-col p-6 transition-transform duration-200 hover:-translate-y-1",
                        tier.highlight && "border-accent/50 accent-glow",
                      )}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold">{tier.label}</h3>
                          <p className="mt-1 text-sm text-muted">{tier.forWho}</p>
                        </div>
                        {tier.note ? <Badge tone="accent">{tier.note}</Badge> : null}
                      </div>

                      <div className="mt-6 flex flex-wrap items-baseline gap-3">
                        <p className="text-3xl font-bold tabular">
                          {priceLabel(tier.priceInr)}
                        </p>
                        {/* the old price is struck through, so the saving is
                            checkable rather than asserted */}
                        {tier.standardPriceInr && tier.priceInr ? (
                          <p className="text-lg text-faint line-through tabular">
                            {priceLabel(tier.standardPriceInr)}
                          </p>
                        ) : null}
                        {tier.standardPriceInr && tier.priceInr ? (
                          <Badge tone="ok">
                            Save {priceLabel(tier.standardPriceInr - tier.priceInr)}
                          </Badge>
                        ) : null}
                      </div>
                      {tier.standardPriceInr && deadline ? (
                        <p className="mt-1 text-xs text-faint">
                          Early-bird price until{" "}
                          <time dateTime={deadline}>{formatDate(deadline)}</time>
                          {" · "}
                          {priceLabel(tier.standardPriceInr)} after that
                        </p>
                      ) : tier.standardPriceInr ? (
                        <p className="mt-1 text-xs text-faint">
                          Early-bird price · {priceLabel(tier.standardPriceInr)} once the
                          early-bird seats are gone.
                        </p>
                      ) : (
                        <p className="mt-1 text-xs text-faint">
                          Confirm the amount on the Razorpay page before paying.
                        </p>
                      )}

                      <div className="mt-auto pt-6">
                        {tier.href ? (
                          <ButtonLink href={tier.href} external size="lg" className="w-full">
                            Register as {tier.label}
                          </ButtonLink>
                        ) : (
                          <>
                            <ButtonLink
                              href="/contact"
                              variant="secondary"
                              size="lg"
                              className="w-full"
                            >
                              Enquire to book
                            </ButtonLink>
                            <p className="mt-2 text-center text-xs text-faint">
                              Payment link opening shortly — enquire and it is sent to
                              you directly.
                            </p>
                          </>
                        )}
                      </div>
                    </Card>
                  </Reveal>
                ))}
              </div>

              {addOnTiers.length ? (
                <div className="mt-6 space-y-4">
                  {addOnTiers.map((tier) => (
                    <Reveal key={tier.id}>
                      <Card className="flex flex-wrap items-center justify-between gap-4 p-5">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <Badge tone="accent">Add-on</Badge>
                            <h3 className="font-bold">{tier.label}</h3>
                          </div>
                          <p className="mt-1 text-sm text-muted">{tier.forWho}</p>
                        </div>
                        <p className="text-2xl font-bold tabular">
                          {tier.priceInr === null
                            ? priceLabel(null)
                            : `+ ${formatInr(tier.priceInr)}`}
                        </p>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              ) : null}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-faint">
                <span>Secure payment by Razorpay</span>
                <span aria-hidden="true">·</span>
                <span>Opens in a new tab</span>
                <span aria-hidden="true">·</span>
                <Link href="/legal/refunds" className="underline transition-colors hover:text-accent">
                  Refund policy
                </Link>
                <span aria-hidden="true">·</span>
                <Link href="/contact" className="underline transition-colors hover:text-accent">
                  Need an invoice or a group booking?
                </Link>
              </div>

              {item.seatsLeft !== undefined && item.seats !== undefined ? (
                <p className="mt-6 text-sm text-muted tabular">
                  {item.seatsLeft} of {item.seats} seats available.
                </p>
              ) : null}
            </>
          ) : (
            <div className="mt-10">
              <Card className="p-8">
                <p className="text-lg font-semibold">Registration is not open yet</p>
                <p className="mt-2 max-w-xl text-muted">
                  Dates for this session have not been confirmed. Ask to be told when
                  they are and you will hear before it is announced publicly.
                </p>
                <ButtonLink href="/contact" className="mt-6">
                  Notify Me
                </ButtonLink>
              </Card>
            </div>
          )}
        </Container>
      </Section>

      {/* ------------------------------------------------------ countdown */}
      <Section tone={toneAt(optionalSections.length + 1)}>
        <Container wide>
          <Reveal>
            <Card className="flex flex-wrap items-center justify-between gap-6 p-8">
              <div>
                <h2 className="text-2xl font-bold">Starts in</h2>
                <p className="mt-1 text-sm text-muted">
                  <time dateTime={item.startsAt}>{formatDateTime(item.startsAt)}</time>
                </p>
              </div>
              <Countdown iso={item.startsAt} />
            </Card>
          </Reveal>

          {item.disclaimer ? (
            <p className="mx-auto mt-10 max-w-3xl text-center text-xs leading-relaxed text-faint">
              {item.disclaimer}
            </p>
          ) : null}
        </Container>
      </Section>
    </>
  );
}
