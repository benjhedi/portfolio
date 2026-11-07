---
name: handoff
description: >
  Writes or updates the handoff that lets the next session resume without
  guessing: state of dev, shipped, next steps, open decisions, pitfalls,
  from the real git state. Use it at the end of a session or before a pause
  of more than a day.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(git *), Bash(ls *)
---

# Handoff

The handoff is where a session resumes. It replaces memory, so it is written
from verified state, not from recollection. Template: `template.md`.

## 1. Collect the real state

`git branch --show-current`, `git status --short`, `git log dev..HEAD
--oneline`, `git log -15 --oneline`, then the test command the project
declares. Record pass or fail honestly.

## 2. Write or update

File: `HANDOFF.md` at the root, or the project's existing `handoff-*.md`.
One live handoff per repo. When a chantier ends, the previous handoff is
kept for history with a line at the top saying what replaced it.

Sections, in this order: state of `dev` and of the current branch; what was
done this session (intent level, not file by file); next steps, ordered,
each with the agent or skill that does it; open decisions, each with the
options and who decides; pitfalls met, each with the workaround; commands
to resume.

## 3. Rules

- Facts only. Anything not verified is tagged "to verify".
- Decisions taken this session also go to an ADR or `DECISIONS.md`; the
  handoff links to them instead of restating them.
- Language: follow the existing handoff of the repo. For a new one, ask.
- Show the document and wait for approval before writing.

## 4. Closing line

End the session message with the one command the next session runs first
(`/session-start` plus the spec number or branch name).

`$ARGUMENTS` may name the chantier or the branch being handed off.
