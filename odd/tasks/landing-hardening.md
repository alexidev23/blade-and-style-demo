# Feature: landing-hardening

Objective: harden the Blade & Style landing page (booking correctness, a11y, SEO, build) after a skills-based audit.
Branch: `fix/booking-logic` → `fix/a11y-ux` → `feat/seo-metadata` → `chore/build-deploy` (chained, each under review budget).
Delivery: chained PRs on top of `main`; deploy target is Vercel (adapter-auto already supported). Test runner: Vitest.

## Specs

- **S1** The booking flow MUST only offer services the selected barber performs (`Barber.serviceIds`). Opening the modal from a barber card preselects that barber and the first service in `services` order that the barber performs.
- **S2** Selecting a service the current barber does not perform resets the barber selection to `""` ("Cualquier maestro disponible"). An invalid `(barber, service)` pair MUST never be submitted.
- **S3** Resolution rules for a requested pair: an explicitly requested service wins; a barber incompatible with it is cleared. If only a barber is requested, pick the first service (in `services` order) that the barber performs. Unknown ids fall back to `services[0]` with no barber.
- **S4** `BookingModal` MUST NOT accept contradictory props: its open state is derived from `draft !== null`; there is no separate `open` prop.
- **S5** Every new draft opens the modal at step `review` with empty time/name/phone, without a post-render resetting `$effect`.
- **S6** Close via X button, backdrop click, or Escape calls `onClose` exactly once.
- **S7** The three modal steps live in dedicated components under `src/lib/components/booking/`, not inline in `BookingModal`.
- **S8** Booking selection rules are covered by deterministic unit tests; the suite runs with `pnpm test`.
- **S9** A skip-to-content link is the first focusable element and targets `<main id="contenido">`.
- **S10** Form controls use a border token with at least 3:1 contrast against their own background.
- **S11** The promo code fits without horizontal overflow at 320px.
- **S12** Testimonials show one column below 640px, two from 640px and three from 1024px.
- **S13** Each booking step moves focus to its heading, and the open dialog locks background scroll.
- **S14** `src/lib/data/site.ts` stays the single source of business data. The public origin derives from `PUBLIC_SITE_URL` (declared in `src/env.ts`, defaulting to the demo Vercel origin); no other file hardcodes a domain.
- **S15** Every page renders exactly one `<title>`, one meta description, and one canonical link pointing at the site origin.
- **S16** Open Graph and Twitter card metadata use `es_AR`, an absolute URL and an absolute image URL.
- **S17** A `HairSalon` JSON-LD block mirrors the visible data (name, address, phone, hours, social profiles) and escapes `<` inside its JSON.
- **S18** `/manifest.webmanifest` is served and linked from the document, referencing the existing 192px and 512px icons.
- **S19** `/robots.txt` allows crawling and points to `/sitemap.xml`; `/sitemap.xml` lists the home URL absolutely. Both are prerendered at build time.
- **S20** The footer no longer shows links that go nowhere; the demo notice replaces the placeholder legal links.

## Tasks

| ID  | Specs      | Route  | Status | Evidence                                                       |
| --- | ---------- | ------ | ------ | -------------------------------------------------------------- |
| T1  | S1-S3, S8  | inline | done   | `b8611aa` — `src/utils/booking.ts`                             |
| T2  | S4-S6, S13 | inline | done   | `b8611aa` — derived open state, single close path, scroll lock |
| T3  | S7         | inline | done   | `b8611aa` — `src/lib/components/booking/*`                     |
| T4  | S1-S2      | inline | done   | `b8611aa` — `+page.svelte`, `BookingWidget.svelte`             |
| T5  | S8         | inline | done   | `b8611aa` — 18 tests, `pnpm test`                              |
| T6  | S9         | inline | done   | `e61b8f6` — `+page.svelte`                                     |
| T7  | S10        | inline | done   | `e61b8f6` — `--color-line-strong`                              |
| T8  | S11        | inline | done   | `e61b8f6` — `Banner.svelte`                                    |
| T9  | S12        | inline | done   | `e61b8f6` — `Testimonials.svelte`                              |
| T10 | S14        | inline | done   | `5309390` — `src/env.ts`, `site.ts`                            |
| T11 | S15-S16    | inline | done   | `5309390` — `seo/SiteMeta.svelte`                              |
| T12 | S17        | inline | done   | `5309390` — `seo/StructuredData.svelte`                        |
| T13 | S18        | inline | done   | `5309390` — `static/manifest.webmanifest`                      |
| T14 | S19        | inline | done   | `5309390` — `routes/robots.txt`, `routes/sitemap.xml`          |
| T15 | S20        | inline | done   | `5309390` — `Footer.svelte`                                    |

## Log

- **L1** (verbatim) "ahi agregue unas nuevas skills, podes analizar todo el proyecto de nuevo en busca de mejoras con estas nuevas skills?"
- **L2** (verbatim) "hace un plan de todo lo que queres hacer"
- **L3** (verbatim) "lo voy a hacer con vercel" — deploy target confirmed; `adapter-auto` stays, Unit 4 only documents the deploy.
- **L4** Unit 1 verified: `pnpm test` 18 passed, `eslint` clean, `svelte-check` 0 errors/0 warnings, `pnpm build` green.
- **L5** Unit 2 verified: same four checks green; built CSS contains the `7d715a` token, `not-sr-only` and the skip-link z-index.
- **L6** Pending decisions: real business data (address, phone, socials, domain) for the SEO unit; what to do with the footer legal links that currently point to `#`.
- **L7** User confirmed this is a demo, so SEO uses the `site.ts` example data. Domain comes from `PUBLIC_SITE_URL` (SvelteKit 3 `defineEnvVars` in `src/env.ts`) with the Vercel demo origin as fallback. The footer legal links were removed and replaced by a "Sitio de demostración" notice (S20). Unit 3 verified: `pnpm test` 18 passed, `pnpm lint` clean, `svelte-check` 0/0, `pnpm build` green; prerendered output contains title, description, canonical, OG/Twitter tags, JSON-LD, `robots.txt` with `Sitemap:` and `sitemap.xml`.
