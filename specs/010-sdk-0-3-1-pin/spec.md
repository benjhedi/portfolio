# Spec 010 - SDK 0.3.1 pin

Branch: `chore-sdk-0-3-1` | Status: done (2026-11-16, review APPROVED; the submit button exception and the CI row noted in `verification.md`; light flow as spec 009: spec, plan and tasks in one pass, Hedi; AC-4, AC-5 and scope amended after the T01 baseline, AC-4 again after T04, Hedi)
Roadmap line: "A keyboard visitor sees every focus ring at 3:1 in both themes" (Phase 1); it gates the next `v*` tag.

## Why

The spec 007 verification measured the SDK focus ring `--ws-color-focus-ring` at 1.3:1 against the light page, under the 3:1 of WCAG 1.4.11 (finding 1); WaraDS-Web then found the dark ring at 2.999:1 on `--ws-color-surface`. Hedi chose option A on 2026-11-16: an opaque ring, sky.500 `#2f7fc4` in light and sky.400 `#41c0f2` in dark (benjhedi/WaraDS#4, decision log 2026-11-16). WaraDS-Web published it in `@warastudio/theme` 0.3.1 and `@warastudio/react` 0.2.2, a value fix with no new name. Under ADR 003 the upgrade is its own change: pinned exactly, built, and checked to change only the focus rings.

## User stories, by priority

- P1 As a keyboard visitor, I want every focus ring to stand out from what surrounds it in both themes so that I always see where I am.
- P1 As the maintainer, I want the site to render exactly as before outside focus states so that the upgrade carries no other visual change.

## Acceptance criteria (EARS)

- AC-1 THE manifest SHALL depend on `@warastudio/theme` 0.3.1 and `@warastudio/react` 0.2.2, pinned with no range, and `npm ci` SHALL install them on Node 22 locally and in CI with `WARA_DS_TOKEN`.
- AC-2 THE installed theme CSS SHALL define `--ws-color-focus-ring` as `#2f7fc4` in light and `#41c0f2` in dark, and every other `--ws-*` that 0.3.0 defined with the same value in light and dark.
- AC-3 WHEN each section is rendered without focus in light and dark at 1440 and 390 THE page SHALL show no visible difference from dev: the computed custom properties on `html` and the contact `Button` and `Input` styles equal dev's, and the full-page screenshots differ by no pixel beyond the noise floor of two captures of dev (spec 006 capture script).
- AC-4 WHEN a keyboard visitor focuses the contact form fields and button, the hero toggle and the hero hint THE focus ring SHALL paint `--ws-color-focus-ring` and reach at least 3:1 against the color next to it, in light and dark: the page or surface behind the form fields and the hint; for the submit button, the page on its top edge, while its own 28 px glow darkens the side and bottom edges (measured and recorded, accepted by Hedi on 2026-11-16 after T04 because the v2 contact spec replaces this button before the next `v*` tag); for the hero toggle, a two-color indicator (WCAG technique C40): the ring against the porcelain gap or against the video around it. The contact form SHALL otherwise behave as on dev (render, focus order, states, submit).
- AC-6 THE message textarea of the contact form SHALL draw its focus ring from `--ws-color-focus-ring` like the SDK fields, instead of the accent-hover color at 40 % (`src/components/ContactForm.tsx`, found by the T01 baseline at 1.23:1 light and 2.38:1 dark).
- AC-5 THE diff against dev SHALL touch only `package.json`, `package-lock.json`, this spec folder, the lines that name the SDK version (ADR 003, `product/tech-stack.md`, `CLAUDE.md`), the roadmap focus ring line, the decision log entry of the T04 decision and the textarea class of AC-6; `npm test` and `npm run build` pass.

## Screens and states

No layout change. Focus states only: contact form controls, hero toggle, hero hint, light and dark.

## Data and rules touched

No data. Rule 05 (dependency recorded in ADR 003 and `product/tech-stack.md`), rule 06 (the `read:packages` token stays in `~/.npmrc`, never printed), rule 50 (no new literal, no local override).

## Out of scope

Any change in `src/` beyond the AC-6 textarea class; the submit button glow (v2 contact spec); the `@warastudio/motion` package (not a site dependency); the manual Safari, Firefox and keyboard rows of spec 007, which Hedi runs on a Cloudflare preview before the tag; the `v*` tag itself.

## Open points

None.
