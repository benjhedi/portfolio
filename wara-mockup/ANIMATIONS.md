# Animations - maquette Hedi Benjahouach (Wara Studio)

La maquette HTML embarque des versions legeres (CSS + IntersectionObserver).
Ce document decrit la cible pour la transposition en code avec Motion et GSAP.
Esprit general : transitions douces, rien d'agressif, beaucoup de respiration.

Toutes les animations doivent se desactiver sous `prefers-reduced-motion: reduce`.

## 1. Apparition progressive au scroll

- Cible : titres de section, cartes, lignes de la liste, etapes, lignes de parcours.
- Geste : opacite 0 vers 1, translation verticale de 22px vers 0.
- Courbe : `cubic-bezier(0.16, 1, 0.3, 1)`, duree 0.7s.
- Sequencage : leger decalage entre elements voisins (0.08s par cran).
- Motion : `whileInView={{ opacity: 1, y: 0 }}` avec `viewport={{ once: true, amount: 0.2 }}` et `staggerChildren` sur les conteneurs.
- GSAP : `gsap.from('.reveal', { y: 22, opacity: 0, stagger: 0.08, ease: 'power3.out', scrollTrigger: { trigger, start: 'top 85%' } })`.

## 2. Timeline du processus, revelee etape par etape

- La ligne verticale (le rail) se remplit en bleu ciel a mesure du defilement.
- Chaque etape (marqueur rond + texte) apparait quand elle entre dans la vue.
- Le marqueur peut passer d'un contour fin a un fond plein au moment ou la ligne l'atteint.
- GSAP : un `ScrollTrigger` sur la section avec `scrub`, qui pilote la hauteur du remplissage (`scaleY` ou `height`) ; un `ScrollTrigger` par etape pour le `fade-up` et le passage du marqueur a l'etat actif.
- Reference visuelle : towerdoors.com.au, timeline d'etapes claire et lisible.

## 3. Parcours editorial, mouvement subtil

- Reference visuelle : egeon.webflow.io, presentation de parcours raffinee et aeree.
- Chaque ligne (annee a gauche, intitule a droite) apparait en `fade-up`.
- Parallaxe legere : l'annee, ou un grand element de fond, se decale de quelques pixels (10 a 24px) plus lentement que le reste au scroll.
- Motion : `useScroll` + `useTransform` pour mapper la progression sur un `y` discret.
- GSAP : `gsap.to('.ws-jyear', { yPercent: -8, ease: 'none', scrollTrigger: { scrub: true } })`.

## 4. Parallaxe legere sur les visuels

- Sur tout visuel ajoute plus tard (capture d'app, image), prevoir un deplacement vertical doux au scroll, amplitude faible.
- Toujours animer `transform`, jamais `top` ou `height`.

## 5. Micro-interactions

- Boutons sombres : translation de 1px vers le haut au survol, l'ombre interne signature reste visible.
- Bouton secondaire : la bordure passe au bleu ciel au survol.
- Liens : soulignement a 3px d'offset au survol.

## Notes de performance

- Animer uniquement `transform` et `opacity`.
- Isoler les composants animes (Motion ou GSAP) et nettoyer les `ScrollTrigger` au demontage.
- Ne pas melanger GSAP et Motion sur un meme element.
