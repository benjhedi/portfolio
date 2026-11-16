---
name: adr
description: >
  Writes or evaluates an Architecture Decision Record in docs/adr/ (Status,
  Context, Options, Decision, Consequences). Use it when a technical choice
  is made, reopened, or revealed by a bug. Pass the title.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *)
---

# ADR

An ADR records a decision and the reasons, so a future session does not
reopen it by accident. Template: `template.md` in this folder.

## When to write one

- A new dependency, generator, toolchain or build setting.
- A choice between two architectures or persistence strategies.
- A rule in `AGENTS.md` or `.claude/rules/` that the code contradicts
  (see ADR 005 in Chaland: the pure Domain versus `@Model` conflict).
- A decision Hedi made that the code should never silently undo.

## Steps

1. `ls docs/adr/` to take the next zero-padded number. Title in kebab-case:
   `NNN-short-title.md`.
2. Fill the template. Options considered: at least two, each with plus and
   minus lines. The decision names the decisive reasons, specific to this
   stack, not generic.
3. Consequences: what becomes easier, what becomes harder, follow-ups
   (which document to update).
4. Show the full ADR and wait for approval before writing the file.
5. After writing, list the documents that must change to stay consistent
   (`AGENTS.md`, README snippets, rules) and propose those edits separately.

## Reopening a decision

Do not edit an accepted ADR's decision. Write a new ADR that supersedes it
and set the old one's status to `Superseded by NNN`.

## Style

English, humanizer rules. Plain hyphens. Short paragraphs over long lists.
A project may keep an older typographic house style for its existing ADRs;
when `AGENTS.md` says so, match it for visual consistency.

Argument: `$ARGUMENTS` is the working title.
