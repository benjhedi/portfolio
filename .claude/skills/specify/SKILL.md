---
name: specify
description: >
  Starts a change: specs/NNN-<name>/spec.md with user stories, EARS
  criteria, screens and mockups, out of scope, and [NEEDS CLARIFICATION]
  markers instead of guesses. Use it for every feature, refactor or
  toolchain change. Pass the feature in a sentence.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *), Bash(git *)
---

# Specify

Input: `$ARGUMENTS`, a sentence or a roadmap line. Output: a numbered
folder and a `spec.md` that another session can plan from without this
conversation. Template: `.claude/templates/spec.md`.

## Steps

1. Preconditions: `product/` exists and `10-architecture.md` exists. If
   not, stop and name the skill to run first.
2. Number: next `NNN` in `specs/`. Name: kebab-case, two to four words.
   Branch name `feat-<name>` reserved in the header, created at
   `/implement`, not now.
3. Why: tie the change to a mission line or a roadmap line. No line to tie
   to: ask whether the roadmap needs the line first.
4. User stories by priority, then acceptance criteria in EARS, one
   testable sentence each. Prefer five precise criteria over fifteen vague
   ones. Every criterion must be checkable by a test, a grep or a
   screenshot.
5. Screens and states: list each screen with its mockup path from the
   design handoff. A missing mockup or state is a
   `[NEEDS CLARIFICATION: mockup for <screen, state>]`, never an assumption.
6. Data and rules: entities, business rules file, personal data and its
   consent fields.
7. Out of scope: write what a reader would expect and will not get.
8. Open points: every ambiguity as a marker. Do not resolve them here.

## Refactor or toolchain change

Same template. Stories become "as the maintainer, I want ... so that ...",
criteria say what stays identical (behavior, tests green, grep counts),
screens section says "none".

## Rules

No design in the spec (no file names, types or architecture: that is
`/plan`). Show the spec, wait for approval, write with status draft. Next:
`/clarify` until no marker remains.
