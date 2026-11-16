# Tasks 009 - SDK 0.3.0 pin

Plan: `plan.md` (all gates OPEN) | Branch: `chore-sdk-0-3-0` off `dev`

Toolchain change, no unit: baseline, pin, record, verify, review. No `[P]`.

## Tasks

- [x] T01 baseline on dev: build, `npm run preview`, two captures with `specs/006-sdk-ws-upgrade/capture.mjs` into the scratchpad (noise floor), 0.2.0 `--ws-*` values light and dark from the installed CSS - files: none, no commit - check: the two captures diff to 0 values, pixel floor shown - agent: qa
- [x] T02 pin: `npm install --save-exact @warastudio/theme@0.3.0 @warastudio/react@0.2.1` - files: `package.json`, `package-lock.json` - check: `npm ls @warastudio/theme @warastudio/react`, `npm test`, `npm run build` - agent: setup-agent
- [x] T03 record: ADR 003 amended (0.3.0 and 0.2.1, date, the four tokens and why), `product/tech-stack.md` table and Design line, `CLAUDE.md` SDK line - files: `docs/adr/003-wara-ds-sdk.md`, `product/tech-stack.md`, `CLAUDE.md` - check: `git grep -n "0.2.0"` on those three files shows only history lines - agent: setup-agent
- [x] T04 verify AC-1 to AC-5 - files: `specs/009-sdk-0-3-0-pin/verification.md` - agent: qa
- [x] T05 review - diff against dev - agent: review-agent

## Test plan (derived from the EARS criteria)

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | exact pins in the manifest, `npm ci` clean on Node 22, CI green on the PR | shell, CI | `pinsSdkExactly` |
| AC-2 | four new names present; every 0.2.0 `--ws-*` keeps its value, light and dark | grep and diff on installed CSS | `addsFourTokensWithoutChangingOthers` |
| AC-3 | computed JSON equal to dev, screenshots within the floor, 1440 and 390, both themes | capture script | `rendersV1Unchanged` |
| AC-4 | contact Button and Input render, focus, states, submit | keyboard pass | `keepsContactFormBehavior` |
| AC-5 | diff limited to the listed files; `npm test`, `npm run build` exit 0 | shell | `limitsDiffToPinAndRecords` |

## Done when

- All boxes checked, each with its commit on the branch (T01 has none).
- qa report attached; review verdict APPROVED.
- `spec.md` status set to done; `feat-v2-hero` rebased on dev once this merges, then spec 007 resumes at T19.
