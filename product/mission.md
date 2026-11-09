# Mission - Portfolio Hedi Jahouach

Sources: [log] `docs/v2/decision-log.md` (2026-11-07, then dated entries); [mockup] `docs/v2/mockup/`, frozen from claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM, version 1794063463-7380; [SEO] `docs/v2/seo-accueil.md`.

## Pitch

A one-page bilingual FR / EN site where a prospect sees that Hedi Jahouach, senior freelance iOS consultant, designs and builds iOS apps from idea to production, checks it against real apps he shipped, and starts a project with him (`content.ts` hero, [SEO] H1, [log]). Instead of judging him from a LinkedIn profile, a PDF CV or a freelance platform listing (Hedi, 2026-11-07).

## Users

- A company or product lead with an iOS app to build from scratch or from existing mockups, who wants one senior contractor, fixed-price or staffing (`content.ts` offers, hero.sub).
- Recruiters and service companies (ESN) placing iOS missions, who check the track record before proposing him (Hedi, 2026-11-07).
- Peers and LinkedIn contacts, for whom the site carries his professional credibility (Hedi, 2026-11-07).

## The problem and today's workaround

- The prospect must judge a contractor fast; the site answers with one contact, real apps and a clear process (`content.ts` about, projects, steps).
- v1.6.0 looks generic, its proof (projects and their detail) does not stand out fast enough, and its images and missing SEO hold it back; v2 fixes these three (Hedi, 2026-11-07).

## Differentiators

1. One senior contact from scoping to the App Store, no relay, no loss of context (`content.ts` aboutHead, [SEO] H2).
2. Real track record: apps shipped for TF1, Decathlon, France Televisions, Radio France, SNCF, 6 detailed cases and 9 others (`content.ts` clients, projects, more).
3. Two ways to work: the whole app, or built from the client's mockups, as a mission, fixed-price or staffing (`content.ts` offers).

## Non-negotiable product rules

1. Displayed name "Hedi Jahouach" only, "HJ" text monogram; SEO targets Jahouach only ([log], decided 2026-11-07). `content.ts` identity still says Benjahouach; the [SEO] copy says Jahouach since 2026-11-09.
2. No Wara Studio mention or logo anywhere; Wara tokens are the technical design system only ([log]).
3. Sober, direct tone, real track record, no overselling (former `CLAUDE.md` (a3d1bda)).
4. All current content kept, read from `content.ts`, the single bilingual source ([log] scope, former `CLAUDE.md` (a3d1bda)).
5. Reduced motion respected everywhere; the hero video falls back to its static poster ([log] hero, former `CLAUDE.md` (a3d1bda)).

## Out of scope for v2

- More than one page, project pages with their own URL, a router ([log] scope, `docs/architecture-study.md`).
- A 3D hero or any 3D dependency, removed in v1.6.0 (eae2e50, `docs/architecture-study.md` constraints).
- Reuse of the hero outside this site ([log], 2026-11-07).

## Success in one year

- Lighthouse mobile 90+, light video and images (`docs/architecture-study.md` needs).
- Prospects write through the contact form, and at least one mission is signed from the site, no target figure set; the site comes first on a search for "Hedi Jahouach", and Hedi sends its link instead of a CV (Hedi, 2026-11-07).

## Context

Own product, own repo taken over with the kit: v1.6.0 live on Cloudflare since 2026-07-01, v2 redesign ahead, no deadline stated (`git tag`, `docs/architecture-study.md`). Built by Hedi with Claude Code agents; product documents in English (Hedi, 2026-11-07).
