# Plan 009 - SDK 0.3.0 pin

Spec: `spec.md` (clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

- Design system: `@warastudio/theme` 0.3.0 and `@warastudio/react` 0.2.1 on GitHub Packages (`npm view` lists both; react 0.2.1 depends on theme 0.3.0, theme on tokens 0.3.0) | OPEN
- Tokens: the four requested tokens are the release's purpose; AC-2 checks them and the 0.2.0 set in the installed CSS | OPEN
- Mockups: none, no screen | OPEN
- Rules: 00 to 07, 05 (ADR 003 and tech-stack amended), 06 (token in `~/.npmrc`), 50, 90 (stack unchanged). Not matched: 10 units, 30, 31, 60 (no `src/` change) | OPEN
- Skills: `commit`, `verify` | OPEN
- Constitution: 7 (tokens only), 8, 9 (same two packages, exact pin), 11 (computed styles unchanged in both themes) | OPEN
- Architecture: no unit, no `src/` file | OPEN
- Verification: AC-1 `npm ls` and CI on the PR; AC-2 a grep of the installed `style.css` for the four names and a diff of every 0.2.0 `--ws-*` value, light and dark; AC-3 `specs/006-sdk-ws-upgrade/capture.mjs` on `npm run preview` (dev twice for the floor, then the branch), computed JSON and pixel diff; AC-4 the spec 006 keyboard pass on the contact form; AC-5 `git diff --stat origin/dev`, `npm test`, `npm run build` | OPEN

## Technical approach

`npm install --save-exact @warastudio/theme@0.3.0 @warastudio/react@0.2.1`, then the three doc lines. The baseline is captured on dev before the install, in the scratchpad, with the spec 006 capture script reused as is (no copy). Rejected: a range pin (ADR 003 pins exactly); upgrading `@warastudio/motion` (not a dependency of the site).

## Risks

- A token value changed between 0.2.0 and 0.3.0 would show in AC-2 and AC-3: stop and report, never accept a visual change silently.
- Screenshot noise: the spec 006 floor method (two captures of dev) separates noise from change.
