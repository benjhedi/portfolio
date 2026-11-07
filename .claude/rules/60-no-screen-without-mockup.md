# No screen without a mockup

A screen is implemented only when a validated mockup exists for it. This is
a product rule, written in the Chaland handoff as rule 8, applied in Doable
and Earshot through the handoff bundles.

## What counts as a mockup

- A screen in the hi-fi prototype (`hifi-screens.jsx` or the `.dc.html`
  bundle), exported as a PNG in the screens folder, named `NN-kebab-name.png`.
- Listed in the handoff README with its purpose, layout, states and
  interactions.
- Covered by the token table of the handoff `CLAUDE.md` or `DESIGN-SPEC.md`.

A sketch, a verbal description or a screenshot of another app is not a
mockup. It is input for design-agent.

## What the implementer does

1. Reads the handoff in its declared order: README, handoff `CLAUDE.md` or
   `DESIGN-SPEC.md`, then the screen's PNG and prototype source.
2. Names the view after the mockup. One view per screen.
3. Builds the screen with design system components and tokens only.
4. Compares side by side with the PNG, both themes, before reporting.
5. Lists every situation the mockup does not cover (an empty state, an
   error, a long text) and asks, instead of improvising.

## What happens when the mockup is missing or outdated

Stop. Report which screen, which state. Route to design-agent, which
designs it in the prototype, exports it, updates the README and records a
decision if the screen settles a product question. Then implementation
resumes.

## Why

The mockup is the contract between design and code. Without it, every
session re-decides the layout, and screens drift from each other. The cost
of a missing mockup is one design session; the cost of a screen built
without one is a rewrite plus a review nobody can anchor.

## Exceptions

A system screen rendered by the platform (permission dialog, share sheet,
native settings) needs no mockup. A debug-only screen needs none either
and is never shipped.
