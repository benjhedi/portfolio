# Note: evolution triggers

An architecture rule without triggers is a bet nobody checks. Each trigger
is an observable fact; when it appears, `/architecture-study` runs again
before the next spec. The study writes the ones that apply into
`10-architecture.md` and `product/roadmap.md`.

## Triggers that move the presentation pattern

- The same state needed by three screens or more (view-owned to MVVM).
- Navigation deeper than two levels, or driven by deep links or data
  (MVVM to MVVM-C or navigation as state).
- A team joins with a pattern they know (any to that pattern).
- Exhaustive state testing becomes a requirement (toward TCA or MVI).

## Triggers that tighten the dependency rule

- A business rule appears in two places (free or light to clean).
- Logic must be tested without simulator or device.
- A second adapter for the same concept (mock and HTTP, local and cloud).
- Personal data enters the model (consent and retention rules need a
  home).
- The POC is approved for production.

## Triggers that add modules

- A widget, watch, demo or second platform target.
- A re-skin or second niche on the same engine.
- A third-party SDK that must be confined (analytics, payments, AI).
- Build time pain, or two people working in parallel on separate areas.
- Code to reuse in another product of the studio.

## Triggers that simplify

- Every change touches three packages and there is one developer: merge
  packages or go back to a single target.
- Use cases that only forward a call: drop the layer where the rule
  allows.
- A pattern's ceremony exceeds the logic it protects on most screens:
  allow a lighter sheet for those screens, written in the rule.

## How a trigger is handled

Noted in the handoff when first seen; the study reruns when the roadmap
line that crosses it is next; the rule changes through an ADR; the
migration is a refactor spec with "no behavior change" criteria and grep-
based acceptance.
