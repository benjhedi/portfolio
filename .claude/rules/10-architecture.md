Inferred on 2026-11-07 from the code, to validate

# Architecture - Portfolio

Drafted by `/from-codebase` at a356458 (20 files, 2476 lines in `src/`). It
records what the code does; `/architecture-study` decides keep, evolve or
migrate. Situation: taken over, v1 live, v2 ahead. Level: simple, one layer.

## Axis 1 - Presentation pattern: section components, no state holder

- One page, no router. `App.tsx` renders `Nav`, 8 sections in `<main>` and
  `ProjectModal`. Navigation is `#id` anchors: ids in `nav` (`content.ts:32`),
  plus `top` (`Hero.tsx:75`) and `contact` (`Contact.tsx:11`).
- 0 ViewModel, store or reducer. Components read content and call `useApp()`
  themselves; local `useState` in 5 of 13 component files.
- Cross-section state: `openId` in `App.tsx:16`, props to Work, ProjectModal.
- App-wide state: `src/app/AppContext.tsx` (locale, `t()`, theme), used by 11
  of 13 components. `src/app/useReduce.ts` wraps reduced motion.

## Axis 2 - Dependency rule: free

- `src/content/content.ts`: 0 imports, 21 data and 4 type exports, imported
  directly by `App.tsx` and 12 of 13 components. Types used as is, no mapping.
- Side effects sit where they are used: Web3Forms POST in `ContactForm.tsx:40`
  (key from `import.meta.env`, line 9); `localStorage`, `matchMedia`,
  `document` in `AppContext.tsx:23-55`; key listener and scroll lock in
  `ProjectModal.tsx:17-21`; `location.search` in `useReduce.ts:12`.
- No interface at any boundary: 0 in `src/` outside `vite-env.d.ts`.
- Libraries imported in place: `motion` 9 files, `lucide-react` 6, `gsap` in
  `Work.tsx` only, `@warastudio/react` in `ContactForm.tsx` and `main.tsx`.

## Axis 3 - Modularity: single package, folders by kind

One npm package, no workspaces, no path alias. Folders by kind, not feature:
```
src/main.tsx, App.tsx   composition root: styles, provider, sections, modal
src/app/                AppContext.tsx, useReduce.ts; imports content types
src/components/         13 flat files: Nav, 8 sections, ProjectModal, Phone,
                        ContactForm, Primitives (9 exports, used by 8 sections)
src/content/content.ts  all bilingual copy and data; imports nothing
```
Direction: components -> app, content, Primitives; app -> content types;
content -> nothing. 12 component files export one unit each.

## Agents, triggers, decisions

Agents derive nothing until Hedi validates; triggers set by the study.

| 2026-11-07 | Inferred | from-codebase | to validate |
