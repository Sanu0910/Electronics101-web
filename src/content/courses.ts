import type { Course } from "./types";

/**
 * Courses.
 *
 * `priceInr: null` renders as "Pricing to be announced" rather than a number
 * nobody has decided. Every entry here is marked `placeholder` until its
 * curriculum has been signed off — the card and the detail page both say so,
 * because a prospective student who enrols against invented module names and
 * finds something different has been misled.
 */
export const courses: Course[] = [
  {
    placeholder: true,
    slug: "rf-microwave-engineering",
    title: "RF & Microwave Engineering",
    summary:
      "The full RF groundwork: transmission lines, the Smith chart, S-parameters and front-end architecture, each derived rather than quoted.",
    description:
      "A structured path through practical RF engineering. You start with why a wire stops behaving like a wire, build to reading and trusting S-parameters, and finish able to reason about a receiver front end as a system rather than a block diagram.",
    level: "Intermediate",
    domains: ["RF"],
    duration: "8 weeks",
    moduleCount: 8,
    mode: "Live + Recorded",
    certificate: true,
    tools: ["Keysight ADS", "MATLAB", "Python"],
    priceInr: null,
    status: "Coming Soon",
    outcomes: [
      "Read a Smith chart without translating it back to algebra first",
      "Design and verify a matching network",
      "Interpret S-parameters, VSWR and return loss from real measurements",
      "Reason about noise figure and gain through a cascade",
      "Explain the architecture of an RF front end and the trade-offs in it",
    ],
    prerequisites: [
      "Basic circuit analysis — Ohm's law, Kirchhoff, phasors",
      "Comfort with complex numbers",
    ],
    softwareRequirements: [
      "Keysight ADS (student or trial licence is enough)",
      "Python 3.11+ with NumPy and Matplotlib",
    ],
    curriculum: [
      {
        title: "When a wire stops being a wire",
        duration: "1 week",
        lessons: [
          "Electrical length and why it decides everything",
          "Transmission lines from first principles",
          "Characteristic impedance",
          "Why 50 Ω, historically and practically",
        ],
      },
      {
        title: "Reflections",
        duration: "1 week",
        lessons: [
          "The reflection coefficient",
          "VSWR and return loss, and how they relate",
          "Mismatch as a mirror",
          "Time-domain reflectometry as a debugging tool",
        ],
      },
      {
        title: "The Smith chart",
        duration: "1 week",
        lessons: [
          "Where the chart comes from",
          "Impedance and admittance on one chart",
          "Single-stub matching",
          "L and Pi networks",
        ],
      },
      {
        title: "S-parameters",
        duration: "1 week",
        lessons: [
          "Why S and not Z or Y at RF",
          "Reading a two-port",
          "De-embedding and calibration",
          "What a VNA is really measuring",
        ],
      },
      {
        title: "RF amplifiers",
        duration: "1 week",
        lessons: ["Gain definitions", "Stability circles", "Noise figure", "Linearity and IP3"],
      },
      {
        title: "Filters",
        duration: "1 week",
        lessons: ["Filter responses", "Lumped and distributed", "Insertion loss", "Practical layout effects"],
      },
      {
        title: "Mixers and oscillators",
        duration: "1 week",
        lessons: ["Mixing and image", "Conversion loss", "Phase noise", "Oscillator topologies"],
      },
      {
        title: "Front-end architecture",
        duration: "1 week",
        lessons: ["Cascade analysis", "Superheterodyne vs direct conversion", "Budgeting a receiver", "Design review"],
      },
    ],
    projects: [
      "Design and simulate a matching network to a specified load",
      "Cascade budget for a receiver front end",
      "Characterise a filter from its S-parameters",
    ],
    faqs: [
      {
        q: "Do I need a VNA or lab access?",
        a: "No. Measurements are provided as data files, and everything else is simulated. If you do have lab access, the projects are written so you can run them on real hardware.",
      },
      {
        q: "Is ADS mandatory?",
        a: "The worked examples use ADS, but the concepts transfer. Where a free alternative exists it is noted in the module.",
      },
      {
        q: "Will this be recorded?",
        a: "Yes. Live sessions are recorded and available to enrolled participants afterwards.",
      },
    ],
    image: "/images/series/rf-101.jpg",
  },
  {
    placeholder: true,
    slug: "antenna-design-hfss",
    title: "Antenna Design with HFSS",
    summary:
      "Model, simulate and verify real antennas — and learn to tell a converged result from a pretty one.",
    description:
      "Hands-on antenna engineering built around Ansys HFSS. The emphasis is on verification: every simulated result is checked against theory or measurement, because the failure mode in EM simulation is a confident wrong answer.",
    level: "Intermediate",
    domains: ["Antenna", "Simulation", "RF"],
    duration: "6 weeks",
    moduleCount: 6,
    mode: "Live + Recorded",
    certificate: true,
    tools: ["Ansys HFSS", "MATLAB"],
    priceInr: null,
    status: "Coming Soon",
    outcomes: [
      "Build a correct HFSS model from a physical specification",
      "Choose boundaries and excitations deliberately rather than by habit",
      "Judge mesh convergence",
      "Read S11, VSWR, gain, efficiency and radiation patterns critically",
      "Run a parametric sweep and an optimisation that converge",
    ],
    prerequisites: ["Antenna fundamentals", "Basic RF concepts — impedance, VSWR"],
    softwareRequirements: ["Ansys HFSS (student licence is sufficient for the coursework)"],
    curriculum: [
      {
        title: "HFSS, properly set up",
        duration: "1 week",
        lessons: ["Interface and project structure", "Units and coordinate systems", "Materials", "Common setup mistakes"],
      },
      {
        title: "Boundaries and excitations",
        duration: "1 week",
        lessons: ["Radiation vs PML", "Lumped vs wave ports", "De-embedding", "What each boundary physically means"],
      },
      {
        title: "Mesh and convergence",
        duration: "1 week",
        lessons: ["Adaptive meshing", "Delta-S", "When to refine by hand", "Reading a convergence plot honestly"],
      },
      {
        title: "The microstrip patch",
        duration: "1 week",
        lessons: ["Design equations", "Feed methods", "Modelling it", "Comparing against theory"],
      },
      {
        title: "Results that mean something",
        duration: "1 week",
        lessons: ["S11 and bandwidth", "Gain and directivity", "Radiation patterns", "Current distribution"],
      },
      {
        title: "Parametrics and optimisation",
        duration: "1 week",
        lessons: ["Sweeping geometry", "Setting up an optimisation", "Cost functions", "Debugging failed solves"],
      },
    ],
    projects: [
      "Design a patch antenna to a target frequency and bandwidth, then verify it",
      "Parametric study of substrate height against bandwidth",
    ],
    faqs: [
      {
        q: "Which HFSS version?",
        a: "Recent versions are all fine. Where the interface differs materially between versions, it is called out.",
      },
      {
        q: "Do I need a powerful machine?",
        a: "The coursework models are sized to solve on a normal laptop. Larger structures are supplied as pre-solved projects.",
      },
    ],
    image: "/images/series/hfss-101.jpg",
  },
  {
    placeholder: true,
    slug: "pcb-design-signal-integrity",
    title: "PCB Design & Signal Integrity",
    summary:
      "Stack-ups, return paths and controlled impedance, with the measurements that settle the arguments.",
    description:
      "Practical board design for fast edges and RF. Rules of thumb are tested against published measurements rather than repeated, and the conditions that make each one true are kept.",
    level: "Intermediate",
    domains: ["PCB", "EMI/EMC", "Electronics"],
    duration: "6 weeks",
    moduleCount: 6,
    mode: "Live + Recorded",
    certificate: true,
    tools: ["KiCad", "Altium", "Field solver"],
    priceInr: null,
    status: "Coming Soon",
    outcomes: [
      "Choose a stack-up for a given signal speed and layer count",
      "Design controlled-impedance traces and check them",
      "Route return paths deliberately",
      "Decouple a power rail with numbers behind the choice",
      "Anticipate EMI problems at layout time rather than at the test house",
    ],
    prerequisites: ["Basic electronics", "Some exposure to a PCB tool"],
    softwareRequirements: ["KiCad 8+ (free) or Altium"],
    curriculum: [
      {
        title: "What a PCB actually is",
        duration: "1 week",
        lessons: ["Copper weights and geometry", "Sheet resistance", "Current capacity", "Net classes"],
      },
      {
        title: "Stack-up",
        duration: "1 week",
        lessons: ["Two, four and six layers", "Where the planes go", "Dielectrics", "Cost against performance"],
      },
      {
        title: "Controlled impedance",
        duration: "1 week",
        lessons: ["Microstrip and stripline", "Field solvers", "Tolerances", "Talking to your fabricator"],
      },
      {
        title: "Return paths",
        duration: "1 week",
        lessons: ["Where current returns and why", "Gaps and splits", "Via stitching", "Crosstalk"],
      },
      {
        title: "Power integrity",
        duration: "1 week",
        lessons: ["Decoupling that works", "Loop inductance", "Plane capacitance", "Measuring rail noise"],
      },
      {
        title: "Design review",
        duration: "1 week",
        lessons: ["A review checklist", "Common failures", "DFM basics", "Preparing for EMC testing"],
      },
    ],
    projects: ["Stack-up and impedance plan for a four-layer RF board", "Decoupling study for a fast switching load"],
    faqs: [
      {
        q: "Do I need Altium?",
        a: "No. The course is tool-agnostic and worked examples are given in KiCad, which is free.",
      },
    ],
    image: "/images/series/pcb-101.jpg",
  },
];

export const getCourse = (slug: string) => courses.find((c) => c.slug === slug);
