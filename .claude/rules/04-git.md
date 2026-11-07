# Git - branches, commits, hooks

Default convention below (Doable, 2026). A project's `CONTRIBUTING.md` or a
gitflow ADR overrides it; the commit-msg hook is the source of truth.

## Branches

- `main`: what is really shipped. Receives a release branch once the version
  is online, with its tag. Never commit on it directly.
- `dev`: integration. Features and fixes start from it and come back by PR.
- Work branches: `type-title`, lowercase, digits and hyphens.
  `type` in `feat fix chore docs refactor test perf ci`.
  Examples: `feat-streak-freeze`, `fix-reminder-timezone`.
- Release: `chore-release-1-2-0` cut from `dev`, freezes the scope.

Create the branch before writing any code. No work on `dev` or `main`.

## Commits

- Subject: `[type-title]: message`. The tag equals the current branch name.
- Two sentences maximum in the subject. A sentence ends with `. ! ?`
  followed by a space or the end; a version number or a file name does not
  count. Present tense, no trailing period.
- Atomic: one logical change per commit. In a change, one commit per task
  of `tasks.md`, in the construction order of the architecture rule.
- Never commit generated files: `.xcodeproj`, `.xcworkspace`, `DerivedData`,
  `dist/`, `build/`, `.claude/settings.local.json`.
- Merge, revert, fixup and squash commits are exempt from the format.

## Pull requests

PRs target `dev`, never `main`. The only PR to `main` is a release branch,
after the store release. Set the PR base explicitly when creating it.

## Enforcement

- In a repo you join: read `git config core.hooksPath`, the non-sample
  files in `.git/hooks/`, `CONTRIBUTING.md` and the gitflow ADR before the
  first branch or commit. Their format wins over this file, branch included.
- Local (kit default): `scripts/setup-hooks.sh` once per clone sets
  `core.hooksPath` to `.githooks/` (pre-commit, commit-msg, pre-push).
- Server: `.github/workflows/conventions.yml` revalidates branch name and
  every commit of a PR. Make the check required on `dev` and `main`.

## Trailers

A `Co-Authored-By:` trailer already contains two periods for the hook's
sentence count. With a trailer, keep a one-sentence subject without a final
period and no file name containing a dot.
