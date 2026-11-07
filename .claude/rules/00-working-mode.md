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
