# CLAUDE.md - Hedi Benjahouach Portfolio

Read automatically by Claude Code when a session opens in this repo. Added 5 July 2026.

## Working mode - read this first

For any non-trivial change: describe what will change and why, show the plan, then wait for the go-ahead. Reading, answering, and proposing approaches do not require approval.

## Context

Portfolio of a senior freelance iOS consultant. A React animation engine paired with the Wara Studio brand and real app content. Bilingual FR / EN. Deployed on Cloudflare.

Read before producing content or touching the design:

1. `README.md` - stack, structure, animations
2. `SEO-accueil.md` - content and SEO intentions
3. `src/content/content.ts` - all bilingual content, single source

## Stack

- Vite + React + TypeScript strict + Tailwind v4.
- Motion and GSAP (ScrollTrigger) for animation. Three.js via React Three Fiber for the 3D hero, lazy-loaded (separate chunk), with a static fallback when there is no WebGL or animations are disabled.
- Design system consumed as an SDK: `@warastudio/react` and `@warastudio/theme`.
- Cloudflare deployment via `wrangler`.

```bash
npm run dev       # http://localhost:5173
npm run build     # static build in dist/
npm run deploy    # build then wrangler deploy
```

## Design system

The token source is `@warastudio/theme` and the `wara-studio-design` skill. Lift the variables, never hardcode a color or a spacing value. For any brand question (palette, type, components), refer to the `wara-studio-design` skill, which is authoritative. Do not reintroduce old brand values found in content or screenshots.

Type: Hanken Grotesk (self-hosted). Icons: Lucide.

## Content and tone

- All content lives in `src/content/content.ts`, as `{ fr, en }`. Never hardcode text in components.
- Sober, direct tone, no overselling. The site is about a real track record and real apps.
- Human style everywhere, in content and in comments. Apply the humanizer skill. Banned: em dashes, curly quotes, emoji, decorative bullets, empty filler.

## Code conventions

- TypeScript strict, no implicit `any`.
- Single-responsibility components, one file per component.
- Serious accessibility: contrast, keyboard navigation, visible focus, correct aria, sufficient touch targets, `prefers-reduced-motion` respected everywhere.
- Performance: 3D and GSAP in separate chunks, optimized images, no needless heavy dependency.
- Mobile first responsive.

## Git

Atomic commits, one logical change per commit, imperative message. Do not commit `dist/` or `wrangler` artifacts.

## When in doubt

Ask one or two questions before coding a structural solution, rather than producing directly.
