# Writing style - comments, docs, commits, PRs

Apply the humanizer principles to every written text. If the humanizer skill
is installed, use it; otherwise apply the rules below by hand.

## Languages

- Conversation with Hedi: French.
- Technical artifacts: English. Code, comments, docstrings, identifiers,
  architecture docs, commits, README, ADRs, agent and rule files.
- Product and handoff documents written for Hedi or a client may be in
  French. For a new document, confirm the language before writing.
- Never mix both languages in the same field or paragraph.

## Hard bans

- Em dashes and en dashes. Use a plain hyphen, a colon or two sentences.
- Curly quotes. Straight quotes only.
- Emoji, decorative bullets, arrows and other decorative unicode in code,
  comments, commits, docs and chat. Markdown `-` lists are fine.
- Sycophantic openers: "Great question", "Of course", "Certainly".
- Filler patterns: "not only X but also Y", "at its core", "fundamentally",
  "the real question is". Bold on every noun phrase.
- Restating what the code already says in a comment.

## Aim for

- Short to medium sentences, mixed length. Direct, no preamble.
- First person when natural ("I prefer X because").
- Specific over generic. Name the file, the rule, the number.
- Titles in sentence case.

## Comments

Only for the why. DocC comments on public types and methods. `// MARK:` only
when a file has three or more sections. `// TODO(feature): description`.

## Commit messages

Title: what changes, in the format the project enforces (see 04-git). Body,
when needed: lead with the objective or the trigger ("CI caught this",
"this unblocks Y"), not a file inventory. Plain sentences, wrap at 72.

## Pull requests

Title: the objective in one line. Body: Summary (one to four lines a reader
grasps without opening files), Test plan (checklist, `[x]` done, `[ ]`
pending), Dependency only when a PR or ADR must land first.
