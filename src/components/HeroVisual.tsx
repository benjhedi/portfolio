import { lazy, Suspense, useMemo } from "react";
import { useReducedMotion } from "motion/react";
import { Phone } from "./Phone";

const Hero3D = lazy(() => import("./Hero3D").then((m) => ({ default: m.Hero3D })));

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (c.getContext("webgl") || c.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

const Fallback = () => (
  <div className="mx-auto w-[230px] sm:w-[260px]">
    <Phone image="/projects/RIDE.png" />
  </div>
);

export function HeroVisual() {
  const reduce = useReducedMotion();
  const use3D = useMemo(() => {
    // ?webgl force la scene 3D (demo) meme sous reduced-motion
    const force =
      typeof location !== "undefined" &&
      new URLSearchParams(location.search).has("webgl");
    return (force || !reduce) && webglOK();
  }, [reduce]);

  if (!use3D) return <Fallback />;

  return (
    <div
      className="h-[clamp(360px,52vh,560px)] w-full"
      style={{ touchAction: "pan-y" }}
    >
      <Suspense fallback={<Fallback />}>
        <Hero3D />
      </Suspense>
    </div>
  );
}
