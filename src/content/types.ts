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
  /**
   * The Razorpay hosted payment link. Null or absent while the link has not
   * been created yet: the card then offers an enquiry route instead of an
   * anchor that goes nowhere, which is the same rule the social links follow.
   */
  href?: string | null;
  note?: string;
  /** Bought alongside a seat rather than instead of one, e.g. a certificate. */
  addOn?: boolean;
  /** The recommended plan. At most one per workshop, or it means nothing. */
  highlight?: boolean;
};

/** A curriculum module with its one-line scope, as printed on the poster. */
export type WorkshopModule = { title: string; detail: string };

/**
 * One day of a multi-day workshop. Richer than a WorkshopModule because a
 * day covers several distinct things rather than one, and the detail page
 * renders it as an expandable timeline.
 */
export type WorkshopDay = {
  /** Shown as the rail marker. 1-based, and the display order. */
  day: number;
  title: string;
  points: string[];
};

export type Workshop = Placeholder & {
  slug: string;
  title: string;
  /** The secondary line on the poster, e.g. "From Fundamentals to HFSS Simulation". */
  subtitle?: string;
  summary: string;
  description: string;
  /** Richer than `topics` — preferred by the detail page when present. */
  modules?: WorkshopModule[];
  /** Day-by-day breakdown. Takes precedence over `modules` when present. */
  days?: WorkshopDay[];
  /** Seat types. Empty → the page shows an enquiry CTA instead of Register. */
  tiers?: RegistrationTier[];
  /** ISO 8601 with offset. Rendered through Intl, never hardcoded. */
  startsAt: string;
  endsAt?: string;
  /** Registration closes at this instant — no seat is sold after it. */
  applyBy?: string;
  /**
   * When early-bird pricing ends, for a workshop that keeps selling seats at
   * the standard price afterwards. Kept separate from `applyBy` because
   * announcing that registration shuts on the early-bird date would turn a
   * price change into a false deadline.
   */
  earlyBirdUntil?: string;
  durationLabel: string;
  /** True when nothing is recorded — said plainly, since people ask. */
  liveOnly?: boolean;
  mode: "Live Online" | "In Person" | "Hybrid";
  level: Level;
  domains: Domain[];
  topics: string[];
  includes: string[];
  /**
   * Scope for `includes` when it does not describe every tier — the poster
   * itemises the top batch only, and letting that read as universal would
   * promise the cheapest seat things it does not buy.
   */
  includesNote?: string;
  /** Who the workshop is aimed at, rendered as chips. */
  audience?: string[];
  /** The end-to-end project pipeline, rendered as a flow. */
  projectFlow?: string[];
  /** The positioning claim — what this teaches that a tool tutorial does not. */
  pitch?: { title: string; body: string };
  /** Trademark and affiliation wording specific to this workshop. */
  disclaimer?: string;
  /** The case for the seat — what it buys, in the buyer's terms. */
  valueProps?: { title: string; body: string }[];
  /**
   * How `image` is shaped. A portrait poster sits beside the hero copy; a
   * landscape one runs full width beneath it, because dropping a wide image
   * into the portrait slot letterboxes it down to nothing.
   */
  imageOrientation?: "portrait" | "landscape";
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
  /**
   * Omitted when the instructor is presented by credentials rather than by
   * name. Renderers fall back to `title` for the heading.
   */
  name?: string;
  title: string;
  bio: string;
  expertise: string[];
  /** Short, checkable credentials — a degree, years in the work, people taught. */
  credentials?: string[];
  image?: string;
};
