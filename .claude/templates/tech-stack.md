# Tech stack - <Product>

One line per choice. Facts, not arguments: a choice that was debated has
an ADR, linked here. A line marked (fixed) is not reopened without one.

## Platform

- Target: <iOS 26 / macOS 26 / Android 15 / web>, minimum <version> (fixed)
- Capability floors: <on-device AI needs iPhone 15 Pro, handled in the
  composition root, never in views>

## Language and UI

- <Swift 6, strict concurrency> (fixed)
- <SwiftUI only; UIKit bridge allowed for: camera preview>

## Architecture

- See `.claude/rules/10-architecture.md` (written by `/architecture-study`).
  Starting level: <simple / layered / modular>. Triggers listed there.

## Persistence and data

- <SwiftData with versioned schema from v1; App Group; CloudKit sync later>
- <local-first; network calls explicit and user-triggered>

## Project generation and toolchain

- <XcodeGen pinned in Mintfile> or <Tuist 4.x>; generated project ignored
- <SwiftLint as build phase and pre-commit, SwiftFormat, Periphery>
- Hooks: `.githooks/`, installed by `scripts/setup-hooks.sh`

## Dependencies (each one justified and confined)

| Package | Owner module | Why | Decision |
|---|---|---|---|
| <Firebase Analytics> | <Analytics package> | <crash reports> | <ADR 003> |

## Design

- Design system: <Wara DS package> or <product palette, handoff folder>
- Mockups: `<handoff>/ios/ecrans/`, spec in `<handoff>/CLAUDE.md`

## Testing and deployment

- <Swift Testing for units; UI tests on the critical path only>;
  commands: `<swift test --package-path ...>`, `<xcodebuild test ...>`
- <Fastlane lanes>, <App Store Connect key outside the repo>, <Cloudflare>
