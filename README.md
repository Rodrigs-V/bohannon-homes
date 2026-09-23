# Bohannon Development Corporation — website

A single-page site for Bohannon Development Corporation (El Paso, TX), built
the way `PaloVerde Homes` and `plaza-properties` on this machine are built:
Next.js App Router, one front page, file-based data in `lib/`.

```bash
bun install
bun run dev      # http://localhost:3000
bun run build
bun run lint
```

## Stack

| Piece | Choice |
|---|---|
| Runtime | Bun 1.3.2 |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript, strict |
| Styling | Tailwind CSS v4, CSS-first — tokens in `@theme inline` in `app/globals.css`, no `tailwind.config.js` |
| Fonts | `next/font/google` — Instrument Serif (display + figures), Inter Tight (everything else) |
| Data | Static modules in `lib/`. No DB, no CMS, no auth |
| Forms | None. `tel:` and `mailto:` only — see "No contact form" below |

## Layout

```
app/
  layout.tsx      root shell, fonts, metadata, Organization JSON-LD
  page.tsx        the single page — section order lives here
  globals.css     design tokens, type roles, component classes
components/       flat, PascalCase, one section each
lib/
  company.ts      NAP, history, portfolio figures, core values
  communities.ts  the eight managed communities
  leadership.ts   executive bios + the published staff directory
  services.ts     the three divisions
  nav.ts          section anchors, split for the centred header
public/images/
  brand/          the client's logo + Equal Housing Opportunity mark
  communities/    the client's own hero photograph per community
  site/           one grounds photograph from the client's carousel
```

Page order: Hero → Portfolio → About → Services → Communities → Leadership →
Contact → Footer. The light/dark rhythm alternates all the way down, so
sections are separated by a change of ground rather than by dividers.

## Design decisions

**Centred logo.** The mark sits on the optical centre of the header with the
four section links split two-and-two around it — the chrome the client asked
for, not the usual logo-left-plus-tabs. The bar is transparent over the hero
photograph and goes solid past it. Below `md` the links collapse into a
full-screen overlay, but the phone number stays in the bar at every width.

**Reversed logo on the photograph.** `public/images/brand/logo.png` is the
client's real mark: crimson on transparent, with the house-mark's cutouts
punched out as actual transparency (verified — the file contains zero opaque
white pixels). Crimson type on a dark photograph would fail contrast, so over
the hero the mark renders reversed to solid white and keeps its interior
shapes exactly. No white plate was invented to sit behind it. The footer uses
the full-colour original as-is.

**Palette from the logo.** The three crimsons were sampled pixel-by-pixel out
of the logo file, not eyeballed:

| Token | Hex | Origin |
|---|---|---|
| `brand` | `#992327` | Sourced — the wordmark's ink, 25.2% of the logo's non-white pixels |
| `brand-deep` | `#7C001E` | Sourced — bottom of the house-mark's gradient |
| `brand-bright` | `#A7021A` | Sourced — top of that gradient |

Everything else (warm near-black ink, bone surfaces, hairlines) is an addition
chosen so the crimson stays the only saturated thing on the page. Every
text/background pair actually used is computed and listed at the top of
`app/globals.css`; all of them pass AA and most pass AAA. Crimson is never
type on a dark surface — it computes 2.39 there — so on dark it appears only
as a fill, with white on top at 8.00:1.

**Typography.** Instrument Serif carries every headline and every portfolio
figure; it is built to be set at 120px, which is what the figures do. Inter
Tight carries labels, body and navigation. The figures are a hairline-separated
editorial stack rather than the four-across "icon over a number" card row this
vertical defaults to.

## Where the content came from

Everything on the page is the client's own, fetched 2026-09-23:

- **Body copy, core values, history, the nine states** — quoted from
  `bohannondevelopment.com` (homepage, `/services/`, `/aboutus/`), lightly
  trimmed for rhythm, never rewritten or extended.
- **Leadership bios** — `/aboutus/`. Emails — `/contact/`.
- **The eight communities** — the Apartments247 corporate API the client's own
  site runs on (`/api/v1/corporation_communities/`). Names, addresses, phones,
  unit counts, floor-plan counts, descriptions and hero photographs.
- **Photography** — the client's own community hero shots and one grounds
  photograph from their homepage carousel. **There is no stock photography on
  this site.** The hero captions name the community in shot, so no photograph
  is presented as something it is not.

One improvement over the current site: the client's `/communities/` page
renders that list from the API at runtime, so it is blank without JavaScript
and invisible to crawlers. Here the same eight records are baked into
`lib/communities.ts` and server-rendered.

## Known placeholder — one, deliberate

`[CORPORATE OFFICE HOURS — TO BE CONFIRMED]`, rendered visibly in the Contact
section (`lib/company.ts` → `officeHoursNote`).

The company publishes no corporate office hours anywhere — not on the site,
not in the API behind it. A plausible "Mon–Fri 9–5" is exactly the kind of
harmless-looking invention that ships wrong, so it renders as a marked
placeholder instead. **Do not fill this in without asking the client.**

The per-community leasing hours in `lib/communities.ts` *are* published and
*are* real. They are a different thing and must not be copied up to the
corporate record.

Find every unverified marker:

```bash
grep -rn "TO BE CONFIRMED\|PLACEHOLDER\|unconfirmed" app components lib
```

## Other things deliberately not invented

- **No headshots.** The client publishes none, so the leadership cards use
  typographic monograms rather than stock portraits standing in for real,
  named people. `photo` in `lib/leadership.ts` is where real ones go.
- **No testimonials or reviews.** None exist; none were written.
- **No unit count for two communities.** Magoffin Park Villas and The Cottages
  at Edgemere do not publish one, so `units` is `null` and those cards show
  the floor-plan count instead of a guessed number.
- **No general email address.** The client lists individual staff addresses
  only; the directory reproduces exactly those.
- **No contact form.** The client runs no endpoint this site could post to, and
  a form that silently goes nowhere is worse than no form. Everything is a
  `tel:` or `mailto:` that works on first tap.

## Open questions for the client

1. **Corporate office hours** — the one placeholder above.
2. **Headshots** for the six executives, if they want faces on the page.
3. **Rebecca DeVillier, Tammy Thompson and Pat Rojas** appear on `/contact/`
   with titles and emails but have no biography on `/aboutus/`. They are in the
   directory, not the leadership grid. Do they want bios?
4. **Past projects.** The client's `/past-projects/` page is empty. If there is
   a real project list, it is the strongest section this site is missing.
5. **Career opportunities** currently links to the client's own TAA employment
   application PDF on their existing domain. Confirm it should stay there, or
   supply the file to host here.
6. **Photography.** The available shots are almost all pool-and-sunshine
   marketing images. A few construction or site-work photographs would suit a
   development and general contracting firm better than another pool.
