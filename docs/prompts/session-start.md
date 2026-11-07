# Session start prompt

Paste as the first message of a session when the `/session-start` skill is
not installed (another tool, a fresh clone, a Cowork session).

---

New session. Before anything else, orient yourself completely.

Read these files in order and confirm you have read each one:

1. AGENTS.md (or CLAUDE.md) - rules, architecture, agents
2. README.md - architecture and positioning
3. CONTRIBUTING.md - branches, commits, hooks
4. docs/adr/ - every ADR, note the ones marked open or proposed
5. HANDOFF.md or handoff-*.md if present - where the last session stopped

Then run these commands silently and include the output in your report:

- git branch --show-current
- git status --short
- git log --oneline -10
- ls .claude/agents .claude/skills

Then produce a short session report:

CURRENT BRANCH: ...
GIT STATUS: clean / N files modified or staged
GENERATOR: manifest present or not
FEATURES BUILT: list or "none yet"
OPEN DECISIONS: items marked open in ADRs or handoff
AVAILABLE AGENTS: list
PITFALLS NOTED: one line each, or "none"

Then ask: what do you want to work on today?

Do not touch any file before I answer.
