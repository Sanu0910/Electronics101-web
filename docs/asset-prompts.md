# Electronics 101 — Gemini image prompts

Paste these into Gemini (Nano Banana / image generation) **one at a time**. Each
one says where the result goes in the repo and what size to ask for.

## Read this first — it will save you re-rolls

1. **Image models are bad at text.** Any lettering they produce will be subtly
   wrong. So every prompt below that is *not* the logo says **"no text, no
   letters, no numbers"** on purpose — the real wording is set in CSS on the
   site, where it is sharp, translatable and selectable. Do not fight this.
2. **Generate logos on a white background**, then remove it. Ask for
   "pure white background, no shadow" so the cut-out is clean.
3. **Keep the palette in every prompt.** It is repeated in each one below
   rather than referenced, so you can paste a single block without setup.
4. **Ask for more than one.** Say "give me 4 variations" and pick.
5. Save everything into `public/brand/` or `public/images/` using the filename
   given, or the site will not find it.

## The palette, for reference

| Role | Hex |
|---|---|
| Foundation (near-black navy) | `#070B14` |
| Surface / raised panel | `#0E1626` |
| Electric cyan (primary accent) | `#22D3EE` |
| Signal blue (secondary accent) | `#3B82F6` |
| Light section background | `#F6F8FB` |
| Body text on dark | `#C7D2DE` |

---

## 1. Primary logomark

> **File:** `public/brand/logomark.png` · square, 2048×2048

```
A minimalist geometric logomark for a premium electronics and RF engineering
education brand. The mark is an abstract monogram built from a stylised
antenna radiating three concentric arcs, merging into a clean circuit trace
that turns at a right angle. Flat vector style, precise geometry, even stroke
weight, no gradients inside the mark. Electric cyan (#22D3EE) and signal blue
(#3B82F6) only. Pure white background, no shadow, no text, no letters, no
numbers. Centred, generous margin. Give me 4 variations.
```

*Why this shape:* the arcs read as radiation, the right-angle trace reads as
PCB. Together they say "RF + hardware" without a cliché lightning bolt or
resistor squiggle.

## 2. Logomark — monochrome cut

> **File:** `public/brand/logomark-mono.png` · square, 2048×2048

```
The same minimalist antenna-and-circuit-trace logomark, rendered in a single
flat colour: pure white on a mid-grey background. Flat vector, even stroke
weight, no gradients, no shadow, no text, no letters, no numbers. This is the
one-colour version for dark backgrounds and print.
```

## 3. Favicon / app icon

> **File:** `public/brand/icon-512.png` · square, 512×512

```
An app icon for an electronics engineering education brand. A single bold
abstract antenna symbol with three radiating arcs, centred, occupying about
70 percent of the frame, on a deep navy-black (#070B14) rounded-square
background. The symbol is electric cyan (#22D3EE). Flat vector, very high
contrast, readable when shrunk to 32 pixels. No text, no letters, no numbers.
```

*Test it:* shrink to 32 px. If the arcs merge into a blob, ask for "fewer
arcs, thicker strokes".

## 4. Hero background

> **File:** `public/images/hero-field.jpg` · wide, 2880×1620 (16:9)

```
An abstract technical background for a premium engineering website hero
section. A dark navy-black field (#070B14) with a faint engineering grid, and
across it a smooth electromagnetic radiation pattern rendered as thin glowing
contour lines in electric cyan (#22D3EE) and signal blue (#3B82F6), like a
plotted antenna lobe or a field simulation heat map. Subtle depth, soft
bloom, mostly empty dark space in the left two thirds so text can sit over
it. Elegant and restrained, not busy, not neon, not sci-fi. No text, no
letters, no numbers, no people, no logos.
```

*Critical:* the "mostly empty in the left two thirds" line is what makes the
headline readable. If the result is busy everywhere, re-roll with "far more
negative space".

## 5. Open Graph / social share card

> **File:** `public/images/og-default.jpg` · 1200×630

```
A social share card background for a technical education brand. Deep
navy-black (#070B14), a subtle circuit-board trace pattern in very low
contrast, and one soft electric cyan (#22D3EE) glow arc sweeping from the
lower right. Clean, premium, lots of flat empty space in the upper left for
overlaid text. No text, no letters, no numbers, no logos.
```

## 6. Series covers — one prompt, eleven subjects

> **Files:** `public/images/series/<slug>.jpg` · 1600×900 each

Run this **eleven times**, swapping only the bracketed subject line.

```
A clean technical illustration for an engineering course card. Dark
navy-black background (#070B14) with a faint grid. The subject is rendered as
a precise, minimal engineering diagram in electric cyan (#22D3EE) and signal
blue (#3B82F6) line art — accurate, schematic, textbook-quality, not
decorative. Centred, generous margins, soft glow. No text, no letters, no
numbers, no annotations, no people.

SUBJECT: [ ... ]
```

| Slug | SUBJECT line to paste |
|---|---|
| `electronics-101` | a transistor amplifier stage schematic with a sine wave in and a larger sine wave out |
| `rf-101` | a Smith chart with one impedance-matching arc traced across it |
| `antenna-101` | a half-wave dipole antenna beside its figure-of-eight radiation pattern |
| `hfss-101` | a 3D microstrip patch antenna model on a substrate, wireframe mesh visible |
| `ads-101` | an RF amplifier schematic with S-parameter ports numbered as plain dots |
| `pcb-101` | a multilayer PCB stack-up cross-section with a controlled-impedance trace |
| `emi-emc-101` | a shielded enclosure with radiated emission waves deflecting off it |
| `semiconductor-101` | a MOSFET cross-section showing gate, oxide, source, drain and channel |
| `rfic-mmic-101` | an integrated circuit die layout with spiral inductors and bond pads |
| `embedded-101` | a microcontroller board with SPI, I2C and UART buses drawn as clean traces |
| `ai-electronics` | a neural network graph overlaid on an antenna radiation pattern |

## 7. Section pattern tile (seamless)

> **File:** `public/images/grid-tile.png` · square, 1024×1024, tileable

```
A seamless tileable texture of a very subtle engineering blueprint grid:
thin lines on deep navy-black (#070B14), with occasional faint circuit-board
traces and via pads. Extremely low contrast — it must sit behind text without
competing. Must tile seamlessly with no visible seam. No text, no letters, no
numbers.
```

## 8. Workshop banner backdrop

> **File:** `public/images/workshop-rf-antenna.jpg` · 1600×900

```
A premium banner background for a live RF and antenna design workshop. Dark
navy-black (#070B14). On the right, a microstrip patch antenna rendered as a
precise 3D technical model with a glowing electric cyan (#22D3EE) radiation
lobe emerging from it. The left half is near-empty dark space for overlaid
text. Cinematic but restrained, engineering-credible, not gamer-neon. No
text, no letters, no numbers, no people.
```

## 9. Abstract accents for light sections

> **File:** `public/images/accent-light.jpg` · 1600×900

```
A light-mode abstract technical graphic. Very light grey-blue background
(#F6F8FB). Thin precise line art of overlapping waveform traces and a partial
Smith chart, in signal blue (#3B82F6) at low opacity, drifting across the
frame. Clean, airy, lots of white space, editorial rather than decorative. No
text, no letters, no numbers.
```

## 10. Instructor / mentor portrait placeholder

> **File:** `public/images/mentor-placeholder.jpg` · square, 1200×1200

```
A neutral abstract avatar placeholder for an engineering mentor profile.
A softly lit deep navy (#0E1626) background with a simple geometric bust
silhouette in slightly lighter navy, and one thin electric cyan (#22D3EE)
arc behind the shoulder. Calm, professional, clearly a placeholder rather
than a real person. No face details, no text, no letters, no numbers.
```

*Replace these with real photographs before launch.* A placeholder that looks
like a stock portrait is worse than one that obviously is not a person.

---

## Once you have the files

Drop them into the paths listed, then tell me and I will wire them in — the
site reads image paths from `src/content/*`, so nothing is hard-coded into
components and swapping an image is a one-line change.

## What still needs a real designer or a photograph

Marked so nobody mistakes generated placeholder work for finished brand assets:

- The **wordmark** ("Electronics 101" set as type) — this is typography, not
  illustration. It is set in CSS on the site so it stays sharp and
  selectable; a generated wordmark will have malformed letters.
- **Real instructor photographs.**
- **Real project photographs** for the Projects page — measured results and
  hardware you actually built are the whole credibility of that page, and
  generated images would undermine it.
