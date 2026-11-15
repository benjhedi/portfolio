# Verification 008 - v2 hero mockup, sky

Run by qa on 2026-11-15, task T07. Branch `feat-hero-mockup-sky`, HEAD
18de4e7 for the full run, AC-6 rerun at 6948fb0 (see Rerun), stacked on `feat-hero-spec` (a84d876); every diff below runs
against `feat-hero-spec`. Working tree clean before and after. Node
22.23.5 through fnm (`.nvmrc` 22), npm 10.9.9, Chrome 157.0.8103.51
headless with `--force-color-profile=srgb` (the plan noted .50; T01
already ran its last floor on .51), `python3` http.server, `ffmpeg`.

```
Verdict: PASS
Criteria: 6 green, 0 red (AC-6 red at 18de4e7, green at 6948fb0, see Rerun)
Build and lint: npm ci, npm test (1 file, 1 test), npm run build exit 0 on Node 22.23.5; no lint or format script in package.json
Screens: 8 before / after / difference strips of the hero PNGs, plus paused, autoplay-refused and focus shots light and dark; every difference is one of the four changes or the 390 recentering the plan predicted
Scenarios walked: 138 probe checks at 1440x900 dpr 1 and 390x844 dpr 2 mobile, light and dark, motion and reduced, 0 failed; mouse follow, click pause and play, touch tap, Tab and Enter, autoplay refused (play() stub), reduced motion
Not verified and why: the artifact itself (main-session evidence); Safari, Firefox, real devices (spec 007); Eco mode (the mockup has none)
```

## Results per criterion

| AC | Test name | Result | Evidence in short |
|---|---|---|---|
| AC-1 | `retintsOvalWithAccentDuotone` | PASS | video, `i.tint`, `div.vapor` in that order; `mix-blend-mode: color`, background equals the resolved accent (light rgb(13, 81, 140), dark rgb(110, 199, 242)), opacity 0.62 / 0.5, 8 contexts; backlight #c4d0d7 to #b3d4f0 at 1440 light; outside the oval only the role line differs at 1440; reduced poster tinted |
| AC-2 | `showsConsultantRoleLine` | PASS | `.hero .role` = "Consultant iOS senior, freelance" in 8 contexts, old string absent; equals FR `identity.role` in `content.ts` |
| AC-3 | `togglesLoopFromOval` | PASS | 44 x 44 native button, 32 px porcelain disc, charcoal glyph, 16 px above the oval bottom on its axis, "Pause"; follows the cursor at 0 px over 3 points, back at rest; click away pauses video and `emerge` on the current frame, no poster, "Lecture"; second click plays; Tab after the nav and before "Défiler", 2 px porcelain gap then 2 px ring; Enter toggles; autoplay refused shows the poster with play; hidden and skipped under reduced motion |
| AC-4 | `dropsNotchOnVaporPhones` | PASS | `::after` content `none` on the 3 vapor phones, `""` kept on the 6 work phones, 8 contexts; RIDE whole in the strips |
| AC-5 | `changesOnlyTheHero` | PASS | box diff: 0 boxes changed outside the hero in 8 contexts, 0 section heights moved; floor 0 everywhere |
| AC-6 | `refreezesNewArtifactVersion` | PASS (rerun at 6948fb0) | sums 17/17 OK, `index.html` d85edfa2... equals the read-back; mockup diff `index.html` only; ecrans diff 8 hero LFS pointers only; png block 52; export exit 0 and negative exit 1; fresh hero PNGs byte-identical to the committed ones; npm green; version named in README contents, sums and hero section, decision log, tech-stack, mission |

## AC-1 to AC-4 - probe on the committed mockup

T01's `probe.mjs` and `lib.mjs`, unchanged, run on a copy of the
committed `docs/v2/mockup/` (index.html sha256 d85edfa2..., the 15 other
files' sums digest equal to the before copy), served on 127.0.0.1:8767,
fresh Chrome profile. Emulation as the export: 390 runs with
`mobile: true`, scheme and reduced motion emulated.

```
$ node probe.mjs <t07>/after/mockup <t07>/proofs      (1 min 14 s)
done 1440x900@1x-light ... done 390x844@2x-dark-reduced   (8 contexts)
autoplay flag: refused=false
autoplay stub: refused=true
138 checks, 0 failed
exit=0
```

Values read from `probe-ac1-ac4.json`:

```
all 8: media children ['video.head', 'i.tint', 'div.vapor']; tint blend color, pointer-events none, aria-hidden true
light: tint background rgb(13, 81, 140) = accent rgb(13, 81, 140), opacity 0.62
dark:  tint background rgb(110, 199, 242) = accent rgb(110, 199, 242), opacity 0.5
all 8: role "Consultant iOS senior, freelance", old string in body: false
all 8: vapor ::after ['none','none','none'], work ::after six '""'
motion: toggle BUTTON type button, display block, hidden false, label Pause
reduced: toggle display none, hidden true; video paused, played 0, t 0 (poster)

1440 rest: button 698,544.75 44x44, center x 720 = oval center 720, oval bottom 604.75 - button bottom 588.75 = 16
           disc 32px x 32px, radius 9999px, bg rgb(230, 235, 244), --ws-shadow-inset; glyph rgb(28, 28, 28), both themes
390 rest:  button 173,420.06 44x44, center x 195 vs oval 195.008, 16 px above the oval bottom
follow 1440: cursor (576,365) (806,278) (720,470) -> center identical, d = 0, 0, 0; back at 720,566.75
follow 390:  cursor (123,337) (238,285) (195,400) -> d = 0, 0, 0; back at rest
pause 1440 light: click at 25%,40% of the oval, target not the toggle, 1 click
   video t 2.5597 then 2.5597 500 ms later, paused, played 1, readyState 4 (frame, not poster)
   emerge: RIDE paused at 2100, site.jpg paused at 450.0 then 450.0; label Lecture, play glyph, .paused on the oval
resume: video 2.5604 -> 2.8624 in 300 ms, site.jpg running at 733.2, label Pause
(same pattern in 1440 dark, 390 light, 390 dark: held times equal over 500 ms, then moving)
390 touch tap at (123,322): paused true, label Lecture, toggle still at rest 195,442.06
Tab 1440: brand, 5 nav links, FR, EN, theme, Me contacter, button#heroToggle|Pause, a.scroll|Défiler
Tab 390:  brand, FR, EN, theme, burger, button#heroToggle|Pause, a.scroll|Défiler
focus: :focus-visible true, button box-shadow none, disc shadow
   --ws-shadow-inset, rgb(230, 235, 244) 0 0 0 2px, rgba(65, 192, 242, 0.45) 0 0 0 4px   (dark 0.5)
Enter: Lecture + paused, then Pause + playing (all 4 motion contexts)
reduced Tab 1440: ... Me contacter, a.scroll|Défiler (toggle skipped); 390: ... burger, a.scroll|Défiler
autoplay, --autoplay-policy=user-gesture-required: muted video played (t 1.98, played 1), not refused
autoplay, play() stub (rejects NotAllowedError, autoplay attribute removed):
   light and dark: paused, t 0, played 0, label Lecture, play glyph, .paused; after restoring play(), a click plays, label Pause
```

Disc and ring contrast on the exported frame, T01's `ringcontrast.mjs`
with the 2 px gap, 36 radii around the disc center:

```
$ node ringcontrast.mjs <t07>/after/mockup 2 ring-contrast-gap.json
1440 light: disc vs surround 17.17-17.47; gap vs outside median 17.04 (min 12.22); ring vs gap median 6.43 (min 4.6); ring vs outside median 2.64 (min 2.3)
1440 dark:  disc vs surround 17.17-17.47; gap vs outside median 17.04 (min 12.43); ring vs gap median 5.63 (min 4.11); ring vs outside median 3.03 (min 2.63)
390 light:  disc 17.19-17.55; gap vs outside median 17.1; ring vs gap median 6.47; ring vs outside median 2.64
390 dark:   disc 17.17-17.55; gap vs outside median 17.1; ring vs gap median 5.65; ring vs outside median 3.02
glyph rgb(28, 28, 28) on rgb(230, 235, 244): 14.25:1, both themes
```

Same figures as T01 to the second decimal. The ring against the dark
shirt stays under 3:1 in light (2.64); the porcelain gap around it is
what contrasts (12 to 17:1), as the plan and the decision log
(2026-11-15, T01) settle. See notes for review.

## AC-5 - before and after export, box diff

`<t07>/before/` = `feat-hero-spec`'s `export-screens.mjs` (3b042f7f...)
and `README.md`, plus the committed mockup with `index.html` from
`feat-hero-spec` (069ccf26...). `<t07>/after/` = the committed
`docs/v2/` script (3f108cc8...), README and mockup (d85edfa2...).
Non-index sums digest 42b9b1ee53ed30fc on both, 16 files each.

```
$ node before/export-screens.mjs png-before-1   exit=0 17s pngs=52
$ node before/export-screens.mjs png-before-2   exit=0 17s pngs=52
$ node after/export-screens.mjs  png-after-1    exit=0 17s pngs=52
```

Box diff, T01's `geo.mjs` (export's prepare and freeze, 8 contexts) and
`geodiff.py`:

```
$ geodiff.py geo-before-1.json geo-before-2.json        (floor)
every context: nav=0/21 hero=0/43 statement=0/33 clients=0/30 projects=0/243 about=0/29 offers=0/18 process=0/33 career=0/37 skills=0/59 contact=0/41 footer=0/17 bar=0/9
boxes changed outside the hero: 0; sections whose height moved: 0
$ geodiff.py geo-before-1.json geo-after.json
1440 (4 contexts): nav=0/21 hero=68/80 statement=0/33 ... footer=0/17 bar=0/9
390  (4 contexts): nav=0/21 hero=77/80 statement=0/33 ... footer=0/17 bar=0/9
boxes changed outside the hero: 0; sections whose height moved: 0
```

Hero height 900 -> 900 at 1440, 844 -> 844 at 390; every section top
equal. The hero gains 7 elements (43 -> 50: `.tint`, the button, two
SVGs, one path, two rects). The 68 changed keys at 1440 are mostly path
shifts from the inserted `.tint`; matched by geometry, only the role
line box changes (531.56 -> 287.06 px wide) and the new elements appear.
At 390 the role goes from 2 lines to 1 and the stack recenters 12 px
down inside its 844 px (oval y 181.03 -> 193.03, name 508.06 -> 520.06,
hint bottom 694.95 -> 682.95), the plan's hypothesis.

Pixel diff, information only (T01's `pngdiff.mjs`):

```
$ pngdiff.mjs png-before-1 png-before-2                 (floor)
52 PNGs, 2 differ, 7 pixels: 05-about-mobile-dark.png (5 px, max 1) 06-offers.png (2 px, max 1)
$ pngdiff.mjs png-before-1 png-after-1 geo-before-1.json geo-after.json
01-hero.png              diff 204699, inside 194757, edge 5696, outside 4246; backlight #c4d0d7 -> #b3d4f0, mean luma 97.09 -> 98.92
01-hero-dark.png         diff 195336, outside 4246; backlight #c4d0d7 -> #afd7eb, luma 97.08 -> 99.35
01-hero-reduced.png      diff 233498, outside 4246; backlight #bdcad3 -> #a9cfee, luma 110.35 -> 111.25
01-hero-reduced-dark.png diff 228192, outside 4246; backlight #bdcad3 -> #a5d2e9
01-hero-mobile*.png (4)  diff 332125 to 355327, outside 20134 each
05-about-mobile-dark.png 5 px max 1; 05-about-mobile.png 14 px max 1   (run noise, max 1)
52 PNGs, 10 differ
$ outsiderole.mjs <t07>
1440 (4 PNGs): 4246 px differ outside the oval, 4246 inside the role line box, 0 elsewhere
390 (4 PNGs): 20134 px outside the oval: 12212 in the role box, 7922 elsewhere, bbox css y 512.5-689.5 (name and hint moved 12 px; nothing above the oval, nav untouched)
```

The backlight lands on the design-agent reference (#b2d4f0, here
#b3d4f0) and the mean luma inside the oval moves by under 2 %: the
duotone keeps the video's luminance. 42 non-hero PNGs equal up to the
max-1 run noise.

## Side by side

Strips, each before | after | difference (white where a channel differs
by more than 8, magenta is the separator), in `<t07>/side/`:

- `01-hero.png`, `01-hero-dark.png`: the oval turns from grey to sky,
  the face and shirt keep their darks; the RIDE phone loses its dark
  notch; a porcelain disc with the pause glyph sits at the bottom center
  of the oval; the role line reads "Consultant iOS senior, freelance".
  Nav, hint and bar identical.
- `01-hero-mobile.png`, `01-hero-mobile-dark.png`: same four changes;
  the role fits in one line and oval, name and hint move 12 px down.
  Nav and bar identical.
- `01-hero-reduced*.png` (4): the frontal poster tinted sky, no toggle,
  new role line; at 390 the same 12 px recentering.
- `states-grid.png` (rows: paused, autoplay refused, focus; columns
  light, dark, 1440x900) and `toggle-crops.png` (the toggle zoomed x2 in
  the same six states). Paused: the site object held mid-flight in the
  vapor, play glyph. Autoplay refused: the frontal poster, play glyph.
  Focus: pause glyph, porcelain gap then the sky ring. Source shots in
  `<t07>/proofs/shot-{paused,autoplay-refused,focus}-desktop-{light,dark}.png`.

No difference outside the four changes and the predicted recentering.

## AC-6 - refreeze and the version named

Artifact side, main-session evidence (qa does not reach the artifact):
T02 published the change as version 1794759302-6b38, read-back sha256
of `index.html` d85edfa242603f4465a38b2d528ffeffa7c313ad5406a089b6a8e189168c612c.

```
$ cd docs/v2 && sed -n '/^```sha256$/,/^```$/p' README.md | sed '1d;$d' | shasum -a 256 -c
mockup/index.html: OK ... mockup/img/sncf.svg: OK (16 mockup lines), source/hero-source-2026-11-07.mp4: OK
exit=0, entries 17
$ shasum -a 256 docs/v2/mockup/index.html; wc -c
d85edfa242603f4465a38b2d528ffeffa7c313ad5406a089b6a8e189168c612c  62882 bytes   (equals the read-back)
$ diff <(git show feat-hero-spec:docs/v2/README.md | sums block) <(sums block)
< 069ccf26...  mockup/index.html
> d85edfa2...  mockup/index.html                    (the 15 other sums unchanged)
$ git diff --stat feat-hero-spec -- docs/v2/mockup
 docs/v2/mockup/index.html | 37 +++++++++++++++++++++++++++++++++++--
$ git diff --stat feat-hero-spec -- docs/v2/ecrans
 01-hero{,-dark,-mobile,-mobile-dark,-reduced,-reduced-dark,-reduced-mobile,-reduced-mobile-dark}.png | 4 ++--  (8 files)
$ git show HEAD:docs/v2/ecrans/01-hero*.png | head -1   -> "version https://git-lfs.github.com/spec/v1" x 8
png block: 52 names; docs/v2/ecrans: 52 files
```

The `index.html` diff is the plan's technical approach: the tint rule
and its dark opacity with the D1 comment, the paused play-state rule,
the toggle rules, `.vapor .phone::after{content:none}`, the `i.tint`
and `button#heroToggle` elements, the role text, the script branch. No
hex added; `tokens.css` unchanged.

Export, rerun by qa on the committed script and mockup (above,
`png-after-1`): exit 0, the toggle logged on the 8 hero rows:

```
01-hero.png 1440x900 video=3.560 ride=1512 otherGo=0 mq=0x12 line=1100 unrevealed=0 toggle=Pause
01-hero-mobile-dark.png 390x844 ... toggle=Pause
01-hero-reduced-mobile-dark.png 390x844 video=0.000 poster ride=- ... toggle=hidden
```

Negative control, rebuilt by qa from the committed copy:

```
$ diff after/mockup/index.html neg/mockup/index.html
778c778
<     vid.muted = true; play();
>     vid.muted = true; vid.play().catch(function(){}); show(true);
$ node neg/export-screens.mjs png-neg
export-screens: 1440x900@1x light: play toggle {"shown":true,"label":"Lecture"}
negative exit=1, 0 PNG written
```

Committed hero PNGs against a fresh export in the same text state:

```
$ pngdiff.mjs png-after-1 docs/v2/ecrans
00-preloader x4, 02-statement x4: diff 0     (same text-rendering state)
01-hero x8: diff 0; sha256 of each fresh file equals the committed LFS oid (eeebad8d..., 582f1dbb..., ...)
52 PNGs, 1 differ, 5 pixels: 05-about-mobile-dark.png (max 1, the floor's noise)
```

Version named:

```
$ grep -n 1794759302-6b38 docs/v2/README.md
10:  1794759302-6b38 (spec 008, 2026-11-15), before it 1794266082-62e1      (Contents)
67:1794759302-6b38: specs 005 and 008 changed `index.html` only, the other  (Integrity)
$ grep -n 1794759302-6b38 docs/v2/decision-log.md
8:   (header) and 118: the dated 2026-11-15 entry
$ grep -n 1794759302-6b38 product/tech-stack.md   -> 47
$ grep -n 1794759302-6b38 product/mission.md      -> 3
$ sed -n '/^### 01 Hero$/,/^### 02 Statement$/p' docs/v2/README.md | grep -c 1794759302-6b38
0 at 18de4e7 (red); 1 at 6948fb0: "exported from version 1794759302-6b38 (spec 008)." (see Rerun)
$ git grep -n 1794266082-62e1 -- . ':!specs/005-*' ':!specs/008-*'
docs/v2/README.md:10 "before it 1794266082-62e1"; docs/v2/decision-log.md:7 "... (spec 005 ...), then at"   (history only)
```

At 18de4e7 the hero section (README l.205-235) described the tint,
toggle, role, missing notch and the paused and autoplay-refused states
but named no version, so this clause was red. Fixed in 6948fb0; the
rerun below shows it green.

### Rerun - AC-6 at 6948fb0

First run (HEAD 18de4e7): FAIL, AC-6 red on one clause, the README hero
section did not name 1794759302-6b38 (spec AC-6 "the README hero
section ... SHALL name it"; plan "version grep in README (contents and
hero)"). Hedi chose to name the version in the hero section rather than
amend the spec. Fix: 6948fb0 `[feat-hero-mockup-sky]: name the mockup
version in the README hero section`. Only AC-6 was rerun; AC-1 to AC-5
keep the 18de4e7 evidence above, since the fix touches no mockup, PNG,
script or source file.

```
$ git diff --stat 18de4e7 6948fb0
 docs/v2/README.md | 3 ++-          (1 file changed, 2 insertions(+), 1 deletion(-))
$ git diff 18de4e7 6948fb0
-- PNG: `01-hero`, and `01-hero-reduced` for the poster, four each.
+- PNG: `01-hero`, and `01-hero-reduced` for the poster, four each,
+  exported from version 1794759302-6b38 (spec 008).
$ sed -n '/^### 01 Hero$/,/^### 02 Statement$/p' docs/v2/README.md | grep -c 1794759302-6b38
1
$ cd docs/v2 && sed -n '/^```sha256$/,/^```$/p' README.md | sed '1d;$d' | shasum -a 256 -c
17 lines OK, exit=0
$ diff <(git show 18de4e7:docs/v2/README.md | sums block) <(sums block)
(no output): sums block identical to 18de4e7
png block: 52 names
$ git diff --stat feat-hero-spec -- docs/v2/mockup
 docs/v2/mockup/index.html | 37 +++++++++++++++++++++++++++++++++++--   (unchanged)
$ git diff --stat feat-hero-spec -- docs/v2/ecrans
 8 files changed, 16 insertions(+), 16 deletions(-)                       (the 8 hero PNGs, unchanged)
$ git diff --quiet 18de4e7 6948fb0 -- docs/v2/mockup docs/v2/ecrans
exit 0: mockup and ecrans unchanged since the first run
```

AC-6 is green; the verdict moves from FAIL to PASS.

Build:

```
$ npm ci --no-audit --no-fund
added 170 packages in 3s
npm ci exit=0   (token-like strings in the log: 0); @warastudio/theme 0.2.0, @warastudio/react 0.2.0
$ npm test
 Test Files  1 passed (1)
      Tests  1 passed (1)
npm test exit=0
$ npm run build
dist/assets/index-F8DYGKQB.css   55.16 kB | gzip:  15.04 kB
dist/assets/index-o7cyQTF9.js   461.04 kB | gzip: 157.35 kB
built in 875ms
npm run build exit=0
$ find dist -type f | wc -l -> 33; grep -rl '1794759302|BDrsQCHWzgfQRLqBGn9FJM|heroToggle|decision-log' dist -> 0
$ git diff --name-only feat-hero-spec..HEAD -- src public | wc -l -> 0
```

`dist/` is gitignored (`.gitignore:5`) and was removed after the check.

## Extra - static checks and writing style

```
$ git diff feat-hero-spec -- docs/v2/mockup/index.html | grep '^+' | grep -c -E '#[0-9a-fA-F]{3,8}\b'
0
px literals added: 44px x2, 22px x3, 16px x2, 6px, 2px, 4px
$ git diff feat-hero-spec | grep '^+' | grep -c -P '[\x{2013}\x{2014}\x{2018}\x{2019}\x{201C}\x{201D}]'
0      (positive control with U+2014: 1)
```

## Notes for review (not red)

- Focus ring against the dark shirt: 2.64:1 in light, 3.03 in dark
  (min 2.3). The 2 px porcelain gap carries the indicator (12 to 17:1),
  as decided on 2026-11-15; review-agent to confirm it reads as meeting
  WCAG 1.4.11 under rule 31, which targets 2.1 AA.
- Literals beyond the gate's 32 and 44: `22px` (half the target),
  `6px` (the disc inset, (44 - 32) / 2), `16px` (glyph size), and the
  2 px / 4 px ring spreads. Derived or matching the page's ring; the
  gate names only 32 and 44.
- Chrome's `--autoplay-policy=user-gesture-required` does not refuse
  muted autoplay in 157.0.8103.51; the refused state was proven with
  the `play()` stub, as the plan's fallback says.
- In the pause hold RIDE is already at the end of its `emerge` (2100 ms,
  paused); the in-flight object is the one that proves the hold.

## Not verified and why

- The artifact itself (version 1794759302-6b38 and its read-back): qa
  does not reach claude.ai; the main-session sum is recorded above and
  the repo file matches it.
- Safari, Firefox, real devices, VoiceOver: spec 007's QA.
- Eco mode: the mockup has none. Reduce Motion: probed in 4 contexts and
  the 4 reduced PNGs diffed.
- Mouse follow on a real trackpad and the 160 ms glide by eye: the probe
  reads positions after 450 ms, not the transition curve.

## Scratch evidence

`<t07>` = `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-sdk-upgrade-spec-b71a31/10bd1dc6-a63b-4b83-ae6a-6d294edb9327/scratchpad/t07`:
`before/`, `after/`, `neg/` (script, README, mockup copy),
`png-before-1/`, `png-before-2/`, `png-after-1/` (52 PNGs each),
`side/` (8 strips, `states-grid.png`, `toggle-crops.png`, crops),
`proofs/` (`probe-ac1-ac4.{txt,json}`, `ring-contrast-gap.*`,
`geo-*.json`, `geodiff-*.txt`, `pngdiff-*.txt`, `outside-oval.txt`,
`measures-before-after.txt`, `hero-box-detail.txt`,
`negative-control.diff`, the six state shots), `logs/` (exports,
geo, probe, npm), `tools/` (T01's tools plus `outsiderole.mjs`).

Ports 8765 to 8767 free, no Chrome with a debugging port, no
`http.server`, no temp Chrome profile or export temp folder left.
