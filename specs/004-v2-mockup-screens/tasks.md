# Tasks 004 - v2 mockup screens

Plan: `plan.md` (all gates OPEN) | Branch: `docs-v2-mockup-screens` off `dev`

Documents and one capture script: the architecture rule covers `src/`, so
the order is storage first (no PNG may land before the LFS rule), then the
list the script reads, the script, the export, the descriptions, the
pointers. No `[P]`: each task needs the previous one.

## Tasks

- [x] T01 LFS rule for docs PNGs, ADR 004 amendment, docs that said
  "videos" - files: `.gitattributes`, `docs/adr/004-git-lfs-reference-media.md`,
  `CONTRIBUTING.md`, `product/tech-stack.md` - check: `git check-attr
  filter` gives `lfs` on `docs/v2/ecrans/01-hero.png`, `unspecified` on
  `public/projects/FranceInfos.png` - agent: setup-agent
- [x] T02 README png block (52 names, page then variant order, count) and
  the export procedure - files: `docs/v2/README.md` - check: block
  extracted with the `sed` idiom gives 52 unique lines, prefixes 00 to 11
  in order - agent: design-agent
- [x] T03 export script, CDP over global `WebSocket`, no dependency -
  files: `docs/v2/export-screens.mjs` - check: run into a scratch folder,
  stdout logs the frozen flags per context, exit 0; tile stitch run on
  `04-projects-mobile` - agent: design-agent
- [x] T04 the 52 PNGs - files: `docs/v2/ecrans/*.png` - check: `ls | wc
  -l` is 52, `diff` against the README block empty, `git lfs ls-files`
  lists them, design-agent opens every PNG - agent: design-agent
- [ ] T05 one README section per screen (purpose, layout, states,
  interaction, reduced motion), the 8 px hint overlap and the
  reconstructed preloader noted - files: `docs/v2/README.md` - check: 12
  `### NN` sections, each with the five labels - agent: design-agent
- [ ] T06 pointers: wave 0 line checked, AGENTS.md line on the PNGs -
  files: `product/roadmap.md`, `AGENTS.md` - check: grep `[x] Wave 0: the
  v2 log`, AGENTS.md under 60 lines - agent: main session
- [ ] T07 verify - all AC checks below green, `npm ci` first - files:
  `specs/004-v2-mockup-screens/verification.md` - agent: qa
- [ ] T08 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` status to done - agent: review-agent

## Test plan (derived from the EARS criteria)

Shell, image and build checks run by qa, output in `verification.md`;
none is a committed test (ADR 001: Vitest is for TypeScript units).

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | 12 screens, prefixes 00 to 11 in page order | README block and ls | `listsTwelveScreensInPageOrder` |
| AC-2 | 52 PNGs, width 1440 or 780, height matches the logged CSS height | `sips` per file | `exportsFiftyTwoPngsAtPlannedSizes` |
| AC-3 | nav and bar on the 8 hero PNGs only; preloader shows HJ and 0% | qa opens PNGs | `showsChromeOnHeroOnly` |
| AC-4 | RIDE at 1512 ms, video 3.56 s, line 1100 ms, marquees at 0, all revealed | script asserts, qa opens all 52 | `freezesEveryAnimationAtItsNamedMoment` |
| AC-4 | projects mobile not repeated past 16384 px | qa opens to the bottom | `stitchesTallMobileProjectsWithoutRepeat` |
| AC-5 | PNGs under docs in LFS, public PNGs plain, `lfs-pointers` green | `check-attr`, `lfs ls-files`, `lfs fsck`, CI | `storesDocsPngsThroughLfsOnly` |
| AC-6 | 12 screen sections with five labels; folder equals the list | grep, diff | `describesEveryScreenAndMatchesFolder` |
| AC-6 | rerun into scratch gives the same names | script run, sums compared | `reexportsSameNamesFromReadme` |
| AC-7 | mockup sums pass, mockup diff empty, test and build pass, dist clean | shasum, git diff, npm, find | `leavesMockupUntouchedAndBuildClean` |
| AC-8 | log entry holds the capture choices and D1; roadmap line `[x]` | grep | `recordsCaptureChoicesAndChecksWaveZero` |

## Done when

- All boxes checked, each with its commit on the branch.
- qa report attached (sizes, script log, PNGs opened, build).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done, roadmap wave 0 line checked.
