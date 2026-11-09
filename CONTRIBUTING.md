# Contributing

How work enters this repo. The hooks in `.githooks/` and the
`conventions.yml` workflow enforce the git part; this file explains it.

## Setup

```bash
nvm use                       # Node 22 (.nvmrc)
npm ci                        # @warastudio/* come from GitHub Packages, see .npmrc
./scripts/setup-hooks.sh      # once per clone: core.hooksPath = .githooks
git lfs install --skip-repo   # once per machine: LFS filters, no hooks (ADR 004)
npm run dev                   # http://localhost:5173
```

The Wara DS packages need a GitHub token with `read:packages` in your user
`~/.npmrc`. Never commit it. The contact form key goes in a local `.env`
(see `.env.example`).

git-lfs is needed to read, add or change the videos under `docs/`
(`brew install git-lfs`); without it they check out as pointer files. Skip
the step and a new video goes up as a plain blob, and the `lfs-pointers` CI
job fails the PR. A plain `git lfs install`
stops on the existing pre-push hook, hence `--skip-repo`:
`.githooks/pre-push` does the upload.

## Branches

- `main`: what is live. Only a release branch merges into it.
- `dev`: integration. Every work branch starts from it and returns by PR.
- Work branches: `type-title`, lowercase, digits and hyphens, `type` in
  `feat fix chore docs refactor test perf ci`. Example: `feat-hero-oval`.
- Claude Desktop sessions start on `WR/<name>`, which the hooks reject:
  rename with `git branch -m <type-title>` before the first commit.
- Release: `chore-release-1-7-0` cut from `dev`, PR to `main`, then tag.

## Commits

`[type-title]: message`, where the tag equals the branch name. Two
sentences maximum in the subject, present tense, no trailing period. One
logical change per commit. Never commit `dist/`, `.wrangler/`, `.env` or
`.claude/settings.local.json`.

## Before a pull request

- `npm test` and `npm run build` pass locally (CI runs both).
- A screen change is compared with its mockup, light and dark, and passes
  an axe or Lighthouse audit plus one keyboard pass (rule 31).
- The PR targets `dev`, with a Summary and a Test plan.

## Releases

A `v*` tag on `main` deploys to Cloudflare and creates the GitHub Release
(`.github/workflows/release.yml`). Pushes to `main` alone deploy nothing.

## Where decisions live

`product/` for the what and why, `.claude/rules/10-architecture.md` for the
architecture, `docs/adr/` for every other technical choice.
