---
name: init
description: >
  Sets up a repository's tooling once, apart from the method: branches,
  hooks, CI, generator manifest, lint and format configs, .gitignore,
  settings.json with the SessionStart hook, docs folders (setup-agent). Use
  it on a fresh repo after /plan-product and the study, or to fill tooling
  gaps an analysis found. Existing hooks and conventions are kept.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
---

# Init

Tooling is not method: this makes a repo buildable, guarded and readable by
a fresh session. Agent: setup-agent. List every file first, wait.

## Git

First read what exists: `git config core.hooksPath`, non-sample files in
`.git/hooks/`, `CONTRIBUTING.md`, a gitflow ADR. Found: keep that
convention, add only missing checks, branch and commit in its format. Not
found: `main`, `dev`, `.githooks/` via `scripts/setup-hooks.sh`,
`.github/workflows/conventions.yml` at the git root, format per `04-git.md`.

## Generator and build

Per `product/tech-stack.md`: `project.yml`, `Project.swift`, `package.json`
or Gradle; app and test targets, language mode and strict concurrency as
the stack says; generated project ignored; build green on an empty root
view before anything else.

## Quality toolchain and Claude configuration

Lint, format and dead-code configs copied from the nearest sibling repo and
adjusted; pinned versions; pre-commit on staged files only. `.claude/settings.json`
from the kit template with the SessionStart hook; `settings.local.json`
ignored. Rules, agents, skills placed by `install.sh`.

## Folders and documents

`product/`, `specs/`, `docs/adr/`, `docs/audit/`, `docs/prompts/`,
`CHANGELOG.md` with Unreleased, `CONTRIBUTING.md` (kit default or the
existing convention), `README.md` pointing at `product/` and the build
commands, `LICENSE` when public.

Done when a clean clone builds with the documented commands, the hook
refuses a bad commit message (test it once) and `/session-start` reports
without asking where anything is. One commit per group on `chore-init`.
