# AGENTS.md - Portfolio Hedi Jahouach

Entry point for any coding agent (Claude Code imports this file; Codex,
Cline, Gemini and Copilot read it directly). Full rules: `.claude/rules/`.

## Product in one paragraph

A one-page bilingual FR / EN site where a prospect sees that Hedi Jahouach,
senior freelance iOS consultant, designs and builds iOS apps from idea to
production, checks it against real apps he shipped, and starts a project
with him. v1.6.0 is live on Cloudflare; the v2 redesign follows
`product/roadmap.md`. Never negotiable: the site shows "Hedi Jahouach"
only, never mentions Wara Studio, and every text comes from
`src/content/content.ts` (`product/constitution.md`).

## Read before producing, in this order

1. `product/` - mission, roadmap, tech-stack, constitution
2. `README.md`, `CONTRIBUTING.md` - commands, branches, hooks, releases
3. `.claude/rules/10-architecture.md` and `90-project-web-stack.md`, `docs/adr/`
4. Before any screen: `docs/v2/` (README with one section per screen,
   mockup, decision log) and its PNGs in `docs/v2/ecrans/`
5. `specs/NNN-*/` - the change in progress, when one exists: spec, plan, tasks

Evidence behind 1 and 3: `docs/audit/inventory.md`, `docs/architecture-study.md`.
If a request contradicts these documents, flag it instead of executing it.

## How work enters this repo

Every change goes through `specs/NNN-name/`: spec with EARS acceptance
criteria, plan with a Gates section filled from the repo (mockups, tokens,
rules, architecture, verification), tasks in the build order of the
architecture rule, then implement and verify. No code outside this flow
except a one-line fix with an obvious diff.

## Working mode

Never write code without explicit approval: what will change, why, which
files, then stop. Reading, answering and proposing need no approval. Ask
one or two questions before a technical solution; work from the real files.

## Stack

- Web, one page, Node 22; Vite 6, React 18, TypeScript strict, Tailwind v4 (ADR 002).
- Motion and GSAP for animation; Lucide icons; Hanken Grotesk and JetBrains Mono self-hosted.
- Tokens and form components: `@warastudio/theme`, `@warastudio/react`, GitHub Packages (ADR 003).
- Tests: Vitest, node environment, pure units and service adapters (ADR 001).
- Deploy: Cloudflare via `wrangler` on a `v*` tag (`.github/workflows/release.yml`).
- Architecture: view-owned state, light dependency rule, one package by feature, level simple.

## Conventions in short

- Technical artifacts in English, site copy in `content.ts`, chat in French.
- No hardcoded design value: SDK tokens only. No screen without a mockup.
- Branch `type-title` off `dev` (rename the app's `WR/` branch first);
  commits `[type-title]: message`, two sentences max, one logical change each.
- `npm test` and `npm run build` pass before a PR to `dev`; a screen change
  gets an axe or Lighthouse audit and a keyboard pass.
- No em dashes, curly quotes, emoji or decorative bullets anywhere.
