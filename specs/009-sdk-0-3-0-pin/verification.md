# Verification 009 - SDK 0.3.0 pin

Date: 2026-11-16 | Branch: `chore-sdk-0-3-0` | HEAD: `fdb1fc5` (before this report)
Base: `origin/dev` at `01eb184` | Run by: qa (T01 baseline, T04), Node 22.23.5, npm 10.9.9

```
Verdict: PASS locally; the AC-1 CI row is pending until the PR runs
Criteria: AC-1 to AC-5 green locally, 0 red
Build and lint: npm ci, npm test (1 passed), npm run build exit 0; no lint script in package.json
Screens: none, toolchain change; v1 compared to dev, 4 full pages and 276 computed values
Scenarios walked: contact form keyboard pass, light and dark, scripted over CDP
Not verified and why: CI on the PR (no PR yet); filled submit, hover and loading states (see below)
```

## Setup

- Baseline (T01): `origin/dev` source with `@warastudio/theme` 0.2.0 and
  `@warastudio/react` 0.2.0 installed, built, served by `npm run preview`
  (wrangler, port 8787). Theme `dist/style.css` sha256 `6f9b05d6b5abde0f`
  (first 16 hex), the file spec 006 validated.
- After (T04): HEAD `fdb1fc5`, `npm ci` from the committed lockfile, same
  build and preview.
- Tools: `specs/006-sdk-ws-upgrade/capture.mjs` as is; two scratch tools,
  out of git: `extract-ws.mjs` (every `--ws-*` of the installed theme CSS
  per selector, plus the effective dark set) and `keyboard.mjs` (the spec
  006 AC-6 pass driven over CDP, same JSON shape as
  `specs/006-sdk-ws-upgrade/keyboard-before.json`). Captures, JSON and
  tools stay in the session scratchpad.

## AC-1 - exact pin, install - `pinsSdkExactly`

```
package.json   "@warastudio/react": "0.2.1", "@warastudio/theme": "0.3.0"   (no range)
package-lock   node_modules/@warastudio/react   0.2.1  https://npm.pkg.github.com/download/@warastudio/react/0.2.1/eaffc5d...
               node_modules/@warastudio/theme   0.3.0  https://npm.pkg.github.com/download/@warastudio/theme/0.3.0/618ade6...
               node_modules/@warastudio/tokens  0.3.0  https://npm.pkg.github.com/download/@warastudio/tokens/0.3.0/09d14e8...
$ npm ci
added 170 packages, and audited 171 packages in 3s
found 0 vulnerabilities                                      exit 0
$ npm ls @warastudio/theme @warastudio/react @warastudio/tokens
+-- @warastudio/react@0.2.1
| `-- @warastudio/theme@0.3.0 deduped
`-- @warastudio/theme@0.3.0
  `-- @warastudio/tokens@0.3.0
```

Green locally. CI row (`npm ci` with `WARA_DS_TOKEN`) pending: no PR yet.

## AC-2 - four new tokens, 0.2.0 values unchanged - `addsFourTokensWithoutChangingOthers`

```
$ node extract-ws.mjs . ws-0.3.0-t04.json
@warastudio/theme 0.3.0 style.css sha256:fba9c11dd728b9c9
selectors: :root | [data-theme=dark] | :root
--ws-* light (:root): 135; dark overrides ([data-theme=dark]): 103; dark effective: 135; duplicates: 0
baseline ws-0.2.0.json (T01): light 131; dark overrides 99; dark effective 131

diff 0.2.0 -> 0.3.0
light: changed 0; removed 0; new 4
dark:  changed 0; removed 0; new 4      (dark overrides: changed 0, new the same 4)
  + --ws-ease-emphasized = cubic-bezier(.16, 1, .3, 1)
  + --ws-motion-reveal   = .8s
  + --ws-motion-stagger  = .1s
  + --ws-track-label     = .14em
```

Each new token is declared in `:root` and in `[data-theme=dark]` with the
same value. The values match the ADR 003 amendment (lines 67 to 69).
The theme CSS has no `@media`, `@supports` or `@layer` rule, so the two
selectors cover both themes.

## AC-3 - v1 renders unchanged - `rendersV1Unchanged`

Noise floor (T01), two captures of dev:

```
$ capture.mjs diff before-1 before-2
computed.json: 276 values compared, 0 differ
1440-dark.png: 1440x12484, 0 pixels differ
1440-light.png: 1440x12484, 0 pixels differ
390-dark.png: 780x33256, 0 pixels differ
390-light.png: 780x33256, 0 pixels differ
```

Threshold: 0 values, 0 pixels. After the pin:

```
$ capture.mjs diff before-1 after
computed.json: 276 values compared, 0 differ
1440-dark.png: 1440x12484, 0 pixels differ
1440-light.png: 1440x12484, 0 pixels differ
390-dark.png: 780x33256, 0 pixels differ
390-light.png: 780x33256, 0 pixels differ
diff exit 0
$ cmp before-1/computed.json after/computed.json     (no output, identical)
```

The 276 values are the 48 custom properties the site declares on `html`
(SDK names excluded by the script, AC-2 covers them) and 18 properties
of each of the 5 contact controls, light and dark. The built assets
change hash (`index-F8DYGKQB.css` 55.16 kB to `index-DRHeeqXh.css`
55.40 kB, `index-o7cyQTF9.js` to `index-DtrE5E0R.js`, same 461.04 kB);
the CSS growth matches the four new declarations in two selectors, and
neither change reaches a computed value or a pixel.

## AC-4 - contact form behavior - `keepsContactFormBehavior`

`keyboard.mjs`: headless Chrome, reduced motion emulated, 1440x900, locale
fr, theme set before load, focus emulation on, no pointer. Steps: focus
the name field, Tab, Tab, Tab, Enter on the empty form. Each step records
the active element, `:focus-visible`, outline, box-shadow, border and
background of the element and its parent, and the alert text and color.
There is no Web3Forms key locally, so Enter reaches the `!ACCESS_KEY`
branch: error state, no network call.

```
baseline (T01), run twice, byte-identical:
light: input[name]:text(fv) > input[email]:email(fv) > textarea[message]:textarea(fv) > button:submit(fv) > button:submit(fv)+alert; hasFocus true
dark:  same sequence; hasFocus true
after the pin:
light: input[name]:text(fv) > input[email]:email(fv) > textarea[message]:textarea(fv) > button:submit(fv) > button:submit(fv)+alert; hasFocus true
dark:  same sequence; hasFocus true
$ cmp keyboard-before.json keyboard-after.json      (no output, identical)
```

The scripted baseline equals the hand-driven spec 006 record on 121 of
122 values. The exception is the light textarea `outline-color` under
`outline-style: none` (`rgb(229, 151, 0)` by hand, `rgb(0, 95, 204)`
scripted): the host browser's default focus ring color, never painted,
not a token. AC-4 compares the scripted baseline to the scripted after.

## AC-5 - diff bounded, tests and build - `limitsDiffToPinAndRecords`

```
$ git diff --stat origin/dev
 CLAUDE.md                        |  5 +++--
 docs/adr/003-wara-ds-sdk.md      |  9 +++++++++
 package-lock.json                | 26 +++++++++++++-------------
 package.json                     |  4 ++--
 product/tech-stack.md            |  6 +++---
 specs/009-sdk-0-3-0-pin/plan.md  | 23 +++++++++++++++++++++++
 specs/009-sdk-0-3-0-pin/spec.md  | 37 +++++++++++++++++++++++++++++++++++++
 specs/009-sdk-0-3-0-pin/tasks.md | 29 +++++++++++++++++++++++++++++
 8 files changed, 119 insertions(+), 20 deletions(-)
$ npm test
 Test Files  1 passed (1)
      Tests  1 passed (1)                                      exit 0
$ npm run build
dist/assets/index-DRHeeqXh.css   55.40 kB | gzip: 15.08 kB
dist/assets/index-DtrE5E0R.js   461.04 kB | gzip: 157.35 kB
built in 843ms                                                 exit 0
```

The doc hunks touch only the SDK version lines: the `CLAUDE.md` SDK
bullet, the two `product/tech-stack.md` table rows and the Design line,
and a new ADR 003 amendment. `git grep -n "0\.2\.0"` on those three
files shows only ADR 003 history: line 54 (the spec 006 amendment) and
line 70 ("every 0.2.0 `--ws-*` keeps its value"). This report adds
`specs/009-sdk-0-3-0-pin/verification.md`, inside the spec folder.

## Not verified

- CI on the PR (AC-1): no PR yet.
- Filled submit: without a Web3Forms key it reaches the same
  `!ACCESS_KEY` branch as the empty form, so it adds nothing locally.
- Hover, active and loading states of `Button` and `Input`: not walked.
  The contact controls' computed styles and the full-page pixels are
  identical to dev. The review (T05) found the `dist/` of `@warastudio/react`
  0.2.1 identical to 0.2.0, only `package.json` differs (version and the
  theme dependency), and theme 0.3.0 only adds four tokens, so these
  states cannot change.
