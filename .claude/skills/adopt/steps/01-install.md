# Step 1 - Install the kit files without breaking the flow

Branch `chore-adopt-kit` (or the project's own format). List every file you
will add, move or retire, then wait. Nothing is deleted without an explicit
go; retired files move to `docs/archive/` with a dated note.

## Rules and agents

- `.claude/rules/`: the kit rules are already copied by `install.sh`. Add
  `9N-project-<topic>.md` for each deliberate divergence from the gap table,
  stating the override and its source.
- `.claude/agents/`: keep existing agents that have no kit equivalent.
  Where both exist (an older feature agent versus `developer`), diff them; keep project
  specifics in the kit version and retire the old file.
- Agent files longer than 50 lines: split the project-specific checks into
  a rule or a reference file the agent names.

## Scripts, hooks, CI

- Hooks exist (`.git/hooks/*` non-sample, `core.hooksPath`, lefthook,
  husky): keep them and their format; add only the missing checks. The
  branch of this very step follows that format, not the kit's.
- No hooks yet: copy `.githooks/`, `scripts/setup-hooks.sh`, run it.
- CI: `conventions.yml` at the git root, only if the project adopts the kit
  format; otherwise adapt the regex to the project rule.

## Settings and design material

`.claude/settings.json` from the template, merged with existing allow rules
that are broad and stable; `settings.local.json` trimmed of one-off entries
and ignored (`gitignore.snippet`). Point `AGENTS.md` to the existing handoff
folder; when the token table lives only in code, extract it into a handoff
`CLAUDE.md` (design-system template) marked "extracted, to validate".

## Documents

- Missing `CONTRIBUTING.md`: write it from the convention the history
  really follows (step 1 counts), not from the kit default.
- Missing ADRs for decisions visible in the code (generator, persistence,
  architecture): write ADR 001 as "Recorded after the fact" with the
  evidence; options considered may be short.

## Commits

One per group: rules, agents, scripts and hooks, settings, documents.
`[chore-adopt-kit]: <group>`. No code change in this branch.

Stop. Step 2 after an explicit go.
