---
name: verify
description: >
  Proves a change meets its spec: build, tests mapped to each EARS criterion,
  greps, screenshots against the mockups in both themes, then a report in the
  spec folder (qa agent). Use it before review or whenever Hedi asks "is it
  really done". Pass the spec number.
user-invocable: true
allowed-tools: Read, Grep, Glob, Write, Bash
---

# Verify

Input: `$ARGUMENTS`, the spec number. Output: `specs/NNN/verification.md`
and a verdict. Agent: qa.

## 1. Checks, from the test plan

For each row of the test plan in tasks.md: run the test (filtered), record
pass or fail with the command and its output tail. A criterion without a
green row fails the verification, whatever the rest says.

## 2. Build, static checks, screens, scenarios

Build the declared target; lint and format; the greps the plan listed (no
hardcoded value, no forbidden import in a protected layer, no personal
data in logs). For each screen: capture light and dark at the mockup's
device size, place next to the PNG, list every difference with its cause
(spec gap, platform constraint, bug); an accepted platform constraint is
written as a decision. Walk the EARS criteria as a user would when no UI
test covers them, one line per scenario, Reduce Motion and Eco included.

## 3. Report

```
Verdict: PASS / FAIL
Criteria: N green, M red (list the red with the failing command)
Build and lint: ok / errors
Screens: N compared, differences: ...
Scenarios walked: ...
Not verified and why: ...
```

## Rules

- Evidence, not assertions: the command and its output, the screenshot
  path. "Tests pass" without output is not a result.
- qa changes no production file. A failure goes back to the task.
- FAIL is a normal outcome, not a judgment; say what is red and stop.
