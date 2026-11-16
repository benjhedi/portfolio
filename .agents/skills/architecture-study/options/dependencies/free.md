# Dependency rule: free

No enforced direction. Views may read persistence (`@Query`), state
holders may call frameworks directly, data flows through the platform's
own mechanisms. The honest name for most POCs and for small utilities.
Written down so that nobody mistakes it for an oversight.

## The rule

- Anything may import anything within the platform's idioms.
- Mock data lives in one place (a `Mock` folder or fixtures) so a later
  switch to real data is one change.
- Still no hardcoded design values, still no screen without a mockup:
  those are kit rules, not architecture.
- Product values (thresholds, texts) still in one configuration type.

## What it buys

Speed. A twelve-screen clickable POC in days. SwiftData's `@Query` and
`@Bindable` work as Apple intends, with live updates for free.

## What it costs

Nothing testable below the UI; every rule lives where it was first
needed; migrating out means extracting everything at once. The trigger
list is what keeps "free" from becoming the permanent state by accident.

## Fits when

A POC or study with a known end (demo, investor video, feasibility);
a utility app of a few screens; an exploration of a platform API where
the point is the API, not the product.

## Does not fit when

Anything shipped to a store and maintained, anything with personal data
rules, anything a client will inherit as a codebase.

## Triggers to write in the rule

The POC is approved for production; a second developer joins; a business
rule appears twice; personal data enters the model. Any one of these
starts `/architecture-study` again with "light" or "clean" on the table.

## Review signals

Only the kit rules (tokens, mockups, writing, git). The review agent does
not flag framework imports under this rule.
