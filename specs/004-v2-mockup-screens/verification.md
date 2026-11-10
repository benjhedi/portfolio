# Verification 004 - v2 mockup screens

Run by qa on 2026-11-10, task T07. Branch `docs-v2-mockup-screens`, HEAD
1b335ba, 11 commits on top of `origin/dev` 65afd08 (spec 005 merged, PR
#30), working tree clean before and after. Node 22.23.4 through fnm
(`.nvmrc` 22), npm 10.9.9, Chrome 157.0.8103.50 headless, Python 3.15.2
`http.server`, git-lfs 3.8.1, `ffmpeg` for crops and pixel reads.

Base ref: every diff below uses `origin/dev` (65afd08); the local `dev`
is stale. `plan.md` says `dev..HEAD` and `git diff --stat dev`: read
them as `origin/dev`. D2 of the plan is superseded (spec 005), the
export runs `mobile: true` under 900 px.

```
Verdict: PASS
Criteria: 8 green, 0 red (10 test plan rows green)
Build and lint: npm ci, npm test, npm run build exit 0 under Node 22.23.4; no lint or format script in package.json
Screens: 52 PNGs opened (65 crops plus 6 zooms), light and dark, desktop and mobile; no capture defect; 1 mockup detail found (statement cedilla clipped), listed after the run in 3949946
Scenarios walked: two fresh exports into scratch (exit 0, frozen flags per PNG, 52 names), two negative controls (unknown name, sections out of order: exit 1), a served-mockup probe of the cedilla
Not verified and why: the lfs-pointers CI job (no PR open yet); byte identity across Chrome versions (not promised, plan); Eco mode (the mockup has none)
```

## Results per criterion

| AC | Test name | Result | Evidence in short |
|---|---|---|---|
| AC-1 | `listsTwelveScreensInPageOrder` | PASS | png block: 52 lines, 52 unique, prefixes 00 to 11 in page order (4, 8 for the hero, then 4 each); script exits 1 on an unknown name and on sections out of order |
| AC-2 | `exportsFiftyTwoPngsAtPlannedSizes` | PASS | `sips`: 0 width mismatches (1440 desktop, 780 mobile); all 52 heights equal the logged CSS height x dpr; preloader 900 and 1688; light and dark pairs share their size |
| AC-3 | `showsChromeOnHeroOnly` | PASS | nav and bottom bar on the 8 hero PNGs, none on the other 44; the 4 preloader PNGs show "HJ" and "0%" |
| AC-4 | `freezesEveryAnimationAtItsNamedMoment` | PASS | 48 motion lines `video=3.560 ride=1512 otherGo=0 mq=0x12 line=1100 unrevealed=0`; 4 reduced lines `video=0.000 poster ride=- mq=- line=-`; seen: RIDE out, line drawn, poster, marquees at start |
| AC-4 | `stitchesTallMobileProjectsWithoutRepeat` | PASS | `04-projects-mobile*` 780 x 19576, `tiles=2`; viewed in 10 crops to the bottom, no repeat; seam at device y 16000 continuous |
| AC-5 | `storesDocsPngsThroughLfsOnly` | PASS (local) | `check-attr` lfs / unspecified; `git lfs ls-files`: 52 PNGs + 3 videos, 0 in `public/`; `git lfs fsck --pointers origin/dev..HEAD` OK; 52 committed blobs are pointers; CI job not run yet |
| AC-6 | `describesEveryScreenAndMatchesFolder` | PASS | 12 `### NN` sections, each with PNG, Purpose, Layout, States, Interaction, Reduced motion; `diff` block vs `ls ecrans` empty; "52 PNGs." line |
| AC-6 | `reexportsSameNamesFromReadme` | PASS | two reruns exit 0, same 52 names and sizes; run 2 pixel-identical and byte-identical to the committed set on 52 of 52 |
| AC-7 | `leavesMockupUntouchedAndBuildClean` | PASS | 17 sums OK; mockup diff and status empty; `npm ci`, `npm test`, `npm run build` exit 0; nothing from `docs/` in `dist/` |
| AC-8 | `recordsCaptureChoicesAndChecksWaveZero` | PASS | 2026-11-09 entry holds the capture choices and the drawn scroll hint line; roadmap l.15 `[x]`; `AGENTS.md` 59 lines |

## AC-1 and AC-6 - the list, the folder, the sections

```
$ sed -n '/^```png$/,/^```$/p' docs/v2/README.md | sed '1d;$d' > list.txt
$ wc -l < list.txt; sort -u list.txt | wc -l
52
52
$ cut -c1-2 list.txt | uniq | tr '\n' ' '
00 01 02 03 04 05 06 07 08 09 10 11
$ cut -c1-2 list.txt | uniq -c | awk '{print $1}' | tr '\n' ' '
4 8 4 4 4 4 4 4 4 4 4 4
$ sed -E 's/^([0-9]{2})-([a-z]+).*/\1 \2/' list.txt | uniq | tr '\n' ','
00 preloader,01 hero,02 statement,03 clients,04 projects,05 about,06 offers,07 process,08 career,09 skills,10 contact,11 footer,
$ ls docs/v2/ecrans | wc -l
52
$ diff <(sort list.txt) <(ls docs/v2/ecrans) && echo "diff sorted: empty"
diff sorted: empty
$ grep -n '^52 PNGs' docs/v2/README.md
171:52 PNGs.
```

Sections, labels collected per `### NN` heading under `## Screens`:

```
$ grep -c '^### [0-9][0-9] ' docs/v2/README.md
12
s00: PNG Purpose Layout States Interaction Reduced motion
s01: PNG Purpose Layout States Interaction Reduced motion
...                                    (s02 to s10 identical)
s11: PNG Purpose Layout States Interaction Reduced motion
12 sections
```

The README also holds the export procedure ("Export the screens":
command, prerequisites, frozen moments, tiles) and a "Known mockup
details" list after the twelve sections.

Script guards, run on scratch copies of `export-screens.mjs` and
`README.md` (mockup symlinked, repo untouched):

```
# README copy with an extra line 12-bogus.png
$ node neg/name/export-screens.mjs neg/name/out
export-screens: cannot map "12-bogus.png" to a screen
unknown name exit=1
# script copy with the statement and clients selectors swapped
$ node neg/order/export-screens.mjs neg/order/out
export-screens: .statement at y 900 starts before the previous screen ends at 2116.25
order exit=1
```

## AC-2 - sizes

```
$ for f in $(cat list.txt); do sips -g pixelWidth -g pixelHeight $f ...; done
00-preloader.png 1440 900            00-preloader-mobile.png 780 1688
01-hero.png 1440 900                 01-hero-mobile.png 780 1688
01-hero-reduced.png 1440 900         01-hero-reduced-mobile.png 780 1688
02-statement.png 1440 1062           02-statement-mobile.png 780 2148
03-clients.png 1440 154              03-clients-mobile.png 780 310
04-projects.png 1440 6335            04-projects-mobile.png 780 19576
05-about.png 1440 881                05-about-mobile.png 780 3050
06-offers.png 1440 764               06-offers-mobile.png 780 2470
07-process.png 1440 1157             07-process-mobile.png 780 3320
08-career.png 1440 1227              08-career-mobile.png 780 3874
09-skills.png 1440 539               09-skills-mobile.png 780 1570
10-contact.png 1440 641              10-contact-mobile.png 780 1990
11-footer.png 1440 203               11-footer-mobile.png 780 496
(every -dark twin has the size of its light file)
width mismatches: 0
$ du -ch docs/v2/ecrans/*.png | tail -1
 21M	total
$ diff logged-device.txt sips-sorted.txt   (logged CSS size x dpr from the fresh export log)
sips == logged CSS size x dpr for all 52 files
```

21 MB on disk against the 19 MB estimate of ADR 004 and the plan; the
plan marks it as an estimate.

## AC-4 and AC-6 - fresh export, frozen flags, repeatability

```
$ lsof -nP -iTCP:8765 -sTCP:LISTEN   -> exit 1 (free)
$ bash -c 'eval "$(fnm env --shell bash)" && fnm use >/dev/null && node docs/v2/export-screens.mjs .../qa004/run1'
exit=0 17s
# 1440x900@1x light: fonts 5, images decoded, video frame ok, document 1440 px wide
00-preloader.png 1440x900 pct=0%
01-hero.png 1440x900 video=3.560 ride=1512 otherGo=0 mq=0x12 line=1100 unrevealed=0
02-statement.png 1440x1062 video=3.560 ride=1512 otherGo=0 mq=0x12 line=1100 unrevealed=0
...                              (03 to 11 same flags)
# 1440x900@1x dark: fonts 5, images decoded, video frame ok, document 1440 px wide
...                              (same sizes and flags)
# 390x844@2x light: fonts 5, images decoded, video frame ok, document 390 px wide
00-preloader-mobile.png 390x844 pct=0%
01-hero-mobile.png 390x844 video=3.560 ride=1512 otherGo=0 mq=0x12 line=1100 unrevealed=0
04-projects-mobile.png 390x9788 video=3.560 ride=1512 otherGo=0 mq=0x12 line=1100 unrevealed=0 tiles=2
...
# 390x844@2x dark: fonts 5, images decoded, video frame ok, document 390 px wide
04-projects-mobile-dark.png 390x9788 ... unrevealed=0 tiles=2
...
# 1440x900@1x light reduced: fonts 5, images decoded, poster ok, document 1440 px wide
01-hero-reduced.png 1440x900 video=0.000 poster ride=- otherGo=0 mq=- line=- unrevealed=0
# 1440x900@1x dark reduced / 390x844@2x light reduced / 390x844@2x dark reduced
01-hero-reduced-dark.png 1440x900 video=0.000 poster ride=- otherGo=0 mq=- line=- unrevealed=0
01-hero-reduced-mobile.png 390x844 video=0.000 poster ride=- otherGo=0 mq=- line=- unrevealed=0
01-hero-reduced-mobile-dark.png 390x844 video=0.000 poster ride=- otherGo=0 mq=- line=- unrevealed=0
52 PNGs in .../qa004/run1
```

Full log in `export-run1.log`. The 48 motion lines all read video
3.560 s, RIDE at 1512 ms, no other vapor object out, 12 marquee tracks
at 0, scroll hint at 1100 ms, 0 unrevealed; the script exits 1 on any
drift (`drift()`), so exit 0 is the assert. Both 390 contexts report a
390 px wide document: the `mobile: true` path holds since spec 005.

A second run, same command into `run2`: exit 0, its PNG lines identical
to run 1 (`diff` of the two logs empty). Comparison, decoded RGB through
`ffmpeg`, `scripts/pxdiff.mjs`:

```
run1, run2: names == README list (both)
committed vs run1: sizes differ 0, bytes differ 2, pixel-identical 50 of 52
  06-offers.png 1440x764 pixelsDiffer=2 fromY=653
  06-offers-mobile-dark.png 780x2470 pixelsDiffer=35 fromY=1803
committed vs run2: sizes differ 0, bytes differ 0, pixel-identical 52 of 52
run1 vs run2:      sizes differ 0, bytes differ 2, pixel-identical 50 of 52 (the same two files)
```

The two differing files are run noise of run 1 (2 px and 35 px, in the
card footers), absent from run 2, which matches the committed set byte
for byte. `04-projects`, known to differ between runs, was identical in
both runs this time. AC-6 asks for same names and states: met.

Processes after each run:

```
8765 listen: 1 (free) | pgrep remote-debugging-port: none | pgrep http.server: none
```

## AC-3 and AC-4 - the 52 PNGs opened

Desktop files viewed one by one in crops of 1200 px scaled 0.75; mobile
files as light | dark side by side in crops of 2000 device px scaled
0.6; heroes at full size; zooms where needed. 65 crops in `view/`.

- 00 preloader x4: page background, "HJ" mark (dark in light, light in
  dark), "0%" under it, left aligned with the mark (known detail). No
  nav, no bar.
- 01 hero x4: nav (HJ mark, name, five links, FR/EN, theme, "Me
  contacter") and bottom bar (availability, two links, counts) at
  desktop; mobile nav HJ, FR/EN, theme, burger and a two-link bar. RIDE
  phone out of the mouth, next to the oval edge, its top hidden by the
  notch (known detail). Hint line drawn above "DÉFILER", above the bar.
  Oval 720 px at 1440; mobile oval measured about 359 x 288 CSS px
  (estimate from the crop), so 92vw at 1.25/1.
- 01 hero reduced x4: poster (frontal portrait), no vapor object, hint
  line static and drawn, same nav and bar.
- 02 statement x4: two title columns, note, "Ce que je fais", claim in
  five lines with the accent mono words, four chips. Mobile one column,
  chips wrap. See the cedilla finding below.
- 03 clients x4: kicker, marquee starting at "TF1" under the left fade,
  three logos black in light, inverted in dark.
- 04 projects x4: intro, six blocks with outlined title marquees at
  their start, tilted phones with ghost outline (desktop), grid of nine
  cards. Mobile: one column, phone under the copy, no ghost, grid in one
  column, ends on "Sécurité et contrôle parental". No repeat, seam
  continuous at device y 16000 (`z-projects-mobile-seam.png`).
- 05 about x4: side column "002 À PROPOS", lead with accent word, 112 px
  portrait beside two paragraphs, 2 x 2 traits. Mobile: label inline,
  portrait above the text, traits in one column.
- 06 offers x4: two cards side by side, stacked on mobile.
- 07 process x4: six rows; mobile number column with description under
  the title, the `h4` gap visible (known detail).
- 08 career x4: six rows, period, role and company, description;
  stacked on mobile.
- 09 skills x4: three groups side by side, tool marquee starting at
  "Swift"; one group per row on mobile.
- 10 contact x4: kicker, title, lead, mail, LinkedIn, location, empty
  form with "Mission" selected; form under the text on mobile. The mail
  and LinkedIn are the ones in `src/content/content.ts` (l.20, l.22).
- 11 footer x4: "PARLONS DE TON PROJET" marquee at its start, the mono
  row; three lines on mobile.

Nothing blank, cut by the clip, repeated or overlapping because of the
capture; every theme is the one the name says; none of the 44 non-hero
PNGs shows the nav or the bar.

README against the PNGs: the mobile descriptions (hero nav and bar,
oval, one-column statement, projects without ghost, inline about label,
stacked offers, 56 px process column, stacked career, skills one group
per row, contact form under the text, footer on three lines) and the
dark ones (tokens flip, logos inverted, layout unchanged: every light
and dark pair has the same size) match what I saw. Clients: 12 names, 3
as logos (`index.html` l.446 onward), as written. No mismatch found.

### Finding for Hedi, not red: the statement cedilla is clipped

In the four `02-statement` PNGs the tail of the cedilla in "CONÇOIS"
(first claim line) is cut flat. Rows from `02-statement.png`:

```
549 .........##+.....+######................
550 ........+###############................
551 ........................................
```

Probe on the served mockup at 1440 x 900 (`scripts/cedilla.mjs`): the
first `.big .line` box ends at 551.31 px from the section top, with
`overflow: hidden` (`index.html` l.160, line-height 1.02 on `.big`);
the same clip with `overflow: visible` shows the full tail
(`probe/cedilla-pair.png`, hidden left, visible right). So the PNG is
faithful: a visitor sees the same cut in the mockup. It is not in the
"Known mockup details" list of the README nor in the 2026-11-10 decision
log entry. Spec 004 excludes any mockup change, so the options are to
add it to the known details (the statement spec decides) or to route a
fix to design-agent. Hedi decides; I do not accept it.

Seen and by design per the README ("a giant outlined title marquee
behind the copy"): on mobile the meta line (index, years, client) sits
over the bottom of the outlined title letters.

## AC-5 - Git LFS

```
$ git check-attr filter diff merge -- docs/v2/ecrans/01-hero.png public/projects/FranceInfos.png
docs/v2/ecrans/01-hero.png: filter: lfs
docs/v2/ecrans/01-hero.png: diff: lfs
docs/v2/ecrans/01-hero.png: merge: lfs
public/projects/FranceInfos.png: filter: unspecified
public/projects/FranceInfos.png: diff: unspecified
public/projects/FranceInfos.png: merge: unspecified
$ cat .gitattributes
# Scope stops at docs/: CI and release checkouts fetch no LFS object, so anything shipped stays plain git.
docs/**/*.mp4 filter=lfs diff=lfs merge=lfs -text
docs/**/*.webm filter=lfs diff=lfs merge=lfs -text
docs/**/*.png filter=lfs diff=lfs merge=lfs -text
$ git lfs ls-files -n | awk ...
png 52, video 3, public 0, total 55
$ git lfs ls-files -n | grep -v '^docs/v2/ecrans/'
docs/v2/mockup/img/hero.mp4
docs/v2/mockup/img/hero.webm
docs/v2/source/hero-source-2026-11-07.mp4
$ git lfs fsck --pointers origin/dev..HEAD
Git LFS fsck OK
exit=0
$ git show HEAD:docs/v2/ecrans/01-hero.png | head -3; git cat-file -s HEAD:docs/v2/ecrans/01-hero.png
version https://git-lfs.github.com/spec/v1
oid sha256:162bb6bee4ba70d2375dcda70f3a882738dbdcfd481f9521cf81a5db2af1b319
size 278514
131
$ (every blob under HEAD:docs/v2/ecrans starts with the LFS spec line)
pointers: 52
$ (first 4 bytes of the 10 PNG blobs under HEAD:public)
  10 89504e47        (plain PNG, not pointers)
$ grep -n -i 'png\|Amend' docs/adr/004-git-lfs-reference-media.md
68:## Amendments
70:- 2026-11-09, spec 004: the scope extends to `docs/**/*.png`, for the 52
74:  behind B for the videos. `public/` PNGs stay plain git, so the build,
```

The working copies are real PNGs (`file 01-hero.png`: PNG image data,
1440 x 900), so the LFS objects are pulled. The `lfs-pointers` job of
`.github/workflows/ci.yml` runs the same `git lfs fsck --pointers` on
the PR range; no PR is open (`gh pr list --head docs-v2-mockup-screens`
empty, branch not on origin), so the CI side stays for T08 or the PR.

## AC-7 - mockup untouched, build clean

```
$ cd docs/v2 && sed -n '/^```sha256$/,/^```$/p' README.md | sed '1d;$d' | shasum -a 256 -c
mockup/index.html: OK
mockup/tokens.css: OK
mockup/img/FranceInfos.webp: OK ... mockup/img/sncf.svg: OK   (16 mockup lines, all OK)
source/hero-source-2026-11-07.mp4: OK
exit=0
$ git diff --stat origin/dev -- docs/v2/mockup
(empty)
$ git status --porcelain docs/v2/mockup
(empty)
$ git diff --name-only origin/dev..HEAD -- docs/v2/mockup src public | wc -l
0
$ git diff --stat origin/dev | grep -v 'docs/v2/ecrans/'
 .gitattributes                                 |   1 +
 AGENTS.md                                      |   4 +-
 CONTRIBUTING.md                                |   8 +-
 docs/adr/004-git-lfs-reference-media.md        |  11 +
 docs/v2/README.md                              | 299 +++++++++++++-
 docs/v2/decision-log.md                        |  10 +
 docs/v2/export-screens.mjs                     | 520 +++++++++++++++++++++++++
 product/roadmap.md                             |   2 +-
 product/tech-stack.md                          |   2 +-
 specs/004-v2-mockup-screens/plan.md            | 145 +++++++
 specs/004-v2-mockup-screens/spec.md            |  50 +++
 specs/004-v2-mockup-screens/tasks.md           |  63 +++
 64 files changed, 1260 insertions(+), 11 deletions(-)
```

The 12 files plus the 52 PNGs are the ones the plan lists.

```
$ node -v; npm -v
v22.23.4
10.9.9
$ npm ci --no-audit --no-fund
added 170 packages in 3s
npm ci exit=0   (log: 0 token-like strings)
$ npm test
No test files found, exiting with code 0
include: **/*.{test,spec}.?(c|m)[jt]s?(x)
npm test exit=0
$ npm run build
dist/assets/index-Bv9v1vkQ.css   55.94 kB | gzip:  14.86 kB
dist/assets/index-CIzYr0Kl.js   461.05 kB | gzip: 157.35 kB
built in 915ms
npm run build exit=0
$ find dist -type f | wc -l
33
$ find dist -path '*ecrans*'
(empty)
$ grep -rl export-screens dist
(empty)
$ find dist -type f | grep -i -E 'docs|mockup|decision-log|seo-accueil|hero-source|export'
(empty)
$ find dist -name '*.png'
dist/projects/{FranceInfos,FranceInfos1,FranceInfos2,FranceInfos3,tfoumax,La1ere,WorkoutLife,GearTrack,RIDE,MYTF1}.png   (the 10 public/ PNGs)
$ dist files whose sha256 matches one of the 52 ecrans PNGs
0
```

`npm test` is green with zero test files: this change adds no
TypeScript (ADR 001), so it only proves the runner starts. `dist/` did
not exist before the build and was removed after the check.

## AC-8 - decision log, roadmap, AGENTS

```
$ git diff origin/dev -- docs/v2/decision-log.md | grep '^+'
+- 2026-11-09: Mockup PNGs (spec 004): the preloader is its own screen,
+  the fixed nav and bottom bar appear on the hero PNGs only; every screen
+  at 1440 px 1x and 390 px 2x, light and dark; reduced motion for the hero
+  only; the hero frozen with the RIDE app at its peak and the scroll hint
+  line drawn, marquees at their start; the PNGs go through Git LFS under
+  `docs/`.
+- 2026-11-10: Three small mockup details stay in the validated PNGs and
+  are settled by their section specs, not by a new artifact version: the
+  notch on the small vapor phones, the unreset `h4` margin in offers,
+  process and career, and the preloader count aligned left (spec 004).
$ grep -n 'Wave 0' product/roadmap.md
15:- [x] Wave 0: the v2 log, the mockup and its media, and `SEO-accueil.md` are versioned in `docs/`, ... 52 PNGs (one per section, light and dark, desktop and mobile) in `docs/v2/ecrans/` since spec 004.
16:- [ ] Wave 0: the Wara DS SDK is upgraded from `--wara-*` (0.1.0) to the `--ws-*` version the mockup uses, ...
$ git diff origin/dev -- AGENTS.md | grep '^[-+][^-+]'
-4. Before any screen: `docs/v2/` (README, mockup, decision log); the
-   per-screen PNGs follow in wave 0
+4. Before any screen: `docs/v2/` (README with one section per screen,
+   mockup, decision log) and its PNGs in `docs/v2/ecrans/`
$ wc -l AGENTS.md
59 AGENTS.md
```

The capture choices and D1 (line drawn) are in the 2026-11-09 entry.
After the rebase on spec 005 that entry is no longer last, as `plan.md`
says (9223e0f): the spec 005 entries of 2026-11-09 and 2026-11-10
follow it, then the spec 004 entry of 2026-11-10. Chronological order
holds; the plan sentence is stale, not the log. Line 16, the SDK
upgrade, is a second wave 0 line and stays open: AC-8 names line 15.

## Extra checks

```
$ git diff origin/dev -- . ':!docs/v2/ecrans' | grep '^+' | grep -c -P '[\x{2013}\x{2014}\x{2018}\x{2019}\x{201C}\x{201D}]'
0
positive control: a line holding U+2014 gives 1
$ grep -c -i benjahouach docs/v2/README.md docs/v2/export-screens.mjs docs/v2/mockup/index.html
0 0 0
```

## Notes for review (not red)

- The statement cedilla clip above: a mockup detail not yet recorded.
- `plan.md` cites `dev..HEAD`, `git diff --stat dev` and "the spec 004
  entry is last": the first two need `origin/dev`, the third is stale
  since the rebase.
- The script leaves its `export-screens-*` work folder (the
  `http-server.log`) in the OS temp dir after a successful run; the
  plan says the log goes there, so it is by design. It removes the
  Chrome profile.
- 21 MB of PNGs on disk against the 19 MB estimate of ADR 004.

## Not verified and why

- `lfs-pointers` green on the PR: no PR exists yet; the same command
  passes locally on `origin/dev..HEAD`.
- Byte identity across Chrome versions or machines: not promised (plan,
  risks). Same machine and Chrome: run 2 equals the committed set byte
  for byte, run 1 differs by 2 and 35 px in two files.
- Eco mode: the mockup has none. Reduce Motion: covered by the four
  `01-hero-reduced*` PNGs and their log lines; the spec keeps reduced
  motion to the hero.
- Side by side against a live capture: the PNGs are the reference
  (plan); both reruns render the served mockup, and run 2 is identical
  to the committed set, which covers the `01-hero` spot-check.

## Scratch evidence

In the qa scratchpad `qa004/` (local, not committed):
`list.txt`, `ls.txt`, `sizes-committed.txt`, `logged-device.txt`,
`export-run1.log`, `export-run2.log`, `run1/`, `run2/` (52 PNGs each),
`pxdiff-committed-run1.txt`, `pxdiff-committed-run2.txt`,
`pxdiff-run1-run2.txt`, `view/` (65 crops and the zooms), `probe/`
(cedilla captures), `neg/` (negative controls and `order.log`),
`npm-ci.log`, `npm-test.log`, `npm-build.log`, `scripts/` (`pxdiff.mjs`,
`cedilla.mjs`).

Every server and Chrome stopped: `lsof` shows 8765, 8766 and 9333 free,
no Chrome with a debugging port, no `http.server`.
