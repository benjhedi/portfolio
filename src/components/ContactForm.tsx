import { useState, type FormEvent } from "react";
import { Button, Input } from "@warastudio/react";
import { Send, CheckCircle2 } from "lucide-react";
import { useApp } from "../app/AppContext";
import { contact, identity } from "../content/content";

type Status = "idle" | "sending" | "ok" | "error";

const ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

/*
  Formulaire de contact — composants du SDK Wara DS (Input x2 + Button "glow").
  Le champ Message est un <textarea> calque sur le style Input (le SDK n'expose
  pas de Textarea) : memes tokens, donc rendu coherent. Envoi via Web3Forms
  (pas de backend) ; la cle vit dans VITE_WEB3FORMS_ACCESS_KEY (cf .env.example).
*/
export function ContactForm() {
  const { t } = useApp();
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot : un bot remplit ce champ cache, on abandonne en silence.
    if (data.get("botcheck")) return;

    if (!ACCESS_KEY) {
      console.warn(
        "VITE_WEB3FORMS_ACCESS_KEY manquant : configure la cle Web3Forms (voir .env.example)."
      );
      setStatus("error");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `Portfolio — message de ${data.get("name") || "?"}`,
          from_name: "Portfolio Hedi Benjahouach",
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
        }),
      });
      const json = (await res.json()) as { success?: boolean };
      if (json.success) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <p
        role="status"
        className="inline-flex items-center gap-2.5 rounded-card border border-line bg-raise px-6 py-5 text-[1.05rem] font-medium"
        style={{ color: "var(--wara-color-successText)" }}
      >
        <CheckCircle2 size={20} strokeWidth={1.75} />
        {t(contact.form.success)}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-4 text-left">
      {/* Honeypot anti-spam — masque, hors tabulation, ignore des lecteurs d'ecran. */}
      <input
        type="checkbox"
        name="botcheck"
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label={t(contact.form.name)}
          name="name"
          required
          autoComplete="name"
          placeholder={t(contact.form.namePlaceholder)}
        />
        <Input
          label={t(contact.form.email)}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder={t(contact.form.emailPlaceholder)}
        />
      </div>

      {/* Textarea calque sur Input (pas de Textarea SDK) — memes tokens. */}
      <div>
        <label htmlFor="cf-message" className="mb-2 block text-sm text-ink">
          {t(contact.form.message)}
        </label>
        <textarea
          id="cf-message"
          name="message"
          required
          rows={4}
          placeholder={t(contact.form.messagePlaceholder)}
          className="w-full rounded-btn border border-line bg-raise px-3 py-2.5 text-base text-ink outline-none transition-colors placeholder:text-muted focus:border-skyink focus:ring-2 focus:ring-sky/40"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="glow" loading={status === "sending"}>
          <Send size={17} strokeWidth={1.5} />
          {status === "sending" ? t(contact.form.sending) : t(contact.form.submit)}
        </Button>

        <span className="text-[0.95rem] text-muted">
          {t(contact.form.or)}{" "}
          <a
            href={`mailto:${identity.email}`}
            className="font-medium text-skyink underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2"
          >
            {identity.email}
          </a>
        </span>
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm" style={{ color: "var(--wara-color-dangerText)" }}>
          {t(contact.form.error)}
        </p>
      )}
    </form>
  );
}
