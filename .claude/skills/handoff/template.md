# Handoff - <chantier or project> - <date>

Where to resume. Replaces `<previous handoff>` (kept for history).
Last update: <date>, by <session or person>.

## State

- `dev`: last commit `<sha> <subject>`, tests <green / red: which>.
- Branch `<type-title>`: <N> commits ahead of `dev`, <merged / open PR / wip>.
- Generator: `<tuist generate / xcodegen generate / npm install>` needed on a
  fresh clone: yes / no.

## Done this session

Three to six lines, at intent level. What the user or the codebase gained,
not the file list (the diff carries that).

## Next steps, in order

1. <step> - <agent or skill> - <branch>
2. <step> - <agent or skill> - <branch>
3. <step>

## Open decisions

- <question>: option A <...>, option B <...>. Recommendation: <...>.
  Decided by: Hedi / client / PM. Linked ADR or decision: <ref or none>.

## Pitfalls met

- <symptom>: <cause>, <workaround>. Permanent fix: <ticket or ADR>.

## Resume

```
/session-start <spec number or branch>
```

Then: <the first concrete action, one line>.
