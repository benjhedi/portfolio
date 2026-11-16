# Spec 007 - v2 hero

Branch: `feat-v2-hero` | Status: planned (2026-11-15), tokens gate OPEN (2026-11-16, spec 009)
Depends on: met by spec 008 on 2026-11-15, mockup version 1794759302-6b38 with the oval retinted to sky, the role line of AC-13, the toggle of AC-17 and the notchless small phones of AC-5, hero PNGs re-exported (benjhedi/portfolio#35).
Roadmap line: Phase 1, "A visitor sees the hero: oval with the looping portrait video, an app, the site or a product leaving the vapor at each loop, name and role below; poster under reduced motion. Needs the mockup. Open: oval background, loop crossfade ([log])."

## Why

Today's v1 hero, a full-width duotone video behind a long claim, looks generic and does not show the work (mission, "the problem"). The v2 hero puts Hedi's animated portrait in an oval with his name and role under it, and at each breath one of his real apps, the site or a product leaves the vapor, so the first screen already points at shipped work (differentiator 2). It is the first v2 screen.

## User stories, by priority

- P1 As a prospect, I want to see who Hedi is and what he does in the first screen so that I know in seconds whether to keep reading.
- P1 As a visitor who asked for reduced motion, I want a complete static hero so that nothing moves without my consent (constitution 5).
- P2 As a prospect, I want to glimpse real apps and products as the portrait breathes so that the proof starts before I scroll.
- P2 As a keyboard or screen reader user, I want the hero to be named, reachable and readable in both themes so that I get the same first screen (constitution 11).
- P3 As a visitor, I want a hint that leads me to the next section so that the one-page site reads as a sequence.

## Acceptance criteria (EARS)

- AC-1 THE hero SHALL render a centered column at least one viewport tall with the oval, the name, the role line and the "Défiler" hint, matching `01-hero.png`, `01-hero-dark.png`, `01-hero-mobile.png` and `01-hero-mobile-dark.png` of the retinted mockup side by side, the vapor object aside.
- AC-2 THE oval SHALL keep the mockup proportions: 1.5/1 wider than 900 px, `min(78vw, 860px)` wide and capped by the viewport height so the hero ends above the bottom bar (720 px wide at 1440 x 900, back to 860 px from about 995 px high), reserving the mockup's 56 px bar height even before the bottom bar ships, so the oval matches the PNGs (Hedi, 2026-11-15, at /plan); 92vw at 1.25/1 at 900 px and narrower; video cropped with `object-fit: cover` at 50 % 28 %.
- AC-3 WHILE motion is allowed THE hero SHALL play the mockup's 4.21 s portrait clip muted, inline, from page load and in a loop, with no audio track played and no native control shown; its built-in crossfade, two heads overlaid from about 3.5 s to 4 s, is accepted as is (Hedi, 2026-11-15).
- AC-4 WHEN the video reaches 2.05 s in a loop THE hero SHALL release exactly one vapor object for that loop, in the order RIDE app, site, franceinfo app, product window, GearTrack app, then again from RIDE; the object starts at the mouth (x 67 %, y 51 % of the oval, 47 % at 900 px and narrower), grows along the vapor to the right and slightly up, peaks, then fades out.
- AC-5 THE vapor objects SHALL be an HTML layer above the video, never pixels of the video, hidden from assistive technologies; the small phones show their screenshot whole, without the notch the mockup's global phone rule adds (Hedi, 2026-11-15).
- AC-6 WHILE reduced motion is on THE hero SHALL show the poster without playing the video, release no vapor object, draw the hint line static and show every hero element at once, matching the four `01-hero-reduced*.png`.
- AC-7 WHERE the URL carries `?motion` THE hero SHALL behave as AC-3 and AC-4 even under reduced motion (existing demo escape, CLAUDE.md).
- AC-8 WHEN a hero element first enters the viewport THE system SHALL fade it in and raise it by `--ws-space-24` (24 px, the mockup's 22 px rounded to the existing spacing token) over 0.8 s, once (README, common to every screen; Hedi, 2026-11-15).
- AC-9 THE hero SHALL read every visible and accessible text (name, role, hint, video label, product window label, toggle labels) from `src/content/content.ts` in FR and EN; a grep of the hero's source finds no literal copy.
- AC-10 THE hero SHALL show the name "Hedi Jahouach" and contain no "Benjahouach", "Wara" or Wara Studio logo (constitution 1 and 2).
- AC-11 WHEN the visitor activates the "Défiler" hint by pointer or keyboard THE page SHALL move to the section placed right after the hero, by its id from `content.ts`: `#apropos` today, `#intro` once the statement spec moves it; the hint never points to a missing anchor (Hedi, 2026-11-15).
- AC-12 THE hint and the toggle SHALL be reachable with Tab and show the 2 px focus ring; name, role, hint and toggle SHALL pass WCAG AA contrast in light and dark (axe or Lighthouse, keyboard pass).
- AC-13 THE video SHALL expose an accessible name describing the portrait, and the page's only `h1` SHALL wrap the name and the role line, laid out as the mockup shows them; the SEO spec may change the role text, not this structure (Hedi, 2026-11-15).
- AC-14 THE hero media SHALL weigh no more than the mockup files: 190 KB for the WebM, 493 KB for the MP4, 22 KB for the poster (`ls -l` on the build output).
- AC-15 WHILE the video loads, and IF it fails to load, THE hero SHALL show the poster with no vapor object, no message and no indicator, as the reduced PNGs show; a video that starts later loops normally.
- AC-16 THE oval SHALL tint the video to sky through an SDK token, in light and dark, as the retinted mockup shows; the tint is the hero's one color moment (rule 50, Hedi, 2026-11-15).
- AC-17 WHILE motion is allowed THE oval SHALL carry a discreet play/pause toggle, named from `content.ts` and reachable by keyboard (WCAG 2.2.2); WHILE a mouse hovers the oval the toggle follows the cursor, otherwise it rests at the bottom center of the oval (touch, keyboard focus, autoplay refused); a click or a tap anywhere in the oval toggles: pause stops the loop, the vapor objects and the "Défiler" hint line on the current frame, play resumes them (Hedi, 2026-11-15, after the spec 008 review); IF the browser refuses autoplay THEN the toggle shows play over the poster. A pause chosen by the visitor holds until they press play. Under reduced motion no toggle shows, as the reduced PNGs (Hedi, 2026-11-15).
- AC-18 WHEN the hero leaves the viewport or the tab is hidden THE video SHALL pause, and resume on return unless the visitor paused it; WHEN reduced motion turns on while the page is open THE hero SHALL fall back to the AC-6 poster, and WHEN it turns off THE loop SHALL start unless the visitor paused it (Hedi, 2026-11-15, at /plan).

## Screens and states

| Screen | Mockup | States covered |
|---|---|---|
| 01 Hero, playing | `docs/v2/ecrans/01-hero.png`, `-dark`, `-mobile`, `-mobile-dark` | video looping, RIDE at its peak, hint line drawn |
| 01 Hero, reduced motion | `docs/v2/ecrans/01-hero-reduced.png`, `-dark`, `-mobile`, `-mobile-dark` | poster, no vapor object, hint static |
| 01 Hero, other vapor objects | `docs/v2/mockup/index.html` (site, franceinfo, product, GearTrack) | not exported as PNG; the mockup source is the reference |
| 01 Hero, loading or video failed | `docs/v2/ecrans/01-hero-reduced*.png` | poster, nothing else (AC-15) |
| 01 Hero, play/pause toggle | the new mockup version (Depends on) | play/pause toggle on the loop and play on the poster, light and dark (AC-17) |

Sources: `docs/v2/README.md` section 01 Hero, `docs/v2/decision-log.md` (2026-11-07 hero entries, 2026-11-10 oval cap and known details), media in `docs/v2/mockup/img/`, source clip in `docs/v2/source/`.

## Data and rules touched

- Content: `identity.name` becomes "Hedi Jahouach", so the v1 nav, footer copyright and About alt follow and the page never shows two names (constitution 1); the initials, the `index.html` title and og:title and the contact `from_name` stay with the nav, SEO and contact specs (Hedi, 2026-11-15). The role line reads the existing `identity.role`, "Consultant iOS senior, freelance" / "Senior iOS consultant, freelance", in place of the mockup's "Conception et développement iOS, de l'idée à la production", judged too generic and too narrow for missions on existing apps, coaching and audits (Hedi, 2026-11-15). New entries: hint "Défiler" / "Scroll"; video label "Portrait animé de Hedi Jahouach, silhouette qui tourne et souffle une vapeur" / "Animated portrait of Hedi Jahouach, a silhouette turning and breathing out vapor"; product label "Compagnon de réunion" / "Meeting companion"; toggle "Lecture" / "Play" and "Pause" / "Pause" (Hedi, 2026-11-15).
- Media: the portrait loop (WebM, MP4), its poster, and the vapor images (RIDE, franceinfo, GearTrack screenshots, site capture).
- No personal data collected, no form, no storage. The portrait is Hedi's own image.
- Visual values come from the SDK tokens only (rule 50); a value the mockup hardcodes and no token covers is a gate of the plan.

## Out of scope

- The fixed nav (HJ mark, links, FR/EN, theme toggle, "Me contacter"), the bottom bar and the preloader, even though the hero PNGs show them: they belong to the roadmap line "A visitor always reaches ...".
- The mobile menu and the language switch, which need their own mockup (README, known details).
- The statement section and where the v1 hero copy goes (claim, sub, CTAs, meta, and the clients marquee the v1 hero renders): the statement, bottom bar and clients specs. That copy stays in `content.ts` (constitution 4); the page lacks it on dev between this spec and those, and no `v*` tag is cut in between (Hedi, 2026-11-15).
- Title, meta description, hreflang and JSON-LD: the SEO spec.
- Any 3D, and any reuse of the hero by another site (mission, out of scope).

## Open points

None: every marker was settled with Hedi on 2026-11-15.
