import type { Metadata } from "next";
import { resources } from "@/content/resources";
import { Container, Section, SectionHead } from "@/components/ui/primitives";
import { ResourceCard } from "@/components/cards";
import { Filterable } from "@/components/ui/Filters";

export const metadata: Metadata = {
  title: "Study Material",
  description:
    "Notes, formula sheets, cheat sheets, design guides and tutorials for RF, antennas, HFSS, ADS, PCB, EMI/EMC, semiconductors and embedded hardware.",
  alternates: { canonical: "/study-material" },
};

const KINDS = [
  "Notes",
  "Tutorial",
  "Formula Sheet",
  "Cheat Sheet",
  "Design Guide",
  "Project Resource",
  "Code",
] as const;
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
const ACCESS = ["Free", "Members"] as const;

export default function StudyMaterialPage() {
  return (
    <Section>
      <Container wide>
        <SectionHead
          eyebrow="Study Material"
          title="Reference you will still use after the course ends"
          lead="Formula sheets, notes and design guides, searchable and filterable. Free resources need no account; members-only ones come with a programme."
        />

        <div className="mt-12">
          <Filterable
            groups={[
              { id: "kind", label: "Type", options: KINDS },
              { id: "domain", label: "Domain", options: DOMAINS },
              { id: "access", label: "Access", options: ACCESS },
            ]}
            entries={resources.map((r) => ({
              id: r.slug,
              search: [r.title, r.description, r.kind, ...r.domains].join(" "),
              facets: { kind: [r.kind], domain: r.domains, access: [r.access] },
              node: <ResourceCard item={r} />,
            }))}
            placeholder="Search notes, guides, sheets…"
            emptyTitle="No resources match those filters"
            emptyBody="Try a broader domain, or clear the filters to see everything."
          />
        </div>
      </Container>
    </Section>
  );
}
