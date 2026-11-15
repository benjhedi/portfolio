# Spec 006 - SDK upgrade to --ws-*

Branch: `chore-sdk-ws-upgrade` | Status: clarified (2026-11-10)
Roadmap line: Phase 1, wave 0, SDK upgraded from `--wara-*` (0.1.0) to the `--ws-*` version the mockup uses (Hedi, 2026-11-07; ADR 003).
Depends on: a WaraDS-Web release emitting `--ws-*` in kebab-case. None exists on 2026-11-10 (registry and WaraDS-Web `main` 72f5854 at 0.1.0).

## Why

The v2 mockup reads `--ws-*`; the site reads `--wara-*` through 20 aliases in `src/index.css`. Without the upgrade every v2 screen spec translates names by hand and drifts. Once it ships, a mockup variable maps one to one onto the code (ADR 003, option A).

## User stories, by priority

- P1 As the maintainer, I want the site to read `--ws-*` from the SDK so that v2 screens use the mockup's variables as written.
- P1 As the maintainer, I want v1 to render exactly as before in both themes so that the rename carries no visual change to production.
- P2 As the maintainer, I want an alias to an undefined SDK variable to fail a check so that a renamed token cannot pass silently (rule 50).

## Acceptance criteria (EARS)

- AC-1 THE manifest SHALL depend on the first `@warastudio/theme` and `@warastudio/react` release that emits `--ws-*` with names identical to `docs/v2/mockup/tokens.css`, and `npm ci` SHALL install it on Node 22 locally and in CI with `WARA_DS_TOKEN`.
- AC-2 THE source tree SHALL contain 0 occurrences of `--wara-` (grep over `src/`).
- AC-3 THE diff against dev SHALL touch only `src/index.css`, `package.json`, `package-lock.json` and the AC-4 test; `src/main.tsx` and `ContactForm.tsx` only if the release changes an import path or the `Button`/`Input` API, each such change noted in the verification report. Tailwind names (`--color-*`, `--radius-*`, `--shadow-inset`) stay unchanged.
- AC-4 IF a stylesheet of the site references an SDK variable the installed SDK does not define THEN `npm test` SHALL fail and name the variable.
- AC-5 WHEN each section is rendered in light and dark, desktop and mobile, THE page SHALL show no visible difference from the captures qa takes of dev at the branch point, before any change. Aliased values are equal in 0.1.0 and the mockup (alpha rounding aside), so a difference is a bug to fix, never accepted.
- AC-6 THE contact form SHALL keep its behavior: `Button` and `Input` render, take keyboard focus, show their states and submit as on dev.
- AC-7 THE count of color literals in `src/index.css` SHALL not exceed its dev value (10); the four local tokens stay.
- AC-8 THE alias `--color-slate` SHALL read a semantic `--ws-color-slate` the release keeps from 0.1.0, never a `--ws-ref-*` primitive (rule 50).
- AC-9 `npm test` and `npm run build` SHALL pass.

## Screens and states

None: toolchain change. AC-5 compares against v1 on dev, not a v2 mockup.

## Data and rules touched

No personal data. Rules 05 (upgrade recorded) and 50 (tokens), ADR 003.

## Out of scope

- The SDK release: its own spec in WaraDS-Web (theme prefix to `--ws-*`, kebab-case, `--ws-color-slate` kept). The portfolio is its only consumer, so the rename breaks no other repo.
- Token requests for sink, scrim, bezel, line2: no `--ws-*` equivalent in the mockup; roadmap debt until a v2 spec needs them.
- Motion tokens and `@warastudio/motion`: no current code reads them; they come with the first v2 spec that does.
- Any v2 screen, renaming Tailwind aliases, the French comments of `index.css` beyond rewritten lines, the two unused fontsource packages.

## Open points

None. All decisions by Hedi on 2026-11-10 during `/clarify`.
