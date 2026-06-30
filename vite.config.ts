import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  // React Three Fiber a besoin d'une seule copie de React (sinon "Invalid hook call")
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    // @warastudio/react importe react/react-dom : on le pre-bundle avec eux
    // pour qu'il partage la meme instance React (sinon "Invalid hook call").
    include: [
      "react",
      "react-dom",
      "three",
      "@react-three/fiber",
      "@react-three/drei",
      "@warastudio/react",
    ],
  },
});