import { describe, expect, it } from "vitest";
import {
  heroPlayback,
  heroView,
  type HeroPlayback,
  type HeroPlaybackEvent,
  type LoadStatus,
} from "./heroPlayback";

/** A hero on screen, motion allowed, loop running, no visitor pause. */
function fixture(overrides: Partial<HeroPlayback> = {}): HeroPlayback {
  return { reduced: false, status: "playing", visitorPaused: false, watchable: true, ...overrides };
}

function run(state: HeroPlayback, ...events: HeroPlaybackEvent[]): HeroPlayback {
  return events.reduce(heroPlayback, state);
}

const toggled: HeroPlaybackEvent = { type: "toggled" };

describe("heroPlayback", () => {
  // Plan rows, AC-6

  it("stopsPlayAndHidesToggleWhenReduced", () => {
    const statuses: LoadStatus[] = ["loading", "playing", "refused", "failed"];
    for (const status of statuses) {
      const view = heroView(fixture({ reduced: true, status }));
      expect(view.shouldPlay, status).toBe(false);
      expect(view.toggle, status).toBe("hidden");
    }
  });

  // Plan rows, AC-15

  it("hidesToggleWhileLoadingOrFailed", () => {
    const loading = heroView(fixture({ status: "loading" }));
    expect(loading.toggle).toBe("hidden");

    const failed = heroView(fixture({ status: "failed" }));
    expect(failed.toggle).toBe("hidden");
    expect(failed.shouldPlay).toBe(false);
  });

  it("playsWhenLateStartSucceeds", () => {
    const state = run(fixture({ status: "loading" }), { type: "started" });

    expect(state.status).toBe("playing");
    expect(heroView(state)).toEqual({ shouldPlay: true, toggle: "pause", held: false });
  });

  // Plan rows, AC-17

  it("holdsLoopWhenVisitorToggles", () => {
    const paused = run(fixture(), toggled);
    expect(paused.visitorPaused).toBe(true);
    expect(heroView(paused)).toEqual({ shouldPlay: false, toggle: "play", held: true });

    const resumed = run(paused, toggled);
    expect(resumed).toEqual(fixture());
    expect(heroView(resumed)).toEqual({ shouldPlay: true, toggle: "pause", held: false });
  });

  it("showsPlayWhenAutoplayRefused", () => {
    const state = run(fixture({ status: "loading" }), { type: "refused" });

    expect(state.status).toBe("refused");
    expect(heroView(state)).toEqual({ shouldPlay: false, toggle: "play", held: true });
  });

  // Plan rows, AC-18

  it("resumesOnReturnUnlessVisitorPaused", () => {
    const away = run(fixture(), { type: "watchableChanged", watchable: false });
    expect(heroView(away).shouldPlay).toBe(false);

    const back = run(away, { type: "watchableChanged", watchable: true });
    expect(heroView(back).shouldPlay).toBe(true);

    const pausedBack = run(
      fixture({ visitorPaused: true }),
      { type: "watchableChanged", watchable: false },
      { type: "watchableChanged", watchable: true },
    );
    expect(pausedBack.visitorPaused).toBe(true);
    expect(heroView(pausedBack)).toEqual({ shouldPlay: false, toggle: "play", held: true });
  });

  it("keepsVisitorPauseWhenReducedTurnsOff", () => {
    const reducedOn = { type: "reducedChanged", reduced: true } as const;
    const reducedOff = { type: "reducedChanged", reduced: false } as const;

    const paused = run(fixture({ visitorPaused: true }), reducedOn, reducedOff);
    expect(paused).toEqual(fixture({ status: "loading", visitorPaused: true }));
    expect(heroView(paused)).toEqual({ shouldPlay: false, toggle: "play", held: true });

    const resumed = run(paused, toggled);
    expect(resumed).toEqual(fixture({ status: "loading" }));
    expect(heroView(resumed).shouldPlay).toBe(true);

    const running = run(fixture(), reducedOn, reducedOff);
    expect(running).toEqual(fixture({ status: "loading" }));
    expect(heroView(running).shouldPlay).toBe(true);
  });

  // Transitions settled at 769f6ef

  it("clearsPauseAndRetriesLoadWhenTogglingPlayFromRefused", () => {
    const state = run(fixture({ status: "refused" }), toggled);

    expect(state).toEqual(fixture({ status: "loading" }));
    expect(heroView(state).shouldPlay).toBe(true);
  });

  it("keepsStatusWhenTogglingPlayAfterVisitorPause", () => {
    const state = run(fixture({ visitorPaused: true }), toggled);

    expect(state).toEqual(fixture());
  });

  it("setsVisitorPauseWhenTogglingPause", () => {
    const state = run(fixture(), toggled);

    expect(state).toEqual(fixture({ visitorPaused: true }));
  });

  it("ignoresToggleWhileToggleHidden", () => {
    const hidden = [
      fixture({ reduced: true, visitorPaused: true }),
      fixture({ reduced: true, status: "refused" }),
      fixture({ status: "loading" }),
      fixture({ status: "failed", visitorPaused: true }),
    ];
    for (const state of hidden) {
      expect(heroView(state).toggle).toBe("hidden");
      expect(run(state, toggled)).toEqual(state);
    }
  });

  it("playsWhenStartFollowsFailure", () => {
    const state = run(fixture({ status: "failed" }), { type: "started" });

    expect(state.status).toBe("playing");
    expect(heroView(state)).toEqual({ shouldPlay: true, toggle: "pause", held: false });
  });

  it("changesOnlyReducedWhenReducedTurnsOn", () => {
    const before = fixture({ status: "refused", visitorPaused: true, watchable: false });

    const state = run(before, { type: "reducedChanged", reduced: true });

    expect(state).toEqual({ ...before, reduced: true });
  });
});
