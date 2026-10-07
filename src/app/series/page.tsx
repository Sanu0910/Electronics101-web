import type { Metadata } from "next";
import { channelSeries, series } from "@/content/series";
import { Container, Section, SectionHead } from "@/components/ui/primitives";
import { SeriesCard } from "@/components/cards";

export const metadata: Metadata = {
  title: "Series",
  description:
    "Eleven learning series covering electronics, RF and microwave, antennas, HFSS, ADS, PCB, EMI/EMC, semiconductors, RFIC/MMIC, embedded hardware and AI for electronics, plus the series running on the YouTube channel with their episode lists.",
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

        <div className="mt-24">
          <SectionHead
            eyebrow="On YouTube"
            title="The series running on the channel"
            lead="Short, computed explainers: one idea per episode, every figure calculated rather than drawn. Each card opens the real episode list."
          />
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {channelSeries.map((item) => (
            <SeriesCard key={item.slug} item={item} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
