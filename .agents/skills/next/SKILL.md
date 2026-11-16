---
name: next
description: >
  Reads this repository's adoption records, handoff and active specs.
  Reports the next action and independent tasks ready to run in a fresh
  session. Read-only and limited to the current repository.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git *), Bash(gh pr list *)
---

# Next

Report current work, blockers, the next action and parallel-ready tasks.
Stay read-only within this repository and its available skills and agents.

## Inspect

1. Find the git root. Read its `AGENTS.md`, `CLAUDE.md` when using Claude
   Code, applicable project overrides and newest `HANDOFF.md`. Respect their
   scope throughout. List skills in `.claude/skills/` or `.agents/skills/`
   for the current host. Do not inspect global skills or agent profiles.
2. Check `product/`, `.claude/rules/10-architecture*.md`,
   `docs/audit/inventory.md`, and every non-done `specs/*/spec.md`.
3. Check active specs' plans, tasks, branches and any recently completed
   spec tied to the current branch.
   Read `git status --short`, local branch state and, if `gh` is configured,
   PR state. Otherwise report PR state as unknown; never infer it locally.

## Choose the main next step

First compare the dated inventory with newer adoption reports, review
calibration, fresh-session checks, handoffs and local Git history. A completion
marker or validated adoption report supported by these records establishes
adoption. Installed files or a merge alone are insufficient. Resolved audit
gaps are historical. For conflicting evidence, report the uncertainty and
one targeted check. A missing marker alone never restarts onboarding.
Respect project overrides. Once adoption is complete, skip onboarding routes.

- Existing code still needing product or audit validation: `analyze-product`.
- New project, no product context: `plan-product`.
- Existing code, product context but no architecture rule: `from-codebase`.
- New project, product context but no architecture rule: `architecture-study`.
- Validated audit and architecture, adoption work still incomplete: `adopt`.
- New project missing build instructions or basic tooling: `init`.
- Active spec is draft or has open clarification markers: `clarify <number>`.
- Clarified spec has no plan: `plan <number>`; no tasks: `tasks <number>`.
- Tasks remain unchecked: `implement <number>`.
- All tasks checked but verification is missing or not PASS: `verify <number>`.
- No active spec and user has a feature request: `specify`.

If a plan gate is BLOCKED, report its owner and recommend only work that does
not depend on that gate. Only recommend skills present in the current host's
project skill directory (`.claude/skills/` or `.agents/skills/`).
For multiple active specs, list blockers and ready tracks with disjoint scopes.
Ask for priority only when files, decisions or resources compete. For missing
commands, name the kit module. Bounded fixes can use `07-sdd-flow.md` directly.

## Find parallel-ready tasks

Report up to three tasks with completed dependencies and disjoint file or
research scopes, using `[P]`, owners, scopes and checks in `tasks.md`.
Titles alone are insufficient. If facts are missing, report readiness as
unknown. This skill does not dispatch work.

## Report

Keep the response under fifteen lines:

```text
STATE: ...
ACTIVE: ...
BRANCH / PR: ...
BLOCKERS: ...
NEXT: host-specific skill command - reason (run in a fresh session)
PARALLEL READY: task - owner/role - scope - check; or none
```

Say `NEXT: describe the desired outcome` when no work is active. Format the
command as `/skill-name` in Claude Code or `$skill-name` in Codex.
