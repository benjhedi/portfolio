# Inventory - Portfolio

Extracted on 2026-11-07 by `/analyze-product` step 1, from `dev` at 1e085e5.
Facts with evidence only. The gap table (step 2) is appended after review.

## 1. Layout

| Item | Evidence | State |
|---|---|---|
| App code | `src/` with `app/` (context, hooks), `components/` (13 files), `content/content.ts` | present |
| Content source | `src/content/content.ts`, 414 lines, 19 exports, all `{ fr, en }` | present |
| Static assets | `public/projects/` 12 MB of PNG, `public/hero/hero-1.mp4` 1.7 MB, `public/logos/`, `public/hedi.jpg` | present |
| Tests | no test folder, no test runner in `package.json` | absent |
| Design material in repo | none; v2 mockup lives in a claude.ai artifact (version 5) | absent |
| Docs | `docs/prompts/` (kit only), `docs/adr/` missing | absent |

## 2. Instruction files

| File | Evidence | State |
|---|---|---|
| `CLAUDE.md` | 2026-07-05, English, read order cites `SEO-accueil.md` | stale: describes a Three.js hero removed in v1.6.0 (eae2e50) |
| `AGENTS.md` | kit template, placeholders | to fill (/adopt) |
| `CLAUDE.kit.md` | kit template next to `CLAUDE.md` | to merge (/adopt) |
| `.claude/rules/` | kit 00-07, 30, 31, 50, 60; no `10-architecture.md` | architecture rule absent |

## 3. Documents

| Document | Evidence | State |
|---|---|---|
| `README.md` | French, 58 lines | stale: Three.js hero, sky `#5fa8d9` (theme ships `#41C0F2`), cites `wara-mockup/` removed in 880a389 |
| `SEO-accueil.md` | 3 KB in the main checkout only, untracked | not versioned |
| v2 decision log | Cowork session, pasted on 2026-11-07 | not in the repo |
| CONTRIBUTING, CHANGELOG, ADRs, handoff, specs | none | absent |

## 4. Git conventions in use

| Item | Evidence | State |
|---|---|---|
| Commit subjects, last 100 non-merge | 33 Conventional Commits (`feat(scope): ...`), 2 kit format, 7 other | CC, mostly in French |
| Merged branches | 13 `feat/`, 5 `WR/`, 2 `cloudflare/`, 1 `fix/`, 1 `release/`, 1 kit | slash style, app prefix `WR/` |
| Integration | PRs into `dev`, releases as tags `v1.0.0` to `v1.6.0` | present |
| Hooks | `.githooks/` from the kit since 475661d, `core.hooksPath` set | new |
| CI | `ci.yml` (build on PR), `release.yml` (deploy on `v*` tag), `conventions.yml` (kit) | present |

## 5. Architecture as practiced

| Check | Evidence | State |
|---|---|---|
| Layers | one flat `components/` folder, no domain or data layer | single layer |
| Content access | components import `src/content/content.ts` directly | consistent |
| Global state | `src/app/AppContext.tsx`: locale and theme | present |
| Side effects | contact form posts to Web3Forms from `ContactForm.tsx` | in a component |
| Motion access | `motion/react` in 9 files, `gsap` in `Work.tsx` only | spread |
| Large files | `Primitives.tsx` 333 lines, `Hero.tsx` 312 lines | several units per file |

## 6. Design

| Item | Evidence | State |
|---|---|---|
| Token source | `@warastudio/theme` imported in `src/index.css` and `src/main.tsx`, aliased to `--color-*` | present |
| Literals in CSS | `src/index.css`: 10 color literals, each commented as missing in the SDK | documented |
| Literals in TSX | colors in `AppContext.tsx` (2), `Hero.tsx` (2); 79 Tailwind arbitrary values in 13 files, most in `Nav` (16), `Hero` (11), `ProjectModal` (11) | to audit |
| Dark theme | `[data-theme="dark"]` (Midnight) from the SDK, `prefers-color-scheme` fallback in `AppContext.tsx` | present |
| Reduced motion | `useReduce.ts` wraps `useReducedMotion`; `?motion` URL forces motion | present |
| Fonts | Hanken Grotesk and JetBrains Mono self-hosted via fontsource | present |

## 7. Dependencies

| Package | Imported by | State |
|---|---|---|
| `@warastudio/react` | `main.tsx`, `ContactForm.tsx` | used |
| `@warastudio/theme` | `index.css`, `main.tsx` | used |
| `motion` | 9 files | used |
| `gsap` | `Work.tsx` | used |
| `lucide-react` | 6 files | used |
| `@fontsource-variable/hanken-grotesk`, `/jetbrains-mono` | `index.css` | used |
| `@fontsource-variable/inter-tight`, `/space-grotesk` | nowhere | unused |

## 8. Toolchain

| Item | Evidence | State |
|---|---|---|
| Build | Vite 6, `tsc -b && vite build` | present |
| TypeScript | `strict`, `noUnusedLocals`, `noUnusedParameters` | present |
| Node | `.nvmrc` 22 | pinned |
| Lint, format | no ESLint or Prettier config | absent |
| Deploy | `wrangler.jsonc`, SPA fallback, Cloudflare via tag | present |

## 9. Secrets

`.env.example` only, holding the Web3Forms key name (client-side key by design, per the file). No `.env`, key or credentials tracked or present.

## 10. Permissions

Main checkout `.claude/settings.local.json`: 354 bytes, ignored by git.

## Gap table (step 2)

Kit rules against repo practice. "v2" in the proposal means the debt is
absorbed by the v2 redesign specs, since v2 rewrites every section.

| Kit rule | State | Evidence | Proposal |
|---|---|---|---|
| 00 working mode | aligned | `CLAUDE.md` "Working mode" section | keep |
| 01 challenger | aligned | no repo equivalent, kit rule applies | keep |
| 02 read order | divergent, stale | `CLAUDE.md` cites untracked `SEO-accueil.md`; `AGENTS.md` placeholders | /adopt writes the order in `AGENTS.md` |
| 03 writing style | divergent, consistent | code comments in French; 22 em or en dashes in comments (`index.css` 14, `ContactForm.tsx` 4, `Hero.tsx` 3, `Work.tsx` 1); none in `content.ts` | decided 2026-11-07: English for new or rewritten code, existing comments not translated |
| 04 git | divergent, consistent | history: Conventional Commits, `feat/` and `WR/` branches; kit `type-title` merged in #24 | decided 2026-11-07: kit `type-title` applies, history is pre-kit; rename the app `WR/` branch at session start |
| 05 dependencies | divergent, debt | 2 fontsource packages unused; no ADR for any dependency | report, Hedi decides; ADRs at /adopt |
| 06 security | aligned, one gap | no secret tracked; contact form sends name and email to Web3Forms with no privacy line | v2 contact spec adds the line |
| 07 sdd flow | absent | no `product/`, no `specs/` | this skill, then /specify per v2 chantier |
| 10 architecture | absent | flat `components/`, content read directly | /from-codebase drafts it |
| 30 web: Astro by default | divergent, deliberate | `CLAUDE.md` stack: Vite + React + Tailwind | project rule `90-project-web-stack.md` |
| 30 web: one component per file | divergent, debt | `Primitives.tsx` exports 9 units | v2 |
| 30 web: GSAP lazy chunk | divergent, no reason found | `Work.tsx:2` static import | v2 (projects section rewritten) |
| 30 web: images AVIF or WebP | divergent, debt | `public/projects/` 12 MB PNG; mockup uses WebP | v2 assets spec |
| 30 web: SEO | divergent, debt | no `hreflang`, canonical, sitemap, robots, JSON-LD; `og:title` says Benjahouach | v2 SEO spec (name: Jahouach only) |
| 31 a11y: reduced motion, lang | aligned | `useReduce.ts`; `AppContext.tsx:43` sets `lang` | keep |
| 31 a11y: motion tokens | divergent, debt | 29 literal durations or easings in 12 TSX files | v2 |
| 31 a11y: audit in PR | absent | no axe or Lighthouse step | add to PR test plans from the first v2 spec |
| 50 tokens: CSS | divergent, documented | 10 literals in `index.css`, each commented as missing in the SDK | route to WaraDS (ds-agent), not local |
| 50 tokens: TSX | divergent, debt | 3 hex in TSX (`AppContext.tsx:55`, `Hero.tsx:212,215`); 79 arbitrary values, mostly `text-[..]` (41) and `max-w-[..]` (29) | v2 |
| 60 no screen without mockup | absent in repo | v2 mockup is a claude.ai artifact; no screens folder | version mockup and journal in `docs/` before the first v2 spec |

### Refactor specs to create

- Wave 0, before any v2 screen: version the v2 decision log, the mockup and its media, and `SEO-accueil.md` in `docs/`.
- v2 chantiers absorb: tokens in TSX, motion literals, component split, GSAP, images, SEO, contact privacy line.

### Project rules to write

- `90-project-web-stack.md`: Vite + React + Tailwind kept, Astro default does not apply.
- Git and comment language: decided, kit rules apply, no project rule needed.
