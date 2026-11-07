# Roadmap - <Product>

Ordered features. One line each: what the user can do once it ships, not
how it is built. The order is the priority; the next spec always takes
the first unshipped line unless Hedi reorders.

## Phase 0 - Foundations (already done or in progress)

- [x] <feature> - spec 001
- [ ] <feature> - spec 002, in progress

## Phase 1 - MVP

- [ ] <user can ...>
- [ ] <user can ...>
- [ ] <user can ...>

## Phase 2 - After the first release

- [ ] <user can ...>
- [ ] <user can ...>

## Parked

<Ideas kept on purpose with the reason they wait: not validated, needs a
backend, premium later, depends on a platform API.>

- <idea> - <reason>

## Rules for this file

- A line is a user outcome, testable by using the product.
- A line that needs a mockup says so; no screen without a mockup.
- When a spec starts, the line gets its spec number. When it ships, the
  box is checked and the release is noted.
- Reprioritizing is a decision: one line in `DECISIONS.md` or an ADR when
  it changes the architecture, and the handoff mentions it.

## Evolution triggers that touch the architecture

<Copied from 10-architecture.md so they are visible here: for example,
second platform, offline sync, more than N screens. When a roadmap line
crosses one, `/architecture-study` runs again before the spec.>
