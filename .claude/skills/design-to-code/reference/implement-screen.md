# Implementing a screen from its mockup

The last step of the pipeline, owned by the developer agent. One screen at a time.

## Before writing the view

1. Read the handoff in order: README section of the screen, handoff
   `CLAUDE.md` or `DESIGN-SPEC.md`, the PNG, the `Hi<Screen>` component in
   the prototype source for exact values and structure.
2. List the design system components the screen uses. Each one exists in
   the package with the states the screen needs. Missing: stop, route to
   ds-agent.
3. List the states the mockup covers (default, empty, error, premium) and
   the ones it does not. Ask about the missing ones; do not improvise.
4. Name the view after the mockup. Confirm the ViewModel state type covers
   every visible state.

## While writing

- Tokens only. The prototype's CSS variable names map to the platform
  tokens; the mapping is in the design system package.
- Native chrome native: navigation, tab bar, pickers, toggles, sheets.
- Layout from the spec numbers (padding, sizes), not from eyeballing the
  PNG.
- Motion through the animation tokens; verify the Reduce Motion and Eco
  path cuts it.
- Accessibility labels on every control; hit targets at the minimum size.

## Before reporting

- Side-by-side comparison with the PNG, both themes, on the device size the
  PNG was exported at. Differences listed with their cause: spec gap,
  platform constraint, or a bug.
- Preview with mock dependencies showing every state.
- A platform constraint that prevents parity is written down (decision or
  ADR), not silently accepted.

## Commit

`[feat-<title>]: add <Screen> view` on the feature branch, after the
ViewModel commit. The PR test plan names the PNG compared against.

## Smells

- A view that computes a number the mockup displays: the number comes from
  the ViewModel state.
- A "temporary" color to match the PNG: it is a missing token.
- A screen that mixes two mockups: it is two screens, or the mockup is
  wrong.
