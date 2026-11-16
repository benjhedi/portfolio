# Tasks 011 - Tailwind source scope

Spec: `spec.md` (light flow, no plan.md) | Branch: `chore-tailwind-source-scope` off `dev`

Toolchain change, no unit: baseline, scope, verify, review. No `[P]`.

## Tasks

- [x] T01 baseline on dev: `npm run preview`, two captures with `specs/006-sdk-ws-upgrade/capture.mjs` into the scratchpad (noise floor), dev CSS kept for the selector diff - files: none, no commit - check: the two captures diff to 0 values, 0 pixels - agent: qa
- [x] T02 scope: `@import "tailwindcss" source("../src");` on `src/index.css` line 1, with a comment giving the reason - files: `src/index.css` - check: `npm run build`, grep of AC-1 - agent: setup-agent
- [x] T03 verify AC-1 to AC-4 - files: `specs/011-tailwind-source-scope/verification.md` - agent: qa
- [x] T04 review - diff against dev - agent: review-agent

## Test plan (derived from the EARS criteria)

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | uncommitted probe Markdown quoting three utilities `src/` does not use: emitted with dev's line 1, absent with the branch's; `.focus\:ring-sky\/40` present in both | probe build, grep on `dist/assets/*.css` | `ignoresUtilitiesQuotedInDocs` |
| AC-2 | selectors of the dev CSS minus this branch's: each one traced to a file outside `src/`; none added | selector diff | `keepsEverySrcUtility` |
| AC-3 | computed JSON equal to dev except unread theme variables (`--color-slate`, `--ease-out`), screenshots within the floor, 1440 and 390, both themes | capture script | `rendersUnchanged` |
| AC-4 | diff limited to the listed files; `npm test`, `npm run build` exit 0 | shell | `limitsDiffToScopeLine` |

## Done when

- All boxes checked, each with its commit on the branch (T01 has none).
- qa report attached; review verdict APPROVED.
- `spec.md` status set to done.
