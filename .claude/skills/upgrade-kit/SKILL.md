---
name: upgrade-kit
description: >
  Finish an explicit wara-kit upgrade after upgrade.sh succeeds. Reconcile
  project instructions and identify local changes that need review.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Edit, Write, Bash
---

# Upgrade kit

Work in one session at the upgraded repository. Use its local files and the
backup created by `upgrade.sh` for this worktree.

1. Confirm the installation using [the run record](steps/01-preflight.md).
2. Prepare [entry and resume-state changes](steps/02-entry-merge.md).
3. Check [the previous kit files](steps/03-old-files.md). Show the findings
   alongside the proposed diff. Apply changes within the user's approved scope.

Finish with the files changed, any paths requiring attention and the
backup location. To resume ongoing work, recommend `/next` in Claude Code
or `$next` in Codex in a fresh session. For first-time onboarding use
`start` in the host's syntax. Check that the chosen skill exists for that
host. If neither is available, invite the user to describe their next task
in a fresh session at this repository.
