# Verification 003 - npm audit fix

Date: 2026-11-09 | Branch: `chore-npm-audit-fix` | HEAD: `be46a277f4bb396980aa0cdf8a71eb56cdddf04f`
Base: `dev` at `f1861e3` | Agent: qa (task T04)

```
Verdict: PASS (AC-3 red on the first run against the original wording; green on the rerun after Hedi rescoped it to the served files, 2026-11-09)
Criteria: 6 green (AC-1, AC-2, AC-3, AC-5, AC-6, AC-7), 0 red; AC-4 green locally, its CI row pending
Build and lint: build ok on Node 22 for f1861e3 and be46a27; no lint or format config exists in this repo (no ESLint, Prettier or Biome file, no lint script)
Screens: none, toolchain change
Scenarios walked: 9 test plan rows; same-path rebuild of both commits, twice; `/wrangler.json` probe on the preview
Not verified and why: AC-4 CI row (no PR yet), no positive control for the AC-6 grep, `npm run dev` not started, no real deploy; see "Not verified"
```

History: the first run checked AC-3 as then written ("`dist/` output
identical") and found it red on `dist/wrangler.json` only. Hedi rescoped
AC-3 on 2026-11-09 to the files Cloudflare serves, `dist/` minus the paths
in `dist/.assetsignore`, with the deploy config diff recorded (spec, plan
Verification and tasks row `buildsIdenticalServedFiles`, uncommitted edits
at the time of the rerun). AC-3 was rerun alone; the other rows are from
the first run.

Environment: macOS, fnm, every command prefixed with
`eval "$(fnm env --shell zsh)" && fnm use --silent-if-unchanged`.

```
$ node -v && npm -v && cat .nvmrc
v22.23.4
10.9.9
22
```

Scratch root: `/private/tmp/claude-501/-Users-wara-Documents-Developpement-Personnel-IA-Projects-Portfolio--claude-worktrees-gifted-curie-24840c/ee2ccffa-66fb-4d23-9936-4dfa35b471c3/scratchpad`
(written `$S` below). `npm ci` used the token already in the user
`~/.npmrc`; every captured log was piped through `grep -viE 'token|authtoken'`
and the file was never read.

## AC-1 - `reportsZeroVulnerabilities` - PASS

```
$ npm audit
found 0 vulnerabilities
audit exit=0
$ npm audit --json | metadata.vulnerabilities
{"info":0,"low":0,"moderate":0,"high":0,"critical":0,"total":0}
```

Baseline for contrast, `npm ci` of f1861e3 on the same npm:
`15 vulnerabilities (3 low, 1 moderate, 11 high)`.

Resolved toolchain:

```
$ npm ls vite wrangler @cloudflare/vite-plugin miniflare
+-- @cloudflare/vite-plugin@1.68.0
| +-- miniflare@5.20261103.0-beta
+-- vite@6.4.6
`-- wrangler@4.157.0
  `-- miniflare@5.20261103.0-beta deduped
```

## AC-2 - `keepsManifestUnchanged` - PASS

```
$ git diff dev -- package.json | wc -l
       0
$ grep -c overrides package.json
0
$ grep -cE '"(engines|allowScripts)"' package.json
0
$ git diff --name-only dev..HEAD | grep package
package-lock.json
```

## AC-3 - `buildsIdenticalServedFiles` - PASS (rerun)

Method: both commits built from one throwaway path, one after the other,
each with its own `npm ci`, on Node 22; the path then removed. Outputs in
`$S/r2/`.

```
$ git worktree add --detach $S/same-path <rev>; npm ci; npm run build; cp -R dist $S/r2/dist-<rev>; git worktree remove --force $S/same-path
node v22.23.4 npm 10.9.9
npm ci f1861e3 exit=0    vite v6.4.2 building for production...   build f1861e3 exit=0
npm ci be46a27 exit=0    vite v6.4.6 building for production...   build be46a27 exit=0
$ git worktree list | grep -c scratchpad
0
```

Both builds list the same `.assetsignore` entries:

```
$ od -c $S/r2/dist-be46a27/.assetsignore
w r a n g l e r . j s o n \n . d e v . v a r s \n
$ cmp $S/r2/dist-f1861e3/.assetsignore $S/r2/dist-be46a27/.assetsignore
cmp .assetsignore exit=0
```

Served files, one `--exclude` per path of the branch's `.assetsignore`:

```
$ diff -r --exclude=wrangler.json --exclude=.dev.vars $S/r2/dist-f1861e3 $S/r2/dist-be46a27
diff -r served exit=0
```

`--exclude` matches a basename at any depth; it hides only
`dist/wrangler.json` in each build, and `.dev.vars` exists in neither
(`find -name wrangler.json -o -name .dev.vars` lists the top-level
`wrangler.json` only).

| | f1861e3 | be46a27 |
|---|---|---|
| served files (32, `.assetsignore` included), sha256 of the sorted hash list | `920679942a011f55` | `920679942a011f55` |
| `wrangler.json` (deploy config, not served) | `cb912209f7a31945` | `f4e25e2b375967f3` |

Recorded deploy config diff, unchanged from the first run:

```
$ diff -r $S/r2/dist-f1861e3 $S/r2/dist-be46a27
diff -r $S/r2/dist-f1861e3/wrangler.json $S/r2/dist-be46a27/wrangler.json
full diff exit=1
$ diff <(tr ',' '\n' < f1861e3/wrangler.json) <(tr ',' '\n' < be46a27/wrangler.json)
5d4
< "legacy_env":true
18a18
> "exports":{}
23a24
> "connect":[]
35a37
> "k2":[]
```

Cause: `@cloudflare/vite-plugin` 1.39.1 to 1.68.0 writes a different deploy
config. The AC-5 dry-run reads this file (`Configuration being used:
"dist/wrangler.json"`) and exits 0. The preview serves the SPA fallback on
`/wrangler.json`, byte-equal to `dist/index.html`.

### First run, against the original AC-3 wording - FAIL (superseded)

The original text was "THE `dist/` output SHALL be identical: same files,
same hashes". Kept as evidence; the diff it found is the deploy config
diff above.

Cross-path run, as the plan states it: baseline in
`git worktree add --detach $S/base-f1861e3 f1861e3`, `npm ci`, `npm run build`;
branch built in this worktree after a clean `npm ci`.

```
base npm ci exit=0
base build exit=0        vite v6.4.2 building for production...
build exit=0             vite v6.4.6 building for production...   (branch)
$ diff -r $S/base-f1861e3/dist $S/dist-branch
diff -r .../base-f1861e3/dist/wrangler.json .../dist-branch/wrangler.json
diff -r exit=1
$ diff -r -x wrangler.json $S/base-f1861e3/dist $S/dist-branch
diff -r -x wrangler.json exit=0
```

`dist/wrangler.json` embeds the checkout path (known from verification
002). With the path normalized it still differs. To remove the path from
the question, both commits were built from one throwaway path, one after
the other, each with its own `npm ci`:

```
$ git worktree add --detach $S/same-path <rev>; npm ci; npm run build; cp -R dist; git worktree remove --force $S/same-path
node v22.23.4 npm 10.9.9
npm ci f1861e3 exit=0    build f1861e3 exit=0
npm ci be46a27 exit=0    build be46a27 exit=0
$ diff -r $S/dist-same-f1861e3 $S/dist-same-be46a27
diff -r $S/dist-same-f1861e3/wrangler.json $S/dist-same-be46a27/wrangler.json
same-path diff -r exit=1
$ find $S/dist-same-be46a27 -type f | wc -l
      33
```

The difference, field by field (`tr ',' '\n'` on both files):

```
5d4
< "legacy_env":true
18a18
> "exports":{}
23a24
> "connect":[]
35a37
> "k2":[]
```

Hashes (sha256, first 16 hex):

| | f1861e3 | be46a27 |
|---|---|---|
| 32 files other than `wrangler.json`, hash of the sorted list | `920679942a011f55` | `920679942a011f55` |
| `wrangler.json` | `cb912209f7a31945`, 1549 bytes | `f4e25e2b375967f3`, 1565 bytes |

Cause: the lockfile moves `@cloudflare/vite-plugin` from 1.39.1 to 1.68.0,
and the plugin writes a different deploy config into `dist/wrangler.json`.
`index.html`, the JS and CSS bundles and every public asset are identical.

What the file is, measured, not a judgment on the criterion:

- Not uploaded as an asset: `dist/.assetsignore` lists `wrangler.json`
  on both builds.
- Not served: on the branch preview, `curl http://localhost:8787/wrangler.json`
  returns 200 with the SPA fallback, byte-equal to `dist/index.html`.
- Read by `wrangler deploy`: the dry-run prints
  `Configuration being used: "dist/wrangler.json"`, and it exits 0 (AC-5).

The original AC-3 said "same files, same hashes" for `dist/`, so the row
was red. Hedi settled the scope on 2026-11-09 (served files only, deploy
config diff recorded); the rerun above is the row of record.

Cleanup: `git worktree remove --force` on `$S/base-f1861e3` and on
`$S/same-path` after each use; `git worktree list | grep -c scratchpad` is 0,
the list shows the same 7 entries as before the run.

## AC-4 - `installsTestsAndBuildsOnNode22` - PASS

```
$ rm -rf node_modules dist && npm ci
added 170 packages, and audited 171 packages in 2s
34 packages are looking for funding
found 0 vulnerabilities
npm ci exit=0
$ git status --short package-lock.json | wc -l
       0
$ npm test
No test files found, exiting with code 0
include: **/*.{test,spec}.?(c|m)[jt]s?(x)
npm test exit=0
$ git ls-files '*.test.ts' '*.test.tsx' | wc -l
       0
$ npm run build
> tsc -b && vite build
dist/index.html                          1.76 kB
dist/assets/index-B2LZsHKL.css          55.56 kB
dist/assets/index-c-mOF56r.js          461.05 kB
built in 951ms
build exit=0
```

`npm test` runs `vitest run --passWithNoTests` with zero test files: exit 0
proves Vitest starts on Node 22, not any behavior.

Lockfile author: commit 9400b39 says "npm 10.9.9 wrote it, the npm CI
installs with"; `npm -v` is 10.9.9 on the `.nvmrc` Node; `lockfileVersion`
is 3 on both dev and the branch; `npm ci` leaves `package-lock.json`
untouched. npm writes no author field into the lockfile, so the commit
message is the only direct record. CI uses `node-version: 22` in
`ci.yml` line 20 and `release.yml` line 26.

## AC-4 - `passesCiOnPullRequest` - PENDING

No PR exists for `chore-npm-audit-fix` (`gh pr list --head chore-npm-audit-fix`
returns nothing). Not green, not red.

## AC-5 - `rehearsesDeploy` - PASS

```
$ npx wrangler deploy --dry-run --outdir $S/wrangler-out
 wrangler 4.157.0
Using redirected Wrangler configuration.
 - Configuration being used: "dist/wrangler.json"
 - Original user's configuration: "wrangler.jsonc"
Read 37 files from the assets directory .../gifted-curie-24840c/dist
Total Upload: 0.31 KiB / gzip: 0.22 KiB
No bindings found.
--dry-run: exiting now.
dry-run exit=0
$ ls $S/wrangler-out
no-op-worker.js  no-op-worker.js.map  README.md
```

37 is 33 files plus the 4 asset folders.

## AC-5 - `servesHomeInPreview` - PASS

`npm run preview` started in the background, log in `$S/preview.log`.

```
 wrangler 4.157.0 (update available 4.159.0)
Using redirected Wrangler configuration.
Starting local server...
[wrangler:info] Ready on http://localhost:8787
$ curl -s -o $S/home.html -w '%{http_code}' http://localhost:8787/
http_code=200
$ diff $S/home.html dist/index.html
diff exit=0
$ wc -c $S/home.html dist/index.html
    1757 $S/home.html
    1757 dist/index.html
```

Nothing injected. This path runs miniflare 5.20261103.0-beta:
`grep -iE 'warn|error|beta|deprecat' $S/preview.log` returns no line.
Besides the ready line, wrangler printed an "update available 4.159.0"
notice and a list of local explorer routes.

Shutdown: `pkill -TERM` on the `npm run preview` and
`.bin/wrangler dev` processes started here (npm 57935, sh 57958, wrangler
58000, node 58001, esbuild 58002, workerd 58003 and 58004), then on the
remaining workerd. After it:

```
$ ps -axo pid,command | grep -E 'npm run preview|wrangler|workerd' | grep -v grep | wc -l
       0
$ lsof -nP -iTCP:8787 -sTCP:LISTEN | wc -l
       0
$ curl -s --max-time 2 http://localhost:8787/
000 (exit 7, connection refused)
```

No wrangler or workerd process was running before the start (count 0).

## AC-6 - `installsWithoutScriptsWarning` - PASS

Full output of the AC-4 `npm ci` in `$S/npm-ci-branch.log` (7 lines).

```
$ grep -c install-scripts $S/npm-ci-branch.log
0
$ grep -ciE warn $S/npm-ci-branch.log
0
```

## AC-7 - `namesFnmSetup` - PASS

```
$ grep -n 'brew install fnm' CONTRIBUTING.md
9:brew install fnm              # once per machine
$ grep -n 'fnm use' CONTRIBUTING.md
10:fnm install && fnm use        # Node 22 from .nvmrc, with the npm 10 CI uses
$ grep -c 'nvm use' CONTRIBUTING.md
0
```

Outside `specs/003`, no tracked Markdown, YAML or shell file says `nvm use`.

## Style

```
$ git diff --name-only dev..HEAD | grep -v package-lock.json | xargs perl -CSD -ne 'print if /[\x{2013}\x{2014}\x{2018}\x{2019}\x{201C}\x{201D}]/'
(no match)
positive control (printf 'a <U+2014> b'): hit
```

## Other findings

- `plan.md` step 3 first named `@cloudflare/vite-plugin` 1.67.0 and
  Wrangler 4.156.1. Rechecked after the coordinator's fix: line 50 now says
  1.68.0 and 4.157.0, equal to the lockfile (`node_modules/@cloudflare/vite-plugin`
  1.68.0, `node_modules/wrangler` 4.157.0) and to `product/tech-stack.md`
  line 26. Resolved.
- Wrangler prints "Cloudflare collects anonymous telemetry about your usage
  of Wrangler" on the dry-run. This is tooling telemetry, not site
  analytics; recorded for Hedi, no rule decides it here.

## Status at the end

```
$ git status --short    (after the AC-3 rerun)
 M specs/003-npm-audit-fix/plan.md
 M specs/003-npm-audit-fix/spec.md
 M specs/003-npm-audit-fix/tasks.md
?? specs/003-npm-audit-fix/verification.md
$ git check-ignore -v .wrangler/ dist/
.gitignore:19:.wrangler	.wrangler/
.gitignore:5:dist/	dist/
```

## Not verified

- AC-4 `passesCiOnPullRequest`: no PR yet.
- No positive control for the AC-6 grep: an `npm ci` on npm 11.19 would
  show the warning line the grep looks for, but it would rewrite this
  worktree's `node_modules` on another npm. The pattern comes from the
  spec, not from a captured warning.
- `npm run dev` (Vite dev server with miniflare 5 through the Cloudflare
  plugin) was not started; AC-5 covers `preview` only, as the plan's risk
  note says.
- A real `wrangler deploy` was not run (dry-run only, by design).
