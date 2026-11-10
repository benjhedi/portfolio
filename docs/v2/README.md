# v2 references

Frozen inputs of the v2 redesign. Specs and screens cite these files,
never the claude.ai artifact they came from (spec 001).

## Contents

- `mockup/`: the v2 mockup, the 16 files of claude.ai artifact
  https://claude.ai/artifact/BDrsQCHWzgfQRLqBGn9FJM, version
  1794266082-62e1 (spec 005, 2026-11-10), first copied at version
  1794063463-7380 on 2026-11-09 (spec 001). A reference: the
  build never imports it and nobody edits it here. One French page, light
  and dark through `data-theme`, a 900 px breakpoint. It loads Hanken
  Grotesk and JetBrains Mono from Google Fonts. File names stay as
  published, `index.html` depends on them.
- `decision-log.md`: the v2 decisions, 2026-11-07 text in French, later
  entries in English.
- `seo-accueil.md`: the home page SEO input, name set to Jahouach.
- `source/hero-source-2026-11-07.mp4`: the Kling output the hero loop was
  cut from, 896 x 720, 24 fps, 5.04 s, audio track kept.

The three videos go through Git LFS (ADR 004).

## Serve the mockup

```bash
git lfs pull --include "docs/v2/**"
cd docs/v2/mockup && python3 -m http.server 8765
```

Then open http://localhost:8765. Without the LFS pull, the videos are
pointer files and the hero stays on its poster.

## Integrity

From `docs/v2/`:

```bash
sed -n '/^```sha256$/,/^```$/p' README.md | sed '1d;$d' | shasum -a 256 -c
```

```sha256
069ccf26e2ed3910e61d9973de3584d53b4159d17de18f54040181047dd1bd4f  mockup/index.html
e9a00bd2b5d53a41727d9541bd82049e971405906a4b2779ee33f2b4cef787ef  mockup/tokens.css
50416a49d973a2493cd1ed5a8e5727ab387f02439cfe139bbdc1ffe5a67c7004  mockup/img/FranceInfos.webp
541aa3a12454876c9d432926dfbdb9e9b40990e52f2cb14298717aec07cce2ec  mockup/img/GearTrack.webp
792021edadf0c4726c3b57b776a8c560d58e0e7c8166818b13ab8c7d9a8b9ab2  mockup/img/La1ere.webp
bfbb81bf8d6446a364b37856079a3bcdc3d0ada306fa00db9910e9c542079e59  mockup/img/MYTF1.webp
f2544d811923ac649a327e5e8475a0915b07e16e8347943e843279df3f529909  mockup/img/RIDE.webp
705adb506b9ca0ca626045c4c6a0d85471eaadf5ae66c674fc4b97a3834c9730  mockup/img/WorkoutLife.webp
0a23c483251fff4fc79a02875d23964b80d09b6c5939b9dbe9651288a3f985a6  mockup/img/francetv.svg
6d5bb899d83f7ba2fe43b52dd7548ba544188413af619f1a0ec07f8c1abb509a  mockup/img/hero-poster.jpg
c6262406309aa65ae999dcbfc49184835fac470f4ed84425e4629a07adab22c8  mockup/img/hero.mp4
5c849f9cce7a5755c55627374bcc0d1a71a737d1bd2616c9a763f0075ef364ef  mockup/img/hero.webm
197027b9bc08fbc439c0530039c2cca0bceb05312cde6715c3573a2aa4c7a35e  mockup/img/portrait-sm.jpg
41c0873d65848377393d3cb8eb324d594ae2793a22e30016fd86a2e2f2f33fe1  mockup/img/radiofrance.svg
2a4ada57928ff3a3ba764581dae9a9cb5e69b05d6ed11e257462fc100a7b4a19  mockup/img/site.jpg
3549ce5cfba27127dd6b9f9f35643530914af8fc2f650d42cc4b99520f7df3ae  mockup/img/sncf.svg
213146af827ef968cec922fc7f0a1da104b54c67278ae545e6abbaa9fdd4e2b9  source/hero-source-2026-11-07.mp4
```

The 16 mockup sums are the ones the artifact reported for version
1794266082-62e1: spec 005 changed `index.html` only, the other 15 match
version 1794063463-7380. The last sum is the clip as Hedi supplied it.

## Export the screens

From the repo root:

```bash
git lfs pull --include "docs/v2/**"
fnm use
node docs/v2/export-screens.mjs
```

The optional argument is the output folder, `docs/v2/ecrans` by default;
a scratch folder is fine for a dry run.

Prerequisites: the LFS pull (without it the hero video is a pointer file
and the script stops), Node 22 from `.nvmrc` through fnm, Google Chrome
(the `CHROME` environment variable overrides its path), `python3`, and the
network for Google Fonts (the script stops when a font is missing). Port
8765 must be free.

The script serves `mockup/` with `python3 -m http.server` on 127.0.0.1,
drives a headless Chrome over the DevTools protocol, and stops both when
it ends. Chrome renders in sRGB (`--force-color-profile=srgb`), so the
colors do not depend on the display of the exporting Mac. It reads the file names from the png block below, the only list;
a name it cannot map stops it. One fresh load per context, empty
localStorage: 1440 x 900 at 1x and 390 x 844 at 2x, light and dark, plus
the same four under reduced motion for the hero. Before any capture it
waits in real time for the preloader to finish, for the fonts and for
every image, then freezes the page:

- every reveal forced (`in` on `.r` and `.big`, transitions finished);
- the hero video paused at 3.56 s, in its first loop, with the RIDE app
  alone out of the vapor, its `emerge` animation paused at 1512 ms, the
  72 % keyframe where it peaks; `http.server` ignores Range requests, so
  the script reloads the same video bytes from a blob URL to seek;
- the scroll hint `line` animation paused at 1100 ms, line drawn;
- every marquee (`mq`) paused at 0;
- the fixed nav and bottom bar hidden outside the hero; the hero PNGs are
  shot with the viewport as tall as the hero, so both sit where a visitor
  sees them;
- the preloader reconstructed at "0%" after the run, one viewport tall;
  there is no reduced preloader, CSS hides it under reduced motion.

Each PNG is the full height of its section. Clips taller than 16384
device pixels repeat content in Chrome, so the script shoots them in
tiles and stitches them (`04-projects-mobile` and its dark twin). It logs
one line per PNG with its size and the frozen values, and exits 1 when
one of them drifts.

The `ecrans/` folder must match this list exactly:

```png
00-preloader.png
00-preloader-dark.png
00-preloader-mobile.png
00-preloader-mobile-dark.png
01-hero.png
01-hero-dark.png
01-hero-mobile.png
01-hero-mobile-dark.png
01-hero-reduced.png
01-hero-reduced-dark.png
01-hero-reduced-mobile.png
01-hero-reduced-mobile-dark.png
02-statement.png
02-statement-dark.png
02-statement-mobile.png
02-statement-mobile-dark.png
03-clients.png
03-clients-dark.png
03-clients-mobile.png
03-clients-mobile-dark.png
04-projects.png
04-projects-dark.png
04-projects-mobile.png
04-projects-mobile-dark.png
05-about.png
05-about-dark.png
05-about-mobile.png
05-about-mobile-dark.png
06-offers.png
06-offers-dark.png
06-offers-mobile.png
06-offers-mobile-dark.png
07-process.png
07-process-dark.png
07-process-mobile.png
07-process-mobile-dark.png
08-career.png
08-career-dark.png
08-career-mobile.png
08-career-mobile-dark.png
09-skills.png
09-skills-dark.png
09-skills-mobile.png
09-skills-mobile-dark.png
10-contact.png
10-contact-dark.png
10-contact-mobile.png
10-contact-mobile-dark.png
11-footer.png
11-footer-dark.png
11-footer-mobile.png
11-footer-mobile-dark.png
```

52 PNGs.

## Screens

Twelve screens in page order. Each maps to a PNG base name in `ecrans/`
with four variants: the base (1440 px, light), `-dark`, `-mobile` (390
px at 2x) and `-mobile-dark`. Desktop means wider than 900 px, mobile
900 px and narrower, the mockup's only breakpoint. Light and dark come
from `data-theme`; the tokens flip, the layout does not change.

Common to every screen: elements fade in and rise 22 px (0.8 s) once,
when they enter the viewport; every link and button gets a 2 px focus
ring on keyboard focus. The PNGs freeze the page as the export
procedure above says. Hover, focus and form states are described here
in text, never exported.

### 00 Preloader

- PNG: `00-preloader`.
- Purpose: a short "HJ" and percent count while the page starts.
- Layout: the full viewport on the page background, the 44 px "HJ"
  mark centered with the muted mono count under it; same at both
  widths.
- States: counts from 0% to 100% in 900 ms, fades out, then the
  reveals start. The PNG is a reconstructed first frame at "0%", one
  viewport tall.
- Interaction: none; fixed above the page, hidden from assistive tech.
- Reduced motion: CSS hides the loader, so there is no reduced PNG.

### 01 Hero

- PNG: `01-hero`, and `01-hero-reduced` for the poster, four each.
- Purpose: the animated portrait in an oval, the name and the role.
- Layout: a centered column at least one viewport tall: oval (1.5/1,
  `min(78vw, 860px)`, capped by the viewport height, so 720 px wide at
  1440 x 900), name, role, "Défiler" hint. Mobile: oval 92vw at 1.25/1.
  The fixed nav and bottom bar appear on the hero PNGs only. Mobile nav:
  the 30 x 30 "HJ" mark, FR/EN, theme, burger; bar: its two links only.
- States: the video loops; at each exhale (2.05 s) one of five objects
  (RIDE app, site, franceinfo app, product, GearTrack app) leaves the
  mouth and grows along the vapor. The PNG shows RIDE at its peak, in
  the first loop, hint line drawn.
- Interaction: anchors from "Défiler", the nav and the bar; nav blurred
  past 40 px, hidden scrolling down past 300 px; accent dot on the
  active link; theme toggle saved in localStorage (default: system);
  FR/EN and burger inert. The mobile "HJ" link gets a 44 x 44 hit area
  in the implementation, visual size unchanged.
- Reduced motion: the video stays on its poster, no vapor object, hint
  line static: `01-hero-reduced`.

### 02 Statement

- PNG: `02-statement`.
- Purpose: name, role and what Hedi does, then the claim and proof.
- Layout: two columns of uppercase titles with a mono subline, a note
  under the first, "Ce que je fais" under the second; the four-line
  claim (up to 88 px, "développe" and "production." in accent mono);
  four proof chips. Mobile: one column, claim full width.
- States: the claim lines slide up from a mask (0.9 s, 80 ms stagger);
  the PNG shows them in place.
- Interaction: none.
- Reduced motion: the lines and chips show at once.

### 03 Clients

- PNG: `03-clients`.
- Purpose: client names as proof.
- Layout: a full-bleed band between two borders, the kicker "Ils m'ont
  fait confiance", one marquee row of twelve names, three as monochrome
  logos (black in light, inverted in dark), faded edges. Same at both
  widths.
- States: scrolls left in a 38 s loop; the PNG shows its start.
- Interaction: hover pauses the marquee.
- Reduced motion: static at its start.

### 04 Projects

- PNG: `04-projects`.
- Purpose: six detailed cases, then nine more projects.
- Layout: intro (kicker "01", title, lead), six blocks at least one
  viewport tall, page and surface backgrounds in turn: a giant outlined
  title marquee behind the copy (index, years, client, title, role, two
  paragraphs, tags, "Voir le projet") and a tilted 300 px phone with a
  ghost outline; then a 3-column grid of nine cards. Mobile: one column,
  phone under the copy, no ghost, the grid in one column.
- States: title marquees loop in 40 s, at their start in the PNG. The
  mobile PNG is stitched from tiles (see the export procedure).
- Interaction: "Voir le projet" points to its own block in the mockup;
  its real target is still open (decision log, 2026-11-07). Hover: the
  button lifts 1 px, a grid card takes the surface background.
- Reduced motion: marquees static at their start, blocks shown at once.

### 05 About

- PNG: `05-about`.
- Purpose: who Hedi is and how he works.
- Layout: the numbered layout of 05 to 09: a 200 px side column ("002",
  "À propos"), sticky 96 px from the top, then a lead with an accent
  word, a 112 px round portrait beside two paragraphs, four traits in a
  2 x 2 grid. Mobile: number and label inline on top, portrait above
  the text, traits in one column.
- States: the PNG shows the side column at the top of the section.
- Interaction: none.
- Reduced motion: shown at once.

### 06 Offers

- PNG: `06-offers`.
- Purpose: the two ways to work together.
- Layout: side column "003"; title, lead, two cards side by side (at
  least 280 px high): accent kicker, title, text, mono footnote over a
  border. Mobile: the cards stack.
- States: one state.
- Interaction: none.
- Reduced motion: shown at once.

### 07 Process

- PNG: `07-process`.
- Purpose: the six steps from idea to production.
- Layout: side column "004"; title, lead, six rows between borders:
  accent number (72 px), step title (220 px), description, on one
  baseline. Mobile: a 56 px number column, the description under the
  title.
- States: one state.
- Interaction: none.
- Reduced motion: shown at once.

### 08 Career

- PNG: `08-career`.
- Purpose: fourteen years of roles and clients.
- Layout: side column "005"; title, six rows between borders: mono
  period (140 px), role with the company under it, description. Mobile:
  the three stack in each row.
- States: one state.
- Interaction: none.
- Reduced motion: shown at once.

### 09 Skills

- PNG: `09-skills`.
- Purpose: the stack, by group, then the tools.
- Layout: side column "006"; title, three groups of mono tags in three
  columns, then a tool marquee of thirteen names in mono uppercase with
  accent bullets, between borders, edges faded. Mobile: one group per
  row.
- States: the marquee loops in 38 s; the PNG shows its start.
- Interaction: hover pauses the marquee.
- Reduced motion: the marquee is static at its start.

### 10 Contact

- PNG: `10-contact`.
- Purpose: start a project, through the form or directly.
- Layout: two columns: kicker "007", uppercase title with an accent mono
  line, lead, mail and LinkedIn links, location; the form: request type
  chips (Mission, Forfait, Régie, Autre), name, e-mail, message (140 px,
  resizable), send button. Mobile: the form under the text.
- States: the PNGs show the empty form, Mission selected. Selected chip:
  solid; focused field: accent border and focus ring; after a submit, a
  success line under the button. No validation and no error state.
- Interaction: the form is a mockup, the submit is cancelled and
  nothing is sent; the mail and LinkedIn links leave the page.
- Reduced motion: shown at once.

### 11 Footer

- PNG: `11-footer`.
- Purpose: a last call to start a project, and the footer links.
- Layout: a full-bleed marquee of "Parlons de ton projet" with accent
  separators and faded edges, a border, then a mono uppercase row:
  copyright, "Cas (6)" and "Archive (9)" (both to the projects),
  LinkedIn, availability. Mobile: the row wraps to three lines.
- States: the marquee loops in 38 s; the PNG shows its start.
- Interaction: hover pauses the marquee; a hovered link takes the text
  color.
- Reduced motion: the marquee is static at its start.

### Known mockup details

Seen in the PNGs on 2026-11-10 and kept as validated; each section spec
decides the intended result (decision log, 2026-11-10).

- 01 hero: the small vapor phones get the dark notch of the global
  `.phone::after` rule, which hides the top of their screenshot.
- 06 offers, 07 process, 08 career: the `h4` titles keep the browser's
  default margin, so they sit lower than the rest of their row.
- 02 statement: the `.big .line` mask (`overflow:hidden`) clips the
  cedilla tail of "CONÇOIS"; the mask needs room for descenders.
- 00 preloader: "0%" aligns with the left edge of the "HJ" mark instead
  of being centered under it.
- 01 hero: FR/EN and the burger do nothing in the mockup; the mobile
  menu and the language switch need their own mockup before they are
  built (rule 60).
