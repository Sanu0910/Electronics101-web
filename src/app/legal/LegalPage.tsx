import type { ReactNode } from "react";
import { Container, Section, SectionHead, Card } from "@/components/ui/primitives";

/**
 * Shared shell for the three policy pages.
 *
 * Every one of these carries a visible "needs legal review" notice. These are
 * drafted as a sensible starting point, not as advice — publishing generated
 * policy text as though a lawyer had approved it would be the single most
 * irresponsible thing on this site, since refunds and data handling create
 * real obligations.
 */
export function LegalPage({
  title,
  updated,
  intro,
  children,
}: {
  title: string;
  updated: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <Section>
      <Container>
        <SectionHead eyebrow="Legal" title={title} lead={intro} />

        <Card className="mt-8 border-warn-400/40 bg-warn-400/5 p-5">
          <p className="text-sm font-semibold text-warn-400">
            Draft — needs review before launch
          </p>
          <p className="mt-2 text-sm text-muted">
            This is a starting point written to a common shape, not legal advice.
            Have it reviewed against your jurisdiction and your actual practices
            before the site goes live, particularly anything involving payments or
            personal data.
          </p>
        </Card>

        <p className="mt-8 text-sm text-faint">Last updated: {updated}</p>

        <div className="mt-8 space-y-8">{children}</div>
      </Container>
    </Section>
  );
}

export function Clause({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold">{heading}</h2>
      <div className="mt-3 space-y-3 text-muted">{children}</div>
    </section>
  );
}
