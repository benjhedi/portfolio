# Plan 002 - Git LFS for reference media

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system: not concerned, nothing rendered changes (spec, Screens and states: none) | OPEN
- Tokens: none needed | OPEN
- Mockups: none needed, no screen | OPEN

Rules and skills
- Rules that apply: 00 to 07; 04 for the hook edit, 05 for the tooling record
  (ADR 004), 06 (public repo, LFS reuses the git credentials, no new secret).
  Not matched: 10-architecture (no file under `src/`), 30, 31, 50, 60, 90.
- Skills to load: `adr` (ADR 004), `commit`.
- Constitution principles touched: 8 (spec first, one runnable check per
  task), 9 (git-lfs is tooling outside `package.json`, recorded in ADR 004,
  CONTRIBUTING and tech-stack, confined to video files under `docs/`).

Architecture
- Units this change needs per the architecture rule: none; toolchain files
  only | covered by the rule: yes, the rule governs `src/`, untouched
- Modules touched: `.gitattributes` (new), `.githooks/pre-push`,
  `.github/workflows/ci.yml`, `docs/adr/004-git-lfs-reference-media.md` (new),
  `CONTRIBUTING.md`, `product/roadmap.md`, `product/tech-stack.md` |
  boundary crossed: none

Verification
- AC-1: `git check-attr filter` on docs/a.mp4, docs/x/b.webm (lfs) and
  public/hero/a.mp4, src/a.mp4, docs/a.png (unspecified); `git lfs ls-files`
  empty on this branch.
- AC-2: `npm test` and `npm run build` on the branch; build of c1753e1 in a
  temporary worktree; `diff -r` of both `dist/` empty; CI green on the PR.
- AC-3: scratch clone with a `file://` bare remote and `core.hooksPath` on
  this branch's `.githooks/`: pushing a commit with docs/v/a.mp4 leaves the
  object in the remote `lfs/objects`; pushing `WR/x` is still rejected; with
  git-lfs off PATH, a valid push passes with the warning. The first real
  GitHub upload is spec 001's push.
- AC-4: ADR 004 exists; grep scope, reason, plain-git option, quota.
- AC-5: grep CONTRIBUTING for `git lfs install --skip-repo` and the line on
  what breaks without it.
- AC-6: grep the kit drift line in the roadmap debt list.
- AC-7: the CI command, run as is in a scratch repo: fails on a plain blob
  matching the rules, passes on pointers; the job runs green on this PR.

## Technical approach

1. `.gitattributes`: `docs/**/*.mp4` and `docs/**/*.webm`, `filter=lfs
   diff=lfs merge=lfs -text`. Only the formats spec 001 brings; another
   format gets its line when a file needs it.
2. `.githooks/pre-push`: stdin read once into a variable; the branch loop
   reads it from a here-doc, logic and messages unchanged. Convention check
   first, so a rejected branch uploads nothing; then, if `git-lfs` is on
   PATH, the buffered lines go to `git lfs pre-push "$@"` and its status is
   the hook's; if not, a warning on stderr and exit 0 (Hedi, option A).
3. No post-checkout, post-commit, post-merge: they only manage `lockable`
   files and locking is not used (Hedi, 2026-11-09). Recorded in ADR 004.
4. `ci.yml`: new job `lfs-pointers`, PR events only, checkout with
   `fetch-depth: 0`, `git lfs version` then `git lfs fsck --pointers
   base..head`. Separate job so the build keeps its shallow checkout; in
   `ci.yml` (project-owned), not `conventions.yml` (kit-owned), so the kit
   drift stays limited to one hook.
5. Docs: ADR 004; CONTRIBUTING setup line `git lfs install --skip-repo`
   (global filters, no hooks: a plain `git lfs install` stops on the existing
   pre-push); roadmap debt line; tech-stack toolchain line.

Rejected: plain git (Hedi chose LFS, ADR 004 says why); a local pre-commit
guard (Hedi: CI only); `lfs: true` in checkouts (nothing shipped reads LFS
files, it would spend the bandwidth quota); fsck on HEAD only (misses a blob
replaced later in the same PR, probe of 2026-11-09).

## Data model and contracts

None. Contract kept: the pre-push hook reads the standard git stdin lines
(`<local-ref> <local-sha> <remote-ref> <remote-sha>`) and receives
`<remote> <url>` as arguments, which `git lfs pre-push` expects as is.

## Risks and open decisions

- `core.hooksPath` is an absolute path to the main checkout's `.githooks/`,
  shared by every worktree: the new pre-push runs only once the main
  checkout is on the merged `dev`. Spec 001 must push after that pull, or
  its videos reach GitHub as pointers without objects.
- If the runner smudges LFS files despite `lfs: false`, CI downloads the
  `docs/` videos: quota cost only, the build does not read `docs/`. To watch
  on spec 001's first PR.
- A PR that trips AC-7 must rewrite its branch history; intended.
- A wara-kit update can overwrite `.githooks/pre-push`: covered by the
  roadmap drift line.
- No open decision.

## Research notes

- git-lfs 3.8.1 (Homebrew, installed 2026-11-09 11:13, no global filter yet).
- `git lfs fsck --pointers` accepts a commit or an `A..B` range. Probe in a
  scratch repo on 2026-11-09: a plain blob under `docs/**/*.mp4` fails both
  the range and HEAD checks; once replaced by a pointer in a later commit,
  HEAD passes and the range still fails; `public/x.mp4` is not matched.
- `git lfs pre-push <remote> [url]` reads the git pre-push stdin format
  (`git lfs pre-push --help`).
- git-lfs on `ubuntu-latest`: expected preinstalled, proven by the job's
  `git lfs version` step.
- GitHub LFS free storage and bandwidth: read from GitHub docs when ADR 004
  is written, not from memory.
