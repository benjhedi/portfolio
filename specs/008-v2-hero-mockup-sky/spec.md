# Spec 008 - v2 hero mockup, sky

Branch: `feat-hero-mockup-sky` (stacked on `feat-hero-spec`, merged after it) | Status: clarified (2026-11-15)
Roadmap line: Phase 1, "A visitor sees the hero ... Needs the mockup." This spec clears the `Depends on` line of spec 007.

## Why

Spec 007 settled four hero changes the frozen mockup does not show: the oval retinted to sky, the role line "Consultant iOS senior, freelance", a play/pause toggle (WCAG 2.2.2) and the small vapor phones without their notch (decision log, 2026-11-15). Rule 60 builds a screen only from a validated mockup, so the mockup changes at its source first, is frozen again and its hero PNGs re-exported, as spec 005 did.

## User stories, by priority

- P1 As the implementer of spec 007, I want hero PNGs that show the decided hero so that I compare against the intended design.
- P2 As the maintainer, I want the frozen copy to match a published artifact version so that the reference stays traceable.

## Acceptance criteria (EARS)

- AC-1 THE hero oval SHALL retint the video to sky with variant A, a duotone: a layer of `--ws-color-accent` in `mix-blend-mode: color` between the video and the vapor objects, opacity 0.62 in light and 0.5 in dark as in v1, so the video keeps its luminance and the tint flips with the theme; on the loop and on the reduced motion poster (Hedi, 2026-11-15, from three variants captured by design-agent). Whether the two opacities need an SDK token is a gate of the plan (rule 50).
- AC-2 THE hero role line SHALL read "Consultant iOS senior, freelance".
- AC-3 WHILE motion is allowed THE oval SHALL show a round play/pause toggle, Lucide Play and Pause icons, 32 px visible in a 44 x 44 hit area (rule 31), resting at the bottom center of the oval and following the cursor while a mouse hovers the oval, where a click anywhere toggles (Hedi, 2026-11-15): pause while the loop plays, play over the poster when paused or when autoplay is refused, the PNGs freezing it at rest, with the 2 px focus ring on keyboard focus; WHILE reduced motion is on no toggle SHALL show.
- AC-4 THE small vapor phones SHALL show their screenshot whole, without the notch.
- AC-5 WHEN the mockup is exported before and after the change with the same settings THE element boxes SHALL differ only inside the hero; every other section SHALL keep its height and boxes.
- AC-6 THE claude.ai artifact SHALL hold the change as a new version, and `docs/v2/mockup/` SHALL hold that version's files, each matching its published sha256 listed in the README; the README hero section, the decision log, `product/tech-stack.md` and `product/mission.md` SHALL name it; the export script SHALL re-export the hero PNGs and exit 0; `npm test` and the build pass.

## Screens and states

| Screen | Mockup | States covered |
|---|---|---|
| 01 Hero | `docs/v2/ecrans/01-hero*.png`, re-exported | loop with toggle on pause, RIDE at its peak, light and dark, desktop and mobile |
| 01 Hero, reduced | `docs/v2/ecrans/01-hero-reduced*.png`, re-exported | retinted poster, no toggle |
| 01 Hero, paused or autoplay refused | described in the README hero section, not exported (Hedi, 2026-11-15) | poster with toggle on play |

## Data and rules touched

None: no content, no personal data. The mockup stays French only; its tokens come from `tokens.css` (rule 50).

## Out of scope

Any other section of the mockup; an English mockup; the nav, bottom bar and preloader; code in `src/` (spec 007).

## Open points

None: every marker was settled with Hedi on 2026-11-15. Variants B (sky-300 multiply, too close to the current oval) and C (sky-400 multiply, darkens the face, a large accent area against rule 50, hides the video if the blend fails) were dropped.

