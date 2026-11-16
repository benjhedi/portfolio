import type { MotionPreference } from "./motionPreference";

/**
 * Reads the system reduced motion preference. `?motion` in the URL forces
 * motion even under reduced motion, the demo escape of AC-7.
 */
export function createMediaQueryMotionPreference(
  win: Pick<Window, "matchMedia" | "location">,
): MotionPreference {
  const query = win.matchMedia("(prefers-reduced-motion: reduce)");
  // Anchor navigation only changes the hash, so the query string is read once.
  const forced = new URLSearchParams(win.location.search).has("motion");
  return {
    reduced: () => !forced && query.matches,
    subscribe(onChange) {
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
  };
}
