# Verification 005 - v2 mockup fixes

Run by qa on 2026-11-10, task T05. Branch `fix-v2-mockup-defects`, HEAD
cc87b82, 5 commits on top of `origin/dev` d2d2bfa, working tree clean
before and after. Node 22.23.4 through fnm (`.nvmrc` 22, shell default
26.9.0), Chrome 157.0.8103.50 headless, `python3` http.server, `ffmpeg`.

Base ref: the local `dev` branch is stale at f1861e3 (PR #27); against it
`git diff --stat dev` lists 38 files, spec 001 and 003 included. Every
diff below uses `origin/dev` (d2d2bfa, PR #29), the base the plan means.
T06 should do the same.

```
Verdict: PASS
Criteria: 6 green, 0 red
Build and lint: npm ci, npm test, npm run build ok under Node 22.23.4; no lint or format script in package.json
Screens: 8 before / after / difference strips (01-hero, 01-hero-mobile, 09-skills, 09-skills-mobile, light and dark), every difference is one of the three fixes
Scenarios walked: probes at 1440x900, 390x844 mobile and 900x800 in both themes; keyboard Tab pass at 390 and 900; reduced hero PNGs exported and diffed
Not verified and why: the artifact side of AC-6 (qa cannot reach the artifact, main-session evidence recorded); Eco mode (the mockup has none)
```

## Results per criterion

| AC | Test name | Result | Evidence in short |
|---|---|---|---|
| AC-1 | `keepsDocumentWithinViewport` | PASS | `docW` 1440 / 390 / 900 equals `innerW`, light and dark; before 5437 / 5151 (layout viewport 1560) / 5167 |
| AC-2 | `showsThreeSkillGroups` | PASS | 3 groups in view; side by side at 1440 (337.6 px each), stacked at 390 and 900; `.mq` 1076.8 / 350 / 828 equals its column |
| AC-3 | `showsMarkOnMobileNav` | PASS | `.mark` "HJ" at x 20 (gutter 20) and x 36 (gutter 36); `.nav .right` ends 20 and 36 px from the edge; first Tab: brand link 30 x 30, focus ring |
| AC-4 | `keepsScrollHintAboveBar` | PASS | 1440x900: line bottom 798.7, label bottom 823.3, bar top 844, both themes; before 887.8 vs 844 |
| AC-5 | `changesOnlyTheThreeDefects` | PASS | box diff changes only 390 skills, 390 nav, 1440 hero, 1440 skills, plus the hidden `.sent`; every other section keeps height and boxes; floor run 0 boxes changed |
| AC-6 | `refreezesNewArtifactVersion` | PASS (repo side) | 17/17 `OK`; `index.html` sha256 069ccf26... 59799 bytes; mockup diff is `index.html` only, 4 CSS changes plus 1 comment; new version in the 4 files; old version only in history lines; test and build exit 0, no `docs/` file in `dist/` |

## AC-1 to AC-4 - probe

Served `mockup/` copies from the scratchpad (`after` = the committed
`docs/v2/mockup/`, `before` = the same with `git show
origin/dev:docs/v2/mockup/index.html`) on 127.0.0.1:8766, Chrome CDP on
9333, fresh profile per run. `probe-qa.mjs` extends T01's `probe.mjs`:
`prefers-color-scheme` light then dark, the gutter read from
`var(--gutter)`, the nav padding, and three viewports.

```
$ run.sh after probe-qa.mjs        (one JSON line per config, trimmed)
light 1440x900@1   docW 1440 innerW 1440 | skills col 305.6-1382.4 w 1076.8
                   groups 305.6-643.2 | 675.2-1012.8 | 1044.8-1382.4 @12728.5, inView 3, sideBySide true, mq 1076.8
                   nav mark l 57.6 w 30 "HJ", right r 1382.4 gap 57.6, gutter 57.6
                   hero h 900, oval 720, lineBottom 798.7, labelBottom 823.3, barTop 844
light 390x844@2 m  docW 390 innerW 390 | col 20-370 w 350, groups 20-370 @18465 | @18588.5 | @18712, inView 3, stacked true, mq 350
                   nav mark l 20 r 50 30x30 "HJ", right l 204.9 r 370 gap 20, gutter 20, links hidden
light 900x800@1    docW 900 innerW 900 | col 36-864 w 828, groups stacked @17955.5 | @18044.5 | @18133.5, inView 3, mq 828
                   nav mark l 36 r 66 30x30 "HJ", right l 698.9 r 864 gap 36, gutter 36, links hidden
dark  (same three configs, theme "dark", bg rgb(10, 17, 32)): every value above identical, 1440 lineBottom 798.8
```

Negative control on the before copy, same script:

```
$ run.sh before probe-qa.mjs
light 1440x900@1   docW 5437 | groups 305.6-1994.6 | 2026.6-3715.5 | 3747.5-5436.5, inView 0, mq 5130.9
                   hero h 935.8, oval 860, labelBottom 887.8, barTop 844
light 390x844@2 m  innerW 1560, docW 5151 | inView 0, mq 5130.9 | nav mark hidden, right l 44 r 1516, barTop 3320
light 900x800@1    docW 5167 | inView 0 | nav mark hidden, right l 60 r 840
dark: same values
```

Keyboard pass, T01's `tab2.mjs` unchanged, three Tab presses per width:

```
$ run.sh after tab2.mjs
# 390x844@2 mobile
A | brand | Hedi Jahouach, accueil | left 20 | 30x30 | focus-visible true | outline none 3px offset 1px | shadow rgba(65, 192, 242, 0.5) 0px 0px 0px 2px
BUTTON |  | FR | left 208 | 33x25 | focus-visible true | outline none 3px offset 0px | shadow rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0
BUTTON |  | EN | left 242 | 33x25 | focus-visible true | outline none 3px offset 0px | shadow rgba(65, 192, 242, 0.5) 0px 0px 0px 2px
# 900x800@1
A | brand | Hedi Jahouach, accueil | left 36 | 30x30 | focus-visible true | ... | shadow rgba(65, 192, 242, 0.5) 0px 0px 0px 2px
BUTTON |  | FR | left 702 | 33x25 | ... | shadow rgba(255, 255, 255, 0.2) 0px 0.5px 0px 0
BUTTON |  | EN | left 736 | 33x25 | ... | shadow rgba(65, 192, 242, 0.5) 0px 0px 0px 2px
$ run.sh before tab2.mjs
390: A | brand | ... | left 20 | 0x0 | ...    900: A | brand | ... | left 36 | 0x0 | ...
```

The first Tab now reaches a visible 30 x 30 "HJ" link with its 2 px ring;
before it was a 0 x 0 link. The pressed FR toggle still shows no ring
(its inset shadow wins): seen in the plan, not in scope.

Extra viewports, T01's `probe.mjs` on the after copy (D1 evidence):

```
1440x800  oval 570, labelBottom 723, barTop 744
1280x720  oval 450, labelBottom 643, barTop 664
1920x1080 oval 860, labelBottom 960, barTop 1024
900x800   oval 828, labelBottom 945, barTop 744
```

The oval keeps 860 px at 1920x1080 and shrinks to 450 at 1280x720, as
D1 settles. At 900x800 the hint label is still under the bar (945 vs
744): the plan's known limit, outside AC-4.

## AC-5 - before and after export, box diff

Layout as in `exp005/`: `before/` and `after/` each hold
`export-screens.mjs` and `README.md` from `docs-v2-mockup-screens`
(29a20c7) and a `mockup/` copy.

```
$ shasum -a 256 before/mockup/index.html after/mockup/index.html
450bff19822371bd40480a73cb3e8bd5fec0178a144443840c774d24e1e709fb  before/mockup/index.html
069ccf26e2ed3910e61d9973de3584d53b4159d17de18f54040181047dd1bd4f  after/mockup/index.html
before: 16 files; non-index sums digest 8ed77b825f4432d5
after:  16 files; non-index sums digest 8ed77b825f4432d5
script sums: 96e9d1a5238ab335 96e9d1a5238ab335
$ node before/export-screens.mjs png-before   exit=0 17s pngs=52
$ node after/export-screens.mjs png-after     exit=0 17s pngs=52   (390 runs: "document 390 px wide", before "5151 px wide")
$ node before/export-screens.mjs png-before2  exit=0 17s pngs=52
```

Box diff, `geo.mjs` (1440x900 dpr 1 and 390x844 dpr 2, `mobile: false`,
the export's settings), every descendant box relative to its section:

```
$ geodiff.py geo-before.json geo-before2.json     (floor)
26 rows, every one "0 boxes changed", every height equal
$ geodiff.py geo-before.json geo-after.json
390 hero: height 844.000 -> 844.000, 42 elements, 0 boxes changed
390 statement / clients / projects / about / offers / process / career: heights equal, 0 boxes changed
390 skills: height 681.469 -> 784.969, 58 elements, 51 boxes changed, first: 0 DIV 20.00 97.00 5130.94 18.00 -> 0 DIV 20.00 97.00 350.00 18.00
390 contact: height 995.516 -> 995.516, 40 elements, 1 boxes changed, first: 39 DIV 0.00 -18899.03 0.00 0.00 -> 39 DIV 0.00 -19002.53 0.00 0.00
390 footer: 247.500 -> 247.500, 0 boxes changed
390 nav: height 56.000 -> 56.000, 20 elements, 12 boxes changed, first: 0 A 20.00 28.00 0.00 0.00 -> 0 A 20.00 13.00 30.00 30.00
390 bar: 0 boxes changed
1440 hero: height 935.828 -> 900.000, 42 elements, 40 boxes changed, first: 0 DIV 290.00 96.00 860.00 573.33 -> 0 DIV 360.00 124.75 720.00 480.00
1440 statement / clients / projects / about / offers / process / career: heights equal, 0 boxes changed
1440 skills: height 504.656 -> 539.156, 58 elements, 50 boxes changed, first: 3 DIV 305.59 97.00 5130.94 311.66 -> 3 DIV 305.59 97.00 1076.81 346.16
1440 contact: height 641.500 -> 641.500, 40 elements, 1 boxes changed, first: 39 DIV 0.00 -13020.28 0.00 0.00 -> 39 DIV 0.00 -13018.95 0.00 0.00
1440 footer / nav / bar: 0 boxes changed
$ sent.mjs (contact descendant 39)
DIV | sent | display none | rect 0,0,0,0
```

The one change outside the three fixes is the known artifact: `.sent` is
`display: none`, its rect is 0,0,0,0, so its offset from the section top
is minus the section top and follows the document shift (1440: +1.33 px
= -35.828 hero + 34.5 skills; 390: -103.5 px from skills). Not a layout
change. The skills section grows (+34.5 px at 1440, +103.5 at 390)
because its content now wraps inside its column: part of the fix.

Pixel diff, information only (D2: the boxes are the proof):

```
$ pngdiff.py png-before png-before2     50 identical of 52
01-hero-dark.png: DIFF 1 px ; 04-projects.png: DIFF 135477 px (same-input noise, the plan's follow-up)
$ pngdiff.py png-before png-after       19 identical of 52
target, 12: 01-hero{,-dark,-reduced,-reduced-dark} size 1440x936 -> 1440x900;
            01-hero-mobile{,-dark,-reduced,-reduced-mobile-dark} 14128 to 15317 px from y 22 (nav);
            09-skills{,-dark} 1440x504 -> 1440x539; 09-skills-mobile{,-dark} 780x1362 -> 780x1570
other, 21: 02-statement x2 ~14500 px, 04-projects x2, 05-about x2 71 px, 06-offers x2 ~2660 px,
           06-offers-mobile 4 px, 07-process x2 ~6120 px, 08-career x2 ~5690 px,
           10-contact x4 and 11-footer x4 size off by 1 CSS px (clip rounding)
```

The 21 count is the one D2 predicts. At 1440 the sections after the hero
move by 35.828 px, a fractional offset, so text edges re-rasterize; at
390 nothing above skills moves, and the 4 px in `06-offers-mobile` is run
noise outside the single floor pair. Contact and footer heights are equal
in the box diff (641.5, 202.5, 995.516, 247.5); only the rounded clip
size of the PNG changes.

## Side by side

Strips, each before | after | difference (white or colored where a
channel differs by more than 8; magenta is padding on the shorter image):

- light hero 1440: `.../scratchpad/qa005/side/01-hero.png`. The oval goes
  from 860 to 720 px, the name and tagline move up, and the "DEFILER"
  line and label sit fully above the bar. Before, the label was cut by
  the bar. Nav and bar content are the same.
- dark hero 1440: `.../side/01-hero-dark.png`, same changes on the dark
  background.
- light hero 390: `.../side/01-hero-mobile.png`. Before, the FR / EN
  toggle, theme and burger sat at the left and there was no mark. After,
  "HJ" is at the left gutter and the controls at the right gutter. The
  difference panel shows only the nav row; oval, text, hint and bar are
  unchanged.
- dark hero 390: `.../side/01-hero-mobile-dark.png`, same, the mark in
  its light-on-dark variant.
- light skills 1440: `.../side/09-skills.png`. Before, only "Langages et
  frameworks" was visible and the other two groups were off to the right.
  After, the three groups stand side by side, and the marquee sits under
  them inside the column, ending at its right edge.
- dark skills 1440: `.../side/09-skills-dark.png`, same.
- light and dark skills 390: `.../side/09-skills-mobile.png`,
  `.../side/09-skills-mobile-dark.png`. Before, the three groups were
  stacked but their tags were clipped at the right edge ("async / awai",
  "Modularisati", "Revue d"). After, the tags wrap inside 350 px, every
  tag reads in full, and the marquee follows below.

No difference outside the three fixes. Rule 50: the only literal added
is `364px`, accepted in D1 with its comment; no color, space or type
value changed.

## AC-6 - refreeze and the version named

Artifact side, main-session evidence (qa cannot reach the artifact): T02
published the fix as artifact BDrsQCHWzgfQRLqBGn9FJM Version 6, version
id 1794266082-62e1, on 2026-11-10; the read-back of `index.html`
reported sha256 069ccf26e2ed3910e61d9973de3584d53b4159d17de18f54040181047dd1bd4f
(59799 bytes), and the 15 other files the sums in `docs/v2/README.md`.

Repo side:

```
$ cd docs/v2 && sed -n '/^```sha256$/,/^```$/p' README.md | sed '1d;$d' | shasum -a 256 -c
mockup/index.html: OK
mockup/tokens.css: OK
mockup/img/FranceInfos.webp: OK ... mockup/img/sncf.svg: OK   (16 mockup lines, all OK)
source/hero-source-2026-11-07.mp4: OK
exit=0
entries: 16 | files: 16
$ shasum -a 256 docs/v2/mockup/index.html; wc -c < docs/v2/mockup/index.html
069ccf26e2ed3910e61d9973de3584d53b4159d17de18f54040181047dd1bd4f  docs/v2/mockup/index.html
59799
$ git diff --stat origin/dev -- docs/v2/mockup
 docs/v2/mockup/index.html | 7 +++++--
 1 file changed, 5 insertions(+), 2 deletions(-)
$ git diff origin/dev -- docs/v2/mockup/index.html
-  --w:min(78vw, 860px);
+  /* 364px is the hero stack under the oval, so it ends above the bar */
+  --w:min(78vw, 860px, calc((100svh - var(--bottom-bar) - 364px) * 1.5));
+.skills > div{min-width:0}
-  .nav .brand span,.nav .right .btn{display:none}
+  .nav .brand span:not(.mark),.nav .right .btn{display:none}
+  .nav .right{grid-column:3}
$ git diff --stat origin/dev
 docs/v2/README.md, docs/v2/decision-log.md, docs/v2/mockup/index.html, product/mission.md,
 product/tech-stack.md, specs/005-v2-mockup-fixes/{plan,spec,tasks}.md   8 files, 255 insertions(+), 9 deletions(-)
```

The diff is the four CSS changes of the plan plus the comment line, and
the changed files are the ones the plan lists.

```
$ grep -n 1794266082-62e1 docs/v2/README.md
10:  1794266082-62e1 (spec 005, 2026-11-10), first copied at version
63:1794266082-62e1: spec 005 changed `index.html` only, the other 15 match
$ grep -n 1794266082-62e1 docs/v2/decision-log.md
7:1794266082-62e1 on 2026-11-10 (spec 005, `README.md`). The host numbered
$ grep -n 1794266082-62e1 product/tech-stack.md
47:- Mockup: `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM at version 1794266082-62e1 (spec 001, refrozen by spec 005).
$ grep -n 1794266082-62e1 product/mission.md
3:Sources: ... [mockup] `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM, version 1794266082-62e1; ...
$ git grep -n 1794063463-7380 -- . ':!specs/001-*'
docs/v2/README.md:11:  1794063463-7380 on 2026-11-09 (spec 001). A reference: the
docs/v2/README.md:64:version 1794063463-7380. The last sum is the clip as Hedi supplied it.
docs/v2/decision-log.md:6:artifact version 1794063463-7380 as published on 2026-11-09, then at
docs/v2/decision-log.md:8:the spec 005 publish "Version 6", so 1794063463-7380 is probably the
specs/005-v2-mockup-fixes/plan.md:77:1794063463-7380, 450bff19), publish `index.html` without the host wrapper
specs/005-v2-mockup-fixes/tasks.md:31:  grep -n 1794063463-7380` outside `specs/001-*` returns only intended
```

Every remaining hit of the old version is history: "first copied at",
"the other 15 match", "then at", or the spec 005 documents describing
the task. Five places name the new version (README twice, decision log,
tech-stack, mission). The verbatim block of the decision log is
unchanged (`diff` of the block against `origin/dev`: identical).

```
$ npm ci --no-audit --no-fund
added 170 packages in 3s
npm ci exit=0   (log: 0 token-like strings)
$ npm test
No test files found, exiting with code 0
npm test exit=0
$ npm run build
dist/assets/index-BkruhSLl.css   55.91 kB | gzip:  14.85 kB
dist/assets/index-dMtz7-iN.js   461.05 kB | gzip: 157.35 kB
built in 919ms
npm run build exit=0
$ find dist -type f | wc -l
33
$ find dist -type f | grep -i -E 'docs|mockup|decision-log|seo-accueil|hero-source|tokens\.css|index\.html$'
dist/index.html   (the app entry built from the root index.html)
$ grep -rl -E '1794266082|1794063463|BDrsQCHWzgfQRLqBGn9FJM|decision-log|seo-accueil|364px' dist
no match
$ dist sha256 matched against the 17 README sums
0
$ git diff --name-only origin/dev..HEAD -- src public | wc -l
0
```

`npm test` is green with zero test files, as in spec 001: this change
adds no TypeScript (ADR 001), so it only proves the runner starts.
`dist/` is gitignored (`.gitignore:5`) and was removed after the check.

## Extra - writing style

```
$ git diff origin/dev | grep '^+' | grep -c -P '[\x{2013}\x{2014}\x{2018}\x{2019}\x{201C}\x{201D}]'
0
positive control: a line holding U+2014 gives 1
```

## Notes for review (not red)

- The decision-log entry for spec 005 is dated 2026-11-09, while the
  publish, D1 and the refreeze are dated 2026-11-10. It may be the day
  the fix was decided; review-agent to confirm the date.
- `tasks.md` and `plan.md` say `git diff --stat dev`; with the local
  `dev` at f1861e3 that check lists 38 files. Use `origin/dev` or update
  the local `dev` before T06.
- Seen, already in the plan, not fixed: the mark is 30 x 30 (under 44
  px), the pressed FR toggle shows no focus ring, and the 900x800 hero
  still runs under the bar.

## Not verified and why

- The artifact itself (Version 6, id 1794266082-62e1, read-back sums):
  qa cannot reach claude.ai; recorded above as main-session evidence.
  The repo side matches those sums.
- Eco mode: the mockup has none (`grep -i -o '\beco\b'` in `index.html`
  finds nothing). Reduce Motion: the four reduced hero PNGs are exported
  and diffed with the rest; they change only like their animated twins.
- Mobile emulation in the box diff: `geo.mjs` and the export use
  `mobile: false` at 390 (spec 004's setting). The `mobile: true` path is
  covered by the AC-1 to AC-4 probe; spec 004 switches when it resumes.

## Scratch evidence

Under `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-angry-raman-1a57de/b8ab265d-82d3-468d-8466-42b5ae728c1e/scratchpad/qa005/`:
`before/`, `after/` (script, README, mockup copy), `png-before/`,
`png-before2/`, `png-after/` (52 PNGs each), `side/` (8 strips),
`geo-before.json`, `geo-before2.json`, `geo-after.json`,
`pngdiff-floor.txt`, `pngdiff-fix.txt`, `export-*.log`,
`logs-probe-*.jsonl`, `logs-tab-*.txt`, `npm-*.log`, `logs/server.log`
(0 non-favicon 404), `scripts/` (`probe-qa.mjs`, `run.sh`, `sent.mjs`,
and copies of T01's `probe.mjs`, `tab2.mjs`, `geo.mjs`, `geodiff.py`,
`pngdiff.py`).

Every server and Chrome stopped: `lsof` shows 8765, 8766 and 9333 free,
no Chrome with a debugging port, no `http.server`.
