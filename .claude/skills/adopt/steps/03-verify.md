# Step 3 - Verify and record the debt

Adoption is done when a fresh session works the Wara way without help, and
when every gap left in the code has a name and a place.

## Fresh session test

In a new Claude Code session at the repo root (or the app folder in a
multi-app repo), run `/session-start`. It must produce the full report
without asking where a document is. Fix the read order or the paths it
tripped on; re-run.

## Hooks test

```bash
git checkout -b feat-adoption-check
git commit --allow-empty -m "bad message"      # must be refused
git commit --allow-empty -m "[feat-adoption-check]: verify the hook"  # accepted
git checkout chore-adopt-kit && git branch -D feat-adoption-check
```

Adapt the messages to the project's format when it kept its own.

## Review agent test

Run review-agent on a recent merged branch (`git diff <base>...<tip>`). It
must find the known debt from the audit and nothing invented. Calibrate a
rule or a project override when it flags deliberate choices.

## Record the debt

- One refactor spec per theme from the gap table (`/specify`): hardcoded values, rules in
  ViewModels, missing tests, stale documents. Audit counts as findings,
  grep-based acceptance criteria, no behavior change.
- Waves: tokens and documents first, architecture moves second, tests
  third. Sequence written in `docs/roadmap-adoption.md` or the existing
  roadmap.
- Decisions recorded after the fact as ADRs (step 1) are linked from the
  specs that depend on them.

`/handoff`: state of `chore-adopt-kit`, what the adoption changed, the
first three specs in order, open questions, pitfalls met.

## Merge and afterwards

PR `chore-adopt-kit` to `dev` with Summary (what moved where) and Test
plan (the three tests above). After merge, run the kit's `check.sh .claude`
to confirm no file exceeds 50 lines. The kit is a baseline, not a
dependency: when a project rule improves on a kit rule, propose the change
back to the kit so the next project starts from the better version.
