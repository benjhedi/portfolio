# Dependencies - the minimum, each one justified and confined

## Order of preference

1. Platform frameworks first: Apple frameworks, Android Jetpack, the web
   platform. Always the first candidate.
2. A well-maintained library only when the platform leaves a real gap.
3. Never a library that duplicates a platform capability.

## Before adding anything

State the package, its URL, the version, why it is needed and which module
will own it. Wait for approval. Then record the decision: an ADR for an
infrastructure dependency, a one-line comment at the import site otherwise.

## Confinement

A third-party dependency lives in exactly one package or module and is
hidden behind a protocol or interface. The rest of the codebase never sees
it. Examples from the repos: Firebase confined to `HabitAnalytics`,
WaraDS-Apple consumed by the design system package only.

## Avoid

- Abandoned libraries: last update older than 18 months.
- Heavy transitive dependency trees.
- Objective-C bridges unless strictly necessary and documented.
- CocoaPods. Swift Package Manager only on Apple platforms.
- Tailwind inside a design system package (vanilla-extract or plain CSS
  with tokens). Tailwind stays allowed in a consumer site that already uses it.

## Tooling dependencies

Build tooling (XcodeGen, Tuist, SwiftLint, SwiftFormat, Periphery, lefthook)
is pinned: `Mintfile`, `Tuist/Package.swift` or `package.json`. Upgrades are
explicit, never silent, and recorded in the toolchain ADR.

## Removing

Unused code or dependencies flagged by Periphery or a bundle analysis are
reported, not deleted automatically. Hedi decides.
