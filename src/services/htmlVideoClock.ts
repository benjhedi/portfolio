import type { PlayOutcome, VideoClock } from "./videoClock";

type Env = { document: Document; IntersectionObserver: typeof IntersectionObserver };

/** `VideoClock` over an HTML video element; `env` lets tests pass doubles. */
export function createHtmlVideoClock(
  video: HTMLVideoElement,
  env: Env = { document, IntersectionObserver },
): VideoClock {
  return {
    async play(): Promise<PlayOutcome> {
      // React sets muted as a property, never the attribute, and autoplay
      // policies only allow a muted play.
      video.muted = true;
      try {
        await video.play();
        return "playing";
      } catch (error) {
        const name = (error as { name?: unknown } | null)?.name;
        if (name === "NotAllowedError") return "refused";
        if (name === "AbortError") return "interrupted";
        return "failed";
      }
    },
    pause: () => video.pause(),
    onTime(listener) {
      const handle = () => listener(video.currentTime);
      video.addEventListener("timeupdate", handle);
      return () => video.removeEventListener("timeupdate", handle);
    },
    onFailed(listener) {
      // Each failing <source> fires a non-bubbling error at itself, so only a
      // capture listener sees it; the element has no source left once the
      // last one fails, and a pending play() may then never settle.
      const handle = () => {
        if (video.networkState === video.NETWORK_NO_SOURCE) listener();
      };
      video.addEventListener("error", handle, true);
      return () => video.removeEventListener("error", handle, true);
    },
    onWatchable(listener) {
      let inView = false;
      const emit = () => listener(inView && env.document.visibilityState === "visible");
      const observer = new env.IntersectionObserver((entries) => {
        inView = entries.at(-1)?.isIntersecting ?? inView;
        emit();
      });
      observer.observe(video);
      env.document.addEventListener("visibilitychange", emit);
      return () => {
        observer.disconnect();
        env.document.removeEventListener("visibilitychange", emit);
      };
    },
  };
}
