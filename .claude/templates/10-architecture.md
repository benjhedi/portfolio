# Architecture - <Product or App>

Written by `/architecture-study` on <date> (`docs/architecture-study.md`).
The only architecture the agents apply; changing it is an ADR first.
Several apps in the repo: one file per app, `10-architecture-<app>.md`,
with a `paths:` frontmatter on that app's folder (study step 4).

Situation: <new / taken over / study or POC>. Starting level: <simple /
layered / modular>, because <one sentence from the study>.

## Axis 1 - Presentation pattern: <name>

Units per screen and what each may know: <View: renders state, sends
actions, no logic>; <state holder, named as the pattern names it: owns
screen state, calls the units below, never a framework directly>;
<navigation: who owns it, how a destination is expressed>.
Construction order for a feature: <unit, unit, unit>.

## Axis 2 - Dependency rule: <clean / light / free>

<Which layer may import which; example clean: Domain imports Foundation
only, adapters implement Domain protocols, state holders call logic units
never adapters.> <Where rules and thresholds live.> <Protocols at which
boundaries; who maps persistence entities.>

## Axis 3 - Modularity: <single target / packages by layer / by feature / engine and thin target>

Module map:
```
<App>/            <what lives here>
<Module>/         <what lives here, what it may import>
```
Boundary rules: <public API discipline, forbidden imports, who owns the
composition root or its equivalent>.

## What the agents derive from this file

developer: construction order and allowed files per unit. test-coder: units
tested in isolation (<list>) versus integration. review-agent: forbidden
imports and crossings. planner: units covered by this file, else study first.

## Evolution triggers - run `/architecture-study` again when

<more than N screens or a second tab bar>; <a second platform or target>;
<offline sync, or a domain tested without the app>; <an SDK to confine>;
<navigation deeper than two levels or driven by deep links>.

## Decisions

| <date> | Initial | study | <date> | <change> | ADR NNN |
