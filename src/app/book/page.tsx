import type { Metadata } from "next";
import Image from "next/image";
import { asset } from "@/lib/paths";
import { Badge, ButtonLink, Card, Container, Section, SectionHead } from "@/components/ui/primitives";

/*
 * Electronics 101 – Signals & Systems, pre-order (user, 2026-11-25).
 *   pre-order ₹249, 100 copies, on the Razorpay Payment Page below
 *   ready version (chapters 1-13) from Sun 29 Nov; full book on 10 Dec, free for pre-order buyers
 *   regular price ₹499 after 10 Dec -- update PRICE and the copy on 10 Dec
 * Every copy is a personalised PDF (name, email, order number on every page).
 */
const PREORDER_URL = "https://rzp.io/rzp/bwbE8S2S";

export const metadata: Metadata = {
  title: "Signals & Systems book for GATE EC / EE / IN",
  description:
    "Electronics 101 – Signals & Systems: plain-language notes with step-by-step derivations and solved GATE problems. Pre-order for ₹249 (100 copies). Full book on 10 December. Free chapter 1.",
  alternates: { canonical: "/book" },
  openGraph: {
    title: "Electronics 101 – Signals & Systems · pre-order ₹249",
    description: "Plain-language Signals & Systems for GATE EC / EE / IN and ESE. Free chapter 1. Full book on 10 December.",
    images: [{ url: "/images/book/cover.jpg", width: 720, height: 1019, alt: "Signals and Systems book cover" }],
  },
};

const READY = [
  "Basics of Signals",
  "Standard Continuous Time Signals",
  "Discrete Time Signals",
  "Even and Odd Signals",
  "Periodic and Non-Periodic Signals",
  "Orthogonal and Non-Orthogonal Signals",
  "Energy, Power and NENP Signals",
  "Causal, Bounded and Integrable Signals",
  "Systems",
  "Convolution and CT LTI Systems",
  "Convolution and DT LTI Systems",
  "Properties of LTI Systems",
  "Continuous Time Fourier Series",
];
const COMING = ["CT Fourier Transform", "Sampling", "Laplace Transform", "Z-Transform", "DTFT, DFT and FFT", "Filters"];

const TIMELINE = [
  { when: "Now", what: "Pre-order for ₹249. Only 100 pre-order copies." },
  { when: "Sun 29 Nov", what: "Pre-order buyers receive the ready version: chapters 1–13, about 200 pages." },
  { when: "10 Dec", what: "Full book launch. Pre-order buyers get the complete book at no extra cost." },
  { when: "After 10 Dec", what: "Regular price ₹499." },
];

const FAQ = [
  {
    q: "What exactly do I get?",
    a: "A digital PDF, emailed to the address you give at checkout: the ready chapters from 29 November, then the complete book on 10 December. No extra payment for the full version.",
  },
  {
    q: "What is the personal watermark?",
    a: "Your name, email and order number are printed on every page of your copy. It makes the book yours, and it is why we ask you not to share it.",
  },
  {
    q: "Who is it for?",
    a: "GATE EC, EE and IN aspirants, ESE candidates, and anyone preparing Signals & Systems for ECE interviews or university exams.",
  },
  {
    q: "Can I read some of it first?",
    a: "Yes. Chapter 1 is free below: the same style, layout and level as the rest of the book.",
  },
  {
    q: "I paid but haven't received it",
    a: "Check your spam folder first. Still nothing? Write to sales@electronics101.online from the email you paid with, and include your payment id.",
  },
];

export default function BookPage() {
  return (
    <>
      <Section>
        <Container wide>
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,26rem)]">
            <div className="max-w-2xl">
              <div className="flex flex-wrap gap-2">
                <Badge tone="accent">Pre-order · only 100 copies</Badge>
                <Badge tone="warn">Full book launches 10 Dec</Badge>
              </div>
              <h1 className="mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">
                Electronics 101 – <span className="text-accent">Signals &amp; Systems</span>
              </h1>
              <p className="mt-4 text-lg text-muted">For GATE EC / EE / IN and ESE</p>
              <p className="mt-6 max-w-xl text-lg">
                I used to get my lowest marks in Signals &amp; Systems. Not because I didn&apos;t study, but because the
                standard books explained it in the most complicated way possible. So I wrote my own notes: every definition
                in plain words, every derivation step by step, every topic tied to the kind of question GATE actually asks.
                Those notes got me through the exam and through interview after interview. This book is those notes.
              </p>

              <div className="mt-8 flex flex-wrap items-end gap-x-6 gap-y-3">
                <div>
                  <p className="text-sm text-muted">Pre-order price</p>
                  <p className="text-5xl font-bold tracking-tight text-accent">₹249</p>
                </div>
                <p className="pb-2 text-muted">
                  <span className="line-through">₹499</span> regular price after 10 Dec
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <ButtonLink href={PREORDER_URL} external size="lg">
                  Pre-order for ₹249
                </ButtonLink>
                <ButtonLink href={asset("/downloads/signals-and-systems-chapter-1-free.pdf")!} external variant="secondary" size="lg">
                  Read chapter 1 free (PDF)
                </ButtonLink>
              </div>
              <p className="mt-4 text-sm text-muted">
                Digital PDF with your personal watermark · UPI, cards and net banking through Razorpay
              </p>
            </div>

            <Image
              src={asset("/images/book/cover.jpg")!}
              alt="Cover: Signals and Systems for GATE EC / EE / IN and ESE, Electronics 101"
              width={720}
              height={1019}
              priority
              className="mx-auto w-full max-w-sm rounded-2xl border border-line shadow-2xl"
            />
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container wide>
          <SectionHead eyebrow="How the pre-order works" title="Pay once, get both versions" />
          <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TIMELINE.map((t) => (
              <li key={t.when}>
                <Card className="h-full p-6">
                  <p className="font-mono text-sm font-semibold uppercase tracking-wider text-accent">{t.when}</p>
                  <p className="mt-2">{t.what}</p>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container wide>
          <SectionHead
            eyebrow="Inside the book"
            title="19 chapters, from the basics to filters"
            lead="Definitions, step-by-step derivations, worked examples and solved GATE-style questions in every chapter."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card className="p-6">
              <p className="font-semibold">Ready now · in your copy from 29 Nov</p>
              <ol className="mt-4 space-y-1.5 text-muted">
                {READY.map((c, i) => (
                  <li key={c}>
                    <span className="mr-2 font-mono text-sm text-accent">{String(i + 1).padStart(2, "0")}</span>
                    {c}
                  </li>
                ))}
              </ol>
            </Card>
            <Card className="p-6">
              <p className="font-semibold">Added in the full book · 10 Dec</p>
              <ol className="mt-4 space-y-1.5 text-muted">
                {COMING.map((c, i) => (
                  <li key={c}>
                    <span className="mr-2 font-mono text-sm text-accent">{String(READY.length + i + 1).padStart(2, "0")}</span>
                    {c}
                  </li>
                ))}
              </ol>
              <p className="mt-6 text-sm text-muted">Pre-order buyers receive the complete book on 10 December at no extra cost.</p>
            </Card>
          </div>
        </Container>
      </Section>

      <Section tone="subtle">
        <Container wide>
          <SectionHead eyebrow="Look inside" title="Pages from chapter 1" lead="The free chapter is the real thing, not a teaser." />
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              ["chapter1-p1", "Chapter 1 opening page: course outline and the definitions of a signal and a function"],
              ["chapter1-p4", "A chapter 1 page with worked sampling examples"],
              ["contents", "The full chapter list with pre-order details"],
            ].map(([file, alt]) => (
              <Image
                key={file}
                src={asset(`/images/book/${file}.jpg`)!}
                alt={alt}
                width={720}
                height={1019}
                className="w-full rounded-xl border border-line bg-white"
              />
            ))}
          </div>
          <div className="mt-8">
            <ButtonLink href={asset("/downloads/signals-and-systems-chapter-1-free.pdf")!} external variant="secondary">
              Download the free chapter (PDF, 18 pages)
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHead eyebrow="Questions" title="Before you buy" />
          <dl className="mt-10 space-y-6">
            {FAQ.map((f) => (
              <div key={f.q} className="border-b border-line pb-6">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-2 text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
          <Card className="mt-12 p-8 text-center">
            <p className="text-2xl font-bold">₹249 pre-order · only 100 copies</p>
            <p className="mt-2 text-muted">Ready chapters from Sun 29 Nov · complete book on 10 Dec · ₹499 after launch</p>
            <div className="mt-6">
              <ButtonLink href={PREORDER_URL} external size="lg">
                Pre-order now
              </ButtonLink>
            </div>
          </Card>
        </Container>
      </Section>
    </>
  );
}
