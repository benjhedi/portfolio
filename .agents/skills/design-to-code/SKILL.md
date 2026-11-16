---
name: design-to-code
description: >
  Runs the Wara design-to-code pipeline: wireframes, hi-fi HTML prototype
  with tokens, PNG per screen, handoff spec, then implementation with design
  system components. Use it to design or add screens, build the handoff
  bundle, or implement a screen from its mockup.
user-invocable: true
---

# Design to code

Hedi does not work in Figma: the design is an HTML prototype that renders
in a browser, exports to PNG, and hands off through a README, a token table
and a decisions log.

## The pipeline

1. Brief and flows: screens list, navigation, product rules. One page.
2. Wireframes: low-fi HTML, structure only, no color. Validate the flow.
   Prompt: `docs/prompts/wireframes.md`.
3. Direction: two or three visual tracks in HTML, one chosen and recorded
   as decision 1. Tokens frozen from it.
4. Hi-fi prototype: `hifi-screens.jsx` + `hifi-kit.css` + a device frame,
   every screen and state, both themes. Prompt `docs/prompts/hifi-prototype.md`,
   conventions `reference/hifi-conventions.md`.
5. Export: one PNG per screen, `NN-kebab-name.png` (`reference/export-screens.md`).
6. Handoff bundle: README, handoff `CLAUDE.md` or `DESIGN-SPEC.md`,
   `DECISIONS.md`, `ecrans/` (`reference/design-spec-template.md`, `decisions-log.md`).
7. Implementation: screen by screen, mockup side by side, design system
   components only (`reference/implement-screen.md`).

Roles: design-agent owns steps 2 to 6 and never writes app code;
developer owns step 7 and never edits the prototype; ds-agent adds a
missing token or component between them; Hedi validates PNGs first.

## Rules carried through

No screen without a mockup (`60-no-screen-without-mockup.md`). Business
rules override the prototype; the prototype overrides the code. The
prototype is a reference, never shipped. A decision that settles a product
question gets a numbered entry.

## Challenger notes

Figma deliverables requested: ask what the client will do with them; a
clickable HTML prototype in a phone frame has replaced Figma on every recent
project. A screen that "just needs a small tweak" in code: ask whether the
mockup changed; if not the code is wrong, if yes update the mockup first.
