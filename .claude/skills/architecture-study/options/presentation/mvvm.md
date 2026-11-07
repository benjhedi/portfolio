# MVVM

One state holder per screen (the ViewModel) that owns screen state,
exposes it to the view and reacts to actions. The view renders and sends
actions. The most widespread pattern on the market; reviewers recognize
it without explanation.

## Units and what each knows

- View: renders state, sends actions through async methods, no logic.
- ViewModel: `@Observable @MainActor` (SwiftUI), `ViewModel` with a
  `StateFlow` (Compose); owns loading and error state; calls logic units
  or services behind protocols, as the dependency rule allows.
- Navigation: either the view (`NavigationStack(path:)` owned by a parent)
  or a destination enum published by the ViewModel and rendered by the
  view. A router object is MVVM-C (next sheet).

## Construction order for a feature

Types and protocols, services or logic units, ViewModel, view, wiring
(composition root or environment), tests after each unit.

## Tested in isolation

ViewModel with doubles for its dependencies; logic units; services behind
protocols. Views through previews and UI tests.

## Ceremony per screen

Two files plus tests. Moderate.

## Too small or too big when

Too small when navigation is deep or data-driven (deep links, flows that
skip screens): the destination enum grows and the view routes; then MVVM-C.
Too big when a screen has one toggle and no async work: the ViewModel is
ceremony; the rule may allow view-owned state for such screens.

## Platform idioms and pitfalls

SwiftUI: `@Observable` over `ObservableObject`; `@State` for the
ViewModel at the owning view, never recreated in `body`; `.task` for
loading. Pitfall: a ViewModel per subview multiplies state sources. Compose:
`ViewModel` scoped to the navigation entry, `collectAsStateWithLifecycle`.

## Interview angle

"Is MVVM an architecture?" No: it is a presentation pattern; dependency
direction and modularity are separate decisions.
