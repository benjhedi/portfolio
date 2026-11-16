---
name: handoff
description: >
  Writes or updates the handoff that lets the next session resume without
  guessing: repository state, shipped work, next steps, open decisions, pitfalls,
  from the real git state. Use it at the end of a session or before a pause
  of more than a day.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(git *), Bash(ls *)
---

# Handoff

The handoff is where a session resumes. It replaces memory, so it is written
from verified state, not from recollection. Template: `template.md`.

## 1. Collect the real state

Read `git branch --show-current`, `git status --short` and
`git log -15 --oneline`. Identify the base branch from the project's
instructions or the current PR when available. Compare `<base>..HEAD` only
when that base is known and exists locally. Otherwise record it as unknown.
Run the test command the project declares and record its result.

## 2. Write or update

File: `HANDOFF.md` at the root, or the project's existing `handoff-*.md`.
One live handoff per repo. When a chantier ends, the previous handoff is
kept for history with a line at the top saying what replaced it.

Record the current branch and known base, work completed, next tasks and
their dependencies, open decisions and their owners, pitfalls and workarounds,
and the command to resume. Name locally available skills. The main session
coordinates independent tasks using the current host's available agents.

## 3. Rules

- Facts only. Anything not verified is tagged "to verify".
- Decisions taken this session also go to an ADR or `DECISIONS.md`; the
  handoff links to them instead of restating them.
- Language: follow the existing handoff of the repo. For a new one, ask.
- Show the document and wait for approval before writing.

## 4. Closing line

End with one command to run in a fresh session. Name the next phase's skill
when it is clear, otherwise use `/next` in Claude Code or `$next` in Codex.
Check that the skill is installed for this host. If it is missing, give the
next task in plain language. Record the relevant spec or branch in the handoff.

`$ARGUMENTS` may name the chantier or the branch being handed off.
