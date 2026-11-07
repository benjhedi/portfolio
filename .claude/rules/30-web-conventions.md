---
paths:
  - "**/*.ts"
  - "**/*.tsx"
  - "**/*.astro"
  - "**/*.css"
---

# Web conventions

Hedi's web stack is deliberately light: Astro for sites, Vite + React only
where an interaction justifies it, plain CSS with design tokens. He prefers
simple HTML and CSS without a framework when the need allows it. Propose
the simplest option first.

## Language and structure

- TypeScript strict, no implicit `any`, no `@ts-ignore` without a comment.
- Single-responsibility components, one file per component, named after
  the component.
- Astro by default; a React island only when a client interaction needs
  state, never by default.
- All copy in one content source (`content.ts` or a `content/` folder) as
  `{ fr, en }` (and `ar` when the site is trilingual). Never hardcode text
  in a component.
- RTL from the structure: CSS logical properties, `dir="rtl"`, reversed
  directional animations, when Arabic is in scope.

## Styling

- Design tokens through CSS variables (`--ws-*` for Wara DS) or the theme
  contract (`vars.*` in a design system package). No hardcoded color,
  spacing, radius or duration. A missing token is added to the design
  system, with its source, not improvised locally.
- Dual theme: `data-theme="dark"` flips everything; every component reads
  variables so the flip is free.
- No Tailwind inside a design system package. Allowed in a consumer site
  that already uses it (Portfolio), never introduced in a new one without a
  decision.
- Containment by border or surface contrast, not shadow, unless the design
  system says otherwise.

## Performance, SEO

Mobile first; Lighthouse 90+ on mobile for a showcase site. 3D (Three.js,
R3F) and GSAP in separate lazy chunks with a static fallback when WebGL is
absent or motion is reduced. Images in AVIF or WebP, sized. Meta
descriptions, Open Graph, sitemap, `hreflang` per language, branded
favicon. Content tone: sober and direct, no overselling.
