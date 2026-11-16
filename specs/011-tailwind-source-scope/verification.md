# Verification 011 - Tailwind source scope

Date: 2026-11-16 | Branch: `chore-tailwind-source-scope` | HEAD: `1a9671e` (before this report)
Base: `origin/dev` at `e668fa3` | Node 26.13.1, npm 11.20.0 (the shell's Node, not the `.nvmrc` 22), Tailwind 4.3.0

```
Verdict: PASS locally; CI pending until the PR runs
Criteria: AC-1 to AC-4 green, 0 red; AC-1 and AC-3 reworded after the first capture
Build and tests: npm ci, npm test (39 passed), npm run build exit 0
Screens: none, toolchain change; 4 full pages and 404 computed values compared to dev
Not verified and why: CI on the PR (no PR yet); Node 22 run (CI covers it)
```

## Setup

- `npm ci` first: the worktree had a stale `node_modules` with theme 0.2.0,
  which failed `src/sdkTokens.test.ts` and shifted pixels between captures.
  Every number below comes from the clean install (theme 0.3.0, react 0.2.1).
- Baseline: this branch with `src/index.css` checked out from `origin/dev`,
  served by `npm run preview` (wrangler, port 8787), captured twice with
  `specs/006-sdk-ws-upgrade/capture.mjs`. After: HEAD `1a9671e`, same
  preview, captured twice.
- Captures, CSS copies and selector lists stay in the session scratchpad.

## AC-1 - Markdown-only utilities not emitted - `ignoresUtilitiesQuotedInDocs`

An uncommitted probe, `specs/011-tailwind-source-scope/probe.md`, quoting
`ring-sky/40`, `skew-x-13` and `max-w-[123px]`, built with each line 1:

```
dev line:     .ring-sky,.ring-sky\/40{...}  .skew-x-13{...}  .max-w-\[123px\]{...}   .focus\:ring-sky\/40: 2
branch line:  none of the three                                                       .focus\:ring-sky\/40: 2
```

The probe was deleted after the run (`git status` clean). On `e668fa3`
nothing outside `src/` quotes a bare `ring-sky/40` (spec 010 is not on dev
yet and quotes the `focus:` form anyway), so the probe is what tells the
two lines apart on this base. AC-1 was reworded after the first capture
for that reason; its first wording relied on this spec's own quote.

## AC-2 - every src utility kept - `keepsEverySrcUtility`

Baseline: the branch tree at `1a9671e` with dev's line 1, so spec 011's
own `ring-sky` quote counts. The review rebuilt `e668fa3` as is and found
61 555 B and the same list minus `.ring-sky` (16 removed, 0 added, same
two variables).

```
selectors   baseline 314, branch 297, added 0
removed     .\[wrangler\:info\]  .blur  .collapse  .contents  .filter  .grow  .isolate  .lowercase
            .max-w-\[\.\.\]  .outline  .ring  .ring-sky  .rounded  .shadow  .table
            .text-\[\.\.\]  .transform
size        61 598 B (gzip 16 461) -> 58 656 B (gzip 15 987)
```

`source("../src")` still scans the whole of `src/`, so any candidate that
appears there is still emitted; the 17 removed selectors are the ones only
other files produced: `wrangler` from `AGENTS.md` and `CONTRIBUTING.md`,
`max-w-[..]` and `text-[..]` from rule 90 and `docs/audit/inventory.md`,
`ring-sky` from this spec, `filter` and `transform` from SVG attributes in
`public/logos/` and `docs/v2/mockup/img/`, the rest from rules, specs and
`docs/v2/`. `index.html` has no `class` attribute and `node_modules/` was
never scanned (gitignored), so no rendered class lives outside `src/`.
The `--tw-*` properties of the removed `filter`, `transform` and `blur`
utilities go with them.

## AC-3 - renders unchanged - `rendersUnchanged`

Noise floor, two captures of dev:

```
computed.json: 404 values compared, 0 differ
1440-dark.png: 1440x12354, 0 pixels differ
1440-light.png: 1440x12354, 0 pixels differ
390-dark.png: 780x32778, 0 pixels differ
390-light.png: 780x32778, 0 pixels differ
```

Dev against the branch:

```
DIFF light.vars.--color-slate: "#5c6795" -> undefined
DIFF light.vars.--ease-out: "cubic-bezier(0, 0, .2, 1)" -> undefined
DIFF dark.vars.--color-slate: "#5c6795" -> undefined
DIFF dark.vars.--ease-out: "cubic-bezier(0, 0, .2, 1)" -> undefined
computed.json: 404 values compared, 4 differ
1440-dark.png: 1440x12354, 0 pixels differ
1440-light.png: 1440x12354, 0 pixels differ
390-dark.png: 780x32778, 0 pixels differ
390-light.png: 780x32778, 0 pixels differ
```

Two captures of the branch diff to 0 values and 0 pixels as well. The four
differences are two declarations on `html`, not applied styles: Tailwind v4
emits a theme variable only when a utility uses it. `--color-slate`
(`src/index.css:60`) and `--ease-out` (Tailwind default) were emitted
because documents named `slate` and `ease-out` utilities; `git grep` finds
no reader in `src/` (no utility, no `var()`). The contact controls' 18
properties each, light and dark, are identical. The first wording of AC-3
required every computed value to equal dev; it was narrowed to this case
after the capture, and the change is in the spec.

## AC-4 - diff bounded, tests and build - `limitsDiffToScopeLine`

```
$ git diff --stat origin/dev   (before this report)
 specs/011-tailwind-source-scope/spec.md  | 51 +++
 specs/011-tailwind-source-scope/tasks.md | 27 +++
 src/index.css                            |  4 ++-
$ npm test
 Test Files  6 passed (6)
      Tests  39 passed (39)                                    exit 0
$ npm run build
dist/assets/index-DTULp1Lk.css   58.66 kB | gzip: 15.98 kB
dist/assets/index-DRz2Ypam.js   458.46 kB | gzip: 156.33 kB
built in 792ms                                                 exit 0
```

## Not verified

- CI on the PR: no PR yet.
- A Node 22 run: the shell has Node 26; CI runs the `.nvmrc` version.
- `--color-slate` stays declared in `@theme` with no utility reading it.
  It is dead mapping on dev already; removing it is out of scope.
