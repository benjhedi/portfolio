# Step 4 - Decision and rule

The pick becomes two files: the study record and the rule the agents
apply. Nothing else in the repo encodes the architecture.

## 1. Record the decision

Section "Decision" of `docs/architecture-study.md`: the candidate chosen,
the need that decided it, the alternatives rejected in one line each, the
starting level, the date. For a taken-over repo: keep, evolve or migrate,
and the first migration step if any.

## 2. Write the rule

`.claude/rules/10-architecture.md` from `.claude/templates/10-architecture.md`,
under 50 lines. Several apps in the repo (`Apps/*`, several targets): one
file per app, `10-architecture-<app>.md`, opened by a frontmatter
`paths: ["Apps/<App>/**"]` so it loads only for that app's files.

- Axis 1: the units per screen with what each may know, who owns
  navigation, the construction order for a feature.
- Axis 2: who may import what, where rules and thresholds live, protocols
  at which boundaries, who maps entities.
- Axis 3: the module map and boundary rules, composition root or equivalent.
- What each agent derives (developer order, test-coder isolation list,
  review-agent forbidden imports, planner coverage check).
- Evolution triggers, written as observable facts (N screens, second
  target, offline sync, confined SDK, deep links).

Vocabulary: use the names of the chosen pattern (ViewModel, Presenter,
Interactor, Store, Reducer). The agents use the rule's words, never a
default from the kit.

## 3. Propagate

- `product/tech-stack.md` architecture line points to the rule and names
  the starting level.
- `product/roadmap.md` lists the triggers so a roadmap line that crosses
  one restarts the study before its spec.
- An ADR when the decision reverses an earlier one or when a client must
  be able to read the reasoning.
- Handoff: "architecture rule written on <date>, next trigger to watch".

## 4. Validate

Show both files. Ask Hedi to name a feature from the roadmap and walk it
through the rule out loud: which units, in which order, tested where. If
the walk stumbles, fix the rule before any spec. Then write. POC or study:
same steps, short answers ("view-owned state, mocked data, single target").
