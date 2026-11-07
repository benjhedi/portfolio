#!/bin/sh
# SessionStart hook: prints the state of the session's repo so Claude knows
# where it stands before the first message. Stdout goes to Claude's context
# only: the Desktop app does not display it (ask Claude to repeat the block).
# Folder: $1, else "cwd" from the hook JSON on stdin (the worktree root in a
# worktree session; CLAUDE_PROJECT_DIR stays on the main checkout), else $PWD.
# Installed by wara-kit at .claude/hooks/session-start.sh. Read-only, no network.

here=$1
[ -z "$here" ] && [ ! -t 0 ] && here=$(sed -n 's/^[[:space:]]*"cwd"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' | head -1)
[ -z "$here" ] && here=$PWD
cd "$here" 2>/dev/null || cd "${CLAUDE_PROJECT_DIR:-.}" 2>/dev/null || exit 0
here=$(pwd -P); root=$(git rev-parse --show-toplevel 2>/dev/null) && cd "$root"

echo "== Repo state (wara-kit session-start hook) =="
[ -n "$root" ] && [ "$root" != "$here" ] && echo "note: session folder $here is not the repo root $root"
echo "branch: $(git branch --show-current 2>/dev/null || echo 'no git')"
echo "status: $(git status --short 2>/dev/null | wc -l | tr -d ' ') file(s) modified or staged"
echo "last commit: $(git log -1 --format='%h %s' 2>/dev/null)"

if [ -n "$(ls product 2>/dev/null)" ]; then echo "product/: $(ls product | tr '\n' ' ')"
else echo "product/: none yet -> run /plan-product or /analyze-product"; fi
arch=$(ls .claude/rules/10-architecture*.md 2>/dev/null | tr '\n' ' ')
[ -n "$arch" ] && echo "architecture rule(s): $arch" \
  || echo "architecture rule: missing -> run /from-codebase (existing code) or /architecture-study"

count=0
for d in specs/*/; do
  [ -f "$d/spec.md" ] || continue
  [ "$count" -eq 0 ] && echo "specs in progress:"; count=$((count + 1))
  status=$(grep -m1 -o 'Status: [a-z |]*' "$d/spec.md" | sed 's/Status: //')
  blocked=$(grep -c 'BLOCKED' "$d/plan.md" 2>/dev/null)    # grep -c prints 0 on no match; empty only if the file is missing
  open=$(grep -c '\[ \]' "$d/tasks.md" 2>/dev/null)
  echo "  $(basename "$d"): status [$status], BLOCKED gates: ${blocked:-0}, open tasks: ${open:-0}"
done
[ "$count" -eq 0 ] && echo "specs/: none yet"

# Most recent handoff by modification time (HANDOFF.md or handoff-*.md), not the first by name.
h=$(ls -t HANDOFF.md handoff-*.md 2>/dev/null | head -1)
[ -n "$h" ] && { echo "handoff ($h, newest):"; sed -n '1,6p' "$h" | sed 's/^/  /'; }

echo "rules loaded: $(ls .claude/rules 2>/dev/null | wc -l | tr -d ' ')  agents: $(ls .claude/agents 2>/dev/null | tr '\n' ' ')"
echo "== Follow .claude/rules/07-sdd-flow.md. Ask before any file change. =="
exit 0
