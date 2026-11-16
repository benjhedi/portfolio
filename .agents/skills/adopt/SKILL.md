---
name: adopt
description: >
  Brings an existing repository under the kit after analyze-product has
  written product/ and the gap table: installs the kit files without
  breaking the current flow, retires or merges the old instruction files,
  writes the entry files supported by the current host, then verifies with a
  fresh session, applicable hooks and a review run. Records remaining debt as
  refactor specs. Use it only after /analyze-product.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
---

# Adopt

Preconditions: `product/` exists with the "to validate" lines removed,
`docs/audit/inventory.md` holds the gap table, `10-architecture.md` is
drafted by `/from-codebase` or `$from-codebase` and validated. Steps in
`steps/`, read when reached; stop after each.

## Steps

1. `steps/01-install.md`: kit rules and host-supported skills or agents
   aligned with the existing ones, deliberate divergences recorded, hooks
   and CI adapted when appropriate, design material pointed to, and missing
   documents written from repository evidence.
2. `steps/02-write-entry.md`: `AGENTS.md` and, for Claude Code,
   `CLAUDE.md`; old instructions are moved into rules, ADRs or archive,
   nothing lost silently; `.kit.md` files removed after merging.
3. `steps/03-verify.md`: fresh `/next` or `$next`, applicable hooks checked,
   an independent review run, debt recorded as refactor specs in waves,
   handoff written, PR to the project's integration branch.

## Rules

- A convention the code applies consistently wins over the kit default.
  Inconsistent ones are debt, never a silent mass edit.
- Follow the branch convention found in the audit. If there is no house
  rule, branch from the repository's default branch; do not create `dev`.
- Nothing is deleted without an explicit go; retired files go to
  `docs/archive/` with a dated note.
- Secrets found are reported in one line, never copied or quoted.
- `$ARGUMENTS` may name the app folder in a multi-app repo.
