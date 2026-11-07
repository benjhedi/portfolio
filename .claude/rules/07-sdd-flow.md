# Spec-driven flow - how work enters this repo

Specifications are the primary artifact; code realizes them. Nothing is
implemented outside this flow. The main session conducts: it runs the
sequence and delegates bounded work to `.claude/agents/`; agents never delegate.

## Three layers of context

- Standards: `.claude/rules/` (how we build). Always loaded or path-scoped.
- Product: `product/` (what and why). `mission.md`, `roadmap.md`,
  `tech-stack.md`, `constitution.md` (the product's non-negotiables).
  Written once by `/plan-product` or `/analyze-product`, updated rarely.
- Specs: `specs/NNN-feature/` (what to build next). `spec.md`, `plan.md`,
  `tasks.md`. One folder per change, numbered, named in kebab-case.

The architecture is its own rule, `10-architecture.md`, written by
`/architecture-study` or `/from-codebase`. A repo with several apps has one
per app, `10-architecture-<app>.md`, scoped by `paths:` to that app's folder;
wherever the kit says `10-architecture.md`, read the one covering the files
at hand. No kit file assumes an architecture.

## The sequence, per change

1. `/specify`: user stories, acceptance criteria in EARS, out of scope,
   `[NEEDS CLARIFICATION]` markers instead of guesses.
2. `/clarify`: resolve every marker with Hedi. No open marker survives.
3. `/plan`: technical plan with the mandatory Gates section (mockups,
   design system, rules, skills, architecture rule, verification).
   A gate marked BLOCKED stops the flow until it is cleared.
4. `/tasks`: ordered, bounded tasks, test cases derived from the EARS
   scenarios, `[P]` on tasks that can run in parallel.
5. `/implement`: orchestrator sequences developer, test-coder, review.
6. `/verify`: qa runs build, tests, scenarios, screenshots against mockups.

A change with no product impact (refactor, toolchain) still gets a folder:
`spec.md` says what must not change, `tasks.md` bounds the work.

## On a feature request, and small fixes

The main session checks `product/` exists (else `/plan-product` or
`/analyze-product`) and the architecture rule exists (else the study), then
starts at `/specify`. It never jumps to code, even for "a small screen".
A one-line fix with an obvious diff skips the sequence: branch, fix, test,
commit. If the fix touches a mockup, a token or a rule, it is a change.

## Verification before done

Every task ends with a check the agent can run and whose output it shows:
tests, build, a grep, a screenshot. "Looks done" is not done.
