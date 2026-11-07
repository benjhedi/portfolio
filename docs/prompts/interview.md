# Brief prompt

Paste in a fresh session (Claude Code, Cowork or chat) to produce the brief
of a new product before any code. Attach the client document if one exists.

---

I am starting <Product>, a <platform> app. Before any technical
discussion, help me write the brief. Work in challenger mode: ask me one or
two questions at a time, make me justify what looks obvious, and write
nothing until I confirm each answer.

Cover, in this order:

1. One sentence: what it does, for whom. And what it is not.
2. The one product rule that is never negotiable.
3. The screens, in flow order, with an MVP flag on each.
4. What is explicitly out of scope for this version.
5. Data: local-first or connected, sync, AI (on-device or cloud), payment.
6. Audience of the repo and the documents: client, team, only me. Language
   of product documents.
7. Design material already available: sketches, direction, brand.
8. Open product questions, each with who decides and by when.

Output: `docs/brief.md` under 50 lines with these eight sections, in
<French / English>, humanizer style (plain hyphens, no em dashes, no emoji,
no decorative bullets). Then the first two sections of `AGENTS.md`.

When it is a client POC, add a closed scope list (exactly the client's
items, each mocked or real), the budget frame, the deliverable form
(installed app, clickable HTML prototype, video), and the rule that client
documents contain no technical solution.

Finish by reading the brief back to me in three sentences and asking what I
would not sign today.
