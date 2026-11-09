# Tasks 003 - npm audit fix

Plan: `plan.md` (all gates OPEN) | Branch: `chore-npm-audit-fix` off `dev`

Toolchain change: the architecture rule's construction order covers `src/`
only, so the order here is machine, lockfile, then the documents that
record it. No `[P]`: T02 and T03 share no file, but each is a few lines and
sequential is cheaper than worktrees.

## Tasks

- [x] T00 Node 22 on the machine, outside the repo: `brew install fnm`,
  `fnm install`, `fnm use` - files: none, no commit - check: `node -v`
  v22.23.x, `npm -v` 10.9.x - agent: Hedi, or the main session on his go
- [x] T01 lockfile refreshed by `npm audit fix` on Node 22, no `--force`
  - files: `package-lock.json` - check: `npm -v` 10.9.x, `npm audit` 0
  vulnerabilities, `git diff dev -- package.json` empty - agent: setup-agent
- [x] T02 toolchain versions and the accepted miniflare beta - files:
  `product/tech-stack.md` - check: grep the versions T01 resolved for Vite,
  `@cloudflare/vite-plugin`, Wrangler, and the miniflare line - agent: setup-agent
- [x] T03 fnm setup step - files: `CONTRIBUTING.md` - check: grep
  `brew install fnm` and `fnm use`, no `nvm use` left - agent: setup-agent
- [ ] T04 verify - all AC checks below green - files:
  `specs/003-npm-audit-fix/verification.md` - agent: qa
- [ ] T05 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` status to done and checks the roadmap line -
  files: `spec.md`, `product/roadmap.md` - agent: review-agent

## Test plan (derived from the EARS criteria)

Shell and build checks, run by qa and recorded with their output in
`verification.md`; none is a committed test (ADR 001 sets Vitest for
TypeScript units, the spec asks none).

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | `npm audit` on Node 22 prints 0 vulnerabilities | command | `reportsZeroVulnerabilities` |
| AC-2 | `package.json` identical to dev, no overrides | `git diff` | `keepsManifestUnchanged` |
| AC-3 | served files of the branch build equal the f1861e3 build; `wrangler.json` diff recorded | build and `diff -r` without the `.assetsignore` paths | `buildsIdenticalServedFiles` |
| AC-4 | lockfile written by npm 10.9.x; `npm ci`, `npm test`, `npm run build` exit 0 on Node 22 | commands | `installsTestsAndBuildsOnNode22` |
| AC-4 | CI green on the PR | CI run | `passesCiOnPullRequest` |
| AC-5 | `wrangler deploy --dry-run` exits 0 | command | `rehearsesDeploy` |
| AC-5 | `npm run preview` answers 200 on `/` with `dist/index.html` | curl and diff | `servesHomeInPreview` |
| AC-6 | `npm ci` output on Node 22 has no install-scripts line | grep on output | `installsWithoutScriptsWarning` |
| AC-7 | CONTRIBUTING names `brew install fnm` and `fnm use` | grep | `namesFnmSetup` |

## Done when

- All boxes checked, T01 to T05 each with its commit on the branch.
- qa report attached (build, tests, scenarios; no screenshot, no screen).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done, roadmap line checked.
