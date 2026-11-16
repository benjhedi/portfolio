# Step 3 - Report old kit files

Use `install.log` to identify added, updated, patched, skipped and removed
paths. A logged skill directory covers its nested files. For changed
components compare the backup to the live paths, including files inside
skills, patched Claude settings and annotations in `*.kit.md` reference copies.
Review the scope selected for this run.
If the script was run twice before review, the latest backup may already
contain the updated files. Use earlier backups in this worktree's Git backup
directory to trace the first replacement and cite the relevant backup.

- If an older file held a project-specific command, path or instruction
  lost during the upgrade, give its relative path, what changed and where
  the previous text can be recovered in the backup.
- For an unselected or unlisted component, look for evidence of a former kit
  file in this project's history or an explicit replacement in the updated
  instructions. Mark it as a cleanup candidate only with that evidence.
- Keep project-authored and uncertain files. A changed checksum, a similar
  name or absence from the installer log alone does not establish ownership.

Only report the paths that require a decision. Leave cleanup and restoration
to a separate user request. Retain the backup even when the report is empty.
