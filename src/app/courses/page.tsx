import type { Metadata } from "next";
import { courses } from "@/content/courses";
import { Container, Section, SectionHead } from "@/components/ui/primitives";
import { CourseCard } from "@/components/cards";
import { Filterable } from "@/components/ui/Filters";

export const metadata: Metadata = {
  title: "Courses",
  description:
    "Structured courses in RF and microwave engineering, antenna design with HFSS, PCB and signal integrity, and more — with curriculum, projects and certificates.",
  alternates: { canonical: "/courses" },
};

const LEVELS = ["Beginner", "Intermediate", "Advanced"] as const;
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

export default function CoursesPage() {
  return (
    <Section>
      <Container wide>
        <SectionHead
          eyebrow="Courses"
          title="Structured programmes with something to show at the end"
          lead="Longer than a workshop and deeper than a series: curriculum, projects, review and a certificate."
        />

        <div className="mt-12">
          <Filterable
            groups={[
              { id: "level", label: "Level", options: LEVELS },
              { id: "domain", label: "Domain", options: DOMAINS },
            ]}
            entries={courses.map((c) => ({
              id: c.slug,
              search: [c.title, c.summary, c.description, ...c.tools, ...c.domains].join(" "),
              facets: { level: [c.level], domain: c.domains },
              node: <CourseCard item={c} />,
            }))}
            placeholder="Search courses…"
            emptyTitle="No courses match those filters"
            emptyBody="Try a broader domain, or clear the filters to see everything."
          />
        </div>
      </Container>
    </Section>
  );
}
