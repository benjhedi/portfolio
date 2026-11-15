# Spec 006 - SDK upgrade to --ws-*

Branch: `chore-wara-ds-ws-tokens` | Status: done (clarified 2026-11-10, amended and done 2026-11-15)
Roadmap line: Phase 1, wave 0, SDK upgraded from `--wara-*` (0.1.0) to the `--ws-*` version the mockup uses (Hedi, 2026-11-07; ADR 003).
Depends on: a WaraDS-Web release emitting `--ws-*` in kebab-case. None exists on 2026-11-10 (registry and WaraDS-Web `main` 72f5854 at 0.1.0). On 2026-11-15 that release is 0.2.0 of tokens, theme and react (WaraStudio/wara-ds-web#2 and #3 merged), validated locally from a3ef361, then published to GitHub Packages and pinned exactly.

## Why

The v2 mockup reads `--ws-*`; the site reads `--wara-*` through 20 aliases in `src/index.css`. Without the upgrade every v2 screen spec translates names by hand and drifts. Once it ships, a mockup variable maps one to one onto the code (ADR 003, option A).

## User stories, by priority

- P1 As the maintainer, I want the site to read `--ws-*` from the SDK so that v2 screens use the mockup's variables as written.
- P1 As the maintainer, I want v1 to render exactly as before in both themes so that the rename carries no visual change to production.
- P2 As the maintainer, I want an alias to an undefined SDK variable to fail a check so that a renamed token cannot pass silently (rule 50).

## Acceptance criteria (EARS)

- AC-1 THE manifest SHALL depend on the first `@warastudio/theme` and `@warastudio/react` release that emits `--ws-*` with names identical to `docs/v2/mockup/tokens.css`, and `npm ci` SHALL install it on Node 22 locally and in CI with `WARA_DS_TOKEN`. That release is 0.2.0, pinned with no range; until it is published, the other criteria are checked against tarballs packed from a3ef361 and installed with `npm install --no-save` (Hedi, 2026-11-15).
- AC-2 THE source tree SHALL contain 0 occurrences of `--wara-` (grep over `src/`).
- AC-3 THE diff against dev SHALL touch only `src/index.css`, `package.json`, `package-lock.json` and the AC-4 test; `src/main.tsx` and `ContactForm.tsx` only if the release changes an import path or the `Button`/`Input` API, each such change noted in the verification report. Tailwind names (`--color-*`, `--radius-*`, `--shadow-inset`) stay unchanged. Also allowed (Hedi, 2026-11-15): the two inline `--wara-*` colors of `ContactForm.tsx`, which AC-2 requires; the `main.tsx` comments citing `--wara-*`; the documents of AC-10; a preview entry in `.claude/launch.json` for AC-5; this spec folder; the `test` block of `vite.config.ts` so Vitest keeps `?raw` CSS for the AC-4 test.
- AC-4 IF a stylesheet of the site references an SDK variable the installed SDK does not define THEN `npm test` SHALL fail and name the variable.
- AC-5 WHEN each section is rendered in light and dark, desktop and mobile, THE page SHALL show no visible difference from the captures qa takes of dev at the branch point, before any change. Aliased values are equal in 0.1.0 and the mockup (alpha rounding aside), so a difference is a bug to fix, never accepted. Proof (Hedi, 2026-11-15): on the built site, a script reads every alias on `html` and the computed styles of the contact `Button` and `Input`, light then dark, and finds them equal to dev's; full-page screenshots at 1440 and 390 in both themes, before and after, show no pixel difference.
- AC-6 THE contact form SHALL keep its behavior: `Button` and `Input` render, take keyboard focus, show their states and submit as on dev.
- AC-7 THE count of color literals in `src/index.css` SHALL not exceed its dev value (10); the four local tokens stay.
- AC-8 THE alias `--color-slate` SHALL read a semantic `--ws-color-slate` the release keeps from 0.1.0, never a `--ws-ref-*` primitive (rule 50).
- AC-9 `npm test` and `npm run build` SHALL pass.
- AC-10 ADR 003 SHALL record version 0.2.0 and its date, decision unchanged, and that the token requests for the four local tokens wait for a v2 spec that needs them; `product/tech-stack.md` SHALL show 0.2.0; the roadmap line SHALL be checked (Hedi, 2026-11-15).

## Screens and states

None: toolchain change. AC-5 compares against v1 on dev, not a v2 mockup.

## Data and rules touched

No personal data. Rules 05 (upgrade recorded) and 50 (tokens), ADR 003.

## Out of scope

- The SDK release: its own work in WaraDS-Web (theme prefix to `--ws-*`, kebab-case, `--ws-color-slate` kept), done as roadmap ticket F2 there. The portfolio is its only consumer, so the rename breaks no other repo.
- Token requests for sink, scrim, bezel, line2: no `--ws-*` equivalent in the mockup; roadmap debt until a v2 spec needs them.
- Motion tokens and `@warastudio/motion`: no current code reads them; they come with the first v2 spec that does.
- Any v2 screen, renaming Tailwind aliases, the French comments of `index.css` beyond rewritten lines, the two unused fontsource packages.

## Open points

None. All decisions by Hedi on 2026-11-10 during `/clarify`, amended on 2026-11-15.

## Amendments

| Date | Change | Decision |
|---|---|---|
| 2026-11-15 | Header branch and dependency; AC-1 exact pin and local check before publish; AC-3 widened (`ContactForm.tsx` inline colors, `main.tsx` comments, AC-10 documents, `launch.json`, spec folder); AC-5 proof method; AC-10 added. Folds in a parallel spec drafted the same day as `specs/006-wara-ds-ws-tokens/`, removed in the same commit | Hedi |
| 2026-11-15 | AC-3 allows the `test` block of `vite.config.ts`: Vitest empties CSS modules, `?raw` included, unless `test.css.include` lists them, and `@types/node` stays out of `src/` | Hedi (option A over adding `@types/node`) |
