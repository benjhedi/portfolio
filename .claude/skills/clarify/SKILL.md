---
name: clarify
description: >
  Resolves every [NEEDS CLARIFICATION] marker of a spec with Hedi, one or two
  questions at a time, finds unmarked ambiguities, rewrites the spec and
  sets it clarified. Use it after /specify, before /plan. Pass the spec number.
user-invocable: true
allowed-tools: Read, Grep, Glob, Edit, Bash(ls *)
---

# Clarify

Input: `$ARGUMENTS`, the spec number. Output: `spec.md` with zero markers,
status clarified. No plan.md exists before this skill has run.

## 1. Read the spec and hunt what it missed

Beyond the written markers, check:

- Each screen has every state the criteria imply (empty, loading, error,
  permission denied, offline when relevant).
- No two criteria contradict each other; no criterion depends on an
  undefined term (define it in the spec).
- Personal data named in the spec has its consent and retention rule.
- The mockup exists for each screen and state; otherwise the marker is
  "mockup missing", routed to design-agent, and the spec waits.
- The constitution principles the change touches are honored.

Add a marker for each finding before asking anything.

## 2. Ask, one or two at a time

Challenger mode: when Hedi answers fast, ask what makes him sure. Offer
options with their consequence on the criteria when the answer is open.
Record each answer in the spec immediately, in the criterion it changes,
not in a notes section.

## 3. Rewrite

Remove every marker, rewrite the criteria that changed, send decisions
that settle a product question to `DECISIONS.md` (or an ADR when
structural), set status clarified with the date.

## Rules

A marker is never resolved by a guess. A question Hedi defers becomes an
explicit out-of-scope line with the date it must be settled. A spec stays
under 50 lines; one that grows is two specs. Next: `/plan`.
