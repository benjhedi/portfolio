# Step 2 - Write project entry files from the real repo

Use the audit to fill the templates. Show `AGENTS.md` in full and, when
the selected hosts include Claude Code, `CLAUDE.md`. Wait before writing.

## AGENTS.md

- Product paragraph: from `product/mission.md` written by
  `/analyze-product`, with the non-negotiable rule from constitution.md.
- Read order: keep the template's reads of rules `00` through `07` and
  applicable `9N-project-*.md`. Then list current product and project
  documents and `specs/`. Honor `paths:` scopes on architecture, platform
  and project rules. Archive stale documents or record a refactor spec.
- Working mode: the template text. Keep a project-specific sentence when
  the old file had one that still applies.
- Stack: from the manifest and the audit, one line per item, versions
  real, non-negotiables marked.
- Conventions in short: the project's conventions as practiced, including
  the deliberate divergences. The git line states the format the hooks
  enforce here.
- Shared context: build commands, repository pitfalls and multi-app routing.
  Reference each project rule added in step 1 without duplicating its text.

## CLAUDE.md (Claude Code only)

- The `@AGENTS.md` import.
- Rules paragraph as in the template; shared rule references stay in `AGENTS.md`.
- Agents table: only agents present in `.claude/agents/`.
- Skills line: only skills installed for the current host.
- Claude-specific configuration and pitfalls from the audit or old handoff.
  Keep shared guidance in `AGENTS.md` and decisions in `docs/adr/`.

## Retire the old files

- When Claude Code is a selected host, reconcile the previous `CLAUDE.md`
  into the new entries, rules, ADRs or archive. Record where each section
  went in the commit body.
- Delete a `*.kit.md` reference only after merging its entry for a selected host.
- `.cursorrules`, `.clinerules`: replace with a one-line pointer to
  `AGENTS.md` when those tools are still in use; delete otherwise.

## Size and commit

`AGENTS.md` under 60 lines, `CLAUDE.md` under 50; anything longer belongs
in a rule, a reference or a document in the read order.
Commit using the project's established format.
Stop. Step 3 after an explicit go.
