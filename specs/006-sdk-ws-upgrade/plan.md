# Plan 006 - SDK upgrade to --ws-*

Spec: `spec.md` (clarified, amended 2026-11-15) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system: `@warastudio/theme` and `@warastudio/react` 0.2.0, packed
  locally from wara-ds-web `origin/changeset-release/main` (a3ef361) for
  phase 1, then published on 2026-11-15 (PR #3 merged, byte-identical CSS)
  for phase 2 | OPEN
- Tokens: the 22 `--wara-*` of `src/` all exist as `--ws-*` in 0.2.0, same
  values in both themes; `--color-slate` reads `--ws-color-slate` (AC-8);
  the 128 names of `docs/v2/mockup/tokens.css` all exist in 0.2.0, plus
  `--ws-color-on-brand`, `--ws-color-scrim`, `--ws-color-slate` (SDK only);
  the four local tokens stay (AC-7) | OPEN
- Mockups: none, no screen (spec, Screens and states) | OPEN

Rules and skills
- Rules that apply: 00 to 07; 05 (upgrade recorded in ADR 003 and
  `product/tech-stack.md`); 06 (the `read:packages` token stays in
  `~/.npmrc`); 10-architecture (files under `src/`, test placement); 30,
  31 (paths match `.css`, `.tsx`; no behavior change); 50 (no new literal,
  semantic token for slate); 90 (stack unchanged). Not matched: 60.
- Skills to load: `commit`, `verify`.
- Constitution principles touched: 2 (variable names in the page source go
  from `--wara-*` to `--ws-*`, same exposure as today, nothing visible),
  7 (tokens only, AC-4 test guards undefined ones), 8, 9 (same two
  packages, exact pin), 11 (computed styles unchanged in both themes).

Architecture
- Units: none new in the app; one guard test | covered by the rule: yes,
  Vitest node environment, `*.test.ts` under `src/` (ADR 001)
- Modules touched: `src/index.css`, `src/components/ContactForm.tsx`
  (legacy folder, edited in place, not moved), `src/main.tsx` (comment),
  `src/sdkTokens.test.ts` (new); `package.json`, `package-lock.json`;
  `docs/adr/003-wara-ds-sdk.md`, `product/tech-stack.md`,
  `product/roadmap.md`, `CLAUDE.md` (SDK line); `.claude/launch.json`
  (preview entry); `vite.config.ts` (Vitest keeps `?raw` CSS, test only)
  | boundary crossed: none

Verification
- AC-1: `package.json` holds `"0.2.0"` with no range for both; the lockfile
  resolves both from `npm.pkg.github.com`; `npm ci` on Node 22 and in CI.
- AC-2: `grep -rn -- "--wara-" src` prints nothing.
- AC-3: `git diff --name-only dev...HEAD` lists only the allowed files.
- AC-4: `npm test` runs `src/sdkTokens.test.ts`; shown red once with a
  planted `var(--ws-nope)` (reverted, not committed), then green.
- AC-5: on the built site (`npm run preview`), the capture script's JSON
  before (dev, 0.1.0) and after are equal, light and dark; screenshots at
  1440 and 390, both themes, pixel diff empty.
- AC-6: keyboard pass on the contact form, before and after: Tab order,
  visible focus on both inputs and the button, empty submit, filled submit;
  same states and messages (Web3Forms key absent locally on both sides).
- AC-7: `grep -cE "#[0-9a-fA-F]{3,8}|rgba?\(" src/index.css` is at most 10.
- AC-8: `grep -n "color-slate" src/index.css` reads `var(--ws-color-slate)`.
- AC-9: `npm test`, `npm run build` exit 0 on Node 22; CI green on the PR.
- AC-10: ADR 003 cites 0.2.0, its date and the waiting token requests;
  tech-stack shows 0.2.0; the roadmap line is `[x]`.

## Technical approach

Two phases, split by the publish.
1. Local (no publish): qa captures the baseline on dev's 0.1.0 (computed
   JSON, 8 screenshots, form keyboard pass). setup-agent packs tokens, theme
   and react 0.2.0 from the wara-ds-web PR #3 branch into the scratchpad and
   installs them with `npm install --no-save`. developer renames the 22
   references and rewrites only the comments citing `--wara-*`, in English.
   test-coder adds the AC-4 guard: it collects every `var(--ws-...)` in
   `src/**/*.css` and `src/**/*.tsx` and every `--ws-*` defined by
   `node_modules/@warastudio/theme/dist/style.css`, and fails naming each
   reference with no definition. It reads them through Vite `?raw` imports
   (no `@types/node`, `tsc -b` checks `src/`); Vitest empties every CSS
   module unless `test.css.include` lists it, so `vite.config.ts` lists
   `?raw` ids, and the test also fails if a collected CSS file is empty
   (Hedi, 2026-11-15). qa reruns AC-2 to AC-8. Hedi decides the publish.
2. Registry (after the publish): setup-agent pins 0.2.0 exactly
   (`npm install --save-exact`), commits manifest and lockfile; ADR 003,
   tech-stack and `CLAUDE.md` are updated; qa reruns every AC on the
   registry install; review-agent, then PR to `dev`.

Rejected: `file:` tarballs in `package.json` (the lockfile would point at
the scratchpad, CI cannot install); `npm link` (symlinks, risk of a second
copy of `@vanilla-extract/css` and React); a local registry such as
Verdaccio (extra tooling for one check); publishing first (Hedi wants the
local check before); `--ws-ref-slate-500` for slate (AC-8, rule 50).

## Data model and contracts

None. No personal data. The AC-4 test reads files only, no network.

## Risks and open decisions

- Phase 1 commits read `--ws-*` while `package.json` still says `^0.1.0`:
  v1 renders unstyled from a clean install. Nothing is pushed before the pin.
- The CI build of 0.2.0 could differ from the local pack (other Node or
  pnpm): AC-5 runs again in phase 2 on the registry install.
- AC-5 compares states at rest; hover and focus of Button and Input are
  covered by AC-6 and by the SDK check (react CSS identical to 0.1.0 after
  renaming, WaraDS-Web F2).
- Publishing: merging PR #3 is not enough, the push trigger has never fired
  on that repo; a manual `release.yml` run publishes.
- Screenshots stay out of git (PNGs outside `docs/` are not under LFS, as
  in spec 005); `verification.md` records the pixel diff; the capture
  script and the computed JSON files go in the spec folder.

## Research notes

- `npm install --no-save <3 tarballs>` on Node 22.23.5: installs 0.2.0,
  `package.json` and `package-lock.json` unchanged, `npm run build` passes;
  `npm ls` flags them invalid against `^0.1.0`, expected (scratch copy,
  2026-11-15).
- The packed theme declares `@warastudio/tokens` `0.2.0` and react declares
  theme `0.2.0`: pnpm pack rewrites `workspace:*`, so the three tarballs go
  in together.
- Custom properties compute with `var()` substituted, so `getPropertyValue`
  on `html` returns the resolved token value.
