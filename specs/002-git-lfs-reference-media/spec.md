# Spec 002 - Git LFS for reference media

Branch: `chore-git-lfs` | Status: planned (clarified 2026-11-09)
Roadmap line: Wave 0, prerequisite of spec 001 AC-7 (videos through LFS).

## Why

Hedi chose Git LFS for the v2 reference videos on 2026-11-09 (spec 001).
The repo is public, CI and release checkouts fetch no LFS object, and the
kit hooks own `core.hooksPath`, where `git lfs install` cannot add its
own hooks: set up badly, LFS ships pointers or never uploads objects.

## User stories, by priority

- P1 As the maintainer, I want reference videos stored through LFS so
  that their binaries stay out of the plain git history.
- P1 As the maintainer, I want CI, deploy and the site untouched so that
  LFS never reaches what ships.

## Acceptance criteria (EARS)

- AC-1 THE LFS tracking rules SHALL match only video files under `docs/`;
  `git lfs ls-files` SHALL list nothing under `public/` or `src/`.
- AC-2 WHEN the repo is checked out without LFS objects, as CI does, THE
  `npm test` and `npm run build` commands SHALL pass and `dist/` SHALL be
  identical to the build of `dev` before the change.
- AC-3 WHEN a branch holding an LFS file is pushed THE LFS object SHALL
  reach the remote, through LFS calls added to the repo's `.githooks/`
  (Hedi, 2026-11-09), with branch and commit checks unchanged.
- AC-4 THE choice SHALL be recorded in ADR 004: scope, reason, the
  plain-git alternative and why it lost, the GitHub LFS quota.
- AC-5 CONTRIBUTING SHALL name the setup step for a fresh clone and what
  breaks without it.
- AC-6 THE hook edits SHALL be recorded as kit drift in the roadmap debt
  list, with the wara-kit request to absorb them.
- AC-7 IF a PR adds a file matching the LFS rules as a plain blob THEN
  CI SHALL fail on it; no local hook checks this (Hedi, 2026-11-09).

## Screens and states

None: toolchain change, nothing rendered changes.

## Data and rules touched

No personal data. Rules 05 (tooling recorded) and 04 (hooks).

## Out of scope

Versioning the references themselves (spec 001); moving `public/` media
to LFS; changing the release or deploy workflow; upstreaming the hook
change into wara-kit (flagged, not done).

## Open points

None.

## Delivery

Spec, plan and code ship together in one PR from `chore-git-lfs`, cut
from `dev`; spec 001 rebases on `dev` after it merges (Hedi, 2026-11-09).
