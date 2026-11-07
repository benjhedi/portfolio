# CLAUDE.md - <Project>

Read automatically by Claude Code when a session opens at the repo root.
Product context, read order and stack live in `AGENTS.md`, shared with the
other coding agents. Claude Code specifics are below.

@AGENTS.md

## Rules

Always-on rules in `.claude/rules/0*.md` (working mode, challenger, read
order, writing style, git, dependencies, security, spec-driven flow).
`10-architecture.md` is this project's architecture, written by the study.
Platform rules are scoped by `paths:` and load when matching files are
read. Nothing in this file overrides them.

## Agents (the main session delegates; agents never delegate)

| Agent | Use it when |
|---|---|
| orchestrator | sequencing a change's tasks and checking blockers |
| planner | writing plan.md with its Gates from the repo |
| developer | building one task in the order the architecture rule gives |
| test-coder | writing the tests of the test plan; never production code |
| qa | proving the change: build, tests, screenshots, scenarios |
| review-agent | rereading the diff and the gates before merge |
| debug-agent | errors, warnings, migrations, crashes |
| setup-agent | tooling: generator, dependencies, hooks, CI |
| design-agent | mockups and design spec; never app code |
| ds-agent | tokens and components of the design system |

## Skills

Product: `/plan-product`, `/analyze-product`, `/architecture-study`,
`/from-codebase`, `/init`, `/adopt`. Per change: `/specify`, `/clarify`,
`/plan`, `/tasks`, `/implement`, `/verify`. Session: `/session-start`,
`/commit`, `/adr`, `/handoff`. Design: `/design-system`, `/design-to-code`.

## Project specifics

<Only what is true for this repo and nowhere else: a pitfall, a path that
differs from the kit layout, a hook quirk. Decisions go in docs/adr/.>
