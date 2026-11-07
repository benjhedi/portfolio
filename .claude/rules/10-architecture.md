# Architecture - Portfolio

From `docs/architecture-study.md`, 2026-11-07; an ADR comes before any change.
Level: simple, the page has no business rule and three shared values.

## Axis 1 - Presentation pattern: view-owned state

- Section (`sections/<name>/<Name>.tsx`): renders its `content.ts` entries,
  owns local UI state, reads `useApp()`, reaches effects only through a
  service hook. One component per file.
- App state (`app/AppContext.tsx`): locale, `t()`, theme, active section.
  A new shared value is a decision, not a convenience.
- Navigation: one page, `#id` anchors with ids from `content.ts`; project
  links leave the site (`target="_blank" rel="noopener"`). No router.
- Build order: content, pure unit, service, section, reduced motion, mockup.

## Axis 2 - Dependency rule: light

- `content/content.ts` imports nothing; sections use its types as is.
- Effects behind interfaces in `services/` (`contactSender`, `themeStore`,
  `motionPreference`, `videoClock`), one interface and one adapter file
  each. Only `services/` touches `fetch`, `localStorage`, `matchMedia`,
  `location`. `app/` provides adapters by context; `main.tsx` picks them.
- Timing logic in pure functions next to the section (`sections/hero/
  vaporSchedule.ts`); values such as t = 2.05 s are named constants.

## Axis 3 - Modularity: one package, folders by feature

```
src/main.tsx, App.tsx   composition root, providers, section order
src/app/                AppContext, service context, useReduce
src/sections/<name>/    component, pure units, tests of one section
src/shared/ui/, lib/    used by two sections or more
src/services/           interfaces and adapters
src/content/            content.ts, bilingual, single source
```
A section never imports another; code moves to `shared/` in its own commit;
`components/` is legacy and empties spec by spec.

## Agents and triggers

developer follows the build order. test-coder: Vitest (node),
`*.test.ts` next to pure units and adapters, doubles, no component tests.
review-agent flags an effect API outside `services/`, a section importing a
section, an import in `content.ts`, a literal timing. Study again when a
project needs its own URL, a section is reused elsewhere, a business rule
appears, `AppContext` needs a fourth value or re-renders too much, or
component tests become necessary.

| 2026-11-07 | Inferred from code (c35d543), then B chosen | study |
