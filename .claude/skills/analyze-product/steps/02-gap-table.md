# Step 2 - Gap table, repo practice against kit rules

For each rule of the installed modules, one line: aligned, divergent, or
absent. Divergent lines carry the reason found in the repo (an ADR, a
CONTRIBUTING, a consistent practice) or "no reason found".

## The gap table

| Kit rule | State | Evidence | Proposal |
|---|---|---|---|
| 00 working mode | aligned | CLAUDE.md section | keep |
| 04 git: type-title | divergent, deliberate | ADR 004 feature-N_name | project rule |
| 10 architecture rule | divergent, debt | 3 `import SwiftData` in Views | refactor spec |
| 50 tokens | absent | 41 literals, no DS package | refactor spec, wave 1 |

## How to decide the proposal column

- Aligned: nothing to do; the kit rule applies as is.
- Divergent and deliberate (a document says why, or the whole history is
  consistent): keep the project's convention. Write it in `AGENTS.md`
  "Project specifics" and, when it concerns a rule file, add a project
  rule in `.claude/rules/9N-project-*.md` that states the override. Hooks
  and CI keep enforcing the project's format.
- Divergent and inconsistent: debt. A refactor spec per theme, with the audit
  counts as findings and a grep-based acceptance criterion.
- Absent: install (/adopt) when it is a kit file; a refactor spec when it needs
  code changes.

## Instruction files

Several `CLAUDE.md` or agent files that overlap: decide the single source
per topic. The usual outcome: `AGENTS.md` holds product, read order and
stack; `.claude/rules/` holds rules; the old long `CLAUDE.md` content is
split into those or retired. A root router `CLAUDE.md` stays when the repo
hosts several apps.

## Questions for Hedi

Ask only about divergences with no reason found and about documents whose
staleness cannot be inferred. One or two at a time. Record each answer in
the table, not in the conversation.

## Output

The gap table appended to `docs/audit/inventory.md`, the list of
refactor specs to create (title and wave), the list of project rules to write.

Stop. Hand off to /adopt after an explicit go.
