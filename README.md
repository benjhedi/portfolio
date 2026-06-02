# Portfolio, Hedi Benjahouach

Portfolio d'un consultant iOS senior freelance. Version finale fusionnée :
moteur d'animation React / Motion / GSAP + charte graphique Wara Studio +
contenu et captures d'app réelles. Bilingue FR / EN.

## Stack

Vite + React + TypeScript + Tailwind v4 + Motion + GSAP + lucide-react.
Police Hanken Grotesk (auto-hébergée). Charte Wara : crème, charcoal, sky blue.

## Démarrer

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # build statique dans dist/
npm run preview
```

## Structure

- `src/content/content.ts` : tout le contenu, bilingue `{ fr, en }` (source unique).
- `src/index.css` : tokens de la charte Wara (mappés en utilitaires Tailwind).
- `src/app/AppContext.tsx` : langue FR/EN.
- `src/components/` : Nav, Hero, Offers, Process (timeline), Work (sticky-stack),
  ProjectModal (détail), Parcours, Skills, Contact, Phone, Primitives.
- `public/projects/` : captures d'app réelles (RIDE, MYTF1, franceinfo, etc.).

## Animations

- **Hero 3D (Three.js / React Three Fiber)** : un iPhone d'où une app se détache
  et sort en volume, avec float, parallaxe au pointeur et ombre de contact.
  Chargé en lazy (chunk séparé ~247 KB gzip), uniquement si WebGL + animations
  actives. Repli statique sinon. Forcer la démo : `index.html?webgl`.
- Sticky-stack des projets au scroll (GSAP ScrollTrigger), cartes qui s'empilent.
- Parallaxe scroll sur les captures (Motion useScroll) et les années du parcours.
- Détail projet en transition fluide (élément partagé Motion `layoutId`).
- Timeline du processus qui se construit au scroll, marqueurs qui s'activent.
- Boutons magnétiques, apparitions au scroll.
- Tout respecte `prefers-reduced-motion` (repli statique propre).

Le marquee technos est en monochrome charcoal (pas de couleurs de marque), les
couleurs vives des captures restent contenues dans le cadre du téléphone :
palette harmonieuse crème / charcoal / sky, fidèle à la charte.

## Charte Wara Studio respectée

Crème `#f7f4ed`, charcoal `#1c1c1c`, off-white `#fcfbf8`, sky `#5fa8d9` /
`#2e6fa8` / `#c7e0f1`. Gris dérivés du charcoal. Rayons 6 / 12 / 16. Bord passif
`#eceae4`, ombre interne sur les boutons sombres. Hanken Grotesk 400 / 600.
Sentence case, tutoiement en français, icônes Lucide.

## Note

La maquette HTML/CSS d'origine reste dans `wara-mockup/` comme référence design.
Les captures d'app sont des éléments fournis par Hedi ; n'utiliser que celles
qu'il est autorisé à publier.
