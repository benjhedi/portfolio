# Tasks 005 - v2 mockup fixes

Plan: `plan.md` (all gates OPEN) | Branch: `fix-v2-mockup-defects` off `dev`

Mockup only: the architecture rule covers `src/`, so the order is the fix
proven in a scratch copy, the publish at the source, the refreeze, then
the lines that name the version. T01 and T02 change no repo file, so they
have no commit. No `[P]`: each task needs the previous one.

## Tasks

- [x] T01 the four CSS lines (with the English comment on `364px`) in a
  scratch copy of `docs/v2/mockup/index.html`, wrapper kept - files:
  scratchpad only - check: probe outputs for AC-1 to AC-4 at 1440x900,
  390x844 `mobile: true` and 900x800; before and after export with the
  spec 004 script, box diff empty outside skills, mobile nav and desktop
  hero - agent: design-agent
- [x] T02 publish the fixed `index.html` to artifact BDrsQCHWzgfQRLqBGn9FJM
  without the host wrapper, after Hedi's go, then read it back - files:
  none in the repo - check: new version id; read-back sha256 of
  `index.html` equals the T01 file; the 15 other sums unchanged - agent:
  main session
- [x] T03 refreeze: the read-back `index.html` into `docs/v2/mockup/`, the
  README sums block updated - files: `docs/v2/mockup/index.html`,
  `docs/v2/README.md` - check: sums check from `docs/v2/` passes; `git
  diff --stat dev -- docs/v2/mockup` lists `index.html` only - agent:
  main session
- [ ] T04 the new version named where the old one stood - files:
  `docs/v2/README.md` l.9-10 and l.62, `docs/v2/decision-log.md` l.5-7,
  `product/tech-stack.md` l.47, `product/mission.md` l.3 - check: `git
  grep -n 1794063463-7380` outside `specs/001-*` returns only intended
  history lines; the new version found in the four files - agent:
  design-agent
- [ ] T05 verify - all AC checks below green, `npm ci` first - files:
  `specs/005-v2-mockup-fixes/verification.md` - agent: qa
- [ ] T06 review - diff against dev, gates reread; once APPROVED the main
  session sets `spec.md` status to done - agent: review-agent

## Test plan (derived from the EARS criteria)

Probe, image and build checks run by qa, output in `verification.md`;
none is a committed test (ADR 001: Vitest is for TypeScript units).

| AC | Scenario | Type | Test name |
|---|---|---|---|
| AC-1 | scrollWidth equals innerWidth at 1440x900 and 390x844 mobile | CDP probe | `keepsDocumentWithinViewport` |
| AC-2 | three skills groups in view, side by side at 1440, stacked at 390; mq inside its column | CDP probe, PNG | `showsThreeSkillGroups` |
| AC-3 | under 900 px, HJ at left gutter, controls at right gutter, Tab lands on HJ with focus ring | CDP probe, keyboard | `showsMarkOnMobileNav` |
| AC-4 | at 1440x900 the hint label ends above the bar top | CDP probe, PNG | `keepsScrollHintAboveBar` |
| AC-5 | before vs after: boxes change only in skills, mobile nav, desktop hero | export twice, box diff | `changesOnlyTheThreeDefects` |
| AC-6 | read-back sums match the repo; new version named in five places; test and build pass | shasum, grep, npm | `refreezesNewArtifactVersion` |

## Done when

- All boxes checked, each with its commit on the branch (T01 and T02
  have none).
- qa report attached (probe outputs, box diff, before and after PNGs).
- review verdict APPROVED, gates reread.
- `spec.md` status set to done; spec 004 resumes from `dev`.
