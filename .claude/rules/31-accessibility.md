---
paths:
  - "**/*.tsx"
  - "**/*.astro"
  - "**/*.html"
  - "**/*.css"
---

# Web accessibility and motion

Target WCAG 2.1 AA on every project. RGAA when the site is a public
service (vanvesCitoyen). Accessibility is a requirement, not a polish step.

## Checklist for every component and page

- Contrast verified in light and dark, and in every language variant.
- Keyboard: every interactive element reachable and operable, focus order
  follows the visual order, no trap.
- Visible focus. In Wara DS the sky accent is the focus color; never remove
  the outline without a replacement.
- Correct semantics: native elements first (`button`, `a`, `nav`, `main`),
  `aria-*` only to fill a gap, never to repaint a `div` as a button.
- Page language set; `lang` and `dir` switch with the locale.
- Touch targets at least 44 by 44 CSS pixels.
- Forms: labels bound to inputs, errors announced, no placeholder as label.
- Images: meaningful `alt`, decorative ones empty.

## Motion

- Every animation goes through the motion tokens (duration, easing).
- `prefers-reduced-motion` respected everywhere: animations reduced to
  opacity or removed, scroll-triggered effects disabled, 3D hero replaced
  by its static fallback.
- One gradient or glow moment per screen (Wara DS rule); motion supports
  the hierarchy, it never carries the meaning alone.

## States every component covers

default, hover, focus, active, disabled, loading, error. A component
missing one is not done. The design system documents each state; a consumer
site does not invent them.

## Verification

Run an automated audit (axe or Lighthouse) before a PR and keep the report
in the PR test plan. Then one manual keyboard pass on the changed screens.
Automated tools catch about a third of the issues; the manual pass is not
optional.
