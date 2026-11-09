# Plan 005 - v2 mockup fixes

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system and tokens: the fix reads the mockup's own `--bottom-bar`
  (`docs/v2/mockup/index.html` l.27) and no color, space or type value; no
  token added, `tokens.css` untouched. One literal, `364px`, the hero
  stack under the oval (D1) | OPEN
- Mockups: the change edits the mockup at its source. Not BLOCKED: rule 60
  routes a defective mockup to design-agent, which is this change; AC-1 to
  AC-4 define the target states and every other part of the page must
  stay as it is (AC-5). No app screen is built | OPEN

Rules and skills
- Rules that apply: 00 to 07; 04 (branch `fix-v2-mockup-defects`, the hook
  wins over design-agent's `chore-mockup-*`); 05 (no dependency: system
  Chrome over CDP, Node 22 `WebSocket`, `ffmpeg` 9.0.2 and `python3`
  stdlib for the pixel diff, all in the scratchpad); 31 (matched by
  `**/*.html`: the mobile brand link becomes visible); 50; 60.
  Not matched: 10-architecture, 30, 90: nothing under `src/`, no `.css` file.
- Skills to load: `design-to-code` (`reference/export-screens.md`), `verify`, `commit`.
- Constitution principles touched: 1 ("HJ" back on the mobile nav, AC-3);
  5 (no motion touched, the reduced hero PNGs are diffed too); 7 (a PNG of
  a bug is no contract); 8 (one runnable check per task); 11 (keyboard
  pass on the nav at 390).

Architecture
- Units: none, the rule governs `src/`, untouched | covered: yes
- Modules touched: `docs/v2/mockup/index.html` (4 lines), `docs/v2/README.md`
  l.9-10, l.42, l.61-62, `docs/v2/decision-log.md` l.5-7 and its spec 005
  entry, `product/tech-stack.md` l.47, `product/mission.md` l.3 (D3)
  | boundary crossed: none. Spec 001 files stay as history.

Verification
- AC-1: probe at 1440x900 dpr 1 and 390x844 dpr 2 `mobile: true`:
  `scrollWidth` equals `innerWidth` (measured 1440 and 390; before 5437 and 5151).
- AC-2: same probe: three `.skills .groups > div` boxes inside the
  viewport, side by side at 1440, stacked at 390; `.skills .mq` width
  equals its column (1077 at 1440, 350 at 390).
- AC-3: probe at 390 and at 900 px wide: `.mark` visible at the left
  gutter, `.nav .right` ends at the right gutter; first Tab lands on the
  "HJ" link, 30 x 30 with its focus ring (before: a 0 x 0 link).
- AC-4: probe at 1440x900: label bottom above `body > .bar` top (823 vs 844).
- AC-5: spec 004's export script, unchanged, run on the frozen copy twice
  (noise floor) and on the fixed copy, same settings; pixel diff of the 52
  pairs; element boxes per section compared, which needs no noise floor
  | OPEN (AC-5 reworded, D2 settled)
- AC-6: sums check of `docs/v2/README.md` passes; the `index.html` sum
  equals the read-back sum; grep the new version in the four files;
  `git diff --stat dev` lists only the files above; `npm test`, `npm run build`.
- Side by side: qa looks at before, after and difference strips of
  `01-hero`, `01-hero-mobile` and `09-skills`, light and dark.

## Technical approach

Three rules, measured in a scratch copy on 2026-11-09:

    /* l.106: 364px is the hero stack under the oval, so it ends above the bar */
    .oval{--w:min(78vw, 860px, calc((100svh - var(--bottom-bar) - 364px) * 1.5))}
    .skills > div{min-width:0}
    /* in @media (max-width:900px), l.319 and a new line */
    .nav .brand span:not(.mark),.nav .right .btn{display:none}
    .nav .right{grid-column:3}

Skills: the content cell of `.num` is a `1fr` grid item with `min-width:
auto`, so the `flex:none` marquee tracks set its minimum; `min-width:0`
scoped to `.skills`. Nav: `span:not(.mark)` keeps the mark; `grid-column:3`
puts the controls in the column the hidden links leave empty. Hero: the
oval width also caps at what the viewport height leaves; 364 px is the
stack under it at 1440 (measured 362.5), 1.5 the ratio of l.114. Unchanged
at 1920x1080; at 1440x900 the oval goes from 860 to 720 px wide.
Order: T1 design-agent, scratch edit and proofs AC-1 to AC-5, no repo
file; T2 main session, with Hedi's go: read the artifact (still
1794063463-7380, 450bff19), publish `index.html` without the host wrapper
(line 1 and the final `</body></html>`, which the read adds), read back;
the read-back sum must equal the local edit's, else stop and diff;
T3 copy into `docs/v2/mockup/`; T4 design-agent, the doc lines; T5 qa;
T6 review. One commit per task, `[fix-v2-mockup-defects]: ...`.
AC-5 run: extract `export-screens.mjs` and `README.md` from
`docs-v2-mockup-screens` (29a20c7) into `scratchpad/before/` and
`after/`, each with a `mockup/` copy; the script serves `mockup/` and
reads the png block next to itself. `pngdiff.py` decodes with `ffmpeg
-f rawvideo -pix_fmt rgba` and compares rows; `geo.mjs` lists every box.
Rejected: `.num{grid-template-columns:200px minmax(0,1fr)}` (two rules,
the mobile one too); `contain:inline-size` on the marquee (less known,
same effect); a smaller fixed oval (shrinks it on tall screens too);
tighter hero spacing (changes it everywhere, fits at 900 only); a hero
padding-bottom of bar height (the stack still ends at 888 px).

## Data model and contracts

No entity, no personal data. Contract kept: `docs/v2/mockup/` holds the
16 files as the artifact publishes them, 15 unchanged; the README sums
block holds the read-back sums of the new version.

## Risks and open decisions

- D1 settled (Hedi, 2026-11-10): the oval is capped by the viewport
  height and shrinks on short desktop viewports (720 px at 1440x900, 450
  at 1280x720); the `364px` literal is kept with an English comment, like
  the 64px nav offset, a rule 50 finding accepted for the mockup.
- D2 settled (Hedi, 2026-11-10): AC-5 reworded in the spec; the shorter
  hero shifts later sections by 35.828 px, so 21 other PNGs differ by
  sub-pixel edges, run noise or a 1 px clip rounding, their element boxes
  identical; the boxes are the proof, not the pixels.
- D3 settled (Hedi, 2026-11-10): `product/mission.md` l.3 is in AC-6.
- The read-back may not equal the local edit if the host wraps
  differently than its read shows (hypothesis): T2 publishes once, diffs,
  and asks before a second version.
- Not fixed: under 900 px with a short viewport (900x800) the mobile hero
  still runs under the bar; outside AC-4 and the spec.
- Seen, not fixed (rule 31, every width): the mark is 30 x 30, under 44 px;
  the pressed FR toggle shows no focus ring (its inset shadow wins).
- Follow-up, not a task: spec 004 rebases on `dev`, switches to `mobile:
  true`, drops D2 and the hero viewport note; same-input runs already
  differ in `04-projects` (135 477 px), against its repeatability claim.

## Research notes

Chrome 157.0.8103.50 headless, Node 22.23.4 (fnm). Probe 2026-11-09: two
runs on the frozen copy give identical boxes in every section; pixel
noise in 7 PNGs. `svh` equals the emulated viewport height. No new CSS
feature: the mockup already uses `100svh` (l.104) and `min()` (l.106);
browser support not looked up again.
