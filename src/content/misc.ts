import type { BlogPost, Instructor, LinkGroup, Project, Testimonial } from "./types";

/* --------------------------------------------------------------- projects - */

export const projects: Project[] = [
  {
    placeholder: true,
    slug: "24ghz-patch-array",
    title: "24 GHz Microstrip Patch Array",
    domain: "Antenna",
    problem:
      "A short-range radar front end needed roughly 12 dBi of gain in a footprint under 40 mm square, on standard laminate.",
    approach:
      "A 2×2 corporate-fed patch array, designed against the transmission-line model, then solved full-wave and tuned on feed inset and element spacing.",
    tools: ["Ansys HFSS", "MATLAB", "KiCad"],
    results: [
      "Simulated gain in the region of 12 dBi",
      "Return loss better than 10 dB across the band of interest",
      "Element spacing chosen to keep grating lobes out of the visible region",
    ],
    gallery: [],
    relatedSeries: "antenna-101",
    year: 2026,
  },
  {
    placeholder: true,
    slug: "lna-matching-study",
    title: "LNA Input Matching Study",
    domain: "RF",
    problem:
      "Simultaneous noise and power match on a low-noise amplifier input, where the two optima do not coincide.",
    approach:
      "Mapped noise circles and available-gain circles on the same chart, then chose a deliberate compromise point and verified it in harmonic balance.",
    tools: ["Keysight ADS", "Python"],
    results: [
      "Noise figure penalty quantified against the pure noise match",
      "Stability verified across the full band, not only in-band",
    ],
    gallery: [],
    relatedSeries: "rf-101",
    year: 2026,
  },
  {
    placeholder: true,
    slug: "four-layer-rf-board",
    title: "Four-Layer RF Board Stack-up",
    domain: "PCB",
    problem:
      "A mixed-signal board with fast digital edges alongside an RF chain, on a four-layer budget.",
    approach:
      "Both inner layers as ground, power routed as wide traces, and a return via beside every signal via crossing a layer.",
    tools: ["KiCad", "Field solver"],
    results: [
      "Controlled-impedance traces specified to the fabricator and confirmed on the stack-up drawing",
      "No signal crossing a plane split",
    ],
    gallery: [],
    relatedSeries: "pcb-101",
    year: 2026,
  },
  {
    placeholder: true,
    slug: "em-surrogate-model",
    title: "Surrogate Model for Patch Optimisation",
    domain: "AI",
    problem:
      "A full-wave solve per design point made an optimisation loop impractically slow.",
    approach:
      "Sampled the design space, trained a surrogate on the simulated responses, optimised against the surrogate, and confirmed the winner in the full solver.",
    tools: ["Python", "scikit-learn", "Ansys HFSS"],
    results: [
      "Optimisation loop time reduced by orders of magnitude",
      "Surrogate predictions checked against full solves before being trusted",
    ],
    gallery: [],
    relatedSeries: "ai-electronics",
    year: 2026,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/* ----------------------------------------------------------- testimonials - */

/**
 * Only `published: true` renders. An admin approval step later flips this
 * flag; the submission form writes entries with it false.
 *
 * These are placeholders and are labelled as such in the UI. Inventing
 * enthusiastic student quotes is the single fastest way to lose a technical
 * audience, so they stay obviously illustrative until real ones arrive.
 */
export const testimonials: Testimonial[] = [
  {
    placeholder: true,
    id: "t1",
    name: "Sample Student",
    role: "Student",
    affiliation: "Placeholder — replace with a real submission",
    programme: "RF & Microwave Engineering",
    rating: 5,
    quote:
      "Placeholder testimonial. Real feedback collected through the form on this page will replace it, subject to approval.",
    published: true,
  },
  {
    placeholder: true,
    id: "t2",
    name: "Sample Professional",
    role: "Professional",
    affiliation: "Placeholder — replace with a real submission",
    programme: "RF & Microwave Antenna Design workshop",
    rating: 5,
    quote:
      "Placeholder testimonial. Real feedback collected through the form on this page will replace it, subject to approval.",
    published: true,
  },
  {
    placeholder: true,
    id: "t3",
    name: "Sample Student",
    role: "Student",
    affiliation: "Placeholder — replace with a real submission",
    programme: "Antenna Design with HFSS",
    rating: 4,
    quote:
      "Placeholder testimonial. Real feedback collected through the form on this page will replace it, subject to approval.",
    published: true,
  },
];

export const publishedTestimonials = testimonials.filter((t) => t.published);

/* ------------------------------------------------------------ instructors - */

export const instructors: Instructor[] = [
  {
    id: "lead",
    name: "S. Roy",
    title: "RF & Microwave Engineer",
    bio: "A master's degree in RF and microwave engineering, and three years split between industry design work and teaching it. The courses and workshops here are built around the same simulation and verification workflow used on real design jobs — which is why they spend as much time on checking a result as on producing one.",
    credentials: [
      "M.Tech — RF & Microwave Engineering",
      "3+ years industry design & simulation",
      "3+ years teaching",
      "100+ participants trained",
    ],
    expertise: ["RF & Microwave", "Antenna Design", "HFSS", "ADS", "PCB"],
    image: "/images/instructor-s-roy.jpg",
  },
];

export const getInstructor = (id?: string) =>
  id ? instructors.find((i) => i.id === id) : undefined;

/* ----------------------------------------------------------- useful links - */

export const linkGroups: LinkGroup[] = [
  {
    title: "Engineering Tools",
    description: "The software this platform teaches and uses.",
    links: [
      { label: "Ansys HFSS", href: "https://www.ansys.com/products/electronics/ansys-hfss", blurb: "3D full-wave electromagnetic field solver." },
      { label: "Keysight ADS", href: "https://www.keysight.com/find/eesof-ads", blurb: "RF, microwave and high-speed circuit design." },
      { label: "MATLAB", href: "https://www.mathworks.com/products/matlab.html", blurb: "Numerical computing and signal analysis." },
      { label: "Python", href: "https://www.python.org/", blurb: "The general-purpose language most engineering automation ends up in." },
      { label: "LTspice", href: "https://www.analog.com/en/resources/design-tools-and-calculators/ltspice-simulator.html", blurb: "Free SPICE simulator for analogue circuits." },
      { label: "KiCad", href: "https://www.kicad.org/", blurb: "Free, capable PCB design suite." },
      { label: "scikit-rf", href: "https://scikit-rf.org/", blurb: "Open-source RF and microwave engineering in Python." },
    ],
  },
  {
    title: "Learning",
    description: "Where to go deeper than any course can take you.",
    links: [
      { label: "IEEE", href: "https://www.ieee.org/", blurb: "The professional body for the field." },
      { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/", blurb: "Papers, standards and conference proceedings." },
      { label: "MIT OpenCourseWare", href: "https://ocw.mit.edu/", blurb: "Full university courses, free." },
      { label: "NPTEL", href: "https://nptel.ac.in/", blurb: "Indian engineering lecture series, free." },
      { label: "Microwaves101", href: "https://www.microwaves101.com/", blurb: "A working reference for RF engineers." },
    ],
  },
  {
    title: "Electronics",
    description: "Parts, data and the manufacturers behind them.",
    links: [
      { label: "Octopart", href: "https://octopart.com/", blurb: "Component search across distributors." },
      { label: "Digi-Key", href: "https://www.digikey.com/", blurb: "Distributor with reliable parametric search." },
      { label: "Mouser", href: "https://www.mouser.com/", blurb: "Distributor, strong on new-product data." },
      { label: "Analog Devices", href: "https://www.analog.com/", blurb: "Analogue and RF semiconductors, with unusually good application notes." },
      { label: "Qorvo", href: "https://www.qorvo.com/", blurb: "RF front-end components and reference designs." },
      { label: "Rogers Corporation", href: "https://www.rogerscorp.com/", blurb: "RF laminates and their datasheets." },
    ],
  },
  {
    title: "Career & Research",
    description: "Conferences, journals and funding.",
    links: [
      { label: "IEEE Antennas & Propagation Society", href: "https://www.ieeeaps.org/", blurb: "Society, conferences and publications." },
      { label: "IEEE Microwave Theory & Technology Society", href: "https://www.mtt.org/", blurb: "The microwave engineering community." },
      { label: "European Microwave Week", href: "https://www.eumweek.com/", blurb: "Major annual microwave conference." },
      { label: "arXiv", href: "https://arxiv.org/", blurb: "Preprints, including applied physics and electromagnetics." },
      { label: "Google Scholar", href: "https://scholar.google.com/", blurb: "Literature search and citation tracking." },
    ],
  },
];

/* ------------------------------------------------------------------ blog - */

export const blogPosts: BlogPost[] = [
  {
    placeholder: true,
    slug: "why-fifty-ohms",
    title: "Why 50 Ω, Really",
    excerpt:
      "The number is not fundamental, and the usual explanation is wrong. Here is where it actually comes from.",
    body: `Almost every RF system you will meet is built around 50 Ω, and almost every explanation of why is a little bit wrong.

## The usual answer, and its problem

You will often hear that 50 Ω is a compromise between the impedance of lowest loss and the impedance of highest power handling in coaxial cable. That is close to right, but it is worth being precise about what was being optimised and in what material.

## Where it comes from

For an air-filled coaxial line, minimum attenuation occurs near 77 Ω and maximum power handling near 30 Ω. Neither of those is 50.

Fill the line with polyethylene instead of air, and the lowest-loss impedance moves. That is the number the industry settled near, and the same ratio of conductor diameters that gives it in polyethylene would give roughly 77 Ω in air.

## What is actually fundamental

Nothing about 50 Ω. The only impedance in electromagnetics that is genuinely fundamental is the impedance of free space, about 377 Ω, and that one falls out of the permittivity and permeability of the vacuum rather than out of a manufacturing compromise.

*Placeholder article — structure and argument are real, but this post is illustrative until the series it accompanies is published.*`,
    domains: ["RF"],
    tags: ["impedance", "transmission lines", "fundamentals"],
    publishedAt: "2026-09-01T09:00:00+05:30",
    readingMinutes: 4,
    image: "/images/series/rf-101.jpg",
  },
  {
    placeholder: true,
    slug: "return-current-does-not-take-shortest-path",
    title: "Return Current Does Not Take the Shortest Path",
    excerpt:
      "Above about 100 kHz it follows the signal trace instead — and most grounding mistakes come from not believing that.",
    body: `At DC, current returns by the path of least resistance. Above roughly 100 kHz it does not: it returns by the path of least *impedance*, and since impedance is dominated by inductance at those frequencies, that means the path that encloses the smallest loop.

## Why it hugs the trace

The return path that minimises loop inductance is the one directly beneath the signal trace. So the current spreads out under the trace and follows it, even where a shorter route across the plane exists.

## What that means for your layout

A gap in the plane forces the return current around it, which enlarges the loop, which raises inductance and radiates. Two traces crossing the same gap then share a return path and couple into each other.

The practical rule: keep cross-unders short, or add a return strap.

*Placeholder article — illustrative until the PCB series is published.*`,
    domains: ["PCB", "EMI/EMC"],
    tags: ["grounding", "return path", "signal integrity"],
    publishedAt: "2026-09-08T09:00:00+05:30",
    readingMinutes: 3,
    image: "/images/series/pcb-101.jpg",
  },
  {
    placeholder: true,
    slug: "reading-a-convergence-plot",
    title: "Reading an HFSS Convergence Plot Honestly",
    excerpt:
      "A converged solve and a correct one are different things. Here is how to tell them apart.",
    body: `The most dangerous output of an electromagnetic solver is a confident wrong answer, and the usual route to one is treating convergence as correctness.

## What Delta-S actually tells you

Delta-S measures how much the S-parameters changed between successive adaptive passes. A small Delta-S says the *mesh* has stopped changing the answer. It says nothing about whether the model, the boundaries or the excitation represent the thing you meant to simulate.

## Checks worth doing every time

- Does the result change if you enlarge the radiation boundary?
- Does it change with a finer initial mesh?
- Does a simple analytical case solved the same way give the textbook answer?

*Placeholder article — illustrative until the HFSS series is published.*`,
    domains: ["Simulation", "Antenna"],
    tags: ["HFSS", "meshing", "verification"],
    publishedAt: "2026-09-15T09:00:00+05:30",
    readingMinutes: 3,
    image: "/images/series/hfss-101.jpg",
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

/** Why Electronics 101 — the home page differentiator grid. */
export const differentiators = [
  { title: "Industry-Oriented", body: "Built around what the work actually demands, not what is easiest to examine." },
  { title: "Practical Engineering", body: "Results are derived and then checked, because a number you cannot check is not a result." },
  { title: "Simulation-Based", body: "HFSS, ADS and Python used the way they are used on the job." },
  { title: "Real Problems", body: "Worked examples come from real design decisions, including the ones that went wrong." },
  { title: "Project-Oriented", body: "Every track ends in something you built and can show." },
  { title: "Technical Mentorship", body: "Sustained guidance on your own work, not a one-off call." },
  { title: "Study Resources", body: "Notes, formula sheets and design guides that stay useful after the course ends." },
  { title: "Community Learning", body: "A place to ask the question you think is too basic to ask." },
];
