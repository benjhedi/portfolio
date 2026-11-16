---
name: implement
description: >
  Executes approved tasks from specs/NNN/tasks.md. Starts independent ready
  tasks together when the tool and workspace support safe parallel work.
  Integrates results and hands off to verification. Pass the spec number.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# Implement

Input: `$ARGUMENTS`, the spec number, tasks approved. The main session owns
the work and may delegate bounded tasks to agents supported by the current
host.

## 1. Check blockers, then the branch

Read the spec, plan, tasks, project architecture and current git
conventions. Check for open gates, missing mockups, unresolved decisions,
and an existing branch. Consult a local orchestrator only when one exists
and task order or blockers are genuinely unclear. Follow this repository's
branch convention; do not assume a `dev` branch. In a Cowork sandbox, hand
git commands to Hedi.

## 2. Work from the dependency graph

1. Find unchecked tasks whose dependencies are complete. Report the ready
   set, owners, file scopes and checks before starting.
2. Start independent tasks together only when the current tool supports
   delegation and their write scopes do not overlap. Use separate worktrees
   for concurrent code edits when needed; otherwise serialize overlapping
   tasks. Never let two workers edit the same file at once.
3. Give each worker the task outcome, acceptance, dependencies, allowed files
   and check. Claude Code may use local kit agents; Codex may use native
   subagents. If delegation is unavailable or not useful, the main session
   handles the task.
4. Collect each result and check. Mark completed tasks in `tasks.md` and
   unlock their dependents without waiting for unrelated work to finish.
5. If one task reveals a gap, stop that task and its dependents. Continue
   other ready tasks unless they rely on the same decision or files. Update
   the affected spec or plan through `/clarify` or `/plan` before resuming.

Do not exceed the approved task files. Composition-root wiring stays gated
when the plan marks it for separate approval. `/commit` follows the project's
conventions and the user's approved scope.

## 3. Integrate and hand off

Integrate worktrees and review the combined diff. Record changed files,
checks, completed tasks and unresolved issues. Name `/verify <number>` in
Claude Code or `$verify <number>` in Codex as the next command for a fresh
session; do not run another workflow command in this session. Verification
and closure follow the project's branch and PR rules.

Rules: no file outside the task's list (an agent that needs another file
stops and says so); composition root wiring approved separately; never
skip a check because the previous one passed.
