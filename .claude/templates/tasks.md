# Tasks NNN - <Feature name>

Plan: `plan.md` (all gates OPEN) | Branch: `feat-<kebab-title>` off `dev`

Each task: one logical change, one commit, one check. Order follows the
construction order of the architecture rule. `[P]` marks tasks that can run
in parallel (no shared file). An agent takes one task at a time.

## Tasks

- [ ] T01 <unit from the architecture rule, e.g. domain types and
  protocol> - files: <paths> - check: `swift build` - agent: developer
- [ ] T02 <next unit> - files: <paths> - check: <command> - agent: developer
- [ ] T03 [P] <tests for T01 units> - files: <test paths> - check:
  `swift test --filter <Suite>` - agent: test-coder
- [ ] T04 <state holder> - files: <paths> - check: <command> - agent: developer
- [ ] T05 <screen, name = mockup name> - files: <paths> - check: preview
  both themes, screenshot vs `<NN-name.png>` - agent: developer
- [ ] T06 <wiring in the composition root or equivalent> - approved
  separately - agent: developer
- [ ] T07 verify - all AC checks below green - agent: qa
- [ ] T08 review - diff against dev, gates reread - agent: review-agent

## Test plan (derived from the EARS criteria)

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | unreadable paste creates nothing, offers manual entry | unit | `createsNothingOnUnreadablePaste` |
| AC-2 | Eco mode on, no animation | unit on animation token | `returnsNoAnimationWhenEcoOn` |
| AC-3 | phone matches existing client, asks before merge | unit | `asksBeforeMergeOnPhoneMatch` |

Every AC has at least one row. A row without a test name is not planned.

## Done when

- All boxes checked, each with its commit on the branch.
- qa report attached (build, tests, scenarios, screenshots).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done, roadmap line checked.
