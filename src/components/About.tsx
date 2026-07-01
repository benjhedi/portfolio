import { useApp } from "../app/AppContext";
import { aboutHead, about, identity } from "../content/content";
import { Reveal, Tilt, Icon, SectionEyebrow, Accent } from "./Primitives";

export function About() {
  const { t } = useApp();

  return (
    <section id="apropos" className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Profil */}
          <div className="lg:col-span-7">
            <Reveal>
              <img
                src="/hedi.jpg"
                alt={identity.name}
                width={512}
                height={512}
                loading="lazy"
                decoding="async"
                className="mb-7 size-28 rounded-full border border-line object-cover"
              />
            </Reveal>
            <Reveal className="flex flex-col gap-4" delay={0.05}>
              <SectionEyebrow index="01">{t(aboutHead.eyebrow)}</SectionEyebrow>
              <h2 className="display max-w-[16ch] text-[clamp(2rem,4.4vw,3rem)]">
                <Accent text={t(aboutHead.title)} accent={t(aboutHead.accent)} />
              </h2>
            </Reveal>
            <div className="mt-6 flex flex-col gap-5">
              {about.bio.map((p, i) => (
                <Reveal key={i} delay={0.05 + i * 0.06}>
                  <p className="max-w-[58ch] text-[clamp(1.05rem,2vw,1.2rem)] leading-relaxed text-body">
                    {t(p)}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Ce qui me caractérise */}
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5">
            {about.traits.map((tr, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <Tilt className="h-full">
                  <article className="group flex h-full flex-col gap-3.5 rounded-card border border-line bg-raise p-6 transition-colors duration-300 hover:border-sky">
                    <span className="grid size-11 place-items-center rounded-card border border-line2 text-ink transition-colors group-hover:border-sky group-hover:text-skyink">
                      <Icon name={tr.icon} size={18} />
                    </span>
                    <h3 className="text-[1.05rem] font-semibold text-ink">{t(tr.title)}</h3>
                    <p className="text-[0.95rem] leading-relaxed text-body">{t(tr.body)}</p>
                  </article>
                </Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
