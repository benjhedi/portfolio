---
name: tasks
description: >
  Turns an approved plan into specs/NNN/tasks.md: bounded tasks with explicit
  dependencies, responsibility, file scope and checks. Marks independent
  ready tasks for parallel work. Use after /plan. Pass the spec number.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *)
---

# Tasks

Input: `$ARGUMENTS`, the spec number, plan with all gates OPEN. Output:
`tasks.md` from `.claude/templates/tasks.md`. Also the test-planning step.

## 1. Define work units

Read the architecture rule and split the approved plan into bounded tasks.
Respect real dependencies; do not impose a full serial order just because
tasks appear in a sequence. Avoid units not named by the architecture rule.

## 2. Record scope and dependencies

For every task record: outcome, acceptance, files or research scope, owner,
check, and `depends on` task IDs (or `none`). Owner is a responsibility such
as `main`, `implementation`, `test-writing`, `design` or `review`, not a
required agent profile. The main session maps that responsibility to a local
Claude agent or a Codex native subagent when useful. Otherwise it does the
task itself. Split work that is too large for one clear owner or check.

Mark `[P]` when, after its listed dependencies are complete, a task can run
with another ready task without overlapping write scopes. The marker does
not remove dependencies. If tasks need the same files, sequence them or use
separate worktrees with a clear integration step. Composition-root wiring is
a separate task and stays gated if the approved plan requires it.

## 3. Derive checks from acceptance

Include one test-plan row per acceptance criterion: scenario, test type and
name. Create test implementation tasks where code tests are needed; they
depend on the production tasks they test and own separate test files. A
criterion without a check returns to `/clarify`. Make verification and review
depend on the implementation tasks they need to inspect.

## 4. Approval and handoff

Always include integration, verification and diff review. Show the complete
task graph and wait for approval before writing `tasks.md`. After approval,
start `/implement` in Claude Code or `$implement` in Codex in a fresh
session. It may start ready independent tasks together when the host supports
safe delegation.
