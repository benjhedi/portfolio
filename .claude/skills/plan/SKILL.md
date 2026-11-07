---
name: plan
description: >
  Writes specs/NNN/plan.md for a clarified spec: the mandatory Gates section
  (mockups, tokens, rules, skills, architecture, verification) filled from
  the repo, then approach, data model, contracts, risks. A BLOCKED gate stops
  the flow. Use it after /clarify. Pass the spec number.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *), Bash(find *), Bash(grep *)
---

# Plan

Input: `$ARGUMENTS`, the spec number, status clarified. Output: `plan.md`
from `.claude/templates/plan.md`, gates first. Agent: planner.

## 1. Gates, from the repo

For each gate, look before writing. Paths are evidence.

- Design system: find the package or folder; list the token files.
- Tokens: for each mockup value the screens need (font roles, background,
  radii, both themes), find the token or list it as missing.
- Mockups: for each screen and state in the spec, find the PNG. Missing:
  BLOCKED, design-agent clears it.
- Rules: list the rule files that apply (core, 07, 10-architecture, the
  platform rules whose `paths:` match the files to create, 50, 60).
- Skills to load for implementation.
- Constitution: the principles touched, and how the plan honors them.
- Architecture: the units this change needs, named as the architecture
  rule names them; the modules touched; whether the rule allows the
  boundary crossing. Not covered: BLOCKED, `/architecture-study` first.
- Verification: one check per acceptance criterion, plus the side by side
  screenshot for every screen.

## 2. Technical approach, data model, contracts

Ten lines: what is created, where (module), behind which protocol, in the
construction order the architecture rule gives; one line per alternative
rejected and why; research notes for any platform API relied upon. Then
types with fields, protocols with methods, persistence entity and mapping
when the rule separates them, personal data with consent and retention.

## Rules

Nothing in the plan contradicts the spec (a conflict goes back to
`/clarify`); no file outside the modules the architecture rule allows.
Show the plan, wait for approval, write. BLOCKED gates are reported with
who clears them and the flow pauses there. Next: `/tasks`.
