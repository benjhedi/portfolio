#!/bin/sh
# Activates the versioned git hooks of the repo. Run once after cloning:
#   ./scripts/setup-hooks.sh
# core.hooksPath is a local, unversioned config: every clone runs this.

set -e
repo_root=$(git rev-parse --show-toplevel)
cd "$repo_root"

if [ ! -d .githooks ]; then
  echo "No .githooks/ folder at the repo root. Copy it from the kit first." >&2
  exit 1
fi

chmod +x .githooks/* 2>/dev/null || true
git config core.hooksPath .githooks
echo "Hooks enabled: core.hooksPath = .githooks"
echo "Active hooks: $(ls .githooks | tr '\n' ' ')"
