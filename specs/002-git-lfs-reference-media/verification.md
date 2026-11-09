# Verification 002 - Git LFS for reference media

Date: 2026-11-09 | Branch: `chore-git-lfs` | HEAD: `dd99a7eadd3c1fec4108334d06c68e3c68c042fd`
Base: `dev` at `c1753e1` | Agent: qa (task T07)

```
Verdict: PASS (the AC-2 `npm test` row, first red for an environment reason, passes after `npm ci`)
Criteria: 7 green (AC-1 to AC-7)
Build and lint: build ok on both commits; no lint configured (tech-stack); `sh -n .githooks/pre-push` ok
Screens: 0 compared, none in scope (spec: Screens and states, none)
Scenarios walked: 10 test plan rows plus 3 controls, in scratch repos
Not verified and why: see "Pending on GitHub" and "Not verified"
```

Environment: macOS, `/usr/bin/git` 2.54.0 (Apple Git-157), git-lfs 3.8.1
(`/opt/homebrew/bin/git-lfs`), node v26.9.0 (`.nvmrc` says 22), ruby 4.0.7.
No global `filter.lfs.*` in the user config, before and after the run.
Scratch root: `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-eloquent-wu-f64b05/01df3d9d-5350-406a-8f7d-0a01fff68a52/scratchpad/t07`
(written `$S` below). Scratch repos ran with `HOME=$S/<case>/home` and
`GIT_CONFIG_NOSYSTEM=1`; LFS filters only through `git lfs install --local --skip-repo`.

## AC-1 - `tracksOnlyDocsVideosThroughLfs` - PASS

```
$ git check-attr filter -- docs/a.mp4 docs/x/b.webm public/hero/a.mp4 src/a.mp4 docs/a.png
docs/a.mp4: filter: lfs
docs/x/b.webm: filter: lfs
public/hero/a.mp4: filter: unspecified
src/a.mp4: filter: unspecified
docs/a.png: filter: unspecified
$ git lfs ls-files
(no output) exit=0 lines=0
```

## AC-2 - `buildsIdenticalDistWithoutLfsObjects` - PASS (npm test row red on the first run, green after `npm ci`)

The checkout has no LFS object and no LFS filter, as in CI.

`npm test`, red:

```
$ npm test
> portfolio@0.1.0 test
> vitest run --passWithNoTests
sh: vitest: command not found
npm test exit=127
```

Cause: environment. `node_modules` has 148 packages and no `vitest`
(`node_modules/vitest` absent, `.bin` has `tsc` and `vite` only); it was
installed before Vitest entered `package.json` in 152c4db. The main
checkout's `node_modules` lacks it too. `npm ci` was not run: it needs the
private `read:packages` token. `package.json` and `package-lock.json` are
identical to `dev`, so `dev` fails the same way here (inference, not run).

Supplementary evidence, not a substitute for the row: the pinned version
through npx with a scratch cache, from the worktree root. npx resolved its
own vite, not the locked 6.4.2, so it does not prove the locked toolchain.

```
$ npm_config_cache=$S/npm-cache npx --yes vitest@4.1.12 run --passWithNoTests
 RUN  v4.1.12 .../worktrees/eloquent-wu-f64b05
No test files found, exiting with code 0
npx vitest exit=0
$ git ls-files '*.test.ts' | wc -l
0
```

Build and dist identity, green:

```
$ git diff --quiet c1753e1 HEAD -- package.json package-lock.json
diff --quiet exit=0
$ npm run build            (this worktree)
vite v6.4.2 building for production...
dist/assets/index-B2LZsHKL.css   55.56 kB
dist/assets/index-c-mOF56r.js   461.05 kB
built in 787ms
build exit=0
$ git worktree add --detach $S/t07/dev-build c1753e1
HEAD is now at c1753e1 Merge pull request #26 from benjhedi/chore-adopt-kit
$ ln -s <worktree>/node_modules $S/t07/dev-build/node_modules
$ npm run build            (in dev-build)
dev build exit=0
$ diff -r $S/dist-branch $S/dev-build/dist
diff -r .../dist-branch/wrangler.json .../dev-build/dist/wrangler.json
< {"configPath":"/Users/wara/.../eloquent-wu-f64b05/wrangler.jsonc","userConfigPath":"...eloquent-wu-f64b05/wrangler.jsonc",...
> {"configPath":"/private/tmp/.../t07/dev-build/wrangler.jsonc","userConfigPath":".../t07/dev-build/wrangler.jsonc",...
diff exit=1
$ diff -r -x wrangler.json $S/dist-dev $S/dist-branch
diff exit=0
```

The only difference is the absolute checkout path the Cloudflare plugin
writes into `dist/wrangler.json`. To compare without any exclusion, both
commits were built from the same throwaway path, one after the other:

```
$ git worktree add --detach $S/same-path <rev>; ln -s node_modules; npm run build; cp -R dist; git worktree remove --force $S/same-path
build c1753e1 exit=0
build dd99a7e exit=0
$ diff -r $S/dist-same-c1753e1 $S/dist-same-dd99a7e
diff exit=0
$ git worktree list | grep -c scratchpad
0
```

33 files in `dist/`, byte-identical. All throwaway worktrees removed;
`git worktree list` shows the same six entries as before the run.

Rerun after `npm ci`, main session, Hedi's go (option A). `npm ci` used
the token already in the user `~/.npmrc`, never printed. The new
`node_modules` then rebuilt both commits from one throwaway path:

```
$ npm ci
npm ci exit 0
$ npm test
 RUN  v4.1.12 .../worktrees/eloquent-wu-f64b05
No test files found, exiting with code 0
npm test exit 0
build c1753e1 exit 0
build dd99a7e exit 0
$ diff -r dist-dev dist-branch
diff -r empty, files: 33
```

## AC-3 - three rows, all PASS

Setup: `git init --bare $S/ac3/remote.git`, clone over `file://`,
`core.hooksPath` = `<worktree>/.githooks` (absolute), `.gitattributes`
from `git show HEAD:.gitattributes`, `dev` seeded with `--no-verify`
(setup commit, the commit hooks are not under test).

`uploadsLfsObjectOnPush`:

```
$ git lfs ls-files -l
273d845fc37920cde3f05940989da84f82e36863f4af9597862e0879c9c7c468 * docs/v/a.mp4
$ git push origin chore-x
 * [new branch]      chore-x -> chore-x
push exit=0
$ find remote.git/lfs/objects -type f
remote.git/lfs/objects/27/3d/273d845fc37920cde3f05940989da84f82e36863f4af9597862e0879c9c7c468
```

Control (`$S/ac3-control`): same scenario with `core.hooksPath` on the
three hooks of `c1753e1`: push exit 0, `remote.git/lfs` does not exist.
The upload comes from the hook change.

`rejectsBranchOutsideConventionBeforeUpload` (commit on `WR/x` made with
`--no-verify`, pre-commit would refuse the branch):

```
$ git lfs ls-files -l | grep b.mp4
719aabfff6c49d5bd2bfe7a64060b4ef5e849468c4bb7e2bf23e0309c56037b0 * docs/v/b.mp4
$ git push origin WR/x
Push rejected: branch 'WR/x' does not follow  type-title.
  accepted types : feat, fix, chore, docs, refactor, test, perf, ci
error: failed to push some refs to 'file:///.../ac3/remote.git'
push exit=1
$ find remote.git/lfs/objects -type f
remote.git/lfs/objects/27/3d/273d845f...c468      (object a only)
object b 719aabff...37b0 absent on remote
$ git ls-remote origin
refs/heads/chore-x, refs/heads/dev               (no WR/x)
```

Message unchanged: the two `echo` lines are identical at `c1753e1`
(lines 20-21) and HEAD (lines 23-24) of `.githooks/pre-push`.

`warnsAndPushesWhenGitLfsMissing` (fresh clone without LFS filters, as on
a machine that never installed git-lfs):

```
PATH=/usr/bin:/bin:/usr/sbin:/sbin
$ command -v git-lfs: []
$ git push origin chore-y
Warning: git-lfs not found, LFS objects not uploaded (see CONTRIBUTING.md).
 * [new branch]      chore-y -> chore-y
push exit=0
```

Other hooks unchanged:

```
$ git diff --stat c1753e1 HEAD -- .githooks
 .githooks/pre-push | 17 +++++++++++++++--
 1 file changed, 15 insertions(+), 2 deletions(-)
pre-commit: a7ae14849a22ab4f7e11b9b38fb13ebf03f7e6f0 (c1753e1) = a7ae14849a22ab4f7e11b9b38fb13ebf03f7e6f0 (HEAD)
commit-msg: 8985aa305be4c13f8f21424a3923c4010cdb98f2 (c1753e1) = 8985aa305be4c13f8f21424a3923c4010cdb98f2 (HEAD)
$ sh -n .githooks/pre-push
exit=0
```

## AC-4 - `recordsScopeReasonAlternativeAndQuota` - PASS

`docs/adr/004-git-lfs-reference-media.md`:

```
-- scope
36:- `.gitattributes` tracks `docs/**/*.mp4` and `docs/**/*.webm` only;
37:  `public/` and `src/` never go through LFS.
-- reason
33:reference videos will be re-exported as the mockup evolves, and their
34:binaries must not pile up in the plain history.
-- plain-git alternative and why it lost
19:**A - Plain git**
32:Adopt **B**, Hedi's choice over the plain-git recommendation: the
-- quota
27:- (-) GitHub quota: 10 GiB storage and 10 GiB bandwidth a month on Free
58:- over quota with no payment method, pushes of LFS files are blocked and
59:  clones get pointers only (GitHub docs, Git LFS billing, read 2026-11-09)
```

The quota figures were not rechecked against GitHub docs by qa.

## AC-5 - `namesSetupStepAndFailure` - PASS

```
$ grep -n ... CONTRIBUTING.md
12:git lfs install --skip-repo   # once per machine: LFS filters, no hooks (ADR 004)
21:(`brew install git-lfs`). Skip the step and a new video goes up as a plain
22:blob, and the `lfs-pointers` CI job fails the PR. A plain `git lfs install`
23:stops on the existing pre-push hook, hence `--skip-repo`:
```

## AC-6 - `logsKitDriftAndKitRequest` - PASS

```
$ grep -n '^## ' product/roadmap.md
39:## Debt left by the kit adoption ([inv] gap table)
46:## Evolution triggers that touch the architecture
$ grep -n 'Kit drift' product/roadmap.md
44:- Kit drift: `.githooks/pre-push` carries the Git LFS upload (spec 002, ADR 004); a wara-kit hook update, or `git lfs update --force`, would drop it. Request to wara-kit: an LFS-aware pre-push or a hook extension point, so this repo can return to the kit copy.
```

Line 44 sits inside the debt section (39 to 45).

## AC-7 - `failsOnPlainBlobMatchingLfsRules` and `passesOnLfsPointers` - PASS

YAML and the command, extracted from the committed file:

```
$ ruby -ryaml -e '... YAML.load_file(".github/workflows/ci.yml") ...'
parsed ok
jobs: build, lfs-pointers
lfs-pointers if: github.event_name == 'pull_request'
checkout with: {"fetch-depth" => 0}
run:
git lfs version
git lfs fsck --pointers "$BASE_SHA..$HEAD_SHA"
env: BASE_SHA = github.event.pull_request.base.sha, HEAD_SHA = github.event.pull_request.head.sha
build checkout with: nil      (build job keeps its default shallow checkout)
```

The `run` block was written to `$S/ac7/job-step.sh` as is and run with
`bash --noprofile --norc -eo pipefail` (the Actions default shell).

`failsOnPlainBlobMatchingLfsRules`:

```
(no lfs filter: committed as plain blob, 2048 bytes)
$ BASE_SHA=383023aa... HEAD_SHA=ddac8f36... bash ... job-step.sh
git-lfs/3.8.1 (GitHub; darwin arm64; go 1.27.3)
pointer: unexpectedGitObject: "docs/v/a.mp4" (treeish ddac8f36af340c490bb6d9806d541ba8637c69e7) should have been a pointer but was not
step exit=1
```

`passesOnLfsPointers`:

```
8940aba60b * docs/v/a.mp4
09df8f4f67 * docs/v/b.webm
$ BASE_SHA=383023aa... HEAD_SHA=ffbfb062... bash ... job-step.sh
git-lfs/3.8.1 (GitHub; darwin arm64; go 1.27.3)
Git LFS fsck OK
step exit=0
```

Extra cases from the plan's research notes:

- Blob in one commit, replaced by a pointer later in the range: `pointer:
  unexpectedGitObject: "docs/v/a.mp4" (treeish a44d2d3e...)`, exit 1.
- Plain `public/hero/a.mp4`: `Git LFS fsck OK`, exit 0 (not matched).

## Style

```
$ git diff --name-only c1753e1 HEAD | xargs perl -CSD -ne 'print if /[\x{2013}\x{2014}\x{2018}\x{2019}\x{201C}\x{201D}]/'
matches: 0
positive control (printf 'a <U+2014> b'): hit
```

Ten changed files checked. `ci.yml` keeps a French comment on line 3, it
predates this branch.

## Pending on GitHub

- The `lfs-pointers` job running green on the PR, with git-lfs present on
  `ubuntu-latest` (proved by its `git lfs version` step).
- The CI `build` job green on the PR, on node 22 with a clean `npm ci`.
- The first real LFS upload to GitHub, at spec 001's push.

## Not verified

- Builds ran on node 26.9.0, not 22 from `.nvmrc`; both commits used the
  same node, so the comparison holds, but not on the CI version.
- Pushing from this worktree runs the `dev` hook today: its
  `config.worktree` sets `core.hooksPath` to the main checkout's
  `.githooks/` (risk already in plan.md, spec 001 must push after the
  main checkout pulls the merged `dev`).
