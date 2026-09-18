import type { Metadata } from "next";
import { publishedTestimonials } from "@/content/misc";
import { Container, Section, SectionHead, Card } from "@/components/ui/primitives";
import { TestimonialCard } from "@/components/cards";
import { FeedbackForm } from "@/components/forms/FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback",
  description:
    "Reviews from students and professionals, and a form to submit your own feedback on a course or workshop.",
  alternates: { canonical: "/feedback" },
};

export default function FeedbackPage() {
  const average =
    publishedTestimonials.length
      ? publishedTestimonials.reduce((sum, t) => sum + t.rating, 0) /
        publishedTestimonials.length
      : 0;

  return (
    <>
      <Section className="pb-0">
        <Container wide>
          <SectionHead
            eyebrow="Feedback"
            title="What participants say"
            lead="Every review here was submitted through the form below and approved before publication. Nothing is written on anyone's behalf."
          />

          {publishedTestimonials.length ? (
            <div className="mt-8 flex flex-wrap items-center gap-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold tabular">{average.toFixed(1)}</span>
                <span className="text-muted">/ 5</span>
              </div>
              <p className="text-sm text-faint tabular">
                from {publishedTestimonials.length} published{" "}
                {publishedTestimonials.length === 1 ? "review" : "reviews"}
              </p>
            </div>
          ) : null}
        </Container>
      </Section>

      <Section>
        <Container wide>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {publishedTestimonials.map((t) => (
              <TestimonialCard key={t.id} item={t} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container>
          <SectionHead
            eyebrow="Submit"
            title="Share your feedback"
            lead="Honest feedback is more useful than kind feedback. Say what did not work."
          />

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
            <FeedbackForm />
            <Card className="h-fit p-6">
              <h2 className="font-bold">How this is handled</h2>
              <ul className="mt-4 space-y-3 text-sm text-muted">
                {[
                  "Nothing is published automatically — every submission is reviewed first.",
                  "It appears publicly only if you tick the permission box.",
                  "Critical feedback is welcome and is not filtered out.",
                ].map((s) => (
                  <li key={s} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                    />
                    <span className="min-w-0">{s}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
