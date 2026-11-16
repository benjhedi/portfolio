# Spec 011 - Tailwind source scope

Branch: `chore-tailwind-source-scope` | Status: done (2026-11-16, review APPROVED; light flow: spec and tasks in one pass, Hedi approved the allowlist and the reworded AC-1 and AC-3)
Roadmap line: none, toolchain hygiene found by the spec 010 review.

## Why

`src/index.css` imports Tailwind v4 with automatic source detection. Its base
is the project root, so every tracked text file is scanned: `specs/`,
`docs/`, `.claude/`, `product/`, `README.md`, the workflows, even the SVG
attributes of `public/logos/`. A utility named in prose becomes real CSS in
production. Spec 010 changed only documents and the bundle still grew from
61.69 kB to 61.96 kB. On dev the leak includes `.ring`, `.shadow`,
`.rounded`, `.transform`, `.filter` and a broken `.max-w-\[\.\.\]` that no
element uses.

Hedi chose an allowlist over a denylist: `@import "tailwindcss"
source("../src");` names the one folder that may produce utilities, so a
new document folder cannot leak again. `index.html` has no `class`
attribute and needs no `@source`.

## User stories, by priority

- P1 As the maintainer, I want the production CSS to hold only the utilities `src/` uses so that writing documentation never changes the shipped bundle.
- P1 As the maintainer, I want the site to render exactly as before in both themes so that the change carries no visual effect.

## Acceptance criteria (EARS)

- AC-1 WHEN a valid utility that `src/` does not use appears only in a Markdown file outside `src/` THE production build SHALL NOT emit it: an uncommitted probe file quoting `ring-sky/40`, `skew-x-13` and `max-w-[123px]` adds `.ring-sky\/40`, `.skew-x-13` and `.max-w-\[123px\]` to `dist/assets/*.css` with dev's line 1 and none of them with this branch's, while `.focus\:ring-sky\/40`, which `src/components/ContactForm.tsx` uses, stays in both.
- AC-2 THE production CSS SHALL keep every selector the dev build emits for a class `src/` uses: the selectors removed against dev all come from files outside `src/`, and no selector is added.
- AC-3 WHEN each section is rendered in light and dark at 1440 and 390 THE page SHALL show no visible difference from dev: full-page screenshots and computed values equal dev within the noise floor of two captures of dev (spec 006 capture script), except Tailwind theme variables that no utility in `src/` reads, which Tailwind stops emitting (`--color-slate`, `--ease-out`).
- AC-4 THE diff against dev SHALL touch only `src/index.css` line 1 and its comment, and this spec folder; `npm test` and `npm run build` pass.

AC-1 and AC-3 were reworded after the first capture, once Hedi had approved the spec: AC-1 because the dev tree has no Markdown that quotes a bare `ring-sky/40`, so a probe is needed to tell the two lines apart; AC-3 because two unread theme variables disappear with zero pixel change. Hedi acknowledged both on 2026-11-16, before the PR.

## Screens and states

None: no screen changes.

## Data and rules touched

No data. Rule 50 (no new literal), rule 05 (no new dependency: `source()` is
Tailwind v4 syntax, already installed at 4.3.0).

## Out of scope

The utilities `src/` itself declares but no element renders; moving
`src/components/` (legacy) out of `src/`; any other Tailwind or Vite
setting.

## Open points

None.
