import type { Metadata } from "next";
import { series } from "@/content/series";
import { Container, Section, SectionHead } from "@/components/ui/primitives";
import { SeriesCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "Series",
  description:
    "Eleven learning series covering electronics, RF and microwave, antennas, HFSS, ADS, PCB, EMI/EMC, semiconductors, RFIC/MMIC, embedded hardware and AI for electronics.",
  alternates: { canonical: "/series" },
};

export default function SeriesIndexPage() {
  const ordered = [...series].sort((a, b) => a.index - b.index);

  return (
    <Section>
      <Container wide>
        <SectionHead
          eyebrow="Programmes"
          title="Eleven series, one method"
          lead="Each series is a track you can follow end to end. They are designed to be taken in any order, but the numbering is the order in which the ideas compound."
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ordered.map((item) => (
            <SeriesCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
