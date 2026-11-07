# Design tokens - no hardcoded value, anywhere

Every color, spacing, radius, typographic role, duration and easing comes
from the design system. This rule applies to every platform and every
project, brand or product palette alike.

## Sources of truth

- Wara Studio brand: the `WaraDS` repo (and the `wara-studio-design` skill
  packaged from it). `WaraDS-Apple` (`WS*` tokens, assets catalog) and
  `WaraDS-Web` (`--ws-*` variables, theme contract) implement it; they
  never redefine it. A brand question is raised on the WaraDS side.
- Product palettes (Chaland "Bleu profond", Doable "Refined Calm") are
  distinct from the brand on purpose. Each has its own token table in the
  product's design handoff (`CLAUDE.md` or `DESIGN-SPEC.md`), which is the
  only normative source for that product.

## Hard rules

- A token that does not exist is added to the design system with its
  source, never improvised in a feature. On the web, a missing token is a
  compile error, not a silent fallback.
- Dual theme always: light and dark (or Day and Night) defined together.
  A component reads tokens so the flip is free. An Eco mode forces the dark
  theme and cuts every animation, persisted.
- Grays derive from the ink color at opacity, no arbitrary hex.
- One gradient moment per screen. Accent colors are sparse, never a
  background. Semantic colors (OK green, error red) are reserved for status
  and error text; a product may forbid a color entirely (Doable: no red).
- Minimum type size 12 pt. Tabular numerals wherever figures line up.
- Motion through motion tokens only; Reduce Motion and Eco mode cut it.
- Platform chrome stays native and reads the tokens: Liquid Glass on iOS
  26, Material 3 on Android, native controls on the web.

## Review signals

A literal hex, a magic number in a padding, a `.animation(.default)`, a
custom-drawn control where a native one exists: each is a finding. The
review agent treats them as errors, not style remarks.

## When the design system lacks something

Stop, describe the need (component, state, token), and route it to ds-agent.
The component is added with all its states and an entry in the showcase or
preview before the feature uses it.
