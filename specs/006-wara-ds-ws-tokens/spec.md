# Spec 006 - Wara DS SDK on --ws-* tokens

Branch: `chore-wara-ds-ws-tokens` | Status: planned (2026-11-15)
Roadmap line: Phase 1, "Wave 0: the Wara DS SDK is upgraded from `--wara-*`
(0.1.0) to the `--ws-*` version the mockup uses, before the first v2 screen
spec" (Hedi, 2026-11-07).
Depends on: `@warastudio/theme` and `@warastudio/react` 0.2.0, published
from wara-ds-web with the WaraDS `--ws-*` names and the ref palette (Hedi,
2026-11-15, option A). Not published on 2026-11-15: 0.1.0 is the only
version on the registry, and wara-ds-web has not changed since 2026-07-05.

## Why

The v2 mockup reads 61 `--ws-*` variables from the WaraDS brand source
(`build/web/tokens.css`); the site reads 22 `--wara-*` from SDK 0.1.0.
Values match in both themes, names do not, and 0.1.0 exposes no
mode-independent ref palette, which the hero needs (`--ws-ref-ink`,
`ref-porcelain`, `ref-blue-grey-200`, `ref-surface`, `ref-charcoal`). Once
this ships, a v2 section uses the mockup's token names as they are, read
from the SDK.

## User stories, by priority

- P1 As the maintainer, I want the site to read `--ws-*` from the SDK so
  that a v2 section copies the mockup's tokens without a translation table.
- P1 As the maintainer, I want v1 to render identically so that the
  upgrade carries no risk to the live site.
- P2 As the maintainer, I want ADR 003 and the tech stack to name the
  version so that the next session does not search for it.

## Acceptance criteria (EARS)

- AC-1 THE `src/` tree SHALL contain no `--wara-` string, comments included.
- AC-2 THE Tailwind `--color-*`, `--radius-*`, `--shadow-inset` aliases and
  `--grad-brand` SHALL point to SDK `--ws-*` variables (`--color-slate` to
  `--ws-ref-slate-500`, same value in both themes).
- AC-3 THE manifest SHALL pin `@warastudio/theme` and `@warastudio/react`
  to exactly 0.2.0, with no range, and the lockfile SHALL resolve both to
  0.2.0.
- AC-4 WHEN the built site is shown in light and in dark THE computed value
  of every alias of AC-2 on `html`, and the computed styles of the contact
  form Button and Input, SHALL equal those of dev before the change (script
  output, strict equality); a before and after screenshot pair at 1440 and
  390 in each theme SHALL be attached to `verification.md` (Hedi,
  2026-11-15).
- AC-5 THE installed SDK SHALL define, in both themes, every `--ws-*`
  variable that `docs/v2/mockup/index.html` uses (61 on 2026-11-15).
- AC-6 WHEN `npm ci`, `npm test` and `npm run build` run on Node 22 THE
  SYSTEM SHALL pass, and `npm audit` SHALL report 0 vulnerabilities.
- AC-7 ADR 003 SHALL record version 0.2.0 and its date, decision unchanged,
  and SHALL state that the WaraDS token requests for the four local tokens
  are dropped, with the reason; `product/tech-stack.md` SHALL show 0.2.0;
  the roadmap line SHALL be checked.

## Screens and states

None: toolchain change, nothing rendered changes.

## Data and rules touched

No personal data. Rules 05 (dependency recorded) and 50 (tokens).

The four local tokens (`--color-sink`, `--color-scrim`, `--color-bezel`,
`--color-line2`) stay in `index.css` with their dark overrides; 0.2.0 does
not carry them. No WaraDS token request: each v2 section spec reassesses
them, and most should go away with the rewrite. The v2 mockup uses none of
them; its phone reads `--ws-ref-ink` (Hedi, 2026-11-15).

## Out of scope

- Any v2 section; moving files to `src/sections/`.
- The unused fontsource packages (Hedi decides).
- The fixed white and the two mask gradients in `index.css`.
- Refreshing `docs/v2/mockup/tokens.css`, an older subset of the brand
  source (17 variables behind on 2026-11-15).
- The wara-ds-web work that produces 0.2.0: its own repo, its own session.

## Open points

None. Both markers resolved by Hedi on 2026-11-15.
