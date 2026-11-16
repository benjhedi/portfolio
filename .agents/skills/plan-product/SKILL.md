---
name: plan-product
description: >
  Creates the product layer of a new project (product/mission.md,
  roadmap.md, tech-stack.md, constitution.md) by interviewing Hedi one or
  two questions at a time. Use it once, at the start of a new product or
  client POC, before any spec; for an existing codebase use
  /analyze-product. Writes nothing before each document is read back and
  approved.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *), Bash(git *)
---

# Plan product

Run once. Output: the four files of `product/`, from `.claude/templates/`. Then
`/architecture-study`, then the first `/specify`.

## 1. Interview, one or two questions at a time

Mission first: what it does, for whom, instead of what; the one
non-negotiable rule; the situation (new, taken over, study or POC, client
or own). Then users and the problem, differentiators (three at most), out
of scope, success in one year. When `$ARGUMENTS` or an attached brief
already answers, confirm in one line and move on.

## 2. Roadmap, tech stack, constitution

Roadmap: features as user outcomes, an order with its reason (the spine of
the product first), mockup-needing lines marked, unvalidated ideas parked
with the reason. Tech stack: facts only (platform and floor, language, UI
framework, persistence, generator, toolchain, dependencies with owners,
design system, tests, deployment); the architecture line points to
`10-architecture.md`, written by the study; a debated choice gets `/adr`.
Constitution: product principles from the mission's non-negotiables plus
the kit's engineering principles, seven lines, not seventeen.

## Rules

- Read each document back in three sentences; ask what Hedi would not
  sign today; write only after the go.
- Challenger: when a feature looks obvious, ask who needs it and why now.
- Client POC: closed scope list, deliverable form and budget frame go in
  mission.md under Context; client documents carry no technical solution.
- Language of `product/`: ask. English for outside readers, French for a
  client document kept in the repo.

Done when the four files exist, `AGENTS.md` read order points at them, and
the handoff names `/architecture-study` as the next step.
