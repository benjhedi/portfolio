# Spec 009 - SDK 0.3.0 pin

Branch: `chore-sdk-0-3-0` | Status: done (2026-11-16, review APPROVED; light flow chosen by Hedi: spec, plan and tasks in one pass)
Roadmap line: none of its own; prerequisite of Phase 1 "A visitor sees the hero" (spec 007, tokens gate).

## Why

Spec 007 needs four shared tokens Hedi chose to add to the design system: `--ws-motion-reveal`, `--ws-motion-stagger`, `--ws-ease-emphasized`, `--ws-track-label` (decision log, 2026-11-15; the reveal rise reuses `--ws-space-24`). WaraDS-Web published them in `@warastudio/theme` 0.3.0 and `@warastudio/react` 0.2.1 (benjhedi/WaraDS#3). Under ADR 003 an SDK upgrade is its own change: pinned exactly, built, and checked to change nothing visible, before any screen reads the new tokens.

## User stories, by priority

- P1 As the maintainer, I want the site to install the SDK version that defines the four tokens so that spec 007 can read them.
- P1 As the maintainer, I want the v1 site to render exactly as before in both themes so that the upgrade carries no visual change to production.

## Acceptance criteria (EARS)

- AC-1 THE manifest SHALL depend on `@warastudio/theme` 0.3.0 and `@warastudio/react` 0.2.1, pinned with no range, and `npm ci` SHALL install them on Node 22 locally and in CI with `WARA_DS_TOKEN`.
- AC-2 THE installed theme CSS SHALL define `--ws-motion-reveal`, `--ws-motion-stagger`, `--ws-ease-emphasized` and `--ws-track-label`, and every `--ws-*` that 0.2.0 defined, with the same values in light and dark.
- AC-3 WHEN each section is rendered in light and dark at 1440 and 390 THE page SHALL show no visible difference from dev: the computed custom properties on `html` and the contact `Button` and `Input` styles equal dev's, and the full-page screenshots differ by no pixel beyond the noise floor of two captures of dev (spec 006 capture script).
- AC-4 THE contact form SHALL keep its behavior: `Button` and `Input` render, take keyboard focus, show their states and submit as on dev.
- AC-5 THE diff against dev SHALL touch only `package.json`, `package-lock.json`, this spec folder, and the lines that name the SDK version: ADR 003, `product/tech-stack.md`, `CLAUDE.md`; `npm test` and `npm run build` pass.

## Screens and states

None: no screen changes.

## Data and rules touched

No data. Rule 05 (dependency recorded in ADR 003 and `product/tech-stack.md`), rule 06 (the `read:packages` token stays in `~/.npmrc`, never printed), rule 50 (no new literal).

## Out of scope

Reading the new tokens anywhere in `src/` (spec 007, T19 onward); the `@warastudio/motion` package; any change to the four local tokens of ADR 003.

## Open points

None.
