# Architecture study - Portfolio

Started on 2026-11-07 with `/architecture-study`, after `/from-codebase`
inferred the current shape (`.claude/rules/10-architecture.md`, c35d543).
Question for a taken-over repo: keep, evolve or migrate.

## Situation

```
Type: taken over (own repo, v1.6.0 live), v2 redesign ahead
People: Hedi only, with Claude Code agents; no client team
Lifetime: several years, the site follows his career
Platforms: web only, now and later
Existing: src/content/content.ts (single bilingual source), Wara DS SDK
          (@warastudio/react, @warastudio/theme), v2 mockup version 5
          (claude.ai artifact), v2 decision log, hero video files
Constraints: Cloudflare static deploy, Vite + React + Tailwind kept,
             no 3D dependencies, reduced motion everywhere,
             deadline none stated
```

Deadline: none stated on 2026-11-07. Reuse of the hero or project blocks
elsewhere: no (Hedi, 2026-11-07).

## Needs

| Need | Axis | Weight |
|---|---|---|
| One page, about ten sections plus nav, preloader, fixed bottom bar; anchors, no router | presentation | must |
| "Voir le projet" leaves the site (App Store page when one exists); no project URL, no deep link | presentation | must |
| State shared across sections: locale, theme, active section, open item if any | presentation | must |
| Readable by Hedi and agents, no imposed team pattern | presentation | must |
| No business rule to protect; `content.ts` stays the single data source | dependencies | must |
| Side effects behind a small interface, testable with a double: Web3Forms POST, theme persistence, reduced motion, video playback | dependencies | should |
| Vapor emission timing (t = 2.05 s, five elements in rotation) in a pure unit, testable without the DOM | dependencies | should |
| One package, no SDK to confine beyond Web3Forms (one file today) | modularity | must |
| Reduced motion everywhere, Lighthouse mobile 90+, light video and images | cross-cutting | must |
| Reuse of the hero engine by another site | modularity | later, trigger |
| Project pages with their own URL | presentation | later, trigger |

Open for the projects spec, not for this study: `content.ts` has no store
URL, some projects are not on the App Store (GearTrack is B2B), and the
detail fields (`context`, `contributions`) shown today in `ProjectModal`
must stay on the site per the v2 log ("tout le contenu conserve").

## Options

Shortlist per axis. Presentation: view-owned state only; mvvm, mvi, tca
and the rest add a state holder per screen for a page whose state is
three shared values (no need supports them). Dependencies: free, light or
clean. Modularity: single package; packages by layer or feature need a
second consumer, and reuse is "no".

| | Pattern | Dependency rule | Modularity | Cost now | Cost later | Breaks when |
|---|---|---|---|---|---|---|
| A keep | view-owned state, `AppContext` | free: effects where used | one package, folders by kind (`components/` flat) | none | effects rebuilt inside v2 components, nothing testable below the UI | a test on the contact form or the vapor timing is wanted |
| B evolve | view-owned state, `AppContext` plus active section | light: effects behind 3 or 4 TS interfaces provided by context; vapor timing as a pure unit | one package, folders by feature: `sections/<name>/`, `shared/`, `services/`, `content/` | 3 or 4 interfaces, one adapter each, written during the v2 rewrite anyway | low; a section moves to a package if reuse appears | project pages with URLs (router), hero reused by another site (package) |
| C clean | view-owned state | clean: domain types mapped from `content.ts`, use cases, adapters | npm workspaces by layer | high: mapping and forwarding units with no rule behind them | high to undo | from day one: Clean without a domain to protect |

Construction order of a v2 section under B: content entries in
`content.ts`, pure unit if any, service interface and adapter if any,
section component, reduced-motion path, check against the mockup.

Recommendation: B, because v2 rewrites every section, so folders by
feature and isolated effects cost almost nothing now and give the two
"should" needs a test seam. Strongest argument against: the interfaces
only pay if tests are written, there is no test runner today, and moving
from A to B later is about a day of work for four effects.

## Decision

2026-11-07, Hedi: B, evolve, with tests. Deciding need: the two "should"
lines (effects testable with a double, vapor timing as a pure unit), now
backed by a test runner. Rejected: A (nothing testable below the UI, and
v2 rewrites every section anyway); C (Clean without a domain to protect).
Starting level: simple, one package, folders by feature.

First migration step: none ahead of v2. Each v2 section spec moves its
section into `src/sections/<name>/` and extracts its effects; the old
`components/` folder empties as the specs land. The test runner (Vitest,
node environment, no DOM library) is a dev dependency proposed separately,
recorded in an ADR once approved.
