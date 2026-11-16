# MVVM-C (coordinator or router)

MVVM plus a dedicated navigation owner. The ViewModel says what happened
("client saved"); the coordinator decides where to go. Views and
ViewModels know nothing about other screens.

## Units and what each knows

- View and ViewModel: as in MVVM, minus any navigation knowledge. The
  ViewModel emits events or exposes an intent, it never names a screen.
- Coordinator (UIKit) or Router (SwiftUI): owns the navigation state
  (`NavigationPath`, sheet, full screen), builds the next screen through
  the composition root, handles deep links. One per flow, a root one for
  tabs.
- Composition root: builds ViewModels for the coordinator on request.

## Construction order for a feature

Types and protocols, services or logic units, ViewModel, view, the
coordinator or router case for the new destination, wiring.

## Tested in isolation

ViewModel with doubles; router with a fake builder (given event X, path
becomes Y). Views through previews.

## Ceremony per screen

Two files plus a router case. Moderate, plus one flow-level object.

## Too small or too big when

Too small when several routers must share state: a flow object or TCA
style composition beats router-to-router calls. Too big when navigation is
a tab bar and a few pushes: a destination enum in MVVM does the job; the
UIKit coordinator pain applies, the pattern pays off only on deep flows.

## Platform idioms

SwiftUI: a `@Observable` router holding `NavigationPath` injected in the
environment; `navigationDestination(for:)` maps a `Hashable` route to a
view built by the root. UIKit: the classic coordinator owning a
`UINavigationController`. Compose: a `NavHostController` wrapped in a
navigator interface the ViewModel never sees. Web: the router is the
framework's; this sheet is mostly about keeping routes out of components.

## Interview angle

Who creates the next screen and its ViewModel, and how a deep link enters
the flow without the view knowing.
