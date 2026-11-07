# View-owned state

The view holds its own state (`@State`, `@Observable` model created by the
view, `remember` in Compose) and calls services or logic units directly.
No ViewModel, no presenter. What Apple's SwiftUI guidance pushes for
small screens.

## Units and what each knows

- View: state, layout, actions; may call a logic unit or a service
  behind a protocol injected through the environment.
- Optional shared model: an `@Observable` object for state several views
  share, owned by the parent view or the app.
- Navigation: `NavigationStack(path:)` with the path in the owning view or
  a small router object in the environment.

## Construction order for a feature

Types and protocol, the service or logic unit, the view with its state,
preview with a mock service.

## Tested in isolation

The logic unit and the service double. The view through previews and UI
tests; its state is not unit-tested directly.

## Ceremony per screen

One file, sometimes two. The lowest of all sheets.

## Too small when

- The same state is needed by three screens or more.
- A screen's logic exceeds what a preview can exercise (branches, async
  sequences, error recovery).
- Business rules appear inside `body` or in `onChange` handlers.
- A second developer needs a seam to test without the UI.

Too big: never; the risk is only the opposite direction.

## Platform idioms

SwiftUI: `@State`, `@Observable`, `.task`, `.environment`. Compose:
`remember`, `rememberSaveable`, a ViewModel only when state must survive
configuration changes (then it is MVI or MVVM). Web: component-local state,
server state through the framework's loader.

Combines with any dependency rule (clean still protects the logic units)
and a single target; packages rarely pay off at this size.
