import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { AppProvider } from "./app/AppContext";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Offers } from "./components/Offers";
import { Process } from "./components/Process";
import { Work } from "./components/Work";
import { Parcours } from "./components/Parcours";
import { Skills } from "./components/Skills";
import { Contact } from "./components/Contact";
import { ProjectModal } from "./components/ProjectModal";
import { projects } from "./content/content";

export default function App() {
  const [openId, setOpenId] = useState<string | null>(null);
  const project = projects.find((p) => p.id === openId) || null;

  return (
    <AppProvider>
      <Nav />
      <main>
        <Hero />
        <About />
        <Offers />
        <Process />
        <Work onOpen={setOpenId} />
        <Parcours />
        <Skills />
        <Contact />
      </main>
      <AnimatePresence>
        {project && (
          <ProjectModal
            key={project.id}
            project={project}
            onClose={() => setOpenId(null)}
          />
        )}
      </AnimatePresence>
    </AppProvider>
  );
}
