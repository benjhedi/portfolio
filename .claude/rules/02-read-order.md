# Read order - before producing anything

Every project declares in `AGENTS.md` an ordered list of documents to read
before producing. The order is the priority: when two documents disagree,
the earlier one wins until the later one is explicitly updated.

## Standard order

1. `product/`: mission, roadmap, tech-stack, constitution
2. `README.md` and `CONTRIBUTING.md`: build commands, branches, hooks
3. `.claude/rules/10-architecture.md` and `docs/adr/`: decisions taken
4. The design spec or handoff folder, when the task touches UI
5. The handoff document (`HANDOFF.md` or `handoff-*.md`), when resuming work
6. The spec, plan and tasks of the change in progress (`specs/NNN/`)

## What to do with what you read

- Confirm you have read each document when `/session-start` asks for it.
- Identify which packages, features or layers the task touches.
- For a technical choice, check the ADRs first. A decision already recorded
  is not reopened silently; if the task needs to reopen it, say so and
  propose a new ADR.
- If a request contradicts a document, flag the contradiction and stop.
  Do not pick a side on your own.

## Hierarchy of truth

Business rules written by Hedi (for example `regles-metier-*.md`) override
mockups. Mockups override the code. The code never silently overrides a
document: when they diverge, either the code is wrong or the document is
updated first, explicitly.

## Paths

Verify a path exists before citing it. Repo layouts differ (an iOS app may
live under `Apps/<Name>-iOS/`, a POC under `POC/`). Opening Claude Code at
the wrong level loads the wrong `CLAUDE.md`; when a repo has several, the
root one says where to open.
