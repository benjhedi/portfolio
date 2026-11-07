---
name: analyze-product
description: >
  Builds the product layer of an existing repository from what is already
  there (README, specs, roadmap, decisions, git history, code):
  product/mission.md, roadmap.md, tech-stack.md, constitution.md marked to
  validate, plus the inventory and gap table /adopt needs. Read-only until
  Hedi approves each file. Use it on any repo that predates the kit or that
  Hedi joins.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *), Bash(find *), Bash(git *), Bash(grep *)
---

# Analyze product

The repo describes itself. This skill reads it and writes `product/` from
evidence, never from assumptions. Steps in `steps/`.

## 1. Inventory, read-only

`steps/01-inventory.md`: layout, instruction files, documents, git
conventions in use, toolchain, dependencies, secrets present, design
material. Output: `docs/audit/inventory.md`, facts with paths.

## 2. Extract the product layer

- mission.md from README, brief, specs, store listing, client documents;
  each line cites its source. Unknowns stay `[NEEDS CLARIFICATION]`.
- roadmap.md from the existing roadmap, issues, TODOs, handoff documents,
  and the features visible in the code (shipped lines checked).
- tech-stack.md from manifests and code: real versions, real dependencies
  with the module that imports them.
- constitution.md from the non-negotiables found in instruction files and
  decisions (for example "a missed day is never red").

Every file starts with `Extracted on <date>, to validate.`

## 3. Architecture, gap table, validation

Hand off to `/from-codebase`, which infers the three axes from the code
and drafts `10-architecture.md`; record what is, judge nothing. Then
`steps/02-gap-table.md`: each kit rule marked aligned, divergent with
reason, or absent. Then validate with Hedi one file at a time, three
sentences each, markers as questions; remove the "to validate" line only
after an explicit go.

Rules: facts with evidence; a convention the code applies consistently
wins over the kit default; secrets found are reported in one line, never
copied; `$ARGUMENTS` may name the app folder. Next: `/adopt`.
