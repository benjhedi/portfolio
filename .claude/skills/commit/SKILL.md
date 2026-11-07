---
name: commit
description: >
  Writes a commit message that passes the project's commit-msg hook and the
  writing rules, from the staged diff; proposes message and command, runs
  nothing without approval. Use it when a logical change is staged.
user-invocable: true
allowed-tools: Read, Bash(git *)
---

# Commit

## 1. Check the convention in force

Read `CONTRIBUTING.md` and `.githooks/commit-msg` if present. They override
`.claude/rules/04-git.md`. Note the branch: `git branch --show-current`.

## 2. Check the staged change is atomic

`git diff --cached --stat`, then `git diff --cached`. If the staged files
span several logical changes (Domain and Views together), say so and
propose how to split before writing a message. If generated files are
staged (`.xcodeproj`, `dist/`, `settings.local.json`), flag them first.

## 3. Write the message

Default format: `[type-title]: message`, tag equal to the branch name, two
sentences maximum, present tense, no trailing period. State what changes;
add why only when it is not obvious from the diff.

Body only when the why needs room: lead with the trigger or objective, plain
sentences wrapped at 72 columns, no file inventory. No em dashes, no emoji.

When a `Co-Authored-By` trailer is required, keep a one-sentence subject
without a final period, because the hook counts the trailer's periods.

## 4. Propose, then wait

Show the full message and the command:

```bash
git commit -m "[feat-title]: subject line"
```

Run it only after an explicit go. If the hook rejects it, read the hook
output, fix the message, and show the corrected version before retrying.

`$ARGUMENTS` may carry a hint of the intent to put in the message.
