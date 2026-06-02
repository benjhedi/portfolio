import { motion, useReducedMotion } from "motion/react";
import { Mail, ArrowDown } from "lucide-react";
import { useApp } from "../app/AppContext";
import { hero, clientsIntro, clients } from "../content/content";
import { Magnetic } from "./Primitives";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  const { t } = useApp();
  const reduce = useReducedMotion();

  const up = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col justify-center px-5 pt-28 pb-16 sm:px-8"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* Texte */}
          <div>
            <motion.div {...up(0)} className="mb-7 inline-flex items-center gap-2.5">
              <span className="size-[7px] rounded-full bg-sky" />
              <span className="eyebrow">{t(hero.eyebrow)}</span>
            </motion.div>

            <motion.h1 {...up(0.08)} className="display max-w-[15ch] text-[clamp(2.4rem,5vw,4rem)]">
              {t(hero.pre)}
              <span className="text-skyink">{t(hero.accent)}</span>
              {t(hero.post)}
            </motion.h1>

            <motion.p {...up(0.16)} className="mt-7 max-w-[44ch] text-[clamp(1.05rem,1.5vw,1.2rem)] leading-relaxed text-body">
              {t(hero.sub)}
            </motion.p>

            <motion.div {...up(0.24)} className="mt-9 flex flex-wrap items-center gap-4">
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

          {/* Visuel 3D (ou repli statique) */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center"
          >
            <HeroVisual />
          </motion.div>
        </div>

        <motion.div {...up(0.34)} className="mt-12 flex flex-wrap gap-x-12 gap-y-6 border-t border-line pt-8">
          {hero.meta.map((m, i) => (
            <div key={i}>
              <div className="text-[15px] font-semibold text-ink">{t(m.t)}</div>
              <div className="text-sm text-muted">{t(m.d)}</div>
            </div>
          ))}
        </motion.div>

        <motion.div {...up(0.42)} className="mt-12">
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
