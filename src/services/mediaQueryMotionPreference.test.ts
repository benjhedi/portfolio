import { describe, expect, it } from "vitest";
import { createMediaQueryMotionPreference } from "./mediaQueryMotionPreference";

/** A MediaQueryList double: scripted `matches`, recorded listeners, `emit` for a live change. */
class MediaQueryDouble {
  listeners: Array<() => void> = [];
  removed: Array<() => void> = [];
  constructor(public matches: boolean) {}
  addEventListener(type: string, listener: () => void): void {
    if (type === "change") this.listeners.push(listener);
  }
  removeEventListener(type: string, listener: () => void): void {
    if (type !== "change") return;
    this.removed.push(listener);
    this.listeners = this.listeners.filter((l) => l !== listener);
  }
  emit(matches: boolean): void {
    this.matches = matches;
    for (const listener of [...this.listeners]) listener();
  }
}

/** A window double exposing only `matchMedia` and `location.search`, with recorded calls. */
function fixture({ reduced = false, search = "" }: { reduced?: boolean; search?: string } = {}) {
  const query = new MediaQueryDouble(reduced);
  const queries: string[] = [];
  let searchReads = 0;
  const win = {
    matchMedia: (q: string) => {
      queries.push(q);
      return query;
    },
    location: {
      get search() {
        searchReads += 1;
        return search;
      },
    },
  } as unknown as Pick<Window, "matchMedia" | "location">;
  return { win, query, queries, searchReads: () => searchReads };
}

describe("mediaQueryMotionPreference", () => {
  // Plan row, AC-7

  it("allowsMotionWhenUrlCarriesMotion", () => {
    const { win, query } = fixture({ reduced: true, search: "?motion" });

    const preference = createMediaQueryMotionPreference(win);

    expect(preference.reduced()).toBe(false);
    query.emit(true);
    expect(preference.reduced()).toBe(false);
  });

  // Plan row, AC-18

  it("notifiesWhenReducedPreferenceChanges", () => {
    const { win, query } = fixture({ reduced: false });
    const preference = createMediaQueryMotionPreference(win);
    let calls = 0;
    preference.subscribe(() => {
      calls += 1;
    });

    query.emit(true);
    expect(calls).toBe(1);
    expect(preference.reduced()).toBe(true);

    query.emit(false);
    expect(calls).toBe(2);
    expect(preference.reduced()).toBe(false);
  });

  // Beyond the plan rows, requested with T10

  it("reportsReducedFromMediaQueryWithoutMotionParam", () => {
    expect(createMediaQueryMotionPreference(fixture({ reduced: true }).win).reduced()).toBe(true);
    expect(createMediaQueryMotionPreference(fixture({ reduced: false }).win).reduced()).toBe(false);
  });

  it("allowsMotionWhenMotionParamSitsAmongOthers", () => {
    for (const search of ["?lang=en&motion", "?motion=1&lang=en", "?a=1&motion&b=2"]) {
      const { win } = fixture({ reduced: true, search });
      expect(createMediaQueryMotionPreference(win).reduced(), search).toBe(false);
    }
    // Only a parameter named motion forces it, not a name that contains it.
    const { win } = fixture({ reduced: true, search: "?motionless=1" });
    expect(createMediaQueryMotionPreference(win).reduced()).toBe(true);
  });

  it("stopsNotifyingAfterUnsubscribe", () => {
    const { win, query } = fixture();
    const preference = createMediaQueryMotionPreference(win);
    let calls = 0;
    const onChange = () => {
      calls += 1;
    };

    const unsubscribe = preference.subscribe(onChange);
    unsubscribe();
    query.emit(true);

    expect(query.removed).toEqual([onChange]);
    expect(query.listeners).toEqual([]);
    expect(calls).toBe(0);
  });

  it("readsMediaQueryAndUrlOnce", () => {
    const { win, queries, searchReads } = fixture({ search: "?motion" });

    const preference = createMediaQueryMotionPreference(win);
    preference.reduced();
    preference.reduced();
    preference.subscribe(() => {})();

    expect(queries).toEqual(["(prefers-reduced-motion: reduce)"]);
    expect(searchReads()).toBe(1);
  });
});
