import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Locale, L } from "../content/content";

type Theme = "light" | "dark";

type Ctx = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (s: L) => string;
  theme: Theme;
  toggleTheme: () => void;
};

const AppCtx = createContext<Ctx | null>(null);

function initialLocale(): Locale {
  const stored = localStorage.getItem("locale");
  if (stored === "fr" || stored === "en") return stored;
  return "fr"; // charte : francais par defaut (audience cliente FR)
}

function initialTheme(): Theme {
  // l'etat suit la classe deja posee par le script anti-flash de index.html
  if (typeof document !== "undefined" && document.documentElement.classList.contains("dark")) {
    return "dark";
  }
  const stored = localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [theme, setTheme] = useState<Theme>(initialTheme);

  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem("locale", locale);
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    // barre d'adresse mobile accordee a la surface de fond
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme === "dark" ? "#151519" : "#f7f4ed");
  }, [theme]);

  const value: Ctx = {
    locale,
    setLocale: setLocaleState,
    t: (s: L) => s[locale],
    theme,
    toggleTheme: () => setTheme((p) => (p === "dark" ? "light" : "dark")),
  };

  return <AppCtx.Provider value={value}>{children}</AppCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp() {
  const ctx = useContext(AppCtx);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
