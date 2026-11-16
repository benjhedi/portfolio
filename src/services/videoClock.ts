/** How a play request ended; "interrupted" means a pause or a reload cut it short. */
export type PlayOutcome = "playing" | "refused" | "failed" | "interrupted";

/** The hero loop as the section sees it, without the media element API. */
export interface VideoClock {
  /** Never rejects: a refused autoplay, an interruption and any other error map to an outcome. */
  play(): Promise<PlayOutcome>;
  pause(): void;
  /** Reports the clip time as playback advances. */
  onTime(listener: (seconds: number) => void): () => void;
  /** Fires once every source has failed to load. */
  onFailed(listener: () => void): () => void;
  /** True while the video is in the viewport and the tab is visible. */
  onWatchable(listener: (watchable: boolean) => void): () => void;
}

export type CreateVideoClock = (video: HTMLVideoElement) => VideoClock;
