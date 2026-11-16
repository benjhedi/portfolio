# DECISIONS.md - the design decisions log

Different from an ADR. An ADR records a technical decision with options
and consequences. The decisions log freezes design and product choices
made during exploration, one numbered entry each, so later screens and the
implementation follow them without re-debating.

## Shape

```
# <Product> - validated design decisions (<date of the direction>)

This document freezes the choices from the explorations. Reference for the
remaining screens and for updating the handoff. When a later decision
replaces an earlier one, a note at the top says which and since when.

## Direction retained
Name of the track, three sentences on what makes it recognizable.

## Frozen tokens
Light table, dark table, gradient with all stops, typography, buttons.

## Decisions
### D1 - <title> (<date>)
Context in one or two lines. The choice. The alternatives rejected and why.
### D2 - ...
```

## Rules

- A decision settles a product question (what the primary button is, where
  the margin is shown, whether a document stays white in dark mode) or a
  visual constant (tokens, radii, motion). It is not a task list.
- Numbered, dated, never deleted. A superseded decision gets a line
  "Replaced by DN on <date>" and stays for history.
- Written by design-agent when a mockup settles a question, by Hedi when
  he arbitrates. The implementation cites decision numbers in ADRs and
  commit bodies when relevant.
- One file per product. The handoff `CLAUDE.md` condenses the live
  decisions; the log keeps the reasoning.

## Typical entries from the repos

The accent is decorative on light backgrounds (low contrast) and never used
for text actions; green is reserved for an "enabled / OK" status and red for
error text, or forbidden entirely in a forgiving habit tracker; the invoice
is a document, not an interface, so it stays white in dark mode; one
gradient moment per screen, the CTA turns charcoal when a gradient hero is
present; Eco mode is true black plus zero animation, persisted.
