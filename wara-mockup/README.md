# Maquette portfolio - Hedi Benjahouach (design system Wara Studio)

Maquette desktop et mobile d'un site portfolio premium pour un consultant iOS
senior freelance. Direction visuelle aeree, design system Wara Studio (creme,
charbon, accent bleu ciel, Hanken Grotesk, Lucide). Bilingue FR / EN.

## Voir la maquette

Ouvrir `index.html` dans un navigateur, ou servir le dossier :

```bash
python3 -m http.server 4321 --directory .
# puis http://localhost:4321
```

## Ce que contient la maquette

- **Bilingue FR / EN** : bascule dans la barre de navigation, choix memorise
  (localStorage). Francais par defaut. Tout le contenu est traduit, y compris
  les vues detail.
- **7 sections** : hero, ce que je fais, processus (timeline), projets,
  parcours, competences, contact.
- **Projets cliquables** : un clic sur une carte ouvre une vue detail (modal)
  avec contexte, realisations, stack et une **illustration animee** de l'app
  (mockup iPhone stylise dans la charte, pas d'image generique).
- **Animations** (actives par defaut) :
  - apparition progressive des elements au scroll,
  - timeline du processus qui se remplit au defilement,
  - parallaxe sur les cartes projets (inclinaison au survol) et sur les
    illustrations d'app dans le modal,
  - micro-animations dans les illustrations (trace GPS, badge Direct, barre de
    lecture, etc.).
- **Responsive** : desktop et mobile coherents, menu mobile, modal qui s'empile.
- Respecte `prefers-reduced-motion` : toutes les animations se desactivent.

### Modes (parametres d'URL)

- `index.html` : experience complete. Animations actives, sauf si le visiteur a
  active "reduire les animations" (prefers-reduced-motion), respecte par defaut.
- `index.html?anim` : force la demo des animations meme sous reduced-motion.
- `index.html?static` : fige tout (contenu visible, sans animation). Utile pour
  des captures ou un rendu sans mouvement.

## Fichiers

- `index.html` : structure de la page.
- `colors_and_type.css` : tokens du design system Wara Studio (prefixe `--ws-`).
- `styles.css` : mise en page, composants, illustrations d'app, modal, parallaxe.
- `app.js` : contenu bilingue, rendu des projets et vues detail, animations.
- `ANIMATIONS.md` : description des animations pour transposition en Motion / GSAP.

## Design system respecte (charte Wara Studio V1.0)

Tokens alignes sur la charte graphique officielle (PDF) :

- Creme `#f7f4ed` (fond), charcoal `#1c1c1c` (texte), off-white `#fcfbf8`
  (texte sur charcoal). Tous les gris derivent du charcoal (83/40/4/3%).
- Sky `#5fa8d9`, sky deep `#2e6fa8`, sky soft `#c7e0f1`, sky ghost 10% en accent,
  jamais en fond.
- Hanken Grotesk, 400 partout, 600 titres, cremage resserre a grande taille.
- Rayons : boutons 6px, cartes 12px, conteneurs 16px (pas de pilules).
- Bords, pas ombres : bord passif 1px `#eceae4`. Ombre interne = detail
  signature des boutons sombres. Espacement base 8. Icones Lucide 1.5px.
- Voix : sentence case, tutoiement en francais, pas d'emoji.

## Inspirations

- Timeline du processus inspiree de towerdoors.com.au.
- Parcours editorial inspire de egeon.webflow.io.

## Ecriture

Aucun caractere typographique IA : pas de tiret long ou demi-cadratin, pas de
guillemets courbes, pas de fleches ni de puces decoratives. Apostrophes droites
et tirets simples uniquement.

## Captures d'app reelles

Pour remplacer les illustrations stylisees par tes vraies captures, depose tes
images dans le dossier `images/` avec les noms attendus (`ride.png`,
`mytf1.png`, etc.). Elles s'affichent automatiquement dans le cadre iPhone de la
vue detail. Tant qu'une image manque, le projet garde son illustration stylisee
(repli automatique). Voir `images/README.md` pour les noms et le format.

## A noter

- Les annees du parcours sont basees sur le CV, a confirmer.
- N'utilise que des captures que tu es autorise a publier (apps clientes
  possiblement sous accord de confidentialite).
