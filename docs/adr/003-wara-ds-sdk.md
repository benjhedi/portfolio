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
