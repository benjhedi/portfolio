import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// Wara DS (SDK publie) — tokens + theme puis CSS des composants.
// theme/style.css ne definit que des variables (:root + [data-theme=dark]),
// aucun style sur body/html/*, donc cohabite sans fuite avec Tailwind.
import "@warastudio/theme/style.css";
import "@warastudio/react/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
