# Spec 001 - v2 references in the repo

Branch: `docs-v2-references` | Status: draft
Roadmap line: Wave 0: the v2 log, the mockup and its media, and
`SEO-accueil.md` are versioned in `docs/`, so every screen has an in-repo
mockup ([inv] refactor specs).

## Why

Every v2 screen line of the roadmap says "Needs the mockup", and rule 60
only counts a mockup that lives in the handoff with one PNG per screen and
a README. Today the decision log sits in a Cowork session, the mockup in a
claude.ai artifact and `SEO-accueil.md` untracked in the main checkout: a
fresh session or another agent cannot read them from the repo, and the
artifact can change under a spec that cites it. Once this ships, every v2
spec points to a frozen, in-repo reference. Serves constitution principle 7
and mission success "first result on Hedi Jahouach" through the SEO input.

## User stories, by priority

- P1 As the maintainer, I want the v2 mockup and its media frozen in the
  repo so that every screen spec cites a reference that cannot drift.
- P1 As the maintainer, I want the v2 decision log in the repo, with the
  decisions taken since 2026-11-07, so that no agent re-debates a settled
  choice.
- P2 As the maintainer, I want `SEO-accueil.md` versioned so that the SEO
  spec starts from it.

## Acceptance criteria (EARS)

- AC-1 THE repo SHALL hold the 16 published files of the mockup artifact
  BDrsQCHWzgfQRLqBGn9FJM, version 1794063463-7380, each byte-identical to
  the published file (sha256 listed in the README and rechecked by a
  script or a command in the test plan).
- AC-2 WHEN the versioned mockup is served by a local static server THE
  page SHALL load every local reference (tokens, images, videos, poster)
  without a 404, in light and in dark.
- AC-3 THE mockup folder SHALL hold a short README giving the source URL,
  the frozen version, the file list with sha256, and how to serve it
  locally; the per-screen description and PNGs belong to the follow-up.
- AC-4 THE repo SHALL hold the decision log text of 2026-11-07 as Hedi
  wrote it, in French, followed by a section in English with five dated
  entries: SEO and displayed name "Jahouach" only (2026-11-07), hero and section blocks not reused
  elsewhere (2026-11-07), "Voir le projet" target open for the projects
  spec (2026-11-07), architecture option B with Vitest (2026-11-07, ADR
  001), branches from `dev` and `main` for production releases only
  (2026-11-09); plus a note that the video prompts the log cites stay in
  Cowork and the source clip is in the repo.
- AC-5 THE repo SHALL hold a copy of `SEO-accueil.md` where "Benjahouach"
  appears nowhere: the title, its character count and the name rule say
  "Hedi Jahouach", every other line matches the original; the original in
  the main checkout SHALL still exist with an unchanged hash.
- AC-6 THE repo SHALL hold the hero source clip (Kling output of
  2026-11-07, 896 x 720, 24 fps, 5.04 s, audio track kept), byte-identical
  to the file Hedi supplied (sha256 213146af...e4b9), stored apart from
  the mockup files so the mockup stays identical to the artifact.
- AC-7 THE reference videos (mockup `.mp4` and `.webm`, source clip) SHALL
  be stored through Git LFS, and no file under `public/` or `src/` SHALL
  be an LFS pointer.
- AC-8 WHEN the repo is cloned without LFS objects THE `npm test` and
  `npm run build` commands SHALL still pass, as the CI checkout does.
- AC-9 THE LFS choice SHALL be recorded in an ADR, and CONTRIBUTING
  SHALL name the LFS setup step for a fresh clone.
- AC-10 THE read order in `AGENTS.md` and the sources in `product/` SHALL
  point to the in-repo references instead of the artifact. The wave 0 line
  of the roadmap SHALL stay open, with a note that the PNG follow-up
  closes it.
- AC-11 WHEN `npm run build` runs THE `dist/` output SHALL contain no file
  from the versioned references, and `npm test` and `npm run build` SHALL
  pass.

## Screens and states

None built. The mockup is one long page; its sections are hero, statement,
clients marquee, projects, 002 about, 003 offers, 004 process, 005 career,
006 skills, 007 contact, footer, with the nav, the fixed bottom bar and
the "HJ" preloader around them. It has a 900 px breakpoint, a light and a
dark theme, a reduced-motion variant and French copy only.

## Data and rules touched

No entity, no business rule, no personal data collected. The mockup
contains Hedi's public mail address and LinkedIn URL, already on the live
site. Rules: 60 (mockup contract), 03 (language, dashes: the sources
contain none), 06 (no secret in the copied files: checked by grep).

## Decisions taken while specifying

- 2026-11-09, Hedi: for rule 60, a screen of the one-page mockup is a
  section; each gets one PNG in light and one in dark.
- 2026-11-09, Hedi: the PNG export and the per-screen README are a
  follow-up owned by design-agent, after this spec lands. Mobile captures
  (900 px breakpoint) are decided there.
- 2026-11-09, Hedi: the decision log keeps the 2026-11-07 text in French,
  verbatim; the entries added since are written in English, in their own
  section, so no paragraph mixes both languages (rule 03).
- 2026-11-09, Hedi: the versioned `SEO-accueil.md` says "Jahouach", in
  line with constitution principle 1; the rest of its content waits for
  the SEO spec.
- 2026-11-09, Hedi: the hero source clip is versioned as a source, so a
  regenerated loop can start from it rather than from the compressed cut.
- 2026-11-09, Hedi: `claude/hero-video-prompts.md` is not versioned; the
  clip is enough. The log's English entries say the prompts stay in
  Cowork.
- 2026-11-09, Hedi: the reference videos go through Git LFS, against the
  plain-git recommendation (about 1.5 MB). LFS is scoped to the videos of
  the versioned references only: the site's own media in `public/` stay
  in plain git, because the CI and release checkouts do not fetch LFS
  objects and would deploy pointer files. The choice is recorded in an
  ADR (rule 05, tooling) and CONTRIBUTING gains the LFS setup step.

## Out of scope

- The PNG export and the per-screen README (design-agent follow-up).
- The SDK upgrade to `--ws-*` (second wave 0 line, its own spec).
- Any code in `src/`, `public/` or the build.
- Any change to the mockup itself, including its Google Fonts link and its
  French-only copy; open design points (oval background, loop crossfade,
  capitals) stay open for their screen specs.
- An English mockup.
- Rewriting `SEO-accueil.md` beyond the name; the SEO spec owns the rest.
- Moving or deleting the untracked original in the main checkout.

## Open points

None left. Next: `/clarify` rereads for unmarked ambiguities, then sets
the status to clarified.
