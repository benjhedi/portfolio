import { useId, useRef } from "react";
import { useInView } from "motion/react";
import { useApp } from "../../app/AppContext";
import { heroV2, identity } from "../../content/content";

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

  return (
    <section id="top" className="hero" aria-labelledby={titleId}>
      <div {...oval} className="oval">
        <div className="media">
          <video
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
