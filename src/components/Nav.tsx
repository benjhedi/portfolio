import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { List, X, Sun, Moon } from "lucide-react";
import { useApp } from "../app/AppContext";
import { identity, nav } from "../content/content";

export function Nav() {
  const { t, locale, setLocale, theme, toggleTheme } = useApp();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 12));

  return (
    <motion.header
      initial={{ y: -72 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-colors duration-300 ${
          scrolled ? "border-b border-line bg-cream/85 backdrop-blur-md" : ""
        }`}
      >
        <nav className="mx-auto flex h-[72px] max-w-[1240px] items-center justify-between gap-5 px-5 sm:px-8">
          <a href="#top" className="flex items-center gap-3 font-semibold text-ink">
            <span className="grid size-[34px] place-items-center rounded-[8px] border border-line2 text-[13px]">
              {identity.initials}
            </span>
            {identity.name}
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[15px] text-body transition-colors hover:text-ink"
              >
                {t(item.label)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={toggleTheme}
              className="grid size-9 place-items-center rounded-[8px] border border-line2 text-ink transition-colors hover:border-sky hover:text-skyink"
              aria-label={t({ fr: "Changer de thème", en: "Toggle theme" })}
              title={t({ fr: "Changer de thème", en: "Toggle theme" })}
            >
              {theme === "dark" ? <Sun size={16} strokeWidth={1.5} /> : <Moon size={16} strokeWidth={1.5} />}
            </button>

            <div className="flex items-center overflow-hidden rounded-[8px] border border-line2 text-[13px] font-semibold">
              {(["fr", "en"] as const).map((l) => (
                <button
                  key={l}
                  onClick={() => setLocale(l)}
                  className={`px-[11px] py-[6px] transition-colors ${
                    locale === l ? "bg-char text-off" : "text-muted hover:text-body"
                  }`}
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>

            <a
              href="#contact"
              className="hidden rounded-btn border border-line2 px-[18px] py-[11px] text-[15px] font-semibold text-ink transition-colors hover:border-sky hover:text-skyink sm:inline-flex"
            >
              {t({ fr: "Me contacter", en: "Get in touch" })}
            </a>

            <button
              onClick={() => setOpen((p) => !p)}
              className="grid size-9 place-items-center rounded-[8px] border border-line2 text-ink md:hidden"
              aria-label="Menu"
            >
              {open ? <X size={16} /> : <List size={16} />}
            </button>
          </div>
        </nav>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-b border-line bg-cream/95 backdrop-blur-md md:hidden"
        >
          <div className="flex flex-col px-5 py-3">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setOpen(false)}
                className="border-t border-line py-3 text-[17px] text-ink first:border-t-0"
              >
                {t(item.label)}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
