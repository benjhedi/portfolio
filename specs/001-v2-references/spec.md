# Spec 001 - v2 references in the repo

Branch: `docs-v2-references` | Status: planned 2026-11-09
Roadmap line: Wave 0, the v2 log, mockup, media and SEO input in `docs/`.

## Why

Every v2 screen spec cites a mockup (rule 60), but the log lives in
Cowork, the mockup in claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM and
`SEO-accueil.md` untracked in the main checkout (constitution 7).
Terms: versioned references = mockup files, decision log, SEO copy, hero
source clip; reference videos = mockup `hero.mp4`, `hero.webm` and the
source clip; PNG follow-up = the design-agent change that exports one PNG
per mockup section, light and dark, with a per-screen README.

## User stories

- P1 As the maintainer, I want the mockup, its media, the decision log and
  the SEO input frozen in the repo so that no spec cites a drifting source.

## Acceptance criteria (EARS)

- AC-1 THE repo SHALL hold the 16 files of artifact version
  1794063463-7380, each matching its published sha256.
- AC-2 WHEN the mockup is served locally with LFS objects fetched THE page
  SHALL load every local reference without a 404, light and dark.
- AC-3 A README next to the mockup SHALL give the source URL, the version,
  the sha256 list and how to serve it.
- AC-4 THE decision log SHALL hold the 2026-11-07 text in French verbatim,
  then English dated entries: Jahouach only, blocks not reused, "Voir le
  projet" open, option B with Vitest (2026-11-07); branches from `dev`,
  screen = section, PNG follow-up, log language, SEO copy in Jahouach,
  clip kept with audio, prompts left in Cowork, LFS videos (2026-11-09).
- AC-5 THE SEO copy SHALL say "Hedi Jahouach" in title, count and name
  rule, match the original elsewhere, the original's hash unchanged.
- AC-6 THE hero source clip SHALL be byte-identical to Hedi's file (sha256
  213146af...e4b9, audio kept), stored apart from the mockup files.
- AC-7 THE reference videos SHALL go through Git LFS as set up by the Git
  LFS toolchain spec, which lands on `dev` first.
- AC-8 `AGENTS.md`, `CLAUDE.md` and `product/` SHALL point to the in-repo
  references; the roadmap line SHALL stay open until the PNG follow-up.
- AC-9 WHEN `npm run build` runs THE `dist/` output SHALL hold no
  versioned reference, and `npm test` and the build SHALL pass.

## Out of scope

No screen built; no personal data beyond `content.ts` (public repo).
PNG follow-up; Git LFS setup (own spec); SDK `--ws-*` upgrade; code in
`src/` or `public/`; any mockup change (Google Fonts, French only, open
hero points); SEO rewrite beyond the name; the untracked original.
