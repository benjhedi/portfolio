# Modularity: single target, folders by feature

One app target; features as folders holding the units the pattern names,
plus a shared folder. Boundaries are conventions enforced by lint and the
review agent, not by the compiler. Chaland's shape.

## Layout (units depend on axis 1 and 2)

```
<App>/
  App/            entry point, root view, composition root
  Features/
    Clients/      the pattern's units for this feature (folders named
                  as the pattern names them: Views, ViewModels, UseCases,
                  Data, Domain; or Scene, Interactor, Presenter, Router)
    Reservations/
  Shared/         services, extensions, design system import
  Resources/      assets, strings
<App>Tests/       mirrors Features/
```

## Boundary rules

A feature never edits another feature's folder; shared code moves to
Shared through an approved change. Lint rules encode the dependency rule
(forbidden imports per folder). The composition root is edited in its own
commit, after the feature.

## What it buys

Fastest start, one build, no manifests to maintain, trivial refactors
across features. Migrates to packages later folder by folder.

## What it costs

No compiler-enforced boundary: discipline rests on lint and review. One
build graph: build time grows with the app. A second target shares code
only by adding the same files to it.

## Fits when

One target, one niche, a solo developer or a small team, no SDK that must
be confined, build time acceptable.

Triggers to leave it: a widget, watch or demo target; a re-skin for
another niche; an SDK to confine; build time pain; two people in parallel
on separate areas. Then packages by layer or by feature, folder by folder.
XcodeGen or Tuist both fit; the manifest's folder mapping matches this
layout, and `scripts/add-feature.sh` scaffolds a feature's folders from
the unit names of the architecture rule.
