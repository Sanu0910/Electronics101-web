import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getWorkshop, workshops } from "@/content/workshops";
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
import { formatDate, formatDateTime, priceLabel } from "@/lib/utils";
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
            <Link href="/workshops" className="text-faint transition-colors hover:text-accent">
              Workshops
            </Link>
            <span className="mx-2 text-faint" aria-hidden="true">
              /
            </span>
            <span className="text-muted">{item.title}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone={item.status === "Open" ? "ok" : "neutral"}>{item.status}</Badge>
                <Badge>{item.mode}</Badge>
                <Badge tone="accent">{item.level}</Badge>
                {item.placeholder ? <PlaceholderTag /> : null}
              </div>

              <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
                {item.title}
              </h1>
              {item.subtitle ? (
                <p className="mt-3 text-xl font-semibold text-accent">{item.subtitle}</p>
              ) : null}
              <p className="mt-5 text-lg text-muted">{item.description}</p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-line p-4">
                  <dt className="text-xs uppercase tracking-wider text-faint">Starts</dt>
                  <dd className="mt-1 font-semibold tabular">
                    <time dateTime={item.startsAt}>{formatDateTime(item.startsAt)}</time>
                  </dd>
                </div>
                <div className="rounded-xl border border-line p-4">
                  <dt className="text-xs uppercase tracking-wider text-faint">Duration</dt>
                  <dd className="mt-1 font-semibold">{item.durationLabel}</dd>
                </div>
                <div className="rounded-xl border border-line p-4">
                  <dt className="text-xs uppercase tracking-wider text-faint">Format</dt>
                  <dd className="mt-1 font-semibold">{item.mode}</dd>
                  {item.liveOnly ? (
                    <dd className="mt-1 text-xs text-warn-400">
                      Live only — not recorded
                    </dd>
                  ) : null}
                </div>
              </dl>
            </div>

            {item.image ? (
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
        </Container>
      </Section>

      {/* -------------------------------------------------------- topics */}
      <Section>
        <Container wide>
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
        </Container>
      </Section>

      {/* ------------------------------------------------------ register */}
      <Section tone="subtle" id="register">
        <Container wide>
          <SectionHead
            eyebrow="Registration"
            title="Reserve a seat"
            lead="Payment is handled on Razorpay's secure page. This site never sees your card details."
          />

          {item.applyBy ? (
            <div className="mt-8 flex flex-wrap items-center gap-4 rounded-2xl border border-warn-400/40 bg-warn-400/5 p-5">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-warn-400">
                  Applications close{" "}
                  <time dateTime={item.applyBy}>{formatDate(item.applyBy)}</time>
                </p>
                <p className="mt-1 text-sm text-muted">
                  Early-bird pricing applies until then.
                </p>
              </div>
              <Countdown iso={item.applyBy} />
            </div>
          ) : null}

          {tiers.length ? (
            <>
              <div className="mt-10 grid gap-6 lg:grid-cols-2">
                {tiers.map((tier) => (
                  <Card key={tier.id} className="flex flex-col p-6">
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
                    {tier.standardPriceInr && item.applyBy ? (
                      <p className="mt-1 text-xs text-faint">
                        Early-bird price until{" "}
                        <time dateTime={item.applyBy}>{formatDate(item.applyBy)}</time>
                        {" · "}
                        {priceLabel(tier.standardPriceInr)} after that
                      </p>
                    ) : (
                      <p className="mt-1 text-xs text-faint">
                        Confirm the amount on the Razorpay page before paying.
                      </p>
                    )}

                    <ButtonLink
                      href={tier.href}
                      external
                      size="lg"
                      className="mt-6"
                    >
                      Register as {tier.label}
                    </ButtonLink>
                  </Card>
                ))}
              </div>

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
      <Section>
        <Container wide>
          <Card className="flex flex-wrap items-center justify-between gap-6 p-8">
            <div>
              <h2 className="text-2xl font-bold">Starts in</h2>
              <p className="mt-1 text-sm text-muted">
                <time dateTime={item.startsAt}>{formatDateTime(item.startsAt)}</time>
              </p>
            </div>
            <Countdown iso={item.startsAt} />
          </Card>
        </Container>
      </Section>
    </>
  );
}
