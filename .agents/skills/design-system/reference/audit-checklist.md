# Design system audit checklist

Run on an existing codebase before adopting the kit, or before a design
refresh. Each hit becomes a line in a refactor spec with the token or component
that replaces it.

## Hardcoded values

```bash
# Swift
grep -rnE '#[0-9A-Fa-f]{6}|Color\((red|\.sRGB)|\.padding\([0-9]|cornerRadius\([0-9]|\.animation\(\.default|duration: [0-9]' Sources/ App/
# Web
grep -rnE '#[0-9A-Fa-f]{3,8}\b|rgba?\(|[0-9]+px' src/ --include='*.css' --include='*.tsx' --include='*.astro'
# Android
grep -rnE 'Color\(0x|\.dp\b|\.sp\b|tween\([0-9]' app/src/main/kotlin/ --include='*.kt' | grep -v designsystem
```

## Components

- Custom-drawn controls where a native one exists.
- Components defined inside a feature folder instead of the design system.
- Components missing a state (disabled, loading, error) or a theme.
- Two components doing the same job with different names.

## Themes and motion

- Views checked in one appearance only (no dark preview).
- Animations with literals; animations that ignore Reduce Motion or Eco.
- Backgrounds or accents introduced ad hoc by a screen.

## Alignment

- Values in the code that differ from the handoff table: list each with
  both values. Decide which is right; update the document first when the
  code wins.
- Values in the product palette that drifted toward or away from the brand
  without a decision entry.
- Skill or exported token files (Figma, CSS build) older than the source.

## Output

A table: file:line, current value, token to use or create, severity. Then
a refactor spec per wave: tokens first, then components, then screens. No
behavior change inside it; visual parity verified side by side with the
mockups, both themes.
