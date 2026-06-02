import { useApp } from "../app/AppContext";
import { skillsHead, skills, stackMarquee } from "../content/content";
import { Reveal, Icon, SectionEyebrow, Accent } from "./Primitives";

export function Skills() {
  const { t } = useApp();
  const row = [...stackMarquee, ...stackMarquee];

  return (
    <section id="competences" className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <SectionEyebrow index="05">{t(skillsHead.eyebrow)}</SectionEyebrow>
          <h2 className="display text-[clamp(2rem,4.4vw,3rem)]"><Accent text={t(skillsHead.title)} accent={t(skillsHead.accent)} /></h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {skills.map((s, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="group flex h-full flex-col gap-5 rounded-card border border-line bg-cream p-6 transition duration-300 hover:border-sky motion-safe:hover:-translate-y-1 sm:p-9">
                <h3 className="flex items-center gap-3 text-[1.15rem] font-semibold text-ink">
                  <Icon name={s.icon} size={20} className="transition-colors group-hover:text-skyink" /> {t(s.title)}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {s.items.map((it) => (
                    <span key={it} className="rounded-btn border border-line bg-cream px-3.5 py-1.5 text-sm text-body">
                      {it}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Marquee technos */}
      <div className="relative mt-16 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="marquee-track flex w-max items-center gap-14 pr-14">
          {row.map((tech, i) => (
            <div key={`${tech.slug}-${i}`} className="group flex shrink-0 items-center gap-3" title={tech.name}>
              <img
                src={`https://cdn.simpleicons.org/${tech.slug}/1c1c1c`}
                alt={tech.name}
                width={26}
                height={26}
                loading="lazy"
                className="size-6 opacity-40 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="display text-2xl text-muted transition-colors group-hover:text-ink">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
