# Tasks NNN - <Feature name>

Plan: `plan.md` (all relevant gates OPEN)
Branch: `<project branch convention>`

Each task has explicit dependencies, one responsibility owner, a bounded
scope and an acceptance check. `none` means it has no prerequisite. `[P]`
marks a task that can run alongside another ready task without overlapping
write scopes. The main session maps responsibility to a suitable worker.

## Task graph

- [ ] T01 <domain types and protocol>
  - Depends on: none
  - Owner: implementation
  - Files / scope: `<paths>`
  - Acceptance / check: `swift build`
- [ ] T02 [P] <adapter>
  - Depends on: T01
  - Owner: implementation
  - Files / scope: `<paths>`
  - Acceptance / check: `<command>`
- [ ] T03 [P] <tests for T01>
  - Depends on: T01
  - Owner: test-writing
  - Files / scope: `<test paths>`
  - Acceptance / check: `swift test --filter <Suite>`
- [ ] T04 <screen, name = mockup name>
  - Depends on: T02
  - Owner: implementation
  - Files / scope: `<paths>`
  - Acceptance / check: preview and screenshot against `<NN-name.png>`
- [ ] T05 <composition-root wiring>
  - Depends on: T02, T04
  - Owner: implementation
  - Files / scope: `<paths>`; approved separately if required
  - Acceptance / check: `<command>`
- [ ] T06 [P] verify
  - Depends on: T01, T02, T03, T04, T05
  - Owner: verification
  - Files / scope: acceptance criteria
  - Acceptance / check: all AC checks pass
- [ ] T07 [P] review
  - Depends on: T01, T02, T03, T04, T05
  - Owner: review
  - Files / scope: diff against integration branch
  - Acceptance / check: review verdict APPROVED

## Test plan

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | unreadable paste creates nothing, offers manual entry | unit | `createsNothingOnUnreadablePaste` |
| AC-2 | Eco mode on, no animation | unit on animation token | `returnsNoAnimationWhenEcoOn` |
| AC-3 | phone matches existing client, asks before merge | unit | `asksBeforeMergeOnPhoneMatch` |

Every acceptance criterion has at least one check. A row without a test name
is not planned.

## Done when

- All implementation tasks are complete with their checks recorded.
- QA evidence is attached when the change needs a separate QA pass.
- Review is APPROVED and all relevant gates are rechecked.
- `spec.md` status is done and the roadmap line is checked when applicable.
