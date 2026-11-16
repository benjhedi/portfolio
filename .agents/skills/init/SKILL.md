---
name: init
description: >
  Sets up a repository's tooling once, apart from the method: branches,
  hooks, CI, generator manifest, lint and format configs, .gitignore,
  host-specific guidance and docs folders. Use
  it on a fresh repo after /plan-product and the study, or to fill tooling
  gaps an analysis found. Existing hooks and conventions are kept.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Edit, Bash
---

# Init

Make the repo buildable and readable by a fresh session. The main session
owns setup. When delegation helps, use a local Claude setup-agent or a Codex
subagent with a bounded tooling task. List proposed files before writing.

## Git

First read what exists: `git config core.hooksPath`, non-sample files in
`.git/hooks/`, `CONTRIBUTING.md`, a gitflow ADR. Found: keep that
convention, add only missing checks, branch and commit in its format. Not
found: use the repository's default branch; do not create `dev` unless
the project requires it. Add `.githooks/` via `scripts/setup-hooks.sh`,
`.github/workflows/conventions.yml` at the git root, format per `04-git.md`.

## Generator and build

Per `product/tech-stack.md`: `project.yml`, `Project.swift`, `package.json`
or Gradle; app and test targets, language mode and strict concurrency as
the stack says; generated project ignored; build green on an empty root
view before anything else.

## Quality toolchain and host configuration

Use this repository's existing lint, format and dead-code configurations.
For missing tools, derive minimal settings from the selected tool's official
documentation and the project conventions. Pin versions and check staged
files in pre-commit. Reuse another repository only when the user supplies it.

For Claude Code, configure `.claude/settings.json` and its SessionStart hook
from the kit template, and ignore `settings.local.json`.
For Codex, verify `AGENTS.md` links to the shared rules and that project
skills exist in `.agents/skills/`. Configure both when both are selected.
Use the rules, skills and available workers installed by `install.sh`.

## Folders and documents

`product/`, `specs/`, `docs/adr/`, `docs/audit/`, `docs/prompts/`,
`CHANGELOG.md` with Unreleased, `CONTRIBUTING.md` (kit default or the
existing convention), `README.md` pointing at `product/` and the build
commands, `LICENSE` when public.

Done when a clean clone builds with the documented commands and the
project's configured checks pass. End with `/next` in Claude Code or
`$next` in Codex for a fresh session. Follow the project's branch and
commit conventions.
