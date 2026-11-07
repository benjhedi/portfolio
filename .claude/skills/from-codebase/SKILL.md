---
name: from-codebase
description: >
  Infers the architecture a codebase actually practices, axis by axis
  (presentation pattern, dependency rule, modularity), from folders, imports,
  types and tests, and drafts 10-architecture.md marked inferred, to validate.
  Imposes nothing. Use it on a repo Hedi joins, before /architecture-study
  decides keep, evolve or migrate. Pass the app folder in a multi-app repo.
user-invocable: true
disable-model-invocation: true
allowed-tools: Read, Grep, Glob, Write, Bash(ls *), Bash(find *), Bash(grep *), Bash(git *)
---

# From codebase

The code is the truth about its own architecture: read it, name what it
does in the pattern's own words, judge nothing.

## Axis 1 - Presentation pattern, from the screen files

- Count the unit kinds next to each screen: `*ViewModel`, `*Presenter`,
  `*Interactor`, `*Router`, `*Coordinator`, `*Store`, `*Reducer`, none.
- Who owns navigation: `NavigationStack(path:)` and where the path lives,
  coordinators, routers, a navigation graph (Android), routes (web).
- Name the pattern by the evidence and the share of screens following it.

## Axis 2 - Dependency rule, from the imports

```bash
grep -rln "import SwiftData\|import CoreData\|import Realm" --include='*.swift' .
grep -rln "import UIKit\|import SwiftUI" --include='*.swift' . | grep -i "domain\|usecase"
```

Which folders import persistence, network, UI frameworks; whether rules
sit in dedicated units or in state holders and views; protocols at the
adapter boundaries or not; who maps entities. Name it clean, light or
free, exceptions listed by file.

## Axis 3 - Modularity, from the manifests and folders

Targets and packages (`Package.swift`, `project.yml`, `Project.swift`,
Gradle), their dependency graph, `public` surface, a composition root or
equivalent, folders by feature or by layer. Name it: single target,
packages by layer, packages by feature, engine and thin target.

Output: `.claude/rules/10-architecture.md` from `.claude/templates/` (several
apps: `10-architecture-<app>.md` with `paths: ["Apps/<App>/**"]`), first line
`Inferred on <date> from the code, to validate`, every claim with a path or
a count, inconsistencies as facts ("12 screens MVVM, 3 with logic in the
view"). Then hand to `/architecture-study` step 3: keep, evolve, or migrate?
