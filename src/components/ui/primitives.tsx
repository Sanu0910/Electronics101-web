import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The shared primitives. Everything visual on the site is built from these,
 * so spacing, radius and focus behaviour stay consistent without each page
 * re-deciding them.
 */

/* ------------------------------------------------------------- container - */

export function Container({
  children,
  className,
  wide,
}: {
  children: ReactNode;
  className?: string;
  wide?: boolean;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full safe-x",
        wide ? "max-w-[90rem]" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* --------------------------------------------------------------- section - */

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "subtle";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        "py-20 sm:py-28",
        tone === "subtle" && "bg-subtle",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {lead ? <p className="mt-4 text-lg text-muted">{lead}</p> : null}
    </div>
  );
}

/* ---------------------------------------------------------------- button - */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold " +
  "transition-[background-color,border-color,color,transform] duration-200 " +
  "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-accent text-accent-fg hover:brightness-110",
  secondary:
    "border border-line-strong bg-elevated text-fg hover:border-accent hover:text-accent",
  ghost: "text-fg hover:bg-elevated",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

export const buttonClass = (
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) => cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: ButtonVariant; size?: ButtonSize }) {
  return <button className={buttonClass(variant, size, className)} {...props} />;
}

/**
 * Navigation is an anchor, never a button with an onClick — otherwise
 * Cmd-click, middle-click and "open in new tab" all silently break.
 */
export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  external,
  children,
  ...props
}: ComponentProps<typeof Link> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  external?: boolean;
}) {
  const cls = buttonClass(variant, size, className);
  if (external) {
    return (
      <a
        href={String(href)}
        className={cls}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...props}>
      {children}
    </Link>
  );
}

/* ----------------------------------------------------------------- badge - */

type BadgeTone = "neutral" | "accent" | "ok" | "warn" | "stop";

const badgeTones: Record<BadgeTone, string> = {
  neutral: "border-line text-faint",
  accent: "border-accent/40 bg-accent/10 text-accent",
  ok: "border-ok-400/40 bg-ok-400/10 text-ok-400",
  warn: "border-warn-400/40 bg-warn-400/10 text-warn-400",
  stop: "border-stop-400/40 bg-stop-400/10 text-stop-400",
};

export function Badge({
  children,
  tone = "neutral",
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        badgeTones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Marks illustrative content so nobody mistakes it for a commitment. */
export function PlaceholderTag({ className }: { className?: string }) {
  return (
    <Badge tone="warn" className={cn("gap-1", className)}>
      <span aria-hidden="true">●</span> Placeholder
    </Badge>
  );
}

/* ------------------------------------------------------------------ card - */

export function Card({
  children,
  className,
  interactive,
  id,
}: {
  children: ReactNode;
  className?: string;
  interactive?: boolean;
  /** Anchor target, so `/services#antenna-design` can scroll to a card. */
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-2xl border border-line bg-elevated",
        interactive &&
          "transition-[border-color,transform] duration-200 hover:-translate-y-1 hover:border-accent/50",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ----------------------------------------------------------- empty state - */

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-dashed border-line-strong px-6 py-16 text-center">
      <p className="text-lg font-semibold">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-muted">{body}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

/* ------------------------------------------------------------ prose bits - */

export function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-muted">
          <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}
