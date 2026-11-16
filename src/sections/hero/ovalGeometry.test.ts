import { describe, expect, it } from "vitest";
import { clampToOval, TOGGLE_INSET_PX } from "./ovalGeometry";

type Box = { width: number; height: number };
type Point = { x: number; y: number };

/** Oval boxes of AC-2: 1.5/1 at 1440 x 900, 92vw at 1.25/1 at 390. */
function fixture(viewport: 1440 | 390): Box {
  return viewport === 1440 ? { width: 720, height: 480 } : { width: 358.8, height: 287.04 };
}

/** 1 on the inset ellipse, under 1 inside, over 1 outside. */
function ellipseK(p: Point, box: Box, inset: number): number {
  const a = box.width / 2 - inset;
  const b = box.height / 2 - inset;
  return ((p.x - box.width / 2) / a) ** 2 + ((p.y - box.height / 2) / b) ** 2;
}

function expectPoint(actual: Point, expected: Point): void {
  expect(actual.x).toBeCloseTo(expected.x, 9);
  expect(actual.y).toBeCloseTo(expected.y, 9);
}

describe("ovalGeometry", () => {
  it("clampsToggleInsideInsetEllipse", () => {
    const box = fixture(1440);

    const inside = { x: 500, y: 300 };
    expect(clampToOval(inside, box, TOGGLE_INSET_PX)).toEqual(inside);

    const clamped = clampToOval({ x: 700, y: 60 }, box, TOGGLE_INSET_PX);
    expect(ellipseK(clamped, box, TOGGLE_INSET_PX)).toBeCloseTo(1, 9);
  });

  it("keepsCenterUnchanged", () => {
    const box = fixture(1440);

    expect(clampToOval({ x: 360, y: 240 }, box, TOGGLE_INSET_PX)).toEqual({ x: 360, y: 240 });
  });

  it("landsExtremeEdgesTwentySixPixelsInside", () => {
    const box = fixture(1440);

    expectPoint(clampToOval({ x: 720, y: 240 }, box, TOGGLE_INSET_PX), { x: 694, y: 240 });
    expectPoint(clampToOval({ x: 0, y: 240 }, box, TOGGLE_INSET_PX), { x: 26, y: 240 });
    expectPoint(clampToOval({ x: 360, y: 0 }, box, TOGGLE_INSET_PX), { x: 360, y: 26 });
    expectPoint(clampToOval({ x: 360, y: 480 }, box, TOGGLE_INSET_PX), { x: 360, y: 454 });
  });

  it("landsCornerOnInsetEllipse", () => {
    const box = fixture(1440);

    const clamped = clampToOval({ x: 0, y: 0 }, box, TOGGLE_INSET_PX);

    expect(ellipseK(clamped, box, TOGGLE_INSET_PX)).toBeCloseTo(1, 9);
    // Moved along the line to the center: the corner's direction is kept.
    expect((360 - clamped.x) / (240 - clamped.y)).toBeCloseTo(360 / 240, 9);
  });

  it("clampsOnBothOvalSizes", () => {
    for (const viewport of [1440, 390] as const) {
      const box = fixture(viewport);
      const cx = box.width / 2;
      const cy = box.height / 2;

      expect(clampToOval({ x: cx + 10, y: cy - 10 }, box, TOGGLE_INSET_PX), `${viewport} inside`).toEqual({
        x: cx + 10,
        y: cy - 10,
      });
      expectPoint(clampToOval({ x: box.width, y: cy }, box, TOGGLE_INSET_PX), { x: box.width - 26, y: cy });
      expectPoint(clampToOval({ x: cx, y: box.height }, box, TOGGLE_INSET_PX), { x: cx, y: box.height - 26 });

      const corner = clampToOval({ x: box.width, y: 0 }, box, TOGGLE_INSET_PX);
      expect(ellipseK(corner, box, TOGGLE_INSET_PX), `${viewport} corner`).toBeCloseTo(1, 9);
    }
  });

  it("returnsCenterWhenBoxSmallerThanTwiceInset", () => {
    expect(clampToOval({ x: 0, y: 0 }, { width: 40, height: 40 }, TOGGLE_INSET_PX)).toEqual({ x: 20, y: 20 });
    // Exactly twice the inset leaves a zero-width ellipse, so only the center.
    expect(clampToOval({ x: 0, y: 10 }, { width: 52, height: 300 }, TOGGLE_INSET_PX)).toEqual({ x: 26, y: 150 });
  });
});
