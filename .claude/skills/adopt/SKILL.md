---
name: adopt
description: >
  Brings an existing repository under the kit after /analyze-product has
  written product/ and the gap table: installs the kit files without
  breaking the current flow, retires or merges the old instruction files,
  writes AGENTS.md and CLAUDE.md from the real repo, then verifies with a
  fresh session, the hooks and a review run. Records the remaining debt as
  refactor specs. Use it only after /analyze-product.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
---

# Adopt

Preconditions: `product/` exists with the "to validate" lines removed,
`docs/audit/inventory.md` holds the gap table, `10-architecture.md` is
drafted by `/from-codebase` and validated. Steps in `steps/`, read when
reached; stop after each.

## Steps

1. `steps/01-install.md`: kit rules and agents merged with the existing
   ones, deliberate divergences written as project rules
   (`9N-project-<topic>.md`), hooks and CI added or adapted, settings
   trimmed, design material pointed to, missing documents written from
   what the history really shows.
2. `steps/02-write-entry.md`: `AGENTS.md` and `CLAUDE.md` from `product/`
   and the inventory; old `CLAUDE.md` content split into rules, ADRs or
   archive, nothing lost silently; `*.kit.md` removed; `.cursorrules` and
   the like reduced to a pointer.
3. `steps/03-verify.md`: fresh `/session-start`, hooks tested, review-agent
   run on a recent branch, debt recorded as refactor specs in waves,
   handoff written, PR `chore-adopt-kit` to dev.

## Rules

- A convention the code applies consistently wins over the kit default.
  Inconsistent ones are debt, never a silent mass edit.
- Branch `chore-adopt-kit` off `dev` (or `main` when `dev` does not exist;
  creating `dev` is then the first item of step 1).
- Nothing is deleted without an explicit go; retired files go to
  `docs/archive/` with a dated note.
- Secrets found are reported in one line, never copied or quoted.
- `$ARGUMENTS` may name the app folder in a multi-app repo.
