import {
  motion,
  useMotionValue,
  useSpring,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { useReduce } from "../app/useReduce";
import {
  Compass,
  PencilRuler,
  CodeXml,
  FlaskConical,
  Rocket,
  LifeBuoy,
  Layers,
  Frame,
  Code,
  LayoutGrid,
  ShieldCheck,
  type LucideProps,
} from "lucide-react";
import type { IconName } from "../content/content";

/* ---- Icone Lucide (charte : trait 1.5px) ---- */
const ICONS: Record<IconName, React.ComponentType<LucideProps>> = {
  Compass, PencilRuler, CodeXml, FlaskConical, Rocket, LifeBuoy,
  Layers, Frame, Code, LayoutGrid, ShieldCheck,
};
export function Icon({
  name,
  size = 20,
  className,
}: {
  name: IconName;
  size?: number;
  className?: string;
}) {
  const C = ICONS[name];
  return C ? <C size={size} strokeWidth={1.5} className={className} /> : null;
}

/* ---- Bouton magnetique (motion values, jamais useState) ---- */
export function Magnetic({
  children,
  className = "",
  strength = 0.4,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduce();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 150, damping: 15, mass: 0.1 });
  const sy = useSpring(y, { stiffness: 150, damping: 15, mass: 0.1 });

  function onMove(e: React.MouseEvent) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ---- Apparition au scroll ---- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 26,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReduce();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---- Mot accentue dans un titre (skyink), pilote par content.ts ---- */
export function Accent({ text, accent }: { text: string; accent?: string }) {
  if (!accent) return <>{text}</>;
  const i = text.indexOf(accent);
  if (i === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <span className="text-skyink">{accent}</span>
      {text.slice(i + accent.length)}
    </>
  );
}

/* ---- Eyebrow de section avec index monospace (fil conducteur wibify) ---- */
export function SectionEyebrow({
  index,
  children,
}: {
  index: string;
  children: ReactNode;
}) {
  return (
    <span className="eyebrow inline-flex items-center gap-2">
      <span className="font-mono tracking-normal text-skyink">{index}</span>
      <span className="text-muted" aria-hidden>
        /
      </span>
      <span>{children}</span>
    </span>
  );
}

/* ---- Vertical cut reveal (titre : mots qui montent d'un masque, fondu) ---- */
const normalizeWord = (w: string) =>
  w.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

export function CutReveal({
  text,
  accent,
  accentClassName = "",
  className = "",
  stagger = 0.05,
  delay = 0,
  duration = 0.9,
}: {
  text: string;
  accent?: string;
  accentClassName?: string;
  className?: string;
  stagger?: number;
  delay?: number;
  duration?: number;
}) {
  const reduce = useReduce();
  const words = text.split(" ");
  const accentSet = accent
    ? new Set(accent.split(" ").map(normalizeWord).filter(Boolean))
    : null;
  const isAccent = (w: string) => !!accentSet?.has(normalizeWord(w));

  if (reduce) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i} className={isAccent(w) ? accentClassName : undefined}>
            {w}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      <span className="sr-only">{text}</span>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-flex overflow-hidden pb-[0.15em] -mb-[0.15em]"
        >
          <motion.span
            className={`inline-block will-change-transform ${isAccent(w) ? accentClassName : ""}`}
            initial={{ y: "130%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration,
              delay: delay + i * stagger,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {w}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </span>
  );
}

/* ---- Parallaxe scroll (profondeur douce sur les visuels) ---- */
export function Parallax({
  children,
  amount = 40,
  className = "",
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReduce();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);
  return (
    <motion.div ref={ref} style={reduce ? undefined : { y }} className={className}>
      {children}
    </motion.div>
  );
}
