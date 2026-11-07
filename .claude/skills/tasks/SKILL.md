---
name: tasks
description: >
  Turns an approved plan into specs/NNN/tasks.md: ordered bounded tasks in
  the architecture rule's construction order, each with files, check and
  agent, plus one test row per EARS criterion, [P] when parallel. Use it
  after /plan. Pass the spec number.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *)
---

# Tasks

Input: `$ARGUMENTS`, the spec number, plan with all gates OPEN. Output:
`tasks.md` from `.claude/templates/tasks.md`. Also the test-planning step.

## 1. Construction order

Read the units and order in `.claude/rules/10-architecture.md`. Typical
shapes: types and protocols, then adapters, then logic units, then state
holder, then screen, then wiring. A simple architecture yields fewer
tasks; never add a unit the rule does not name.

## 2. One task, one commit, one check

For each task: what, the files (paths that respect the module map), the
check the agent runs and shows (build, filtered test, grep, preview), the
agent (developer, test-coder, qa, review-agent). Tasks under forty lines
of change where possible; a bigger one is split.

Wiring into the composition root or its equivalent is its own task,
marked "approved separately", last before verify.

## 3. Test plan from the criteria

One row per acceptance criterion: scenario in plain words, type (unit on
which unit, UI, snapshot, manual with who), test name in the house
convention (verb, condition, result). A criterion with no testable row is
sent back to `/clarify`. Rows become test-coder tasks placed right after
the unit they test, not at the end.

## 4. Parallelism and close

`[P]` only when two tasks share no file and no ordering constraint; each
names its worktree if the project uses them. The last two tasks are always
qa verify (criterion checks green, screenshots side by side) and review
(diff against dev, gates reread). "Done when" lists the four conditions
from the template. Show the list, wait for approval, write. Next:
`/implement`.
