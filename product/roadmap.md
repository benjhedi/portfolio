# Roadmap - Portfolio Hedi Jahouach

Sources: [log] `docs/v2/decision-log.md`; [mockup] `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM; [inv] `docs/audit/inventory.md`. The order is the priority. A line is a user outcome; a screen line needs its validated mockup (rule 60).

## Phase 0 - Foundations (done or in progress)

- [x] A visitor reads the bilingual v1 site, dark mode, projects, contact form: v1.0.0 to v1.6.0, 2026-06-03 to 2026-07-01 (`git tag`).
- [x] Agents work under wara-kit 2.1.1 (PR benjhedi/portfolio#24, 1e085e5).
- [x] Inventory, architecture rule, Vitest, ADR 001 and `product/` (PR benjhedi/portfolio#25, 40a3dd6).
- [ ] Kit adopted: project rule 90, CONTRIBUTING, ADRs 002 and 003, AGENTS.md and CLAUDE.md (`chore-adopt-kit`).
- [x] npm audit is clean on the dev toolchain and the local install matches CI (spec 003, `chore-npm-audit-fix`).

## Phase 1 - v2 redesign, in the [log] section order

- [x] Wave 0: the v2 log, the mockup and its media, and `SEO-accueil.md` are versioned in `docs/`, so every screen has an in-repo mockup ([inv] refactor specs). Sources in `docs/v2/` since spec 001, mockup fixed by spec 005, 52 PNGs (one per section, light and dark, desktop and mobile) in `docs/v2/ecrans/` since spec 004.
- [ ] Wave 0: the Wara DS SDK is upgraded from `--wara-*` (0.1.0) to the `--ws-*` version the mockup uses, before the first v2 screen spec (`product/tech-stack.md`, Hedi 2026-11-07).
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

## Debt left by the kit adoption ([inv] gap table)

- Absorbed by the v2 lines above, section by section: hex and arbitrary values in TSX, literal timings, `Primitives.tsx` split, GSAP lazy chunk, WebP images, SEO, French comments. Contact (review-agent on PR 19): privacy line, field validation and error states, focus after send, hardcoded mail subject and sender name, unused `contact.cta`.
- Outside this repo: WaraDS token requests for `--color-sink`, `--color-scrim`, `--color-bezel`, `--color-line2` (ADR 003).
- Hedi decides: the two unused fontsource packages, `inter-tight` and `space-grotesk` (`product/tech-stack.md`).
- Kit drift: `.githooks/pre-push` carries the Git LFS upload (spec 002, ADR 004); a wara-kit hook update, or `git lfs update --force`, would drop it. Request to wara-kit: an LFS-aware pre-push or a hook extension point, so this repo can return to the kit copy.

## Evolution triggers that touch the architecture

Copied from `.claude/rules/10-architecture.md`: a project needs its own URL, a section is reused elsewhere, a business rule appears, `AppContext` needs a fourth value or re-renders too much, or component tests become necessary. A line that crosses one reruns `/architecture-study` before its spec.
