# Dependency rule: light

Protocols at the adapter boundaries, no dedicated use case layer. State
holders call services and repositories directly through protocols;
business rules, when they exist, live in a small number of plain types or
in the repository's domain-facing API. A deliberate middle ground.

## The rule

- Services and repositories: behind protocols, injected; they may hold
  simple rules that belong to their data (deduplication by phone inside
  the client repository, for example) when the rule says so.
- State holders: call protocols directly; orchestrate; own screen state.
- Views: know only their state holder (or own their state in the
  view-owned pattern).
- Composition root or environment injection: wires concrete types.
- Thresholds and product values: one configuration type, never literals
  in state holders.

## What it buys

Fewer files per feature than clean, still testable with doubles at the
protocol boundaries, still swappable adapters. Readable by any reviewer.

## What it costs

Rules spread across repositories and state holders as the app grows;
a rule needed by two screens gets duplicated. The review agent must grep
for duplication. Migration to clean is mechanical: extract the rules into
logic units, point callers at them.

## Fits when

Small or medium app, few business rules, one platform, Hedi alone or a
small team, a client codebase already shaped this way.

## Does not fit when

Rules multiply (streaks, pricing, scheduling) or a second target must
reuse them: that is the trigger to clean, written in the architecture
rule from day one.

## Review signals

A rule duplicated in two state holders; a framework type crossing from
a repository into a view; literals that are product decisions.
