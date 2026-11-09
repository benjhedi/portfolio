# v2 references

Frozen inputs of the v2 redesign. Specs and screens cite these files,
never the claude.ai artifact they came from (spec 001).

## Contents

- `mockup/`: the v2 mockup, the 16 files of claude.ai artifact
  https://claude.ai/artifact/BDrsQCHWzgfQRLqBGn9FJM, version
  1794063463-7380, copied as published on 2026-11-09. A reference: the
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
1794063463-7380; the last one is the clip as Hedi supplied it.

## Screens

Not exported yet. The PNG follow-up adds one PNG per mockup section,
light and dark, under `ecrans/`, and one description per screen here
(purpose, layout, states), as rule 60 asks.
