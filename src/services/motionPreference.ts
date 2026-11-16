/** Whether the hero may animate, read live so a change while the page is open applies (AC-18). */
export interface MotionPreference {
  reduced(): boolean;
  /** Calls `onChange` when `reduced()` may have changed; returns the unsubscribe. */
  subscribe(onChange: () => void): () => void;
}
