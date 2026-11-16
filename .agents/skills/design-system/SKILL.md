---
name: design-system
description: >
  Builds, extends or audits a design system the Wara way: tokens with light
  and dark values, platform packages, components with every state, handoff
  CLAUDE.md. Use it for a new design system, a new token or component, or a
  hardcoded-values audit.
user-invocable: true
---

# Design system

The rule is `50-design-tokens.md`; this skill is the method.

## Starting a design system for a product

1. Decide brand or product palette. Brand means Wara DS is consumed as a
   package; product means a distinct palette with its own handoff.
2. Write the token table first, both themes, from the validated mockups
   (`reference/token-taxonomy.md`): colors by role, type roles, radii,
   spacing scale, motion durations and easings.
3. Write the product's handoff `CLAUDE.md` from `reference/handoff-template.md`.
4. Create the platform package (`reference/apple-package.md` or
   `reference/web-package.md`): tokens, then components, then showcase.

## Adding a component

Name, states, existing tokens it uses, the mockup that shows it. Build it
in the package with a showcase entry and both themes; only then may a
feature use it. A new token goes through the token step first.

## Auditing a codebase

```bash
grep -rnE '#[0-9A-Fa-f]{6}|Color\(red:|\.padding\([0-9]|rgba?\(' Sources/ src/
```

Every hit outside the design system package is a finding with the token
that should replace it, or a token to create. Output: a refactor
spec (`/specify`) when the fixes span many files. Checklist in
`reference/audit-checklist.md`.

## Challenger notes

Depth by surface contrast versus shadows; semantic versus raw palette
tokens (which layer components may read); assets catalog colors versus
code-defined colors on Apple (dark mode for free versus one source shared
with the web). Make Hedi name the trade-off before settling.
