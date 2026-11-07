# MVI (Model, View, Intent)

Unidirectional: the view emits intents, a state holder reduces them into
one immutable UI state exposed as a single stream, the view renders that
state. One-shot events (navigate, toast) travel on a separate channel.
The default on Android with Compose; the shape Doable Android uses.

## Units and what each knows

- View (composable): renders `UiState`, emits intents; no logic.
- ViewModel (state holder): owns `StateFlow<UiState>`, reduces intents,
  calls logic units or repositories behind interfaces, emits one-shot
  events on a `Channel` or `SharedFlow`.
- UiState: a sealed interface or data class, the whole screen in one
  value, including loading and error.
- Navigation: a navigator interface the ViewModel calls, implemented at
  the NavHost level; or navigation as state in the parent.

## Construction order for a feature

UiState and intents, use cases or logic units, ViewModel with its
reducer, composable screen with a preview per state, route registration,
tests with Turbine on the state stream.

## Tested in isolation

ViewModel through its state stream (Turbine, coroutines-test); logic
units; repository contracts with doubles. Composables through previews
and Compose UI tests.

## Ceremony per screen

Screen, Route, UiState, ViewModel files. Moderate, very regular.

## Too small or too big when

Too small when several screens share a flow state (a wizard): a flow-level
state holder or parent reducer is needed. Too big for a settings screen of
toggles: `rememberSaveable` and a repository call suffice, if the rule allows.

## Platform idioms

Compose: `collectAsStateWithLifecycle`, `viewModelScope`, Hilt injection.
SwiftUI equivalent: MVVM with a single `state` enum, or TCA when
exhaustive reduction is wanted. Web: Redux-style stores.

## Interview angle

Why a single state value beats several booleans, where one-shot events
go and why not in state, cold versus hot flows in the state holder.
