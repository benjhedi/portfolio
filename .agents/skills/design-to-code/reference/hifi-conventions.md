# Hi-fi prototype conventions

A single HTML entry plus a few source files, rendered in a browser: the
design source of truth until the code catches up.

## Files

```
HadoffDesign/            (or design-handoff/)
  README.md              spec screen by screen, flows, export procedure
  CLAUDE.md              implementation rules: tokens, components, product rules
  DESIGN-SPEC.md         normative values when the CLAUDE.md is kept short
  ios/
    <product>-hifi.html  entry: loads the frame, the kit and the screens
    ios-frame.jsx        device bezel and status bar, tooling only
    hifi-kit.css         tokens as CSS variables, components, motion
    hifi-screens.jsx     one component per screen: Hi<Name>, variants by flag
    export-ecran.html    renders one screen at device size for PNG export
    ecrans/              NN-kebab-name.png, one per screen and variant
  android/               same shape when an Android version exists
  icon-export/           app icon sources and exports
```

## Tokens first

`hifi-kit.css` starts with the token block: both themes as CSS variables,
the brand gradient with all its stops, type roles, radii, motion durations.
Every component rule reads a variable; a literal is a finding, as in code.

## Screens

One component per screen, `Hi<ScreenName>`; variants (empty, error,
premium) read a flag from the `p` query parameter so each exports from a
URL. Real content, figures that add up (HT + TVA = TTC), real lengths of
names and addresses, no lorem ipsum. Both themes rendered. Native chrome
drawn as the platform draws it (iOS 26 glass nav, Material 3 top bar) so
the implementer recognizes native components.

## Interaction and annotations

The entry page navigates between screens and exposes a tweaks panel: theme
toggle, variant flags, annotations on or off, accent swatches when a
decision is still open. Animations are real CSS so durations and easings
are visible. Annotations are thin, 11 px, muted, explain a rule or a state,
and are hidden in exports unless the README asks for an annotated set.

Tooling: React + Babel inline with pinned versions, no build step, no
bitmap assets, icons as inline SVG in the platform's style; the whole
folder opens by double-click.
