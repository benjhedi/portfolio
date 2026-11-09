# 004 - Git LFS for reference videos under docs/

## Status

Accepted. Decided by Hedi on 2026-11-09 (spec 002).

## Context

Spec 001 versions the v2 reference media in `docs/`: the mockup's
`hero.mp4` and `hero.webm` and the 814 KB source clip, about 1.5 MB.
Three constraints shape how: the repo is public; `ci.yml` and
`release.yml` check out with `actions/checkout@v4` and no `lfs: true`, so
any LFS file in what ships would deploy as a pointer; and the kit owns
`core.hooksPath` (`.githooks/`), where `git lfs install` cannot add the
pre-push hook that uploads objects.

## Options considered

**A - Plain git**
- (+) no tool, no setup step, nothing to guard in CI or the hooks
- (+) 1.5 MB is small for today's history
- (-) every re-export of a reference video stays in every clone forever

**B - Git LFS, scoped to videos under docs/**
- (+) video binaries stay out of the plain git history
- (-) one setup step per clone, a local edit of a kit hook, a CI guard
- (-) GitHub quota: 10 GiB storage and 10 GiB bandwidth a month on Free
  and Pro; Actions downloads and forks count against the owner

## Decision

Adopt **B**, Hedi's choice over the plain-git recommendation: the
reference videos will be re-exported as the mockup evolves, and their
binaries must not pile up in the plain history.

- `.gitattributes` tracks `docs/**/*.mp4` and `docs/**/*.webm` only;
  `public/` and `src/` never go through LFS.
- `.githooks/pre-push` runs the branch check, then `git lfs pre-push`. Without
  git-lfs it warns and lets the push through.
- No post-checkout, post-commit or post-merge hooks: they only serve
  file locking, which this repo does not use.
- The `lfs-pointers` CI job runs `git lfs fsck --pointers` on the PR range
  and fails on an LFS-tracked file stored as a plain blob. No local guard.
- CI and release keep checking out without LFS objects: nothing they
  build reads `docs/`.

## Consequences

Easier:
- reference videos can be re-exported without growing every clone

Harder:
- each machine needs `git lfs install --skip-repo` once, or new videos
  go up as plain blobs and the PR fails in CI
- a pointer committed with git-lfs, then pushed from a shell or GUI whose
  PATH lacks git-lfs, reaches GitHub without its object: the hook only
  warns and the CI guard passes, so clones get a dangling pointer
- `.githooks/pre-push` differs from the wara-kit copy: a kit hook update
  would drop the LFS upload
- if the runner fetches LFS objects anyway, CI spends bandwidth quota
- over quota with no payment method, pushes of LFS files are blocked and
  clones get pointers only (GitHub docs, Git LFS billing, read 2026-11-09)

Follow-up:
- CONTRIBUTING setup step and `product/tech-stack.md` toolchain line (T05)
- roadmap debt line for the kit drift and the wara-kit request (T06)

## Amendments

- 2026-11-09, spec 004: the scope extends to `docs/**/*.png`, for the 52
  mockup PNGs in `docs/v2/ecrans/`, about 19 MB in total (an estimate
  from a light-theme probe). They are re-exported whenever the mockup
  changes, so plain git would keep every copy in every clone: the reason
  behind B for the videos. `public/` PNGs stay plain git, so the build,
  CI and release checkouts are unchanged. Hooks, the `lfs-pointers` job
  and the setup step stay as decided; each full re-export adds about
  19 MB to the LFS storage quota.
