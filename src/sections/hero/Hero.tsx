import { useCallback, useEffect, useId, useMemo, useReducer, useRef, useState, useSyncExternalStore } from "react";
import { useInView } from "motion/react";
import { Pause, Play } from "lucide-react";
import { useApp } from "../../app/AppContext";
import { useServices } from "../../app/ServiceContext";
import { heroV2, identity } from "../../content/content";
import { heroPlayback, heroView } from "./heroPlayback";
import { clampToOval, TOGGLE_INSET_PX } from "./ovalGeometry";
import { tickVapor, type VaporClock } from "./vaporSchedule";
import "./hero.css";

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

  // The released object is re-keyed so its emerge animation starts over.
  const vaporClock = useRef<VaporClock>({ armed: true, released: 0 });
  const [vapor, setVapor] = useState<{ index: number; run: number } | null>(null);
  useEffect(() => {
    if (!clock) return;
    const off = clock.onTime((seconds) => {
      const { clock: next, release } = tickVapor(vaporClock.current, seconds, heroV2.vapor.length);
      vaporClock.current = next;
      if (release !== null) setVapor({ index: release, run: next.released });
    });
    // The video unmounts under reduced motion; a kept release would replay at
    // t = 0 when it comes back instead of waiting for the exhale (AC-4).
    return () => {
      off();
      setVapor(null);
    };
  }, [clock]);
  const bar = (
    <i className="bar">
      <b />
      <b />
      <b />
    </i>
  );

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

  // One handler for the whole oval: the toggle's own click bubbles here,
  // Enter and Space included.
  const toggleRef = useRef<HTMLButtonElement>(null);
  const onOvalClick = () => {
    if (view.toggle === "hidden") return;
    // A play after a refusal must start inside the click to carry the user activation.
    if (view.toggle === "play") startPlay();
    dispatch({ type: "toggled" });
  };
  const onOvalPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const toggle = toggleRef.current;
    if (event.pointerType !== "mouse" || !toggle) return;
    const box = event.currentTarget.getBoundingClientRect();
    const at = clampToOval({ x: event.clientX - box.left, y: event.clientY - box.top }, box, TOGGLE_INSET_PX);
    toggle.style.left = `${at.x}px`;
    toggle.style.top = `${at.y}px`;
  };
  const onOvalPointerLeave = () => {
    toggleRef.current?.style.removeProperty("left");
    toggleRef.current?.style.removeProperty("top");
  };

  return (
    <section
      id="top"
      className="hero"
      aria-labelledby={titleId}
      data-held={view.held || undefined}
      data-reduced={state.reduced || undefined}
    >
      <div
        {...oval}
        className="oval"
        onClick={onOvalClick}
        onPointerMove={onOvalPointerMove}
        onPointerLeave={onOvalPointerLeave}
      >
        <div className="media">
          {/* Reduced motion keeps the poster only, so the video never loads (AC-6) */}
          {state.reduced ? (
            <img src={heroV2.media.poster} alt={t(heroV2.videoLabel)} />
          ) : (
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
          )}
          <i className="tint" aria-hidden="true" />
          {!state.reduced && (
            <div className="vapor" aria-hidden="true">
              {heroV2.vapor.map((object, index) => {
                const go = vapor?.index === index;
                return (
                  <span key={go ? `${index}-${vapor.run}` : index} className={`out ${object.kind}${go ? " go" : ""}`}>
                    {object.kind === "site" && bar}
                    {object.kind !== "product" ? (
                      <img src={object.src} alt="" />
                    ) : (
                      <>
                        {bar}
                        <div className="ui">
                          <div className="side">
                            <u />
                            <u />
                            <u />
                            <u />
                          </div>
                          <div className="main">
                            <em />
                            <em />
                            <em />
                            <em />
                            <strong>{t(heroV2.productLabel)}</strong>
                          </div>
                        </div>
                      </>
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div className="halo" aria-hidden="true" />
        {view.toggle !== "hidden" && (
          <button
            ref={toggleRef}
            type="button"
            className="play"
            aria-label={t(view.toggle === "play" ? heroV2.toggle.play : heroV2.toggle.pause)}
          >
            {view.toggle === "play" ? (
              <Play strokeWidth={1.5} aria-hidden="true" />
            ) : (
              <Pause strokeWidth={1.5} aria-hidden="true" />
            )}
          </button>
        )}
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
