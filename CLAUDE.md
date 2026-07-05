# CLAUDE.md - Portfolio Hedi Benjahouach

Lu automatiquement par Claude Code a l'ouverture d'une session dans ce depot. Ajoute le 5 juillet 2026.

## Mode de travail - a lire d'abord

Pour tout changement non trivial: decrire ce qui va etre modifie et pourquoi, montrer le plan, puis attendre le feu vert. Lire, repondre et proposer des approches ne demande pas d'accord.

## Contexte

Portfolio d'un consultant iOS senior freelance. Moteur d'animation React couple a la charte Wara Studio et a du contenu d'app reel. Bilingue FR / EN. Deploye sur Cloudflare.

Lire avant de produire du contenu ou de toucher au design:

1. `README.md` - stack, structure, animations
2. `SEO-accueil.md` - intentions de contenu et SEO
3. `src/content/content.ts` - tout le contenu bilingue, source unique

## Stack

- Vite + React + TypeScript strict + Tailwind v4.
- Motion et GSAP (ScrollTrigger) pour les animations. Three.js via React Three Fiber pour le hero 3D, charge en lazy (chunk separe), avec repli statique si pas de WebGL ou animations desactivees.
- Design system consomme en SDK: `@warastudio/react` et `@warastudio/theme`.
- Deploiement Cloudflare via `wrangler`.

```bash
npm run dev       # http://localhost:5173
npm run build     # build statique dans dist/
npm run deploy    # build puis wrangler deploy
```

## Design system

La source des tokens est `@warastudio/theme` et la skill `wara-studio-design`. Lever les variables, ne jamais coder une couleur ou un espacement en dur. Pour toute question de marque (palette, typo, composants), se referer a la skill `wara-studio-design`, qui fait foi. Ne pas reintroduire d'anciennes valeurs de charte trouvees dans du contenu ou des captures.

Typo Hanken Grotesk (auto-hebergee). Icones Lucide.

## Contenu et ton

- Tout le contenu vit dans `src/content/content.ts`, en `{ fr, en }`. Ne pas coder de texte en dur dans les composants.
- Ton sobre et direct, pas de survente. Le site parle d'un vrai parcours et de vraies apps.
- Style humain partout, dans le contenu comme dans les commentaires. Appliquer la skill humanizer. Interdits: tirets longs, guillemets courbes, emoji, puces decoratives, formules creuses.

## Conventions de code

- TypeScript strict, pas de `any` implicite.
- Composants a responsabilite unique, un fichier par composant.
- Accessibilite serieuse: contraste, navigation clavier, focus visibles, aria correct, cibles tactiles suffisantes, `prefers-reduced-motion` respecte partout.
- Performance: 3D et GSAP en chunks separes, images optimisees, pas de dependance lourde inutile.
- Responsive mobile first.

## Git

Commits atomiques, un changement logique par commit, message a l'imperatif. Ne pas commiter `dist/` ni les artefacts `wrangler`.

## En cas de doute

Poser une ou deux questions avant de coder une solution structurante, plutot que de produire directement.
