import Link from "next/link";
import { ButtonLink, Container, Section } from "@/components/ui/primitives";
import { mainNav } from "@/config/site";

export default function NotFound() {
  return (
    <Section>
      <Container>
        <p className="font-mono text-sm font-semibold text-accent">404</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
          That page does not exist
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          The link may be out of date, or the page may have moved. Here is everything
          that does exist.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Report a Broken Link
          </ButtonLink>
        </div>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {mainNav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="flex h-full flex-col rounded-xl border border-line bg-elevated p-4 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-accent"
              >
                <span className="font-semibold">{item.label}</span>
                {item.blurb ? (
                  <span className="mt-1 text-sm text-faint">{item.blurb}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
