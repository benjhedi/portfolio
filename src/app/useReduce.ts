import { useReducedMotion } from "motion/react";

/*
  Preference "mouvement reduit" du systeme, avec un echappatoire de demo :
  l'URL ?motion (comme ?webgl pour la 3D) force les animations meme sous
  reduced-motion. Pour les vrais visiteurs, la preference systeme est
  respectee a la lettre (charte a11y).
*/
export function useReduce(): boolean {
  const systemReduce = useReducedMotion();
  const force =
    typeof location !== "undefined" &&
    new URLSearchParams(location.search).has("motion");
  return force ? false : !!systemReduce;
}
