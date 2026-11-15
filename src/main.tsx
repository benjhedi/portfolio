import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
// @warastudio/theme/style.css is the single source of tokens: it defines the
// --ws-* variables (:root for light, [data-theme="dark"] for Midnight) that the
// @theme block of index.css aliases (--color-* reads var(--ws-*)).
// @warastudio/react/style.css styles the SDK components the contact form uses
// (Input, Button). Neither styles body, html or *, so nothing leaks into Tailwind.
import "@warastudio/theme/style.css";
import "@warastudio/react/style.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
