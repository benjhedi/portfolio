# Step 1 - Inventory, read only

Facts with their evidence (`path`, `file:line`, command output). No
judgment yet, no proposal. Output: `docs/audit/inventory.md`.

## Inventory

```bash
find . -maxdepth 3 -type d -not -path '*/.git*' -not -path '*/node_modules*' \
  -not -path '*/DerivedData*' -not -path '*/.build*' | sort
ls CLAUDE.md AGENTS.md README.md CONTRIBUTING.md CHANGELOG.md HANDOFF.md 2>/dev/null
find . -path '*/.claude/*' -type f -not -path '*/worktrees/*'
ls .githooks scripts .github/workflows docs 2>/dev/null
git log --oneline -40
git branch -a
```

## Sections of the audit

1. Layout: the tree versus the kit reference for the platform. Where
   features, Core, tests, docs, design material actually live.
2. Instruction files: every `CLAUDE.md`, `.cursorrules`, `.clinerules`,
   `AGENTS.md`, agent file, with date and size. Which ones contradict each
   other or the code.
3. Documents: README, CONTRIBUTING, ADRs, decisions log, handoff, specs.
   Which are current, which are stale (compare with the code and the log).
4. Git conventions in use: branch names and commit subjects from the last
   forty commits, hooks present, CI present. The convention the history
   really follows, with counts.
5. Architecture as practiced: imports of persistence or AI frameworks in
   views and domain, ViewModels calling repositories, business rules in
   views, singletons. One `grep` line per check, counts per folder.
6. Design: token source, hardcoded values (design-system audit checklist),
   components outside the design system, missing dark or reduce-motion
   paths.
7. Dependencies: manifest list, each with the module importing it.
8. Toolchain: generator, lint, format, dead-code tool, pinned versions.
9. Secrets: any `.env`, key, token or credentials folder tracked or
   present. One line, no content.
10. Permissions: `settings.local.json` size and whether it is ignored.

## Format

One table per section: item, evidence, state (present, stale, absent).
Facts only. Under 150 lines; split into two files when longer.

Stop. Present the summary in ten lines. Step 2 (gap table) after an explicit go.
