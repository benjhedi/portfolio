export type LoadStatus = "loading" | "playing" | "refused" | "failed";

/** Hero playback state; the view derives everything else from it with `heroView`. */
export type HeroPlayback = {
  reduced: boolean;
  status: LoadStatus;
  visitorPaused: boolean;
  watchable: boolean;
};

export type HeroPlaybackEvent =
  | { type: "reducedChanged"; reduced: boolean }
  | { type: "started" }
  | { type: "refused" }
  | { type: "failed" }
  | { type: "toggled" }
  | { type: "watchableChanged"; watchable: boolean };

export function heroPlayback(state: HeroPlayback, event: HeroPlaybackEvent): HeroPlayback {
  switch (event.type) {
    case "reducedChanged":
      // Turning reduced off remounts the video, so loading starts over; a
      // visitor pause survives it (AC-18).
      return event.reduced
        ? { ...state, reduced: true }
        : { ...state, reduced: false, status: "loading" };
    case "started":
      return { ...state, status: "playing" };
    case "refused":
      return { ...state, status: "refused" };
    case "failed":
      return { ...state, status: "failed" };
    case "watchableChanged":
      return { ...state, watchable: event.watchable };
    case "toggled": {
      // A click anywhere in the oval does what the visible toggle shows, and
      // nothing while it is hidden (D4).
      const toggle = heroView(state).toggle;
      if (toggle === "hidden") return state;
      if (toggle === "pause") return { ...state, visitorPaused: true };
      return {
        ...state,
        visitorPaused: false,
        status: state.status === "refused" ? "loading" : state.status,
      };
    }
  }
}

/** `held`: the vapor objects and the hint line stop on their current frame (AC-17). */
export function heroView(state: HeroPlayback): {
  shouldPlay: boolean;
  toggle: "hidden" | "pause" | "play";
  held: boolean;
} {
  const { reduced, status, visitorPaused, watchable } = state;
  const hidden = reduced || status === "loading" || status === "failed";
  return {
    shouldPlay:
      !reduced && watchable && !visitorPaused && (status === "loading" || status === "playing"),
    toggle: hidden ? "hidden" : visitorPaused || status === "refused" ? "play" : "pause",
    held: visitorPaused || status === "refused",
  };
}
