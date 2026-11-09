# Spec 005 - v2 mockup fixes

Branch: `fix-v2-mockup-defects` | Status: clarified 2026-11-09
Roadmap line: Wave 0, the v2 log, mockup and media versioned in `docs/`,
so every screen has an in-repo mockup.

## Why

The dry-run PNG export of spec 004 (the 52 PNGs its script exported from
the mockup frozen by spec 001) showed three defects: the 006 skills block
overflows to about 5000 px, hiding two of its three groups; the mobile
nav hides the "HJ" mark (constitution 1); at 1440 x 900 the fixed bottom
bar covers the hero scroll hint label. A PNG of a bug is a bad contract
(rule 60), so the mockup is fixed at its source and frozen again first.

## User stories

- P1 As the implementer of a v2 section, I want the mockup free of layout
  bugs so that the PNG I compare against is the intended design.
- P2 As the maintainer, I want the frozen copy to match a published
  artifact version so that the reference stays traceable.

## Acceptance criteria (EARS)

- AC-1 WHEN the mockup renders at 1440 x 900 and at 390 x 844 with mobile
  emulation THE document width SHALL equal the viewport width.
- AC-2 THE 006 skills section SHALL show its three groups (three columns
  on desktop, stacked under 900 px) and its marquee inside its column.
- AC-3 WHILE the viewport is 900 px wide or less THE nav SHALL show the
  "HJ" mark at the left and its controls at the right.
- AC-4 WHEN the first viewport renders at 1440 x 900 THE scroll hint line
  and its label SHALL be fully visible above the bottom bar.
- AC-5 WHEN the mockup is exported before and after the fix with the same
  settings THE PNGs SHALL differ only in skills, the mobile nav and the
  hero bottom.
- AC-6 THE claude.ai artifact SHALL hold the fix as a new version, and
  `docs/v2/mockup/` SHALL hold that version's files, each matching its
  published sha256 listed in the README; the README, the decision log and
  `product/tech-stack.md` SHALL name it; `npm test` and the build pass.

## Out of scope

Any other change to the mockup (French only, Google Fonts, open hero
points); the PNG export itself (spec 004, which resumes on the new
version); code in `src/`.
