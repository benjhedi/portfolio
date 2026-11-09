# Tech stack - Portfolio Hedi Jahouach

Versions resolved in `package-lock.json`; importers from `docs/audit/inventory.md` section 7, paths under `src/`. A line marked (fixed) is not reopened without an ADR.

## Platform

- Web, one static page, mobile first; deployed to Cloudflare by `wrangler` on a `v*` tag (`.github/workflows/release.yml`, `wrangler.jsonc`, former `CLAUDE.md` (a3d1bda)); Node 22 (`.nvmrc`).

## Language and UI

- TypeScript 5.9.3, `strict`, `noUnusedLocals`, `noUnusedParameters` (`tsconfig`, inventory section 8) (fixed).
- React 18.3.1 and react-dom 18.3.1; Tailwind 4.3.0 through `@tailwindcss/vite` 4.3.0 (`package.json`, `vite.config.ts`).
- Vite + React + Tailwind kept over the kit's Astro default: ADR 002 records the choice and project rule `90-project-web-stack.md` applies it, written at `/adopt` (inventory gap table, Hedi, 2026-11-07).

## Architecture

- See `.claude/rules/10-architecture.md` (`docs/architecture-study.md`, option B, 2026-11-07). Level: simple, one package, folders by feature, effects behind `services/`. Triggers listed there.

## Persistence and data

- No backend, no database: content is `src/content/content.ts`, bilingual `{ fr, en }` (former `CLAUDE.md` (a3d1bda)).
- Theme and locale held in `app/AppContext.tsx`; the contact form posts to Web3Forms with a client-side key from `VITE_WEB3FORMS_ACCESS_KEY` (`.env.example`, `release.yml`, 887cad5).

## Toolchain and testing

- Vite 6.4.2 with `@vitejs/plugin-react` 4.7.0 and `@cloudflare/vite-plugin` 1.39.1; `npm run build` = `tsc -b && vite build`; Wrangler 4.96.0 for `preview` and `deploy` (`package.json`).
- Hooks: `.githooks/`, `core.hooksPath` set since 475661d; CI `ci.yml`, `conventions.yml`, `release.yml`; no ESLint or Prettier config (inventory section 8).
- Vitest 4.1.12, pinned, node environment, no DOM library, `*.test.ts` next to the unit; `npm test` runs in CI before the build (ADR 001).
- git-lfs (https://git-lfs.com) for the reference videos under `docs/` only, not pinned (a machine tool, like git), tested with 3.8.1; objects upload through `.githooks/pre-push`, and the `lfs-pointers` CI job fails a PR that adds a tracked video as a plain blob (ADR 004).

## Dependencies (each one justified and confined)

| Package | Version | Imported by | Decision |
|---|---|---|---|
| `@warastudio/theme` | 0.1.0 | `main.tsx`, `index.css` | ADR 003 |
| `@warastudio/react` | 0.1.0 | `main.tsx`, `components/ContactForm.tsx` | ADR 003 |
| `motion` | 11.18.2 | `App.tsx`, `app/useReduce.ts`, 7 files in `components/` | none yet |
| `gsap` | 3.15.0 | `components/Work.tsx` (static import, not a lazy chunk) | none yet |
| `lucide-react` | 1.17.0 | 6 files in `components/` | none yet |
| `@fontsource-variable/hanken-grotesk`, `/jetbrains-mono` | 5.2.8, 5.2.8 | `index.css` | none yet |
| `@fontsource-variable/inter-tight`, `/space-grotesk` | 5.2.7, 5.2.10 | nowhere: unused, reported, not removed | Hedi decides |

## Design

- Tokens from `@warastudio/theme`, aliased to `--color-*` in `index.css`; dark = Midnight via `data-theme` (`main.tsx`, inventory section 6). The installed SDK 0.1.0 exposes `--wara-*`; the target is `--ws-*`, as in the v2 decision log and the mockup, from a newer SDK version, upgraded before the first v2 spec (Hedi, 2026-11-07).
- Type: Hanken Grotesk 400 / 600, JetBrains Mono for indexes and tags; icons Lucide (former `CLAUDE.md` (a3d1bda), v2 decision log).
- Mockup: claude.ai artifact BDrsQCHWzgfQRLqBGn9FJM, to version in `docs/` in wave 0 (`product/roadmap.md`).
