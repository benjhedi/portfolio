/** Clip time of the exhale, when the mouth opens in the 4.21 s loop (AC-4). */
export const VAPOR_RELEASE_AT_S = 2.05;
/** Clip time under which a new loop has begun and the next release is allowed. */
export const VAPOR_REARM_BELOW_S = 1;

/** Release state across loops; a new hero starts at `{ armed: true, released: 0 }`. */
export type VaporClock = { armed: boolean; released: number };

/**
 * Advances the clock to clip time `t` and tells which vapor object, if any,
 * leaves now. `count` is the number of objects, at least one; the index
 * cycles through them in content order.
 */
export function tickVapor(
  clock: VaporClock,
  t: number,
  count: number,
): { clock: VaporClock; release: number | null } {
  // timeupdate never reports the exact wrap, so a time under the re-arm
  // threshold is the only sign that the loop restarted.
  const armed = clock.armed || t < VAPOR_REARM_BELOW_S;
  if (!armed || t < VAPOR_RELEASE_AT_S) {
    return { clock: { armed, released: clock.released }, release: null };
  }
  return {
    clock: { armed: false, released: clock.released + 1 },
    release: clock.released % count,
  };
}
