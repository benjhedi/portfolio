# VIP (Clean Swift)

A one-way cycle per scene: the View sends a request to the Interactor,
the Interactor applies logic and hands a response to the Presenter, the
Presenter formats a view model the View displays. Each unit knows only
the next one through a protocol. Navigation in a Router attached to the
scene.

## Units and what each knows

- View (controller or SwiftUI view): displays, forwards user actions as
  requests; knows the Interactor protocol only.
- Interactor: business logic, calls workers or services; knows the
  Presenter protocol only; holds the scene's data store.
- Presenter: turns responses into display-ready view models; knows the
  View protocol only.
- Router: navigation and data passing to the next scene.
- Workers: reusable logic or service adapters used by Interactors.

## Construction order for a feature

Models (request, response, view model triples), Interactor, Presenter,
View, Router, Configurator or composition, tests per unit.

## Tested in isolation

Interactor and Presenter with spies for the next unit; the cycle makes
tests mechanical. Views through UI tests.

## Ceremony per screen

Four to five files plus a models file. High. Generators are usual.

## Too small or too big when

Too small: rarely; shared state across scenes needs a store the cycle does
not provide. Too big: few simple screens, where the triples and protocols
dwarf the logic; a solo developer on SwiftUI pays the ceremony alone.

## Platform idioms

Born on UIKit. On SwiftUI the View is a struct with an `@Observable`
display model fed by the Presenter; the unidirectional cycle remains the
point. Compose equivalent: MVI with explicit intents and a reducer.

Interview angle, VIP versus VIPER: VIP is a strict one-way cycle (View,
Interactor, Presenter); VIPER has a bidirectional Presenter-Interactor
relation and an explicit Entity layer. Same goal, different call
direction and ceremony.
