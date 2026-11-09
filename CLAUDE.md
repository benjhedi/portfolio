# CLAUDE.md - Portfolio Hedi Jahouach

Read by Claude Code at the repo root. Product, read order and stack live in
`AGENTS.md`, shared with other agents; Claude Code specifics are below.

@AGENTS.md

## Rules

Always-on rules in `.claude/rules/0*.md` (working mode, challenger, read
order, writing style, git, dependencies, security, spec-driven flow).
`10-architecture.md` is this project's architecture. Rules 30 and 31 load
with `.ts`, `.tsx`, `.css` files; 50 and 60 cover tokens and mockups;
`90-project-web-stack.md` keeps Vite + React + Tailwind over Astro.

## Agents (the main session delegates; agents never delegate)

| Agent | Use it when |
|---|---|
| orchestrator | sequencing a change's tasks and checking blockers |
| planner | writing plan.md with its Gates from the repo |
| developer | building one task in the build order of the architecture rule |
| test-coder | writing the tests of the test plan; never production code |
| qa | proving the change: build, tests, screenshots, scenarios |
| review-agent | rereading the diff and the gates before merge |
| debug-agent | errors, warnings, crashes |
| setup-agent | tooling: dependencies, hooks, CI |
| design-agent | mockups and design spec; never app code |
| ds-agent | tokens and components requested from the design system |

## Skills

Product: `/plan-product`, `/analyze-product`, `/architecture-study`,
`/from-codebase`, `/init`, `/adopt`. Per change: `/specify`, `/clarify`,
`/plan`, `/tasks`, `/implement`, `/verify`. Session: `/session-start`,
`/commit`, `/adr`, `/handoff`. Design: `/design-system`, `/design-to-code`.

## Project specifics

- Brand questions: the `wara-studio-design` skill is authoritative. Never
  reintroduce v1 brand values (cream `#f7f4ed`, sky `#5fa8d9`).
- SDK 0.1.0 exposes `--wara-*`, the mockup uses `--ws-*`: upgrade first
  (roadmap wave 0, ADR 003).
- `npm ci` needs a `read:packages` token in the user `~/.npmrc`; CI uses
  the `WARA_DS_TOKEN` secret.
- Desktop sessions start on `WR/<name>`: `git branch -m <type-title>`
  before the first commit, or the hooks refuse it.
- v2 references (mockup, decision log, SEO input) live in `docs/v2/`.
- `?motion` in the URL forces animations under reduced motion, demo only.
