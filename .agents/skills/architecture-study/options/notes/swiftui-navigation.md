# Note: state ownership and navigation in SwiftUI

The question that decides the cost of several presentation sheets on
iOS, and a 2026 interview classic.

## State ownership

Apple's model: the view owns its state (`@State`), shares it downward
(`@Binding`, environment) and observes reference models (`@Observable`).
Consequences for the sheets:

- A ViewModel per screen is not required by the framework. It is
  justified when state is shared across views, when logic must be tested
  without the UI, or when dependencies must be injected and mocked.
- A ViewModel per subview multiplies sources of truth; prefer one per
  screen or flow, child views receive bindings.
- `@Observable` tracks property access, so a large model does not
  re-render everything; `ObservableObject` did, which was the old reason
  to split models. Do not split for performance by reflex.

## Navigation

`NavigationStack(path:)` with a `Hashable` route and
`navigationDestination(for:)` makes navigation a value: a path array.
Three ways to own it, by growing cost:

1. The owning view holds the path (`@State var path: [Route]`). Fits
   view-owned state and small MVVM apps.
2. A shared `@Observable` router in the environment holds paths and
   presentation state; views push routes, the root maps routes to views
   built by the composition root. Fits MVVM-C on SwiftUI without the
   UIKit coordinator weight.
3. Navigation as feature state (TCA stack reducers): exhaustive tests,
   highest ceremony.

Sheets and full-screen covers are state too: an optional item or an enum
in the owner, never a boolean per sheet.

## UIKit coordinators, for the record

Coordinators owning `UINavigationController` solved what UIKit lacked;
on SwiftUI they fight the declarative model and double the plumbing. Keep
them only in a UIKit codebase or at the bridge between the two worlds.

Deep links: parse into a route, hand it to the owner of the path (1, 2 or
3); deep links at MVP make option 1 too small from day one. Interview
questions this note answers: when is a ViewModel ceremony in SwiftUI,
where does the path live and why, what changed with `@Observable`.
