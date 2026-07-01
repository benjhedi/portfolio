import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Wara DS (SDK publie). theme/style.css = SOURCE UNIQUE des tokens : expose les
// variables --wara-* (:root = light, [data-theme="dark"] = Midnight) que le bloc
// @theme de index.css aliase (--color-* -> var(--wara-*)). react/style.css =
// styles des composants SDK, desormais consommes (Input + Button du formulaire
// de contact). Aucun des deux ne stylise body/html/*, pas de fuite Tailwind.
import "@warastudio/theme/style.css";
import "@warastudio/react/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
