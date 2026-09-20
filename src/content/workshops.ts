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
    slug: "advanced-antenna-design-em-simulation",
    title: "Advanced Antenna Design & EM Simulation",
    /** The line the carousel leads with. */
    subtitle: "with Ansys HFSS + SBR+",
    summary:
      "Five evenings, live and hands-on, taking a research paper through to a high-fidelity EM model — unit cells, phased arrays, FI-BI hybrid analysis and SBR+.",
    description:
      "A five-evening intensive for engineers who already model antennas and now need the methods larger problems demand. It covers periodic and Master/Slave boundaries with Floquet ports for unit cells and metasurfaces, phased arrays with mutual coupling and active S-parameters, FI-BI and hybrid FEM–BI for antenna–platform interaction, and SBR+ for electrically large structures and RCS. The through-line is solver choice: not only how to drive HFSS, but which EM method fits which problem. It closes with a mini-project that carries a published paper all the way to an interpreted result.",
    /* Five 2-hour evening sessions on consecutive days, 7–9 pm IST. */
    startsAt: "2026-11-21T19:00:00+05:30",
    endsAt: "2026-11-25T21:00:00+05:30",
    /* Seats keep selling after this — only the price changes. */
    earlyBirdUntil: "2026-10-20T23:59:00+05:30",
    durationLabel: "5 sessions × 2 hrs · 7–9 pm IST",
    mode: "Live Online",
    level: "Advanced",
    domains: ["Antenna", "RF", "Simulation"],
    /** The capability chips from the cover slide. */
    topics: [
      "Phased Arrays",
      "Unit Cells",
      "FI-BI",
      "Hybrid Analysis",
      "SBR+",
      "Beam Steering",
      "Metasurfaces",
      "Advanced HFSS",
    ],
    days: [
      {
        day: 1,
        title: "Advanced HFSS & Unit-Cell Techniques",
        points: [
          "Periodic & Master/Slave boundaries",
          "Floquet ports & infinite arrays",
          "Reflection / transmission phase",
          "Metasurface & FSS unit cells",
        ],
      },
      {
        day: 2,
        title: "Phased Arrays & Beam Steering",
        points: [
          "Array factor: linear & planar",
          "Beam steering & grating lobes",
          "Mutual coupling & active S-params",
          "Finite-array simulation",
        ],
      },
      {
        day: 3,
        title: "FI-BI & Hybrid Analysis",
        points: [
          "FI-BI & hybrid FEM–BI concepts",
          "Full-wave vs hybrid: when to use",
          "Antenna–platform interaction",
          "Hybrid workflow in HFSS",
        ],
      },
      {
        day: 4,
        title: "SBR+ & High-Frequency EM",
        points: [
          "Shooting & bouncing rays",
          "RCS & electrically large platforms",
          "Antenna placement on platforms",
          "SBR+ vs FEM: picking a solver",
        ],
      },
      {
        day: 5,
        title: "Advanced Architectures + Research Workflow",
        points: [
          "Conformal & metasurface antennas",
          "CDDAM / FDDAM concepts",
          "Optimetrics & Design Explorer",
          "PyAEDT & MATLAB automation",
        ],
      },
    ],
    projectFlow: [
      "Paper",
      "Geometry",
      "HFSS Model",
      "Simulate",
      "Optimise",
      "Interpret",
    ],
    pitch: {
      title: "Not just how to use HFSS.",
      body: "Learn which EM method fits which problem: FEM, FI-BI, hybrid or SBR+.",
    },
    includes: [
      "5 live sessions (10 hours)",
      "Recorded session access",
      "HFSS + SBR+ project files",
      "Unit-cell & phased-array templates",
      "FI-BI / hybrid-analysis examples",
      "MATLAB / Python source codes",
      "Research-paper reading list",
      "Assignments + final mini-project",
      "Certificate of Completion",
      "Post-workshop Q&A + updates",
    ],
    /* The carousel itemises the Premium batch only. Saying so keeps the
       cheapest seat from appearing to buy all ten lines. */
    includesNote:
      "As itemised for the Premium (Professional / Research) batch. Every plan includes the five live sessions — check the rest against your plan before paying.",
    audience: [
      "RF & Microwave Engineers",
      "Antenna Design Engineers",
      "EM Simulation Engineers",
      "RF System Engineers",
      "Radar Engineers",
      "Defence & Aerospace",
      "Wireless / 5G / 6G",
      "PCB & High-Speed Hardware",
      "R&D Engineers & Scientists",
      "M.Tech / PhD Researchers",
      "Final-year B.Tech / M.Tech",
    ],
    tiers: [
      {
        id: "student",
        label: "Student / Researcher",
        forWho: "Students and researchers. Early-bird seats are limited.",
        priceInr: 2499,
        standardPriceInr: 2999,
        href: "https://rzp.io/rzp/XlSQZcl",
        note: "Early bird",
      },
      {
        id: "professional",
        label: "Working Professional",
        forWho: "Working engineers on the standard plan.",
        priceInr: 3999,
        href: "https://rzp.io/rzp/F92ASzv",
      },
      {
        id: "premium",
        label: "Premium",
        forWho:
          "Professional and research batch — every resource above, with the Certificate of Completion included, plus post-workshop Q&A and updates.",
        priceInr: 4999,
        href: "https://rzp.io/rzp/ZgRxDLXe",
        note: "Best value",
        highlight: true,
      },
      {
        /* No payment link of its own: it is arranged on top of a seat, and
           Premium already carries it. */
        id: "certificate",
        label: "Certificate",
        forWho:
          "Add-on to a Student or Professional seat: a Certificate of Completion carrying a unique ID. Already included with Premium.",
        priceInr: 500,
        href: null,
        addOn: true,
      },
    ],
    /** The headline figure on cards is the lowest seat price. */
    priceInr: 2499,
    status: "Open",
    image: "/images/workshop-antenna-101.webp",
    imageOrientation: "landscape",
    instructorId: "lead",
    /*
     * The case for the seat. Kept to things that are checkable — what you
     * leave with, how the batch is run, what a wrong design spin costs —
     * rather than urgency language the audience would see straight through.
     */
    valueProps: [
      {
        title: "A small batch, deliberately",
        body: "Seats are limited so questions get answered live, in the session, rather than in a queue afterwards.",
      },
      {
        title: "You keep the files",
        body: "HFSS and SBR+ projects, unit-cell and phased-array templates and the MATLAB/Python scripts stay with you — the workshop ends, the toolkit does not.",
      },
      {
        title: "Cheaper than one wrong spin",
        body: "A board respun because a converged result was mistaken for a correct one costs more than a seat. Five evenings against that is the trade.",
      },
      {
        title: "Methods, not menu clicks",
        body: "Tool tutorials age with the interface. Knowing when FEM, FI-BI, hybrid or SBR+ is the right solver does not.",
      },
    ],
    disclaimer:
      "Antenna 101 by Electronics 101 is an independent educational initiative, not affiliated with any institution, company, government body, PSU or defence organisation. Ansys, HFSS and SBR+ are trademarks of their respective owners.",
  },
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
