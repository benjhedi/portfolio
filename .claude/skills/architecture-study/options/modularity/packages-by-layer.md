# Modularity: local packages by layer

One local package per layer of the dependency rule: Domain, Data (or
Adapters), Presentation, plus a thin app target holding the composition
root. The compiler enforces the dependency direction: Presentation and
Data import Domain; they never import each other. Liftr's shape.

## Layout

```
Packages/
  Domain/         entities, protocols, logic units; stdlib only
  Data/           adapters: persistence, network, platform services
  Presentation/   the pattern's units, navigation, design system import
<App>/
  App/            entry point, root view, DependencyContainer
```

Each package: `Package.swift`, `Sources/<Name>/`, `Tests/<Name>Tests/`.
Domain tests run with `swift test --package-path Packages/Domain`.

## Boundary rules

- Package manifests declare the only allowed dependencies; a forbidden
  import fails to compile.
- `public` only on what another package needs; the review agent checks
  the public surface of Domain stays small.
- Only the app target imports both Data and Presentation.

## What it buys

Dependency rule enforced by the compiler, domain tested in seconds, Data
swappable (mocks for a POC, HTTP later) without touching Presentation.

## What it costs

Three manifests, `public` keywords, mapping at the Data boundary, a
longer first build. Features are spread across three packages: a change
to one feature touches three folders.

## Fits when

The dependency rule is clean and worth enforcing, one niche, a domain
that must be testable alone, a backend that is mocked now and real later.

Triggers to leave it: features growing independent with separate teams or
release cadence (packages by feature); a second product sharing the engine
(engine and thin target). Only meaningful with a clean dependency rule:
with a light or free rule, the packages enforce a direction the code does
not follow.
