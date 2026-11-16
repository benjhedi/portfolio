# Token taxonomy

Three layers. Components read semantic tokens only.

## 1. Raw palette

The named colors of the brand or product: `porcelain`, `charcoal`, `sky`,
`deep`, `ocean`. Never read by a component.

## 2. Semantic tokens, each with a light and a dark value

| Role | Meaning |
|---|---|
| `bg` | page or screen background |
| `surface`, `surface2` | cards, inputs, sheets; depth by contrast |
| `ink`, `muted`, `faint` | text levels, grays derived from ink at opacity |
| `separator` | hairlines |
| `primary`, `primarySoft`, `primaryInk` | solid fill, tonal fill, text on tonal |
| `actionTint` | links, nav buttons, carets, tabs |
| `accent` | the sparse signature color, never a background |
| `ok`, `error` | status only; a product may forbid one |
| `focus` | keyboard focus ring (often equals accent) |

## 3. Scales and roles

- Spacing: 4, 8, 12, 16, 20, 24, 32, 40, 48. Block lateral margin 16.
- Radii: small 12, medium 14 to 16, large 22 to 28, capsule 999.
- Type roles: display, title, headline, body, label, caption, numeral.
  Two main weights (400 and 600), one display weight for special moments.
  Tracking tightens as size grows. Minimum 12 pt. Tabular numerals.
- Motion: durations (fast 120 ms, base 200, slow 350, ambient 5 to 9 s),
  easings (standard, emphasized), and a global switch that cuts all of them
  for Reduce Motion and Eco mode.
- Elevation: prefer surface contrast and borders; when shadows exist, two
  layers (tight and diffuse) defined once.
- Glass: blur, saturation, edge and inner shine, defined once per level
  (nav, card, sheet).

## Naming per platform

- Web: `--ws-color-bg`, `--ws-space-4`, `--ws-radius-md`, `--ws-duration-base`
  in CSS; DTCG JSON as the source, Style Dictionary builds the outputs.
- Apple: `WSColor.bg`, `WSSpacing.s4`, `WSRadius.md`, `WSDuration.base`,
  `WSAnimation.standard`. Colors in the assets catalog for automatic dark.
- Android: `DoableColors.bg`, `DoableSpacing`, `doableAnimationSpec()` in
  `core/designsystem`.

A brand gradient is a token too, with all its stops (a missing middle stop
turned a gradient muddy once). One gradient moment per screen.
