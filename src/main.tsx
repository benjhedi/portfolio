import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Wara DS (SDK publie) — SOURCE UNIQUE des tokens. theme/style.css expose les
// variables --wara-* (:root = light, [data-theme="dark"] = Midnight) que le
// bloc @theme de index.css aliase (--color-* -> var(--wara-*)). Aucun style
// sur body/html/*, donc aucune fuite avec Tailwind. react/style.css reste
// volontairement NON importe tant qu'aucun composant SDK n'est rendu.
import "@warastudio/theme/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
