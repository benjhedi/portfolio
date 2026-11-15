# Tasks 006 - Wara DS SDK on --ws-* tokens

Plan: `plan.md` (all gates OPEN for phase 1) | Branch: `chore-wara-ds-ws-tokens` off `dev`

Toolchain change: the architecture rule's construction order covers new
units, none here, so the order follows the plan's split at the publish:
baseline, local rename, publish checkpoint, registry pin, record. No `[P]`:
each task needs the previous one. Nothing is pushed before T07.

## Tasks

### Phase 1 - local 0.2.0, no publish

- [ ] T01 preview entry for the built site - files: `.claude/launch.json`
  (`portfolio-preview`, `npm run preview`, port 8787) - check:
  `preview_start` answers 200 on `/` - agent: setup-agent
- [ ] T02 baseline on dev's 0.1.0: capture script, computed JSON (every
  alias of AC-2 on `html`, contact Button and Input styles, light then
  dark), 8 screenshots (1440 and 390, both themes) kept out of git -
  files: `specs/006-wara-ds-ws-tokens/capture-computed.js`,
  `specs/006-wara-ds-ws-tokens/computed-before.json` - check: JSON holds
  both themes and both controls - agent: qa
- [ ] T03 install 0.2.0 locally: pack tokens, theme, react from wara-ds-web
  `origin/changeset-release/main` into the scratchpad, `npm install
  --no-save` the three tarballs - files: none, no commit - check: `npm ls`
  shows 0.2.0, `git status` clean - agent: setup-agent
- [ ] T04 rename the 22 references: Tailwind aliases and the comments
  citing `--wara-*` in `index.css` (rewritten in English), two inline
  colors in `ContactForm.tsx`, the comment in `main.tsx` - files:
  `src/index.css`, `src/components/ContactForm.tsx`, `src/main.tsx` -
  check: `grep -rn -- "--wara-" src` empty, `npm run build` exits 0 -
  agent: developer
- [ ] T05 local verify: AC-1, AC-2, AC-5, then AC-4 against T02 (computed
  JSON equal, screenshot pixel diff) - files:
  `specs/006-wara-ds-ws-tokens/computed-after-local.json` - check: diff
  output shown - agent: qa

### Checkpoint - publish, Hedi's call

- [ ] T06 Hedi reviews T05, merges wara-ds-web PR #3; `release.yml` is
  dispatched on his go - files: none in this repo - check: `npm view
  @warastudio/theme versions` lists 0.2.0 - agent: Hedi, or the main
  session on his go

### Phase 2 - registry 0.2.0

- [ ] T07 pin 0.2.0 exactly: `npm install --save-exact
  @warastudio/theme@0.2.0 @warastudio/react@0.2.0` - files:
  `package.json`, `package-lock.json` - check: AC-3 and AC-6 commands -
  agent: setup-agent
- [ ] T08 record the upgrade: ADR 003 amended (0.2.0, date, token requests
  dropped and why), tech-stack table and Design line, `CLAUDE.md` line on
  the SDK - files: `docs/adr/003-wara-ds-sdk.md`, `product/tech-stack.md`,
  `CLAUDE.md` - check: AC-7 greps - agent: setup-agent
- [ ] T09 verify - every AC on the registry install, AC-4 rerun against
  T02 - files: `specs/006-wara-ds-ws-tokens/verification.md`,
  `specs/006-wara-ds-ws-tokens/computed-after.json` - agent: qa
- [ ] T10 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` to done, checks the roadmap line and opens the PR
  to `dev` - files: `spec.md`, `product/roadmap.md` - agent: review-agent

## Test plan (derived from the EARS criteria)

Shell, build and browser checks, run by qa and recorded with their output
in `verification.md`; none is a committed Vitest test (no TypeScript unit
changes, ADR 001).

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | no `--wara-` left anywhere in `src/` | grep | `findsNoWaraVariableInSrc` |
| AC-2 | each alias reads `var(--ws-...)`, the four local tokens excepted | grep on `index.css` | `aliasesPointToWsTokens` |
| AC-3 | both packages at `"0.2.0"`, lockfile resolves them from GitHub Packages | manifest and lockfile read | `pinsSdkToExactVersion` |
| AC-4 | aliases on `html` compute the same values, light and dark | script on the built site, JSON diff | `keepsComputedTokensInBothThemes` |
| AC-4 | contact Button and Input keep their computed styles | script, JSON diff | `keepsContactControlsStyles` |
| AC-4 | 1440 and 390, both themes, before and after match | screenshot pixel diff | `rendersV1Identically` |
| AC-5 | the 61 mockup variables are defined by the installed theme CSS | script on `dist/style.css` | `definesEveryMockupToken` |
| AC-6 | `npm ci`, `npm test`, `npm run build` exit 0 on Node 22; audit 0 | commands | `installsTestsAndBuildsOnNode22` |
| AC-6 | CI green on the PR | CI run | `passesCiOnPullRequest` |
| AC-7 | ADR 003, tech-stack and roadmap name 0.2.0 | grep | `recordsVersionInAdrAndStack` |

## Done when

- All boxes checked, T01, T02, T04, T05, T07 to T10 each with its commit
  on the branch (T03 and T06 change nothing here).
- qa report attached (build, tests, computed diff, screenshots).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done, roadmap line checked.
