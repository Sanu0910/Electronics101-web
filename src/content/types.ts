/**
 * Content types for Electronics 101.
 *
 * UI never invents a field. Every page reads one of these shapes, so a CMS or
 * admin dashboard can later serve the same JSON and nothing in the component
 * tree changes — that is the §21 requirement made concrete.
 *
 * PLACEHOLDER CONTENT IS LABELLED, NOT DISGUISED. Anything not yet real
 * carries `placeholder: true`, and the UI marks it. A site that quietly shows
 * invented enrolment numbers and fake testimonials is worse than one that
 * shows fewer, honest things.
 */

export type Level = "Beginner" | "Intermediate" | "Advanced";

export type Domain =
  | "Electronics"
  | "RF"
  | "Antenna"
  | "PCB"
  | "EMI/EMC"
  | "Semiconductor"
  | "Embedded"
  | "Simulation"
  | "AI";

export type Placeholder = {
  /** True while the entry is illustrative. Surfaced in the UI, never hidden. */
  placeholder?: boolean;
};

/* ----------------------------------------------------------------- series - */

export type SeriesTopic = { title: string; done?: boolean };

export type Series = Placeholder & {
  slug: string;
  /** "Series 01" — display order is taken from this, not array position. */
  index: number;
  title: string;
  short: string;
  description: string;
  domains: Domain[];
  level: Level;
  topics: SeriesTopic[];
  /** Path under /public. Missing → the card renders its own generated motif. */
  image?: string;
  episodeCount?: number;
  relatedCourses?: string[];
};

/* ---------------------------------------------------------------- courses - */

export type CurriculumModule = {
  title: string;
  lessons: string[];
  duration?: string;
};

export type Faq = { q: string; a: string };

export type Course = Placeholder & {
  slug: string;
  title: string;
  summary: string;
  description: string;
  level: Level;
  domains: Domain[];
  /** Human string — "6 weeks", "12 hours". Not parsed. */
  duration: string;
  moduleCount: number;
  mode: "Live" | "Recorded" | "Live + Recorded";
  certificate: boolean;
  tools: string[];
  /** null → "Pricing to be announced", which is honest while it is unknown. */
  priceInr: number | null;
  status: "Open" | "Waitlist" | "Coming Soon" | "Closed";
  outcomes: string[];
  prerequisites: string[];
  softwareRequirements: string[];
  curriculum: CurriculumModule[];
  projects: string[];
  faqs: Faq[];
  image?: string;
  instructorId?: string;
};

/* -------------------------------------------------------------- workshops - */

/**
 * One purchasable seat type.
 *
 * `href` is a Razorpay HOSTED payment link. That is deliberate: the checkout,
 * the price and the card details all live on Razorpay's page, so this site
 * holds no keys, no order API and no card data. Swapping to a server-side
 * Orders integration later means changing this one field's meaning, not the
 * UI around it.
 *
 * `priceInr` stays null unless the price has actually been confirmed — the
 * authoritative figure is the one on the Razorpay page, and showing a
 * different number here would be worse than showing none.
 */
export type RegistrationTier = {
  id: string;
  label: string;
  /** Who this seat is for, in one line. */
  forWho: string;
  priceInr: number | null;
  /** What this seat costs once the early-bird deadline passes. */
  standardPriceInr?: number | null;
  href: string;
  note?: string;
};

/** A curriculum module with its one-line scope, as printed on the poster. */
export type WorkshopModule = { title: string; detail: string };

export type Workshop = Placeholder & {
  slug: string;
  title: string;
  /** The secondary line on the poster, e.g. "From Fundamentals to HFSS Simulation". */
  subtitle?: string;
  summary: string;
  description: string;
  /** Richer than `topics` — preferred by the detail page when present. */
  modules?: WorkshopModule[];
  /** Seat types. Empty → the page shows an enquiry CTA instead of Register. */
  tiers?: RegistrationTier[];
  /** ISO 8601 with offset. Rendered through Intl, never hardcoded. */
  startsAt: string;
  endsAt?: string;
  /** Registration closes at this instant. Drives the early-bird countdown. */
  applyBy?: string;
  durationLabel: string;
  /** True when nothing is recorded — said plainly, since people ask. */
  liveOnly?: boolean;
  mode: "Live Online" | "In Person" | "Hybrid";
  level: Level;
  domains: Domain[];
  topics: string[];
  includes: string[];
  seats?: number;
  seatsLeft?: number;
  priceInr: number | null;
  status: "Open" | "Filling Fast" | "Waitlist" | "Closed";
  image?: string;
  instructorId?: string;
};

/* --------------------------------------------------------------- material - */

export type ResourceKind =
  | "Notes"
  | "Tutorial"
  | "Formula Sheet"
  | "Cheat Sheet"
  | "Design Guide"
  | "Project Resource"
  | "Code";

export type Resource = Placeholder & {
  slug: string;
  title: string;
  description: string;
  kind: ResourceKind;
  domains: Domain[];
  level: Level;
  access: "Free" | "Members";
  /** null while the file does not exist — the button says so rather than 404. */
  file: string | null;
  fileSizeLabel?: string;
  relatedCourse?: string;
  updated?: string;
};

/* --------------------------------------------------------------- services - */

export type Service = Placeholder & {
  slug: string;
  title: string;
  summary: string;
  bullets: string[];
  domains: Domain[];
  icon: string;
};

/* ------------------------------------------------------------- mentorship - */

export type MentorshipPlan = Placeholder & {
  slug: string;
  title: string;
  summary: string;
  forWho: string;
  durationLabel: string;
  sessions: string;
  includes: string[];
  priceInr: number | null;
  featured?: boolean;
};

/* --------------------------------------------------------------- projects - */

export type Project = Placeholder & {
  slug: string;
  title: string;
  domain: Domain;
  problem: string;
  approach: string;
  tools: string[];
  results: string[];
  gallery: string[];
  relatedSeries?: string;
  year?: number;
};

/* ----------------------------------------------------------- testimonials - */

export type Testimonial = Placeholder & {
  id: string;
  name: string;
  role: "Student" | "Professional";
  affiliation?: string;
  programme: string;
  rating: 1 | 2 | 3 | 4 | 5;
  quote: string;
  /** Only published entries render. An admin flow later flips this. */
  published: boolean;
  videoUrl?: string;
};

/* ------------------------------------------------------------------ blog - */

export type BlogPost = Placeholder & {
  slug: string;
  title: string;
  excerpt: string;
  /** Markdown. Rendered server-side. */
  body: string;
  domains: Domain[];
  tags: string[];
  publishedAt: string;
  readingMinutes: number;
  image?: string;
  authorId?: string;
};

/* ----------------------------------------------------------- useful links - */

export type UsefulLink = {
  label: string;
  href: string;
  blurb: string;
};

export type LinkGroup = {
  title: string;
  description: string;
  links: UsefulLink[];
};

/* ------------------------------------------------------------ instructors - */

export type Instructor = Placeholder & {
  id: string;
  name: string;
  title: string;
  bio: string;
  expertise: string[];
  image?: string;
};
