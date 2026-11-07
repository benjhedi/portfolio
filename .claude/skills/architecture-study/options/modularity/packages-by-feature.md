# Modularity: local packages by feature

One local package per feature (Clients, Reservations, Capture) holding
that feature's units, a few shared packages (Core, DesignSystem,
Networking) and a thin app target wiring features together. The cut most
large teams use; VIPER's classic companion, common with MVVM and TCA too.

## Layout

```
Packages/
  Core/           shared domain types and protocols, stdlib only
  DesignSystem/   tokens and components
  Clients/        the feature: its units, its tests, its public interface
  Reservations/
  Capture/
<App>/
  App/            entry point, root view, composition root, navigation
                  between features
```

## Boundary rules

A feature package exposes a small public interface (entry view, factory,
the types another feature needs) and imports Core and DesignSystem only,
never another feature. Cross-feature needs go through Core protocols or
the app's composition root; a feature needing another feature's type is a
design smell to discuss. Each feature has its own test target and builds alone.

## What it buys

Parallel work with compiler-enforced isolation, per-feature build and
test, a feature deletable in one move, demo apps per feature.

## What it costs

Many manifests, duplication pressure (each feature wants its own helpers),
explicit plumbing for navigation between features, care for cross-feature
persistence relationships.

## Fits when

Several features with separate lifecycles, a team of several people,
feature flags or per-feature demos, VIPER or TCA composition.

Triggers to leave it: a solo developer finding every change touches three
packages (back to single target or packages by layer); features that
always change together (merge them). Combines with any pattern and a clean
or light rule (Core holds the protocols); with a free rule the packages
only add build complexity.
