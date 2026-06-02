import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/* Capture avec parallaxe contenue (l'image translate dans l'ecran au scroll) */
function ParallaxShot({ src, parallax }: { src: string; parallax: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <motion.img
        src={src}
        alt=""
        loading="lazy"
        style={parallax && !reduce ? { y } : undefined}
        className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover"
      />
    </div>
  );
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center bg-sink">
      <span className="display text-5xl text-line2">{label}</span>
    </div>
  );
}

export function Phone({
  image,
  layoutId,
  parallax = false,
  placeholder = "",
  className = "",
}: {
  image?: string;
  layoutId?: string;
  parallax?: boolean;
  placeholder?: string;
  className?: string;
}) {
  return (
    <motion.div
      layoutId={layoutId}
      className={`relative aspect-[9/19] rounded-[34px] border border-char bg-char p-2.5 shadow-inset ${className}`}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[26px] bg-cream">
        {image ? (
          <ParallaxShot src={image} parallax={parallax} />
        ) : (
          <Placeholder label={placeholder} />
        )}
        <span className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-char" />
      </div>
    </motion.div>
  );
}
