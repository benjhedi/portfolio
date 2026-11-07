# Step 3 - Options

Two or three compositions, never one. Each is a choice on every axis, read
from the options library, with costs now and later and the trigger that
would make it wrong. Challenger mode throughout.

## Build the candidates

1. For each axis, shortlist the options whose sheet matches the needs
   (`options/presentation/`, `options/dependencies/`, `options/modularity/`).
   Eliminate what no need supports and say why in one line.
2. Compose. Typical shapes, as examples not defaults:
   - Simple: view-owned state, light dependencies, single target.
   - Layered: a state holder per screen, clean dependency rule, single
     target with feature folders.
   - Modular: same as layered plus packages by layer or by feature, or an
     engine with a thin target when a re-skin or a widget is in sight.
3. For each candidate write: cost now (files, ceremony, learning), cost
   later (migration path if it proves too small or too big), the first
   trigger that invalidates it, how a feature is built (construction
   order), how it is tested, how navigation is owned.

## Present

A table, one row per candidate, columns: pattern, dependency rule,
modularity, cost now, cost later, breaks when. Then a recommendation in
two sentences with its reason tied to a need, and the strongest argument
against it.

## Challenge

- Ask Hedi which need makes the heavier option worth it today.
- Ask what the migration from the simplest option would cost if the
  trigger fires in six months; if the answer is "a week", the simplest
  option wins.
- If a joined team's pattern is imposed, the only open axes are
  dependency rule inside the pattern and modularity; say so.
- Raise the interview angle briefly: pattern versus architecture, VIP
  versus VIPER, where navigation lives in SwiftUI (`options/notes/`).

## Stop

Hedi picks, or asks for a fourth candidate. Step 4 after the pick.
