import type { MentorshipPlan, Service } from "./types";

/** Engineering services. `icon` keys into the Icon component's registry. */
export const services: Service[] = [
  {
    slug: "antenna-design",
    title: "Antenna Design",
    summary:
      "Antenna design from specification to verified result — geometry, simulation, optimisation and a report you can hand to a reviewer.",
    bullets: [
      "Antenna design against a written specification",
      "Full-wave EM simulation",
      "Parametric study and optimisation",
      "Parameter analysis — gain, bandwidth, efficiency, pattern",
      "Performance evaluation against the original spec",
    ],
    domains: ["Antenna", "RF"],
    icon: "antenna",
  },
  {
    slug: "rf-microwave-design",
    title: "RF & Microwave Design",
    summary:
      "RF circuit and structure design where the trade-offs are made explicit rather than tuned until they look right.",
    bullets: [
      "RF circuit design",
      "Matching network design and verification",
      "Filter design",
      "RF front-end architecture and budgeting",
      "Microwave structures",
    ],
    domains: ["RF"],
    icon: "wave",
  },
  {
    slug: "hfss-simulation",
    title: "HFSS Simulation",
    summary:
      "3D electromagnetic modelling with convergence you can defend — including an honest account of what the model does not capture.",
    bullets: [
      "3D EM modelling",
      "Simulation setup, boundaries and excitations",
      "Parametric analysis",
      "Optimisation",
      "Result interpretation and sanity checking",
    ],
    domains: ["Simulation", "Antenna", "RF"],
    icon: "cube",
  },
  {
    slug: "pcb-rf-pcb",
    title: "PCB / RF PCB",
    summary:
      "Board design where the stack-up, the return path and the impedance are decided deliberately and documented.",
    bullets: [
      "RF PCB design",
      "Controlled impedance",
      "Stack-up guidance",
      "EMI/EMC-oriented layout",
      "Design review of an existing board",
    ],
    domains: ["PCB", "EMI/EMC"],
    icon: "board",
  },
  {
    slug: "technical-training",
    title: "Technical Training",
    summary:
      "Training built around your team's actual work rather than a generic syllabus, delivered live.",
    bullets: [
      "Corporate training",
      "Student and campus training",
      "Customised workshops",
      "Engineering team upskilling",
      "Material and exercises included",
    ],
    domains: ["RF", "Antenna", "PCB", "Electronics"],
    icon: "people",
  },
  {
    slug: "mentorship",
    title: "Mentorship",
    summary:
      "Sustained technical guidance for a project, a thesis or a career step — not a one-off call.",
    bullets: [
      "Project guidance",
      "Research guidance",
      "RF and antenna mentorship",
      "Career-oriented technical guidance",
      "Review of your work with written feedback",
    ],
    domains: ["RF", "Antenna", "Electronics"],
    icon: "compass",
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/* ------------------------------------------------------------- mentorship - */

export const mentorshipDomains = [
  "RF & Microwave",
  "Antenna Design",
  "HFSS",
  "ADS",
  "RFIC/MMIC",
  "Semiconductor",
  "PCB / EMI-EMC",
  "Engineering Projects",
  "Research Guidance",
  "Career & Technical Development",
];

export const mentorshipPlans: MentorshipPlan[] = [
  {
    placeholder: true,
    slug: "one-to-one",
    title: "1-to-1 Mentorship",
    summary:
      "Regular sessions on whatever you are actually stuck on, with work reviewed between them.",
    forWho:
      "Students and working engineers who want sustained guidance rather than a single consultation.",
    durationLabel: "3 months",
    sessions: "8 sessions · 60 minutes each",
    includes: [
      "Fortnightly one-to-one sessions",
      "Written review of your work between sessions",
      "A learning plan set in the first session and revisited",
      "Async questions answered between sessions",
    ],
    priceInr: null,
  },
  {
    placeholder: true,
    slug: "project",
    title: "Project Mentorship",
    summary:
      "Guidance through one project end to end — specification, design, simulation, build and verification.",
    forWho: "Final-year, postgraduate or professional projects with a deliverable and a deadline.",
    durationLabel: "Length of the project",
    sessions: "Weekly · 45 minutes",
    includes: [
      "Scoping the project so it is actually finishable",
      "Weekly checkpoints against a plan",
      "Design and simulation review",
      "Help interpreting and defending results",
      "Report and presentation review",
    ],
    priceInr: null,
    featured: true,
  },
  {
    placeholder: true,
    slug: "research",
    title: "Research Mentorship",
    summary:
      "For a thesis or a paper — framing the question, designing the study, and writing it up so it survives review.",
    forWho: "Postgraduate and doctoral researchers in RF, antennas or applied electromagnetics.",
    durationLabel: "6 months",
    sessions: "12 sessions · 60 minutes each",
    includes: [
      "Literature positioning",
      "Methodology review",
      "Simulation and measurement design",
      "Draft review",
      "Guidance on responding to reviewers",
    ],
    priceInr: null,
  },
  {
    placeholder: true,
    slug: "industry-skill",
    title: "Industry Skill Mentorship",
    summary:
      "Closing the gap between what you were taught and what the job assumes you already know.",
    forWho: "Engineers moving into an RF, antenna or hardware role.",
    durationLabel: "2 months",
    sessions: "6 sessions · 60 minutes each",
    includes: [
      "Skills audit against a target role",
      "Tool fluency — HFSS, ADS, lab instruments",
      "Portfolio and project guidance",
      "Interview-oriented technical preparation",
    ],
    priceInr: null,
  },
];

export const getMentorshipPlan = (slug: string) =>
  mentorshipPlans.find((p) => p.slug === slug);
