---
name: implement
description: >
  Executes specs/NNN/tasks.md: creates the branch, hands each task to its
  agent in order (developer, test-coder), reviews the diff after each,
  commits in the house format, ends with qa verify and review-agent. The
  main session conducts; the orchestrator agent is consulted first for
  sequence and blockers. Use it after /tasks. Pass the spec number.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# Implement

Input: `$ARGUMENTS`, the spec number, tasks approved. The main session runs
this; agents receive one task each and never delegate.

## 1. Orchestrator first, then the branch

Ask the orchestrator agent for the sequence: task order, agent per task,
blockers (branch exists, mockup missing, open ADR, dev behind origin),
conventions to remind at each hand-off. It returns a plan, writes nothing.
Then `git pull origin dev && git checkout -b feat-<name> dev`; never on
dev or main; in a Cowork sandbox, hand the git commands to Hedi.

## 2. One task at a time

1. Brief the agent with exactly: the criteria it serves, the task line,
   the architecture rule, the files it may touch, the check to run.
2. The agent works, runs its check, shows the output.
3. Review the diff with Hedi (he may say "go" for a batch). `/commit`.
   Tick the box in tasks.md.
4. `[P]` tasks may run as parallel agents in separate worktrees; merge
   their commits in order.

A task that reveals a gap in the spec or the plan stops the loop:
`/clarify` or `/plan` is updated first, then the loop resumes.

## 3. Verify, review, close

qa runs `/verify`. review-agent on `git diff dev...HEAD`, gates reread;
CHANGES REQUESTED loops back to the task concerned. Then spec status done,
roadmap line checked, PR to dev with Summary and Test plan copied from
tasks.md, `/handoff` if the session ends before the merge.

Rules: no file outside the task's list (an agent that needs another file
stops and says so); composition root wiring approved separately; never
skip a check because the previous one passed.
