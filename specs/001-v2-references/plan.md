# Plan 001 - v2 references in the repo

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system: not concerned, nothing rendered changes; the mockup
  `tokens.css` is a reference copy, never imported | OPEN
- Tokens: none needed | OPEN
- Mockups: none needed to build; this spec is what puts the mockup in the
  repo, its PNGs are the follow-up (spec, Terms) | OPEN

Rules and skills
- Rules that apply: 00 to 07; 02 (read order in `AGENTS.md`), 03 (French
  log verbatim, English entries apart; the sources hold no dash or curly
  quote, checked 2026-11-09), 05 (no new dependency, LFS is ADR 004), 06
  (public repo: grep the copies for secrets), 60 (mockup contract).
  Not matched: 10-architecture, 30, 31, 50, 90: nothing under `src/`.
- Skills to load: `design-to-code` (handoff README shape), `commit`.
- Constitution principles touched: 1 (SEO copy and log say Jahouach), 2
  (Wara names stay in `docs/`, which never ships: AC-9), 7 (mockup in the
  repo), 8 (one runnable check per task).

Architecture
- Units this change needs per the architecture rule: none; documents only
  | covered by the rule: yes, the rule governs `src/`, untouched
- Modules touched: `docs/v2/` (new), `AGENTS.md`, `CLAUDE.md`,
  `product/mission.md`, `product/roadmap.md`, `product/tech-stack.md`;
  `specs/001-v2-references/verification.md` (qa) and `spec.md` status
  (after review) | boundary crossed: none

Verification
- AC-1: from `docs/v2/`, `shasum -a 256 -c` on the sums block of the
  README; each sum equals the one the artifact read reported.
- AC-2: `python3 -m http.server` in `docs/v2/mockup/`, in-app browser:
  network list shows no 404 on a local path, light then dark
  (`data-theme`), one screenshot each.
- AC-3: grep the README for the artifact URL, `1794063463-7380`, the sums
  block and the serve command.
- AC-4: the French block equals the 2026-11-07 text as Hedi pasted it
  (accents stripped in his original), diffed against a copy saved to the
  session notes folder first; 12 English dated entries.
- AC-5: `diff` original vs copy: exactly the title, its count and the name
  rule; `grep -c Benjahouach` is 0; original sha256 equal before and after.
- AC-6: sha256 of the clip equals 213146af...e2b9; it sits under
  `docs/v2/source/`, not under `docs/v2/mockup/`.
- AC-7: `git lfs ls-files` lists exactly the three videos (local); then,
  after Hedi's go for the push and the PR, the `lfs-pointers` job is green
  and a fresh clone with LFS gets the clip with its sha256. qa runs T07 in
  these two steps.
- AC-8: grep `AGENTS.md`, `CLAUDE.md`, `product/` for `docs/v2/`; the
  artifact id stays only as the source cited; roadmap line still `[ ]`.
- AC-9: `npm ci`, `npm test`, `npm run build`; `find dist` holds nothing
  from `docs/`.

## Technical approach

Layout, one folder per v2 handoff, as the design-to-code bundle expects:

    docs/v2/README.md          source, version, sums, serve command
    docs/v2/decision-log.md    French verbatim, then English entries
    docs/v2/seo-accueil.md     copy, name switched to Jahouach
    docs/v2/mockup/            the 16 files at their published paths
    docs/v2/source/hero-source-2026-11-07.mp4   the Kling clip, renamed

Tasks in this order, one commit each: mockup files (Artifact read of each
path, version checked), source clip, README with sums, decision log, SEO
copy, pointers in `AGENTS.md`, `CLAUDE.md` and `product/`, then qa.
The PNG follow-up later adds `docs/v2/ecrans/` and screen sections to the
same README.

Rejected: `DECISIONS.md` (kit name, but the file naming rule asks
lowercase kebab-case); the README inside `mockup/` (the follow-up README
belongs at the bundle root); the SEO copy at `docs/seo-accueil.md` (it is
a v2 input, kept with the other v2 references); keeping `portrait_crop.mp4`
(underscore; the content stays byte-identical, only the name changes).

## Data model and contracts

None. No personal data beyond the mail and LinkedIn URL already in
`content.ts`.

## Risks and open decisions

- The mockup keeps names the naming rule would refuse (`FranceInfos.webp`,
  `MYTF1.webp`, `La1ere.webp`, `README.md` aside): renaming them breaks
  `index.html` and AC-1. Kept as a verbatim exception.
- The artifact may move past version 1794063463-7380 before T1: the read
  reports the version; a mismatch stops the task and goes to Hedi.
- The SEO title count is wrong in the original: "Hedi Benjahouach, ..."
  is 49 characters, not 48. The copy states the real count, 46.
- Push: `core.hooksPath` points to the main checkout's `.githooks/`, now
  on `dev` f1861e3 with the LFS pre-push (checked 2026-11-09). Recheck
  before pushing, or the videos reach GitHub as pointers without objects.
- This worktree's `node_modules` predates Vitest (no `vitest` binary):
  `npm ci` first, with the `read:packages` token in `~/.npmrc`, for AC-9.

## Research notes

`git-lfs/3.8.1`, global filters set (`git config filter.lfs.clean`).
Artifact listing of 2026-11-09: 16 files, 1.15 MB, three videos.
