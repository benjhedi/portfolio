import { useApp } from "../app/AppContext";
import { journeyHead, journey } from "../content/content";
import { Reveal, Parallax, SectionEyebrow } from "./Primitives";

export function Parcours() {
  const { t } = useApp();
  return (
    <section id="parcours" className="bg-sink px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 flex flex-col gap-4 md:mb-16">
          <SectionEyebrow index="04">{t(journeyHead.eyebrow)}</SectionEyebrow>
          <h2 className="display text-[clamp(2rem,4.4vw,3rem)]">{t(journeyHead.title)}</h2>
        </Reveal>

        <div className="flex flex-col">
          {journey.map((j, i) => (
            <Reveal
              key={i}
              y={32}
              className="group grid items-start gap-6 border-t border-line py-9 last:border-b md:grid-cols-[200px_1fr] md:gap-14 md:py-14"
            >
              <Parallax amount={14}>
                <span className="text-[1.05rem] font-semibold text-muted transition-colors group-hover:text-skyink">
                  {t(j.year)}
                </span>
              </Parallax>
              <div>
                <h3 className="display text-[clamp(1.5rem,3vw,2.25rem)] transition-transform duration-500 group-hover:translate-x-2">
                  {t(j.role)}
                </h3>
                <div className="mt-2 text-sm text-muted">{t(j.meta)}</div>
                <p className="mt-3 max-w-[62ch] text-[1.05rem] text-body">{t(j.desc)}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
