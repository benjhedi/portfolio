import { useApp } from "../app/AppContext";
import { offersHead, offers } from "../content/content";
import { Reveal, Icon, SectionEyebrow, Accent } from "./Primitives";

export function Offers() {
  const { t } = useApp();
  return (
    <section id="offres" className="px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <SectionEyebrow index="01">{t(offersHead.eyebrow)}</SectionEyebrow>
          <h2 className="display max-w-[18ch] text-[clamp(2rem,4.4vw,3rem)]">
            <Accent text={t(offersHead.title)} accent={t(offersHead.accent)} />
          </h2>
          <p className="max-w-[58ch] text-[clamp(1.05rem,2vw,1.2rem)] text-body">
            {t(offersHead.lead)}
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {offers.map((o, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <article className="group flex h-full min-h-[320px] flex-col gap-5 rounded-card border border-line bg-cream p-7 transition duration-300 hover:border-sky motion-safe:hover:-translate-y-1 sm:p-11">
                <span className="grid size-12 place-items-center rounded-card border border-line2 text-ink transition-colors group-hover:border-sky group-hover:text-skyink">
                  <Icon name={o.icon} />
                </span>
                <h3 className="display mt-1 text-[clamp(1.5rem,3vw,2.25rem)]">
                  {t(o.title)}
                </h3>
                <p className="max-w-[40ch] text-body">{t(o.body)}</p>
                <span className="mt-auto text-sm text-muted">{t(o.meta)}</span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
