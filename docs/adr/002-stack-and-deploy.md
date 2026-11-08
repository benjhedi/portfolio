# 002 - Vite, React, Tailwind and Cloudflare deploy on tag

## Status

Accepted. Recorded after the fact on 2026-11-08.

## Context

The site was built on Vite + React + TypeScript + Tailwind from the first
commit (4da6af5, 2026-06-02) and deployed to Cloudflare Workers the same
day (dac336a). Production moved to a tag-triggered workflow on 2026-06-03
(fe88007). The wara-kit web rule now makes Astro the default, so the gap
table (`docs/audit/inventory.md`) asked for the choice to be written down.

## Options considered

**A - Keep Vite + React + Tailwind, Cloudflare on `v*` tag**
- (+) live since v1.0.0; every section is animated and stateful (theme,
  locale, active section, hero video timing), which is React's ground
- (+) one deploy path: `release.yml` runs `npm run deploy` with the
  Cloudflare and Web3Forms secrets, then creates the GitHub Release
- (-) more JavaScript shipped than a static-first framework would

**B - Move to Astro with React islands**
- (+) less JavaScript for the static sections (about, offers, career)
- (-) a toolchain migration on top of the v2 redesign, for a page where
  most sections animate anyway

## Decision

Adopt **A**. The v2 redesign changes the sections, not the toolchain, and
the page is interactive end to end. Project rule `90-project-web-stack.md`
states the override of rule 30. Deploys stay tag-only: a push to `main`
deploys nothing.

## Consequences

Easier:
- v2 specs start on a known build, test and deploy path

Harder:
- bundle weight needs watching: GSAP goes to a lazy chunk, images to WebP
  (roadmap v2 lines)

Follow-up:
- a move to Astro is a new ADR that supersedes this one
