import Link from "next/link";
import type { Course, Resource, Series, Service, Workshop, BlogPost, Testimonial } from "@/content/types";
import { Badge, Card, PlaceholderTag, buttonClass } from "@/components/ui/primitives";
import { cn, formatDate, formatDateTime, priceLabel, readingTime } from "@/lib/utils";
import { SafeImage } from "@/components/ui/SafeImage";

/**
 * Card components, one per content type. Each takes its typed entry and
 * nothing else — no page passes ad-hoc props, so a card looks identical
 * wherever it appears.
 *
 * Every card is a LINK, not a div with a click handler, so middle-click and
 * Cmd-click behave. The whole card is covered by a stretched anchor and the
 * visible text carries the accessible name.
 */

const statusTone = (status: string) =>
  status === "Open"
    ? "ok"
    : status === "Filling Fast"
      ? "warn"
      : status === "Closed"
        ? "stop"
        : "neutral";

/* ---------------------------------------------------------------- series - */

export function SeriesCard({ item }: { item: Series }) {
  return (
    <Card interactive className="group relative flex flex-col overflow-hidden">
      <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
        <SafeImage
          src={item.image}
          sizes="(max-width: 768px) 100vw, 33vw"
          className="transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-xs font-semibold text-accent tabular">
          {String(item.index).padStart(2, "0")}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{item.level}</Badge>
          {item.placeholder ? <PlaceholderTag /> : null}
        </div>
        <h3 className="mt-3 text-lg font-bold">
          <Link href={`/series/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.description}</p>
        <p className="mt-4 text-sm font-semibold text-accent">
          {item.topics.length} topics <span aria-hidden="true">→</span>
        </p>
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------- courses - */

export function CourseCard({ item }: { item: Course }) {
  return (
    <Card interactive className="group relative flex flex-col">
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="accent">{item.level}</Badge>
          <Badge>{item.mode}</Badge>
          <Badge tone={statusTone(item.status)}>{item.status}</Badge>
          {item.placeholder ? <PlaceholderTag /> : null}
        </div>

        <h3 className="mt-4 text-xl font-bold">
          <Link href={`/courses/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.summary}</p>

        <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 text-sm">
          <div>
            <dt className="text-xs text-faint">Duration</dt>
            <dd className="font-medium">{item.duration}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Modules</dt>
            <dd className="font-medium tabular">{item.moduleCount}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Certificate</dt>
            <dd className="font-medium">{item.certificate ? "Yes" : "No"}</dd>
          </div>
          <div>
            <dt className="text-xs text-faint">Price</dt>
            <dd className="font-medium">{priceLabel(item.priceInr)}</dd>
          </div>
        </dl>

        {item.tools.length ? (
          <p className="mt-4 text-xs text-faint">
            <span className="sr-only">Tools used: </span>
            {item.tools.join(" · ")}
          </p>
        ) : null}
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------- workshops - */

export function WorkshopCard({ item }: { item: Workshop }) {
  return (
    <Card interactive className="group relative flex flex-col overflow-hidden">
      {item.image ? (
        <div className="relative aspect-[16/7] overflow-hidden bg-subtle">
          <SafeImage
            src={item.image}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={statusTone(item.status)}>{item.status}</Badge>
          <Badge>{item.mode}</Badge>
          <Badge tone="accent">{item.level}</Badge>
          {item.placeholder ? <PlaceholderTag /> : null}
        </div>

        <h3 className="mt-4 text-xl font-bold">
          <Link href={`/workshops/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-muted">{item.summary}</p>

        <dl className="mt-5 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-faint">Starts</dt>
            <dd className="text-right font-medium tabular">
              <time dateTime={item.startsAt}>{formatDateTime(item.startsAt)}</time>
            </dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-faint">Duration</dt>
            <dd className="text-right font-medium">{item.durationLabel}</dd>
          </div>
        </dl>
      </div>
    </Card>
  );
}

/* -------------------------------------------------------------- resource - */

export function ResourceCard({ item }: { item: Resource }) {
  const available = Boolean(item.file);
  return (
    <Card className="flex flex-col p-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="accent">{item.kind}</Badge>
        <Badge tone={item.access === "Free" ? "ok" : "neutral"}>{item.access}</Badge>
        {item.placeholder ? <PlaceholderTag /> : null}
      </div>

      <h3 className="mt-3 text-base font-bold">{item.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.description}</p>

      <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-4">
        <span className="text-xs text-faint">{item.level}</span>
        {available ? (
          <a href={item.file!} className={buttonClass("secondary", "sm")} download>
            Download
          </a>
        ) : (
          <span
            className={cn(buttonClass("secondary", "sm"), "cursor-not-allowed opacity-55")}
            aria-disabled="true"
            title="This resource has not been published yet"
          >
            Coming soon
          </span>
        )}
      </div>
    </Card>
  );
}

/* --------------------------------------------------------------- service - */

export function ServiceCard({ item }: { item: Service }) {
  return (
    <Card interactive className="group relative flex flex-col p-6">
      <h3 className="text-xl font-bold">
        <Link href={`/services#${item.slug}`} className="after:absolute after:inset-0">
          {item.title}
        </Link>
      </h3>
      <p className="mt-2 flex-1 text-sm text-muted">{item.summary}</p>
      <p className="mt-4 text-sm font-semibold text-accent">
        Request consultation <span aria-hidden="true">→</span>
      </p>
    </Card>
  );
}

/* ----------------------------------------------------------- testimonial - */

export function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center gap-1" aria-label={`Rated ${item.rating} out of 5`}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            aria-hidden="true"
            className={i < item.rating ? "text-accent" : "text-faint opacity-40"}
          >
            ★
          </span>
        ))}
      </div>
      <blockquote className="mt-4 flex-1 text-muted">“{item.quote}”</blockquote>
      <footer className="mt-5 border-t border-line pt-4">
        <p className="text-sm font-semibold">{item.name}</p>
        <p className="text-xs text-faint">
          {item.role}
          {item.affiliation ? ` · ${item.affiliation}` : ""}
        </p>
        <p className="mt-1 text-xs text-accent">{item.programme}</p>
        {item.placeholder ? <PlaceholderTag className="mt-3" /> : null}
      </footer>
    </Card>
  );
}

/* ------------------------------------------------------------------ blog - */

export function BlogCard({ item }: { item: BlogPost }) {
  return (
    <Card interactive className="group relative flex flex-col overflow-hidden">
      {item.image ? (
        <div className="relative aspect-[16/9] overflow-hidden bg-subtle">
          <SafeImage
            src={item.image}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          {item.domains.slice(0, 2).map((d) => (
            <Badge key={d} tone="accent">
              {d}
            </Badge>
          ))}
          {item.placeholder ? <PlaceholderTag /> : null}
        </div>
        <h3 className="mt-3 text-lg font-bold">
          <Link href={`/blog/${item.slug}`} className="after:absolute after:inset-0">
            {item.title}
          </Link>
        </h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted">{item.excerpt}</p>
        <p className="mt-4 text-xs text-faint tabular">
          <time dateTime={item.publishedAt}>{formatDate(item.publishedAt)}</time>
          {" · "}
          {readingTime(item.readingMinutes)}
        </p>
      </div>
    </Card>
  );
}
