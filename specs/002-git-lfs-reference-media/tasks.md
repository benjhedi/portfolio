# Tasks 002 - Git LFS for reference media

Plan: `plan.md` (all gates OPEN) | Branch: `chore-git-lfs` off `dev`

Toolchain change: the architecture rule's construction order covers `src/`
only, so the order here is rules, hook, guard, then the documents that
describe them. No `[P]`: six small tasks, sequential is cheaper than
worktrees.

## Tasks

- [x] T01 LFS tracking rules for videos under docs/ - files: `.gitattributes`
  - check: `git check-attr filter` on the five paths of the plan - agent: setup-agent
- [x] T02 pre-push calls git lfs pre-push after the branch check, warns
  without git-lfs - files: `.githooks/pre-push` - check: `sh -n`, then the
  three AC-3 scenarios in a scratch clone with a `file://` remote - agent: setup-agent
- [x] T03 CI job lfs-pointers - files: `.github/workflows/ci.yml` - check:
  YAML parses, the job's command run as is in a scratch repo (AC-7 rows)
  - agent: setup-agent
- [x] T04 ADR 004 - files: `docs/adr/004-git-lfs-reference-media.md` - check:
  grep scope, reason, plain-git option, quota with its GitHub docs source
  - agent: main session with the `adr` skill
- [x] T05 setup step and toolchain line - files: `CONTRIBUTING.md`,
  `product/tech-stack.md` - check: grep `git lfs install --skip-repo` and
  the failure line - agent: setup-agent
- [x] T06 kit drift debt line with the wara-kit request - files:
  `product/roadmap.md` - check: grep - agent: main session
- [x] T07 verify - all AC checks below green - files:
  `specs/002-git-lfs-reference-media/verification.md` - agent: qa
- [ ] T08 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` status to done - files: `spec.md` - agent: review-agent

## Test plan (derived from the EARS criteria)

Shell and build checks, run by qa and recorded with their output in
`verification.md`; none is a committed test (ADR 001 sets Vitest for
TypeScript units, there is no shell test harness and the spec asks none).

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | docs/ mp4 and webm get filter=lfs; public/, src/, docs png do not; ls-files empty | check-attr script | `tracksOnlyDocsVideosThroughLfs` |
| AC-2 | branch build without LFS objects equals the c1753e1 build | build and `diff -r dist` | `buildsIdenticalDistWithoutLfsObjects` |
| AC-3 | push of a branch with docs/v/a.mp4 leaves the object on the remote | scratch `file://` remote | `uploadsLfsObjectOnPush` |
| AC-3 | push of `WR/x` rejected, nothing uploaded | scratch remote | `rejectsBranchOutsideConventionBeforeUpload` |
| AC-3 | git-lfs off PATH: valid push passes with the warning | scratch remote | `warnsAndPushesWhenGitLfsMissing` |
| AC-4 | ADR 004 names scope, reason, plain git, quota | grep | `recordsScopeReasonAlternativeAndQuota` |
| AC-5 | CONTRIBUTING names the setup step and what breaks | grep | `namesSetupStepAndFailure` |
| AC-6 | roadmap debt holds the drift and the wara-kit request | grep | `logsKitDriftAndKitRequest` |
| AC-7 | plain blob matching the rules in base..head fails the job command | scratch repo | `failsOnPlainBlobMatchingLfsRules` |
| AC-7 | pointers only in base..head pass | scratch repo | `passesOnLfsPointers` |

## Done when

- All boxes checked, each with its commit on the branch.
- qa report attached (build, tests, scenarios; no screenshot, no screen).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done; the roadmap wave 0 line stays open (spec 001).
