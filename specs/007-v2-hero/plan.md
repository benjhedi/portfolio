# Plan 007 - v2 hero

Spec: `spec.md` (status clarified, conflicts C1 to C3 settled at /plan in
d1a645a) | Architecture rule: `.claude/rules/10-architecture.md` | Branch:
`feat-v2-hero`, off `origin/dev` 01eb184

Decisions D1 to D7 taken by Hedi on 2026-11-15 (Risks and decisions). One
gate stays BLOCKED: the five SDK tokens of D1, requested from WaraDS-Web
through ds-agent. The tasks that do not read them can start first
(Sequencing).

## Gates (constitution check) - all must be OPEN before implementation

Design
- Design system: `@warastudio/theme` 0.2.0 installed and locked
  (`node_modules/@warastudio/theme/package.json`, `package-lock.json`
  l.2524-2527), 131 `--ws-*` variables in
  `node_modules/@warastudio/theme/dist/style.css`, light on `:root`, dark
  on `[data-theme=dark]`; `src/sdkTokens.test.ts` fails on any undefined
  `var(--ws-...)` in `src/**/*.{css,tsx}`, so `sections/hero/hero.css` is
  covered without change | OPEN
- Tokens found (mockup `docs/v2/mockup/index.html` l.102-158, l.339-346):
  oval `--ws-ref-ink`, hairline `--ws-color-border`, tint
  `--ws-color-accent`; toggle `--ws-ref-porcelain`, `--ws-ref-charcoal`,
  `--ws-shadow-inset`, `--ws-r-pill`, `--ws-color-focus-ring`, glide
  `--ws-motion-base` (160 ms); spacing `--ws-space-4/8/16/20/24/32/40/48/56/64`;
  name `--ws-color-text`, `--ws-w-regular`, `--ws-w-semi`; role
  `--ws-color-text-muted`, size `clamp(var(--ws-size-body), 1.6vw,
  var(--ws-size-card))` (16 and 20 px exist); hint `--ws-color-text-muted`,
  size `--ws-size-micro` (12 px, D2: one pixel above the mockup's 11 px),
  line `--ws-color-border-strong`; vapor windows `--ws-color-surface`,
  `--ws-color-border`, `--ws-r-comfy` (8 px), bar `--ws-ref-porcelain`,
  dots and bars `--ws-ref-blue-grey-200`, product `--ws-ref-surface`,
  label `--ws-ref-charcoal`; mono `--font-mono` (`src/index.css` l.23,
  self-hosted JetBrains Mono) | OPEN
- Values fixed by a decision, named custom properties at the top of
  `hero.css`, one comment each: `78vw`, `860px`, `1.5/1`, `92vw`, `1.25/1`,
  `100svh`, `50% 28%`, and the reserved 56 px bar height (AC-2, d1a645a);
  `364px` (spec 005); mouth `67% 51%`, `47%` at 900 px and narrower
  (AC-4); tint opacity `0.62` / `0.5` (spec 008 D1); toggle 44 / 32 / 16 /
  22 / 6 px and 2 / 4 px ring spreads (spec 008 gate and review notes);
  toggle clamp inset 26 px (D3); 2.05 s and 1 s are clip timings, named
  constants in `vaporSchedule.ts` (rule 10) | OPEN
- Hero composition values (D1 = C), named once in `hero.css` with a
  one-line comment each, no token request | OPEN
  - motion: `emerge` 2.1 s `cubic-bezier(.2,.7,.2,1)`; hint line 2.2 s
  - type: name `clamp(22px, 2.4vw, 30px)`, tracking `-.01em`, line height
    `1.2`; product label 11 px inside the hidden illustration
  - vapor illustration: phone 92 / 56 px, ratio 9/19.5, radii 14 / 11 / 3
    px, padding 3 / 6 / 10 px, windows 200 / 120 px, product 132 / 88 px
    high with a 48 px rail, 7 px dots, bar widths 72 / 84 / 40 %; shadow
    `0 18px 40px` ink at 45 %; `emerge` keyframes (scale .04 to 1.03, blur
    10 / 4 px, opacity .9, translate 96 / -34 then 130 / -64 px, mobile 34 /
    -18 then 50 / -34 px)
  - halo: radial 60 % at center, transparent 55 %, ink at 35 %; hint line
    1 x 36 px
- SDK tokens requested from WaraDS-Web (D1 = C), ready to send; ds-agent
  clears the gate, the names are proposals it may change | BLOCKED

  | Proposed name | Value | Mockup source | Reused by |
  |---|---|---|---|
  | `--ws-motion-reveal` | `.8s` | l.328 `.r` transition | 01 hero, 02 statement, 04 projects, 05 about, 06 offers, 07 process, 08 career, 09 skills, 10 contact (every `.r`; README: common to every screen) |
  | `--ws-motion-reveal-rise` | `22px` | l.328 `.r` `translateY(22px)` | same screens as the reveal |
  | `--ws-ease-emphasized` | `cubic-bezier(.16,1,.3,1)` | l.24 local `--ease-out`, 8 uses: loader l.64, nav l.71, `.btn` l.93, hero toggle l.125, hint line l.157, statement lines l.176, project phones l.221, reveal l.328 | 00 preloader, nav, 01 hero, 02 statement, 04 projects, buttons on every screen, every reveal |
  | `--ws-motion-stagger` | `.1s` (delays are 1, 2, 3 steps) | l.330 `.d1` .1 s, `.d2` .2 s, `.d3` .3 s | `d1`: 01, 04, 05, 06, 07, 08, 09, 10; `d2`: 01, 05, 06, 07, 09; `d3`: 01 |
  | `--ws-track-label` | `.14em` | l.156 hint, l.171 statement `.what .k`, l.200 `.sec-k`, l.238-239 numbered section labels | 01 hero, 02 statement, 04 projects, 05 to 09 numbered sections |

  Mono label size: no new token. D2 puts the hint on `--ws-size-micro`,
  which exists; an 11 px label token would break rule 50's 12 minimum.
  The 16 other 11 px sizes in the mockup (l.75 to l.363, the product label
  included) meet the same question in their own specs. Statement line delays (l.178, a .08 s
  step) are not covered by the stagger token.
- Mockups (`docs/v2/ecrans/`, LFS objects present, checked with `file`):
  playing `01-hero.png`, `-dark` (1440 x 900), `-mobile`, `-mobile-dark`
  (780 x 1688); reduced `01-hero-reduced.png`, `-dark`, `-mobile`,
  `-mobile-dark`; other vapor objects in `index.html` l.419-425 and
  l.134-151; loading and failed = the reduced PNGs (AC-15); toggle paused
  and autoplay refused described in `docs/v2/README.md` l.205-236, not
  exported (decision log 2026-11-15) | OPEN
  - Behaviour the frozen mockup lags and the spec or Hedi settles (rule
    02): the hint line held on pause (AC-17, log 2026-11-15 after the 008
    review; mockup l.122 holds the vapor only); the toggle hidden while
    loading or failed (AC-15, D4); the toggle kept inside the oval (D3);
    the hint at 12 px (D2). design-agent adds the last two as README known
    details

Rules and skills
- Rules that apply: 00 to 07 (05: no new package; `motion` 11.18.2,
  `lucide-react` 1.17.0, `react` already installed, `cwebp` a machine tool
  for D5; 06: no personal data, same-origin media only), 10-architecture,
  30 and 90 (`*.ts`, `*.tsx`, `*.css`), 31 (`*.tsx`, `*.css`), 50, 60
- Skills to load: `design-to-code` (`reference/implement-screen.md`),
  `implement`, `verify`, `commit`
- Constitution principles touched:
  - 1: `identity.name` becomes "Hedi Jahouach"; nav, footer and About alt
    follow; title, og:title, initials and `from_name` stay with their specs
    (spec Data)
  - 2: no brand mark; tokens only; AC-10 grep
  - 4: every hero string and the media paths in `content.ts`; the v1 hero
    copy and the clients marquee data stay there, off the page until the
    statement, bottom bar and clients specs (spec Out of scope, d1a645a)
  - 5: under reduced motion an `<img>` poster, no vapor, no toggle, static
    line, everything shown
  - 7: mockup gate OPEN; tokens gate BLOCKED on the five SDK tokens only
  - 8: one runnable check per AC (Verification)
  - 9: no dependency added
  - 10: units placed as the rule names them (Architecture)
  - 11: toggle and hint reachable, 2 px ring, 44 x 44 targets, AA
    contrast both themes, axe and a keyboard pass

Architecture
- Units, named as the rule names them | covered by the rule: yes
  - content: `identity.name`, new `heroV2` entries (`content/content.ts`)
  - pure units next to the section: `sections/hero/vaporSchedule.ts` (the
    rule's own example), `sections/hero/heroPlayback.ts` (toggle and
    playback state), `sections/hero/ovalGeometry.ts` (toggle clamp, D3)
  - services, one interface and one adapter file each:
    `services/motionPreference.ts` + `services/mediaQueryMotionPreference.ts`,
    `services/videoClock.ts` + `services/htmlVideoClock.ts` (both named in
    the rule); `contactSender` and `themeStore` belong to their own specs
  - service context: `app/ServiceContext.tsx` ("service context", Axis 3);
    `main.tsx` picks the adapters (Axis 2)
  - section: `sections/hero/Hero.tsx` and its stylesheet
    `sections/hero/hero.css` (read as part of the component; the rule
    names no stylesheet, review-agent to confirm)
- Modules touched: `content/`, `sections/hero/` (new), `services/` (new),
  `app/` (new file), `main.tsx`, `App.tsx` (section order),
  `components/Hero.tsx` removed with the v1 hero block of `index.css`
  l.185-255 (rule 10, D6), `public/hero/` (new media; `hero-1.mp4` and
  `hero-1.jpg` removed in their own commit, D6) | allowed by the rule:
  yes. No section imports another; `shared/` is not created (the reveal
  serves one section until the statement spec)
- Effect placement: `matchMedia` and `location` only in
  `mediaQueryMotionPreference.ts`; `IntersectionObserver` and
  `document.visibilityState` only in `htmlVideoClock.ts`; the one-shot
  reveal uses `useInView` from `motion/react`, the animation library the
  sections already use, not a raw browser API. `app/useReduce.ts` stays
  for `components/` with a `// shortcut:` line (D7)

Verification
- Shared tooling: qa drives Chrome over CDP against `npm run build` then
  `vite preview`, at 1440 x 900 dpr 1 and 390 x 844 dpr 2 `mobile: true`,
  light and dark, motion and reduced; for screenshots it freezes the page
  as `docs/v2/export-screens.mjs` does (video at 3.56 s, RIDE `emerge` at
  1512 ms, hint line at 1100 ms). Nav and bottom bar bands are masked:
  out of scope. `npm test` and `npm run build` pass at every task.
- AC-1: side by side against the four playing PNGs; box probe of oval,
  name, role, hint (centers on the axis, gaps 40 / 4 / 48 px); the hint
  text is expected one pixel larger than the PNG (D2), the only accepted
  difference in the hint box
- AC-2: probe oval box with the 56 px bar reserved: 720 px wide at 1440 x
  900, 860 px from about 995 px high (1440 x 1000), ratio 1.5 at 901 px
  wide, 1.25 and 92vw at 900 and 390; computed `object-fit: cover`,
  `object-position: 50% 28%`; the stack under the oval measured against
  `364px`
- AC-3: probe `muted`, `loop`, `playsInline`, no `controls`, `paused`
  false, `currentTime` advancing then wrapping, `duration` 4.21 s;
  `ffprobe` on `dist/hero/*` lists no audio stream
- AC-4: `vaporSchedule.test.ts`: one release per loop at the first t >=
  2.05, re-arm below 1 s, order 0 to 4 then 0, none while t stays under
  2.05; probe over six loops: RIDE, site, franceinfo, product, GearTrack,
  RIDE; origin at 67 % / 51 % (47 % at 390)
- AC-5: probe: vapor layer `aria-hidden="true"`, an HTML sibling above the
  video; grep: no `::after` on `.phone` in `hero.css`; RIDE whole in the
  1440 and 390 screenshots
- AC-6: probe under emulated `prefers-reduced-motion: reduce`: an `<img>`
  poster, no `<video>`, no vapor node, no toggle, hint line animation
  `none`, reveal elements at opacity 1 at load; side by side against the
  four reduced PNGs
- AC-7: same emulation plus `?motion`: video playing, vapor released,
  toggle shown; `mediaQueryMotionPreference.test.ts` covers the override
- AC-8: probe: before in-view the oval reads opacity 0 and translateY 22
  px; after, opacity 1 and transform none, transition 0.8 s; a scroll away
  and back does not replay it
- AC-9: grep on `src/sections/hero/` for JSX text and string literals in
  `aria-label` / `alt` (expect none); probe in FR then EN: every label
  switches
- AC-10: `grep -rn "Benjahouach\|Wara" src/sections src/services
  src/app/ServiceContext.tsx` empty; hero `textContent` probe; `identity`
  line in `content.ts` reads "Hedi Jahouach"
- AC-11: probe: click and Enter on the hint land on `#apropos`, its top
  at the viewport top; the id in `heroV2.next` exists in the DOM
- AC-12: keyboard pass (Tab: nav, toggle, hint; ring visible on both);
  axe in both themes and both widths; contrast of name, role, hint, and
  the disc and gap measured as in spec 008 T07
- AC-13: probe: one `h1` on the page, holding name and role; video
  `aria-label` (or poster `alt` under reduced) equals the content label in
  FR and EN
- AC-14: `npm run build && ls -l dist/hero dist/hero/vapor`: webm <=
  189 147 bytes, mp4 <= 492 791, `hero-poster.webp` < 22 374 (the JPEG,
  D5), `site.webp` < 31 967
- AC-15: `heroPlayback.test.ts` (loading and failed: no toggle, no play,
  late success plays); `htmlVideoClock.test.ts` (capture-phase source
  `error` with `NETWORK_NO_SOURCE` reports failed; `NotAllowedError`
  refused, `AbortError` interrupted, other rejections failed); probe with
  CDP `Fetch` failing both sources: poster only, no toggle, no vapor;
  probe with a 3 s delayed response: poster, then loop and toggle
- AC-16: grep `hero.css` for the tint rule; computed background equals
  the resolved `--ws-color-accent`, `mix-blend-mode: color`, opacity 0.62
  light, 0.5 dark; PNG comparison
- AC-17: `heroPlayback.test.ts` (toggle, refused shows play, visitor pause
  survives watchable changes, held = paused or refused, toggle hidden
  while loading and failed); `ovalGeometry.test.ts` (inside point
  unchanged, center unchanged, points past the inset ellipse projected
  onto it, both ratios); probe as spec 008 T07: rest 16 px above the oval
  bottom, follow within the clamp, the toggle box and its ring inside the
  oval at the four extreme cursor points, click anywhere and a touch tap
  pause video, vapor and hint line on the current frame (times held over
  500 ms), Enter toggles, `play()` stub rejecting `NotAllowedError` gives
  the poster with play, reduced: no toggle in the DOM
- AC-18: `heroPlayback.test.ts` (watchable and reduced events; a visitor
  pause survives reduced on then off) and `htmlVideoClock.test.ts`
  (document and observer doubles); probe: scroll the hero out, `paused`
  true; back, playing unless the visitor paused; `visibilitychange` with a
  stubbed `visibilityState`; live `Emulation.setEmulatedMedia` on and
  off: poster, then the loop starts, and stays on the poster with play
  when the visitor had paused
- Side by side: the eight `01-hero*.png`, light and dark, desktop and
  mobile, hero region only; Safari and Firefox by hand (blend mode, `svh`,
  autoplay in low power mode), not covered by spec 008

## Technical approach

Build order of rule 10. 1, content: `identity.name`, `heroV2` (labels,
`next` id, media paths, vapor list); media copied from `docs/v2/mockup/img/`
to `public/hero/` and `public/hero/vapor/` in kebab-case, poster and site
capture converted to WebP with `cwebp` (D5). 2, pure units with tests:
`vaporSchedule`, `heroPlayback` (reducer plus a derived view),
`ovalGeometry` (D3). 3, services with tests: `motionPreference` (matchMedia
`change` plus the `?motion` escape) and `videoClock` (play outcome, time,
failure, watchable = in viewport and tab visible), provided by
`app/ServiceContext.tsx`, picked in `main.tsx`. 4, section
`sections/hero/Hero.tsx` + `hero.css` ported from the mockup, `App.tsx`
renders it, `components/Hero.tsx` and its CSS block deleted. 5, reduced
path: `<img>` poster, no vapor, no toggle, static line, read live through
`useSyncExternalStore`. 6, qa against the PNGs, then review.

Rejected: `useReduce` for the hero (motion 11.18.2 `useReducedMotion` reads
the preference once, AC-18 needs live changes); Tailwind utilities for the
hero (arbitrary values are findings under rule 90, keyframes and pseudo
elements read better as CSS); state from media `play`/`pause` events (spec
008 contract: the export and AC-18 pause without the visitor);
`requestVideoFrameCallback` for the 2.05 s release (the mockup uses
`timeupdate`, parity first); a fifth `pageVisibility` service (one
watchable signal on the clock covers AC-18); `motion` `whileInView` with JS
durations (keeps timings in CSS where the tokens land).

## Data model and contracts

No entity, no storage, no personal data, no network call besides
same-origin media.

```ts
// content/content.ts (imports nothing)
export const identity = { name: "Hedi Jahouach", /* rest unchanged */ };
export type VaporObject =
  | { kind: "phone" | "site"; src: string }
  | { kind: "product" };
export const heroV2 = {
  next: "apropos",                // AC-11; "intro" once the statement spec lands
  hint: { fr: "Défiler", en: "Scroll" } as L,
  videoLabel: { fr: "Portrait animé de Hedi Jahouach, silhouette qui tourne et souffle une vapeur",
                en: "Animated portrait of Hedi Jahouach, a silhouette turning and breathing out vapor" } as L,
  productLabel: { fr: "Compagnon de réunion", en: "Meeting companion" } as L,
  toggle: { play: { fr: "Lecture", en: "Play" } as L, pause: { fr: "Pause", en: "Pause" } as L },
  media: { webm: "/hero/hero.webm", mp4: "/hero/hero.mp4", poster: "/hero/hero-poster.webp" },
  vapor: [
    { kind: "phone", src: "/hero/vapor/ride.webp" },
    { kind: "site", src: "/hero/vapor/site.webp" },
    { kind: "phone", src: "/hero/vapor/franceinfo.webp" },
    { kind: "product" },
    { kind: "phone", src: "/hero/vapor/geartrack.webp" },
  ] as VaporObject[],             // AC-4 order
};

// sections/hero/vaporSchedule.ts
export const VAPOR_RELEASE_AT_S = 2.05;
export const VAPOR_REARM_BELOW_S = 1;
export type VaporClock = { armed: boolean; released: number };
export function tickVapor(clock: VaporClock, t: number, count: number):
  { clock: VaporClock; release: number | null };   // index = released % count

// sections/hero/heroPlayback.ts
export type LoadStatus = "loading" | "playing" | "refused" | "failed";
export type HeroPlayback = { reduced: boolean; status: LoadStatus; visitorPaused: boolean; watchable: boolean };
export type HeroPlaybackEvent =
  | { type: "reducedChanged"; reduced: boolean } | { type: "started" } | { type: "refused" }
  | { type: "failed" } | { type: "toggled" } | { type: "watchableChanged"; watchable: boolean };
export function heroPlayback(state: HeroPlayback, event: HeroPlaybackEvent): HeroPlayback;
export function heroView(state: HeroPlayback):
  { shouldPlay: boolean; toggle: "hidden" | "pause" | "play"; held: boolean };
// shouldPlay = !reduced && watchable && !visitorPaused && status is loading or playing
// toggle: hidden when reduced, loading or failed (D4); "play" when visitorPaused or refused
// held (vapor and hint line paused) = visitorPaused || status === "refused"
// reducedChanged to false: status back to loading (video remounts), visitorPaused kept (AC-18)

// sections/hero/ovalGeometry.ts (D3)
export const TOGGLE_INSET_PX = 26;   // half the 44 px target plus the 4 px ring
export function clampToOval(p: { x: number; y: number }, box: { width: number; height: number },
                            inset: number): { x: number; y: number };
// p relative to the oval box; a point outside the ellipse of semi-axes
// (width / 2 - inset, height / 2 - inset) is scaled toward the center onto it

// services/motionPreference.ts
export interface MotionPreference { reduced(): boolean; subscribe(onChange: () => void): () => void }
// services/mediaQueryMotionPreference.ts
export function createMediaQueryMotionPreference(win: Pick<Window, "matchMedia" | "location">): MotionPreference;

// services/videoClock.ts
export type PlayOutcome = "playing" | "refused" | "failed" | "interrupted";
export interface VideoClock {
  play(): Promise<PlayOutcome>;    // NotAllowedError refused, AbortError interrupted, other failed
  pause(): void;
  onTime(listener: (seconds: number) => void): () => void;          // timeupdate
  onFailed(listener: () => void): () => void;                       // every source failed
  onWatchable(listener: (watchable: boolean) => void): () => void;  // in viewport and tab visible
}
export type CreateVideoClock = (video: HTMLVideoElement) => VideoClock;
// services/htmlVideoClock.ts
export function createHtmlVideoClock(video: HTMLVideoElement,
  env?: { document: Document; IntersectionObserver: typeof IntersectionObserver }): VideoClock;

// app/ServiceContext.tsx
export type Services = { motionPreference: MotionPreference; createVideoClock: CreateVideoClock };
export function ServiceProvider(props: { services: Services; children: ReactNode }): JSX.Element;
export function useServices(): Services;
```

Section contract: `<section id="top" aria-labelledby>` pointing at the `h1`
(keeps the anchor the v1 nav targets, needs no new copy); the `h1` wraps
two block spans, name in `strong` and role, each with its own reveal; the
oval holds the video (or the `<img>` poster under reduced), the tint, the
vapor layer (`aria-hidden`, rendered only with motion), the halo and the
toggle (a native `button`, rendered only when `heroView().toggle` is not
hidden, Lucide `Play` / `Pause` at stroke 1.5, label from content). One
`onClick` on the oval toggles (the button's click bubbles, Enter and Space
included); after a refusal the handler calls `play()` in the click stack to
keep the user activation. `pointermove` with `pointerType === "mouse"`
sets the toggle position from `clampToOval` through a ref, `pointerleave`
resets it. The section root carries `data-held` and `data-reduced`;
`hero.css` pauses `.out.go` and the hint line under `data-held` and drops
animations and transitions under `data-reduced` (no `@media` query, so
`?motion` works). A vapor release re-keys the active object to restart
`emerge`. `hero.css` reads the five requested tokens by their shipped
names; until the SDK ships them, no task writes them (rule 50).

Media, plain git (ADR 004 keeps `public/` out of LFS), about 0.85 MB
added: `public/hero/hero.webm` (189 147 B), `hero.mp4` (492 791 B),
`hero-poster.webp` (under 22 374 B), `public/hero/vapor/ride.webp`,
`franceinfo.webp`, `geartrack.webp` (copied as is), `site.webp` (under
31 967 B). Removed in a separate commit: `public/hero/hero-1.mp4`,
`hero-1.jpg` (1.9 MB, D6).

## Risks and open decisions

Settled by Hedi on 2026-11-15:
- C1 to C3 (spec d1a645a): the 56 px bar is reserved before the bar
  ships; reduced motion off restarts the loop unless the visitor paused;
  the clients marquee leaves with the v1 hero, back with the clients spec.
- D1 = C: five SDK tokens through ds-agent (table above), composition
  values for the hero-only values. D2: hint at `--ws-size-micro`. D3:
  clamp 26 px inside the ellipse, tested. D4: toggle hidden while loading
  and after a failure. D5: WebP with `cwebp`, each under its JPEG. D6: v1
  hero CSS block goes with the component, `hero-1.*` in their own commit.
  D7: `useReduce` stays for legacy components with a `// shortcut:` line.

Sequencing for `/tasks`:
- Can start now, no requested token read: content and media (T1), pure
  units and their tests (T2), services, service context and `main.tsx`
  with their tests (T3), the `hero-1.*` removal commit.
- Waits for the tokens: the section and `hero.css` (T4), the reduced path
  (T5), qa and review (T6). Under ADR 003 an SDK upgrade is its own change
  with a build and a visual check in both themes, like spec 006: WaraDS-Web
  publishes the version, a separate upgrade change pins it exactly on
  `dev`, then T4 starts on `feat-v2-hero` rebased on it. T4 is also where
  `components/Hero.tsx` leaves `App.tsx`, so `dev` keeps the v1 hero until
  then.

Other risks:
- The token names are proposals; if ds-agent ships other names, the plan's
  contract holds and `hero.css` uses the shipped ones. If WaraDS declines
  one, the value falls back to D1 option B for that value, which is a new
  decision, not a silent literal.
- The hint is 12 px against 11 px in the PNG: a one-pixel larger label,
  and the stack under the oval may grow by about one pixel against
  `364px`; the AC-2 probe measures it.
- WebP from a lossy JPEG adds a generation of compression; the side by
  side against the reduced PNGs (poster) and the site object catches a
  visible loss, and `cwebp` quality goes up while staying under the JPEG
  bytes.
- `wrangler.jsonc` sets `not_found_handling: "single-page-application"`:
  a missing video returns `index.html` with 200, so failure comes as a
  decode error, not a 404; the AC-15 probe runs on `vite preview` and on
  `npm run preview`.
- The v1 nav stays 72 px high; the hero keeps the mockup's 64 + 32 px top
  padding, so the top gap differs from the PNG until the nav spec. The
  comparison masks the nav band.
- `heroV2` is a working name beside the v1 `hero` entry the statement
  spec will consume; that spec can rename it.
- `Magnetic`, `CutReveal`, `PreserveCase` in `components/Primitives.tsx`
  lose their only user; reported, left for the spec that empties
  `Primitives` (rule 05, removing).

## Research notes

- `motion` 11.18.2: `useReducedMotion` keeps its first value in
  `useState` (read in
  `node_modules/framer-motion/dist/es/utils/reduced-motion/use-reduced-motion.mjs`,
  its own TODO says so), so `useReduce` cannot meet AC-18. `useInView`
  exists with `once`, `margin`, `amount`
  (`node_modules/framer-motion/dist/es/utils/use-in-view.mjs`). Verified.
- Lucide 1.17.0 ships `play.mjs` and `pause.mjs`
  (`node_modules/lucide-react/dist/esm/icons/`). Verified.
- Media: `hero.webm` VP9 and `hero.mp4` H.264, 896 x 720, 4.209 s and
  4.208 s, no audio stream (`ffprobe`); poster JPEG 896 x 720; site
  capture JPEG 560 x 354. `cwebp` at `/opt/homebrew/bin/cwebp`; Homebrew's
  `ffmpeg` has no WebP encoder. Verified.
- Mockup token inventory for D1: tracking, 11 px labels, `--ease-out`
  uses and `.r` / `d1` to `d3` placement grepped in `index.html` today.
  Verified.
- `HTMLMediaElement.play()` rejects with `NotAllowedError` on a refused
  autoplay and `AbortError` when `pause()` or a load interrupts it (also
  StrictMode's double effect in dev). With `<source>` children each
  failing source fires a non-bubbling `error` at the `<source>`, the media
  element ends in `NETWORK_NO_SOURCE` and a pending `play()` may never
  settle; a capture listener on the video sees those events. From memory
  of the HTML spec (resource selection algorithm), not re-read today: the
  AC-15 probe proves it in Chrome.
- React sets `muted` as a property, not an attribute; the adapter sets
  `video.muted = true` before `play()`, as v1 does
  (`src/components/Hero.tsx:58`). From memory.
- A `play()` after a refusal must run inside the click handler to carry
  the user activation, Safari being the strictest. From memory.
- `timeupdate` fires every 15 to 250 ms, so a release lands between 2.05 s
  and about 2.30 s, as in the mockup. From memory.
- `mix-blend-mode: color` under `isolation: isolate` verified in Chrome
  157 by spec 008; `svh` and the blend in Safari and Firefox are this
  spec's manual pass.
- Range requests on Cloudflare static assets: v1.6.0 serves
  `public/hero/hero-1.mp4` live today, indirect evidence; qa plays the MP4
  in Safari on `npm run preview`.
