---
name: start
description: >
  Onboards the current repository to the kit. Identifies a new project,
  an existing project, or an existing project with AI evidence, then reports
  the shortest suitable next command. Use when first applying the kit.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git *)
---

# Start

Classify this repository, cite evidence and name one next command for a fresh
session. Stay read-only within this repository and its available agents.

## Inspect this repository

1. Find the git root and read its `AGENTS.md`, `README.md`, product context
   and `HANDOFF.md` if present. Read `CLAUDE.md` when using Claude Code.
   Read applicable project overrides and respect their scope throughout.
2. Inspect the top-level layout, build manifests, test folders, existing
   specs, local rules, and the skill directory for the current host.
3. Look for AI evidence in SDKs, model calls, prompts, embeddings/vector
   search, agent frameworks and architecture or product docs. Cite paths or
   manifests, never secret values. With no matches, report
   `no AI evidence found in inspected files`.
4. Read `git status --short` and the current branch. Do not inspect another
   repository, personal global profiles, or files outside this git root.

## Classify and route

Compare the dated inventory with newer adoption reports, review calibration,
fresh-session checks, handoffs and local Git history. A completion marker or
validated adoption report supported by these records establishes adoption.
Installed files or a merge alone are insufficient. Resolved audit gaps are
historical. If evidence conflicts, name the uncertainty and one targeted
check. A missing marker alone never restarts onboarding.

- **Kit already adopted:** skip onboarding routes. Recommend `next` or, when
  current work is clear, the command for that task.
- **New project with no product context:** recommend `plan-product`.
- **New project with product context but no architecture rule:** recommend
  `architecture-study`. If product and architecture are ready but setup is
  incomplete, recommend `init`.
- **Existing project missing product context or audit inventory, or with an
  unvalidated audit:** recommend `analyze-product`.
- **Existing project with validated product context and audit but no
  architecture rule:** recommend `from-codebase`.
- **Existing project with validated audit and architecture but no completed
  adoption:** recommend `adopt`.
- **Existing project with AI evidence:** follow the existing-project route
  above. Briefly inventory providers/models, prompts/tools, data flow,
  evaluation, cost and safety questions. Mark unknowns. Do not assume AI
  should be added or removed.

Check that a recommended skill exists in the current host's project skill
directory: `.claude/skills/` in Claude Code or `.agents/skills/` in Codex.
If missing, name the module. Keep user-level skill and agent directories
outside this inspection. Report uncertain product or setup evidence.
This skill does not dispatch work.

## Report

Keep the response under twelve lines:

```text
PROJECT: new / existing
KIT: not adopted / partly adopted / adopted
AI: evidence with paths / none found in inspected files / unclear
STATE: one short sentence
NEXT: host-specific skill command - reason (run in a fresh session)
PARALLEL READY: none, unless independently scoped tasks are already recorded
```

In Claude Code, format the next command as `/skill-name`; in Codex, use
`$skill-name`. If the host is unclear, report the skill name and say to run
it in the host's syntax. If the user supplied a concrete task, report the
onboarding route and the task's next command. A fresh session starts from
repository files; do not depend on the conversation that invoked this skill.
