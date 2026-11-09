# Portfolio, Hedi Jahouach

One-page bilingual (FR / EN) portfolio of a senior freelance iOS
consultant: real track record, real app screenshots. v1.6.0 is live; the
v2 redesign is planned in `product/roadmap.md`.

## Stack

Vite 6, React 18, TypeScript strict, Tailwind v4, Motion, GSAP, Lucide.
Tokens and form components from the Wara DS SDK (`@warastudio/theme`,
`@warastudio/react`). Tests with Vitest. Deployed to Cloudflare on a `v*`
tag. Choices and versions: `product/tech-stack.md` and `docs/adr/`.

## Start

```bash
npm ci             # needs a GitHub Packages token, see CONTRIBUTING.md
npm run dev        # http://localhost:5173
npm test           # Vitest
npm run build      # static build in dist/
```

## Layout

- `src/content/content.ts`: all copy and data, bilingual `{ fr, en }`, the
  single source.
- `src/index.css`: Tailwind names aliased to the SDK variables.
- `src/app/`: locale, theme, reduced-motion preference.
- `src/components/`: v1 sections. v2 moves them to `src/sections/<name>/`
  one spec at a time (`.claude/rules/10-architecture.md`).
- `public/`: hero video, app screenshots, client logos.

## Motion

The hero plays a looping background video. Project blocks are pinned on
scroll (GSAP ScrollTrigger); screenshots move with the scroll and sections
reveal in view (Motion). Everything respects `prefers-reduced-motion`;
`?motion` in the URL forces animations for a demo.

## Working on it

Read `AGENTS.md` first, then `CONTRIBUTING.md` for branches, commits and
releases. App screenshots are supplied by Hedi; publish only those he is
allowed to show.
