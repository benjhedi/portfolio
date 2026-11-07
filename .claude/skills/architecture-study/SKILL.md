---
name: architecture-study
description: >
  Chooses a project's architecture from its situation and needs, never from
  a default: presentation pattern, dependency rule and modularity are three
  independent axes composed per project, with a starting level and written
  re-evaluation triggers. Produces docs/architecture-study.md and
  .claude/rules/10-architecture.md. Use it on a new project, when adopting a
  repo, or when a trigger fires; a POC gets the same discipline, shorter.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *), Bash(find *), Bash(git *)
---

# Architecture study

Architecture is an output of the study, never an input. Steps in `steps/`,
one approval each. Options library in `options/` next to this file; output
template `.claude/templates/10-architecture.md`.

## The three axes, kept separate

1. Presentation pattern: how a screen is split, who owns state and
   navigation (`options/presentation/`).
2. Dependency rule: what may import what, where rules live, protocols at
   which boundaries (`options/dependencies/`).
3. Modularity: how code is packaged, which boundaries the compiler
   enforces (`options/modularity/`).

Any pattern combines with any rule and any modularity; the study picks
one option per axis and says why, never a bundle.
## Steps

1. `steps/01-situation.md`: new, taken over, study or POC; who touches the
   code; lifetime; platforms; what exists.
2. `steps/02-needs.md`: screens and navigation depth, data and sync,
   testability, team, deadline, second platform, SDKs, client constraints.
3. `steps/03-options.md`: two or three compositions with cost now, cost
   later, and the trigger that would make each wrong. Challenger mode.
4. `steps/04-decision.md`: Hedi picks; rule written with starting level
   and triggers; roadmap gets the triggers; handoff notes the study.

## Rules

Starting simple is legitimate when written with its triggers; starting
modular "to be safe" needs a visible trigger. For a taken-over repo, run
`/from-codebase` first; the study then asks keep, evolve or migrate, and
respects the existing code by default. The platform changes the idioms,
not the axes. Traps to raise: a pattern mistaken for an architecture;
Clean without a domain to protect; modules cut by technology.
