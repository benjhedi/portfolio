# Handoff - Portfolio v2 foundations - 2026-11-09

Where to resume. First handoff of the repo.
Last update: 2026-11-09, by the kit adoption session.

## State

- `dev`: last commit `40a3dd6 Merge pull request #25`, `npm test` green
  (no test files yet), `npm run build` green.
- Branch `chore-adopt-kit`: 8 commits ahead of `dev`, PR to `dev` open.
- Fresh clone: `npm ci` with a `read:packages` token, then
  `./scripts/setup-hooks.sh`.

## Done this session

wara-kit 2.1.1 installed (PR 24), repo audited, architecture chosen
(option B) and written as `10-architecture.md`, Vitest added (ADR 001),
`product/` extracted and validated (PR 25). Kit adopted on
`chore-adopt-kit`: project rule 90, CONTRIBUTING, ADRs 002 and 003,
AGENTS.md, CLAUDE.md and README rewritten, hooks, a fresh session-start
and a review-agent run tested.

## Next steps, in order

1. Merge `chore-adopt-kit` into `dev` - Hedi.
2. Wave 0: version the v2 decision log, the mockup with its media and
   `SEO-accueil.md` in `docs/` - main session, needs the log text from Cowork.
3. Wave 0: upgrade the Wara DS SDK to `--ws-*` - setup-agent, ADR 003.
4. First v2 spec: the hero - `/specify`, then `/clarify` on the open points.

## Open decisions

- Hero oval background: video background or sky retint. Hedi.
- Hero loop: crossfade accepted or regenerated clip. Hedi.
- Statement and marquee titles: capitals or sentence case. Hedi.
- "Voir le projet" target when no store page exists, and where project
  details live. Hedi, in the projects spec.
- Unused fontsource packages: remove or keep. Hedi.

## Pitfalls met

- Every branch starts from `dev`, release branches included; `main` only
  receives a release once it is in production (Hedi, 2026-11-09). Local
  `origin/HEAD` now points to `dev` and the main checkout sits on `dev`.
- Desktop sessions start on `WR/<name>`: hooks refuse it,
  `git branch -m <type-title>` first. Permanent fix: kit prefix support.
- The main checkout holds an untracked `.claude/launch.json` that this PR
  tracks: delete it there before pulling `dev` after the merge.
- Kit files stay under 50 lines (`check.sh`), AGENTS.md under 60.

## Resume

    /session-start

Then: once the PR is merged, start the wave 0 spec from `dev`.
