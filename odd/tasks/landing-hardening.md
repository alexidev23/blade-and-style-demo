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

## Tasks

| ID  | Specs     | Route  | Status  | Evidence |
| --- | --------- | ------ | ------- | -------- |
| T1  | S1-S3, S8 | inline | pending | -        |
| T2  | S4-S6     | inline | pending | -        |
| T3  | S7        | inline | pending | -        |
| T4  | S1-S2     | inline | pending | -        |
| T5  | S8        | inline | pending | -        |

## Log

- **L1** (verbatim) "ahi agregue unas nuevas skills, podes analizar todo el proyecto de nuevo en busca de mejoras con estas nuevas skills?"
- **L2** (verbatim) "hace un plan de todo lo que queres hacer"
- **L3** (verbatim) "lo voy a hacer con vercel" — deploy target confirmed; `adapter-auto` stays, Unit 4 only documents the deploy.
