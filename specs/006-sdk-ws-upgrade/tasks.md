# Tasks 006 - SDK upgrade to --ws-*

Plan: `plan.md` (all gates OPEN for phase 1) | Branch: `chore-wara-ds-ws-tokens` off `dev`

Toolchain change: the architecture rule's construction order covers new
units, none here, so the order follows the plan's split at the publish:
baseline, local rename, guard test, publish checkpoint, registry pin,
record. No `[P]`: each task needs the previous one. Nothing is pushed
before T08.

## Tasks

### Phase 1 - local 0.2.0, no publish

- [x] T01 preview entry for the built site - files: `.claude/launch.json`
  (`portfolio-preview`, `npm run preview`, port 8787) - check:
  `preview_start` answers 200 on `/` - agent: setup-agent
- [x] T02 baseline on dev's 0.1.0: capture script (Node and system Chrome
  over CDP, reduced motion), computed JSON (every custom property the site
  declares on `html`, contact controls' styles, light then dark), 8
  screenshots (1440 and 390, both themes) kept out of git, contact form
  keyboard pass - files: `specs/006-sdk-ws-upgrade/capture.mjs`,
  `specs/006-sdk-ws-upgrade/computed-before.json`,
  `specs/006-sdk-ws-upgrade/keyboard-before.json` - check: two captures
  of dev diff to 0 values and 0 pixels - agent: qa
- [x] T03 install 0.2.0 locally: pack tokens, theme, react from wara-ds-web
  `origin/changeset-release/main` into the scratchpad, `npm install
  --no-save` the three tarballs - files: none, no commit - check: `npm ls`
  shows 0.2.0, `git status` clean - agent: setup-agent
- [x] T04 rename the 22 references: Tailwind aliases (`--color-slate` to
  `--ws-color-slate`) and the comments citing `--wara-*` in `index.css`
  (rewritten in English), two inline colors in `ContactForm.tsx`, the
  comment in `main.tsx` - files: `src/index.css`,
  `src/components/ContactForm.tsx`, `src/main.tsx` - check: `grep -rn --
  "--wara-" src` empty, `npm run build` exits 0 - agent: developer
- [ ] T05 guard test for AC-4: every `var(--ws-...)` in `src/` is defined by
  the installed theme CSS, failures name the variable - files:
  `src/sdkTokens.test.ts` - check: red with a planted `var(--ws-nope)`
  (reverted), green after - agent: test-coder
- [ ] T06 local verify: AC-2 to AC-8 against T02 (computed JSON equal,
  screenshot pixel diff, keyboard pass) - files:
  `specs/006-sdk-ws-upgrade/computed-after-local.json` - check: diff output
  shown - agent: qa

### Checkpoint - publish, Hedi's call

- [ ] T07 Hedi reviews T06, merges wara-ds-web PR #3; `release.yml` is
  dispatched on his go - files: none in this repo - check: `npm view
  @warastudio/theme versions` lists 0.2.0 - agent: Hedi, or the main
  session on his go

### Phase 2 - registry 0.2.0

- [ ] T08 pin 0.2.0 exactly: `npm install --save-exact
  @warastudio/theme@0.2.0 @warastudio/react@0.2.0` - files:
  `package.json`, `package-lock.json` - check: AC-1 and AC-9 commands -
  agent: setup-agent
- [ ] T09 record the upgrade: ADR 003 amended (0.2.0, date, token requests
  waiting for a v2 spec), tech-stack table and Design line, `CLAUDE.md` line
  on the SDK - files: `docs/adr/003-wara-ds-sdk.md`,
  `product/tech-stack.md`, `CLAUDE.md` - check: AC-10 greps - agent:
  setup-agent
- [ ] T10 verify - every AC on the registry install, AC-5 rerun against
  T02 - files: `specs/006-sdk-ws-upgrade/verification.md`,
  `specs/006-sdk-ws-upgrade/computed-after.json` - agent: qa
- [ ] T11 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` to done, checks the roadmap line and opens the PR
  to `dev` - files: `spec.md`, `product/roadmap.md` - agent: review-agent

## Test plan (derived from the EARS criteria)

AC-4 is a committed Vitest test (ADR 001, node environment). The other rows
are shell, build and browser checks run by qa and recorded with their
output in `verification.md`.

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | both packages at `"0.2.0"`, lockfile resolves them from GitHub Packages, `npm ci` on Node 22 | manifest, lockfile, command | `pinsSdkToExactVersion` |
| AC-2 | no `--wara-` left anywhere in `src/` | grep | `findsNoWaraVariableInSrc` |
| AC-3 | the diff touches only the allowed files | `git diff --name-only` | `touchesOnlyAllowedFiles` |
| AC-4 | a `var(--ws-...)` the SDK does not define fails `npm test` and is named | unit, Vitest | `failsOnUndefinedSdkVariable` |
| AC-5 | aliases and contact control styles compute the same, light and dark | script on the built site, JSON diff | `keepsComputedStylesInBothThemes` |
| AC-5 | 1440 and 390, both themes, before and after match | screenshot pixel diff | `rendersV1Identically` |
| AC-6 | Tab order, focus, empty and filled submit behave as on dev | keyboard pass, qa | `keepsContactFormBehavior` |
| AC-7 | color literals in `index.css` at most 10 | grep count | `keepsLiteralCountAtMostTen` |
| AC-8 | `--color-slate` reads `var(--ws-color-slate)` | grep | `readsSemanticSlate` |
| AC-9 | `npm test`, `npm run build` exit 0 on Node 22; CI green | commands, CI run | `testsAndBuildsOnNode22` |
| AC-10 | ADR 003, tech-stack and roadmap name 0.2.0 | grep | `recordsVersionInAdrAndStack` |

## Done when

- All boxes checked, T01, T02, T04 to T06, T08 to T11 each with its commit
  on the branch (T03 and T07 change nothing here).
- qa report attached (build, tests, computed diff, screenshots, keyboard).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done, roadmap line checked.
