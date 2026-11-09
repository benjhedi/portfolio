# v2 decision log

The first section is Hedi's log of 2026-11-07, verbatim in French as he
pasted it (accents already stripped in his original). Its links point to
the Cowork session of that day. The mockup lives in `mockup/`, frozen at
artifact version 1794063463-7380 as published on 2026-11-09, then at
1794266082-62e1 on 2026-11-10 (spec 005, `README.md`). The host numbered
the spec 005 publish "Version 6", so 1794063463-7380 is probably the
"version 5" the log cites (inferred, not verified).
Entries after it are in English, dated, and never deleted; a replaced
decision gets a line saying by which entry.

## Log of 2026-11-07, French, verbatim

<!-- verbatim:start -->
Refonte portfolio v2, direction et journal de decisions
Maquette HTML (reference visuelle) : https://claude.ai/artifact/BDrsQCHWzgfQRLqBGn9FJM (version 5, 7 nov. 2026)
Methode de travail (decision du 7 nov. 2026)
* Les sessions Cowork de ce projet servent a decider et a maquetter, pas a coder. Chaque decision est ajoutee a ce journal.
* Le developpement se fait ensuite dans Claude Code, a partir de ce journal, de la maquette et du CLAUDE.md du depot.
* Avant la premiere session de dev : installer wara-kit (version de reference ~/Documents/Developpement/wara-kit, kit 2.1) a la racine git du depot Portfolio avec install.sh, comme sur Chaland et Doable ; regle d'architecture du projet a produire via la methode du kit (presentation React, regle de dependances, modularite) ; les gates du kit verifient design system, maquette, rules et skills avant de coder.
References
* Structure et rythme : grilledpixels.com (nav fine, bloc nom/role en 2 colonnes + note mono, grande accroche sur 4 lignes alternant sans et mono, projets en blocs plein ecran empiles avec titre en marquee geant, tags mono, bouton "Voir le projet", sections numerotees 002/003..., barre fixe en bas "Demarrer un projet ou Voir les projets", preloader 0 %, marquee footer).
* Hero : vineshgayadin.com (ovale centre contenant une video en boucle, nom + role centres dessous, beaucoup de vide, nav minimale).
* Charte : tokens Wara (porcelaine, charcoal, sky, Hanken Grotesk 400/600, JetBrains Mono pour index et tags, variables --ws-*) utilises comme design system technique, sans aucune mention ni logo Wara Studio sur le site. Dark = Midnight via data-theme.
Decisions produit et design
* Identite : le site affiche "Hedi Jahouach" (sans "Ben"), monogramme texte "HJ" en nav et preloader. Aucune mention de Wara Studio (c'est un portfolio personnel).
* Charte conservee, on reprend seulement la structure de Grilled Pixels (pas le noir ni le rouge).
* Hero : ovale contenant la video du portrait anime (contre-jour, silhouette voilee, tete qui tourne de profil gauche a profil droit, vapeur soufflee de la bouche). Fichiers : hero.mp4 (H.264, 490 Ko) + hero.webm (VP9, 190 Ko) + hero-poster.jpg, boucle muette de 4,2 s raccordee par fondu, playsinline, autoplay ; poster statique sous prefers-reduced-motion.
* Sortie d'elements du souffle : a chaque boucle, au moment de l'expiration (t = 2,05 s), un element sort de la bouche, traverse le panache et grossit en suivant la vapeur (vers la droite, legerement vers le haut), puis se dissipe. Origine calee sur la bouche de profil droit : x 67 %, y 51 % de l'ovale (47 % sur mobile). Cinq elements en rotation : apps en telephone (RIDE, franceinfo, GearTrack), fenetre navigateur avec le site, fenetre macOS du produit (Compagnon de reunion). Ces elements restent en couche HTML au-dessus de la video, jamais dans la video, pour rester modifiables.
* Ovale : ratio 1.5/1 desktop, 1.25/1 mobile, video en object-fit cover, object-position 50 % 28 %.
* Perimetre : one-page, tout le contenu de content.ts conserve. Sections dans l'ordre : hero, statement (nom/role + accroche 4 lignes + chips de preuve), clients marquee, projets (6 blocs plein ecran + grille des 9 autres), 002 a propos, 003 offres, 004 processus, 005 parcours, 006 competences, 007 contact, footer marquee, barre fixe basse.
* Ouvert, a trancher : accroche et titres marquee en capitales (Grilled Pixels) ou sentence case (charte) ; fond de l'ovale = fond de la video (bleu gris, halo blanc) ou retinte en sky #41C0F2 ; raccord de boucle par fondu accepte ou clip regenere qui revient a sa pose de depart.
Prompts video
Voir claude/hero-video-prompts.md (Kling, Blender, tournage reel). Le clip retenu vient de Kling a partir du portrait fourni le 6 nov. 2026.
Code source
Repo local : /Users/wara/Documents/Developpement/Personnel/IA/Projects/Portfolio (v1.6.0, deps 3D retirees, CLAUDE.md en anglais). L'ancien chemin 04_Developpement/... est vide. Fichiers de la maquette dans la session Cowork : scratchpad/mock (index.html, tokens.css, img/ dont hero.mp4, hero.webm, hero-poster.jpg, site.jpg, captures webp).
<!-- verbatim:end -->

## Entries since 2026-11-07

- 2026-11-07: The site, its SEO and its metadata show "Jahouach" only,
  never "Benjahouach" (constitution principle 1).
- 2026-11-07: The hero and the section blocks are not reused by another
  site (Hedi, 2026-11-07; the roadmap Parked line names the hero).
- 2026-11-07: "Voir le projet" probably links to the App Store page, but
  `content.ts` holds no store URL, GearTrack is B2B and project details
  must stay on the site. Open, settled by the projects spec.
- 2026-11-07: Architecture option B (`docs/architecture-study.md`,
  `.claude/rules/10-architecture.md`), tests with Vitest (ADR 001).
- 2026-11-09: Every branch starts from `dev`, release branches included;
  `main` only receives a release once it is in production.
- 2026-11-09: For rule 60, a screen of the one-page mockup is a section;
  each gets one PNG in light and one in dark. Mobile captures are decided
  by the PNG follow-up.
- 2026-11-09: The PNG export and the per-screen README are a follow-up
  owned by design-agent, after spec 001.
- 2026-11-09: This log keeps the 2026-11-07 text in French, verbatim;
  later entries are written in English.
- 2026-11-09: The versioned SEO input (`seo-accueil.md`) says "Jahouach";
  the rest of its content waits for the SEO spec.
- 2026-11-09: The Kling source clip is versioned in `source/` with its
  audio track, so a regenerated loop starts from it, not from the cut.
- 2026-11-09: `claude/hero-video-prompts.md`, cited above, stays in Cowork
  and is not versioned; the source clip is enough.
- 2026-11-09: The reference videos go through Git LFS, scoped to `docs/`
  (spec 002, ADR 004), chosen over the plain-git recommendation.
- 2026-11-09: Mockup PNGs (spec 004): the preloader is its own screen,
  the fixed nav and bottom bar appear on the hero PNGs only; every screen
  at 1440 px 1x and 390 px 2x, light and dark; reduced motion for the hero
  only; the hero frozen with the RIDE app at its peak, marquees at their
  start; the PNGs go through Git LFS under `docs/`.
- 2026-11-09: Three mockup defects are fixed at the source, in a new
  artifact version frozen again before the PNG export (spec 005): the
  skills overflow, the "HJ" mark hidden on the mobile nav, and the hero
  scroll hint covered by the bottom bar at 1440 x 900, which supersedes
  the overlap accepted as D2 in spec 004.
- 2026-11-10: The hero oval is capped by the viewport height, so it
  shrinks on short desktop screens: 720 px wide at 1440 x 900, back to
  860 from about 995 px high (spec 005, D1).
- 2026-11-10: The mockup's mobile "HJ" link stays 30 x 30 px; the nav
  implementation gives it a 44 x 44 px hit area with the visual size
  unchanged (rule 31, constitution 11; spec 005 review).
