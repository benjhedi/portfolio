# Spec 003 - npm audit fix

Branch: `chore-npm-audit-fix` | Status: planned (clarified 2026-11-09)
Roadmap line: Phase 0, "npm audit is clean on the dev toolchain and the
local install matches CI" (Hedi, 2026-11-09).

## Why

`npm ci` on dev (f1861e3) reports 15 advisories (3 low, 1 moderate,
11 high), all in the dev and build toolchain (Vite, Wrangler,
`@cloudflare/vite-plugin`, Babel); none reaches the static site Cloudflare
serves. Left as is, they hide the next advisory that matters. The local
machine runs Node 26 (npm 11.19, which warns about unreviewed install
scripts) while `.nvmrc` and CI use Node 22 (npm 10).

## User stories, by priority

- P1 As the maintainer, I want `npm audit` clean so that a new advisory
  stands out instead of hiding among known ones.
- P1 As the maintainer, I want the shipped site byte-identical so that a
  toolchain refresh carries no visual or behavior risk.
- P2 As the maintainer, I want my local Node to match CI so that the
  lockfile I write is the one CI installs.

## Acceptance criteria (EARS)

- AC-1 WHEN `npm audit` runs on the change THE SYSTEM SHALL report 0
  vulnerabilities at every severity. The miniflare 5 beta that wrangler
  pins is accepted: it runs only in local dev and preview (Hedi, 2026-11-09).
- AC-2 THE dependency manifest SHALL stay unchanged: same ranges, no
  `overrides`, no `engines`, no `allowScripts`.
- AC-3 WHEN the site is built from the change THE files Cloudflare serves,
  `dist/` minus the paths in `dist/.assetsignore`, SHALL be identical to
  the build of dev before the change: same files, same hashes. The deploy
  config the Cloudflare plugin writes there may differ; its diff is recorded
  and the AC-5 dry-run accepts it (Hedi, 2026-11-09).
- AC-4 THE lockfile SHALL be written by the npm that ships with the
  `.nvmrc` Node, and on that Node `npm ci`, `npm test` and `npm run build`
  SHALL pass.
- AC-5 WHEN `wrangler deploy --dry-run` runs THE SYSTEM SHALL exit 0, and
  WHEN `npm run preview` is started THE local server SHALL answer 200 on
  `/` with the built `index.html`.
- AC-6 WHEN a maintainer installs on the `.nvmrc` Node THE install SHALL
  print no install-scripts warning. Policy: Node 22 locally, no repo
  allowlist (Hedi, 2026-11-09).
- AC-7 THE setup steps of CONTRIBUTING SHALL take a machine without Node 22
  to the `.nvmrc` version, naming the tool to install it.

## Screens and states

None: toolchain change, nothing rendered changes.

## Data and rules touched

No personal data. Rule 05 (tooling recorded), rule 06 (security).

## Out of scope

- Major upgrades (Vite 7, React 19, Tailwind or Vitest majors).
- An `allowScripts` allowlist: revisit when CI moves to npm 11.19 or later.
- `@warastudio/*` listing `@vanilla-extract/css` as a runtime dependency
  while using it in types only: a WaraDS fix, not this repo.
- The two unused fontsource packages (roadmap debt, Hedi decides).
