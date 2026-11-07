# CLAUDE.md - <Product>, design "<Direction name>"

Implementation rules for this product's UI. Read before coding any screen.
Full spec: `README.md`. Visual reference: `ios/<product>-hifi.html`, one PNG
per screen in `ios/ecrans/`. Markup: `ios/hifi-screens.jsx`; styles:
`ios/hifi-kit.css`. Decisions: `../Design-Explorations/DECISIONS.md`.
Business rules: `../regles-metier-*.md`; they override the prototype.

## Product and stack

<What it does, for whom, platform and visual language (e.g. iOS 26 Liquid
Glass). SwiftUI, native glass, theme driven by tokens (DAY / NIGHT), Eco
mode = NIGHT + animations cut, persisted. Font. Icon set. Tabular numerals.>

## Palette - do not deviate

| Token | Light | Dark / Eco |
|---|---|---|
| bg, surface | `#......` | `#......` |
| ink, muted, separator | | |
| primary, primarySoft, primaryInk | | |
| actionTint, accent | | |
| ok, error (status and error text only) | | |

Brand gradient: `<stops>`; where it goes, where it never goes.
Forbidden: `<color>` except `<status>`. Error color only for error text.

## Typography

<Font, screen title size/weight/tracking, list item, field label, button,
CTA. Minimum 12 pt.>

## Signature components

<One short block per component: buttons (variants, radii, press state,
disabled rule), glass surfaces, the one card that carries the identity,
fields and their incomplete state. Kept-from-previous-version list.>

## Motion - all cut by Eco mode and Reduce Motion

<List of named animations with durations.>

## Product rules - non-negotiable

1. <Rule, numbered. Example: no screen without a mockup.>
2. <...>

## General style

Minimalism, no filler, no emoji. Hit targets 44 pt, lateral margin 16.
