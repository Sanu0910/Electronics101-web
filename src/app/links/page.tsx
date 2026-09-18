import type { Metadata } from "next";
import { linkGroups } from "@/content/misc";
import { Card, Container, Section, SectionHead } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Useful Links",
  description:
    "Curated engineering tools, learning resources, component databases and research links for electronics and RF engineers.",
  alternates: { canonical: "/links" },
};

export default function LinksPage() {
  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Useful Links"
            title="Where to go next"
            lead="Tools, references and communities worth your time. Everything here opens in a new tab."
          />
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="space-y-14">
            {linkGroups.map((group) => (
              <section key={group.title}>
                <h2 className="text-2xl font-bold">{group.title}</h2>
                <p className="mt-1 text-muted">{group.description}</p>

                <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Card interactive className="group relative h-full p-5">
                        <h3 className="flex items-center gap-2 font-bold">
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="after:absolute after:inset-0"
                          >
                            {link.label}
                          </a>
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
                        </h3>
                        <p className="mt-2 text-sm text-muted">{link.blurb}</p>
                      </Card>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
