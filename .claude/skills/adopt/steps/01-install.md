# Step 1 - Install the kit files without breaking the flow

Use the branch convention found in the audit. List every file to add, move
or retire, then wait. Nothing is deleted without an explicit
go; retired files move to `docs/archive/` with a dated note.

## Rules and available workers

- `.claude/rules/`: the shared kit rules are copied by `install.sh`. Add
  `9N-project-<topic>.md` for each deliberate divergence from the gap table,
  stating the override and its source.
- Claude Code agents in `.claude/agents/`: keep project agents with no kit
  equivalent. Diff overlapping agents and preserve project-specific checks.
- Codex uses native subagents and does not require project role files. Keep
  existing `.codex/agents/` files if the project already uses them; do not
  create or edit global agent profiles.
- Split long project-specific checks into a rule or reference file rather
  than expanding a role prompt.

## Scripts, hooks, CI

- Hooks exist (`.git/hooks/*` non-sample, `core.hooksPath`, lefthook,
  husky): keep them and their format; add only the missing checks. The
  branch of this very step follows that format, not the kit's.
- No hooks yet: copy `.githooks/`, `scripts/setup-hooks.sh`, run it.
- CI: `conventions.yml` at the git root, only if the project adopts the kit
  format; otherwise adapt the regex to the project rule.

## Settings and design material

For Claude Code, merge `.claude/settings.json` with broad, stable allow
rules; trim one-off entries from `settings.local.json` and ignore it.
Do not modify Codex user settings. Point `AGENTS.md` to the existing handoff
folder; when the token table lives only in code, extract it into the design
handoff marked "extracted, to validate".

## Documents

- Missing `CONTRIBUTING.md`: write it from the convention the history
  really follows (step 1 counts), not from the kit default.
- Missing ADRs for decisions visible in the code (generator, persistence,
  architecture): write ADR 001 as "Recorded after the fact" with the
  evidence; options considered may be short.

## Commits

One per group: rules, agents, scripts and hooks, settings, documents.
Use the project's commit convention. No code change in this branch.

Stop. Step 2 after an explicit go.
