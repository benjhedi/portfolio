---
name: session-start
description: >
  Orients a new Claude Code session: reads the project documents in order,
  inspects the real git and project state, produces a short session report
  and asks what to work on. Use it as the first action of every session, or
  when resuming after a long pause. It touches no file.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Bash(git *), Bash(ls *), Bash(cat *)
---

# Session start

New session. Orient yourself completely before anything else. Do not touch
any file before Hedi answers the final question.

## 1. Read, and confirm each one

Follow the read order declared in `AGENTS.md`. At minimum: `README.md`,
`CONTRIBUTING.md`, the ADR index in `docs/adr/`, the handoff document if
one exists, `product/` and the spec in progress under `specs/`.

## 2. Inspect the real state

Run silently: `git branch --show-current`, `git status --short`,
`git log --oneline -10`, `ls .claude/agents .claude/skills`. Add the
project's own checks: feature folders, the generator manifest
(`project.yml`, `Project.swift`, `package.json`), test folders.

## 3. Report, in this format

```
CURRENT BRANCH: ...
GIT STATUS: clean / N files modified or staged
LAST COMMITS: three lines
GENERATOR: project.yml / Project.swift / package.json present or not
FEATURES BUILT: list or "none yet"
OPEN DECISIONS: items marked open in ADRs, handoff, specs (BLOCKED gates)
AVAILABLE AGENTS: names in .claude/agents/
PITFALLS NOTED IN HANDOFF: one line each, or "none"
```

## 4. Ask

"What do you want to work on today?" One question, then wait.

If `$ARGUMENTS` names a spec, a branch or a feature, read that item too and
end the report with its acceptance criteria instead of the open question.
