# Tasks 001 - v2 references in the repo

Plan: `plan.md` (all gates OPEN) | Branch: `docs-v2-references` off `dev`

Documents only: the architecture rule's construction order covers `src/`,
so the order here is the frozen sources first, then the documents that
describe them, then the pointers. No `[P]`: T03 needs the sums of T01 and
T02, and sequential is cheaper than worktrees. T01 runs in the main
session because only it can read the artifact.

## Tasks

- [x] T01 mockup files at their published paths, version 1794063463-7380
  checked on each read - files: `docs/v2/mockup/**` (16 files) - check:
  each sha256 equals the one the read reported; `git lfs ls-files` lists
  the two mockup videos - agent: main session
- [ ] T02 hero source clip, renamed, content unchanged - files:
  `docs/v2/source/hero-source-2026-11-07.mp4` - check: sha256
  213146af...e4b9, listed by `git lfs ls-files` - agent: main session
- [ ] T03 handoff README: source URL, version, sums block, serve command
  - files: `docs/v2/README.md` - check: `shasum -a 256 -c` on the block
  from `docs/v2/`, grep URL and version - agent: main session
- [ ] T04 decision log, French verbatim then 12 English dated entries -
  files: `docs/v2/decision-log.md` - check: French block diffed against
  the copy saved first to the session notes folder; entry count - agent:
  main session
- [ ] T05 SEO copy with Jahouach - files: `docs/v2/seo-accueil.md` -
  check: `diff` against the original shows the three planned lines only;
  `grep -c Benjahouach` is 0; original sha256 unchanged - agent: main session
- [ ] T06 pointers to the in-repo references, roadmap line left open with
  its note - files: `AGENTS.md`, `CLAUDE.md`, `product/mission.md`,
  `product/roadmap.md`, `product/tech-stack.md` - check: grep `docs/v2/`
  in each, roadmap line still `[ ]` - agent: main session
- [ ] T07 verify - all AC checks below green, `npm ci` first - files:
  `specs/001-v2-references/verification.md` - agent: qa
- [ ] T08 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` status to done - files: `spec.md` - agent:
  review-agent

## Test plan (derived from the EARS criteria)

Shell, browser and build checks, run by qa and recorded with their output
in `verification.md`; none is a committed test (ADR 001 sets Vitest for
TypeScript units, and no TypeScript changes).

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | every mockup file matches its published sha256 | shasum | `matchesPublishedSha256ForEveryMockupFile` |
| AC-2 | served locally, no 404 on a local path, light then dark | in-app browser, network list, screenshots | `loadsEveryLocalReferenceInBothThemes` |
| AC-3 | README names source, version, sums, serve command | grep and `shasum -c` | `namesSourceVersionSumsAndServeCommand` |
| AC-4 | French block identical to Hedi's 2026-11-07 text | diff | `keepsFrenchLogByteIdentical` |
| AC-4 | 12 English dated entries, none in French | grep count | `listsTwelveDatedEnglishEntries` |
| AC-5 | copy differs from the original on three lines only, no Benjahouach | diff and grep | `changesOnlyTitleCountAndNameRule` |
| AC-5 | original in the main checkout keeps its sha256 | shasum before and after | `leavesOriginalUntouched` |
| AC-6 | clip byte-identical, under `source/`, not `mockup/` | shasum and path | `keepsSourceClipByteIdenticalOutsideMockup` |
| AC-7 | exactly three videos through LFS; `lfs-pointers` green on the PR | `git lfs ls-files`, CI | `storesExactlyThreeVideosThroughLfs` |
| AC-8 | `AGENTS.md`, `CLAUDE.md`, `product/` cite `docs/v2/`; roadmap line open | grep | `pointsReadOrderToDocsV2` |
| AC-9 | `npm test` and build pass, `dist/` holds nothing from `docs/` | build and find | `shipsNoDocsFileInDist` |

## Done when

- All boxes checked, each with its commit on the branch.
- qa report attached (build, scenarios, the two mockup screenshots).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done; the roadmap wave 0 line stays open until
  the PNG follow-up (spec 001 AC-8).
