# Plan 008 - v2 hero mockup, sky

Spec: `spec.md` (status clarified, AC-3 fixed in 66d47a6) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system and tokens: the tint reads `--ws-color-accent`
  (`docs/v2/mockup/tokens.css` l.42 light `#0d518c`, l.141 dark
  `#6ec7f2`); the toggle reuses the dark button set of the mockup:
  `--ws-color-solid` and `--ws-color-on-solid` (l.40-41, l.139-140),
  `--ws-shadow-inset` (l.118), `--ws-r-pill` (l.87),
  `--ws-color-focus-ring` (l.52, l.151), `--ws-space-16` (l.67),
  `--ws-motion-base` (l.113). `tokens.css` untouched. Literal sizes 32 px
  and 44 px come from AC-3, like `.iconbtn` 34 px (`index.html` l.86) | OPEN
- Tint opacities 0.62 light, 0.5 dark: no opacity token in `tokens.css`,
  none in `@warastudio/theme` 0.1.0 in `node_modules`; kept as literal
  composition values with a one-line English comment, like `364px` in
  spec 005 (D1) | OPEN
- Mockups: the change edits the mockup at its source; rule 60 routes it
  to design-agent, which is this change; AC-1 to AC-4 define the target
  states, AC-5 freezes the rest of the page; the paused state follows
  spec 007 AC-17 since 66d47a6 (D2) | OPEN

Rules and skills
- Rules that apply: 00 to 07; 04 (branch `feat-hero-mockup-sky`, stacked
  on `feat-hero-spec`, hooks from `core.hooksPath`); 05 (no dependency:
  Lucide path data copied inline from the installed `lucide-react`
  1.17.0, system Chrome over CDP, Node 22 `WebSocket`, `ffmpeg` and
  `python3` stdlib in the scratchpad); 31 (matched by `**/*.html`: 44 x 44
  target, focus ring, keyboard, contrast both themes, reduced motion);
  50; 60. Not matched: 10-architecture, 30, 90: nothing under `src/`, no
  `.ts` or `.css` file, `export-screens.mjs` matches no `paths:`.
- Skills to load: `design-to-code` (`reference/export-screens.md`), `verify`, `commit`.
- Constitution principles touched: 2 (the tint is a token, no brand
  mark); 4 (the mockup stays French, its role line equals the FR
  `identity.role`; no site text touched); 5 (retinted poster, no toggle
  under reduced motion, the four reduced PNGs re-exported); 7 (tokens;
  two commented opacity literals, D1); 8 (one runnable check per task);
  11 (toggle reachable, ring visible, 44 px target, contrast light and dark).

Architecture
- Units: none, the rule governs `src/`, untouched | covered: yes
- Modules touched: `docs/v2/mockup/index.html`, the 8
  `docs/v2/ecrans/01-hero*.png`, `docs/v2/export-screens.mjs` (toggle
  check, D3), `docs/v2/README.md` (l.9-11, l.65-67, hero section
  l.204-223, known detail l.359-360), `docs/v2/decision-log.md` (l.5-9
  and a dated entry), `product/tech-stack.md` l.47, `product/mission.md`
  l.3 | boundary crossed: none

Verification
- AC-1: probe at 1440x900 dpr 1 and 390x844 dpr 2 `mobile: true`, light
  and dark, motion and reduced: DOM order video, `.tint`, `.vapor`;
  computed `mix-blend-mode: color`, background the resolved accent,
  opacity 0.62 and 0.5; on the PNGs, the backlight sample and the mean
  luma inside the oval before and after (design-agent's reference:
  `#c4d0d7` to `#b2d4f0` at 1440 light, `work/ref/diff.json`), pixels
  outside the oval identical up to the noise floor.
- AC-2: `.hero .role` text equals "Consultant iOS senior, freelance";
  the old string gone from `index.html` (l.414 its only hit).
- AC-3: probe: at rest a 44 x 44 button with a 32 px disc, centered on
  the oval axis near its bottom, label "Pause", Lucide pause glyph;
  `Input.dispatchMouseEvent` moves over three points of the oval, toggle
  center equals the cursor within 1 px, back at rest after leaving; a
  click away from the toggle pauses on the current frame: `vid.paused`,
  `currentTime` neither 0 nor moving over 500 ms, the launched object's
  `emerge` paused with its time held, no poster shown, label "Lecture",
  play glyph; a second click resumes video and object; Tab reaches it
  after the nav and before "Défiler", 2 px ring visible, Enter toggles;
  autoplay refused: poster with play; reduced: `display: none`, Tab
  skips it.
- AC-4: `getComputedStyle(el, '::after').content` is `none` on the three
  `.vapor .phone`, the notch kept on the six `.work .phone`; RIDE whole
  at its peak in the PNGs.
- AC-5: spec 005's method: the current script run twice on the frozen
  copy (floor), the T4 script once on the edited copy, same capture
  settings; box diff per section: only the 1440 and 390 hero rows
  change, heights equal, nav and bar 0 boxes; pixel diff for
  information: the 8 hero PNGs above the floor.
- AC-6: new version id; read-back sha256 of `index.html` equals the T1
  file; sums check passes; `git diff --stat feat-hero-spec -- docs/v2/mockup`
  lists `index.html` only, `-- docs/v2/ecrans` the 8 hero PNGs only; png
  block still 52 names; version grep in README (contents and hero),
  decision log, tech-stack, mission; export exit 0 with the toggle
  logged on pause; negative control: a scratch copy whose toggle starts
  on play makes it exit 1; `npm ci`, `npm test`, `npm run build`.
- Side by side: qa's before, after and difference strips of the 8 hero
  PNGs, plus scratch shots of the paused and autoplay-refused states,
  light and dark, for the README text (not committed).

## Technical approach

Four rules and two elements in `index.html`, measured in scratch first:

    /* 0.62 and 0.5: the v1 hero duotone; the SDK has no opacity token */
    .oval .tint{position:absolute;inset:0;pointer-events:none;background:var(--ws-color-accent);mix-blend-mode:color;opacity:.62}
    :root[data-theme="dark"] .oval .tint{opacity:.5}
    .oval.paused .vapor .out{animation-play-state:paused}
    .vapor .phone::after{content:none}
    <i class="tint" aria-hidden="true"></i>      after <video>, before .vapor
    <button class="play" id="heroToggle" type="button" aria-label="Pause" hidden>  after .halo

The button holds Lucide 1.17.0 Play and Pause as inline SVG at stroke
1.5, like the theme icon (l.384). In the hero script's motion branch
(l.744): remove `hidden`; one click listener on `#oval` (the button's
click bubbles there, Enter and Space included) pauses or plays the video
and sets `.paused` on the oval, so both hold on the current frame;
`pointermove` with `pointerType === 'mouse'` places the toggle,
`pointerleave` returns it to rest; label and glyph follow a visitor flag
and `play()` rejecting with `NotAllowedError` (poster with play), never
the media `play`/`pause` events. Its focus rule pairs the ring with
`--ws-shadow-inset`. The role text at l.414. README hero section:
"Paused: video and vapor object held on the current frame, toggle on
play. Autoplay refused: the poster, toggle on play. Neither is exported."
Export check (D3): `pageState` reads `#heroToggle` (displayed, label);
`drift` fails when motion is on and the toggle is hidden or not on
"Pause", or when reduced motion is on and it displays; `flags` logs it.
Order: T1 design-agent, scratch edit of `index.html` and the script,
proofs AC-1 to AC-5, no repo file; T2 main session, after Hedi's go:
read the artifact (still 1794266082-62e1, `index.html` 069ccf26),
publish `index.html` without the host wrapper (line 1 and the final
`</body></html>`), read back; the sums must match, else stop and diff;
T3 refreeze; T4 the export check; T5 export to scratch, copy the 8 hero
PNGs; T6 design-agent, doc lines; T7 qa; T8 review. One commit per task
from T3, `[feat-hero-mockup-sky]: ...`.
Rejected: a separate `sky.css` as prototyped (a 17th artifact file and
sum for three rules); state from media events (the export's
`vid.pause()` would freeze the PNG on play, and 007 AC-18 pauses off
screen without the visitor); listeners on both button and oval (double
toggle); `aria-pressed` with a fixed label (spec 007 gives two labels);
pausing the object through `getAnimations()` (more script than one
rule); exporting straight into `ecrans/` (rewrites 44 PNGs with run
noise, 135 477 px on `04-projects` in spec 005).

## Data model and contracts

No entity, no personal data. Contracts kept: `docs/v2/mockup/` holds the
16 files as published, 15 unchanged; the README sums block holds the
read-back sums; the png block stays at 52. Toggle reference for spec
007: a native `button`, label swap "Pause" / "Lecture", state from the
visitor and the autoplay refusal, pause held on the current frame;
`src/` already draws Lucide at `strokeWidth={1.5}` (`src/components/Nav.tsx:53`).

## Risks and open decisions

- D1 settled (Hedi, 2026-11-15): 0.62 and 0.5 stay literal composition
  values with a one-line English comment, same values as v1
  (`src/components/Hero.tsx:109`), like `364px` in spec 005; no ds-agent,
  no SDK change. Spec 007's plan meets the same question in code.
- D2 settled (Hedi, 2026-11-15, 66d47a6): paused holds the video and the
  vapor object on the current frame (spec 007 AC-17); the poster with
  play shows only when autoplay is refused.
- D3 settled (Hedi, 2026-11-15): the export gains the toggle check (about
  6 lines). Without it the script would still pass (no pointer event, no
  hover, no running animation at rest), but a later re-export could
  freeze a play glyph silently. The before run keeps the current script,
  which the old mockup passes; the new one would fail it.
- The read-back may differ from the local edit (spec 005 risk): T2
  publishes once, diffs, asks before a second version.
- Hypothesis: at 390 the old role wraps to two lines, the new one fits
  in one, so the hero content recenters inside its 844 px; at 1440 both
  are one line, so the stack under the oval and `364px` hold (T1 measures).
- Design-agent's mobile captures differ by 12 px outside the oval in
  all three variants: not the tint, likely noise; T1 checks the floor.
- `[hidden]` loses to a `display` rule; the host wrapper's `!important`
  masks this in the frozen copy, spec 007 must not rely on it.
- spec 005's `qa005/scripts` are gone: T1 rewrites `geo.mjs`,
  `geodiff.py`, `pngdiff.py` or derives them from `work/capture.mjs`.
- Diffs run against `feat-hero-spec` until it merges, then `origin/dev`.
- `node_modules` holds theme 0.1.0: `npm ci` (token in `~/.npmrc`) before T7.

## Research notes

Chrome 157.0.8103.50, Node 22 through `fnm use` (shell default
26.13.1). Lucide 1.17.0 (`package-lock.json` l.3269-3272):
`node_modules/lucide-react/dist/esm/icons/play.mjs` one path,
`pause.mjs` two rects. `mix-blend-mode: color` (Compositing and Blending
Level 1): hue and saturation of the layer, luminosity of the backdrop;
`.oval` sets `isolation: isolate` (l.112), so only the oval blends;
verified in Chrome only (`work/ref/diff.json`, outside diff 0 at 1440);
Safari and Firefox belong to spec 007's QA. `play()` rejects with
`NotAllowedError` on a refused autoplay, `AbortError` when a pause or a
load interrupts it (HTML spec, from memory). Refusal emulation: Chrome's
`--autoplay-policy=user-gesture-required` on muted video not verified;
fallback, a `play()` stub through `Page.addScriptToEvaluateOnNewDocument`
with `autoplay` removed.
