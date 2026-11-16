import { describe, expect, it } from "vitest";
import { createHtmlVideoClock } from "./htmlVideoClock";

type Listener = () => void;
type Registration = { type: string; listener: Listener; capture: boolean };

function isCapture(options?: boolean | AddEventListenerOptions): boolean {
  return options === true || (typeof options === "object" && options.capture === true);
}

/** Event target double: removal matches type, listener and capture, as the DOM does. */
class TargetDouble {
  registrations: Registration[] = [];
  addEventListener(type: string, listener: Listener, options?: boolean | AddEventListenerOptions): void {
    this.registrations.push({ type, listener, capture: isCapture(options) });
  }
  removeEventListener(type: string, listener: Listener, options?: boolean | EventListenerOptions): void {
    const capture = isCapture(options);
    this.registrations = this.registrations.filter(
      (r) => !(r.type === type && r.listener === listener && r.capture === capture),
    );
  }
  dispatch(type: string): void {
    for (const r of this.registrations.filter((r) => r.type === type)) r.listener();
  }
}

/** HTMLVideoElement double: scripted `play`, recorded `muted` at the moment `play` runs. */
class VideoDouble extends TargetDouble {
  readonly NETWORK_NO_SOURCE = 3;
  networkState = 2;
  currentTime = 0;
  muted = false;
  mutedWhenPlayCalled: boolean | null = null;
  pauseCalls = 0;
  constructor(private readonly playResult: () => Promise<void>) {
    super();
  }
  play(): Promise<void> {
    this.mutedWhenPlayCalled = this.muted;
    return this.playResult();
  }
  pause(): void {
    this.pauseCalls += 1;
  }
}

class DocumentDouble extends TargetDouble {
  visibilityState: DocumentVisibilityState = "visible";
}

/** IntersectionObserver double: `report` plays the browser calling back with one entry. */
class ObserverDouble {
  static instances: ObserverDouble[] = [];
  observed: unknown[] = [];
  disconnected = false;
  constructor(private readonly callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
    ObserverDouble.instances.push(this);
  }
  observe(target: unknown): void {
    this.observed.push(target);
  }
  disconnect(): void {
    this.disconnected = true;
  }
  report(isIntersecting: boolean): void {
    this.callback([{ isIntersecting }]);
  }
}

function fixture(playResult: () => Promise<void> = () => Promise.resolve()) {
  ObserverDouble.instances = [];
  const video = new VideoDouble(playResult);
  const doc = new DocumentDouble();
  const clock = createHtmlVideoClock(video as unknown as HTMLVideoElement, {
    document: doc as unknown as Document,
    IntersectionObserver: ObserverDouble as unknown as typeof IntersectionObserver,
  });
  return { video, doc, clock, observer: () => ObserverDouble.instances[0] };
}

function rejectWith(reason: unknown): () => Promise<void> {
  return () => Promise.reject(reason);
}

function domError(name: string): Error {
  const error = new Error(name);
  error.name = name;
  return error;
}

describe("htmlVideoClock", () => {
  // Plan row, AC-15

  it("reportsFailedWhenEverySourceErrors", async () => {
    const { video, clock } = fixture();
    let failures = 0;
    clock.onFailed(() => {
      failures += 1;
    });

    video.networkState = video.NETWORK_NO_SOURCE;
    video.dispatch("error");

    expect(failures).toBe(1);
    expect(video.registrations).toEqual([expect.objectContaining({ type: "error", capture: true })]);

    expect(await fixture(rejectWith(domError("NotAllowedError"))).clock.play()).toBe("refused");
    expect(await fixture(rejectWith(domError("AbortError"))).clock.play()).toBe("interrupted");
    expect(await fixture(rejectWith(domError("NotSupportedError"))).clock.play()).toBe("failed");
  });

  // Plan row, AC-18

  it("reportsUnwatchableWhenHiddenOrOffscreen", () => {
    const { video, doc, clock, observer } = fixture();
    const reports: boolean[] = [];
    clock.onWatchable((watchable) => reports.push(watchable));
    expect(observer().observed).toEqual([video]);

    observer().report(true);
    observer().report(false);
    observer().report(true);
    doc.visibilityState = "hidden";
    doc.dispatch("visibilitychange");
    doc.visibilityState = "visible";
    doc.dispatch("visibilitychange");

    expect(reports).toEqual([true, false, true, false, true]);
  });

  // Beyond the plan rows, requested with T13

  it("resolvesPlayingWhenPlaySucceeds", async () => {
    expect(await fixture().clock.play()).toBe("playing");
  });

  it("setsMutedBeforePlay", async () => {
    const { video, clock } = fixture();

    await clock.play();

    expect(video.mutedWhenPlayCalled).toBe(true);
  });

  it("mapsUnnamedRejectionsToFailed", async () => {
    for (const reason of [null, undefined, "boom", { code: 4 }, new TypeError("bad")]) {
      expect(await fixture(rejectWith(reason)).clock.play(), String(reason)).toBe("failed");
    }
  });

  it("ignoresSourceErrorWhileSourcesRemain", () => {
    const { video, clock } = fixture();
    let failures = 0;
    clock.onFailed(() => {
      failures += 1;
    });

    video.networkState = 2;
    video.dispatch("error");

    expect(failures).toBe(0);
  });

  it("reportsClipTimeOnTimeupdate", () => {
    const { video, clock } = fixture();
    const times: number[] = [];
    clock.onTime((t) => times.push(t));

    video.currentTime = 2.1;
    video.dispatch("timeupdate");

    expect(times).toEqual([2.1]);
  });

  it("reportsUnwatchableWhenVisibleBeforeObserverReports", () => {
    const { doc, clock } = fixture();
    const reports: boolean[] = [];
    clock.onWatchable((watchable) => reports.push(watchable));

    doc.dispatch("visibilitychange");

    expect(reports).toEqual([false]);
  });

  it("forwardsPause", () => {
    const { video, clock } = fixture();

    clock.pause();

    expect(video.pauseCalls).toBe(1);
  });

  it("removesEveryListenerOnUnsubscribe", () => {
    const { video, doc, clock, observer } = fixture();
    let calls = 0;
    const count = () => {
      calls += 1;
    };

    const offTime = clock.onTime(count);
    const offFailed = clock.onFailed(count);
    const offWatchable = clock.onWatchable(count);
    offTime();
    offFailed();
    offWatchable();

    expect(video.registrations).toEqual([]);
    expect(doc.registrations).toEqual([]);
    expect(observer().disconnected).toBe(true);

    video.networkState = video.NETWORK_NO_SOURCE;
    video.dispatch("timeupdate");
    video.dispatch("error");
    doc.dispatch("visibilitychange");
    expect(calls).toBe(0);
  });
});
