import { motion } from "motion/react";
import { Card } from "@warastudio/react";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "../app/AppContext";
import { useReduce } from "../app/useReduce";
import { projectsHead, projects, more, type Project } from "../content/content";
import { Reveal, Tilt, SectionEyebrow, Accent } from "./Primitives";
import { Phone } from "./Phone";

export function Work({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useApp();

  return (
    <section id="projets" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-16 flex max-w-[640px] flex-col gap-4 md:mb-24">
          <SectionEyebrow index="04">{t(projectsHead.eyebrow)}</SectionEyebrow>
          <h2 className="display text-[clamp(2rem,4.4vw,3rem)]"><Accent text={t(projectsHead.title)} accent={t(projectsHead.accent)} /></h2>
          <p className="text-[clamp(1.05rem,2vw,1.2rem)] text-body">{t(projectsHead.lead)}</p>
        </Reveal>
      </div>

      {/* Vitrine cinematique : chaque projet = une rangee texte + device en zig-zag.
          Texte et ecran restent solidaires (plus de pin/parallaxe qui creent des vides). */}
      <div className="mx-auto flex max-w-[1240px] flex-col gap-24 md:gap-36">
        {projects.map((p, i) => (
          <CaseRow key={p.id} p={p} flip={i % 2 === 1} onOpen={onOpen} />
        ))}
      </div>

      <div className="mx-auto mt-24 max-w-[1240px] md:mt-36">
        <Reveal>
          <h4 className="mb-6 text-base font-semibold text-ink">{t(projectsHead.moreTitle)}</h4>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((m, i) => (
              <Reveal key={i} delay={i * 0.04} className="h-full">
                <Card
                  interactive
                  variant="compact"
                  className="group flex h-full cursor-pointer flex-col gap-1.5"
                >
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-skyink">
                    {t(m.client)}
                  </span>
                  <h5 className="text-[1.05rem] font-semibold text-ink">{t(m.title)}</h5>
                  <p className="text-sm leading-relaxed text-body">{t(m.desc)}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseRow({
  p,
  flip,
  onOpen,
}: {
  p: Project;
  flip: boolean;
  onOpen: (id: string) => void;
}) {
  const { t } = useApp();
  const reduce = useReduce();
  const client = typeof p.client === "string" ? p.client : t(p.client);

  return (
    <button
      onClick={() => onOpen(p.id)}
      className="group block w-full text-left"
      aria-label={`${p.name} — ${t(projectsHead.detail)}`}
    >
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Texte */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-12% 0px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className={`lg:col-span-6 ${flip ? "lg:order-2 lg:col-start-7" : ""}`}
        >
          <div className="flex items-baseline gap-4 text-sm text-muted">
            <span className="text-skyink">{p.index}</span>
            <span>{p.period}</span>
            <span>{client}</span>
          </div>
          <h3 className="display mt-4 text-[clamp(2.5rem,7vw,5.5rem)] leading-[0.95]">
            {p.name}
          </h3>
          <p className="mt-4 text-[15px] font-semibold text-skyink">{t(p.role)}</p>
          <p className="mt-5 max-w-[46ch] text-body">{t(p.highlight)}</p>
          <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition-colors group-hover:text-skyink">
            {t(projectsHead.detail)}
            <ArrowUpRight size={17} strokeWidth={1.5} className="text-skyink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </motion.div>

        {/* Device sur scene cinematique */}
        <div className={`flex justify-center lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
          <Stage flip={flip} reduce={reduce}>
            <Phone
              layoutId={`phone-${p.id}`}
              image={p.images[0]}
              parallax
              placeholder={p.name.slice(0, 2)}
              className="w-[210px] sm:w-[240px]"
            />
          </Stage>
        </div>
      </div>
    </button>
  );
}

/* Scene : projecteur sky derriere + reflet dessous + revelation 3D a l'entree,
   puis tilt 3D au curseur (Tilt reutilise). */
function Stage({
  children,
  flip,
  reduce,
}: {
  children: React.ReactNode;
  flip: boolean;
  reduce: boolean;
}) {
  return (
    <div className="relative grid place-items-center">
      {/* Projecteur (halo sky) — discret en clair, plus marque en Midnight via tokens */}
      <div
        aria-hidden
        className="pointer-events-none absolute h-[78%] w-[120%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-sky) 45%, transparent), transparent 65%)",
          opacity: 0.5,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute h-[60%] w-[80%] translate-x-[12%] translate-y-[14%] rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-slate) 45%, transparent), transparent 60%)",
          opacity: 0.35,
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 44, rotateY: flip ? -14 : 14, scale: 0.94 }}
        whileInView={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformPerspective: 1000 }}
        className="relative"
      >
        <Tilt max={7} radius="rounded-[34px]">
          {children}
        </Tilt>
        {/* Reflet sous l'appareil */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-6 top-[97%] h-16 rounded-[50%] blur-md"
          style={{ background: "color-mix(in srgb, var(--color-bezel) 30%, transparent)" }}
        />
      </motion.div>
    </div>
  );
}
