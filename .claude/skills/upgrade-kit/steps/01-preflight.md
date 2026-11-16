# Step 1 - Confirm the upgrade state

From the current Git root, run `git rev-parse --git-path wara-kit-upgrade-backups`.
Resolve a relative result from that root. Read the `latest` file there. Its
single line names the backup directory for this worktree's latest attempt.
Accept only a direct child directory. Use this run even if older ones exist.

Confirm that the run has a `complete` file. Read its `host`, `selection` and
`install.log`. The host must include the current tool. Each selection line
names the requested preset or a module. Use the log to identify the paths
processed by this run. Existing changes shown by `git status --short` may
predate it. Keep all investigation within this repository and its Git backup.

If the record is missing, identify the missing evidence and direct the user
to run the kit's `upgrade.sh` against this root. If the attempt is incomplete,
report its backup path and last available installer message before a retry.
In either case stop before editing. If the host differs, name the recorded
host and its upgrade command in a fresh session in this repository.
