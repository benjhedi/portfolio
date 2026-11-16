# Step 2 - Reconcile entry files and resume state

Read the live `AGENTS.md` and, for recorded hosts `claude` and `both`,
`CLAUDE.md`. Check each against the corresponding path inside the backup.

- If the backup contains the entry, use the live file as the base and the
  adjacent `AGENTS.kit.md` or `CLAUDE.kit.md` as the new kit reference.
  Preserve edits made since the backup. If the reference or the live entry
  is missing, report the path and leave that entry for review.
- For an entry created by this run, review the live template directly. Fill
  placeholders only from established project facts.

Carry forward project decisions, build commands, naming conventions and
approval preferences. Include new kit guidance only where it applies to the
installed modules. Flag any conflict for the user. Keep the shared workflow
in `AGENTS.md` when `CLAUDE.md` imports it.

Check the audit, handoff and local history for prior adoption completion.
An older inventory can describe the state before that adoption. Confirm the
recorded completion checks against the current entry files, product context
and architecture. An installed kit or a merge alone is insufficient.
When these agree, include `Adoption: complete | <date> | <evidence>` in
the proposed audit update and retain the dated historical findings.
Update stale handoff facts from current Git state and recorded decisions.
Keep any remaining adoption checks visible when completion is uncertain.

Show a minimal diff for the entries and resume records together with the
old-file findings. Apply approved changes after rechecking the live files.
When no changes are needed, continue directly to the result. Leave the
reference copies available for later comparison.
