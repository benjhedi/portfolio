# Plan NNN - <Feature name>

Spec: `spec.md` (status clarified) | Architecture rule: `.claude/rules/10-architecture.md`

## Gates (constitution check) - all must be OPEN before implementation

Filled from the repo, never from memory. One line per item, with the path
that proves it. A BLOCKED gate names who clears it.

Design
- Design system: <package or folder, found at path> | OPEN / BLOCKED
- Tokens for every value in the mockups (font roles, background, both
  themes): <found / missing: list> | OPEN / BLOCKED (ds-agent)
- Mockups: <NN-name.png per screen and state> | missing: <state> |
  OPEN / BLOCKED (design-agent)

Rules and skills
- Rules that apply: <00-06 core, 07, 10-architecture, platform rules
  matched by paths, 50, 60>
- Skills to load: <design-to-code/implement-screen, platform skill>
- Constitution principles touched: <numbers> and how the plan honors them

Architecture
- Units this change needs per the architecture rule: <e.g. view, state
  holder, use case, repository> | covered by the rule: yes / no (study)
- Modules touched and boundary crossed: <list> | allowed by the rule: yes / no

Verification
- Each AC mapped to a check: <AC-1: unit test X; AC-2: UI test or
  screenshot; AC-3: grep>
- Side-by-side screenshot against <mockup>, light and dark

## Technical approach

<Ten lines maximum. What is created, in which module, behind which
protocol, and the order of construction derived from the architecture
rule. Alternatives considered in one line each, with the reason rejected.>

## Data model and contracts

<Types and their fields, protocols with their methods, persistence entity
and mapping if any. Personal data fields with consent and retention.>

## Risks and open decisions

<What could invalidate the plan, and the decision Hedi must take, if any.>

## Research notes

<Platform API checked, version constraint, link to the doc read.>
