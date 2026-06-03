import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useReduce } from "../app/useReduce";
import { X } from "lucide-react";
import { useApp } from "../app/AppContext";
import { modalLabels, type Project } from "../content/content";
import { Phone } from "./Phone";

export function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const { t } = useApp();
  const reduce = useReduce();
  const [idx, setIdx] = useState(0);
  const client = typeof project.client === "string" ? project.client : t(project.client);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  // apparition en cascade des sections de la fiche
  const stepIn = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: 0.12 + i * 0.07, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="fixed inset-0 z-[100] grid place-items-center bg-char/40 p-4 backdrop-blur-md sm:p-8"
    >
      <motion.div
        initial={reduce ? false : { y: 12 }}
        animate={{ y: 0 }}
        exit={reduce ? undefined : { opacity: 0, y: 12 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="relative max-h-[90vh] w-full max-w-[960px] overflow-y-auto rounded-box border border-line bg-cream p-6 sm:p-10"
      >
        <button
          onClick={onClose}
          aria-label={t(modalLabels.close)}
          className="absolute right-4 top-4 z-10 grid size-10 place-items-center rounded-[8px] border border-line2 bg-cream text-ink transition-colors hover:border-sky hover:text-skyink"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        <div className="grid items-start gap-8 sm:grid-cols-[280px_1fr] sm:gap-10">
          {/* Visuel partage */}
          <div className="flex flex-col items-center gap-3.5">
            <Phone
              layoutId={`phone-${project.id}`}
              image={project.images[idx]}
              placeholder={project.name.slice(0, 2)}
              className="w-[220px]"
            />
            {project.images.length > 1 && (
              <div className="flex flex-wrap justify-center gap-2">
                {project.images.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setIdx(i)}
                    aria-label={`Capture ${i + 1}`}
                    className={`h-[58px] w-[38px] overflow-hidden rounded-[8px] border transition-colors ${
                      i === idx ? "border-sky" : "border-line2 hover:border-muted"
                    }`}
                  >
                    <img src={src} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Texte */}
          <div className="order-first sm:order-none">
            <motion.div {...stepIn(0)} className="flex items-baseline gap-3">
              <h3 className="display text-[clamp(1.8rem,4vw,2.5rem)]">{project.name}</h3>
              <span className="text-sm text-muted">{client}</span>
            </motion.div>

            <motion.div {...stepIn(1)} className="mt-6 flex gap-10">
              <div>
                <span className="eyebrow block">{t(modalLabels.role)}</span>
                <span className="mt-1 block text-[15px] font-semibold text-ink">{t(project.role)}</span>
              </div>
              <div>
                <span className="eyebrow block">{t(modalLabels.period)}</span>
                <span className="mt-1 block text-[15px] font-semibold text-ink">{project.period}</span>
              </div>
            </motion.div>

            <motion.p {...stepIn(2)} className="mt-6 border-l-2 border-sky pl-4 text-[1.2rem] leading-snug text-ink">
              {t(project.highlight)}
            </motion.p>

            <motion.div {...stepIn(3)} className="mt-6 border-t border-line pt-6">
              <span className="eyebrow block">{t(modalLabels.context)}</span>
              <p className="mt-3 text-body">{t(project.context)}</p>
            </motion.div>

            <motion.div {...stepIn(4)} className="mt-6 border-t border-line pt-6">
              <span className="eyebrow block">{t(modalLabels.did)}</span>
              <ul className="mt-4 flex flex-col gap-3.5">
                {project.contributions.map((c, i) => (
                  <li key={i} className="flex gap-3.5 text-body">
                    <span className="mt-0.5 font-mono text-[13px] font-semibold text-skyink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span>{t(c)}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div {...stepIn(5)} className="mt-6 border-t border-line pt-6">
              <span className="eyebrow block">{t(modalLabels.stack)}</span>
              <div className="mt-3 flex flex-wrap gap-2.5">
                {project.stack.map((s) => (
                  <span key={s} className="rounded-btn border border-line bg-cream px-3.5 py-1.5 text-sm text-body">
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
