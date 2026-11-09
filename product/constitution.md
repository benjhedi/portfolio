# Constitution - Portfolio Hedi Jahouach

What this product never compromises on. The kit rules in `.claude/rules/` cover how we work. [log] = v2 decision log (Cowork, 2026-11-07).

## Product principles

1. The site shows "Hedi Jahouach" only, with the "HJ" text monogram; titles, metadata and structured data say Jahouach ([log], decided 2026-11-07).
2. No Wara Studio mention or logo anywhere; the Wara tokens serve as the technical design system, invisibly ([log]).
3. Sober, direct tone; every claim rests on a real app or a real mission, no overselling (former `CLAUDE.md` (a3d1bda), `mission.md`).
4. All text lives in `src/content/content.ts` as `{ fr, en }`; a component never hardcodes text, and v2 drops no existing content (former `CLAUDE.md` (a3d1bda), [log] scope).
5. Motion is optional: `prefers-reduced-motion` gives a complete static page, the hero video included (poster) (former `CLAUDE.md` (a3d1bda), [log] hero).
6. A visitor's contact data goes only where the form says, after their action (rule 06, `docs/audit/inventory.md` gap table).

## Engineering principles

7. No screen without a validated mockup; no color, spacing, type or motion value outside the design system tokens (rules 50, 60).
8. Every change has a spec with acceptance criteria before any code; every task ends with a check the agent can run (rule 07).
9. Dependencies are the minimum, each justified and confined to one module (rule 05).
10. The architecture rule (`10-architecture.md`) is followed as written; changing it is a decision recorded before the code changes.
11. Keyboard, visible focus, contrast and touch targets are part of done, both themes (former `CLAUDE.md` (a3d1bda), rule 31).

## Gates derived from this file

Each plan.md checks, before implementation:

- Which principles the change touches, and how the plan honors them.
- Mockups present for every screen in scope, both themes.
- Tokens exist for every visual value the mockups show.
- The architecture rule covers the units the change needs.
- A verification exists for each acceptance criterion.

## Amendments

Changing a principle is an ADR plus a line here with the date. A principle is never deleted silently; it is superseded with the reason.

| Date | Change | Decision |
|---|---|---|
| 2026-11-07 | Initial version | analyze-product |
