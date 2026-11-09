# Plan 003 - npm audit fix

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system: not concerned, nothing rendered changes (spec, Screens and states: none) | OPEN
- Tokens: none needed | OPEN
- Mockups: none needed, no screen | OPEN

Rules and skills
- Rules that apply: 00 to 07; 05 for the tooling record (versions in
  `product/tech-stack.md`), 06 (the `read:packages` token stays in the user
  `~/.npmrc`, never printed). Not matched: 10-architecture (no file under
  `src/`), 30, 31, 50, 60, 90 (the stack choice is unchanged).
- Skills to load: `commit`, `verify`.
- Constitution principles touched: 8 (spec first, one runnable check per
  task), 9 (no dependency added or removed, ranges unchanged; the lockfile
  moves within them).

Architecture
- Units this change needs per the architecture rule: none; toolchain files
  only | covered by the rule: yes, the rule governs `src/`, untouched
- Modules touched: `package-lock.json`, `CONTRIBUTING.md`,
  `product/tech-stack.md`, `product/roadmap.md` (checkbox at close) |
  boundary crossed: none

Verification
- AC-1: `npm audit` on Node 22 prints "found 0 vulnerabilities".
- AC-2: `git diff dev -- package.json` is empty.
- AC-3: build of f1861e3 in a temporary worktree and build of the branch;
  `diff -r` of both `dist/` is empty.
- AC-4: `npm -v` shows 10.9.x when the lockfile is written; on Node 22,
  `npm ci`, `npm test`, `npm run build` exit 0; CI green on the PR.
- AC-5: `wrangler deploy --dry-run` exits 0; `npm run preview` in the
  background, then `curl` on `/` returns 200 and a body equal to
  `dist/index.html`.
- AC-6: the `npm ci` output on Node 22 has no `install-scripts` line.
- AC-7: grep CONTRIBUTING for `brew install fnm` and `fnm use`.

## Technical approach

1. Machine, outside the repo: `brew install fnm`, then `fnm install` reads
   `.nvmrc` (Node 22.23.4, npm 10.9.9) and `fnm use` selects it.
2. Lockfile: from dev's lockfile, on Node 22, `npm audit fix` with no
   `--force`. Only `package-lock.json` changes. One commit.
3. Record: `product/tech-stack.md` toolchain line gets the new versions
   (Vite 6.4.6, `@cloudflare/vite-plugin` 1.67.0, Wrangler 4.156.1) and
   the accepted miniflare 5 beta, local only (Hedi, 2026-11-09).
4. CONTRIBUTING Setup: `brew install fnm` once per machine, `fnm use`
   in place of `nvm use`; both read `.nvmrc` (Hedi, 2026-11-09).
5. Verify (qa), review, then the roadmap checkbox closes with the spec.

Rejected: overrides on undici, ws, sharp under miniflare 4 (forces sharp
0.35 on a package built for 0.34, riskier than the bump); accepting the
advisories (they hide the next one); a new ADR (the stack choice of ADR 002
does not change, versions live in tech-stack.md per its line 3); nvm (slow
shell script, Homebrew install unsupported by its maintainers) and
`brew install node@22` (one global version, manual PATH switch).

## Data model and contracts

None. No personal data.

## Risks and open decisions

- npm 10 may resolve a different tree than the npm 11 dry run (verified on
  a scratch copy: 0 vulnerabilities, same `dist/` hashes, dry-run OK). AC-1
  and AC-3 recheck on npm 10; a difference goes back to Hedi.
- miniflare 5 beta in `wrangler dev`: AC-5 covers the preview path only.
- No open decision.

## Research notes

- Node 22.23.4 ships npm 10.9.9 (nodejs.org/dist/index.json, 2026-10-20).
- fnm 1.39.0 in Homebrew; reads `.nvmrc` and `.node-version`.
- npm 11.19.1 `allowScripts` is advisory: scripts still run, a future
  release blocks (npm docs, approve-scripts). npm 10 ignores the field.
- `npm ci --ignore-scripts` on the fixed lockfile: build, tests, esbuild,
  workerd and wrangler dry-run work (scratch copy, 2026-11-09).
- Advisory ranges: wrangler <=4.113.0, vite-plugin <=1.46.0, miniflare
  <=5.20260801.0-alpha, so no stable miniflare 4 is outside them.
