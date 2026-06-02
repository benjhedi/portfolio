/* =====================================================================
   Maquette Hedi Benjahouach - logique
   - Bilingue FR / EN (bascule + memoire localStorage)
   - Rendu des projets et des vues detail (illustrations d'app animees)
   - Parallaxe sur les cartes projets et sur les illustrations
   - Apparition au scroll, timeline du processus qui se remplit
   - Ecriture stricte : apostrophes droites, tirets simples, aucun
     caractere typographique IA.
   ===================================================================== */

/* ------------------------------------------------------------------ */
/* 1. Dictionnaire des textes statiques                                */
/* ------------------------------------------------------------------ */
const I18N = {
  "nav.offres": { fr: "Ce que je fais", en: "What I do" },
  "nav.processus": { fr: "Processus", en: "Process" },
  "nav.projets": { fr: "Projets", en: "Work" },
  "nav.parcours": { fr: "Parcours", en: "Career" },
  "nav.competences": { fr: "Compétences", en: "Skills" },
  "nav.contact": { fr: "Me contacter", en: "Get in touch" },

  "hero.eyebrow": {
    fr: "Consultant iOS senior - Freelance",
    en: "Senior iOS consultant - Freelance",
  },
  "hero.title": {
    fr: `Je conçois et développe tes applications iOS, de l'idée à la <span class="accent">production</span>.`,
    en: `I design and build your iOS apps, from idea to <span class="accent">production</span>.`,
  },
  "hero.sub": {
    fr: "14 ans d'expérience. Je prends en charge ton app du cadrage jusqu'à la mise en production, ou je la développe à partir de tes maquettes.",
    en: "14 years of experience. I take your app from scoping all the way to release, or build it from your existing designs.",
  },
  "hero.cta1": { fr: "Démarrer un projet", en: "Start a project" },
  "hero.cta2": { fr: "Voir les projets", en: "View the work" },
  "hero.m1t": { fr: "iOS et macOS", en: "iOS and macOS" },
  "hero.m1d": { fr: "Swift, SwiftUI, UIKit", en: "Swift, SwiftUI, UIKit" },
  "hero.m2t": { fr: "De l'idée à l'App Store", en: "From idea to the App Store" },
  "hero.m2d": { fr: "Cadrage, dev, mise en ligne", en: "Scoping, dev, release" },
  "hero.m3t": { fr: "Disponible", en: "Available" },
  "hero.m3d": { fr: "Pour de nouvelles missions", en: "For new engagements" },

  "offres.eyebrow": { fr: "Ce que je fais", en: "What I do" },
  "offres.title": {
    fr: "Deux façons de travailler ensemble",
    en: "Two ways to work together",
  },
  "offre1.title": {
    fr: "Construire ton app de A à Z",
    en: "Build your app from A to Z",
  },
  "offre1.body": {
    fr: "De l'idée à la production. Cadrage du besoin, conception de l'architecture, développement, tests, publication sur l'App Store et suivi après la mise en ligne.",
    en: "From idea to production. Scoping, architecture design, development, testing, App Store release and post-launch support.",
  },
  "offre1.meta": {
    fr: "Idéal pour lancer un nouveau produit",
    en: "Ideal to launch a new product",
  },
  "offre2.title": {
    fr: "Développer à partir de tes maquettes",
    en: "Build from your designs",
  },
  "offre2.body": {
    fr: "Tu as les écrans, je livre l'application. Intégration fidèle au design, code propre et maintenable, attention portée à la performance et aux détails.",
    en: "You have the screens, I deliver the app. Faithful integration, clean and maintainable code, attention to performance and detail.",
  },
  "offre2.meta": {
    fr: "Idéal quand le design est déjà prêt",
    en: "Ideal when the design is ready",
  },

  "processus.eyebrow": { fr: "Mon processus", en: "My process" },
  "processus.title": {
    fr: "De l'idée à la mise en production",
    en: "From idea to production",
  },
  "processus.lead": {
    fr: "Une méthode claire, éprouvée sur des applications à forte exigence. Chaque étape prépare la suivante.",
    en: "A clear method, proven on demanding applications. Each step sets up the next.",
  },

  "projets.eyebrow": { fr: "Projets sélectionnés", en: "Selected work" },
  "projets.title": {
    fr: "Quelques applications livrées",
    en: "A few apps I have shipped",
  },
  "projets.lead": {
    fr: "Un aperçu parmi de nombreuses missions. Clique sur un projet pour voir le détail.",
    en: "A glimpse among many engagements. Click a project to see the details.",
  },
  "projets.detail": { fr: "Voir le détail", en: "View details" },
  "projets.more": { fr: "Et d'autres encore", en: "And more" },

  "modal.role": { fr: "Rôle", en: "Role" },
  "modal.period": { fr: "Période", en: "Period" },
  "modal.context": { fr: "Contexte", en: "Context" },
  "modal.did": { fr: "Ce que j'ai fait", en: "What I did" },
  "modal.stack": { fr: "Stack", en: "Stack" },
  "modal.close": { fr: "Fermer", en: "Close" },
  "modal.illu": {
    fr: "Illustration de l'app, à titre indicatif",
    en: "Illustrative app visual",
  },

  "parcours.eyebrow": { fr: "Mon parcours", en: "Career" },
  "parcours.title": {
    fr: "14 ans auprès de grands acteurs",
    en: "14 years with major players",
  },

  "competences.eyebrow": { fr: "Compétences et stack", en: "Skills and stack" },
  "competences.title": {
    fr: "Une stack iOS moderne et maîtrisée",
    en: "A modern, mastered iOS stack",
  },
  "skill1.title": {
    fr: "Langages et frameworks",
    en: "Languages and frameworks",
  },
  "skill2.title": { fr: "Architectures", en: "Architecture" },
  "skill3.title": { fr: "Qualité et delivery", en: "Quality and delivery" },
  "skill.tests": { fr: "Tests automatisés", en: "Automated tests" },
  "skill.ci": { fr: "Intégration continue", en: "Continuous integration" },
  "skill.review": { fr: "Revue de code", en: "Code review" },
  "skill.appstore": { fr: "Publication App Store", en: "App Store release" },

  "contact.eyebrow": { fr: "Contact", en: "Contact" },
  "contact.title": {
    fr: "Parlons de votre projet",
    en: "Let's talk about your project",
  },
  "contact.body": {
    fr: "Une idée à concrétiser ou des maquettes à développer ? Écris-moi, je reviens vers toi rapidement.",
    en: "An idea to bring to life or designs to build? Drop me a line, I will get back to you quickly.",
  },
  "contact.cta": { fr: "Écrire un message", en: "Write a message" },
  "footer.role": {
    fr: "Consultant iOS freelance",
    en: "Freelance iOS consultant",
  },
};

/* Etapes du processus */
const STEPS = [
  {
    icon: "compass",
    n: { fr: "Étape 01", en: "Step 01" },
    t: { fr: "Cadrage", en: "Scoping" },
    d: {
      fr: "On clarifie le besoin, le périmètre et les contraintes avant d'écrire la moindre ligne de code.",
      en: "We clarify the need, scope and constraints before writing a single line of code.",
    },
  },
  {
    icon: "pencil-ruler",
    n: { fr: "Étape 02", en: "Step 02" },
    t: { fr: "Conception", en: "Design" },
    d: {
      fr: "Architecture, choix techniques et découpage en modules. Des fondations pensées pour durer.",
      en: "Architecture, technical choices and modular breakdown. Foundations built to last.",
    },
  },
  {
    icon: "code-xml",
    n: { fr: "Étape 03", en: "Step 03" },
    t: { fr: "Développement", en: "Development" },
    d: {
      fr: "Implémentation en Swift et SwiftUI, par itérations courtes et lisibles, au plus près du produit.",
      en: "Implementation in Swift and SwiftUI, in short, readable iterations, close to the product.",
    },
  },
  {
    icon: "flask-conical",
    n: { fr: "Étape 04", en: "Step 04" },
    t: { fr: "Tests", en: "Testing" },
    d: {
      fr: "Tests automatisés et relecture du code. On sécurise la qualité avant de livrer.",
      en: "Automated tests and code review. We secure quality before shipping.",
    },
  },
  {
    icon: "rocket",
    n: { fr: "Étape 05", en: "Step 05" },
    t: { fr: "Mise en production", en: "Release" },
    d: {
      fr: "Publication sur l'App Store, configuration et déploiement maîtrisés de bout en bout.",
      en: "App Store release, configuration and deployment controlled end to end.",
    },
  },
  {
    icon: "life-buoy",
    n: { fr: "Étape 06", en: "Step 06" },
    t: { fr: "Suivi", en: "Support" },
    d: {
      fr: "Corrections, évolutions et accompagnement une fois l'application entre les mains des utilisateurs.",
      en: "Fixes, improvements and support once the app is in users' hands.",
    },
  },
];

/* Projets en vedette */
const PROJECTS = [
  {
    id: "geartrack",
    name: "GearTrack",
    highlight: {
      fr: "Une plateforme générique livrée de zéro, pensée pour être réutilisée sur d'autres métiers.",
      en: "A generic platform delivered from scratch, designed to be reused across other domains.",
    },
    client: "Décathlon",
    type: "gear",
    images: [],
    year: "2024 - 2026",
    role: {
      fr: "Consultant iOS senior, seul développeur iOS",
      en: "Senior iOS consultant, sole iOS developer",
    },
    points: {
      fr: [
        "Application B2B de gestion de flotte d'équipements, conçue de zéro en SwiftUI.",
        "Architecture modulaire (SPM, MVVM) réutilisable sur d'autres métiers.",
        "Communication Bluetooth (BLE) et intégration continue complète.",
      ],
      en: [
        "B2B equipment fleet management app, built from scratch in SwiftUI.",
        "Modular architecture (SPM, MVVM) reusable across other domains.",
        "Bluetooth (BLE) communication and full continuous integration.",
      ],
    },
    context: {
      fr: "Plateforme générique de gestion de flotte d'équipements, pensée pour plusieurs métiers. Premier déploiement sur le matériel de plongée pour les centres professionnels.",
      en: "Generic equipment fleet platform designed for several domains. First rollout on diving gear for professional centers.",
    },
    stack: ["Swift", "SwiftUI", "Combine", "async/await", "BLE", "SPM", "Bitrise"],
  },
  {
    id: "ride",
    name: "RIDE",
    highlight: {
      fr: "Navigation, suivi d'activité et abonnement premium réunis dans une app grand public exigeante.",
      en: "Navigation, activity tracking and a premium subscription in one demanding consumer app.",
    },
    client: "Décathlon",
    type: "ride",
    images: ["images/RIDE.png"],
    year: "2023 - 2024",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    points: {
      fr: [
        "Application grand public de cyclisme, suivi d'activité et navigation GPS.",
        "Mise en place de l'abonnement premium (StoreKit, RevenueCat).",
        "Cartographie via Mapbox et optimisation de la batterie sur les longues sorties.",
      ],
      en: [
        "Consumer cycling app, activity tracking and GPS navigation.",
        "Premium subscription set up (StoreKit, RevenueCat).",
        "Mapbox mapping and battery optimization on long rides.",
      ],
    },
    context: {
      fr: "Application de tracking et de navigation pour cyclistes, intégrant les vélos connectés. Forte exigence de performance et d'autonomie sur le terrain.",
      en: "Tracking and navigation app for cyclists, integrating connected bikes. Strong demands on performance and battery life in the field.",
    },
    stack: ["Swift", "UIKit", "RxSwift", "MVVM-C", "StoreKit", "RevenueCat", "Mapbox"],
  },
  {
    id: "mytf1",
    name: "MYTF1",
    highlight: {
      fr: "Refonte complète et SDK lecteur vidéo déployé sur tout l'écosystème TF1.",
      en: "A full rebuild and an in-house video player SDK deployed across the whole TF1 ecosystem.",
    },
    client: "TF1",
    type: "mytf1",
    images: ["images/MYTF1.png", "images/tfoumax.png"],
    year: "2016 - 2020",
    role: { fr: "Lead iOS", en: "iOS lead" },
    points: {
      fr: [
        "Refonte complète de l'application en Swift, architecture MVI et navigation modulaire.",
        "Conception du SDK lecteur vidéo interne (AVFoundation, HLS, FairPlay, AirPlay).",
        "Migration de l'API REST vers GraphQL côté iOS.",
      ],
      en: [
        "Full app rebuild in Swift, MVI architecture and modular navigation.",
        "Design of the in-house video player SDK (AVFoundation, HLS, FairPlay, AirPlay).",
        "REST to GraphQL API migration on iOS.",
      ],
    },
    context: {
      fr: "Plateforme de streaming du groupe TF1. Mission longue durée sur trois projets, dont le SDK lecteur vidéo déployé sur tout l'écosystème.",
      en: "TF1 group streaming platform. Long-term mission across three projects, including the video player SDK deployed across the whole ecosystem.",
    },
    stack: ["Swift", "AVFoundation", "HLS", "FairPlay", "RxSwift", "MVI", "GraphQL"],
  },
  {
    id: "franceinfo",
    name: "franceinfo",
    highlight: {
      fr: "Le premier passage à SwiftUI du groupe, posé comme standard pour les autres apps.",
      en: "The group's first move to SwiftUI, set as the standard for the other apps.",
    },
    client: "France Télévisions",
    type: "news",
    images: [
      "images/FranceInfos.png",
      "images/FranceInfos1.png",
      "images/FranceInfos2.png",
      "images/FranceInfos3.png",
    ],
    year: "2022 - 2023",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    points: {
      fr: [
        "Premier chantier de migration UIKit vers SwiftUI au sein du groupe.",
        "Intégration du design system transverse via un module partagé.",
        "Accessibilité complète (VoiceOver, Dynamic Type).",
      ],
      en: [
        "First UIKit to SwiftUI migration within the group.",
        "Integration of the cross-group design system via a shared module.",
        "Full accessibility (VoiceOver, Dynamic Type).",
      ],
    },
    context: {
      fr: "Application d'information en continu de France Télévisions et Radio France. Premier cas d'usage SwiftUI du groupe et standard d'interopérabilité.",
      en: "Rolling news app from France Télévisions and Radio France. The group's first SwiftUI use case and interoperability standard.",
    },
    stack: ["Swift", "SwiftUI", "UIKit", "Combine", "SPM", "Jenkins", "Fastlane"],
  },
  {
    id: "lapremiere",
    name: "La Première",
    highlight: {
      fr: "Une refonte menée en lead, du prototype au natif, avec une équipe à faire grandir.",
      en: "A rebuild led end to end, from prototype to native, while growing the team.",
    },
    client: "France Télévisions",
    type: "media",
    images: ["images/La1ere.png"],
    year: "2020 - 2022",
    role: { fr: "Lead mobile", en: "Mobile lead" },
    points: {
      fr: [
        "Refonte de l'application du réseau outre-mer, iOS et Android.",
        "Passage d'une approche PWA vers le natif après prototypage.",
        "Encadrement et montée en compétence de l'équipe mobile.",
      ],
      en: [
        "Rebuild of the overseas network app, iOS and Android.",
        "Shift from a PWA approach to native after prototyping.",
        "Leadership and upskilling of the mobile team.",
      ],
    },
    context: {
      fr: "Application du réseau outre-mer de France Télévisions. Lead technique d'une équipe iOS et Android, du prototype à la production.",
      en: "France Télévisions overseas network app. Tech lead of an iOS and Android team, from prototype to production.",
    },
    stack: ["Swift", "Objective-C", "UIKit", "MVVM-C", "Jenkins", "Fastlane"],
  },
  {
    id: "workoutlife",
    name: "workoutLife",
    highlight: {
      fr: "Une app de fitness conçue et livrée de zéro en trois mois.",
      en: "A fitness app designed and shipped from scratch in three months.",
    },
    client: { fr: "Client direct", en: "Direct client" },
    type: "workout",
    images: [],
    year: "2019 - 2020",
    role: { fr: "Développeur iOS", en: "iOS developer" },
    points: {
      fr: [
        "Application de fitness développée de zéro en trois mois.",
        "Architecture MVVM et programmation réactive (RxSwift).",
        "Intégrations vidéo, stockage cloud et notifications push.",
      ],
      en: [
        "Fitness app built from scratch in three months.",
        "MVVM architecture and reactive programming (RxSwift).",
        "Video, cloud storage and push notification integrations.",
      ],
    },
    context: {
      fr: "Application de fitness grand public développée intégralement pour un client, de la conception à la livraison.",
      en: "Consumer fitness app built end to end for a client, from design to delivery.",
    },
    stack: ["Swift", "UIKit", "MVVM", "RxSwift", "YouTube API", "AWS S3", "OneSignal"],
  },
];

/* Autres missions, en condense */
const MORE = [
  { fr: "Compagnon de réunion macOS (projet personnel, IA)", en: "macOS meeting companion (personal project, AI)" },
  { fr: "Secours Populaire", en: "Secours Populaire" },
  { fr: "TGV Pro", en: "TGV Pro" },
  { fr: "Moods", en: "Moods" },
  { fr: "Réseau social image (Pixide)", en: "Image social network (Pixide)" },
  { fr: "Audit réseaux mobiles (IP-Label)", en: "Mobile network audit (IP-Label)" },
  { fr: "Chiffrement et contrôle parental", en: "Encryption and parental control" },
];

/* Parcours */
const JOURNEY = [
  {
    yearL: { fr: "2026 - aujourd'hui", en: "2026 - today" },
    role: { fr: "Développeur iOS et macOS", en: "iOS and macOS developer" },
    meta: { fr: "Projet personnel", en: "Personal project" },
    desc: {
      fr: "Compagnon de réunion sur macOS, transcription et synthèse assistées par IA, en Swift 6.",
      en: "macOS meeting companion, AI-assisted transcription and summary, in Swift 6.",
    },
  },
  {
    yearL: { fr: "2023 - 2026", en: "2023 - 2026" },
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    meta: { fr: "Décathlon - Lille", en: "Décathlon - Lille" },
    desc: {
      fr: "Applications RIDE et GearTrack. Conception de zéro, architecture modulaire et delivery autonome.",
      en: "RIDE and GearTrack apps. From-scratch design, modular architecture and autonomous delivery.",
    },
  },
  {
    yearL: { fr: "2020 - 2023", en: "2020 - 2023" },
    role: {
      fr: "Lead mobile et consultant iOS senior",
      en: "Mobile lead and senior iOS consultant",
    },
    meta: {
      fr: "France Télévisions et Radio France - Paris",
      en: "France Télévisions and Radio France - Paris",
    },
    desc: {
      fr: "Applications franceinfo, La Première et Régions. Migration vers SwiftUI et encadrement d'équipe.",
      en: "franceinfo, La Première and Régions apps. SwiftUI migration and team leadership.",
    },
  },
  {
    yearL: { fr: "2016 - 2020", en: "2016 - 2020" },
    role: { fr: "Lead iOS", en: "iOS lead" },
    meta: { fr: "TF1 - Paris", en: "TF1 - Paris" },
    desc: {
      fr: "Refonte de MYTF1 et conception du SDK lecteur vidéo interne, déployé sur l'écosystème du groupe.",
      en: "MYTF1 rebuild and design of the in-house video player SDK, deployed across the group's ecosystem.",
    },
  },
  {
    yearL: { fr: "2012 - 2016", en: "2012 - 2016" },
    role: { fr: "Développeur iOS et macOS", en: "iOS and macOS developer" },
    meta: { fr: "Webnet, Pixide, IP-Label, EAG", en: "Webnet, Pixide, IP-Label, EAG" },
    desc: {
      fr: "Applications métiers et grand public, réseau social image, audit réseaux, sécurité et chiffrement.",
      en: "Business and consumer apps, image social network, network audit, security and encryption.",
    },
  },
  {
    yearL: { fr: "2009 - 2012", en: "2009 - 2012" },
    role: { fr: "Ingénieur en télécommunications", en: "Telecommunications engineer" },
    meta: { fr: "ESPRIT - Tunis", en: "ESPRIT - Tunis" },
    desc: {
      fr: "Diplôme d'ingénieur, mention très bien. Projet de fin d'études déjà orienté vers le développement iOS.",
      en: "Engineering degree with highest honors. Final-year project already focused on iOS development.",
    },
  },
];

/* ------------------------------------------------------------------ */
/* 2. Illustrations d'app (mockups iPhone stylises, animes)            */
/* ------------------------------------------------------------------ */
function phoneMarkup(type, images) {
  const first = images && images.length ? images[0] : "";
  const screens = {
    gear: `
      <div class="scr scr-gear">
        <div class="scr-top"><span class="scr-title">GearTrack</span>
          <span class="ble"><span class="ble-dot"></span>BLE</span></div>
        <div class="gear-row"><span>Détendeur 01</span><span class="pill ok">Vérifié</span></div>
        <div class="gear-row"><span>Bouteille 12L</span><span class="pill">En prêt</span></div>
        <div class="gear-row"><span>Gilet stab.</span><span class="pill ok">Vérifié</span></div>
        <div class="gear-row"><span>Ordinateur</span><span class="pill sync">Sync</span></div>
        <div class="gear-row"><span>Combinaison</span><span class="pill ok">Vérifié</span></div>
      </div>`,
    ride: `
      <div class="scr scr-ride">
        <div class="ride-map">
          <svg viewBox="0 0 200 240" preserveAspectRatio="none">
            <path class="route-bg" d="M20 220 C 60 160, 40 120, 90 110 S 150 70, 170 24" />
            <path class="route" d="M20 220 C 60 160, 40 120, 90 110 S 150 70, 170 24" />
          </svg>
          <span class="ride-dot"></span>
        </div>
        <div class="ride-stats">
          <div><b>27,4</b><i>km/h</i></div>
          <div><b>42,8</b><i>km</i></div>
          <div><b>01:34</b><i>h</i></div>
        </div>
      </div>`,
    mytf1: `
      <div class="scr scr-tf1">
        <div class="tf1-hero"><span class="play"></span>
          <div class="tf1-bar"><span></span></div>
        </div>
        <div class="tf1-grid"><span></span><span></span><span></span><span></span><span></span><span></span></div>
      </div>`,
    news: `
      <div class="scr scr-news">
        <div class="scr-top"><span class="scr-title">franceinfo</span>
          <span class="live"><span class="live-dot"></span>Direct</span></div>
        <div class="news-lead"></div>
        <div class="news-row"><span class="news-thumb"></span><span class="news-lines"><i></i><i></i></span></div>
        <div class="news-row"><span class="news-thumb"></span><span class="news-lines"><i></i><i></i></span></div>
        <div class="news-row"><span class="news-thumb"></span><span class="news-lines"><i></i><i></i></span></div>
      </div>`,
    media: `
      <div class="scr scr-media">
        <div class="media-tabs"><span class="on">Outre-mer</span><span>Régions</span><span>Direct</span></div>
        <div class="media-feature"><span class="play sm"></span></div>
        <div class="media-row"><span></span><span></span></div>
        <div class="media-row"><span></span><span></span></div>
      </div>`,
    workout: `
      <div class="scr scr-workout">
        <div class="wo-video"><span class="play sm"></span><span class="wo-timer">12:45</span></div>
        <div class="wo-row"><span>Échauffement</span><span class="pill ok">Fait</span></div>
        <div class="wo-row"><span>Gainage</span><span class="pill sync">En cours</span></div>
        <div class="wo-row"><span>Cardio</span><span class="pill">À venir</span></div>
      </div>`,
  };
  // Si une vraie capture est fournie, elle recouvre l'illustration stylisee.
  // En cas d'image absente ou introuvable, repli automatique (onerror).
  const photo = first
    ? `<img class="scr-photo" src="${first}" alt="" loading="lazy"
         onload="this.closest('.ws-modal-visual').classList.add('has-photo')"
         onerror="this.remove()" />`
    : "";
  return `
    <div class="phone" data-parallax-scene>
      <div class="phone-screen" data-parallax-layer="0.5">
        ${screens[type] || ""}
        ${photo}
        <span class="phone-notch"></span>
      </div>
    </div>`;
}

/* ------------------------------------------------------------------ */
/* 3. Etat et rendu                                                    */
/* ------------------------------------------------------------------ */
const params = new URLSearchParams(location.search);
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const forceStatic =
  params.has("static") || localStorage.getItem("ws-static") === "1";
// ?anim force la demo des animations meme sous reduced-motion (opt-in explicite).
const forceAnim = params.has("anim");
const animMode = forceAnim || (!forceStatic && !prefersReduced);

// Francais par defaut (audience cliente FR). La bascule FR/EN reste memorisee.
let locale = localStorage.getItem("ws-locale") || "fr";

function L(v) {
  return typeof v === "string" ? v : v[locale];
}

function applyI18n() {
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const k = el.getAttribute("data-i18n");
    if (I18N[k]) el.textContent = I18N[k][locale];
  });
  document.querySelectorAll("[data-i18n-html]").forEach((el) => {
    const k = el.getAttribute("data-i18n-html");
    if (I18N[k]) el.innerHTML = I18N[k][locale];
  });
  document.documentElement.lang = locale;
  document.querySelectorAll("[data-lang]").forEach((b) => {
    b.classList.toggle("on", b.getAttribute("data-lang") === locale);
  });
}

function renderSteps() {
  const wrap = document.getElementById("steps");
  wrap.innerHTML = STEPS.map(
    (s) => `
    <div class="ws-step">
      <span class="ws-step-marker"><i data-lucide="${s.icon}" class="ws-icon"></i></span>
      <div class="ws-step-num" data-step-n>${s.n[locale]}</div>
      <h3 data-step-t>${s.t[locale]}</h3>
      <p data-step-d>${s.d[locale]}</p>
    </div>`
  ).join("");
}

function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  grid.innerHTML = PROJECTS.map((p, i) => {
    const client = L(p.client);
    const pts = p.points[locale].map((t) => `<li>${t}</li>`).join("");
    return `
      <button class="ws-card ws-project reveal" data-project="${p.id}" data-d="${i % 2}" type="button">
        <span class="ws-project-glow"></span>
        <span class="ws-project-inner" data-tilt-inner>
          <span class="ws-project-top">
            <span class="ws-project-name">${p.name}</span>
            <span class="ws-project-client">${client}</span>
          </span>
          <span class="ws-project-role">${p.role[locale]}</span>
          <ul class="ws-points">${pts}</ul>
          <span class="ws-project-cta" data-i18n="projets.detail">${I18N["projets.detail"][locale]}
            <i data-lucide="arrow-up-right"></i></span>
        </span>
      </button>`;
  }).join("");

  const more = document.getElementById("moreChips");
  more.innerHTML = MORE.map((m) => `<span class="ws-tag">${m[locale]}</span>`).join("");

  bindProjectCards();
  if (window.lucide) lucide.createIcons();
}

function renderJourney() {
  const wrap = document.getElementById("journey");
  wrap.innerHTML = JOURNEY.map(
    (j) => `
    <div class="ws-jrow reveal">
      <div class="ws-jyear">${j.yearL[locale]}</div>
      <div>
        <div class="ws-jrole">${j.role[locale]}</div>
        <div class="ws-jmeta">${j.meta[locale]}</div>
        <p class="ws-jdesc">${j.desc[locale]}</p>
      </div>
    </div>`
  ).join("");
}

/* ------------------------------------------------------------------ */
/* 4. Vue detail (modal)                                               */
/* ------------------------------------------------------------------ */
function openModal(id) {
  const p = PROJECTS.find((x) => x.id === id);
  if (!p) return;
  const did = p.points[locale].map((t) => `<li>${t}</li>`).join("");
  const tags = p.stack.map((s) => `<span class="ws-tag">${s}</span>`).join("");
  const panel = document.getElementById("modalPanel");
  panel.innerHTML = `
    <button class="ws-modal-close" id="modalClose" aria-label="${I18N["modal.close"][locale]}">
      <i data-lucide="x"></i>
    </button>
    <div class="ws-modal-grid">
      <div class="ws-modal-visual">
        ${phoneMarkup(p.type, p.images)}
        ${
          p.images && p.images.length > 1
            ? `<div class="ws-shots">${p.images
                .map(
                  (src, i) =>
                    `<button class="ws-shot${i === 0 ? " on" : ""}" data-shot="${src}" type="button" aria-label="Capture ${i + 1}"><img src="${src}" alt="" loading="lazy" onerror="this.closest('.ws-shot').remove()" /></button>`
                )
                .join("")}</div>`
            : ""
        }
        <span class="ws-illu-note">${I18N["modal.illu"][locale]}</span>
      </div>
      <div class="ws-modal-text">
        <div class="ws-modal-head">
          <h3 class="ws-h3">${p.name}</h3>
          <span class="ws-project-client">${L(p.client)}</span>
        </div>
        <div class="ws-modal-meta">
          <div><span class="ws-eyebrow">${I18N["modal.role"][locale]}</span>${p.role[locale]}</div>
          <div><span class="ws-eyebrow">${I18N["modal.period"][locale]}</span>${p.year}</div>
        </div>
        ${p.highlight ? `<p class="ws-modal-highlight">${p.highlight[locale]}</p>` : ""}
        <div class="ws-modal-block">
          <span class="ws-eyebrow">${I18N["modal.context"][locale]}</span>
          <p>${p.context[locale]}</p>
        </div>
        <div class="ws-modal-block">
          <span class="ws-eyebrow">${I18N["modal.did"][locale]}</span>
          <ul class="ws-points">${did}</ul>
        </div>
        <div class="ws-modal-block">
          <span class="ws-eyebrow">${I18N["modal.stack"][locale]}</span>
          <div class="ws-chips">${tags}</div>
        </div>
      </div>
    </div>`;
  const overlay = document.getElementById("modal");
  overlay.classList.add("open");
  document.body.style.overflow = "hidden";
  if (window.lucide) lucide.createIcons();
  document.getElementById("modalClose").addEventListener("click", closeModal);

  // Galerie : changer la capture affichee dans le cadre iPhone
  const shots = panel.querySelectorAll(".ws-shot");
  shots.forEach((btn) => {
    btn.addEventListener("click", () => {
      const main = panel.querySelector(".scr-photo");
      const src = btn.getAttribute("data-shot");
      if (main && main.getAttribute("src") !== src) {
        main.style.opacity = "0";
        setTimeout(() => {
          main.src = src;
          main.style.opacity = "1";
        }, 170);
      }
      shots.forEach((b) => b.classList.toggle("on", b === btn));
    });
  });

  if (animMode) bindPhoneParallax(panel);
}

function closeModal() {
  const overlay = document.getElementById("modal");
  overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function bindProjectCards() {
  document.querySelectorAll("[data-project]").forEach((card) => {
    card.addEventListener("click", () => openModal(card.getAttribute("data-project")));
    if (animMode) bindCardParallax(card);
  });
}

/* ------------------------------------------------------------------ */
/* 5. Parallaxe                                                        */
/* ------------------------------------------------------------------ */
function bindCardParallax(card) {
  const glow = card.querySelector(".ws-project-glow");
  card.style.transition = "transform 0.12s ease-out, border-color 0.3s ease";
  card.addEventListener("pointermove", (e) => {
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    // Inclinaison 3D ; la profondeur translateZ des couches cree le relief.
    card.style.transform = `perspective(1000px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 9).toFixed(2)}deg) translateY(-3px)`;
    if (glow) {
      glow.style.opacity = "1";
      glow.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
      glow.style.setProperty("--my", `${(py + 0.5) * 100}%`);
    }
  });
  card.addEventListener("pointerleave", () => {
    card.style.transition =
      "transform 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease";
    card.style.transform = "";
    if (glow) glow.style.opacity = "0";
  });
}

function bindPhoneParallax(scope) {
  const scene = scope.querySelector("[data-parallax-scene]");
  if (!scene) return;
  scope.addEventListener("pointermove", (e) => {
    const r = scope.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    scene.style.transform = `perspective(1100px) rotateX(${(-py * 8).toFixed(2)}deg) rotateY(${(px * 10).toFixed(2)}deg)`;
  });
  scope.addEventListener("pointerleave", () => {
    scene.style.transform = "";
  });
}

/* ------------------------------------------------------------------ */
/* 6. Apparition au scroll, timeline, nav                              */
/* ------------------------------------------------------------------ */
function setupReveal() {
  const reveals = document.querySelectorAll(".reveal");
  if (!animMode) {
    reveals.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  document.documentElement.classList.add("anim");
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
  );
  reveals.forEach((el) => io.observe(el));
}

function setupRail() {
  const timeline = document.getElementById("timeline");
  const railFill = document.getElementById("railFill");
  if (!timeline || !railFill || !animMode) return;
  const steps = [...timeline.querySelectorAll(".ws-step")];
  const onScroll = () => {
    const r = timeline.getBoundingClientRect();
    const front = window.innerHeight * 0.62; // front de construction
    const progressed = Math.min(Math.max(front - r.top, 0), r.height);
    railFill.style.height = (progressed / r.height) * 100 + "%";
    // Une etape s'active quand le front de la ligne atteint son marqueur.
    steps.forEach((s) => {
      const m = s.querySelector(".ws-step-marker").getBoundingClientRect();
      s.classList.toggle("active", m.top + m.height / 2 <= front);
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupJourneyParallax() {
  if (!animMode) return;
  const clamp = (v, n) => Math.max(-n, Math.min(n, v));
  const onScroll = () => {
    const vh = window.innerHeight;
    document.querySelectorAll(".ws-jyear").forEach((y) => {
      const r = y.getBoundingClientRect();
      const off = clamp(((r.top + r.height / 2) / vh - 0.5) * -16, 14);
      y.style.transform = `translateY(${off.toFixed(1)}px)`;
    });
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function setupNav() {
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 12);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobileMenu");
  if (burger && menu) {
    burger.addEventListener("click", () => menu.classList.toggle("open"));
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => menu.classList.remove("open"))
    );
  }
}

function setLocale(next) {
  locale = next;
  localStorage.setItem("ws-locale", next);
  applyI18n();
  renderSteps();
  renderProjects();
  renderJourney();
  setupReveal();
  if (window.lucide) lucide.createIcons();
}

/* ------------------------------------------------------------------ */
/* 7. Init                                                             */
/* ------------------------------------------------------------------ */
function init() {
  renderSteps();
  renderProjects();
  renderJourney();
  applyI18n();
  setupReveal();
  setupRail();
  setupJourneyParallax();
  setupNav();

  document.querySelectorAll("[data-lang]").forEach((b) =>
    b.addEventListener("click", () => setLocale(b.getAttribute("data-lang")))
  );

  const modal = document.getElementById("modal");
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  if (window.lucide) lucide.createIcons();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
