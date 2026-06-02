import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale, L } from "../content/content";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (s: L) => string;
};

const AppCtx = createContext<Ctx | null>(null);

function initialLocale(): Locale {
  const stored = localStorage.getItem("locale");
  if (stored === "fr" || stored === "en") return stored;
  return "fr"; // charte : francais par defaut (audience cliente FR)
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale]);

  const value: Ctx = {
    locale,
    setLocale: setLocaleState,
    t: (s: L) => s[locale],
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
