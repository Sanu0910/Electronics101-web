/**
 * RF & antenna careers.
 *
 * SALARY FIGURES ARE ATTRIBUTED, NEVER ASSERTED. Pay data is self-reported or
 * modelled wherever it comes from, so every number on this page names its
 * source and the page says so in as many words. A figure a reader cannot
 * trace is worth less than no figure at all — and this audience checks.
 *
 * OPENINGS CARRY A DATE. A job board on a static site goes stale silently;
 * a visible "listed on" date lets the reader judge for themselves, and makes
 * it obvious to us when the list needs a clear-out.
 */

export type SalaryBand = {
  level: string;
  experience: string;
  /** Median base, in lakhs per annum. */
  medianLpa: number;
  /** 90th percentile base, in lakhs per annum. */
  topLpa: number;
};

export type SkillGroup = {
  title: string;
  /** Why a hiring manager cares — not what the topic is. */
  why: string;
  skills: string[];
  /** The series here that covers it, so the page is a route not a list. */
  seriesSlug?: string;
};

export type JobOpening = {
  title: string;
  company: string;
  location: string;
  href: string;
  /** What the posting actually asks for, in its own terms. */
  asks: string[];
  /** ISO date this was added here. Rendered, so staleness is visible. */
  listedOn: string;
};

/* ------------------------------------------------------------------ pay - */

/**
 * Base salary for RF engineers in India, from PayScale's modelled estimates.
 * Deliberately not antenna-specific: PayScale does not break that out, and
 * narrowing it ourselves would be inventing precision.
 */
export const salaryBands: SalaryBand[] = [
  { level: "Entry", experience: "0–2 years", medianLpa: 2.4, topLpa: 4.2 },
  { level: "Early career", experience: "2–5 years", medianLpa: 4.2, topLpa: 7.8 },
  { level: "Mid career", experience: "5–10 years", medianLpa: 4.9, topLpa: 9.6 },
  { level: "Experienced", experience: "10+ years", medianLpa: 10.2, topLpa: 20.0 },
];

export const salarySource = {
  label: "PayScale — RF Engineer, India",
  href: "https://www.payscale.com/research/IN/Job=Radio_Frequency_(RF)_Engineer/Salary",
};

/**
 * The top of the market, kept apart from the bands above because it comes from
 * different sources with different methodology.
 *
 * The US figure leads because it is the strongest evidence available: a posted
 * base range, for this exact job title, rather than an aggregate across every
 * engineer at a company. The India figures are role-adjacent, not antenna-
 * specific, and the page says so.
 */
export const topOfMarket = {
  headline: {
    role: "Principal Antenna / RF Engineer",
    employer: "Honeywell Aerospace",
    region: "United States",
    rangeUsd: "$166,000 – $207,000",
    note: "Posted base range, excluding bonus and stock.",
    sourceLabel: "LinkedIn job listing",
    sourceHref:
      "https://www.linkedin.com/jobs/view/principal-antenna-rf-engineer-at-honeywell-aerospace-4441622897",
  },
  /** Reported India bands at the same employer. Not antenna-specific. */
  india: [
    { label: "Engineer — highest reported", lpa: "₹69.1L", source: "6figr" },
    { label: "Advanced Engineer — highest reported", lpa: "₹42.3L", source: "6figr" },
    { label: "Advanced Engineer — top 10%", lpa: "₹33.1L+", source: "6figr" },
    { label: "Senior / specialised bands", lpa: "₹30.7–39.4L", source: "AmbitionBox" },
  ],
  indiaSources: [
    { label: "6figr — Honeywell", href: "https://6figr.com/in/salary/honeywell--engineer" },
    {
      label: "AmbitionBox — Honeywell Aerospace, Bengaluru",
      href: "https://www.ambitionbox.com/salaries/honeywell-aerospace-salaries/bengaluru-location",
    },
  ],
};

/* --------------------------------------------------------------- skills - */

export const skillGroups: SkillGroup[] = [
  {
    title: "Electromagnetic fundamentals",
    why: "Every interview starts here, and this is where most candidates are filtered out. You are expected to reason from the physics, not recall a formula.",
    skills: [
      "Impedance, reflection coefficient, VSWR and return loss",
      "Transmission lines and electrical length",
      "The Smith chart, used rather than recited",
      "S-parameters and what a VNA is really measuring",
      "Polarisation, near field vs far field",
    ],
    seriesSlug: "rf-101",
  },
  {
    title: "Antenna design",
    why: "The core craft. Employers want someone who can take a specification to a verified design, not someone who has read about patch antennas.",
    skills: [
      "Dipole, monopole, patch, horn and conformal geometries",
      "Gain, directivity, efficiency, bandwidth and beamwidth",
      "Feeding techniques and matching networks",
      "Radiation pattern interpretation and sidelobe control",
      "Element-level and array-level design",
    ],
    seriesSlug: "antenna-101",
  },
  {
    title: "EM simulation — the real differentiator",
    why: "This is what the job adverts actually list. Knowing which solver suits which problem separates an engineer from a tool operator.",
    skills: [
      "Ansys HFSS, CST or FEKO to a professional standard",
      "Boundaries, ports and excitations chosen deliberately",
      "Meshing and convergence you can defend",
      "FEM, MoM, FDTD and SBR+ — and when each one applies",
      "Parametric sweeps and optimisation that converge",
    ],
    seriesSlug: "hfss-101",
  },
  {
    title: "Phased arrays & modern systems",
    why: "Where the best-paid work is: radar, SATCOM, defence and 5G/6G. Array thinking is assumed at senior level and rarely taught at university.",
    skills: [
      "Array factor, linear and planar",
      "Beam steering and grating lobes",
      "Mutual coupling and active S-parameters",
      "Unit cells, Floquet ports and infinite-array modelling",
      "T/R modules and RF front-ends",
    ],
    seriesSlug: "antenna-101",
  },
  {
    title: "RF circuits & front-ends",
    why: "An antenna never ships alone. Being able to reason about the chain it feeds is what gets you trusted with system-level decisions.",
    skills: [
      "LNA, PA, mixer and filter design",
      "Noise figure and cascade budgets",
      "Linearity, IP3 and stability",
      "Keysight ADS and harmonic balance",
      "X, Ku and Ka band microwave design",
    ],
    seriesSlug: "ads-101",
  },
  {
    title: "PCB & integration",
    why: "Most antenna designs fail at integration, not in simulation. Employers pay for people who have been burned by a real board and learned from it.",
    skills: [
      "Controlled impedance and stack-up choices",
      "Return paths and grounding",
      "RF PCB layout and via design",
      "EMI/EMC-aware design",
      "Talking to a fabricator in their terms",
    ],
    seriesSlug: "pcb-101",
  },
  {
    title: "Automation & data",
    why: "The fastest-growing line item on RF job descriptions. One engineer who can automate a sweep replaces a week of manual solving.",
    skills: [
      "Python and MATLAB for engineering work",
      "PyAEDT for driving HFSS programmatically",
      "scikit-rf and Touchstone files",
      "Optimisation loops and surrogate models",
      "Scripted post-processing of simulation data",
    ],
    seriesSlug: "ai-electronics",
  },
  {
    title: "Measurement & validation",
    why: "The one thing a simulation-only candidate cannot fake. Correlating a model against a measurement is the skill senior roles are built on.",
    skills: [
      "VNA operation, calibration and de-embedding",
      "Anechoic chamber pattern measurement",
      "Correlating simulated against measured results",
      "Explaining a discrepancy instead of hiding it",
      "Field testing and system bring-up",
    ],
    seriesSlug: "hfss-101",
  },
];

/* -------------------------------------------------------------- openings - */

export const openings: JobOpening[] = [
  {
    title: "Sr. Antenna Design Engineer",
    company: "GalaxEye Space",
    location: "Bengaluru, India",
    href: "https://galaxeye-pranitgalaxeyespace.zohorecruit.in/jobs/Careers/214465000004673788/Sr-Antenna-Design-Engineer?source=LinkedIn-Basic&embedsource=LinkedIn%2BLimited%2BListings",
    asks: [
      "Antenna design for a satellite SAR payload",
      "Full-wave EM simulation and verification",
      "Element and array-level work",
    ],
    listedOn: "2026-10-08",
  },
  {
    title: "RF System Design Engineer",
    company: "LAT Aerospace",
    location: "Bengaluru, India",
    href: "https://jobs.ashbyhq.com/lat/eddb79af-2f4c-4250-a0ef-a5f496118c1e/application?utm_source=elOjb9zgGk",
    asks: [
      "Own the RF system from architecture to field testing",
      "T/R modules, RF front-ends, antennas at element and array level",
      "Sidelobe control and pattern measurement",
      "X, Ku or Ka band — radar or defence background, not telecom-only",
    ],
    listedOn: "2026-10-08",
  },
];
