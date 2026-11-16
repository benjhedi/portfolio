# Working mode - read this first

Never write code without explicit approval.

Before touching any file, state in a few lines:

- what you intend to create or modify
- why: which rule, requirement or documented decision drives it
- which files will be affected

Then stop and wait. Hedi will ask questions or say go ahead. This applies to
everything: new files, edits, a new dependency, a data model change, a
config change. No exceptions, no "small fix" shortcut.

## Free actions

Without asking first you may:

- read files to understand the codebase
- answer questions
- propose two or three approaches with their trade-offs

## Project boundary

Treat the current git root as the full project context. Use its `AGENTS.md`,
`CLAUDE.md` when using Claude Code, and local kit skills. Claude Code may use
agents from `.claude/agents/`; Codex uses its native subagents. Do not open
another repository or use its agents, profiles or documents unless Hedi
explicitly asks this task to use them. User-level Claude and Codex skills are
global extensions, not kit dependencies. Do not inspect their contents. If a
global skill visibly conflicts, stay with this project's workflow and report
the clash.

## Fresh sessions and durable state

- Start each phase in a fresh session using the host tool. Read the current
  repository state and phase artifact. Use `/name` in Claude Code or `$name` in Codex.
- Record decisions and progress in the phase artifact. Name one command for
  the next fresh session and stop. Choose `next` if the next action is unclear.

## Coordinating work

- The main session owns the goal, user decisions, task assignment and final
  integration. The user describes the outcome; they do not need to select an
  agent by name.
- Delegate only bounded work with a clear outcome, owner, file or research
  scope, dependencies and acceptance check.
- Parallelize tasks only when their dependencies are satisfied and their
  write scopes do not overlap. Use separate worktrees when concurrent code
  edits need isolation; otherwise sequence the edits.
- Keep dependent work moving independently where possible. A blocked task
  does not block unrelated tasks. The main session integrates the results and
  checks the combined change.
- Use agents supported by the current tool. Codex subagents receive a bounded
  task prompt; Claude Code may use local profiles. If delegation is unavailable
  or unsuitable, the main session does the work without inventing an agent.
  Treat role names in shared kit instructions as responsibilities; map them to
  the current host's available worker and pass the relevant task instructions.

## Incremental delivery

- One step at a time. Validate the direction before widening the scope.
- Work from the real, confirmed state of the files. If unsure about the
  current state, check before acting; never act from a stale memory.
- Flag an ambiguity before acting instead of assuming.
- Never silently remove or change a documented decision (README, ADR,
  design spec, CONTRIBUTING). If the task contradicts one, stop and say so.
- Separate verified facts from hypotheses; mark estimates as estimates.

## Approval phrases

"Attends mon approbation" or "wait for my approval" blocks every action until
an explicit go. "Go", "ok vas-y", "go ahead" releases the step just
described, not the steps after it.

## In Cowork sessions

Git in the Cowork sandbox leaves a `.git/index.lock` behind. There: at most
one git operation per session, and preferably hand the commands to Hedi to
run from his terminal. In Claude Code the agents run git themselves.
