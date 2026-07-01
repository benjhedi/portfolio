/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Cle d'acces Web3Forms (formulaire de contact). Voir .env.example. */
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
