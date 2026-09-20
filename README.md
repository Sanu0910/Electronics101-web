# Electronics 101

**Learn. Build. Simulate. Innovate.**

The website for **Electronics 101** — an independent technical education
platform for practical electronics, RF and microwave engineering, antenna
design, PCB and EMI/EMC, semiconductor technology and simulation.

- **Live site:** https://sanu0910.github.io/Electronics101-web
- **Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind v4 —
  exported as a fully static site and served from GitHub Pages.
- **Status:** Launched with the first live workshop open for registration.
  Most other content is scaffolded and clearly labelled *Placeholder* until
  the real material is added (see [Before launch](#before-launch--what-still-needs-filling-in)).

## What's on the site

| Section | Route | What it is |
| --- | --- | --- |
| **Home** | `/` | Overview, the "why", and a countdown to the next live workshop |
| **Courses** | `/courses` | Structured, tool-based programmes with full curricula |
| **Workshops** | `/workshops` | Live, hands-on sessions with paid registration |
| **Series** | `/series` | Eleven free learning tracks, episode by episode |
| **Study Material** | `/study-material` | Notes, formula sheets, guides and code |
| **Services** | `/services` | Design, simulation and training offered to clients |
| **Mentorship** | `/mentorship` | One-to-one, project, research and industry-skill plans |
| **Projects** | `/projects` | Worked engineering projects with problem, approach and results |
| **Blog** | `/blog` | Technical articles |
| **About / Contact / Feedback / Links** | `/about`, `/contact`, `/feedback`, `/links` | The platform, its forms and a curated resource hub |
| **Legal** | `/legal/{terms,privacy,refunds}` | Policy pages |

**What is real today:** two workshops and the external tool/learning links
under **Useful Links**.

- **RF & Microwave Antenna Design** (5–6 Dec 2026) — eight-module outline, seat
  tiers and live Razorpay payment links.
- **Advanced Antenna Design & EM Simulation with Ansys HFSS + SBR+**
  (21–25 Nov 2026) — five-day intensive, day-by-day curriculum, four priced
  tiers with live Razorpay links, and an early-bird cutoff of 20 Oct 2026.

Everything else carries a visible **Placeholder** tag and honest "Coming soon" /
"Pricing on registration" states until the real content lands — see below.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # static export → ./out
npm start       # serve the production build
npm run lint    # ESLint + type check (this is what CI runs)
```

Node 20+ (CI builds on Node 22).

> **Note:** this repo pins a version of Next.js whose APIs and file
> conventions may differ from older releases. Before changing any app code,
> read the relevant guide under `node_modules/next/dist/docs/` — see
> `AGENTS.md`.

## How it is put together

```
src/
  app/          routes — one folder per page, App Router
  components/
    ui/         primitives: Button, Card, Badge, Section, Accordion, Filters
    cards/      one card per content type
    layout/     Navbar, Footer, ThemeToggle
    forms/      contact and feedback forms with validation
    home/       Countdown, TestimonialCarousel
  config/
    site.ts     brand strings, navigation, SOCIAL LINKS — edit here, not in components
  content/      the data layer: typed content, no JSX
  lib/          utils — Intl formatting, search matching, asset paths
```

### Content is data, not markup

Everything the site shows lives in `src/content/*.ts` as typed objects, and the
UI only knows how to render those shapes. A CMS or admin dashboard can later
serve the same JSON with no change to the component tree.

To add a course, append to `src/content/courses.ts`. It appears on the courses
page, in the filters, in the sitemap and at its own detail route automatically.
The same pattern holds for workshops, series, services, mentorship plans,
projects, study material and blog posts.

### Placeholder content is labelled, never disguised

Entries carrying `placeholder: true` render a visible **Placeholder** tag.
Invented enrolment numbers and fabricated testimonials are the fastest way to
lose a technical audience, so anything not yet real says so. Replace the
content and drop the flag.

Likewise `priceInr: null` renders "Pricing on registration" rather than a
number nobody has agreed, and a resource with `file: null` shows a disabled
"Coming soon" control rather than a link that 404s.

### Theming

Design tokens live in `src/app/globals.css`. Semantic tokens (`--bg`, `--fg`,
`--accent`, …) are redefined under `[data-theme="light"]`, and components never
name a raw colour — so light mode needed no component changes. Dark is the
default; the choice is stored per browser and applied before first paint by a
small inline script in `layout.tsx`, so the theme does not flash on load.

## Payments

Registration uses **Razorpay hosted payment links**, set per seat type in
`src/content/workshops.ts` as `tiers[].href`.

This is deliberate: the checkout, the amount and the card details all live on
Razorpay's page, so this repository contains **no API keys, no order endpoint
and no card data**. Moving to a server-side Orders integration later means
changing what that one field points at, not rebuilding the UI around it.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which lints and
type-checks, builds the static export, and publishes it to GitHub Pages. No
secrets are needed — there are no API keys in the project.

Because Pages serves a project site from a subpath, the workflow sets
`BASE_PATH=/Electronics101-web` so links and assets resolve. When a custom
domain is connected, drop `BASE_PATH` from the workflow and set the real
address in `site.url` (see below).

## Before launch — what still needs filling in

These are the gaps between "site is live" and "site is done". Each points at
the exact file to edit.

**Owner details (blockers — these look broken until filled in):**

- [x] **Social links** — YouTube, Instagram, LinkedIn and Facebook are wired up
      in `src/config/site.ts` and also feed the site-wide `sameAs` JSON-LD.
- [ ] **WhatsApp community** — still `null` in `src/config/site.ts`; renders as
      "Link coming soon" until a join link is added.
- [x] **Contact email** — published on the contact page from `site.email`.
- [x] **Instructor profile** — real credentials and biography in
      `src/content/misc.ts`, rendered on the workshop page.
- [ ] **Instructor full name and photo** — the entry currently carries a first
      name only, and `public/images/mentor-placeholder.jpg` does not exist yet
      (the card degrades to the grid motif).
- [ ] **Custom domain (optional)** — currently on the GitHub Pages subpath. To
      move: set `site.url` in `src/config/site.ts`, remove `BASE_PATH` from
      `.github/workflows/deploy.yml`, and add the domain in the repo's Pages
      settings.

**Content (replace placeholders with the real thing, then drop `placeholder: true`):**

- [ ] **Courses** — `src/content/courses.ts`: three courses are outlined but
      marked placeholder with `priceInr: null`. Confirm curricula and set prices.
- [ ] **Series episodes** — `src/content/series.ts`: eleven tracks with full
      topic lists, but no episodes published yet (no `episodeCount`). Add
      videos/links as they go live.
- [ ] **Study material** — `src/content/resources.ts`: every resource has
      `file: null`. Add the real PDFs/notebooks under `public/` and point
      `file` at them.
- [ ] **Blog posts** — `src/content/misc.ts`: three illustrative articles.
      Replace with real posts.
- [ ] **Projects** — `src/content/misc.ts`: four placeholder case studies with
      empty galleries. Add real projects and images.
- [ ] **Testimonials** — `src/content/misc.ts`: sample quotes, labelled as
      such. Real feedback from the form replaces them (subject to approval).
- [ ] **Razorpay links for the Antenna 101 workshop** —
      `src/content/workshops.ts`: the four tiers of
      `advanced-antenna-design-em-simulation` have `href: null`. Add the hosted
      payment links and the tier cards switch from "Enquire to book" to
      "Register".
- [ ] **Early-bird deadline** — that workshop has no `applyBy`, so the
      countdown and the "early-bird price until …" line do not render.
- [ ] **Other workshops** — `src/content/workshops.ts`: the two real workshops
      are listed above; the remaining two are illustrative until scheduled.

**Wiring & review:**

- [ ] **Connect the forms.** `ContactForm` and `FeedbackForm` validate fully
      but have no backend; both say so on success rather than faking a
      confirmation. Wire `submit()` in `src/components/forms/` to an API route
      or a form service.
- [ ] **Have the legal pages reviewed.** The three policies under `/legal` are
      drafts on a common shape and carry a visible warning. They create real
      obligations around payments and personal data — get them checked before
      relying on them.
- [ ] **Generate the remaining images.** `docs/asset-prompts.md` has
      paste-ready prompts. Missing images degrade to a drawn grid motif rather
      than breaking, so this is not urgent.

## SEO

Per-route metadata, Open Graph and Twitter cards, a generated `sitemap.xml` and
`robots.txt`, plus JSON-LD: `EducationalOrganization` sitewide, `Course` on
series and course pages, `EducationEvent` on workshops and `Article` on blog
posts.

## Licence

MIT — see `LICENSE`.
