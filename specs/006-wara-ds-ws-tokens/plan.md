# Plan 006 - Wara DS SDK on --ws-* tokens

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system: `@warastudio/theme` and `@warastudio/react` 0.2.0, packed
  locally from wara-ds-web `origin/changeset-release/main` (a3ef361, PR #3,
  open, not published on 2026-11-15) | OPEN for T01 to T04; the registry
  part (T05 to T07) waits for the publish, Hedi's call
- Tokens: the 22 `--wara-*` of `src/` all exist as `--ws-*` in 0.2.0, same
  values in both themes; `--color-slate` maps to `--ws-ref-slate-500`; the
  four local tokens stay (spec) | OPEN
- Mockups: none, no screen (spec, Screens and states) | OPEN

Rules and skills
- Rules that apply: 00 to 07; 05 (upgrade recorded in ADR 003 and
  `product/tech-stack.md`); 06 (the `read:packages` token stays in
  `~/.npmrc`); 10-architecture (files under `src/`); 30, 31 (paths match
  `.css`, `.tsx`; no behavior change); 50 (no new literal); 90 (stack
  unchanged). Not matched: 60 (no screen).
- Skills to load: `commit`, `verify`.
- Constitution principles touched: 2 (variable names in the page source go
  from `--wara-*` to `--ws-*`, same exposure as today, nothing visible),
  7 (tokens only, no literal added), 8, 9 (same two packages, exact pin),
  11 (computed styles unchanged in both themes, so contrast and focus too).

Architecture
- Units: none new; edits in place | covered by the rule: yes
- Modules touched: `src/index.css`, `src/components/ContactForm.tsx`
  (legacy folder, edited in place, not moved: spec out of scope),
  `src/main.tsx` (comment); `package.json`, `package-lock.json`;
  `docs/adr/003-wara-ds-sdk.md`, `product/tech-stack.md`,
  `product/roadmap.md`, `CLAUDE.md` (line 42); `.claude/launch.json`
  (a preview entry for AC-4) | boundary crossed: none

Verification
- AC-1: `grep -rn -- "--wara-" src` prints nothing.
- AC-2: every `--color-*`, `--radius-*`, `--shadow-inset`, `--grad-brand`
  declaration in `src/index.css` reads `var(--ws-...)`, except the four
  local tokens and their dark overrides (grep listed in the report).
- AC-3: `package.json` holds `"0.2.0"` with no range for both; the lockfile
  resolves both from `npm.pkg.github.com` at 0.2.0.
- AC-4: on the built site (`npm run preview`), a script reads every alias of
  AC-2 on `html` and the computed styles of the contact Button and Input, in
  light then dark; the before JSON (dev, 0.1.0) and after JSON are equal.
  Screenshots at 1440 and 390, both themes, before and after, pixel diff.
- AC-5: the coverage script run on `node_modules/@warastudio/theme/dist/style.css`
  finds the 61 mockup variables in both themes.
- AC-6: on Node 22, `npm ci`, `npm test`, `npm run build` exit 0;
  `npm audit` prints 0 vulnerabilities; CI green on the PR.
- AC-7: ADR 003 cites 0.2.0, its date and the dropped token requests;
  tech-stack shows 0.2.0; the roadmap line is `[x]`.

## Technical approach

Two phases, split by the publish.
1. Local (no publish): qa captures the baseline on dev's 0.1.0 (computed JSON
   and 8 screenshots). setup-agent packs tokens, theme and react 0.2.0 from
   the wara-ds-web PR #3 branch into the scratchpad and installs them with
   `npm install --no-save`. developer renames the 22 references (aliases in
   `index.css`, two inline colors in `ContactForm.tsx`) and rewrites only the
   comments that cite `--wara-*`, in English. qa reruns AC-1, 2, 4, 5. Hedi
   looks at the result and decides the publish.
2. Registry (after the publish): setup-agent pins 0.2.0 exactly
   (`npm install --save-exact`), commits manifest and lockfile; qa reruns
   AC-3 to AC-6 on the registry build; ADR 003, tech-stack, roadmap and
   `CLAUDE.md` are updated; review-agent, then PR to `dev`.

Rejected: `file:` tarballs in `package.json` (the lockfile would point at
the scratchpad, CI cannot install); `npm link` (symlinks, risk of a second
copy of `@vanilla-extract/css` and React); a local registry such as
Verdaccio (extra tooling for one check); publishing first (Hedi wants the
local check before).

## Data model and contracts

None. No personal data.

## Risks and open decisions

- Branch commits from phase 1 read `--ws-*` while `package.json` still says
  `^0.1.0`: v1 would render unstyled from a clean install. Nothing is pushed
  before T05.
- The CI build of 0.2.0 could differ from the local pack (other Node or pnpm):
  AC-4 runs again in phase 2 on the registry install.
- AC-4 compares states at rest; hover and focus of Button and Input are
  covered by the SDK check (react CSS identical to 0.1.0 after renaming).
- Publishing: merging PR #3 is not enough, the push trigger has never fired
  on this repo; a manual `release.yml` run publishes.
- Screenshots stay out of git (PNGs outside `docs/` are not under LFS, as
  in spec 005); `verification.md` records the pixel diff, the two computed
  JSON files go in the spec folder.

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
