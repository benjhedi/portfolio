import { useApp } from "../app/AppContext";
import { contact, identity } from "../content/content";
import { Reveal, SectionEyebrow, Accent } from "./Primitives";
import { ContactForm } from "./ContactForm";

export function Contact() {
  const { t } = useApp();
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-sink px-5 pt-24 pb-10 sm:px-8 md:pt-32">
      <div className="mx-auto flex max-w-[1240px] flex-col items-center gap-6 text-center">
        <Reveal>
          <SectionEyebrow index="07">{t(contact.eyebrow)}</SectionEyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="ws-display-editorial max-w-[18ch] text-[clamp(2.5rem,7vw,5rem)]">
            <Accent
              text={t(contact.heading)}
              accent={t(contact.accent)}
              accentClassName="ws-grad-text"
            />
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="max-w-[48ch] text-[1.15rem] text-body">{t(contact.body)}</p>
        </Reveal>
        <Reveal delay={0.14} className="mt-4 w-full max-w-[560px]">
          <ContactForm />
        </Reveal>
        <Reveal delay={0.2}>
          <a
            href={identity.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-skyink"
          >
            <svg className="size-[18px]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.03 0 4.78 2.5 4.78 5.75V21h-4v-5.3c0-1.26-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21H9z" />
            </svg>
            LinkedIn
          </a>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 flex max-w-[1240px] flex-col gap-3 border-t border-line pt-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <span>
          © {year} {identity.name}
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-sky" aria-hidden />
          {t(identity.availability)}
        </span>
        <span>{identity.links.location}</span>
      </div>
    </footer>
  );
}
