import { motion } from "motion/react";
import { useApp } from "../app/AppContext";
import { journeyHead, journey } from "../content/content";
import { Reveal, Parallax, SectionEyebrow, Accent } from "./Primitives";
import { useReduce } from "../app/useReduce";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Parcours() {
  const { t } = useApp();
  const reduce = useReduce();

  // chaque entree apparait en cascade (annee, role, meta, description)
  const row = { hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } } };
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
  };

  return (
    <section id="parcours" className="bg-sink px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <SectionEyebrow index="05">{t(journeyHead.eyebrow)}</SectionEyebrow>
          <h2 className="display text-[clamp(2rem,4.4vw,3rem)]"><Accent text={t(journeyHead.title)} accent={t(journeyHead.accent)} /></h2>
        </Reveal>

        <div className="flex flex-col">
          {journey.map((j, i) => (
            <motion.div
              key={i}
              variants={row}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="group grid items-start gap-6 border-t border-line py-9 last:border-b md:grid-cols-[200px_1fr] md:gap-14 md:py-14"
            >
              <motion.div variants={item}>
                <Parallax amount={14}>
                  <span className="text-[1.05rem] font-semibold text-muted transition-colors group-hover:text-skyink">
                    {t(j.year)}
                  </span>
                </Parallax>
              </motion.div>
              <motion.div variants={stagger}>
                <motion.div variants={item}>
                  <h3 className="display text-[clamp(1.5rem,3vw,2.25rem)] transition-transform duration-500 group-hover:translate-x-2">
                    {t(j.role)}
                  </h3>
                </motion.div>
                <motion.div variants={item} className="mt-2 text-sm text-muted">
                  {t(j.meta)}
                </motion.div>
                <motion.p variants={item} className="mt-3 max-w-[62ch] text-[1.05rem] text-body">
                  {t(j.desc)}
                </motion.p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
