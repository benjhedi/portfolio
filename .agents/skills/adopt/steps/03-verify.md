# Step 3 - Verify and record the debt

Adoption is done when a fresh session works the Wara way without help, and
when every gap left in the code has a name and a place.

## Fresh session test

In a fresh session at the repo root (or the app folder in a multi-app repo),
run `/next` in Claude Code or `$next` in Codex. It must identify the adoption
state and one next action from local files. Fix the read order or paths it
tripped on.

## Hooks test

```bash
git checkout -b feat-adoption-check
git commit --allow-empty -m "bad message"      # must be refused
git commit --allow-empty -m "[feat-adoption-check]: verify the hook"  # accepted
git checkout <adoption-branch> && git branch -D feat-adoption-check
```

Adapt the messages to the project's format when it kept its own.

## Review agent test

In Claude Code, run the local review-agent on a recent merged branch
(`git diff <base>...<tip>`). In Codex, ask a native subagent to review the
same diff using the audit as its scope. It must find known debt and nothing
invented. Calibrate a rule or project override for deliberate choices.

## Record the debt

- One refactor spec per theme from the gap table (`/specify`): hardcoded values, rules in
  ViewModels, missing tests, stale documents. Audit counts as findings,
  grep-based acceptance criteria, no behavior change.
- Waves: tokens and documents first, architecture moves second, tests
  third. Sequence written in `docs/roadmap-adoption.md` or the existing
  roadmap.
- Decisions recorded after the fact as ADRs (step 1) are linked from the
  specs that depend on them.

`/handoff` or `$handoff`: state of the adoption branch, what the adoption
changed, the first three specs in order, open questions and pitfalls met.

## Merge and afterwards

Open a PR from the adoption branch to the project's integration branch,
with Summary (what moved where) and Test plan (the checks above). Run
`check.sh .claude` and, for Codex, `check.sh .agents` to check installed
instructions and skills. Append `Adoption: complete | <date> | <branch or PR>`
to `docs/audit/inventory.md`. The kit is a baseline, not a dependency:
when a project rule improves on a kit rule, propose the change back to the
kit so the next project starts from the better version.
