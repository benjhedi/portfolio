# Spec 004 - v2 mockup screens

Branch: `docs-v2-mockup-screens` | Status: done 2026-11-10
Roadmap line: Wave 0, open until the PNG follow-up exports one PNG per section, light and dark.

## Why

Rule 60 counts a mockup only with one PNG per screen and a README listing
the screens; spec 001 froze the v2 mockup without them, so no v2 screen
spec passes its mockup gate (constitution 7). Terms: screen = a section of
the one-page mockup, or the preloader; frozen = every animation paused at
the moment this spec names, with the mockup files untouched.

## User stories

- P1 As the implementer of a v2 section, I want its PNG in light and dark,
  desktop and mobile, so that I compare my build to a fixed contract.
- P2 As a reviewer, I want each screen described in the README so that I
  check it without serving the mockup.

## Acceptance criteria (EARS)

- AC-1 THE repo SHALL hold 12 screens in page order: preloader, hero,
  statement, clients marquee, projects, 002 about, 003 offers, 004
  process, 005 career, 006 skills, 007 contact, footer.
- AC-2 EACH screen SHALL exist in light and dark, at 1440 px wide 1x and
  390 px wide 2x; the hero SHALL also exist under reduced motion (poster)
  in the same four: 52 PNGs, each the full height of its screen.
- AC-3 THE hero PNGs SHALL show the fixed nav and bottom bar, other PNGs
  their section alone; the preloader SHALL show "HJ" and "0%" ([log]).
- AC-4 THE motion hero SHALL be frozen on the first loop with the RIDE app
  at its emerge peak (72 %), the scroll hint line drawn; every marquee at
  its start; no element SHALL be left unrevealed, cut or overlapping.
- AC-5 THE PNGs SHALL go through Git LFS under `docs/`, ADR 004 amended;
  `public/` stays plain git and `lfs-pointers` passes.
- AC-6 THE README SHALL describe each screen (purpose, layout, states,
  interactions, reduced motion), the repeatable export procedure, and list
  every PNG with the count; the folder SHALL match the list exactly.
- AC-7 THE mockup files SHALL stay byte-identical (README sha256 check),
  and `npm test` and `npm run build` SHALL pass.
- AC-8 THE decision log SHALL hold the 2026-11-09 capture choices, and the
  wave 0 roadmap line SHALL be checked.

## Out of scope

No entity, business rule or personal data (the contact PNGs show the
empty form). Any change to the mockup files (French only, Google Fonts, open hero
points); EN captures; tablet widths; reduced motion beyond the hero; the
four other vapor objects, hover, focus and form states as PNGs (README
text only); code in `src/` or `public/`; the SDK `--ws-*` upgrade.
