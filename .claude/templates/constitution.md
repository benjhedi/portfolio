# Constitution - <Product>

The principles every spec, plan and review are checked against. Short on
purpose: a principle that does not change a decision is not a principle.
The kit rules in `.claude/rules/` cover how we work; this file covers
what this product never compromises on.

## Product principles

1. <The one rule the mission names as non-negotiable. Example: a missed
   day breaks nothing and is never shown in red.>
2. <A rule about data or trust. Example: personal data never leaves the
   device without an explicit user action.>
3. <A rule about the experience. Example: paste comes first; manual entry
   is secondary; nothing is created from an unreadable paste.>

## Engineering principles

4. No screen without a validated mockup; no color, spacing or type
   outside the design system tokens.
5. Every change has a spec with acceptance criteria before any code; every
   task ends with a check the agent can run.
6. Dependencies are the minimum, each justified and confined to one module.
7. The architecture rule (`10-architecture.md`) is followed as written;
   changing it is a decision recorded before the code changes.

## Gates derived from this file

Each plan.md checks, before implementation:

- Which principles the change touches, and how the plan honors them.
- Mockups present for every screen in scope, both themes.
- Tokens exist for every visual value the mockups show.
- The architecture rule covers the units the change needs.
- A verification exists for each acceptance criterion.

## Amendments

Changing a principle is an ADR plus a line here with the date. A principle
is never deleted silently; it is superseded with the reason.

| Date | Change | Decision |
|---|---|---|
| <YYYY-MM-DD> | Initial version | plan-product |
