# Work flow - choose the lightest safe path

The main session owns the goal, user decisions and integration. The user
describes the outcome; the session chooses the workflow and suitable workers.
Do not make the user choose an agent by name.

Command notation in this rule: use `/name` in Claude Code and `$name` in
Codex. Each command starts a fresh session; the kit records handoff state in
project files and cannot open the next session itself.

## Choose the depth

- Small: a bounded, low-risk fix with an obvious result. Make the change,
  run its relevant check and report the diff.
- Medium: a clear change in one area. Write a short task brief with outcome,
  files, acceptance check and dependencies; implement and review it.
- Large: product, design, architecture or cross-cutting decisions. Use the
  full spec flow below.

## Context for a large change

- Standards: `.claude/rules/` (how we build). Always loaded or path-scoped;
  Codex reads the relevant files from this shared kit folder.
- Product: `product/` (what and why). `mission.md`, `roadmap.md`,
  `tech-stack.md`, `constitution.md`. Written once and updated rarely.
- Specs: `specs/NNN-feature/` (what to build next). `spec.md`, `plan.md`,
  `tasks.md`. One folder per substantial change.

The architecture is its own rule, `10-architecture.md`, written per project
by `/architecture-study` or `/from-codebase`. A repo with several apps has
one rule per app, scoped to its files. No kit file assumes an architecture.

## Full flow for a large change

1. `/specify`: user stories, acceptance criteria in EARS, out of scope,
   `[NEEDS CLARIFICATION]` markers instead of guesses.
2. `/clarify`: resolve every marker with Hedi. No open marker survives.
3. `/plan`: technical plan with the Gates section (mockups, design system,
   rules, skills, architecture rule, verification). A BLOCKED gate pauses
   only work that depends on it.
4. `/tasks`: bounded tasks with owner, file scope, dependencies, outcome and
   check. Mark `[P]` only when a task is ready and can run without overlapping
   another task's write scope.
5. `/implement`: work on all ready tasks. A task waits for its own
   prerequisites; unrelated work continues. Use separate worktrees for
   concurrent code edits when needed. Otherwise serialize overlapping edits.
6. `/verify`: check acceptance after integration. The main session owns the
   combined result; a local reviewer or QA agent can do a bounded independent
   review when useful.

The task plan is a dependency graph, not a mandatory one-by-one queue. Each
worker receives only the context needed for its task and returns the result,
files changed, checks run and unresolved issues. Claude Code may use local
kit agents; Codex may use native subagents with task-specific instructions.
The main session integrates the work and checks the combined change.

## Sessions and handoff

Run one workflow phase in one fresh session. The phase records decisions and
progress in its spec or task artifact and ends by naming the command for the
next fresh session. Use `/next` in Claude Code or `$next` in Codex only when
the current state does not make that command clear. Never rely on conversation
history to carry project state.

## Verification before done

Every task ends with a check whose result is reported: tests, build, a grep,
or a screenshot. The combined change is checked after integration. "Looks
done" is not done.
