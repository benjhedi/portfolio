# Web design system package

Model: `WaraDS-Web`. A pnpm monorepo publishing scoped packages, consumed by
the sites as a styling layer only (routing, 3D and animation libraries of
the consumer do not change).

## Layout

```
packages/
  tokens/   @<scope>/tokens   DTCG JSON source, Style Dictionary outputs (CSS, JSON, Swift)
  theme/    @<scope>/theme    vanilla-extract contract and themes, exposes vars.*
  react/    @<scope>/react    components, .css.ts styles, compiled CSS
  motion/   @<scope>/motion   duration and easing presets for Motion and GSAP
  icons/    @<scope>/icons    optional, Lucide as React components
docs/
  00-overview.md  01-architecture.md  02-tokens.md  03-conventions.md
  04-roadmap.md (ordered tickets)  05-open-decisions.md
```

## Stack, decided

TypeScript, React 18.3, Vite library mode or tsup, tree-shakeable ESM,
vanilla-extract (no Tailwind, zero runtime CSS-in-JS), Style Dictionary,
pnpm workspaces + Turborepo, private npm on GitHub Packages, Changesets.

## Rules

- No hardcoded value in a component: everything through `vars.*` from the
  theme. A token absent from the contract is a compile error.
- Every component covers default, hover, focus, active, disabled, loading,
  error. WCAG 2.1 AA. Motion through the motion tokens, reduced motion
  respected.
- `data-theme="dark"` flips everything; components never branch on theme.
- Each commit touching a published package goes through a changeset.
- Work ticket by ticket from `docs/04-roadmap.md`; a ticket is done when its
  acceptance criteria pass, not before.

## Preview, export, interim

A `preview/` folder holds one HTML page per token group and component
family (colors, type scale, spacing, radii, buttons, inputs, cards, badges,
modal, glass): the visual regression reference and the handoff material.
`export-figma-tokens.mjs` writes the token JSON Figma imports; run it on
every token change. Before the packages exist, a site lifts the CSS
variables from `colors_and_type.css`; the migration to the package is a
styling-only ticket.
