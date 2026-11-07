# Step 2 - Needs

Needs drive the axes. Each line below maps to an axis in step 3; a need
nobody has is not written down "just in case".

## Questions, grouped by the axis they inform

Presentation pattern
- How many screens at MVP, at one year? How deep is navigation (tabs,
  stacks, sheets, deep links)? Is screen state shared across screens?
- Platform idiom: SwiftUI with `@Observable` and `NavigationStack`,
  Compose with state holders, a web framework with islands or routes.
- Who must be able to read the code: Hedi only, or a team used to MVVM,
  VIPER, TCA?

Dependency rule
- Is there business logic worth protecting from frameworks (pricing,
  streaks, dedup rules)? Or is the app mostly screens over an API?
- Must the logic be tested without the simulator or the device?
- Persistence and sync: local only, cloud sync, server of record?

Modularity
- A second target soon (widget, watch, demo, re-skin for another niche)?
- A third-party SDK to confine (analytics, payments, AI)?
- Build time pain expected? Team working in parallel on separate areas?
- Anything to be reused by another product of the studio?

Cross-cutting
- Deadline and budget: what is the cost of being wrong in six months
  versus the cost of ceremony now?
- Accessibility, offline, privacy constraints that shape units.

## Output

Section "Needs" of the study: one line per need, each tagged with the
axis it informs and a weight (must / should / later). Needs tagged
"later" become candidate triggers in step 4.

## Stop

Read back the must-haves only. Step 3 after an explicit go.
