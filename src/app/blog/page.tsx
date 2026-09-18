import type { Metadata } from "next";
import { blogPosts } from "@/content/misc";
import { Container, Section, SectionHead } from "@/components/ui/primitives";
import { BlogCard } from "@/components/cards";
import { Filterable } from "@/components/ui/Filters";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Technical articles on electronics, RF, antennas, microwave, semiconductors, PCB, EMI/EMC, embedded and AI.",
  alternates: { canonical: "/blog" },
};

const DOMAINS = [
  "Electronics",
  "RF",
  "Antenna",
  "PCB",
  "EMI/EMC",
  "Semiconductor",
  "Embedded",
  "Simulation",
  "AI",
] as const;

export default function BlogIndexPage() {
  const sorted = [...blogPosts].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return (
    <Section>
      <Container wide>
        <SectionHead
          eyebrow="Blog"
          title="Technical articles"
          lead="Short pieces on the things that are usually explained wrong."
        />

        <div className="mt-12">
          <Filterable
            groups={[{ id: "domain", label: "Domain", options: DOMAINS }]}
            entries={sorted.map((p) => ({
              id: p.slug,
              search: [p.title, p.excerpt, ...p.tags, ...p.domains].join(" "),
              facets: { domain: p.domains },
              node: <BlogCard item={p} />,
            }))}
            placeholder="Search articles…"
            emptyTitle="No articles match"
            emptyBody="Try a different domain or clear the filters."
          />
        </div>
      </Container>
    </Section>
  );
}
