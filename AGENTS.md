# AGENTS.md - <Project>

Entry point for any coding agent (Claude Code imports this file; Codex,
Cline, Gemini and Copilot read it directly). Full rules: `.claude/rules/`.

## Product in one paragraph

<From product/mission.md: what it does, for whom, instead of what, and the
one product rule that is never negotiable.>

## Read before producing, in this order

1. `product/` - mission, roadmap, tech-stack, constitution
2. `.claude/rules/10-architecture.md` - the architecture this project chose
3. `README.md`, `CONTRIBUTING.md` - build commands, branches, hooks
4. `docs/adr/` - decisions taken; never reopened silently
5. `<design handoff folder>` - mockups and tokens, before any screen
6. `specs/NNN-*/` - the change in progress: spec, plan (gates), tasks

If a request contradicts these documents, flag it instead of executing it.

## How work enters this repo

Every change goes through `specs/NNN-name/`: spec with EARS acceptance
criteria, plan with a Gates section filled from the repo (mockups, tokens,
rules, architecture, verification), tasks in the construction order of the
architecture rule, then implement and verify. No code outside this flow
except a one-line fix with an obvious diff.

## Working mode

Never write code without explicit approval: what will change, why, which
files, then stop. Reading, answering and proposing options need no
approval. Before a technical solution, ask one or two questions to check
what is already known. Work from the real state of the files.

## Stack

<From product/tech-stack.md, one line each: platform and floor, language,
UI framework, persistence, generator, toolchain, tests. Architecture: see
10-architecture.md, starting level <simple / layered / modular>.>

## Conventions in short

- Technical artifacts in English; user strings in resource files;
  conversation in French.
- No hardcoded design value: tokens only. No screen without a mockup.
- Branch `type-title` off `dev` before any code; commits
  `[type-title]: message`, two sentences max, one logical change each.
- No em dashes, curly quotes, emoji or decorative bullets anywhere.
