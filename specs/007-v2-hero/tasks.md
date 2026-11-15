# Tasks 007 - v2 hero

Plan: `plan.md` (deca53d; one gate BLOCKED: the four SDK tokens of D1) |
Branch: `feat-v2-hero` off `dev`

Each task: one logical change, one commit `[feat-v2-hero]: ...`, one
check whose output the agent shows. Order follows rule 10: content, pure
unit, service, section, reduced motion, mockup; wiring last before verify.
Test-coder tasks sit right after the unit they test (ADR 001: Vitest,
node environment, doubles, no component tests).

Status tags:
- `now`: reads none of the four requested tokens; can run today.
- `BLOCKED (tokens)`: writes or depends on `hero.css`, which reads
  `--ws-motion-reveal`, `--ws-ease-emphasized`,
  `--ws-motion-stagger`, `--ws-track-label`. Prerequisite, a separate
  change and not a task here: WaraDS-Web publishes the tokens (ds-agent
  request, plan table), then an SDK upgrade change on `dev`, like spec
  006, pins `@warastudio/theme` and `@warastudio/react` exactly to that
  version (ADR 003) with its build and visual check; `feat-v2-hero` is
  rebased on it before T19. `hero.css` uses the shipped names.

Parallelism: `[P]` marks tasks that share no file and wait for no other
task. This change runs in one worktree on one branch, so two agents would
race on the index and the commit order; parallel runs are not worth it
here. The tags say what could move if a second worktree were opened.

Line counts are estimates of added or changed lines, deletions apart.

## Tasks

Content
- [ ] T01 `identity.name` to "Hedi Jahouach"; `VaporObject` type and the
  `heroV2` entries of the plan (next, hint, videoLabel, productLabel,
  toggle, media, vapor in the AC-4 order) - files:
  `src/content/content.ts` - check: `npm run build`; `grep -n
  "Benjahouach" src/content/content.ts` empty; `grep -c "heroV2"
  src/content/content.ts` is 1 - about 30 lines - agent: developer - now
- [ ] T02 [P] media: copy `hero.webm`, `hero.mp4`, `RIDE.webp`,
  `FranceInfos.webp`, `GearTrack.webp` from `docs/v2/mockup/img/` under
  kebab-case names; `cwebp` the poster and the site capture, quality
  noted in the commit body, each under its JPEG bytes (D5) - files:
  `public/hero/hero.webm`, `public/hero/hero.mp4`,
  `public/hero/hero-poster.webp`, `public/hero/vapor/ride.webp`,
  `franceinfo.webp`, `geartrack.webp`, `site.webp` - check: `shasum -a
  256` of the five copies equals their mockup file; `ls -l`:
  `hero-poster.webp` < 22 374 B, `site.webp` < 31 967 B; `git check-attr
  filter public/hero/hero.webm` reads `unspecified` (plain git, ADR 004);
  the two WebP shown beside their JPEG at 1:1 - binary only - agent:
  developer - now

Pure units
- [ ] T03 [P] `vaporSchedule`: `VAPOR_RELEASE_AT_S`, `VAPOR_REARM_BELOW_S`,
  `VaporClock`, `tickVapor` - files: `src/sections/hero/vaporSchedule.ts`
  - check: `npm run build` - about 20 lines - agent: developer - now
- [ ] T04 tests of T03, test plan rows AC-4 (unit) - files:
  `src/sections/hero/vaporSchedule.test.ts` - check: `npx vitest run
  src/sections/hero/vaporSchedule.test.ts` - agent: test-coder - now
- [ ] T05 [P] `heroPlayback`: types, reducer, `heroView` (shouldPlay,
  toggle hidden while loading and failed per D4, held, visitor pause kept
  when reduced turns off) - files: `src/sections/hero/heroPlayback.ts` -
  check: `npm run build` - about 45 lines, one reducer kept whole -
  agent: developer - now
- [ ] T06 tests of T05, rows AC-6, AC-15, AC-17, AC-18 (unit on
  heroPlayback) - files: `src/sections/hero/heroPlayback.test.ts` - check:
  `npx vitest run src/sections/hero/heroPlayback.test.ts` - agent:
  test-coder - now
- [ ] T07 [P] `ovalGeometry`: `TOGGLE_INSET_PX`, `clampToOval` (D3) -
  files: `src/sections/hero/ovalGeometry.ts` - check: `npm run build` -
  about 15 lines - agent: developer - now
- [ ] T08 tests of T07, rows AC-17 (unit on ovalGeometry) - files:
  `src/sections/hero/ovalGeometry.test.ts` - check: `npx vitest run
  src/sections/hero/ovalGeometry.test.ts` - agent: test-coder - now

Services
- [ ] T09 [P] `MotionPreference` interface and its matchMedia adapter
  (`change` listener, `?motion` override read from `location.search`) -
  files: `src/services/motionPreference.ts`,
  `src/services/mediaQueryMotionPreference.ts` - check: `npm run build`;
  `grep -rln "matchMedia\|location" src/services src/sections` lists
  only the adapter - about 30 lines - agent: developer - now
- [ ] T10 tests of T09 with `matchMedia` and `location` doubles, rows
  AC-7, AC-18 (unit on the adapter) - files:
  `src/services/mediaQueryMotionPreference.test.ts` - check: `npx vitest
  run src/services/mediaQueryMotionPreference.test.ts` - agent:
  test-coder - now
- [ ] T11 [P] `VideoClock` interface, `PlayOutcome`, `CreateVideoClock` -
  files: `src/services/videoClock.ts` - check: `npm run build` - about 15
  lines - agent: developer - now
- [ ] T12 `htmlVideoClock` adapter: `muted` set before `play()`,
  rejection mapping, `timeupdate`, capture-phase source `error` with
  `NETWORK_NO_SOURCE`, watchable from an `IntersectionObserver` and
  `visibilitychange`, injectable `env` - files:
  `src/services/htmlVideoClock.ts` - check: `npm run build`; `grep -rln
  "IntersectionObserver\|visibilityState" src/services src/sections`
  lists only this file - about 50 lines, split only if it passes 60 -
  agent: developer - now
- [ ] T13 tests of T12 with a video, document and observer double, rows
  AC-15, AC-18 (unit on the adapter) - files:
  `src/services/htmlVideoClock.test.ts` - check: `npx vitest run
  src/services/htmlVideoClock.test.ts` - agent: test-coder - now
- [ ] T14 service context: `Services`, `ServiceProvider`, `useServices`;
  the `// shortcut:` line on `useReduce` (D7: read once, legacy only,
  upgrade when `components/` empties) - files:
  `src/app/ServiceContext.tsx`, `src/app/useReduce.ts` - check: `npm run
  build`; `npm test` - about 25 lines - agent: developer - now

Section (built unmounted: `App.tsx` keeps the v1 hero until T23)
- [ ] T15 `Hero.tsx` shell: `section id="top"` labelled by the `h1`; oval
  with the video (sources, poster, `aria-label`), tint and halo; `h1` with
  name and role spans; hint link to `#${heroV2.next}`; per-element
  `useInView` (once) setting `data-in` - files:
  `src/sections/hero/Hero.tsx` - check: `npm run build`; AC-9 grep (test
  plan) empty - about 40 lines - agent: developer - now
- [ ] T16 playback in the section: `useServices`, `createVideoClock` on
  the video ref, `useReducer(heroPlayback)`, live `reduced` through
  `useSyncExternalStore`, play and pause from `heroView`, failed and
  watchable subscriptions, `data-held` on the root - files:
  `src/sections/hero/Hero.tsx` - check: `npm run build`; `npm test` -
  about 40 lines - agent: developer - now
- [ ] T17 vapor layer: markup from `heroV2.vapor` (`aria-hidden`, images
  `alt=""`, product label from content), `tickVapor` on `onTime`, the
  released object re-keyed to restart `emerge` - files:
  `src/sections/hero/Hero.tsx` - check: `npm run build`; AC-9 grep empty -
  about 35 lines - agent: developer - now
- [ ] T18 toggle: native `button` rendered from `heroView().toggle`,
  Lucide `Play` / `Pause` at stroke 1.5, labels from content, one
  `onClick` on the oval (`play()` in the click stack after a refusal),
  mouse-only `pointermove` through `clampToOval`, `pointerleave` reset -
  files: `src/sections/hero/Hero.tsx` - check: `npm run build`; AC-9 grep
  empty - about 35 lines - agent: developer - now
- [ ] T19 `hero.css` part 1 and its import: hero column, oval box with
  the 56 px bar reserved, media, tint, halo, name, role, hint at
  `--ws-size-micro` (D2), hint line, focus ring, reveal on `data-in`,
  mobile rules; composition values named at the top with a comment each
  - files: `src/sections/hero/hero.css`, `src/sections/hero/Hero.tsx`
  (import) - check: `npm run build`; `npx vitest run
  src/sdkTokens.test.ts`; `grep -nE "#[0-9a-fA-F]{3,8}\b"
  src/sections/hero/hero.css` empty - about 40 lines - agent: developer -
  BLOCKED (tokens)
- [ ] T20 `hero.css` part 2: vapor objects without notch, `emerge`
  keyframes desktop and mobile, toggle disc, glyph, glide, focus gap and
  ring, `data-held` pausing `.out.go` and the hint line - files:
  `src/sections/hero/hero.css` - check: `npm run build`; `npx vitest run
  src/sdkTokens.test.ts`; hex grep empty - about 40 lines - agent:
  developer - BLOCKED (tokens)

Reduced motion
- [ ] T21 reduced path: `<img>` poster with the video label as `alt`
  instead of the video, no vapor layer, no toggle, `data-reduced` on the
  root; `hero.css` drops animations and transitions under `data-reduced`,
  reveal elements shown, hint line static (no `@media` query, so
  `?motion` works) - files: `src/sections/hero/Hero.tsx`,
  `src/sections/hero/hero.css` - check: `npm run build`; `npm test`;
  `grep -n "prefers-reduced-motion" src/sections/hero/hero.css` empty -
  about 25 lines - agent: developer - BLOCKED (tokens, edits `hero.css`)

Mockup
- [ ] T22 [P] README known details for the two deviations Hedi decided:
  the hint label at 12 px against 11 px in the PNGs (D2), the toggle
  clamped 26 px inside the ellipse (D3); one dated decision-log entry for
  both - files: `docs/v2/README.md` (Known mockup details),
  `docs/v2/decision-log.md` - check: `grep -n "26 px\|12 px"
  docs/v2/README.md` shows both lines; sums block untouched (`sed -n
  '/^```sha256$/,/^```$/p' docs/v2/README.md | sed '1d;$d' | (cd docs/v2
  && shasum -a 256 -c)` passes) - agent: design-agent - now

Wiring, approved separately
- [ ] T23 composition root: `main.tsx` wraps `App` in `ServiceProvider`
  with `createMediaQueryMotionPreference(window)` and
  `createHtmlVideoClock`; `App.tsx` renders `sections/hero/Hero`;
  `components/Hero.tsx` and the v1 hero block of `src/index.css`
  l.185-255 deleted in the same commit, dead once the import goes (D6) -
  files: `src/main.tsx`, `src/App.tsx`, `src/components/Hero.tsx`
  (deleted), `src/index.css` - check: `npm run build`; `npm test`;
  `grep -rn "ws-kenburns\|ws-aurora\|ws-grain\|ws-bar-\|ws-hero-reveal"
  src` empty; `vite preview` at 1440 x 900 and 390 x 844, light and dark,
  motion and reduced, screenshots beside the eight `01-hero*.png` -
  about 12 lines added, about 380 deleted - approved separately - agent:
  developer - BLOCKED (after T19 to T21)
- [ ] T24 remove the v1 hero media, own commit (D6); it waits for T23
  because `components/Hero.tsx` reads them until then - files:
  `public/hero/hero-1.mp4`, `public/hero/hero-1.jpg` (deleted) - check:
  `grep -rn "hero-1" src index.html` empty; `npm run build`; `ls
  dist/hero` lists no `hero-1` - agent: developer - BLOCKED (after T23)

Close
- [ ] T25 verify - every row of the test plan green, side by side of the
  eight PNGs, axe both themes, keyboard pass, Safari and Firefox rows
  with Hedi - files: `specs/007-v2-hero/verification.md` - agent: qa -
  BLOCKED (after T24)
- [ ] T26 review - diff against `dev`, gates reread (tokens gate OPEN by
  then), rule 10 signals (effect API outside `services/`, section
  importing a section, import in `content.ts`, literal timing outside the
  named composition values); once APPROVED the main session sets
  `spec.md` to done and checks the roadmap line - agent: review-agent -
  BLOCKED (after T25)

## Test plan (derived from the EARS criteria)

Types: unit = Vitest node on the named unit or adapter with doubles;
probe = qa over CDP on `vite preview` (the plan's shared tooling); PNG =
side by side against `docs/v2/ecrans/`; grep and build = shell output;
manual = a person, named. Unit rows land in T04, T06, T08, T10, T13; the
others in T25.

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | the playing hero at 1440 and 390, light and dark, beside its PNG, nav and bar bands masked | PNG, qa | `matchesPlayingPngsSideBySide` |
| AC-1 | oval, name, role and hint centered on one axis, gaps 40 / 4 / 48 px | probe, qa | `stacksNameRoleHintUnderOvalOnAxis` |
| AC-2 | 1440 x 900 with the 56 px bar reserved gives a 720 px oval; 1440 x 1000 gives 860 px | probe, qa | `capsOvalWidthByViewportWithBarReserved` |
| AC-2 | at 900 and 390 the oval is 92vw at 1.25/1, video cropped at 50 % 28 % | probe, qa | `switchesToNarrowRatioAt900` |
| AC-3 | the clip plays muted, inline, looping, no controls, wraps after 4.21 s | probe, qa | `loopsMutedInlineWithoutControls` |
| AC-3 | the shipped webm and mp4 carry no audio stream | build, `ffprobe`, qa | `shipsVideoWithoutAudioStream` |
| AC-4 | t crosses 2.05 s once in a loop: one release | unit, `vaporSchedule` | `releasesOnceWhenLoopReachesExhale` |
| AC-4 | no release again until t drops below 1 s | unit, `vaporSchedule` | `rearmsOnlyAfterLoopRestarts` |
| AC-4 | six releases follow RIDE, site, franceinfo, product, GearTrack, RIDE | unit, `vaporSchedule` | `cyclesObjectsFromRide` |
| AC-4 | in the page over six loops, same order, origin at 67 % / 51 % (47 % at 390) | probe, qa | `releasesObjectsFromMouthInOrder` |
| AC-5 | vapor layer is HTML above the video, `aria-hidden`, phones without notch | probe and grep, qa | `hidesVaporLayerWithoutNotch` |
| AC-6 | reduced on: no play, toggle hidden | unit, `heroPlayback` | `stopsPlayAndHidesToggleWhenReduced` |
| AC-6 | reduced emulated: `img` poster, no video, no vapor, static line, all shown | probe, qa | `showsStaticPosterUnderReducedMotion` |
| AC-6 | the reduced hero beside the four reduced PNGs | PNG, qa | `matchesReducedPngsSideBySide` |
| AC-7 | `?motion` in the URL reports motion allowed under reduced | unit, `mediaQueryMotionPreference` | `allowsMotionWhenUrlCarriesMotion` |
| AC-7 | reduced emulated plus `?motion`: loop, vapor and toggle | probe, qa | `playsLoopUnderReducedWithMotionParam` |
| AC-8 | first entry fades in and rises 24 px (`--ws-space-24`) over 0.8 s, never replays | probe, qa | `revealsOnceOnFirstEntry` |
| AC-9 | hero source holds no literal copy in JSX text, `aria-label` or `alt` | grep, qa | `findsNoLiteralCopyInHeroSource` |
| AC-9 | switching to EN changes every hero text and label | probe, qa | `switchesEveryHeroLabelWithLocale` |
| AC-10 | no "Benjahouach" or "Wara" in the hero code or DOM, name reads "Hedi Jahouach" | grep and probe, qa | `showsJahouachWithoutWaraInHero` |
| AC-11 | click and Enter on the hint land on `#apropos`, an id present in the DOM | probe, qa | `landsOnNextSectionWhenHintActivated` |
| AC-12 | Tab reaches toggle then hint, 2 px ring visible on both | manual keyboard, qa then Hedi | `reachesToggleThenHintWithVisibleRing` |
| AC-12 | axe on the hero, light and dark, 1440 and 390, contrast of name, role, hint, disc | axe, qa | `passesAxeAndContrastInBothThemes` |
| AC-13 | one `h1` on the page, holding name and role; video named from content | probe, qa | `wrapsNameAndRoleInOnlyH1` |
| AC-14 | built media no heavier than the mockup files | build, `ls -l`, qa | `staysUnderMockupMediaBytes` |
| AC-15 | loading and failed: no play started by the view, toggle hidden | unit, `heroPlayback` | `hidesToggleWhileLoadingOrFailed` |
| AC-15 | a late start from loading moves to playing | unit, `heroPlayback` | `playsWhenLateStartSucceeds` |
| AC-15 | every source erroring reports failed; rejections map to refused, interrupted, failed | unit, `htmlVideoClock` | `reportsFailedWhenEverySourceErrors` |
| AC-15 | both sources blocked: poster only; 3 s delay: poster, then loop and toggle | probe, qa | `showsPosterOnlyWhileMediaMissing` |
| AC-16 | tint layer is the accent token in `color` blend at 0.62 light, 0.5 dark | probe and grep, qa | `tintsOvalWithAccentPerTheme` |
| AC-17 | toggled while playing: paused and held; toggled again: playing | unit, `heroPlayback` | `holdsLoopWhenVisitorToggles` |
| AC-17 | autoplay refused: toggle on play, held | unit, `heroPlayback` | `showsPlayWhenAutoplayRefused` |
| AC-17 | a point inside the inset ellipse stays; one outside lands on it | unit, `ovalGeometry` | `clampsToggleInsideInsetEllipse` |
| AC-17 | rest, follow, click and tap anywhere hold video, vapor and line; Enter; refused stub; no toggle when reduced | probe, qa | `holdsVideoVaporAndLineOnPause` |
| AC-17 | Safari on iPhone in low power mode refuses autoplay and shows play over the poster | manual Safari, Hedi | `showsPlayOverPosterWhenSafariRefuses` |
| AC-18 | off screen or hidden tab pauses, return resumes unless the visitor paused | unit, `heroPlayback` | `resumesOnReturnUnlessVisitorPaused` |
| AC-18 | reduced on then off restarts the loop, and keeps a visitor pause | unit, `heroPlayback` | `keepsVisitorPauseWhenReducedTurnsOff` |
| AC-18 | observer out of view or document hidden reports unwatchable | unit, `htmlVideoClock` | `reportsUnwatchableWhenHiddenOrOffscreen` |
| AC-18 | a media query change notifies subscribers | unit, `mediaQueryMotionPreference` | `notifiesWhenReducedPreferenceChanges` |
| AC-18 | scroll out and back, stubbed `visibilitychange`, live reduced on and off | probe, qa | `pausesOffscreenAndFollowsLiveReducedMotion` |
| AC-2, AC-16 | oval, `svh` cap and sky tint in Safari and Firefox, both themes | manual, Hedi | `rendersOvalAndTintInSafariAndFirefox` |

Every AC has at least one row; none goes back to `/clarify`.

## Done when

- All boxes checked, each with its commit on the branch.
- qa report attached (build, tests, scenarios, screenshots).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done, roadmap line checked: "A visitor sees
  the hero" in `product/roadmap.md` (l.17).
