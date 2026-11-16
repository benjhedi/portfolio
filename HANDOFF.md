# Handoff - Portfolio v2 and kit upgrade - 2026-11-16

Where to resume. Replaces the 2026-11-09 kit adoption handoff (kept in git history).
Last update: 2026-11-16, by the kit upgrade reconciliation session.

## State

- Base branch `dev`, last commit `4b1eb40 Merge pull request #38` (2026-11-16).
- Current branch `chore-upgrade-kit`, fast-forwarded to `origin/dev`, no
  commit of its own: the wara-kit upgrade and its reconciliation edits are
  uncommitted. No PR yet.
- Tests: `npm test` in the main checkout fails 3 files, all
  `sdkTokens.test.ts`: the local `node_modules` still holds theme 0.1.0
  while `package.json` pins 0.3.1, and Vitest also collects the copies
  under `.claude/worktrees/`. Build not run this session.
- Generator: `npm ci` needed on a fresh clone (`read:packages` token),
  then `./scripts/setup-hooks.sh`.

## Done this session

wara-kit upgraded in place (`upgrade.sh`, host both, preset web; backup in
`.git/wara-kit-upgrade-backups/20261116-174913-3nYcwt`). The entry files
now point to `/next` and `/start`, and AGENTS.md keeps the strict spec flow
over the small and medium paths of the new rule 07. The roadmap, the
inventory and this handoff record that adoption is complete (PR 26,
`c1753e1`, 2026-11-09) and that specs 001 to 011 are done.

## Next tasks and dependencies

1. Decide whether the kit upgrade needs `specs/012-kit-upgrade/` under the
   strict flow - Hedi - before committing.
2. Split the upgrade into commits and open a PR to `dev` - `/commit` -
   kit files, then entry and doc edits - after 1 and Hedi's go.
3. Statement section mockup - design-agent - `docs/v2/` - rule 60; settle
   capitals or sentence case first (`product/roadmap.md`).
4. Statement spec - `/specify` - after 3.
5. Spec 007 Safari, Firefox and keyboard rows on a Cloudflare preview -
   qa - before the next `v*` tag. Independent of 1 to 4.

## Open decisions

- Statement and marquee titles: capitals or sentence case. Hedi. Linked
  decision: `docs/v2/decision-log.md` 2026-11-07.
- "Voir le projet" target when no store page exists, and where project
  details live. Hedi, in the projects spec.
- Unused fontsource packages `inter-tight` and `space-grotesk`: remove or
  keep. Hedi (`product/tech-stack.md`).

The hero oval background and the hero loop were settled on 2026-11-15
(decision log, spec 007).

## Pitfalls met

- Main checkout tests red: stale `node_modules` (theme 0.1.0). Run
  `npm ci` before trusting `npm test` there.
- Vitest picks up `.claude/worktrees/*/src/*.test.ts`. Permanent fix: an
  exclude in the Vitest config, through its own spec.
- Desktop sessions start on `WR/<name>`: hooks refuse it,
  `git branch -m <type-title>` first.
- `.githooks/pre-push` carries the Git LFS upload (spec 002, ADR 004); a
  kit hook update would drop it. Check it after every kit upgrade.
- Kit caps: AGENTS.md 60 lines, CLAUDE.md 50.

## Resume

In a fresh session, run `/next`.
Relevant branch `chore-upgrade-kit`. Expected outcome: the kit upgrade
committed and its PR to `dev` open, once Hedi decides on spec 012.
