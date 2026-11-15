# Spec 007 - v2 hero

Branch: `feat-v2-hero` | Status: draft
Roadmap line: Phase 1, "A visitor sees the hero: oval with the looping portrait video, an app, the site or a product leaving the vapor at each loop, name and role below; poster under reduced motion. Needs the mockup. Open: oval background, loop crossfade ([log])."

## Why

The first thing a prospect sees today is the v1 hero, a full-width duotone video behind a long claim: it looks generic and does not show the work (mission, "the problem"). The v2 hero puts Hedi's animated portrait in an oval with his name and role under it, and at each breath one of his real apps, the site or a product leaves the vapor, so the first screen already points at shipped work (mission, differentiator 2). It is the first v2 screen and sets the pattern the other section specs follow.

## User stories, by priority

- P1 As a prospect, I want to see who Hedi is and what he does in the first screen so that I know in seconds whether to keep reading.
- P1 As a visitor who asked for reduced motion, I want a complete static hero so that nothing moves without my consent (constitution 5).
- P2 As a prospect, I want to glimpse real apps and products as the portrait breathes so that the proof starts before I scroll.
- P2 As a keyboard or screen reader user, I want the hero to be named, reachable and readable in both themes so that I get the same first screen (constitution 11).
- P3 As a visitor, I want a hint that leads me to the next section so that the one-page site reads as a sequence.

## Acceptance criteria (EARS)

- AC-1 THE hero SHALL render a centered column at least one viewport tall with the oval, the name, the role line and the "Défiler" hint, matching `01-hero.png`, `01-hero-dark.png`, `01-hero-mobile.png` and `01-hero-mobile-dark.png` side by side, the vapor object aside.
- AC-2 THE oval SHALL keep the mockup proportions: 1.5/1 wider than 900 px, `min(78vw, 860px)` wide and capped by the viewport height so the hero ends above the bottom bar (720 px wide at 1440 x 900, back to 860 px from about 995 px high); 92vw at 1.25/1 at 900 px and narrower; video cropped with `object-fit: cover` at 50 % 28 %.
- AC-3 WHILE motion is allowed THE hero SHALL play the portrait video muted, inline, from page load and in a loop, with no audio track played and no control shown.
- AC-4 WHEN the video reaches 2.05 s in a loop THE hero SHALL release exactly one vapor object for that loop, in the order RIDE app, site, franceinfo app, product window, GearTrack app, then again from RIDE; the object starts at the mouth (x 67 %, y 51 % of the oval, 47 % at 900 px and narrower), grows along the vapor to the right and slightly up, peaks, then fades out.
- AC-5 THE vapor objects SHALL be an HTML layer above the video, never pixels of the video, and SHALL be hidden from assistive technologies.
- AC-6 WHILE reduced motion is on THE hero SHALL show the poster without playing the video, release no vapor object, draw the hint line static and show every hero element at once, matching the four `01-hero-reduced*.png`.
- AC-7 WHERE the URL carries `?motion` THE hero SHALL behave as AC-3 and AC-4 even under reduced motion (existing demo escape, CLAUDE.md).
- AC-8 WHEN a hero element first enters the viewport THE system SHALL fade it in and raise it by 22 px over 0.8 s, once (README, common to every screen).
- AC-9 THE hero SHALL read every visible and accessible text (name, role, hint, video label, product window label) from `src/content/content.ts` in FR and EN; a grep of the hero's source finds no literal copy.
- AC-10 THE hero SHALL show the name "Hedi Jahouach" and contain no "Benjahouach", "Wara" or Wara Studio logo (constitution 1 and 2).
- AC-11 WHEN the visitor activates the "Défiler" hint by pointer or keyboard THE page SHALL move to `[NEEDS CLARIFICATION: hint target while the statement section does not exist]`.
- AC-12 THE hint SHALL be reachable with Tab and show the 2 px focus ring; name, role and hint SHALL pass WCAG AA contrast in light and dark (axe or Lighthouse, keyboard pass).
- AC-13 THE video SHALL expose an accessible name describing the portrait; the page heading of the hero is `[NEEDS CLARIFICATION: H1 = name or SEO claim]`.
- AC-14 THE hero media SHALL weigh no more than the mockup files: 190 KB for the WebM, 493 KB for the MP4, 22 KB for the poster (`ls -l` on the build output).
- AC-15 IF the video cannot play `[NEEDS CLARIFICATION: loading, failure and autoplay refusal behavior]`.

## Screens and states

| Screen | Mockup | States covered |
|---|---|---|
| 01 Hero, playing | `docs/v2/ecrans/01-hero.png`, `-dark`, `-mobile`, `-mobile-dark` | video looping, RIDE at its peak, hint line drawn |
| 01 Hero, reduced motion | `docs/v2/ecrans/01-hero-reduced.png`, `-dark`, `-mobile`, `-mobile-dark` | poster, no vapor object, hint static |
| 01 Hero, other vapor objects | `docs/v2/mockup/index.html` (site, franceinfo, product, GearTrack) | not exported as PNG; the mockup source is the reference |
| 01 Hero, loading or video failed | none | `[NEEDS CLARIFICATION: mockup or accepted fallback for loading and failure]` |

Sources: `docs/v2/README.md` section 01 Hero, `docs/v2/decision-log.md` (2026-11-07 hero entries, 2026-11-10 oval cap and known details), media in `docs/v2/mockup/img/`, source clip in `docs/v2/source/`.

## Data and rules touched

- Content: new bilingual entries for the role line, the hint, the video label and the product window label; the name. `identity.name` still says "Hedi Benjahouach" (mission, rule 1). `[NEEDS CLARIFICATION: name source]`
- Media: the portrait loop (WebM, MP4), its poster, and the vapor images (RIDE, franceinfo, GearTrack screenshots, site capture).
- No personal data collected, no form, no storage. The portrait is Hedi's own image.
- Visual values come from the SDK tokens only (rule 50); a value the mockup hardcodes and no token covers is a gate of the plan.

## Out of scope

- The fixed nav (HJ mark, links, FR/EN, theme toggle, "Me contacter"), the bottom bar and the preloader, even though the hero PNGs show them: they belong to the roadmap line "A visitor always reaches ...".
- The mobile menu and the language switch, which need their own mockup (README, known details).
- The statement section and where the v1 hero copy goes (claim, sub, CTAs, meta): the statement and bottom bar specs.
- Title, meta description, hreflang and JSON-LD: the SEO spec.
- Any 3D, and any reuse of the hero by another site (mission, out of scope).

## Open points

- `[NEEDS CLARIFICATION: oval background: the video's own backlit blue-grey as in the mockup, or retinted to sky #41C0F2 as the log leaves open]`
- `[NEEDS CLARIFICATION: loop: accept the 4.21 s clip of the mockup, joined by a crossfade, or regenerate a clip from docs/v2/source that returns to its start pose]`
- `[NEEDS CLARIFICATION: H1 = name or SEO claim]` The mockup makes the name the `h1`; `seo-accueil.md` sets the H1 to "Consultant iOS freelance, de l'idée à la production".
- `[NEEDS CLARIFICATION: name source]` Rename `identity.name` to "Hedi Jahouach" in this spec, which also changes the v1 sections still on the page, or add a hero-only entry.
- `[NEEDS CLARIFICATION: EN copy of the role line, "Défiler", the video label and "Compagnon de reunion"]` None exists in `content.ts`.
- `[NEEDS CLARIFICATION: v1 hero copy until the statement and bottom bar ship]` Replacing the v1 hero removes the claim, sub, CTAs and meta from the page; constitution 4 forbids dropping content. Is dev allowed to carry that gap until those specs land, with no release in between?
- `[NEEDS CLARIFICATION: hint target while the statement section does not exist]`
- `[NEEDS CLARIFICATION: loading, failure and autoplay refusal behavior]` The mockup only covers the poster under reduced motion.
- `[NEEDS CLARIFICATION: notch on the small vapor phones]` The PNGs show the global phone notch hiding the top of the screenshots; keep it or drop it (README, known details).
- `[NEEDS CLARIFICATION: playback lifecycle]` Pause the video when the hero leaves the viewport or the tab is hidden, and react when reduced motion changes while the page is open?

No marker may remain when status moves to clarified.
