# Hi-fi prototype prompt

Paste in a fresh design session. Attach the brief, the validated wireframes
and the chosen direction (or the Wara DS skill when the brand applies).

---

Create a high-fidelity prototype of <Product>, a <platform, OS version> app
that <one-sentence purpose>. The wireframes are validated; we move to hi-fi:
real type, icons, shadows, hierarchy. No sketch left.

## Screens to deliver, one HTML app, tab navigation, in this order

1. <Screen>: <variant chosen>, <what it must show>.
2. <The core screen>: deliver its <N> states (<state list>) and its
   actions in a fixed order: <actions>.
3. <Screen>: <...>.

Wrap each screen in a realistic device frame (iPhone bezel and status bar,
or macOS window chrome with traffic lights and vibrancy title bar).

## Direction

- Platform language: <iOS 26 Liquid Glass / macOS Tahoe / Material 3>.
  Translucent materials, hairline borders, soft wide shadows.
- Type: <SF Pro / Hanken Grotesk / Figtree>, sizes <title / body / label>,
  tabular numerals for figures, minimum 12 px.
- Icons: <SF Symbols style / Material Symbols>, inline SVG, no emoji.
- Palette as CSS variables, light and dark, from <the token table or the
  design system skill>. No invented hex. One gradient moment per screen.
- Density: comfortable. Hit targets 44 px. Lateral margin 16.

## Details to get right on the core screen

<Two to four lines per state: what animates, what the chip says, how the
main card appears, the microcopy, the action order.> Tweaks panel (bottom
right): dark mode, annotations, variant radios for the core screen,
jump-to-screen, accent swatches only if the accent is still open.

## Technical constraints and deliverable

Single HTML entry, React + Babel inline with pinned versions, CSS in
separate files (`hifi-kit.css` tokens and components, `hifi-screens.jsx`
screens as `Hi<Name>` components with variant flags), no bitmap assets,
everything opens by double-click, plus an `export-ecran.html` that renders
one screen at device size from a query string. The folder opens on screen
1 with three sentences of design reasoning in a comment at the top. Before
building, ask me one or two questions on what is already decided, list the
screens and variants you will produce, and wait for my go.
