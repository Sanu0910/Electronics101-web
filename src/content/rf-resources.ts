import type {
  BookRecommendation,
  LearningPath,
  LibrarySection,
  OpenSourceTool,
} from "./types";

/**
 * The curated RF & microwave library.
 *
 * Imported from Sanu0910/rf_microwave_resources, which was a standalone
 * static page ("RFWave Resources · RF 101 by Sanu") with its catalogue
 * hardcoded into index.html. Here it is data, so it renders through the same
 * primitives as the rest of the site and appears in search and the sitemap.
 *
 * WHAT CHANGED IN THE MOVE, and why:
 *
 * 1. The source repository also carried ~150 MB of textbook PDFs and a set of
 *    vendor application notes. Those are other people's copyrighted work and
 *    were not licensed for redistribution from this domain, so none of them
 *    came across as files. Every one is cited below and linked to the
 *    publisher's own copy instead — which is also the copy that gets
 *    corrections. The one PDF written for this platform, the RF filter design
 *    overview, is hosted properly and lives in `resources.ts`.
 *
 * 2. Two steps of the MATLAB path pointed at app.go.mathworks.com email
 *    redirects from a MathWorks campaign, which are not durable course URLs.
 *    They are replaced by the one MATLAB Academy course that covers the same
 *    ground, and the tracking parameters are stripped from the rest.
 *
 * 3. One YouTube link had a stray trailing slash on its video id and did not
 *    resolve. Fixed.
 */

/* ------------------------------------------------------------- sections - */

export const librarySections: LibrarySection[] = [
  {
    id: "start-here",
    title: "Start Here",
    description:
      "Electromagnetics from the top down — what the field is for, before the algebra arrives.",
    items: [
      {
        title: "Motivation for EM Engineers",
        href: "https://youtu.be/jCVv9K_krtU",
        blurb:
          "What electromagnetics actually built, and why the subject is worth the effort it asks for.",
        format: "Video",
        source: "YouTube",
        domains: ["RF"],
      },
      {
        title: "Maxwell's Equations",
        href: "https://www.maxwells-equations.com/",
        blurb:
          "The four equations underneath all of this, one page each, in integral and differential form.",
        format: "Website",
        source: "maxwells-equations.com",
        domains: ["RF", "Antenna"],
      },
      {
        title: "Electronics Tutorials",
        href: "https://www.electronics-tutorials.ws/",
        blurb:
          "Circuit and EM fundamentals explained plainly. The place to go when a term in a lecture went past you.",
        format: "Website",
        source: "Electronics Tutorials",
        domains: ["Electronics"],
      },
      {
        title: "Introduction to RF Power Amplifiers",
        href: "https://www.youtube.com/watch?v=8GLpBE5n5Cw",
        blurb:
          "Prof. Ali Hajimiri on what a power amplifier has to do and which of its specifications fight each other.",
        format: "Video",
        source: "Ali Hajimiri · YouTube",
        domains: ["RF"],
      },
      {
        title: "TED Talks",
        href: "https://www.ted.com/talks",
        blurb: "Wider-angle talks on science and engineering, for the weeks when the problem set wins.",
        format: "Website",
        source: "TED",
      },
    ],
  },
  {
    id: "study",
    title: "Online Study Resources",
    description:
      "Courses, lecture series and working references that go deeper than any one programme can.",
    items: [
      {
        title: "SIJ University",
        href: "https://www.signalintegrityjournal.com/articles/3546-sij-university",
        blurb:
          "Signal Integrity Journal's structured learning library — signal integrity and RF, taught by the people who publish on it.",
        format: "Course",
        source: "Signal Integrity Journal",
        domains: ["PCB", "EMI/EMC", "RF"],
      },
      {
        title: "Intuitions for Analog Circuits",
        href: "https://www.eecg.utoronto.ca/~ali/intuitions.html",
        blurb:
          "Prof. Ali Sheikholeslami's conceptual explanations. Builds the intuition that the formulae are shorthand for.",
        format: "Website",
        source: "University of Toronto",
        domains: ["Electronics", "Semiconductor"],
      },
      {
        title: "Antenna Theory",
        href: "https://www.antenna-theory.com/",
        blurb:
          "A complete working reference on antenna parameters, types and measurement. Worth a bookmark.",
        format: "Website",
        source: "antenna-theory.com",
        domains: ["Antenna"],
      },
      {
        title: "MIT PCB Design Class",
        href: "https://pcb.mit.edu/",
        blurb:
          "MIT's intensive PCB design class, materials in the open — the art and the engineering of a board.",
        format: "Course",
        source: "MIT",
        domains: ["PCB"],
      },
      {
        title: "Design of Dielectric Metasurfaces",
        href: "https://www.youtube.com/watch?v=il-PpAT5l5Q",
        blurb: "A research talk on metasurface design and optimisation.",
        format: "Video",
        source: "Microsoft Research",
        domains: ["Antenna", "Simulation"],
      },
      {
        title: "FMCW Radar — Full Playlist",
        href: "https://youtube.com/playlist?list=PLPQrZqhah1qFoVZyZB_QQ9iNSmiJyaHp7",
        blurb:
          "Radar fundamentals worked through end to end, with the weight on FMCW systems.",
        format: "Playlist",
        source: "YouTube",
        domains: ["RF"],
      },
      {
        title: "What Is a Mixer?",
        href: "https://www.youtube.com/watch?v=WwJKxvz7qbs",
        blurb:
          "How a mixer works and what its specification sheet is really telling you.",
        format: "Video",
        source: "YouTube",
        domains: ["RF"],
      },
    ],
  },
  {
    id: "notes",
    title: "Reference Notes & Application Notes",
    description:
      "The vendor notes and articles worth reading in full, linked to the publisher's copy — which is the one that stays current.",
    items: [
      {
        title: "AN1275: Impedance Matching Network Architectures",
        href: "https://www.silabs.com/documents/public/application-notes/an1275-imp-match-for-network-arch.pdf",
        blurb:
          "Two-element L, three-element Pi and T, and four-element wideband networks, with worked numerical examples. The clearest free treatment of matching topologies there is.",
        format: "Application Note",
        source: "Silicon Labs",
        domains: ["RF"],
      },
      {
        title: "MT-086: Fundamentals of Phase-Locked Loops",
        href: "https://www.analog.com/media/en/training-seminars/tutorials/MT-086.pdf",
        blurb:
          "Walt Kester's PLL tutorial: phase detector, charge pump, loop filter, VCO and divider as one feedback system, then phase noise and the loop-bandwidth trade.",
        format: "Application Note",
        source: "Analog Devices",
        domains: ["RF", "Electronics"],
      },
      {
        title: "Mixer Basics Primer",
        href: "https://markimicrowave.com/technical-resources/white-papers/mixer-basics-primer/",
        blurb:
          "Where a diode mixer's conversion loss actually goes, and why double-balanced beats triple-balanced on it.",
        format: "Application Note",
        source: "Marki Microwave",
        domains: ["RF"],
      },
      {
        title: "Understanding Mixers and Their Parameters",
        href: "https://www.mwrf.com/technologies/components/article/21846332/microwaves-rf-understanding-mixers-and-their-parameters",
        blurb:
          "The same ground as a magazine feature: conversion loss, isolation, compression and what the numbers mean when you are choosing a part.",
        format: "Article",
        source: "Microwaves & RF",
        domains: ["RF"],
      },
    ],
  },
  {
    id: "channels",
    title: "YouTube Channels Worth Following",
    description:
      "Channels that teach rather than demonstrate — subscribe to these and the feed starts working for you.",
    items: [
      {
        title: "EMPossible",
        href: "https://www.youtube.com/@empossible1577",
        blurb:
          "Full computational electromagnetics lecture courses. Rigorous, visual, and free.",
        format: "Channel",
        source: "YouTube",
        domains: ["Simulation", "RF"],
      },
      {
        title: "Electrical Engineering Solutions",
        href: "https://www.youtube.com/@electricalengineeringsolutions",
        blurb: "Electromagnetics and RF worked problem by problem, at every level.",
        format: "Channel",
        source: "YouTube",
        domains: ["RF", "Electronics"],
      },
      {
        title: "Marshall Bruner",
        href: "https://www.youtube.com/@MarshallBrunerRF",
        blurb:
          "Radar and RF concepts animated. The fastest route to intuition about radar systems.",
        format: "Channel",
        source: "YouTube",
        domains: ["RF"],
      },
      {
        title: "w2aew",
        href: "https://www.youtube.com/@w2aew",
        blurb:
          "RF devices and measurements on a real bench, with a real scope. Practical throughout.",
        format: "Channel",
        source: "YouTube",
        domains: ["RF", "Electronics"],
      },
      {
        title: "Prof. Halim Boutayeb",
        href: "https://www.youtube.com/@profhalimboutayeb",
        blurb: "RF devices, antenna simulation and CST Studio Suite, taught step by step.",
        format: "Channel",
        source: "YouTube",
        domains: ["Antenna", "Simulation"],
      },
    ],
  },
];

export const getLibrarySection = (id: string) =>
  librarySections.find((s) => s.id === id);

/* ---------------------------------------------------------------- books - */

/**
 * Textbooks, cited and linked to their publisher.
 *
 * Deliberately not hosted. A scanned textbook served from this domain would
 * be an infringement whatever the intent behind it, and the edition here
 * would drift from the one being taught.
 */
export const bookRecommendations: BookRecommendation[] = [
  {
    title: "Microwave Engineering",
    authors: "David M. Pozar",
    edition: "4th edition",
    why: "The standard text, and the one most courses are built around. Transmission lines, network analysis, matching, filters, amplifiers and mixers in one volume.",
    domains: ["RF"],
    href: "https://www.wiley.com/en-us/Microwave+Engineering,+4th+Edition-p-9781118213636",
  },
  {
    title: "Antenna Theory: Analysis and Design",
    authors: "Constantine A. Balanis",
    edition: "4th edition",
    why: "The reference for antenna analysis. Dipoles, loops, arrays, apertures, horns, microstrip and reflectors, each derived rather than asserted.",
    domains: ["Antenna"],
    href: "https://www.wiley.com/en-us/Antenna+Theory:+Analysis+and+Design,+4th+Edition-p-9781118642061",
  },
  {
    title: "Advanced Engineering Electromagnetics",
    authors: "Constantine A. Balanis",
    edition: "2nd edition",
    why: "Where to go when the undergraduate treatment runs out: boundary value problems, waveguides, scattering and asymptotic methods.",
    domains: ["RF", "Antenna"],
    href: "https://www.wiley.com/en-us/Advanced+Engineering+Electromagnetics,+2nd+Edition-p-9780470589489",
  },
  {
    title: "RF Microelectronics",
    authors: "Behzad Razavi",
    edition: "2nd edition",
    why: "RF integrated circuit design, taught with Razavi's habit of showing why the obvious topology fails before showing the one that works.",
    domains: ["RF", "Semiconductor"],
    href: "https://www.pearson.com/en-us/subject-catalog/p/rf-microelectronics/P200000000562/9780132901055",
  },
  {
    title: "Microwave Transistor Amplifiers: Analysis and Design",
    authors: "Guillermo Gonzalez",
    edition: "2nd edition",
    why: "Amplifier design done entirely in S-parameters — gain and noise circles, stability, and the compromise between a noise match and a power match.",
    domains: ["RF"],
    /* Long out of print; no stable publisher page to link, so none is given. */
    href: null,
  },
  {
    title: "RF Power Amplifiers for Wireless Communications",
    authors: "Steve C. Cripps",
    edition: "2nd edition",
    why: "The practitioner's PA book: load-pull, class AB through switching modes, efficiency enhancement and linearisation.",
    domains: ["RF"],
    href: "https://us.artechhouse.com/RF-Power-Amplifiers-for-Wireless-Communications-Second-Edition-P978.aspx",
  },
  {
    title: "Signal and Power Integrity — Simplified",
    authors: "Eric Bogatin",
    edition: "3rd edition",
    why: "Board-level high-speed design explained from physical intuition first. Read it before you route anything fast.",
    domains: ["PCB", "EMI/EMC"],
    href: "https://www.informit.com/store/signal-and-power-integrity-simplified-9780134512204",
  },
  {
    title: "Introduction to Electromagnetic Compatibility",
    authors: "Clayton R. Paul",
    edition: "2nd edition",
    why: "EMI and EMC from first principles through to the regulatory limits a product actually has to pass.",
    domains: ["EMI/EMC", "PCB"],
    /* Print-on-demand, and the publisher's page has moved more than once. */
    href: null,
  },
  {
    title: "Radar RF Circuit Design",
    authors: "Nickolas Kingsley and Joseph R. Guerci",
    edition: "2nd edition",
    why: "The bridge between a radar system specification and the RF components that have to meet it, including packaging and T/R module integration.",
    domains: ["RF"],
    href: "https://us.artechhouse.com/Radar-RF-Circuit-Design-Second-Edition-P2273.aspx",
  },
  {
    title: "LNA-ESD Co-Design for Fully Integrated CMOS Wireless Receivers",
    authors: "Paul Leroux and Michiel Steyaert",
    why: "A narrow, excellent monograph: what ESD protection does to a low-noise amplifier's noise figure, and how to design the two together.",
    domains: ["RF", "Semiconductor"],
    href: "https://link.springer.com/book/10.1007/1-4020-3191-2",
  },
];

/* --------------------------------------------------------- learning path - */

/**
 * MATLAB, in the order worth taking it.
 *
 * Every step is a free self-paced MathWorks course. The value is the
 * sequence, not the links — each one assumes the previous.
 */
export const matlabPath: LearningPath = {
  id: "matlab",
  title: "Self-Paced MATLAB Path",
  description:
    "Sixteen MathWorks courses in the order that builds on itself — from the Onramp to writing code fast enough for a parameter sweep you can actually wait for.",
  provider: "MATLAB Academy · MathWorks",
  note: "Free, self-paced and run in the browser. A MathWorks account is needed, and a few courses offer a shareable certificate on completion.",
  steps: [
    {
      title: "MATLAB Onramp",
      href: "https://matlabacademy.mathworks.com/details/matlab-onramp/gettingstarted",
      blurb: "The two-hour standing start: the language, the desktop and the command line.",
    },
    {
      title: "Make Your Functions User-Friendly",
      href: "https://matlabacademy.mathworks.com/details/make-your-functions-user-friendly/otmlfuf",
      blurb: "Arguments, defaults and validation — how to write a function you will still trust next month.",
    },
    {
      title: "Working with Tables",
      href: "https://matlabacademy.mathworks.com/details/tables/otmltab",
      blurb: "The table type, and why measurement data belongs in one rather than in six parallel arrays.",
    },
    {
      title: "Import Irregular Data",
      href: "https://matlabacademy.mathworks.com/details/import-irregular-data/otmliid",
      blurb: "Reading the files instruments actually produce, headers and all.",
    },
    {
      title: "Clean and Prepare Data for Analysis",
      href: "https://matlabacademy.mathworks.com/details/clean-and-prepare-data-for-analysis/otmlpda",
      blurb: "Missing values, outliers and units, handled before they reach a plot.",
    },
    {
      title: "Calculations on Grouped Data",
      href: "https://matlabacademy.mathworks.com/details/calculations-on-grouped-data/otmlcgd",
      blurb: "Group-wise operations — the shape most sweep and sensitivity analysis takes.",
    },
    {
      title: "Explore Data with MATLAB Plots",
      href: "https://matlabacademy.mathworks.com/details/explore-data-with-matlab-plots/otmledp",
      blurb: "Choosing the plot that answers the question, and reading what it shows.",
    },
    {
      title: "How MATLAB Graphics Work",
      href: "https://matlabacademy.mathworks.com/details/how-matlab-graphics-work/otmlhgw",
      blurb: "The graphics object model, which is what makes a figure publishable instead of nearly right.",
    },
    {
      title: "Calculations with Vectors and Matrices",
      href: "https://matlabacademy.mathworks.com/details/calculations-with-vectors-and-matrices/otmlcvm",
      blurb: "Vectorised operations — the difference between code that runs and code that finishes.",
    },
    {
      title: "Statistics Onramp",
      href: "https://matlabacademy.mathworks.com/details/statistics-onramp/orst",
      blurb: "Distributions, summary statistics and hypothesis testing on engineering data.",
    },
    {
      title: "Common Data Analysis Techniques",
      href: "https://matlabacademy.mathworks.com/details/common-data-analysis-techniques/otmldat",
      blurb: "Smoothing, resampling and correlation, applied rather than defined.",
    },
    {
      title: "Curve Fitting Onramp",
      href: "https://matlabacademy.mathworks.com/details/curve-fitting-onramp/orcf",
      blurb: "Fitting a model to measured response, and judging whether the fit means anything.",
    },
    {
      title: "Introduction to Linear Algebra with MATLAB",
      href: "https://matlabacademy.mathworks.com/details/introduction-to-linear-algebra-with-matlab/linalg",
      blurb: "The matrix algebra that beamforming, MIMO and every method-of-moments solver runs on.",
    },
    {
      title: "Optimization Onramp",
      href: "https://matlabacademy.mathworks.com/details/optimization-onramp/optim",
      blurb: "Posing a design problem as an objective with constraints, then solving it.",
    },
    {
      title: "MATLAB Coding Practices for Efficiency and Performance",
      href: "https://matlabacademy.mathworks.com/details/matlab-coding-practices-for-efficiency-and-performance/otmlcep",
      blurb: "Timing, the profiler, preallocation and vectorisation — finding the bottleneck before guessing at it.",
    },
    {
      title: "App Building Onramp",
      href: "https://matlabacademy.mathworks.com/details/app-building-onramp/orab",
      blurb: "App Designer, for turning a working script into something a colleague can run.",
    },
  ],
};

/* ----------------------------------------------------- open-source tools - */

/**
 * Third-party open-source software — not to be confused with `tools.ts`,
 * which is the calculators this site serves itself.
 *
 * Every one of these is free and runs on a student's own machine, which is
 * the point: none of the commercial tools taught here are.
 */
export const openSourceTools: OpenSourceTool[] = [
  {
    name: "OpenEMS",
    href: "https://www.openems.de/",
    blurb: "FDTD solver scripted from MATLAB or Python. The usual free route into 3D EM simulation.",
    category: "EM solver",
  },
  {
    name: "MEEP",
    href: "https://meep.readthedocs.io/",
    blurb: "FDTD from MIT, driven in Python, Scheme or C++. Strong on photonics and antennas.",
    category: "EM solver",
  },
  {
    name: "Elmer FEM",
    href: "https://www.elmerfem.org",
    blurb: "Multiphysics finite-element solver with a GUI — couples EM to thermal problems.",
    category: "EM solver",
  },
  {
    name: "FreeFEM",
    href: "https://freefem.org/",
    blurb: "Finite-element solver for PDEs you write yourself. For custom EM formulations.",
    category: "EM solver",
  },
  {
    name: "FEniCS",
    href: "https://fenicsproject.org/",
    blurb: "Research-grade finite-element platform in Python and C++.",
    category: "EM solver",
  },
  {
    name: "NEC",
    href: "https://www.nec2.org/",
    blurb: "The method-of-moments code wire-antenna work has been built on for decades.",
    category: "EM solver",
  },
  {
    name: "Puma-EM",
    href: "https://github.com/xj361685640/PUMA-EM",
    blurb: "Surface method-of-moments solver using the multilevel fast multipole method.",
    category: "EM solver",
  },
  {
    name: "PSSFSS",
    href: "https://github.com/simonp0420/PSSFSS.jl",
    blurb: "Frequency-selective surfaces and polarisation selective structures, in Julia.",
    category: "EM solver",
  },
  {
    name: "Traceon",
    href: "https://traceon.org/",
    blurb: "Electron optics by boundary elements and particle tracing.",
    category: "EM solver",
  },
  {
    name: "scikit-rf",
    href: "https://scikit-rf.org/",
    blurb: "S-parameters, Touchstone files, de-embedding and network algebra in Python.",
    category: "Circuit & RF",
  },
  {
    name: "QucsStudio",
    href: "https://qucsstudio.de/",
    blurb: "Circuit and 2D EM simulation — quick for S-parameter and filter work.",
    category: "Circuit & RF",
  },
  {
    name: "GNU Octave",
    href: "https://octave.org/",
    blurb: "Runs most MATLAB code unchanged. The free answer to a licence you do not have.",
    category: "Numerical computing",
  },
  {
    name: "Scilab",
    href: "https://www.scilab.org",
    blurb: "Numerical computing and signal processing, with its own Simulink-like modeller.",
    category: "Numerical computing",
  },
  {
    name: "KiCad",
    href: "https://www.kicad.org",
    blurb: "A full PCB design suite with SPICE built in, and genuinely professional.",
    category: "PCB & layout",
  },
];

export const openSourceToolCategories = [
  "EM solver",
  "Circuit & RF",
  "Numerical computing",
  "PCB & layout",
] as const;
