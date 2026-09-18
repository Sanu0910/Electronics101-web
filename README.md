# Electronics 101 — website

**Learn. Build. Simulate. Innovate.**

An independent technical education platform for practical electronics, RF and
microwave engineering, antenna design, PCB and EMI/EMC, semiconductor
technology and simulation.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm start       # serve the production build
```

Node 20+ required. The stack is Next.js 16 (App Router), React 19, TypeScript
and Tailwind v4.

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
  lib/          utils — Intl formatting, search matching
```

### Content is data, not markup

Everything the site shows lives in `src/content/*.ts` as typed objects, and the
UI only knows how to render those shapes. A CMS or admin dashboard can later
serve the same JSON with no change to the component tree.

To add a course, append to `src/content/courses.ts`. It appears on the courses
page, in the filters, in the sitemap and at its own detail route automatically.

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

## What still needs doing

- [ ] **Generate the remaining images.** `docs/asset-prompts.md` has
      paste-ready prompts. Missing images degrade to a drawn grid motif rather
      than breaking, so this is not urgent.
- [ ] **Fill in the social URLs** in `src/config/site.ts`. They are `null`
      today and render as "Link coming soon" — a dead link that looks real is
      worse than an honest gap.
- [ ] **Connect the forms.** `ContactForm` and `FeedbackForm` validate fully
      but have no backend; both say so on success rather than faking a
      confirmation. Wire `submit()` to an API route or a form service.
- [ ] **Have the legal pages reviewed.** The three policies under `/legal` are
      drafts written to a common shape and carry a visible warning saying so.
      They create real obligations around payments and personal data — get them
      checked before launch.
- [ ] **Replace the instructor placeholder** with a real biography and photograph.
- [ ] **Set the real domain** in `src/config/site.ts` (`site.url`) — it feeds
      canonical URLs, Open Graph tags and the sitemap.

## SEO

Per-route metadata, Open Graph and Twitter cards, a generated `sitemap.xml` and
`robots.txt`, plus JSON-LD: `EducationalOrganization` sitewide, `Course` on
series and course pages, `EducationEvent` on workshops and `Article` on blog
posts.

## Licence

MIT — see `LICENSE`.
