import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useApp } from "../app/AppContext";
import { projectsHead, projects, more, type Project } from "../content/content";
import { Reveal } from "./Primitives";
import { Phone } from "./Phone";

gsap.registerPlugin(ScrollTrigger);

export function Work({ onOpen }: { onOpen: (id: string) => void }) {
  const { t } = useApp();
  const stackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !stackRef.current) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".case-card");
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        ScrollTrigger.create({
          trigger: card,
          start: "top top",
          endTrigger: cards[cards.length - 1],
          end: "top top",
          pin: true,
          pinSpacing: false,
        });
        gsap.to(card, {
          scale: 0.96,
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: cards[i + 1],
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
      });
    }, stackRef);
    return () => ctx.revert();
  }, [reduce]);

  return (
    <section id="projets" className="relative px-5 py-24 sm:px-8 md:py-32">
      <div className="mx-auto max-w-[1240px]">
        <Reveal className="mb-12 flex max-w-[640px] flex-col gap-4 md:mb-16">
          <span className="eyebrow">{t(projectsHead.eyebrow)}</span>
          <h2 className="display text-[clamp(2rem,4.4vw,3rem)]">{t(projectsHead.title)}</h2>
          <p className="text-[clamp(1.05rem,2vw,1.2rem)] text-body">{t(projectsHead.lead)}</p>
        </Reveal>
      </div>

      <div ref={stackRef} className="mx-auto max-w-[1240px]">
        {projects.map((p) => (
          <CaseCard key={p.id} p={p} reduce={!!reduce} onOpen={onOpen} />
        ))}
      </div>

      <div className="mx-auto mt-12 max-w-[1240px]">
        <Reveal className="rounded-box border border-line bg-sink p-7 sm:p-9">
          <h4 className="mb-4 text-base font-semibold text-ink">{t(projectsHead.moreTitle)}</h4>
          <div className="flex flex-wrap gap-2.5">
            {more.map((m, i) => (
              <span key={i} className="rounded-btn border border-line bg-cream px-3.5 py-2 text-sm text-body">
                {t(m)}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function CaseCard({
  p,
  reduce,
  onOpen,
}: {
  p: Project;
  reduce: boolean;
  onOpen: (id: string) => void;
}) {
  const { t } = useApp();
  const client = typeof p.client === "string" ? p.client : t(p.client);
  return (
    <article
      className={`case-card ${reduce ? "" : "sticky top-0 min-h-[100dvh]"} origin-top will-change-transform`}
    >
      <button
        onClick={() => onOpen(p.id)}
        className={`flex w-full flex-col justify-center rounded-t-box border-t border-line bg-cream px-5 text-left sm:px-10 ${reduce ? "py-12" : "min-h-[100dvh] py-16"}`}
      >
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
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
            <span className="mt-8 inline-flex items-center gap-2 text-[15px] font-semibold text-ink">
              {t(projectsHead.detail)}
              <ArrowUpRight size={17} strokeWidth={1.5} className="text-skyink" />
            </span>
          </div>

          <div className="flex justify-center lg:col-span-5 lg:col-start-8">
            <Phone
              layoutId={`phone-${p.id}`}
              image={p.images[0]}
              parallax
              placeholder={p.name.slice(0, 2)}
              className="w-[210px] sm:w-[240px]"
            />
          </div>
        </div>
      </button>
    </article>
  );
}
