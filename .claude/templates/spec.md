# Spec NNN - <Feature name>

Branch: `feat-<kebab-title>` | Status: draft | clarified | planned | done
Roadmap line: <the line this spec implements>

## Why

<Two or three sentences: the user situation, what is missing today, what
is true once this ships. Link to the mission line it serves.>

## User stories, by priority

- P1 As a <user>, I want <action> so that <outcome>.
- P2 As a <user>, I want <action> so that <outcome>.

## Acceptance criteria (EARS)

One testable sentence each. Patterns: WHEN <event> THE SYSTEM SHALL;
WHILE <state> THE SYSTEM SHALL; IF <unwanted> THEN THE SYSTEM SHALL;
THE SYSTEM SHALL <always true>.

- AC-1 WHEN the user pastes an unreadable message THE SYSTEM SHALL create
  nothing and offer manual entry.
- AC-2 WHILE Eco mode is on THE SYSTEM SHALL render no animation.
- AC-3 IF the phone matches an existing client THEN THE SYSTEM SHALL ask
  before merging.

## Screens and states

| Screen | Mockup | States covered |
|---|---|---|
| <ScreenName> | `<handoff>/ecrans/NN-name.png` | default, empty, error |

A screen without a mockup is listed with `[NEEDS CLARIFICATION: mockup]`.

## Data and rules touched

<Entities created or changed, business rules applied (link to the rules
file), personal data involved and the consent fields it needs.>

## Out of scope

<Explicit. What a reader might expect and will not find here.>

## Open points

- `[NEEDS CLARIFICATION: <question>]`
- `[NEEDS CLARIFICATION: <question>]`

No marker may remain when status moves to clarified.
