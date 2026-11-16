import { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "motion/react";
import { useApp } from "../../app/AppContext";
import { useServices } from "../../app/ServiceContext";
import { heroV2, identity } from "../../content/content";
import { heroPlayback, heroView } from "./heroPlayback";

// Each element reveals once, on its own first entry into the viewport (AC-8).
function useReveal<T extends Element>() {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true });
  return { ref, "data-in": inView || undefined };
}

export function Hero() {
  const { t } = useApp();
  const titleId = useId();
  const oval = useReveal<HTMLDivElement>();
  const name = useReveal<HTMLSpanElement>();
  const role = useReveal<HTMLSpanElement>();
  const hint = useReveal<HTMLAnchorElement>();

  const { motionPreference, createVideoClock } = useServices();
  const reduced = useSyncExternalStore(motionPreference.subscribe, motionPreference.reduced);
  // Not watchable until the clock reports the hero in view and the tab visible.
  const [state, dispatch] = useReducer(heroPlayback, {
    reduced,
    status: "loading",
    visitorPaused: false,
    watchable: false,
  });
  const view = heroView(state);

  // A state-held element gives a new clock whenever the video remounts.
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const clock = useMemo(() => video && createVideoClock(video), [video, createVideoClock]);

  // One play() in flight at a time: a click that already started one (after a
  // refusal, to keep the user activation) is not doubled by the effect below.
  // A pause or a new clock drops the request, so its late outcome is ignored.
  const pending = useRef<object | null>(null);
  const startPlay = useCallback(() => {
    if (!clock || pending.current) return;
    const request = {};
    pending.current = request;
    void clock.play().then((outcome) => {
      if (pending.current !== request) return;
      pending.current = null;
      if (outcome === "playing") dispatch({ type: "started" });
      else if (outcome !== "interrupted") dispatch({ type: outcome });
    });
  }, [clock]);

  useEffect(() => {
    if (reduced !== state.reduced) dispatch({ type: "reducedChanged", reduced });
  }, [reduced, state.reduced]);

  useEffect(() => {
    if (!clock) return;
    const offFailed = clock.onFailed(() => dispatch({ type: "failed" }));
    const offWatchable = clock.onWatchable((watchable) => dispatch({ type: "watchableChanged", watchable }));
    return () => {
      offFailed();
      offWatchable();
      pending.current = null;
    };
  }, [clock]);

  // Runs only when shouldPlay or the clock changes, so a play is issued on a
  // false-to-true transition and never on a re-render.
  useEffect(() => {
    if (!clock) return;
    if (view.shouldPlay) return startPlay();
    pending.current = null;
    clock.pause();
  }, [clock, view.shouldPlay, startPlay]);

  return (
    <section id="top" className="hero" aria-labelledby={titleId} data-held={view.held || undefined}>
      <div {...oval} className="oval">
        <div className="media">
          <video
            ref={setVideo}
            muted
            loop
            playsInline
            preload="auto"
            poster={heroV2.media.poster}
            aria-label={t(heroV2.videoLabel)}
          >
            <source src={heroV2.media.webm} type="video/webm" />
            <source src={heroV2.media.mp4} type="video/mp4" />
          </video>
          <i className="tint" aria-hidden="true" />
        </div>
        <div className="halo" aria-hidden="true" />
      </div>
      <h1 id={titleId}>
        <span {...name} className="name">
          <strong>{identity.name}</strong>
        </span>
        <span {...role} className="role">
          {t(identity.role)}
        </span>
      </h1>
      <a {...hint} className="scroll" href={`#${heroV2.next}`}>
        <i aria-hidden="true" />
        <span>{t(heroV2.hint)}</span>
      </a>
    </section>
  );
}
