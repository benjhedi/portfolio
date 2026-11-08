---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.css"
---

# Project rule - web stack of the portfolio

Overrides one point of `30-web-conventions.md` for this repo. Source: the
kit gap table (`docs/audit/inventory.md`, 2026-11-07) and ADR 002.

## The override

Rule 30 makes Astro the default and React an island only when a client
interaction needs state. This portfolio stays a Vite + React single-page
app with Tailwind v4: the whole page is animated and stateful (theme,
locale, active section, hero video timing), it is live since v1.0.0 on
this stack, and the v2 redesign rewrites sections, not the toolchain.

## What still applies from rule 30

- TypeScript strict, one component per file, copy in `content.ts` only.
- Tokens through CSS variables from `@warastudio/theme`, never literals;
  Tailwind utilities read those variables, arbitrary values (`text-[..]`,
  `max-w-[..]`) are findings unless they compose tokens.
- `data-theme="dark"` flips everything; GSAP and any heavy motion code in
  a lazy chunk with a static path under reduced motion.
- Mobile first, Lighthouse mobile 90+, images in WebP or AVIF.

## When to revisit

A move to Astro or another framework is a new ADR that supersedes 002,
never a silent switch inside a feature spec.
