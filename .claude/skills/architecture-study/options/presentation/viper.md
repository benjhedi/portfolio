# VIPER

Five units per screen: View, Interactor, Presenter, Entity, Router. The
Presenter is the hub: it receives view events, asks the Interactor for
data, formats results for the View, asks the Router to navigate. Designed
for large UIKit codebases where every screen looks the same to every
developer.

## Units and what each knows

- View: passive, displays what the Presenter gives, forwards events.
- Presenter: screen logic and formatting; talks to Interactor, View and
  Router through protocols; holds no business rule.
- Interactor: business rules and data access through services or
  repositories; returns entities or results to the Presenter.
- Entity: plain data types used by the Interactor.
- Router (Wireframe): builds the module, injects dependencies, navigates.

## Construction order for a feature

Contracts (the protocols between the five), Entity, Interactor,
Presenter, View, Router, module builder, tests per unit.

## Tested in isolation

Presenter and Interactor with doubles for every protocol; Router with a
fake navigation controller. Very high testability, very many doubles.

## Ceremony per screen

Five to six files plus a contracts file. The highest here. Generators
(templates) are necessary in practice.

## Too small or too big when

Too small: never, every seam is covered. Too big: a team under ten,
SwiftUI, screens with little logic, a solo developer; the ceremony costs
more than it protects, and SwiftUI's view identity fights the passive view.

## Platform idioms

UIKit first. On SwiftUI it degenerates into MVVM-C with a renamed Presenter
unless the team wants the vocabulary. Compose: not idiomatic.

Combines with a clean dependency rule (the Interactor hosts the use cases)
and packages by feature (one package per VIPER module). Interview angle:
bidirectional Presenter-Interactor, the Router's two jobs (build and
navigate), why Entity is not a persistence model.
