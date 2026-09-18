import type { Workshop } from "./types";

/**
 * Live workshops.
 *
 * DATES ARE ISO WITH AN OFFSET and are always rendered through
 * Intl.DateTimeFormat — never a hardcoded "12 Oct 2026" string, which would
 * be wrong for half the audience and unreadable for the rest.
 *
 * The first entry is the real programme brief. Everything with
 * `placeholder: true` is illustrative structure so the page, filters and
 * countdown have something to work against; the UI labels them.
 */
export const workshops: Workshop[] = [
  {
    slug: "rf-microwave-antenna-design",
    title: "RF & Microwave Antenna Design",
    /** The line the poster leads with. */
    subtitle: "From Fundamentals to HFSS Simulation",
    summary:
      "Two days, live and online, from 50 Ω fundamentals to a microstrip patch you have modelled, simulated and verified yourself.",
    description:
      "A working engineer's introduction to antenna design. Day one builds the RF groundwork — frequency and wavelength, impedance and VSWR, 50 Ω transmission lines and what S-parameters actually mean in practice. Day two is hands-on HFSS: geometry, boundaries, mesh and excitation, then reading S11, VSWR, gain and the radiation pattern off your own model. Throughout, the emphasis is the practical workflow from specification to final result — and the simulation mistakes that quietly produce confident wrong answers.",
    /* Two evening sessions, 7–9 pm IST on consecutive days. */
    startsAt: "2026-12-05T19:00:00+05:30",
    endsAt: "2026-12-06T21:00:00+05:30",
    applyBy: "2026-10-15T23:59:00+05:30",
    durationLabel: "2 days · 7–9 pm IST each evening",
    liveOnly: true,
    mode: "Live Online",
    level: "Intermediate",
    domains: ["RF", "Antenna", "Simulation"],
    /** Straight off the workshop poster — eight modules, each with its scope. */
    modules: [
      { title: "RF & Microwave Fundamentals", detail: "Frequency, wavelength, impedance, VSWR" },
      { title: "50 Ω Transmission Lines", detail: "S-parameters and their practical meaning" },
      { title: "Antenna Parameters", detail: "Gain, directivity, efficiency, bandwidth" },
      { title: "Microstrip Patch Antenna Design", detail: "Design concepts, dimensions, feed" },
      { title: "HFSS Modelling Workflow", detail: "Geometry, boundary, mesh, excitation" },
      { title: "Simulation & Analysis", detail: "S11, VSWR, radiation pattern, gain" },
      { title: "Practical Design Workflow", detail: "From specification to final results" },
      { title: "Common Simulation Mistakes", detail: "And how to avoid them" },
    ],
    topics: [
      "RF & Microwave Fundamentals",
      "50 Ω Transmission Lines",
      "Antenna Parameters",
      "Microstrip Patch Antenna Design",
      "HFSS Modelling Workflow",
      "Simulation & Analysis",
      "Practical Design Workflow",
      "Common Simulation Mistakes",
    ],
    includes: [
      "Two live evening sessions, 7–9 pm IST, with a Q&A throughout",
      "Study material as PDF",
      "Certificate of participation",
      "A worked antenna design example and an HFSS demo",
      "The material and model files are shared with you afterwards",
    ],
    tiers: [
      {
        id: "student",
        label: "Student",
        forWho: "Currently enrolled students — carry your institute ID to the session.",
        priceInr: 299,
        standardPriceInr: 499,
        href: "https://rzp.io/rzp/M61v0Gt",
        note: "Early bird",
      },
      {
        id: "industry",
        label: "Industry / Professional",
        forWho: "Working engineers and company-sponsored participants.",
        priceInr: 699,
        standardPriceInr: 1199,
        href: "https://rzp.io/rzp/TFMTYhq7",
        note: "Early bird",
      },
    ],
    seats: 40,
    seatsLeft: 40,
    /** The headline figure on cards is the lowest seat price. */
    priceInr: 299,
    status: "Open",
    image: "/images/workshop-rf-antenna.jpg",
  },
  {
    placeholder: true,
    slug: "smith-chart-intensive",
    title: "The Smith Chart, Properly",
    summary:
      "A half-day intensive on the one tool every RF engineer is assumed to have internalised.",
    description:
      "Matching networks built by hand on the chart, then checked in simulation. Placeholder entry — structure and dates are illustrative.",
    startsAt: "2026-11-08T10:00:00+05:30",
    durationLabel: "Half day · 4 hours",
    mode: "Live Online",
    level: "Beginner",
    domains: ["RF"],
    topics: [
      "Reading the chart",
      "Impedance and admittance",
      "Single-stub matching",
      "L-network design",
      "Verifying a match in simulation",
    ],
    includes: ["Live session with Q&A", "Worked problem set", "Certificate of participation"],
    seats: 60,
    seatsLeft: 60,
    priceInr: null,
    status: "Coming Soon" as Workshop["status"],
    image: "/images/series/rf-101.jpg",
  },
  {
    placeholder: true,
    slug: "pcb-signal-integrity",
    title: "PCB Signal Integrity for Fast Edges",
    summary:
      "Return paths, stack-ups and controlled impedance — with the measurements that show why they matter.",
    description:
      "Placeholder entry. Structure and dates are illustrative until scheduled.",
    startsAt: "2026-11-22T10:00:00+05:30",
    durationLabel: "1 day · 6 hours",
    mode: "Live Online",
    level: "Advanced",
    domains: ["PCB", "EMI/EMC"],
    topics: [
      "Where return current actually flows",
      "Stack-up choices",
      "Controlled impedance in practice",
      "Crosstalk and gaps in the plane",
      "Debugging a failed scan",
    ],
    includes: ["Live session with Q&A", "Design checklist", "Certificate of participation"],
    priceInr: null,
    status: "Coming Soon" as Workshop["status"],
    image: "/images/series/pcb-101.jpg",
  },
];

export const getWorkshop = (slug: string) => workshops.find((w) => w.slug === slug);

/** Soonest first, past events dropped. */
export const upcomingWorkshops = (now = new Date()) =>
  workshops
    .filter((w) => new Date(w.startsAt).getTime() > now.getTime())
    .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
