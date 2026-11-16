# 003 - Wara DS SDK as the token source

## Status

Accepted. Recorded after the fact on 2026-11-08.

## Context

Since 9206e3d (2026-06-30) the site reads its tokens from
`@warastudio/theme` 0.1.0 and its form components from `@warastudio/react`
0.1.0, served by GitHub Packages. `src/index.css` aliases the SDK
variables (`--wara-*`) to Tailwind `--color-*` names. The v2 mockup and
decision log use `--ws-*`, from a newer SDK. Rule 50 forbids local
literals; `index.css` still holds 10 color literals (inventory section 6):
four local tokens with no SDK equivalent (`--color-sink`, `--color-scrim`,
`--color-bezel`, `--color-line2`) and their dark overrides, a fixed white
and two mask gradients, each commented as missing from the SDK.

## Options considered

**A - Keep the SDK as the single source, upgrade to `--ws-*`**
- (+) one brand source for every Wara project; dark Midnight comes free
- (+) the v2 mockup is already written against `--ws-*`
- (-) a private registry and a CI token (`WARA_DS_TOKEN`)

**B - Copy the tokens into the repo**
- (+) no registry access needed
- (-) the brand drifts on the first WaraDS change; rule 50 forbids it

## Decision

Adopt **A**. Upgrade the SDK to the `--ws-*` version in roadmap wave 0,
before the first v2 screen spec, and alias Tailwind names to `--ws-*`. The
four local tokens go to WaraDS as token requests (ds-agent) and leave
`index.css` once the SDK ships them; the rest disappear with the v2
rewrite of the sections that use them.

## Consequences

Easier:
- the mockup's variables map one to one onto the code

Harder:
- an SDK upgrade can rename variables: it is its own change, with a build
  and a visual check in both themes

Follow-up:
- `product/tech-stack.md` decision column points here
- open the WaraDS token requests for the four local tokens

## Amendments

- 2026-11-15, spec 006: the `--ws-*` version is `@warastudio/theme` and
  `@warastudio/react` 0.2.0 (tokens 0.2.0), published that day from
  wara-ds-web (ticket F2, WaraStudio/wara-ds-web#2 and #3). It takes the
  variable names of `WaraDS/build/web/tokens.css` and adds the
  mode-independent `--ws-ref-*` palette; values are unchanged. The site
  pins it exactly, with no range, so a token rename never arrives
  silently, and `src/sdkTokens.test.ts` fails on any `var(--ws-...)` the
  installed SDK does not define. Decision A is unchanged. The WaraDS token
  requests for the four local tokens are not opened: the v2 mockup uses
  none of them, so each v2 spec that needs one reopens the request (Hedi,
  2026-11-10 and 2026-11-15).
- 2026-11-16, spec 009: the site pins `@warastudio/theme` 0.3.0 and
  `@warastudio/react` 0.2.1 (tokens 0.3.0), published from WaraDS-Web
  after benjhedi/WaraDS#3. The release adds four tokens every v2 screen
  reuses, requested for spec 007: `--ws-motion-reveal` (.8s),
  `--ws-motion-stagger` (.1s), `--ws-ease-emphasized`
  (cubic-bezier(.16, 1, .3, 1)) and `--ws-track-label` (.14em); every
  0.2.0 `--ws-*` keeps its value in both themes. The reveal rise reuses
  `--ws-space-24` instead of a token (Hedi, 2026-11-15). Exact pin and
  decision A unchanged.
