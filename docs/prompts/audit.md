# Repository audit prompt

Paste in a session opened at the root of an existing repo when the
`/analyze-product` skill is not installed yet. Read only.

---

Audit this repository as it really is. Change nothing. Facts with
evidence only (paths, file:line, command output); judgment comes later.

Cover, one table per section:

1. Layout: `find . -maxdepth 3 -type d` minus git, build and dependency
   folders. Where features, shared code, tests, docs and design material
   live.
2. Instruction files: every CLAUDE.md, AGENTS.md, .cursorrules,
   .clinerules, agent or rule file, with size and last modification. Note
   contradictions between them and with the code.
3. Documents: README, CONTRIBUTING, ADRs, decisions log, handoff, specs.
   Current or stale, with the evidence.
4. Git: branch names and commit subjects of the last forty commits; the
   convention they really follow, with counts; hooks and CI present.
5. Architecture as practiced: persistence or AI framework imports in views
   and domain, ViewModels calling repositories directly, business rules in
   views, singletons holding state. One grep per check, counts per folder.
6. Design: where tokens live; hardcoded colors, spacing, radii, durations
   outside the design system; components defined in features; screens
   without a dark or reduce-motion path.
7. Dependencies: the manifest list, each with the modules that import it.
8. Toolchain: generator, lint, format, dead code tool, pinned versions.
9. Secrets: any .env, key, token or credentials folder present or tracked.
   One line, never the content.
10. Claude permissions: settings.local.json size and whether it is ignored.

Write the result to `docs/audit/adoption-audit.md`, under 150 lines, plain
hyphens, no em dashes, no emoji. End with a ten-line summary in the chat
and the question: which divergences are deliberate?
