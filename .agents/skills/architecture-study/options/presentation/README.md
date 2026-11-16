# Axis 1 - Presentation patterns

How a screen is split into units, who owns its state, who owns navigation.
A pattern is not an architecture: it says nothing about dependency
direction (axis 2) or packaging (axis 3). Any sheet here combines with any
option of the other two axes.

| Sheet | One line | Fits when |
|---|---|---|
| view-owned-state | the view holds its state, no extra unit | few screens, little shared state, POC |
| mvvm | a state holder per screen | the market default; testable state, shared logic |
| mvvm-c | mvvm plus a coordinator or router for navigation | deep or data-driven navigation, UIKit legacy |
| vip | view, interactor, presenter in a one-way cycle | Clean Swift teams, strict unidirectional flow |
| viper | interactor, presenter, entity, router per screen | large teams, UIKit, heavy ceremony accepted |
| tca | store, reducer, action, state, effects | exhaustive testability, composable features, a team that knows it |
| mvi | intent, model, view with a single state stream | Android Compose default, unidirectional |

## What every sheet answers

Units and what each may know; who owns navigation; construction order for
a feature; what is tested in isolation; ceremony per screen; the trigger
that makes it too small or too big; platform idioms (SwiftUI, UIKit,
Compose, web).

## Notes

`../notes/swiftui-navigation.md` for the SwiftUI-specific question of
state ownership and `NavigationStack`, which changes the cost of several
sheets. `../notes/evolution-triggers.md` for the signals that move a
project from one sheet to another.

## How the study uses this folder

Shortlist by the needs of step 2, never by habit. A team's imposed pattern
closes this axis; the study then works on axes 2 and 3 only.
