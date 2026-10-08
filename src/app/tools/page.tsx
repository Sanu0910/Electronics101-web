import type { Metadata } from "next";
import { tools } from "@/content/tools";
import {
  Badge,
  Card,
  Container,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { asset } from "@/lib/paths";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free browser tools for RF design: a filter designer, an antenna design calculator, a microstrip line designer and an impedance matching and Smith chart lab.",
  alternates: { canonical: "/tools" },
};

export default function ToolsPage() {
  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Tools"
            title="Design tools that run in your browser"
            lead="Free, no account and nothing to install. The numbers are computed on your own device, and each tool opens in a new tab."
          />
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-6 lg:grid-cols-2">
            {tools.map((t) => (
              <Card
                key={t.slug}
                id={t.slug}
                interactive
                className="group relative flex flex-col p-7"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {t.domains.map((d) => (
                    <Badge key={d} tone="accent">
                      {d}
                    </Badge>
                  ))}
                  <Badge tone="ok">Free</Badge>
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  {/*
                    A plain anchor, not <Link>: the tool is a static file in
                    /public, not a route, so client-side navigation has
                    nothing to load.
                  */}
                  <a
                    href={asset(`/tools/${t.slug}/`)}
                    target="_blank"
                    rel="noopener"
                    className="after:absolute after:inset-0"
                  >
                    {t.title}
                  </a>
                </h2>
                <p className="mt-3 text-muted">{t.summary}</p>

                <ul className="mt-5 flex-1 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex gap-3 text-muted">
                      <span
                        aria-hidden="true"
                        className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                      />
                      <span className="min-w-0">{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-6 border-t border-line pt-5 text-sm font-semibold text-accent">
                  Open the tool <span aria-hidden="true">→</span>
                </p>
              </Card>
            ))}
          </div>

          <p className="mt-10 max-w-2xl text-sm text-faint">
            These tools use closed-form design equations. They are meant for
            learning and for first-cut sizing — verify a design in a full-wave
            or circuit simulator before it goes to fabrication.
          </p>
        </Container>
      </Section>
    </>
  );
}
