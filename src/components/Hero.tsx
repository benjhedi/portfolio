import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Mail, ArrowDown } from "lucide-react";
import { useApp } from "../app/AppContext";
import { hero, clientsIntro, clients } from "../content/content";
import { Magnetic, CutReveal } from "./Primitives";
import { useReduce } from "../app/useReduce";

/* Fonds hero : une video tiree au sort a chaque chargement */
const heroMedia = [
  { mp4: "/hero/hero-1.mp4", poster: "/hero/hero-1.jpg" },
  { mp4: "/hero/hero-2.mp4", poster: "/hero/hero-2.jpg" },
];

export function Hero() {
  const { t } = useApp();
  const reduce = useReduce();
  const videoRef = useRef<HTMLVideoElement>(null);
  // tirage stable pour le montage (ne change pas aux re-renders)
  const [media] = useState(() => heroMedia[Math.floor(Math.random() * heroMedia.length)]);

  const title = `${t(hero.pre)}${t(hero.accent)}${t(hero.post)}`;

  // muted comme propriete DOM (React ne la pose pas toujours), puis lecture
  // robuste : relance sur canplay et nettoyage propre (StrictMode, autoplay)
  useEffect(() => {
    const v = videoRef.current;
    if (!v || reduce) return;
    v.muted = true;
    const tryPlay = () => {
      v.play().catch(() => {});
    };
    tryPlay();
    v.addEventListener("canplay", tryPlay);
    return () => v.removeEventListener("canplay", tryPlay);
  }, [reduce]);

  const up = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden px-5 pt-28 pb-16 sm:px-8"
    >
      {/* Fond video pleine largeur (repli poster sous reduced-motion) */}
      <div className="absolute inset-0 z-0" aria-hidden>
        {reduce ? (
          <img src={media.poster} alt="" className="h-full w-full object-cover" />
        ) : (
          <video
            ref={videoRef}
            key={media.mp4}
            autoPlay
            muted
            loop
            playsInline
            poster={media.poster}
            preload="metadata"
            className="h-full w-full object-cover"
          >
            <source src={media.mp4} type="video/mp4" />
          </video>
        )}
        {/* Voile creme : opaque a gauche (texte), transparent a droite (appareils) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, var(--color-cream) 0%, var(--color-cream) 42%, rgba(247,244,237,0.7) 60%, rgba(247,244,237,0.3) 100%)",
          }}
        />
        {/* Scrim renforce sur mobile + fondu bas vers la page */}
        <div className="absolute inset-0 bg-cream/55 md:bg-transparent" />
        <div
          className="absolute inset-x-0 bottom-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-cream))" }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1240px]">
        <div className="max-w-[680px]">
            <motion.div {...up(0)} className="mb-7 inline-flex items-center gap-2.5">
              <span className="size-[7px] rounded-full bg-sky" />
              <span className="eyebrow">{t(hero.eyebrow)}</span>
            </motion.div>

            <h1 className="display max-w-[15ch] text-[clamp(2.4rem,5vw,4rem)]">
              <CutReveal
                text={title}
                accent={t(hero.accent)}
                accentClassName="text-skyink"
                delay={0.12}
                stagger={0.05}
              />
            </h1>

            <motion.p {...up(0.55)} className="mt-7 max-w-[44ch] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-relaxed text-body">
              {t(hero.sub)}
            </motion.p>

            <motion.div {...up(0.7)} className="mt-9 flex flex-wrap items-center gap-4">
              <Magnetic>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2.5 rounded-btn bg-char px-5 py-3.5 text-[15px] font-semibold text-off shadow-inset transition-transform duration-200 active:translate-y-px"
                >
                  <Mail size={17} strokeWidth={1.5} />
                  {t(hero.cta1)}
                </a>
              </Magnetic>
              <a
                href="#projets"
                className="group inline-flex items-center gap-2 rounded-btn border border-line2 px-5 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-sky hover:text-skyink"
              >
                {t(hero.cta2)}
                <ArrowDown size={16} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </div>

        <motion.div {...up(0.85)} className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
          {hero.meta.map((m, i) => (
            <div key={i}>
              <div className="text-[15px] font-semibold text-ink">{t(m.t)}</div>
              <div className="text-sm text-muted">{t(m.d)}</div>
            </div>
          ))}
        </motion.div>

        <motion.div {...up(0.98)} className="mt-12">
          <p className="eyebrow mb-5 text-[11px]">{t(clientsIntro)}</p>
          <div className="flex flex-wrap items-baseline gap-x-10 gap-y-3">
            {clients.map((c) => (
              <span key={c} className="display text-xl text-muted transition-colors hover:text-ink sm:text-2xl">
                {c}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
