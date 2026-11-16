import { describe, expect, it } from "vitest";
import { tickVapor, type VaporClock } from "./vaporSchedule";

// RIDE, site, franceinfo, product, GearTrack in content.ts; the probe of
// T25 checks the names, this suite checks the indexes.
const OBJECT_COUNT = 5;

/** A hero that has just mounted, as documented on `VaporClock`. */
function fixture(overrides: Partial<VaporClock> = {}): VaporClock {
  return { armed: true, released: 0, ...overrides };
}

/** Feeds timeupdate times in order and collects every release. */
function play(clock: VaporClock, times: number[]): { clock: VaporClock; releases: number[] } {
  const releases: number[] = [];
  for (const t of times) {
    const tick = tickVapor(clock, t, OBJECT_COUNT);
    clock = tick.clock;
    if (tick.release !== null) releases.push(tick.release);
  }
  return { clock, releases };
}

// One 4.21 s loop sampled every 0.25 s, the cadence of timeupdate.
const oneLoop = [0.1, 0.35, 0.6, 0.85, 1.1, 1.35, 1.6, 1.85, 2.1, 2.35, 2.6, 2.85, 3.1, 3.35, 3.6, 3.85, 4.1];

describe("vaporSchedule", () => {
  it("releasesOnceWhenLoopReachesExhale", () => {
    const beforeExhale = play(fixture(), [0.1, 1.5, 2.04]);
    expect(beforeExhale.releases).toEqual([]);

    const atExhale = tickVapor(beforeExhale.clock, 2.05, OBJECT_COUNT);
    expect(atExhale.release).toBe(0);

    const restOfLoop = play(atExhale.clock, [2.3, 3.0, 4.2]);
    expect(restOfLoop.releases).toEqual([]);

    const sampledLoop = play(fixture(), oneLoop);
    expect(sampledLoop.releases).toEqual([0]);
  });

  it("rearmsOnlyAfterLoopRestarts", () => {
    const afterRelease = play(fixture(), [0.1, 2.1]).clock;
    expect(afterRelease.armed).toBe(false);

    // A throttled tab skips the wrap: 4.1 then 1.2, never under 1 s.
    const skippedWrap = play(afterRelease, [4.1, 1.2, 2.1, 3.5]);
    expect(skippedWrap.releases).toEqual([]);
    expect(skippedWrap.clock.armed).toBe(false);

    const atThreshold = tickVapor(skippedWrap.clock, 1, OBJECT_COUNT);
    expect(atThreshold.clock.armed).toBe(false);

    const belowThreshold = tickVapor(atThreshold.clock, 0.99, OBJECT_COUNT);
    expect(belowThreshold.release).toBeNull();
    expect(belowThreshold.clock.armed).toBe(true);

    const nextExhale = play(belowThreshold.clock, [1.5, 2.1]);
    expect(nextExhale.releases).toEqual([1]);
  });

  it("cyclesObjectsFromRide", () => {
    const sixLoops = Array.from({ length: 6 }, () => oneLoop).flat();

    const { releases, clock } = play(fixture(), sixLoops);

    expect(releases).toEqual([0, 1, 2, 3, 4, 0]);
    expect(clock.released).toBe(6);
  });
});
