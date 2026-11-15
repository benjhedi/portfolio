# Tasks 008 - v2 hero mockup, sky

Plan: `plan.md` (all gates OPEN) | Branch: `feat-hero-mockup-sky`, stacked on `feat-hero-spec`, merged after it

Mockup only: the architecture rule covers `src/`, so the order is the
change proven in a scratch copy, the publish at the source, the refreeze,
the export check, the export, then the lines that name the version, as in
spec 005. T01 and T02 change no repo file, so they have no commit. No
`[P]`: each task needs the previous one. Diffs run against
`feat-hero-spec` until it merges, then `origin/dev`.

## Tasks

- [x] T01 the tint, toggle, notch and role edits of the plan's technical
  approach in a scratch copy of `docs/v2/mockup/index.html`, wrapper kept,
  plus the export check in a scratch copy of `docs/v2/export-screens.mjs`;
  rewrite the box and pixel diff tools spec 005 lost - files: scratchpad
  only - check: probe outputs for AC-1 to AC-4 at 1440x900 and 390x844
  `mobile: true`, light and dark, motion and reduced; before (current
  script, frozen copy, twice for the floor) and after (scratch script,
  edited copy) exports, box diff empty outside the hero; scratch shots of
  the paused and autoplay-refused states - agent: design-agent
- [x] T02 publish the edited `index.html` to artifact BDrsQCHWzgfQRLqBGn9FJM
  without the host wrapper, after Hedi's explicit go, then read it back -
  files: none in the repo - check: new version id; read-back sha256 of
  `index.html` equals the T01 file; the 15 other sums unchanged; a
  mismatch stops and diffs before any second publish - agent: main session
- [x] T03 refreeze: the read-back `index.html` into `docs/v2/mockup/`, the
  README sums block updated - files: `docs/v2/mockup/index.html`,
  `docs/v2/README.md` (sums block) - check: sums check from `docs/v2/`
  passes; `git diff --stat feat-hero-spec -- docs/v2/mockup` lists
  `index.html` only - agent: main session
- [x] T04 the toggle drift check in the export script (`pageState`,
  `drift`, `flags`) - files: `docs/v2/export-screens.mjs` - check: export
  to a scratch folder exits 0 with the toggle logged on "Pause"; a scratch
  copy of the mockup whose toggle starts on play makes it exit 1 - agent:
  design-agent
- [x] T05 export to a scratch folder, copy the 8 hero PNGs only - files:
  `docs/v2/ecrans/01-hero*.png` (8) - check: the run's non-hero PNGs
  equal their committed copies (0 px on `00-preloader*` and
  `02-statement*`), as T01 saw text render in two states run by run;
  else export again; `git diff --stat feat-hero-spec -- docs/v2/ecrans`
  lists the 8 hero PNGs only, as LFS pointers; png block still 52 names
  - agent: main session
- [x] T06 the new version named where the old one stood, and the hero
  section updated (tint, toggle, role, no notch, the paused and
  autoplay-refused sentence; the notch known detail closed) - files:
  `docs/v2/README.md`, `docs/v2/decision-log.md`, `product/tech-stack.md`,
  `product/mission.md` - check: `git grep -n 1794266082-62e1` returns only
  intended history lines; the new version found in the four files - agent:
  design-agent
- [x] T07 verify - all AC checks below green, `npm ci` first - files:
  `specs/008-v2-hero-mockup-sky/verification.md` - agent: qa
- [x] T08 review - diff against `feat-hero-spec`, gates reread; once
  APPROVED the main session sets `spec.md` status to done - agent:
  review-agent

## Test plan (derived from the EARS criteria)

Probe, image and build checks run by qa, output in `verification.md`;
none is a committed test (ADR 001: Vitest is for TypeScript units). The
export drift check of T04 is the one lasting guard.

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | video, `.tint`, `.vapor` in that order; blend `color`, accent background, opacity 0.62 light and 0.5 dark; backlight sample turns sky, pixels outside the oval at the floor; poster tinted under reduced | CDP probe, PNG | `retintsOvalWithAccentDuotone` |
| AC-2 | `.hero .role` reads "Consultant iOS senior, freelance"; the old string gone | CDP probe, grep | `showsConsultantRoleLine` |
| AC-3 | toggle 44 x 44 with a 32 px disc at the bottom center, "Pause"; follows the mouse over the oval, back at rest on leave; a click pauses on the current frame (video and `emerge` held, no poster), a second plays; Tab and Enter work with the ring; autoplay refused shows play over the poster; hidden under reduced | CDP probe, keyboard | `togglesLoopFromOval` |
| AC-4 | `::after` content `none` on the vapor phones, kept on the work phones; RIDE whole in the PNGs | CDP probe, PNG | `dropsNotchOnVaporPhones` |
| AC-5 | before vs after: boxes change only in the hero rows, heights equal, other sections 0 boxes | export twice, box diff | `changesOnlyTheHero` |
| AC-6 | read-back sums match; new version named in four files; export exit 0 and negative control exit 1; png block 52; `npm test` and `npm run build` pass | shasum, grep, export, npm | `refreezesNewArtifactVersion` |

## Done when

- All boxes checked, each with its commit on the branch (T01 and T02
  have none).
- qa report attached (probe outputs, box diff, before and after PNGs).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done; spec 007 resumes at `/plan`.
