# Captures d'app

Les captures deposees ici s'affichent dans le cadre iPhone de la vue detail.
Quand un projet a plusieurs captures, une galerie de vignettes apparait sous le
telephone (clic pour changer la capture affichee).

## Mapping actuel (defini dans app.js, champ `images`)

- **RIDE** (Decathlon) : `RIDE.png`
- **MYTF1** (TF1) : `MYTF1.png`, `tfoumax.png` (TFou Max, meme mission TF1)
- **franceinfo** (France Televisions) : `FranceInfos.png`, `FranceInfos1.png`,
  `FranceInfos2.png`, `FranceInfos3.png`
- **La Premiere** (France Televisions) : `La1ere.png`
- **GearTrack** (Decathlon) : aucune capture -> illustration stylisee
- **workoutLife** : aucune capture -> illustration stylisee

## Ajouter ou changer des captures

1. Depose le fichier image ici (PNG ou JPG, portrait, contenu d'ecran seul).
2. Ouvre `app.js`, trouve le projet concerne, et ajoute le chemin dans son
   tableau `images` (ex. `images: ["images/geartrack-1.png", "images/geartrack-2.png"]`).
3. Tant qu'un tableau est vide ou qu'un fichier est introuvable, le projet
   garde son illustration stylisee (repli automatique).

Les noms de fichiers sont sensibles a la casse en production (serveurs Linux,
Netlify, etc.) : garde une correspondance exacte entre le fichier et le chemin
dans `app.js`.

## Format

- Capture portrait, ratio proche d'un ecran iPhone (les tiennes sont en
  704 x 1520, parfait). Recadrage `cover` pour remplir le cadre.
- N'utilise que des captures que tu es autorise a publier.
