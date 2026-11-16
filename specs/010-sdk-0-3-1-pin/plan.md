# Plan 010 - SDK 0.3.1 pin

Spec: `spec.md` (clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

- Design system: `@warastudio/theme` 0.3.1 and `@warastudio/react` 0.2.2 on GitHub Packages (`npm view` lists both; react 0.2.2 depends on theme 0.3.1, theme on tokens 0.3.1) | OPEN
- Tokens: no new name; AC-2 checks the ring value and the 0.3.0 set in the installed CSS | OPEN
- Mockups: none, no layout change; the mockup's own ring reads the same token | OPEN
- Rules: 00 to 07, 05 (ADR 003 and tech-stack amended), 06 (token in `~/.npmrc`), 50, 90 (stack unchanged). 31 and 90 for the AC-6 class (a Tailwind arbitrary value composing a token is allowed). Not matched: 10 units, 60 (no layout change) | OPEN
- Skills: `commit`, `verify` | OPEN
- Constitution: 7 (tokens only), 8, 9 (same two packages, exact pin), 11 (focus rings at 3:1 both themes, the rest unchanged) | OPEN
- Architecture: no unit; one class in `src/components/ContactForm.tsx` (AC-6), a legacy `components/` file the v2 contact spec replaces | OPEN
- Verification: AC-1 `npm ls` and CI on the PR; AC-2 the installed `style.css` per selector against the 0.3.0 set, light and dark; AC-3 `specs/006-sdk-ws-upgrade/capture.mjs` on `npm run preview` (dev twice for the floor, then the branch); AC-4 a keyboard pass over CDP on the contact form, the hero toggle and the hint, both themes, with the painted ring color and its contrast against the adjacent color (WCAG formula); AC-5 `git diff --stat origin/dev`, `npm test`, `npm run build` | OPEN

## Technical approach

`npm install --save-exact @warastudio/theme@0.3.1 @warastudio/react@0.2.2`, then the doc lines and the roadmap box. AC-6: the textarea's `focus:ring-sky/40` becomes a 2 px ring in `var(--ws-color-focus-ring)`, the token the SDK `Input` already paints. The baseline is captured on dev before the install, in the scratchpad, with the spec 006 capture script reused as is. Rejected: a local ring override in `hero.css` or `index.css` (rule 50, decision log 2026-11-16); a range pin (ADR 003).

## Risks

- A value other than the ring changed between 0.3.0 and 0.3.1: AC-2 and AC-3 catch it; stop and report.
- The hero toggle ring sits on a porcelain gap: the opaque dark ring measures about 1.75:1 there (T01 estimate), so AC-4 reads the toggle as a two-color indicator (C40), ring against the gap or the video (Hedi, 2026-11-16).
- The submit button glow darkens the page under its bottom edge: about 2.4:1 there in light (T01 estimate). T04 measured the side edges at 2.84 to 2.99:1 too; AC-4 is amended and `verification.md` records the decision: side and bottom edges accepted until the v2 contact spec (Hedi, 2026-11-16).
