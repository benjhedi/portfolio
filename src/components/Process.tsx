import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";
import { useReduce } from "../app/useReduce";
import { useApp } from "../app/AppContext";
import { processHead, steps } from "../content/content";
import { Reveal, Icon, SectionEyebrow, Accent } from "./Primitives";

export function Process() {
  const { t } = useApp();
  const reduce = useReduce();
  const railRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(reduce ? steps.length : 0);

  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ["start 60%", "end 60%"],
  });
  const fillHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    if (!reduce) setActive(Math.round(p * steps.length));
  });

  return (
    <section id="processus" className="bg-sink px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-14 flex max-w-[640px] flex-col gap-4">
          <SectionEyebrow index="03">{t(processHead.eyebrow)}</SectionEyebrow>
          <h2 className="display text-[clamp(2rem,4.4vw,3rem)]"><Accent text={t(processHead.title)} accent={t(processHead.accent)} /></h2>
          <p className="text-[clamp(1.05rem,2vw,1.2rem)] text-body">{t(processHead.lead)}</p>
        </Reveal>

        <div ref={railRef} className="relative flex flex-col gap-9 pl-[84px] md:gap-16">
          {/* rail : trait de marque qui se remplit, avec tete lumineuse au scroll */}
          <div className="absolute left-[28px] top-2 bottom-2 w-[3px] -translate-x-px rounded-full bg-line">
            <motion.div
              style={reduce ? { height: "100%" } : { height: fillHeight }}
              className="ws-grad-brand w-full rounded-full"
            />
            {!reduce && (
              <motion.span
                style={{ top: fillHeight }}
                className="absolute left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                aria-hidden
              >
                <span className="block size-2.5 rounded-full bg-sky shadow-[0_0_16px_4px_color-mix(in_srgb,var(--color-sky)_70%,transparent)]" />
                <span className="absolute inset-0 animate-ping rounded-full bg-sky/60" />
              </motion.span>
            )}
          </div>

          {steps.map((s, i) => {
            const on = i < active;
            return (
              <div
                key={i}
                className="relative transition-opacity duration-500"
                style={{ opacity: reduce || on ? 1 : 0.4 }}
              >
                <span
                  className={`absolute -left-[84px] -top-1.5 grid size-[58px] place-items-center rounded-full border transition-all duration-500 ${
                    on
                      ? "ws-grad-brand scale-105 border-transparent text-off shadow-[0_6px_22px_-6px_color-mix(in_srgb,var(--color-sky)_80%,transparent)]"
                      : "border-line2 bg-raise text-ink"
                  }`}
                >
                  <Icon name={s.icon} />
                </span>
                <div
                  className={`mb-2.5 text-xs font-semibold tracking-[0.04em] transition-colors duration-500 ${
                    on ? "text-skyink" : "text-muted"
                  }`}
                >
                  {t(s.num)}
                </div>
                <h3 className="display mb-2.5 text-2xl">{t(s.title)}</h3>
                <p className="max-w-[54ch] text-body">{t(s.desc)}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
