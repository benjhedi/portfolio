# Roadmap - Portfolio Hedi Jahouach

Sources: [log] v2 decision log (Cowork, 2026-11-07); [mockup] v2 mockup, claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM; [inv] `docs/audit/inventory.md`. The order is the priority. A line is a user outcome; a screen line needs its validated mockup (rule 60).

## Phase 0 - Foundations (done or in progress)

- [x] A visitor reads the bilingual v1 site, dark mode, projects, contact form: v1.0.0 to v1.6.0, 2026-06-03 to 2026-07-01 (`git tag`).
- [x] Agents work under wara-kit 2.1.1 (PR benjhedi/portfolio#24, 1e085e5).
- [ ] Inventory, architecture rule, Vitest and ADR 001 on `docs-analyze-product` (a356458 to 9c65bca), not merged into `dev`.
- [ ] Product layer `product/` (this branch), then `/adopt` ([inv] gap table).

## Phase 1 - v2 redesign, in the [log] section order

- [ ] Wave 0: the v2 log, the mockup and its media, and `SEO-accueil.md` are versioned in `docs/`, so every screen has an in-repo mockup ([inv] refactor specs).
- [ ] A visitor sees the hero: oval with the looping portrait video, an app, the site or a product leaving the vapor at each loop, name and role below; poster under reduced motion. Needs the mockup. Open: oval background, loop crossfade ([log]).
- [ ] A visitor reads the statement: name and role in two columns, mono note, four-line statement, proof chips. Needs the mockup. Open: capitals or sentence case ([log]).
- [ ] A visitor sees the clients marquee. Needs the mockup ([log], [mockup]).
- [ ] A visitor browses 6 full-screen project blocks with a giant marquee title, mono tags, "Voir le projet", then a grid of the 9 others; images light. Needs the mockup. Open: the "Voir le projet" target, as no store URL exists and GearTrack is B2B ([log], `docs/architecture-study.md`).
- [ ] A visitor reads 002 about. Needs the mockup ([log], [mockup]).
- [ ] A visitor reads 003 offers. Needs the mockup ([log], [mockup]).
- [ ] A visitor reads 004 process. Needs the mockup ([log], [mockup]).
- [ ] A visitor reads 005 career. Needs the mockup ([log], [mockup]).
- [ ] A visitor reads 006 skills. Needs the mockup ([log], [mockup]).
- [ ] A visitor sends a request from 007 contact and is told where the data goes. Needs the mockup ([log], [inv] rule 06 gap).
- [ ] A visitor sees the footer marquee. Needs the mockup ([log], [mockup]).
- [ ] A visitor always reaches "Demarrer un projet / Voir les projets" from the fixed bottom bar, with the thin nav and the 0% "HJ" preloader. Needs the mockup ([log], [mockup]).
- [ ] A search for "Hedi Jahouach" finds the site in FR and EN: title, hreflang, canonical, sitemap, JSON-LD ([log], [inv] SEO gap).

## Phase 2 - After v2

- None planned on 2026-11-07 (Hedi).

## Parked

- Project pages with their own URL: would need a router, an architecture trigger (`10-architecture.md`).
- Reuse of the hero by another site: decided no on 2026-11-07 ([log]).

## Evolution triggers that touch the architecture

Copied from `.claude/rules/10-architecture.md`: a project needs its own URL, a section is reused elsewhere, a business rule appears, `AppContext` needs a fourth value or re-renders too much, or component tests become necessary. A line that crosses one reruns `/architecture-study` before its spec.
