# Verification 007 - v2 hero

Date: 2026-11-16 | Branch: `feat-v2-hero` | HEAD: `dfbf866` (clean tree, before this report)
Run by: qa (T25) | Node 26.13.1 (`.nvmrc` says 22, see Findings), Chrome 157.0.8103.51 headless, ffprobe 9.0.2

```
Verdict: PASS locally; two manual rows and Hedi's keyboard confirmation pending
Criteria: AC-1 to AC-18 each have at least one green row; test plan 41 rows:
          39 green (the keyboard row awaits Hedi's confirmation), 0 red,
          2 pending (Safari / Firefox, Safari low power)
Build and lint: npm test 39/39, npm run build exit 0 (tsc -b included); no lint or format script in package.json
Screens: 8 compared against docs/v2/ecrans/01-hero*.png; after a 1 css px vertical offset
         (D2) the oval, poster, video frame, RIDE, name and role match pixel for pixel;
         what remains is the 12 px hint (D2) and 1 device px rounding at DPR 2
Scenarios walked: reduced, ?motion, reveal, locale, hint, media blocked / SPA fallback / delayed,
                  toggle (rest, follow, clamp, click, Enter, Space, tap, refused), off screen, hidden tab,
                  live reduced on and off with and without a visitor pause
Not verified and why: Safari and Firefox (manual, Hedi), Safari low power autoplay (manual, Hedi),
                      Hedi's own keyboard pass; Eco mode does not exist in this product
```

## Setup

- Server: `npm run preview` (build, then `wrangler dev` on 8787), the
  production build. The Vite dev server on 5173 was not used.
- Mockup reference: `python3 -m http.server 8766 --directory docs/v2/mockup`
  (read only) to measure the mockup's boxes at the same sizes as the site.
- Tools, all in the session scratchpad `t25/`, out of git: `lib.mjs` (the
  t23 CDP launcher extended with input, touch, key, emulation, Fetch and
  init scripts), `probe-layout.mjs`, `probe-vapor.mjs`,
  `probe-screens.mjs`, `probe-behavior.mjs`, `probe-a11y.mjs`,
  `compare.mjs`, `shift.mjs`, `pair.mjs`, `ringpx.mjs`, `ranges.mjs`.
  JSON and PNG outputs sit next to them.
- One fresh headless Chrome profile per context: theme follows the
  emulated `prefers-color-scheme`, locale set in `localStorage` (`fr`
  unless stated).
- Local wrangler answers a `Range` request with `200` and the whole body
  (`curl -r 0-9` on `/hero/hero.mp4`: `HTTP/1.1 200 OK`, `Content-Length:
  492791`), so Chrome cannot seek the hero video there. Only for the
  frozen PNG captures, `ranges.mjs` serves the same `dist/hero/*` bytes
  with `206` through CDP `Fetch`; every other probe uses wrangler as is.
- axe-core 4.12.1 injected from the local copy in
  `WaraDS-Web/node_modules/.pnpm/axe-core@4.12.1/` (no install in this repo).

## Build and tests

```
$ npm test
 Test Files  6 passed (6)
      Tests  39 passed (39)                                   exit 0
$ npm run build
dist/assets/index-BCp08wrb.css    61.56 kB | gzip:  16.44 kB
dist/assets/index-C4sCKwCO.js    458.46 kB | gzip: 156.33 kB
✓ built in 801ms                                              exit 0
$ npx vitest run src/sdkTokens.test.ts -t failsOnUndefinedSdkVariable
 ✓ src/sdkTokens.test.ts > SDK tokens > failsOnUndefinedSdkVariable
 Tests  1 passed (1)                                          exit 0
```

## Static checks

```
$ grep -nE '(aria-label|alt)="[^"]+"|>[^<>{}=]*[A-Za-z][^<>{}=]*</' src/sections/hero/*.tsx      exit 1 (empty)
$ grep -rn "Benjahouach\|Wara" src/sections src/services src/app/ServiceContext.tsx             exit 1 (empty)
$ grep -n "prefers-reduced-motion" src/sections/hero/hero.css                                   exit 1 (empty)
$ grep -nE "#[0-9a-fA-F]{3,8}\b" src/sections/hero/hero.css                                    exit 1 (empty)
$ grep -n "::after" src/sections/hero/hero.css                                                  exit 1 (empty)
$ grep -rn "ws-kenburns\|ws-aurora\|ws-grain\|ws-bar-\|ws-hero-reveal" src                      exit 1 (empty)
$ grep -rn "hero-1" src index.html; ls dist/hero                                                 empty; no hero-1.*
Rule 10:
$ grep -rnE "fetch|localStorage|matchMedia|location|IntersectionObserver|visibilityState" \
    src/sections src/app/ServiceContext.tsx src/main.tsx src/App.tsx                             exit 1 (empty)
$ grep -rlnE "matchMedia|location|IntersectionObserver|visibilityState" src/services
  htmlVideoClock.ts, mediaQueryMotionPreference.ts (+ their tests)
$ grep -rn "sections/" src/sections                                                              exit 1 (no section imports a section)
$ grep -nE "^\s*import " src/content/content.ts                                                  exit 1 (content imports nothing)
$ grep -nE "[0-9]+(\.[0-9]+)?\s*(ms|s)\b|setTimeout|2\.05" src/sections/hero/Hero.tsx           exit 1 (no literal timing)
```

`Benjahouach` is still in `index.html` (title, og:title) and
`ContactForm.tsx` (`from_name`): left to the SEO and contact specs by the
spec's Data section, not in the hero.

## Test plan, one result per row

Unit rows: `npx vitest run <file> -t "^.* <name>$" --reporter=verbose`,
each run alone (log `t25/unit.log`); every one printed `✓ ... <name>` and
`Tests 1 passed | N skipped`, exit 0.

| AC | Test name | Type | Result | Evidence |
|---|---|---|---|---|
| AC-1 | `matchesPlayingPngsSideBySide` | PNG | green | Screens, below |
| AC-1 | `stacksNameRoleHintUnderOvalOnAxis` | probe | green | gaps 40 / 4 / 48 at 1440x900, 1440x1000, 901, 390; centers 720 / 720 / 720 / 719.99 |
| AC-2 | `capsOvalWidthByViewportWithBarReserved` | probe | green | 720x480 at 1440x900; 860x573.33 at 1440x1000 and 1440x995 |
| AC-2 | `switchesToNarrowRatioAt900` | probe | green | 901: ratio 1.5, 78vw; 900: 828 px = 92vw, 1.25; 390: 358.8 = 92vw, 1.25; `cover`, `50% 28%` |
| AC-3 | `loopsMutedInlineWithoutControls` | probe | green | muted, loop, playsInline true, no controls; 6 wraps in 27 s, duration 4.209 |
| AC-3 | `shipsVideoWithoutAudioStream` | ffprobe | green | one video stream each, no audio |
| AC-4 | `releasesOnceWhenLoopReachesExhale` | unit | green | unit.log |
| AC-4 | `rearmsOnlyAfterLoopRestarts` | unit | green | unit.log |
| AC-4 | `cyclesObjectsFromRide` | unit | green | unit.log |
| AC-4 | `releasesObjectsFromMouthInOrder` | probe | green | 6 releases RIDE, site, franceinfo, product, GearTrack, RIDE; origin 67 / 51 % (1440), 67 / 47 % (390) |
| AC-5 | `hidesVaporLayerWithoutNotch` | probe, grep | green | `div.vapor` `aria-hidden="true"` after the video; `::after` content `none` on the 3 phones |
| AC-6 | `stopsPlayAndHidesToggleWhenReduced` | unit | green | unit.log |
| AC-6 | `showsStaticPosterUnderReducedMotion` | probe | green | 4 contexts: img poster, 0 video, 0 vapor, 0 button, line `none`, opacity 1 at first commit |
| AC-6 | `matchesReducedPngsSideBySide` | PNG | green | Screens, below |
| AC-7 | `allowsMotionWhenUrlCarriesMotion` | unit | green | unit.log |
| AC-7 | `playsLoopUnderReducedWithMotionParam` | probe | green | reduced emulated (`matches` true), `/?motion`: playing, RIDE released, toggle "Pause" |
| AC-8 | `revealsOnceOnFirstEntry` | probe | green | first commit opacity 0, `matrix(1,0,0,1,0,24)`; then 1 / none, 0.8 s; no replay |
| AC-9 | `findsNoLiteralCopyInHeroSource` | grep | green | empty, exit 1 |
| AC-9 | `switchesEveryHeroLabelWithLocale` | probe | green | FR then EN via the nav switch: role, hint, video, toggle, product label, poster alt |
| AC-10 | `showsJahouachWithoutWaraInHero` | grep, probe | green | grep empty; hero DOM has no "Benjahouach" or "wara"; h1 "Hedi Jahouach" |
| AC-11 | `landsOnNextSectionWhenHintActivated` | probe | green | click and Enter, motion and reduced: `#apropos`, its top at 0 |
| AC-12 | `reachesToggleThenHintWithVisibleRing` | keyboard | green (qa); Hedi pending | Tab order ends nav, toggle, hint; `:focus-visible` on both, 2 px ring |
| AC-12 | `passesAxeAndContrastInBothThemes` | axe | green | 0 violations in 6 contexts; text 5.35:1 to 17.39:1 |
| AC-13 | `wrapsNameAndRoleInOnlyH1` | probe | green | 1 `h1` holding both spans, section labelled by it; labels from content FR and EN |
| AC-14 | `staysUnderMockupMediaBytes` | build | green | 189147, 492791, 19952, 30940 bytes |
| AC-15 | `hidesToggleWhileLoadingOrFailed` | unit | green | unit.log |
| AC-15 | `playsWhenLateStartSucceeds` | unit | green | unit.log |
| AC-15 | `reportsFailedWhenEverySourceErrors` | unit | green | unit.log |
| AC-15 | `showsPosterOnlyWhileMediaMissing` | probe | green | blocked and SPA fallback: poster only for 6 s; delayed 3 s: poster, then loop and toggle |
| AC-16 | `tintsOvalWithAccentPerTheme` | probe, grep | green | bg = accent, `color` blend, 0.62 light, 0.5 dark |
| AC-17 | `holdsLoopWhenVisitorToggles` | unit | green | unit.log |
| AC-17 | `showsPlayWhenAutoplayRefused` | unit | green | unit.log |
| AC-17 | `clampsToggleInsideInsetEllipse` | unit | green | unit.log |
| AC-17 | `holdsVideoVaporAndLineOnPause` | probe | green | rest, follow, clamp, click, Enter, Space, tap, refused stub, reduced |
| AC-17 | `showsPlayOverPosterWhenSafariRefuses` | manual Safari | pending | Hedi, iPhone low power mode |
| AC-18 | `resumesOnReturnUnlessVisitorPaused` | unit | green | unit.log |
| AC-18 | `keepsVisitorPauseWhenReducedTurnsOff` | unit | green | unit.log |
| AC-18 | `reportsUnwatchableWhenHiddenOrOffscreen` | unit | green | unit.log |
| AC-18 | `notifiesWhenReducedPreferenceChanges` | unit | green | unit.log |
| AC-18 | `pausesOffscreenAndFollowsLiveReducedMotion` | probe | green | scroll, visibilitychange, live reduced, visitor pause kept |
| AC-2, AC-16 | `rendersOvalAndTintInSafariAndFirefox` | manual | pending | Hedi |

## Evidence per criterion

### AC-1, AC-2 - column, stack, oval caps (`probe-layout.mjs`, `layout.json`)

Implementation and mockup measured with the same script, reveals forced
and transitions finished. Light and dark give the same boxes.

```
size       oval (impl)      oval (mockup)    ratio  gaps impl  hint bottom to bar line (impl / mockup)
1440x900   720 x 480        720 x 480        1.5    40/4/48    20 / 20.75
1440x1000  860 x 573.33     860 x 573.33     1.5    40/4/48    23.34 / 24.09
1440x995   860 x 573.33     860 x 573.33     1.5    40/4/48    20.84 / 21.59
901x900    702.77 x 468.5   702.77 x 468.5   1.5    40/4/48    33.56 / 34.31
900x900    828 x 662.39     828 x 662.39     1.25   40/4/48    hero 994.78 / 993.28 tall
390x844    358.8 x 287.03   358.8 x 287.03   1.25   40/4/48    104.3 / 105.05
object-fit cover, object-position 50% 28% everywhere; axis 720 / 720 / 720 / 719.99 at 1440
fonts impl 30 / 20 / 12 px, mockup 30 / 20 / 11 px (D2)
```

The stack under the oval at 1440x900 is 420 px including the 96 px top
padding, so the hero ends at 900 and the hint ends 20 px above the
reserved 56 px bar line. At 900 px wide and below the oval is 92vw with
no height cap, as in the mockup, so the hero is 995 px tall at 900x900
in both.

### AC-3 - loop (`probe-vapor.mjs`, `vapor-1440-motion.json`)

```
1440x900: src hero.webm, duration 4.209, muted true, loop true, playsInline true, controls false
          paused false, 6 wraps in 27 s; currentTime every 0.2 s: ... 3.67 3.89 4.1 0.1 0.31 ...
$ ffprobe dist/hero/hero.webm   stream|index=0|codec_name=vp9|codec_type=video|width=896|height=720   duration=4.209
$ ffprobe dist/hero/hero.mp4    stream|index=0|codec_name=h264|codec_type=video|width=896|height=720  duration=4.208
shasum -a 256: dist and docs/v2/mockup/img copies identical (5c849f9c... webm, c6262406... mp4)
```

### AC-4, AC-5 - releases over six loops (`vapor-1440-motion.json`, `vapor-390-motion.json`)

```
1440: t=2.253 ride (phone) | 2.133 site | 2.129 franceinfo (phone) | 2.133 product | 2.123 geartrack (phone) | 2.140 ride
      at 2.4, 6.5, 10.7, 14.9, 19.1, 23.4 s; never more than one .go; animation hero-emerge
390:  t=2.073 ride | 2.127 site | 2.126 franceinfo | 2.137 product | 2.150 geartrack | 2.124 ride; hero-emerge-narrow
layer: DIV aria-hidden="true", after the video in .media, z-index auto; origin 67.00 % / 51.00 % (1440), 67.00 % / 47.00 % (390)
phones ::after content: none, none, none; 4 images alt="" decoded
```

The release lands between 2.07 and 2.25 s, the `timeupdate` granularity
the plan expected.

### AC-6, AC-7 - reduced and `?motion` (`behavior-reduced.json`, `behavior-motionParam.json`)

```
reduced 1440 light|dark, 390 light|dark (all four identical):
  matchMedia reduce true, data-reduced, video 0, img /hero/hero-poster.webp, vapor nodes 0, buttons 0,
  hint line animation none, transform none, 36 px tall, hero animations 0,
  first commit: oval, name, role, scroll at opacity 1, transform none; transitionrun events 0;
  hero media requested: hero/hero-poster.webp only (no video bytes)
reduced + /?motion: matchMedia reduce true; data-reduced absent; video playing at 2.884;
  RIDE out (hero-emerge running); toggle "Pause"
```

### AC-8 - reveal (`behavior-reveal.json`)

```
first commit: oval, name, role, scroll  opacity 0, transform matrix(1, 0, 0, 1, 0, 24)
after 2 s:    opacity 1, transform none, duration 0.8s, delays 0 / 0.1 / 0.2 / 0.3 s, ease cubic-bezier(0.16, 1, 0.3, 1)
scroll to 3000 then back to 0: transitionrun events 0, data-in kept on 4
900x900: hint starts at y 908.8 (below the fold), data-in absent, opacity 0; after a 300 px scroll: data-in, opacity 1
```

### AC-9, AC-13 - locale and structure (`behavior-locale.json`)

```
fr playing: role "Consultant iOS senior, freelance", hint "Défiler", video "Portrait animé de Hedi Jahouach, ...",
            toggle "Pause", product "Compagnon de réunion", lang fr, h1 1
fr paused:  toggle "Lecture"
EN clicked in the nav (paused): lang en, role "Senior iOS consultant, freelance", hint "Scroll",
            video "Animated portrait of Hedi Jahouach, a silhouette turning and breathing out vapor",
            toggle "Play", product "Meeting companion"
en playing: toggle "Pause"
reduced fr / en: poster alt equals videoLabel in each locale, no toggle, no product node
h1: count 1, contains .name and .role, section aria-labelledby = h1 id (layout probe)
```

### AC-10

Grep empty (Static checks). Hero DOM: `heroHtmlHasBenj false`,
`heroHtmlHasWara false` in all 12 layout contexts; `identity.name` is
"Hedi Jahouach" (`content.ts:14`).

### AC-11 - hint (`behavior-hint.json`)

```
target: href "#apropos", #apropos exists, and it is the hero's next sibling
click, motion:   hash #apropos, #apropos top 0, scrollY 900
Enter, motion:   hash #apropos, top 0, scrollY 900
click, reduced:  same;  Enter, reduced: same
```

### AC-12 - keyboard, axe, contrast (`a11y.json`, `ringpx.mjs`)

```
Tab order 1440: HB home link, 6 nav links, theme, FR, EN, Me contacter, button.play[Pause], a.scroll[Défiler]
Tab order 390:  HB home link, theme, FR, EN, Menu, button.play[Pause], a.scroll[Défiler]
toggle :focus-visible true; ::before box-shadow: inset, 0 0 0 2px rgb(230,235,244) (gap), 0 0 0 4px focus ring
hint   :focus-visible true; box-shadow 0 0 0 2px focus ring; outline none
axe 4.12.1 on section.hero, 1440 and 390, light and dark, playing; 1440 reduced light and dark:
  violations 0 in all 6; incomplete: video-caption on the playing video (4 contexts)
contrast from computed colors (WCAG formula):
  light: name 14.25, role 5.35, hint 5.35, glyph on disc 14.25
  dark:  name 17.39, role 6.06, hint 6.06, glyph on disc 14.25
toggle pixels around the resting focused toggle (spec 008 method):
  disc vs surround min 17.24 (1440) / 17.25 (390); gap vs outside min 5.31 light, 5.73 dark;
  ring vs gap median 6.42 light, 5.62 dark (008 recorded 6.43 and 5.63)
```

The axe `video-caption` item is "needs review": the clip has no audio
stream (ffprobe), so there is nothing to caption. The hint focus ring
in light theme reads 1.3:1 against the page; see Findings.

Hedi's own keyboard pass is pending. Focus shots:
`t25/focus-toggle-{1440,390}-{light,dark}.png`,
`t25/focus-hint-{1440,390}-{light,dark}.png`.

### AC-14 - media bytes

```
$ stat -f "%z %N" dist/hero/* dist/hero/vapor/* docs/v2/mockup/img/{hero.webm,hero.mp4,hero-poster.jpg,site.jpg}
189147 dist/hero/hero.webm          <= 189147 mockup
492791 dist/hero/hero.mp4           <= 492791 mockup
 19952 dist/hero/hero-poster.webp   <  22374 mockup JPEG
 30940 dist/hero/vapor/site.webp    <  31967 mockup JPEG
 55708 ride.webp, 59512 franceinfo.webp, 20470 geartrack.webp (copied as is)
```

### AC-15 - missing or late media (`behavior-media.json`)

```
both sources blocked (Network.setBlockedURLs), every 0.5 s for 6 s:
  video paused@0 readyState 0 networkState 3 (NO_SOURCE), toggle hidden, no vapor, held absent
  visible hero text: name, role, "DÉFILER" only (plus the aria-hidden product label); no progressbar, no aria-busy
  capture vs the reduced capture: 35 of 1111680 pixels over 32 (the moving hint line)
both sources answered 200 text/html (wrangler's SPA fallback): same as blocked for 6 s
both sources delayed 3 s:
  0.1 s to 3.1 s: readyState 0 or 1, toggle hidden, no vapor
  3.6 s: playing@0.436, toggle "Pause"; 5.6 s: playing@2.446, RIDE out; 7.6 s: wrapped to 0.241
```

### AC-16 - tint

```
hero.css:157-165  .tint { background: var(--ws-color-accent); mix-blend-mode: color; opacity: var(--hero-tint) }
                  [data-theme="dark"] .hero .tint { opacity: var(--hero-tint-dark) }
computed light: background rgb(13, 81, 140) = accent rgb(13, 81, 140), blend color, opacity 0.62
computed dark:  background rgb(110, 199, 242) = accent rgb(110, 199, 242), blend color, opacity 0.5
```

### AC-17 - toggle (`behavior-toggle.json`)

```
rest: label Pause, 44 x 44, 16 px above the oval bottom, centered (dx 0)
follow: cursor (612, 316), toggle center (612, 316)
extremes, cursor 2 px inside the oval box (inset ellipse value 1 = on the 26 px inset ellipse):
  left (386, 364) 1.0000 | right (1054, 364) 1.0000 | top (720, 150) 1.0000 | bottom (720, 578) 1.0000
  disc + gap + ring circle (r 20) max 0.967 inside the oval; 44 px target (r 22) max 0.978
leave the oval: back to rest, inline style removed
click inside the oval while "site" was mid-flight, then 600 ms:
  video paused@2.454 both samples; site emerge paused at 350 ms both; hint line paused at 6750 both;
  data-held true, toggle "Lecture" with the play glyph
click again: playing, emerge 433 -> 1033 ms, line 6833 -> 7433 ms in 600 ms, toggle "Pause"
Enter on the focused toggle: Lecture, paused, held; Space: Pause, playing
390 touch tap inside the oval: Lecture, paused, held, toggle stayed at rest (gap 16, dx -0.01); tap again: playing
play() stubbed to reject NotAllowedError, light and dark:
  held true, video paused@0, played ranges 0 (poster), toggle "Lecture" at rest (gap 16), no vapor, 1 play() call
  stub lifted, click on the toggle: playing@1.003, toggle "Pause"
reduced: no button in the hero (AC-6 probe)
```

Captures: `t25/toggle-paused-1440.png`, `t25/toggle-refused-light.png`,
`t25/toggle-refused-dark.png`. Neither state has an exported PNG; both
follow the README description (poster with play; held frame with play).

### AC-18 - watchable and live reduced (`behavior-watch.json`)

```
scroll 200 px past the hero: paused@1.389; back to top: playing@2.182
visibilityState stubbed hidden + visibilitychange: paused@2.183; restored: playing@2.986
visitor pause, then scroll out and back: paused@3.005, Lecture; then hidden and visible: paused@3.005, Lecture
visitor play: playing@3.609
live reduced on (Emulation.setEmulatedMedia): poster img, no video, toggle hidden, data-reduced
live reduced off: playing@0.968, toggle Pause; next release at t 2.13 (site.webp)
visitor pause, reduced on, reduced off: video paused@0, played ranges 0 (poster), toggle "Lecture", held
then play: playing@0.802, Pause
```

## Screens

Captured with `probe-screens.mjs` at 1440x900 DPR 1 and 390x844 DPR 2
(`mobile: true`), frozen as `docs/v2/export-screens.mjs` does: playing
captures wait for the first release (RIDE), then video at 3.56 s, RIDE
`hero-emerge` at 1512 ms, hint line at 1100 ms, reveal transitions
finished. Compared with `compare.mjs`: nav band (top 72 css px) and bar
band (bottom 56 css px) masked; a pixel differs when a channel moves by
more than 32. Side-by-side strips (mockup | site | diff):
`t25/side-<name>.png` and `t25/side-<name>-dy-1.png`.

```
                               as captured            impl moved up 1 css px
name                           over    over %          over   oval  name  role  hint
01-hero                        9028    0.812           248     18     0     0   230
01-hero-dark                   8706    0.783           224      0     0     0   224
01-hero-mobile                16989    1.521          4127     49     0  3025  1053
01-hero-mobile-dark           16415    1.470          3997      0     0  2968  1029
01-hero-reduced                6037    0.543           230      0     0     0   230
01-hero-reduced-dark           5629    0.506           224      0     0     0   224
01-hero-reduced-mobile        10332    0.925          4078      0     0  3025  1053
01-hero-reduced-mobile-dark    9673    0.866          3997      0     0  2968  1029
```

Differences and their cause:

- Whole column 0.75 css px higher (name y 519.31 vs 520.06 at 390):
  the hint text is 12 px, not 11 px, so the stack is 1.5 px taller and
  the centered column moves up by half. Accepted deviation D2
  (`docs/v2/README.md` Known mockup details). `shift.mjs` on 01-hero:
  RIDE phone, name, role, hint and oval rim each match at dy -1 with a
  mean delta of 0 to 0.08.
- Hint label glyphs: 12 px vs 11 px, D2.
- Role at DPR 2 (about 3000 pixels): the 0.75 css px shift is 1.5
  device px, so the role lands one device pixel off where the name lands
  two; `shift.mjs` on the mobile role matches at -1 device px with 0
  pixels over. Rounding of the D2 shift, nothing else.
- Reduced captures: the WebP poster (D5) leaves 0 pixels over in the
  oval against the mockup's JPEG.
- Masked, out of scope: v1 nav ("HB" initials, links, 72 px tall) and
  the bottom bar the mockup shows.
- Not in any PNG: the `site` vapor object (README known detail, v2
  Projects capture), paused and refused states (README description;
  captures above).

No difference is a bug or a spec gap.

## Findings for Hedi

1. Hint focus ring contrast in light: `--ws-color-focus-ring` is
   `#41c0f273` (45 % alpha) in light and `#41c0f280` in dark. On the hint,
   which sits on the page background, the painted ring is rgb(156, 216,
   243) on rgb(230, 235, 244): 1.3:1 in light, 3.11:1 in dark. WCAG 1.4.11
   asks 3:1 for a focus indicator. AC-12 and its plan method list name,
   role, hint text and the toggle disc and gap, all of which pass. The
   ring is visible and is the SDK token, so this is not marked red here.
   It is an SDK question for ds-agent; the same token draws the contact
   form rings. Hedi decides whether it blocks.
2. Local `wrangler dev` ignores `Range` (200, full body). Chrome plays and
   loops anyway. Safari usually needs 206 to play MP4, so the pending
   Safari row should run against Cloudflare (a preview deploy or
   production), not local wrangler, or it may fail for a reason that
   does not exist in production. Not verified here.
3. After reduced motion goes on then off, the next object continues the
   sequence (site after RIDE) instead of restarting from RIDE: the
   release counter survives the remount. This fits AC-4's cycle; noted
   in case Hedi expected a restart.
4. Node 26.13.1 ran these checks; `.nvmrc` and AGENTS.md say Node 22.
   Tests and build pass on 26; not re-run on 22.

## Not verified

- `rendersOvalAndTintInSafariAndFirefox` (AC-2, AC-16): manual, Hedi.
- `showsPlayOverPosterWhenSafariRefuses` (AC-17): manual, Hedi, iPhone
  in low power mode. The refused path is proven in Chrome with a stubbed
  `play()`.
- Hedi's keyboard pass on AC-12: the scripted pass is green above.
- Eco mode: the product has none.
- Real tab switching: `visibilityState` was stubbed on `document`, as
  the plan allows; `Page.setWebLifecycleState` was not used.
