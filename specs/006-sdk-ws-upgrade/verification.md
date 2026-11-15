# Verification 006 - SDK upgrade to --ws-*

Date: 2026-11-15 | Branch: `chore-wara-ds-ws-tokens` | HEAD: `cca8829` (before this report)
Base: `dev` at `bd48ed8` | Run by: the main session (T06 and T10); the qa agent has no browser tools

```
Verdict: PASS locally; AC-1 and AC-9 CI rows pending until the PR runs
Criteria: AC-1 to AC-10 green on the registry install, except the CI rows
Build and tests: npm ci, npm test (1 test), npm run build, npm audit (0) on Node 22.23.5, npm 10.9.9
Screens: none, toolchain change; v1 compared to itself on dev, 8 full pages
Not verified and why: CI (no PR yet); the T10 keyboard rerun in light, see AC-6
```

## Setup

- Baseline (T02): dev's source with `@warastudio/*` 0.1.0 from the lockfile,
  built and served by `npm run preview` (`portfolio-preview`, port 8787).
- Local check (T06): renamed source with 0.2.0 tarballs packed from
  wara-ds-web `a3ef361`, installed with `npm install --no-save`.
- Registry check (T10): `npm ci` from the committed lockfile, 0.2.0 from
  GitHub Packages, published by the Release run 43719886687 of
  WaraStudio/wara-ds-web after PR #3 merged (`2c821cf`).
- The published tarballs equal the validated ones: `dist/style.css` of
  theme `6f9b05d6b5abde0f`, of react `bf75a66fefc0a85c`, `dist/index.js`
  of tokens `a47570a609e4a5e5` (first 16 hex of SHA-256), same on both.
- Captures: `capture.mjs` (system Chrome over CDP, reduced motion emulated,
  1440x900 dpr 1 and 390x844 dpr 2, theme and locale set before load).
  Screenshots stay in the session scratchpad, out of git.

## AC-1 - exact pin, registry install

```
package.json   "@warastudio/react": "0.2.0", "@warastudio/theme": "0.2.0"
package-lock   node_modules/@warastudio/react  0.2.0  https://npm.pkg.github.com/download/@warastudio/react/0.2.0/988ea5c...
               node_modules/@warastudio/theme  0.2.0  https://npm.pkg.github.com/download/@warastudio/theme/0.2.0/e3fb5cd...
               node_modules/@warastudio/tokens 0.2.0  https://npm.pkg.github.com/download/@warastudio/tokens/0.2.0/aa595bd...
$ npm ci          found 0 vulnerabilities
$ npm ls          @warastudio/react@0.2.0 @warastudio/theme@0.2.0 @warastudio/tokens@0.2.0
```

The 128 names of `docs/v2/mockup/tokens.css` all exist in the 0.2.0 theme
CSS; the SDK adds `--ws-color-on-brand`, `--ws-color-scrim`,
`--ws-color-slate`. CI row pending (`WARA_DS_TOKEN`).

## AC-2 - no --wara- in src/

```
$ grep -rn -- "--wara-" src | wc -l
0
built CSS dist/assets/index-F8DYGKQB.css: 0 occurrences of --wara-
```

## AC-3 - files touched

```
$ git diff --name-only dev...HEAD
.claude/launch.json CLAUDE.md docs/adr/003-wara-ds-sdk.md package-lock.json
package.json product/tech-stack.md specs/006-sdk-ws-upgrade/* src/components/ContactForm.tsx
src/index.css src/main.tsx src/sdkTokens.test.ts vite.config.ts
```

All allowed by AC-3 as amended (2026-11-15). `product/roadmap.md` joins
at T11. `ContactForm.tsx` changes its two inline colors only; the
`Button` and `Input` API is unchanged (same props, same imports).

## AC-4 - undefined SDK variable fails npm test

```
$ npm test                                   Tests  1 passed (1)
planted `--color-probe: var(--ws-nope);` in index.css:
FAIL  src/sdkTokens.test.ts > SDK tokens > failsOnUndefinedSdkVariable
AssertionError: SDK variables referenced but not defined by the installed
@warastudio/theme: --ws-nope (./index.css)
line removed, `git diff --stat src/index.css` empty, Tests 1 passed (1)
```

`index.css?raw` reaches the test untransformed (9413 characters, contains
`@import "tailwindcss"` and `@theme {`, no `--tw-`), checked with a
throwaway test, deleted.

## AC-5 - no visible difference, both themes

Noise floor, two captures of dev: 276 computed values, 0 differ; 4 pages,
0 pixels differ.

```
$ capture.mjs diff before after-local          (T06, local 0.2.0)
computed.json: 276 values compared, 0 differ
1440-dark.png: 1440x12484, 0 pixels differ
1440-light.png: 1440x12484, 0 pixels differ
390-dark.png: 780x33256, 0 pixels differ
390-light.png: 780x33256, 0 pixels differ
$ capture.mjs diff before after                (T10, registry 0.2.0)
computed.json: 276 values compared, 0 differ
1440-dark.png / 1440-light.png / 390-dark.png / 390-light.png: 0 pixels differ
```

The 276 values are the 48 custom properties the site declares on `html`
(SDK names excluded) and 18 properties of each of the 5 contact controls,
light and dark. `computed-before.json` and `computed-after.json` are
byte-identical.

## AC-6 - contact form behavior

Pass: focus the name field, Tab to email, message, button, Enter on the
empty form (no Web3Forms key locally, so the error state on both sides,
no network call). Each step records the focused element, `:focus-visible`,
outline, box-shadow, border, background and the alert text and color.
The plan also names a filled submit. It was not played: without a key,
`onSubmit` reaches the `!ACCESS_KEY` branch (`ContactForm.tsx:30-35`)
before it reads name, email or message, so a filled form ends in the same error
state as the empty one. The pass is driven by hand through the browser
pane, so it is not replayable from the repo (see Not verified).

- T06 (local 0.2.0): identical to `keyboard-before.json`, byte for byte
  (`cmp`), stored as `keyboard-after-local.json`.
- T10 (registry 0.2.0): dark identical. Light reruns, driven through the
  app's browser pane, differed each time on states the harness disturbed,
  not on tokens: a hover overlay where the pointer sat over the button
  after the scroll, then missing focus styles while the pane window was
  not focused (`document.hasFocus()` false on the first step).
- The registry build is the T06 build: Vite content hashes are equal
  (`index-F8DYGKQB.css`, `index-o7cyQTF9.js` in both), and the SDK files
  are byte-identical to the validated tarballs. So the T06 pass holds for
  the registry install; the T10 light rerun is not counted as evidence.

## AC-7 - color literals

```
$ grep -cE "#[0-9a-fA-F]{3,8}|rgba?\(" src/index.css
10
```

## AC-8 - semantic slate

```
$ grep -n "color-slate" src/index.css
58:  --color-slate: var(--ws-color-slate);
```

## AC-9 - tests and build

`npm test` 1 passed, `npm run build` exit 0, on Node 22.23.5. CI row
pending.

## AC-10 - recorded

`docs/adr/003-wara-ds-sdk.md` Amendments (0.2.0, 2026-11-15, token
requests not opened and why); `product/tech-stack.md` table rows
`0.2.0, exact` and the Design line; `CLAUDE.md` SDK line. The roadmap line
is checked at T11.

## Not verified

- CI on the PR (AC-1, AC-9): no PR yet.
- Hover, active and loading states of `Button` and `Input` on the page:
  covered upstream (react CSS identical to 0.1.0 once renamed, WaraDS-Web
  F2) and by the identical built assets, not walked here.
- The success state of the form needs a Web3Forms key; its color is the
  renamed `--ws-color-success-text`, covered by AC-2 and AC-4.
- Follow-up worth a task: drive the keyboard pass from `capture.mjs` over
  CDP, so it no longer depends on the pane's pointer and window focus.
