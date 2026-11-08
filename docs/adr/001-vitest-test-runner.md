# 001 - Vitest as the test runner

## Status

Accepted

## Context

The architecture rule chosen on 2026-11-07 (`docs/architecture-study.md`,
option B) puts effects behind service interfaces and timing logic in pure
units, so both can be tested with doubles. The repo had no test runner.
Rule 05 asks for every dependency to be justified and recorded.

## Options considered

**A - Vitest 4.1.12, node environment**
- (+) native to Vite: reuses the installed Vite 6.4.2 and its config, no
  second transform pipeline
- (+) Jest-compatible API, fast watch mode, 24 small transitive packages
- (-) one more dev dependency to keep in step with Vite majors

**B - Node's built-in test runner (`node --test`)**
- (+) zero dependency
- (-) no TypeScript or Vite import resolution without a loader, so the
  `import.meta.env` and alias handling must be rebuilt by hand

**C - Jest**
- (+) widest ecosystem
- (-) needs Babel or ts-jest beside Vite, two configs for one codebase

## Decision

Adopt **Vitest 4.1.12**, pinned, in `devDependencies`. Node environment,
no jsdom or happy-dom: the rule excludes component tests. Tests sit next to
the unit as `*.test.ts`. `npm test` runs `vitest run --passWithNoTests`,
and CI runs it before the build. 5.1.0 was skipped because it was five
days old on the decision date.

## Consequences

Easier:
- pure units (`vaporSchedule`) and adapters (`contactSender` with a
  `fetch` double) are tested in seconds, locally and in CI

Harder:
- a Vite major upgrade must check Vitest compatibility in the same change

Follow-up:
- a component test need is an evolution trigger in `10-architecture.md`:
  it reopens the study before adding a DOM library
- `product/tech-stack.md` lists Vitest once `product/` is extracted
