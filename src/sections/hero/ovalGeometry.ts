/** Half the 44 px toggle target plus its 4 px focus ring, so both stay inside the oval (D3). */
export const TOGGLE_INSET_PX = 26;

/**
 * Keeps `p`, relative to the oval box's top-left corner, inside the ellipse
 * inset by `inset` from the oval edge. A point outside is moved along the
 * line to the center onto that ellipse; a point inside is returned as is.
 */
export function clampToOval(
  p: { x: number; y: number },
  box: { width: number; height: number },
  inset: number,
): { x: number; y: number } {
  const cx = box.width / 2;
  const cy = box.height / 2;
  const a = cx - inset;
  const b = cy - inset;
  // An oval too small to hold the inset ellipse leaves only its center.
  if (a <= 0 || b <= 0) return { x: cx, y: cy };
  const dx = p.x - cx;
  const dy = p.y - cy;
  const k = (dx / a) ** 2 + (dy / b) ** 2;
  if (k <= 1) return p;
  const scale = 1 / Math.sqrt(k);
  return { x: cx + dx * scale, y: cy + dy * scale };
}
