# Handoff README template

The README is the screen-by-screen manual. Normative values live in the
handoff `CLAUDE.md` or `DESIGN-SPEC.md`; the README only repeats the
essentials and says how to use the bundle.

```
# Handoff: <Product> - <one-line positioning>

## Overview
What the product does, the number of screens, the themes, the validated
direction name and its three signature traits.

## About the design files
Design references built in HTML, not production code. Recreate the screens
with the codebase's components; never ship the HTML, frame or scripts.

## Fidelity and tokens
High fidelity: colors, type, spacing and interactions are final. Token
source of truth: `CLAUDE.md` (or `DESIGN-SPEC.md`); summary table below.

## Screens
### N. <Screen name>
- Purpose: one line.
- Layout: padding, header, main element with its exact dimensions, list
  or cards, CTA.
- Component details: the one or two components specific to this screen.
- States: empty, loading, error, premium, when they exist.
- Interaction: taps, gestures, what navigates where.

## Interactions and behavior
Navigation model (tab bar, sheets), the signature interaction with its
animation and reduce-motion fallback, the flows as arrows in text.

## State management hints
The screen enum, the entities the prototype holds, derived values. Not an
architecture: a hint of what the prototype simulates.

## Assets
Icons (inline SVG, replaceable by the codebase icon set), fonts, no bitmap.

## Files
The entry HTML, the prototype sources, the spec, the export page.

## Exporting a screen
The exact procedure and the PNG list with its count.
```

Keep each screen section under ten lines. When a screen needs more, the
detail goes to `DESIGN-SPEC.md` with a reference.
