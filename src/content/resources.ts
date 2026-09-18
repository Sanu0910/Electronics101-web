import type { Resource } from "./types";

/**
 * Study material.
 *
 * `file: null` means the PDF does not exist yet. The card renders a disabled
 * "Coming soon" control instead of a link, because a download button that
 * 404s costs more trust than a missing one.
 */
export const resources: Resource[] = [
  {
    placeholder: true,
    slug: "rf-formula-sheet",
    title: "RF & Microwave Formula Sheet",
    description:
      "One page: transmission-line equations, reflection coefficient, VSWR and return loss conversions, cascade noise figure, and the dB identities worth memorising.",
    kind: "Formula Sheet",
    domains: ["RF"],
    level: "Beginner",
    access: "Free",
    file: null,
    relatedCourse: "rf-microwave-engineering",
  },
  {
    placeholder: true,
    slug: "smith-chart-guide",
    title: "Reading the Smith Chart",
    description:
      "Where the chart comes from, how to move on it, and worked single-stub and L-network matches with the algebra shown alongside.",
    kind: "Design Guide",
    domains: ["RF"],
    level: "Intermediate",
    access: "Free",
    file: null,
    relatedCourse: "rf-microwave-engineering",
  },
  {
    placeholder: true,
    slug: "antenna-parameters-notes",
    title: "Antenna Parameters — Notes",
    description:
      "Gain, directivity, efficiency, bandwidth, beamwidth and polarisation, each with the definition, the units and the measurement that would confirm it.",
    kind: "Notes",
    domains: ["Antenna"],
    level: "Beginner",
    access: "Free",
    file: null,
    relatedCourse: "antenna-design-hfss",
  },
  {
    placeholder: true,
    slug: "hfss-first-model",
    title: "HFSS — Your First Correct Model",
    description:
      "A step-by-step build of a microstrip patch, with the setup mistakes that silently produce plausible wrong answers called out at each step.",
    kind: "Tutorial",
    domains: ["Simulation", "Antenna"],
    level: "Intermediate",
    access: "Free",
    file: null,
    relatedCourse: "antenna-design-hfss",
  },
  {
    placeholder: true,
    slug: "ads-matching-walkthrough",
    title: "ADS — Matching Network Walkthrough",
    description:
      "Build a matching network in ADS, verify it on the Smith chart, and check the result against the hand calculation.",
    kind: "Tutorial",
    domains: ["Simulation", "RF"],
    level: "Intermediate",
    access: "Members",
    file: null,
  },
  {
    placeholder: true,
    slug: "pcb-stackup-guide",
    title: "PCB Stack-up Decision Guide",
    description:
      "Choosing two, four or six layers; where the planes go and why; and what to send your fabricator so the impedance comes back right.",
    kind: "Design Guide",
    domains: ["PCB"],
    level: "Intermediate",
    access: "Free",
    file: null,
    relatedCourse: "pcb-design-signal-integrity",
  },
  {
    placeholder: true,
    slug: "emi-debug-checklist",
    title: "EMI Debug Checklist",
    description:
      "What to check, in order, when a board fails a radiated emissions scan — starting with the cheapest fixes.",
    kind: "Cheat Sheet",
    domains: ["EMI/EMC", "PCB"],
    level: "Advanced",
    access: "Members",
    file: null,
  },
  {
    placeholder: true,
    slug: "semiconductor-notes",
    title: "Semiconductor Fundamentals — Notes",
    description:
      "PN junction, MOSFET operation and CMOS, with the band diagrams drawn rather than described.",
    kind: "Notes",
    domains: ["Semiconductor"],
    level: "Beginner",
    access: "Free",
    file: null,
  },
  {
    placeholder: true,
    slug: "python-for-rf",
    title: "Python for RF Engineers",
    description:
      "scikit-rf, touchstone files, plotting S-parameters and automating a parameter sweep. Notebook included.",
    kind: "Code",
    domains: ["AI", "RF", "Simulation"],
    level: "Intermediate",
    access: "Free",
    file: null,
  },
  {
    placeholder: true,
    slug: "matlab-antenna-toolbox",
    title: "MATLAB for Antenna Analysis",
    description:
      "Computing and plotting radiation patterns, array factors and beamwidths from first principles rather than from a toolbox call.",
    kind: "Tutorial",
    domains: ["Antenna", "Simulation"],
    level: "Intermediate",
    access: "Free",
    file: null,
  },
  {
    placeholder: true,
    slug: "embedded-bus-reference",
    title: "SPI, I²C and UART — Quick Reference",
    description:
      "Signalling, timing and the failure modes you will actually meet on a scope, side by side.",
    kind: "Cheat Sheet",
    domains: ["Embedded"],
    level: "Beginner",
    access: "Free",
    file: null,
  },
  {
    placeholder: true,
    slug: "project-starter-pack",
    title: "Antenna Project Starter Pack",
    description:
      "Templates, a measurement log, a report skeleton and a verification checklist for a first antenna project.",
    kind: "Project Resource",
    domains: ["Antenna", "RF"],
    level: "Beginner",
    access: "Members",
    file: null,
  },
];

export const getResource = (slug: string) => resources.find((r) => r.slug === slug);
