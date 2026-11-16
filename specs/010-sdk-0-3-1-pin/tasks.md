# Tasks 010 - SDK 0.3.1 pin

Plan: `plan.md` (all gates OPEN) | Branch: `chore-sdk-0-3-1` off `dev`

Toolchain change, no unit: baseline, pin, record, verify, review. No `[P]`.

## Tasks

- [ ] T01 baseline on dev: build, `npm run preview`, two captures with `specs/006-sdk-ws-upgrade/capture.mjs` into the scratchpad (noise floor), 0.3.0 `--ws-*` values light and dark from the installed CSS, keyboard pass with ring colors and contrasts - files: none, no commit - check: the two captures diff to 0 values, pixel floor shown - agent: qa
- [ ] T02 pin: `npm install --save-exact @warastudio/theme@0.3.1 @warastudio/react@0.2.2` - files: `package.json`, `package-lock.json` - check: `npm ls @warastudio/theme @warastudio/react`, `npm test`, `npm run build` - agent: setup-agent
- [ ] T03 record: ADR 003 amended (0.3.1 and 0.2.2, date, the ring values and why), `product/tech-stack.md` table and Design line, `CLAUDE.md` SDK line - files: `docs/adr/003-wara-ds-sdk.md`, `product/tech-stack.md`, `CLAUDE.md` - check: `git grep -n "0\.3\.0\|0\.2\.1"` on those three files shows only history lines - agent: setup-agent
- [ ] T03b textarea ring on the token (AC-6): `focus:ring-sky/40` becomes a 2 px ring in `var(--ws-color-focus-ring)` - files: `src/components/ContactForm.tsx` - check: `grep -n "ring-sky" src/components/ContactForm.tsx` empty; `npm run build`; `npx vitest run src/sdkTokens.test.ts` - agent: developer
- [ ] T04 verify AC-1 to AC-6 - files: `specs/010-sdk-0-3-1-pin/verification.md` - agent: qa
- [ ] T05 review - diff against dev - agent: review-agent

## Test plan (derived from the EARS criteria)

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | exact pins in the manifest, `npm ci` clean on Node 22, CI green on the PR | shell, CI | `pinsSdkExactly` |
| AC-2 | ring `#2f7fc4` light and `#41c0f2` dark; every other 0.3.0 `--ws-*` keeps its value | diff on installed CSS | `changesOnlyFocusRingToken` |
| AC-3 | computed JSON equal to dev, screenshots within the floor, 1440 and 390, both themes | capture script | `rendersUnchangedOutsideFocus` |
| AC-4 | form fields, hint, submit top and sides, toggle ring against gap or video, at 3:1 or more, both themes; submit bottom edge recorded; form behavior unchanged | keyboard pass over CDP | `paintsFocusRingAtThreeToOne` |
| AC-6 | the textarea paints `--ws-color-focus-ring`; no `ring-sky` left in the form | keyboard pass and grep | `drawsTextareaRingFromToken` |
| AC-5 | diff limited to the listed files; `npm test`, `npm run build` exit 0 | shell | `limitsDiffToPinAndRecords` |

## Done when

- All boxes checked, each with its commit on the branch (T01 has none).
- qa report attached; review verdict APPROVED.
- `spec.md` status set to done; the roadmap focus ring line checked.
