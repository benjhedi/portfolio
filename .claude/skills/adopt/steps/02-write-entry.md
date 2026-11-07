# Step 2 - Write AGENTS.md and CLAUDE.md from the real repo

The templates are skeletons; the content comes from the audit. Show both
files in full and wait before writing.

## AGENTS.md

- Product paragraph: from `product/mission.md` written by
  `/analyze-product`, with the non-negotiable rule from constitution.md.
- Read order: `product/` first, then the documents that exist and are
  current, then `specs/`. Stale documents are not listed; they are
  archived or marked for update in a refactor spec.
- Working mode: the template text. Keep a project-specific sentence when
  the old file had one that still applies.
- Stack: from the manifest and the audit, one line per item, versions
  real, non-negotiables marked.
- Conventions in short: the project's conventions as practiced, including
  the deliberate divergences. The git line states the format the hooks
  enforce here.

## CLAUDE.md

- The `@AGENTS.md` import.
- Rules paragraph as in the template, plus one line per project rule file
  added in step 1.
- Agents table: only the agents present in `.claude/agents/`.
- Skills line: only the skills present.
- Project specifics: the pitfalls the audit or the old handoff recorded
  (a hook quirk, a path that differs from the kit layout, a simulator
  collision), each in one line. Decisions stay in `docs/adr/`.
- For a multi-app repo: the root file is the router (where to open Claude
  Code for which task) and each app has its own `CLAUDE.md` with this shape.

## Retire the old files

- The previous `CLAUDE.md` content is either now in `AGENTS.md`, in a
  rule, in an ADR, or archived. Nothing is lost silently; the commit body
  says where each section went.
- Delete the `*.kit.md` files once merged.
- `.cursorrules`, `.clinerules`: replace with a one-line pointer to
  `AGENTS.md` when those tools are still in use; delete otherwise.

## Size and commit

`AGENTS.md` under 60 lines, `CLAUDE.md` under 50; anything longer belongs
in a rule, a reference or a document in the read order. Commit
`[chore-adopt-kit]: write AGENTS.md and CLAUDE.md from the audit`.
Stop. Step 3 after an explicit go.
