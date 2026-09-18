import Link from "next/link";
import Image from "next/image";
import { affiliationNotice, footerNav, site, socials } from "@/config/site";
import { Container } from "@/components/ui/primitives";
import { asset } from "@/lib/paths";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-line bg-subtle">
      <Container wide className="py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2.6fr]">
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src={asset("/brand/logomark.svg")!} alt="" width={34} height={31} aria-hidden="true" />
              <span className="text-lg font-bold tracking-tight" translate="no">
                Electronics&nbsp;101
              </span>
            </Link>
            <p className="mt-4 text-sm font-medium text-accent">{site.tagline}</p>
            <p className="mt-4 max-w-sm text-sm text-muted">{site.description}</p>

            <ul className="mt-6 flex flex-wrap gap-2">
              {socials.map((s) => {
                const label = `${site.name} on ${s.label}`;
                return (
                  <li key={s.id}>
                    {s.href ? (
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid size-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-accent hover:text-accent"
                      >
                        <SocialGlyph id={s.id} />
                      </a>
                    ) : (
                      <span
                        title={`${s.label} — link coming soon`}
                        aria-label={`${s.label} — link coming soon`}
                        className="grid size-10 cursor-not-allowed place-items-center rounded-full border border-dashed border-line text-faint opacity-60"
                      >
                        <SocialGlyph id={s.id} />
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="text-sm font-semibold uppercase tracking-wider text-faint">
                  {group.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="text-sm text-muted transition-colors duration-200 hover:text-accent"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <p className="mt-14 max-w-4xl border-t border-line pt-8 text-xs leading-relaxed text-faint">
          {affiliationNotice}
        </p>
        <p className="mt-4 text-xs text-faint">
          © {year} {site.name}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}

/** Inline so the footer costs no icon-library bytes. */
function SocialGlyph({ id }: { id: string }) {
  const common = { className: "size-[18px]", "aria-hidden": true } as const;
  switch (id) {
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
          <path d="M23 12s0-3.9-.5-5.8a3 3 0 0 0-2.1-2.1C18.5 3.6 12 3.6 12 3.6s-6.5 0-8.4.5A3 3 0 0 0 1.5 6.2C1 8.1 1 12 1 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 8.4.5 8.4.5s6.5 0 8.4-.5a3 3 0 0 0 2.1-2.1C23 15.9 23 12 23 12ZM9.8 15.5v-7l6.1 3.5Z" />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
          <path d="M4.98 3.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5ZM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.76V21h-4v-5.6c0-1.34-.02-3.06-1.9-3.06-1.9 0-2.2 1.46-2.2 2.96V21H9Z" />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
          <path d="M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12Z" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" {...common}>
          <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.5 14.1c-.2.6-1.2 1.2-1.7 1.2-.5.1-1 .1-1.6-.1a13 13 0 0 1-5.8-5.1c-.4-.6-.9-1.5-.9-2.4s.5-1.5.7-1.7c.2-.2.4-.3.6-.3h.5c.2 0 .4 0 .6.5l.8 1.9c.1.2 0 .4-.1.5l-.4.5c-.1.1-.3.3-.1.6.4.6.9 1.2 1.5 1.7.6.5 1.1.7 1.4.8.2.1.4.1.6-.1l.7-.8c.2-.2.3-.2.5-.1l1.8.9c.2.1.4.2.4.3.1.1.1.6-.1 1.1Z" />
        </svg>
      );
  }
}
