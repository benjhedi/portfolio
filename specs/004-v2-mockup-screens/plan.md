# Plan 004 - v2 mockup screens

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system and tokens: not concerned, nothing the site renders
  changes; the PNGs capture `docs/v2/mockup/tokens.css` (`--ws-*`) as is,
  no value is added or read by new code | OPEN
- Mockups: the source `docs/v2/mockup/index.html` is in the repo, sums in
  `docs/v2/README.md`; this change produces the PNGs rule 60 asks for | OPEN

Rules and skills
- Rules that apply: 00 to 07; 04 (branch `docs-v2-mockup-screens`, the
  hook wins over design-agent's `chore-mockup-*`); 05 (no dependency: Node
  22 global `WebSocket`, system Chrome, `python3`); 06 (public repo: the
  contact and footer PNGs show the mail and LinkedIn URL already in
  `src/content/content.ts`, the form empty); 50 (no value introduced); 60.
  Not matched: 10-architecture, 30, 31, 90: no `.ts`, `.tsx`, `.css` or
  `.html` written, `index.html` read only.
- Skills to load: `design-to-code` (`reference/export-screens.md`,
  `design-spec-template.md`), `adr` (setup-agent), `verify`, `commit`.
- Constitution principles touched: 1 (`grep -ci benjahouach index.html`
  is 0, 2026-11-09); 2 (nothing from `docs/` reaches `dist/`, AC-7); 5
  (reduced hero PNGs show the poster); 7 (every v2 section gets its
  mockup); 8 (one runnable check per task).

Architecture
- Units: none, the rule governs `src/`, untouched | covered: yes
- Modules touched: `docs/v2/ecrans/` (new), `docs/v2/export-screens.mjs`
  (new), `docs/v2/README.md`, `.gitattributes`, ADR 004, and lines that
  turn false: `CONTRIBUTING.md` l.28 and `product/tech-stack.md` l.29 (LFS
  "videos"), `AGENTS.md` l.22 (PNGs "follow"), `product/roadmap.md` l.15
  | boundary crossed: none; `docs/v2/mockup/` stays read only.

Verification
- AC-1: the README png block holds prefixes 00 to 11 in page order; the
  script exits 1 when section rects are out of document order.
- AC-2: 52 files; `sips -g pixelWidth -g pixelHeight`: width 1440, or 780
  for `-mobile`; height = logged CSS height (x2 mobile); preloader 900, 1688.
- AC-3: qa opens the 8 hero PNGs (nav and bar) and the 44 others (none);
  the 4 preloader PNGs show "HJ" and "0%".
- AC-4: the script logs and asserts per context: video paused at 3.56 s,
  RIDE animation at 1512 ms, no other `.out` with `go`, every `mq` at 0,
  `line` at 1100 ms,
  no `.r` or `.big` without `in`; qa opens all 52 (nothing blank, cut,
  repeated, overlapping), `04-projects-mobile*` to the bottom.
- AC-5: `git check-attr filter`: `lfs` on `docs/v2/ecrans/01-hero.png`,
  `unspecified` on `public/projects/FranceInfos.png`; `git lfs ls-files`:
  3 videos plus 52 PNGs, nothing in `public/`; `git lfs fsck --pointers
  dev..HEAD`, then `lfs-pointers` green on the PR; ADR 004 names the glob.
- AC-6: 12 screen sections with Purpose, Layout, States, Interaction,
  Reduced motion; `diff` of the png block against `ls docs/v2/ecrans`
  empty; count line 52; a rerun into a scratch folder gives the same
  names, sums compared and reported.
- AC-7: README sums check passes; `git status --porcelain docs/v2/mockup`
  and `git diff --stat dev -- docs/v2/mockup` empty; `npm ci`, `npm
  test`, `npm run build`; `find dist -path '*ecrans*'` and `grep -rl
  export-screens dist` empty.
- AC-8: the spec 004 entry is last in `docs/v2/decision-log.md` (9223e0f),
  extended with D1 (scroll hint); roadmap l.15 reads `[x]`.
- Side by side: not applicable, the PNGs are the reference; qa
  spot-checks `01-hero` and `01-hero-dark` against the served mockup.

## Technical approach

`docs/v2/export-screens.mjs`, committed with the handoff, outside `mockup/`
and the build (`tsconfig.json` includes `src`, Vite ships `public/`).
`node docs/v2/export-screens.mjs [outDir]`, default `docs/v2/ecrans`. It
starts `python3 -m http.server 8765 --bind 127.0.0.1 --directory
docs/v2/mockup` (log in the OS temp dir) and headless Chrome (`--headless=new
--hide-scrollbars`, temp profile, `CHROME` overrides the path), drives CDP
like the probe, kills both on exit or error, and reads the names from the
README png block (the sums `sed` idiom): the README is the only list.
Contexts, one load each: {1440x900 dpr 1, 390x844 dpr 2 mobile} x {light,
dark} via `Emulation.setEmulatedMedia`; the same four under
`prefers-reduced-motion: reduce`, hero only.
At runtime: await `document.fonts.ready` and image `decode()`, stop if a
font or the video frame is missing (offline, LFS not pulled); add `in` to
`.r` and `.big`, `finish()` transitions; pause the video, seek 3.56 s,
await `seeked`, strip `go` from every `#vapor .out`, set it on the first
(RIDE), pause its animation at 1512 ms (0.72 x 2100); pause every `mq`
animation at 0 and the scroll hint `line` at 1100 ms (drawn, D1);
outside the hero inject `#nav, body > .bar
{visibility:hidden}` (`body >`: `.vapor .bar` exists too).
Captures: `captureBeyondViewport: true`, clip on the section rect. Hero:
viewport height set to the hero height, so the fixed nav and bar sit as
a visitor sees them (936 at 1440 before spec 005, 900 since).
Preloader last, viewport only: remove `.done`, set `#pct` to "0%", finish
the transition; a reconstructed first frame, the README says so.
Past 16384 device px Chrome repeats content (probe `390-2x-work.png`,
19576 px, restarts near 84 %): such a clip is shot in 8000 CSS px tiles
and stitched on a canvas in a blank tab; only `04-projects-mobile*`.
Order, one commit each: T1 setup-agent `.gitattributes` `docs/**/*.png`,
ADR 004 amendment, CONTRIBUTING and tech-stack lines (before any PNG);
T2 design-agent script; T3 the 52 PNGs; T4 README; T5 qa; T6 review;
close: roadmap, `AGENTS.md`, spec status.
Rejected: `--screenshot` per screen (no runtime control, virtual time
stalls the preloader at 26 %, spec 001 verification); Puppeteer or
Playwright (a dependency for what CDP over `WebSocket` does); the list in
the script (two lists drift); `scripts/` (repo tooling, not the handoff);
a capture mode in `index.html` (mockup frozen).

Naming: `NN-name[-reduced][-mobile][-dark].png`, no flag meaning motion,
1440, light. Bases `00-preloader 01-hero 02-statement 03-clients
04-projects 05-about 06-offers 07-process 08-career 09-skills 10-contact
11-footer`, each plain, `-dark`, `-mobile`, `-mobile-dark` (48), plus
`01-hero-reduced`, `-reduced-dark`, `-reduced-mobile`,
`-reduced-mobile-dark` (4): 52. Selectors `#loader`, `section.hero`,
`.statement`, `.clients`, `.work`, `.about`, `.offers`, `.process`,
`.career`, `.skills`, `.contact`, `footer.footer`.

## Data model and contracts

No entity, no new personal data. README png block: one name per line,
page then variant order; the folder matches it. Script stdout: one line
per PNG (name, CSS size, frozen flags); exit 1 on an unknown name, a
missing font or frame, a drift or a section out of order. ADR 004 gets an
Amendments section (2026-11-09, spec 004): scope adds `docs/**/*.png`, 52
PNGs, about 19 MB, re-exported with the mockup; `public/` stays plain git.

## Risks and open decisions

- D1 settled (Hedi, 2026-11-09): the scroll hint `line` animation is
  paused at 1100 ms, line drawn (at 0 it is invisible); in AC-4 and the log.
- D2 superseded (2026-11-10): spec 005 fixed the hero at the source, the
  hint now ends above the bar at 1440 x 900; the script emulates mobile
  for real (`mobile: true`) since the skills overflow is gone.
- The CONTRIBUTING, tech-stack and AGENTS.md lines exceed the spec text;
  Hedi kept them in this change (2026-11-09), they turn false after T3.
- Repeatable means same names and states; byte-identical PNGs across
  Chrome versions are not promised (hypothesis: identical on one machine).
- Sizes measured for light 1440@1x and 390@2x only; 19 MB is an estimate.
- Push: `core.hooksPath` is the main checkout's `.githooks/`, on `dev` with
  `git lfs pre-push` (2026-11-09); recheck before pushing.

## Research notes

Probe 2026-11-09, Chrome 157.0.8103.50: the CDP calls work, fixed elements
stay on the 900 px layout viewport under `captureBeyondViewport`, the
16384 px repeat shows in its PNG. Node 22.23.4 (fnm): `typeof WebSocket`
is `function`. git-lfs 3.8.1. Hero video 4.209 s (`ffprobe`): 3.56 s is in
the first loop. Web Animations `pause()`, `currentTime` and `finish()` on
CSS animations: not exercised by the probe, first run in T2.
