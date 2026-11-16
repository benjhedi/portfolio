# Dependency rule: clean

Business logic is isolated from every framework. Dependencies point
inward: adapters depend on the domain, never the reverse. The shape
Chaland, Liftr and Doable chose; a choice, not a default.

## The rule

- Domain: entities as value types, business rules, logic units (use
  cases) and the protocols the outside must implement. Imports the
  standard library only (Foundation; Kotlin stdlib; no framework).
- Adapters: persistence, network, platform services, AI. Implement the
  domain protocols; hold no business rule; map their own entities to
  domain types at the boundary (a `@Model` or Room entity never leaves
  its adapter).
- Presentation: state holders call logic units, never adapters directly;
  views know only their state holder.
- Composition root (or DI container): the only place that knows every
  concrete type.

## What it buys

Logic testable without simulator or device, in seconds. Persistence or
network swappable. Under strict concurrency, domain value types are
`Sendable` and cross actor boundaries without friction (Chaland ADR 005).

## What it costs

Mapping code per persisted type; one more unit (use case) per rule; the
temptation to create use cases that only forward a call. Mitigation: a
use case exists only for a rule or an orchestration; plain reads may go
through a repository method the state holder calls when the rule allows.

## Fits when

There are business rules worth protecting (pricing, streaks, dedup,
scheduling), several adapters for the same concept (mock, HTTP, local),
or a domain that another target or platform must reuse.

## Does not fit when

The app is screens over an API with no rules of its own; a POC with
mocked data; a joined codebase that works another way (then "light" with
a path to clean if a rule appears).

## Review signals

Framework import in the domain; business `if` in an adapter; a state
holder calling an adapter directly; an entity leaking out of its adapter.
