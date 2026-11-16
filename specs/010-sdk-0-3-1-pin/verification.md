# Verification 010 - SDK 0.3.1 pin

Date: 2026-11-16 | Branch: `chore-sdk-0-3-1` | HEAD: `9c0f163` (before this report)
Base: `origin/dev` at `e668fa3` | Run by: qa (T01 baseline, T04), Node 26.13.1 (host), npm 11.20.0, system Chrome headless

```
Verdict: FAIL, one red row: AC-4 submit button side edges in light, 2.84:1 against the page (3:1 required)
Criteria: AC-1, AC-2, AC-3, AC-5, AC-6 green locally; AC-4 red (light submit sides); AC-1 CI row pending until the PR
Build and lint: npm ci, npm test (6 files, 39 tests), npm run build exit 0; no lint script in package.json
Screens: none, no layout change; 4 full pages and 404 computed values compared to dev, 0 differ
Scenarios walked: contact form keyboard pass and focus ring pass over CDP, light and dark; hero toggle over a full video loop
Not verified and why: CI on the PR (no PR yet); Node 22 locally (host has 26, CI pins 22); roadmap focus ring line (checked by the main session at close)
```

## Setup

- Baseline (T01): `origin/dev` `e668fa3` with `@warastudio/theme` 0.3.0 and
  `@warastudio/react` 0.2.1, built, served by `npm run preview` (wrangler,
  port 8787). Two captures for the noise floor, the 0.3.0 `--ws-*` set,
  keyboard pass run twice (byte-identical), rings pass run twice.
- After (T04): HEAD `9c0f163`, `npm ci` from the committed lockfile, same
  build and preview (`index-CQbdXZLy.css`, `index-i6YKy9I7.js` served).
- Tools, out of git, in the session scratchpad: `specs/006-sdk-ws-upgrade/
  capture.mjs` as is; `extract-ws.mjs`, `diff-ws.mjs`, `keyboard.mjs`
  (spec 009 tools); `rings.mjs` (painted ring per control, composited over
  the pixel behind it, WCAG ratio against the adjacent pixel, 1440x900
  dpr 1, sRGB, reduced motion off so the hero toggle exists);
  `toggle-video.mjs` (new in T04: toggle ring against the video over time);
  `side-profile.mjs` (new in T04: pixel profile around the submit button).
- Node: the host has Node 26.13.1, no Node 22 installed; T01 ran on the
  same host. `.nvmrc` and both workflows pin 22, so the CI run is the
  Node 22 check.

## AC-1 - exact pin, install - `pinsSdkExactly`

```
package.json   "@warastudio/react": "0.2.2", "@warastudio/theme": "0.3.1"   (no range)
package-lock   node_modules/@warastudio/react   0.2.2  https://npm.pkg.github.com/download/@warastudio/react/0.2.2/92fba87...
               node_modules/@warastudio/theme   0.3.1  https://npm.pkg.github.com/download/@warastudio/theme/0.3.1/8438303...
               node_modules/@warastudio/tokens  0.3.1  https://npm.pkg.github.com/download/@warastudio/tokens/0.3.1/65d448a...
$ npm ci
added 168 packages, and audited 169 packages in 2s
found 0 vulnerabilities                                      exit 0
$ npm ls @warastudio/theme @warastudio/react @warastudio/tokens
+-- @warastudio/react@0.2.2
| `-- @warastudio/theme@0.3.1 deduped
`-- @warastudio/theme@0.3.1
  `-- @warastudio/tokens@0.3.1
```

`npm ci` also prints 7 `npm warn install-scripts` lines (fsevents, workerd,
esbuild): npm 11 on the host, not a lockfile issue; build and preview run.
Green locally. CI row (`npm ci` on Node 22 with `WARA_DS_TOKEN`) pending:
no PR yet.

## AC-2 - only the focus ring changes - `changesOnlyFocusRingToken`

```
$ node extract-ws.mjs . ws-0.3.1.json
@warastudio/theme 0.3.1 style.css sha256:b768ea87fb675408
--ws-* light (:root): 135; dark overrides ([data-theme=dark]): 103; dark effective: 135; other selectors: 0; duplicates: 0
--ws-color-focus-ring light: #2f7fc4; dark: #41c0f2
$ node diff-ws.mjs ws-0.3.0.json ws-0.3.1.json
@warastudio/theme 0.3.0 (fba9c11dd728b9c9) -> 0.3.1 (b768ea87fb675408)
light: 135 -> 135; changed 1; removed 0; new 0
  ~ --ws-color-focus-ring: #41c0f273 -> #2f7fc4
darkOverrides: 103 -> 103; changed 1; removed 0; new 0
  ~ --ws-color-focus-ring: #41c0f280 -> #41c0f2
dark: 135 -> 135; changed 1; removed 0; new 0
  ~ --ws-color-focus-ring: #41c0f280 -> #41c0f2
differences: 3
```

The three lines are the same token seen in `:root`, in the dark override
and in the effective dark set. Every other 0.3.0 value is unchanged in
both themes. Green.

## AC-3 - unchanged outside focus - `rendersUnchangedOutsideFocus`

Noise floor (T01), two captures of dev: 404 values, 0 differ; 0 pixels on
the four pages. Threshold: 0 values, 0 pixels. After:

```
$ capture.mjs diff before-1 after
computed.json: 404 values compared, 0 differ
1440-dark.png: 1440x12354, 0 pixels differ
1440-light.png: 1440x12354, 0 pixels differ
390-dark.png: 780x32778, 0 pixels differ
390-light.png: 780x32778, 0 pixels differ
diff exit 0
$ cmp before-1/computed.json after/computed.json     (no output, identical)
```

Captures are taken without focus, so neither the new token value nor the
AC-6 textarea class shows: the textarea's resting `box-shadow` is among
the 404 values and is unchanged (its ring layer only exists under
`:focus`). The CSS bundle grows from 61.56 kB to 61.69 kB (the arbitrary
ring utility); no computed value or pixel moves. Green.

## AC-4 - focus rings at 3:1, behavior unchanged - `paintsFocusRingAtThreeToOne`

Every control paints the token, opaque, in both themes (`token yes`,
`check 0` or 1 = painted pixel equals the computed ring within 1 unit):

```
$ node rings.mjs rings-after          (ratio = ring vs adjacent, min / median over 12 points; toggle 36 points)
light name    ring rgb(47, 127, 196) vs page [220,228,240]: min 3.31 median 3.31
light email   ring rgb(47, 127, 196) vs page [220,228,240]: min 3.31 median 3.31
light message ring rgb(47, 127, 196) vs page [220,228,240]: min 3.27 median 3.31
light submit  ring rgb(47, 127, 196) vs page around:       min 2.37 median 2.89 (<3); vs offset gap min 2.19
light toggle  ring rgb(47, 127, 196) vs porcelain gap [228,233,242]: min 3.26 median 3.48; vs video outside median 4.9
light hint    ring rgb(47, 127, 196) vs page [230,235,244]: min 3.54 median 3.54
dark  name    ring rgb(65, 192, 242) vs surface [7,12,24]: min 9.35 median 9.35
dark  email   ring rgb(65, 192, 242) vs surface [7,12,24]: min 9.35 median 9.35
dark  message ring rgb(65, 192, 242) vs surface [7,12,24]: min 9.23 median 9.35
dark  submit  ring rgb(65, 192, 242) vs page around:       min 5.82 median 8.17; vs offset gap min 5.27
dark  toggle  ring rgb(65, 192, 242) vs porcelain gap [228,233,242]: min 1.61 median 1.72 (<3); vs video outside median 9.93
dark  hint    ring rgb(65, 192, 242) vs page [10,17,32]: min 9.02 median 9.02
```

Before (T01, 0.3.0): light 1.26 (name, email), 1.23 (message), 1.12 to
1.24 (submit), 1.30 (hint); dark 3.08, 2.38 (message), 2.69 to 3.15
(submit), 3.09 (hint).

### Submit button, per edge (adjacent sampled 2 px outside the ring)

| Theme | Top | Left / right (30, 50, 70 % of height) | Bottom (accepted) | Offset gap, min |
|---|---|---|---|---|
| light | 3.06 | 2.99, 2.89, 2.84 | 2.37 | 2.19 bottom, 2.67 sides, 2.90 top |
| dark | 8.70 | 8.49, 8.17, 7.94 | 5.82 | 5.27 |

Light side edges are under 3:1: RED. The pixel profile on the left edge
(`side-profile.mjs` on `rings-light-submit-focus.png`) shows why: the page
next to the ring is darkened by the button's own glow, `box-shadow:
rgba(13, 81, 140, 0.36) 0 10px 28px 0`, whose 28 px blur reaches the sides,
not only the bottom.

```
light left, 50 % height: d4.5 [199,213,230] 2.84 | d6 [200,215,230] 2.89 | d12 [209,219,235] 3.04 | d20 [216,226,238] 3.24 | d40 [220,228,240] 3.31
light left, 70 % height: d4.5 [196,211,229] 2.79 | d6 [199,213,230] 2.84 | d12 [207,219,234] 3.02 | d40 [220,228,240] 3.31
light top,  50 % width:  d4.5 [208,220,234] 3.05 | d6 [210,220,235] 3.06 | d40 [245,248,252] 3.98
```

The plan's T01 estimate (about 3.3:1 on the other edges) matches the
untinted page 40 px away, not the pixels next to the ring. The cause is
the same glow the spec accepts on the bottom edge; the spec does not
accept it on the sides. Accepting the sides, or changing the glow, is a
decision for Hedi; qa records it as red.

### Hero toggle, two-color indicator (C40)

Ring against the porcelain gap and against the video just outside the
ring (radius 21, 22 and 24 px from the center, 36 angles):

| Theme | Ring vs gap, min / median | Ring vs video, held frame, min / median | Ring vs video, full loop, min / median | Result |
|---|---|---|---|---|
| light | 3.26 / 3.48 | 4.86 / 4.90 | 4.76 / 4.90 | both sides pass |
| dark | 1.61 / 1.72 | 9.86 / 9.93 | 9.64 / 9.93 | video side passes, gap side under 3:1 |

`toggle-video.mjs`: toggle focused by Tab while playing, 65 clipped
captures per theme over 16 s, the 4.21 s loop covered 3 to 4 times (every
0.5 s bucket from 0 to 4 s sampled), focus kept, painted ring equal to the
token in every frame. Worst frame t 3.18 s (light) and 3.26 s (dark).
Under C40 one side reaching 3:1 is enough: green in both themes.

### Behavior

```
$ node keyboard.mjs keyboard-after.json
light: input[name]:text(fv) > input[email]:email(fv) > textarea[message]:textarea(fv) > button:submit(fv) > button:submit(fv)+alert; hasFocus true
dark:  same sequence; hasFocus true
baseline: keyboard-before.json and keyboard-before-2.json byte-identical
$ field diff keyboard-before.json keyboard-after.json
132 leaf values, 10 differ
  .light.0.self.boxShadow  rgba(65, 192, 242, 0.45) 0 0 0 2px -> rgb(47, 127, 196) 0 0 0 2px     (name)
  .light.1.self.boxShadow  same                                                                   (email)
  .light.2.self.boxShadow  ring layer oklab(0.759691 -0.0853193 -0.0974165 / 0.4) -> rgb(47, 127, 196)   (message)
  .light.3.self.outline    solid 2px rgba(65, 192, 242, 0.45) -> solid 2px rgb(47, 127, 196)    (submit)
  .light.4.self.outline    same                                                                   (submit after Enter)
  .dark.0.self.boxShadow   rgba(65, 192, 242, 0.5) 0 0 0 2px -> rgb(65, 192, 242) 0 0 0 2px      (name)
  .dark.1.self.boxShadow   same                                                                   (email)
  .dark.2.self.boxShadow   ring layer oklab(... / 0.4) -> rgb(65, 192, 242)                       (message)
  .dark.3.self.outline     solid 2px rgba(65, 192, 242, 0.5) -> solid 2px rgb(65, 192, 242)     (submit)
  .dark.4.self.outline     same                                                                   (submit after Enter)
```

Only ring colors differ: focus order, active element, `:focus-visible`,
borders, backgrounds, alert text and color are identical. Behavior green.

AC-4 overall: RED on one row (light submit side edges, 2.84 to 2.99);
every other control and theme green.

## AC-6 - textarea ring from the token - `drawsTextareaRingFromToken`

```
$ grep -n "ring-sky" src/components/ContactForm.tsx      (no output, exit 1)
$ grep -n "focus:ring" src/components/ContactForm.tsx
118: ... focus:border-skyink focus:ring-2 focus:ring-[var(--ws-color-focus-ring)]
$ npx vitest run src/sdkTokens.test.ts
      Tests  1 passed (1)
```

Rings pass: the textarea paints `rgb(47, 127, 196)` light and
`rgb(65, 192, 242)` dark, equal to the token (`token yes`), 2 px, at 3.27
to 3.31 light and 9.23 to 9.35 dark (was 1.23 and 2.38). No literal color
in the `src/` diff. Green.

## AC-5 - diff bounded, tests and build - `limitsDiffToPinAndRecords`

```
$ git diff --stat origin/dev
 CLAUDE.md                        |  4 ++--
 docs/adr/003-wara-ds-sdk.md      |  8 ++++++++
 package-lock.json                | 26 +++++++++++++-------------
 package.json                     |  4 ++--
 product/tech-stack.md            |  6 +++---
 specs/010-sdk-0-3-1-pin/plan.md  | 24 ++++++++++++++++++++++++
 specs/010-sdk-0-3-1-pin/spec.md  | 38 ++++++++++++++++++++++++++++++++++++++
 specs/010-sdk-0-3-1-pin/tasks.md | 31 +++++++++++++++++++++++++++++++
 src/components/ContactForm.tsx   |  2 +-
 9 files changed, 122 insertions(+), 21 deletions(-)
$ npm test
 Test Files  6 passed (6)
      Tests  39 passed (39)                                    exit 0
$ npm run build
dist/assets/index-CQbdXZLy.css   61.69 kB | gzip: 16.47 kB
dist/assets/index-i6YKy9I7.js   458.49 kB | gzip: 156.33 kB
built in 769ms                                                 exit 0
```

Every file is in the spec's list. The lockfile hunks are the three
`@warastudio` entries (version, resolved, integrity) and the two
dependency lines. The doc hunks touch only the SDK version lines: the
`CLAUDE.md` SDK bullet, the two `product/tech-stack.md` rows and the
Design line, a new ADR 003 amendment. `git grep -n "0\.3\.0\|0\.2\.1"` on
those three files shows only ADR 003 history lines 64 and 65 (the spec
009 amendment). `src/` holds the one AC-6 class. The roadmap focus ring
line (`product/roadmap.md` line 29) is still unchecked and not in the
diff: the main session checks it at close, so it is not verified here.
This report adds `specs/010-sdk-0-3-1-pin/verification.md`, inside the
spec folder. Green.

## Decision after this report (2026-11-16)

Hedi accepted the red row: the submit button's side edges in light
(2.84 to 2.99:1) join its bottom edge (2.37:1) as recorded and accepted,
because the 28 px glow of the v1 `Button` variant darkens the page on
every edge but the top (3.06:1) and the v2 contact spec replaces this
button before the next `v*` tag. `spec.md` AC-4 is amended to read so.
With that amendment every AC-4 row measured above is green or recorded,
and the verdict reads PASS with this accepted exception. The roadmap
focus ring line stays unchecked until the v2 contact spec measures its
own button.

## Not verified

- CI on the PR (AC-1): no PR yet.
- `npm ci` on Node 22 locally: the host has 26.13.1 only; CI pins 22.
- Roadmap focus ring line: main session, at close.
- Hover, active, loading and filled-submit states: not walked; computed
  styles and pixels outside focus equal dev (AC-3).
- Safari, Firefox and the manual keyboard rows of spec 007: out of scope,
  Hedi runs them on a Cloudflare preview before the tag.
