# TCA (The Composable Architecture)

A Store per feature holding State, receiving Actions, running a Reducer
that mutates state and returns Effects. Features compose into parent
features; navigation is state (a stack or a presentation enum in State).
Third-party library (Point-Free), opinionated, with its own test store.

## Units and what each knows

- State: a value type, the whole truth of the feature, including
  navigation state and child feature states.
- Action: an enum of everything that can happen, including child actions.
- Reducer: pure function from state and action to new state and effects;
  the only place logic lives.
- Effects: async work (services behind dependencies), results come back
  as actions.
- View: renders state from the store, sends actions. No logic.
- Dependencies: injected through TCA's dependency system, mockable.

## Construction order for a feature

State and Action, Reducer with its dependencies, View, composition into
the parent reducer, tests with `TestStore` asserting every state change.

## Tested in isolation

Everything except the view, exhaustively: each action asserts the exact
state after it. Navigation is tested as state.

## Ceremony per screen

One reducer file (often large) plus the view and tests. Moderate files,
high conceptual load; the library's version churn is a maintenance cost.

## Too small or too big when

Too small: never in structure, it scales by composition. Too big: a small
app or a team unfamiliar with it, where the learning curve and the fast-
moving library outweigh the testability; a client inheriting it must know TCA.

## Platform idioms

SwiftUI native. Compose equivalent in spirit: MVI with a single state
stream and reducers. Web: Redux lineage.

Combines with: the dependency rule is largely built in (reducers depend
on abstractions); modularity by feature maps one package per reducer.
Interview angle: exhaustive testing versus boilerplate, effect
cancellation, child feature composition, when unidirectional flow pays.
