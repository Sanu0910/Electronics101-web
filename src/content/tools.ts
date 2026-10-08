import type { Tool } from "./types";

/**
 * The free design tools. The calculators themselves live in
 * /public/tools/<slug>/index.html; this file is only what the /tools page
 * says about them, so every claim here has to match what the tool does.
 */
export const tools: Tool[] = [
  {
    slug: "filter-designer",
    title: "Filter Designer",
    summary:
      "Pick a topology, a response and an order, and get the LC ladder element values with the response plotted — then export the result to your simulator.",
    domains: ["RF"],
    features: [
      "Low-pass · high-pass · band-pass · band-stop",
      "Butterworth · Chebyshev · Bessel",
      "Orders 1 to 10",
      "Response, group delay and Smith chart views",
      "SPICE · Touchstone .s2p · CSV export",
    ],
  },
  {
    slug: "antenna-calculator",
    title: "Antenna Design Calculator",
    summary:
      "First-cut dimensions and performance figures for eight antenna types, with the radiation pattern drawn in 2D and 3D.",
    domains: ["Antenna"],
    features: [
      "Microstrip patch · dipole · monopole · Yagi-Uda",
      "Horn · slot · loop · parabolic reflector",
      "Interactive 2D and 3D radiation patterns",
    ],
  },
  {
    slug: "microstrip-designer",
    title: "Microstrip Line Designer",
    summary:
      "Synthesise a trace width for a target impedance, or analyse a width you already have, on common RF laminates — with a cross-section drawn to scale.",
    domains: ["RF", "PCB"],
    features: [
      "Synthesis and analysis modes",
      "Z₀ · effective permittivity · guided wavelength",
      "Dispersion, phase and group velocity",
      "Conductor and dielectric loss",
      "Rogers, Arlon, Taconic and FR4 substrates",
    ],
  },
  {
    slug: "smith-chart",
    title: "Impedance Matching & Smith Chart Lab",
    summary:
      "Drag a load around an interactive Smith chart and watch reflection, VSWR and delivered power respond, then work through matching networks and stubs.",
    domains: ["RF"],
    features: [
      "Interactive Smith chart",
      "Reflection coefficient · VSWR · return loss",
      "L, Pi and T matching networks",
      "Single-stub matching calculator",
      "Q versus bandwidth",
    ],
  },
];
