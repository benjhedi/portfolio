/* =====================================================================
   Contenu du portfolio (version fusionnee React + charte Wara Studio)
   Bilingue { fr, en }. Voix charte : sentence case, tutoiement en francais.
   ===================================================================== */

export type Locale = "fr" | "en";
export type L = { fr: string; en: string };
export type IconName =
  | "Compass" | "PencilRuler" | "CodeXml" | "FlaskConical" | "Rocket"
  | "LifeBuoy" | "Layers" | "Frame" | "Code" | "LayoutGrid" | "ShieldCheck";

export const identity = {
  name: "Hedi Benjahouach",
  initials: "HB",
  role: {
    fr: "Consultant iOS senior, freelance",
    en: "Senior iOS consultant, freelance",
  } as L,
  email: "hedi.hbji@gmail.com",
  links: {
    linkedin: "https://www.linkedin.com/in/hedibenj",
    phone: "+33 7 72 41 25 93",
    location: "Vanves (92), France, remote first",
  },
  availability: { fr: "Disponible, freelance", en: "Available, freelance" } as L,
};

export const nav: { id: string; label: L }[] = [
  { id: "offres", label: { fr: "Ce que je fais", en: "What I do" } },
  { id: "processus", label: { fr: "Processus", en: "Process" } },
  { id: "projets", label: { fr: "Projets", en: "Work" } },
  { id: "parcours", label: { fr: "Parcours", en: "Career" } },
  { id: "competences", label: { fr: "Compétences", en: "Skills" } },
];

export const hero = {
  eyebrow: {
    fr: "Consultant iOS senior, freelance",
    en: "Senior iOS consultant, freelance",
  } as L,
  pre: { fr: "Je conçois et développe tes applications iOS, de l'idée à la ", en: "I design and build your iOS apps, from idea to " } as L,
  accent: { fr: "production", en: "production" } as L,
  post: { fr: ".", en: "." } as L,
  sub: {
    fr: "14 ans d'expérience. Je prends en charge ton app du cadrage jusqu'à la mise en production, ou je la développe à partir de tes maquettes.",
    en: "14 years of experience. I take your app from scoping all the way to release, or build it from your existing designs.",
  } as L,
  cta1: { fr: "Démarrer un projet", en: "Start a project" } as L,
  cta2: { fr: "Voir les projets", en: "View the work" } as L,
  meta: [
    { t: { fr: "iOS et macOS", en: "iOS and macOS" }, d: { fr: "Swift, SwiftUI, UIKit", en: "Swift, SwiftUI, UIKit" } },
    { t: { fr: "De l'idée à l'App Store", en: "From idea to the App Store" }, d: { fr: "Cadrage, dev, mise en ligne", en: "Scoping, dev, release" } },
    { t: { fr: "Disponible", en: "Available" }, d: { fr: "Pour de nouvelles missions", en: "For new engagements" } },
  ] as { t: L; d: L }[],
};

export const clientsIntro = { fr: "Ils m'ont fait confiance", en: "Trusted by" } as L;
export const clients = [
  "TF1",
  "France Télévisions",
  "Décathlon",
  "Radio France",
  "SNCF",
  "IP-Label",
  "Webnet",
  "Groupe Ayed",
  "PIC-SIDE",
  "workoutLife",
];

export const offersHead = {
  eyebrow: { fr: "Ce que je fais", en: "What I do" } as L,
  title: { fr: "Deux façons de travailler ensemble", en: "Two ways to work together" } as L,
  accent: { fr: "ensemble", en: "together" } as L,
};
export const offers: { icon: IconName; title: L; body: L; meta: L }[] = [
  {
    icon: "Layers",
    title: { fr: "Construire ton app de A à Z", en: "Build your app from A to Z" },
    body: {
      fr: "De l'idée à la production. Cadrage du besoin, conception de l'architecture, développement, tests, publication sur l'App Store et suivi après la mise en ligne.",
      en: "From idea to production. Scoping, architecture design, development, testing, App Store release and post-launch support.",
    },
    meta: { fr: "Idéal pour lancer un nouveau produit", en: "Ideal to launch a new product" },
  },
  {
    icon: "Frame",
    title: { fr: "Développer à partir de tes maquettes", en: "Build from your designs" },
    body: {
      fr: "Tu as les écrans, je livre l'application. Intégration fidèle au design, code propre et maintenable, attention portée à la performance et aux détails.",
      en: "You have the screens, I deliver the app. Faithful integration, clean and maintainable code, attention to performance and detail.",
    },
    meta: { fr: "Idéal quand le design est déjà prêt", en: "Ideal when the design is ready" },
  },
];

export const processHead = {
  eyebrow: { fr: "Mon processus", en: "My process" } as L,
  title: { fr: "De l'idée à la mise en production", en: "From idea to production" } as L,
  accent: { fr: "production", en: "production" } as L,
  lead: {
    fr: "Une méthode claire, éprouvée sur des applications à forte exigence. Chaque étape prépare la suivante.",
    en: "A clear method, proven on demanding applications. Each step sets up the next.",
  } as L,
};
export const steps: { icon: IconName; num: L; title: L; desc: L }[] = [
  { icon: "Compass", num: { fr: "Étape 01", en: "Step 01" }, title: { fr: "Cadrage", en: "Scoping" }, desc: { fr: "On clarifie le besoin, le périmètre et les contraintes avant d'écrire la moindre ligne de code.", en: "We clarify the need, scope and constraints before writing a single line of code." } },
  { icon: "PencilRuler", num: { fr: "Étape 02", en: "Step 02" }, title: { fr: "Conception", en: "Design" }, desc: { fr: "Architecture, choix techniques et découpage en modules. Des fondations pensées pour durer.", en: "Architecture, technical choices and modular breakdown. Foundations built to last." } },
  { icon: "CodeXml", num: { fr: "Étape 03", en: "Step 03" }, title: { fr: "Développement", en: "Development" }, desc: { fr: "Implémentation en Swift et SwiftUI, par itérations courtes et lisibles, au plus près du produit.", en: "Implementation in Swift and SwiftUI, in short, readable iterations, close to the product." } },
  { icon: "FlaskConical", num: { fr: "Étape 04", en: "Step 04" }, title: { fr: "Tests", en: "Testing" }, desc: { fr: "Tests automatisés et relecture du code. On sécurise la qualité avant de livrer.", en: "Automated tests and code review. We secure quality before shipping." } },
  { icon: "Rocket", num: { fr: "Étape 05", en: "Step 05" }, title: { fr: "Mise en production", en: "Release" }, desc: { fr: "Publication sur l'App Store, configuration et déploiement maîtrisés de bout en bout.", en: "App Store release, configuration and deployment controlled end to end." } },
  { icon: "LifeBuoy", num: { fr: "Étape 06", en: "Step 06" }, title: { fr: "Suivi", en: "Support" }, desc: { fr: "Corrections, évolutions et accompagnement une fois l'application entre les mains des utilisateurs.", en: "Fixes, improvements and support once the app is in users' hands." } },
];

export type Project = {
  id: string;
  name: string;
  client: L | string;
  index: string;
  role: L;
  period: string;
  highlight: L;
  context: L;
  contributions: L[];
  stack: string[];
  images: string[];
};

export const projectsHead = {
  eyebrow: { fr: "Projets sélectionnés", en: "Selected work" } as L,
  title: { fr: "Quelques applications livrées", en: "A few apps I have shipped" } as L,
  accent: { fr: "livrées", en: "shipped" } as L,
  lead: { fr: "Un aperçu parmi de nombreuses missions. Clique sur un projet pour voir le détail.", en: "A glimpse among many engagements. Click a project to see the details." } as L,
  detail: { fr: "Voir le détail", en: "View details" } as L,
  moreTitle: { fr: "Et d'autres encore", en: "And more" } as L,
};

export const projects: Project[] = [
  {
    id: "geartrack", name: "GearTrack", client: "Décathlon", index: "01",
    role: { fr: "Consultant iOS senior, seul développeur iOS", en: "Senior iOS consultant, sole iOS developer" },
    period: "2024 - 2026",
    highlight: { fr: "Une plateforme générique livrée de zéro, pensée pour être réutilisée sur d'autres métiers.", en: "A generic platform delivered from scratch, designed to be reused across other domains." },
    context: { fr: "Plateforme générique de gestion de flotte d'équipements, pensée pour plusieurs métiers. Premier déploiement sur le matériel de plongée pour les centres professionnels.", en: "Generic equipment fleet platform designed for several domains. First rollout on diving gear for professional centers." },
    contributions: [
      { fr: "Application B2B de gestion de flotte d'équipements, conçue de zéro en SwiftUI.", en: "B2B equipment fleet management app, built from scratch in SwiftUI." },
      { fr: "Architecture modulaire (SPM, MVVM) réutilisable sur d'autres métiers.", en: "Modular architecture (SPM, MVVM) reusable across other domains." },
      { fr: "Communication Bluetooth (BLE) et intégration continue complète.", en: "Bluetooth (BLE) communication and full continuous integration." },
    ],
    stack: ["Swift", "SwiftUI", "Combine", "async/await", "BLE", "SPM", "Bitrise"],
    images: [],
  },
  {
    id: "ride", name: "RIDE", client: "Décathlon", index: "02",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    period: "2023 - 2024",
    highlight: { fr: "Navigation, suivi d'activité et abonnement premium réunis dans une app grand public exigeante.", en: "Navigation, activity tracking and a premium subscription in one demanding consumer app." },
    context: { fr: "Application de tracking et de navigation pour cyclistes, intégrant les vélos connectés. Forte exigence de performance et d'autonomie sur le terrain.", en: "Tracking and navigation app for cyclists, integrating connected bikes. Strong demands on performance and battery life in the field." },
    contributions: [
      { fr: "Application grand public de cyclisme, suivi d'activité et navigation GPS.", en: "Consumer cycling app, activity tracking and GPS navigation." },
      { fr: "Mise en place de l'abonnement premium (StoreKit, RevenueCat).", en: "Premium subscription set up (StoreKit, RevenueCat)." },
      { fr: "Cartographie via Mapbox et optimisation de la batterie sur les longues sorties.", en: "Mapbox mapping and battery optimization on long rides." },
    ],
    stack: ["Swift", "UIKit", "RxSwift", "MVVM-C", "StoreKit", "RevenueCat", "Mapbox"],
    images: ["/projects/RIDE.png"],
  },
  {
    id: "mytf1", name: "MYTF1", client: "TF1", index: "03",
    role: { fr: "Lead iOS", en: "iOS lead" },
    period: "2016 - 2020",
    highlight: { fr: "Refonte complète et SDK lecteur vidéo déployé sur tout l'écosystème TF1.", en: "A full rebuild and an in-house video player SDK deployed across the whole TF1 ecosystem." },
    context: { fr: "Plateforme de streaming du groupe TF1. Mission longue durée sur trois projets, dont le SDK lecteur vidéo déployé sur tout l'écosystème.", en: "TF1 group streaming platform. Long-term mission across three projects, including the video player SDK deployed across the whole ecosystem." },
    contributions: [
      { fr: "Refonte complète de l'application en Swift, architecture MVI et navigation modulaire.", en: "Full app rebuild in Swift, MVI architecture and modular navigation." },
      { fr: "Conception du SDK lecteur vidéo interne (AVFoundation, HLS, FairPlay, AirPlay).", en: "Design of the in-house video player SDK (AVFoundation, HLS, FairPlay, AirPlay)." },
      { fr: "Migration de l'API REST vers GraphQL côté iOS.", en: "REST to GraphQL API migration on iOS." },
    ],
    stack: ["Swift", "AVFoundation", "HLS", "FairPlay", "RxSwift", "MVI", "GraphQL"],
    images: ["/projects/MYTF1.png", "/projects/tfoumax.png"],
  },
  {
    id: "franceinfo", name: "franceinfo", client: "France Télévisions", index: "04",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    period: "2022 - 2023",
    highlight: { fr: "Le premier passage à SwiftUI du groupe, posé comme standard pour les autres apps.", en: "The group's first move to SwiftUI, set as the standard for the other apps." },
    context: { fr: "Application d'information en continu de France Télévisions et Radio France. Premier cas d'usage SwiftUI du groupe et standard d'interopérabilité.", en: "Rolling news app from France Télévisions and Radio France. The group's first SwiftUI use case and interoperability standard." },
    contributions: [
      { fr: "Premier chantier de migration UIKit vers SwiftUI au sein du groupe.", en: "First UIKit to SwiftUI migration within the group." },
      { fr: "Intégration du design system transverse via un module partagé.", en: "Integration of the cross-group design system via a shared module." },
      { fr: "Accessibilité complète (VoiceOver, Dynamic Type).", en: "Full accessibility (VoiceOver, Dynamic Type)." },
    ],
    stack: ["Swift", "SwiftUI", "UIKit", "Combine", "SPM", "Jenkins", "Fastlane"],
    images: ["/projects/FranceInfos.png", "/projects/FranceInfos1.png", "/projects/FranceInfos2.png", "/projects/FranceInfos3.png"],
  },
  {
    id: "lapremiere", name: "La Première", client: "France Télévisions", index: "05",
    role: { fr: "Lead mobile", en: "Mobile lead" },
    period: "2020 - 2022",
    highlight: { fr: "Une refonte menée en lead, du prototype au natif, avec une équipe à faire grandir.", en: "A rebuild led end to end, from prototype to native, while growing the team." },
    context: { fr: "Application du réseau outre-mer de France Télévisions. Lead technique d'une équipe iOS et Android, du prototype à la production.", en: "France Télévisions overseas network app. Tech lead of an iOS and Android team, from prototype to production." },
    contributions: [
      { fr: "Refonte de l'application du réseau outre-mer, iOS et Android.", en: "Rebuild of the overseas network app, iOS and Android." },
      { fr: "Passage d'une approche PWA vers le natif après prototypage.", en: "Shift from a PWA approach to native after prototyping." },
      { fr: "Encadrement et montée en compétence de l'équipe mobile.", en: "Leadership and upskilling of the mobile team." },
    ],
    stack: ["Swift", "Objective-C", "UIKit", "MVVM-C", "Jenkins", "Fastlane"],
    images: ["/projects/La1ere.png"],
  },
  {
    id: "workoutlife", name: "workoutLife", client: { fr: "Client direct", en: "Direct client" }, index: "06",
    role: { fr: "Développeur iOS", en: "iOS developer" },
    period: "2019 - 2020",
    highlight: { fr: "Une app de fitness conçue et livrée de zéro en trois mois.", en: "A fitness app designed and shipped from scratch in three months." },
    context: { fr: "Application de fitness grand public développée intégralement pour un client, de la conception à la livraison.", en: "Consumer fitness app built end to end for a client, from design to delivery." },
    contributions: [
      { fr: "Application de fitness développée de zéro en trois mois.", en: "Fitness app built from scratch in three months." },
      { fr: "Architecture MVVM et programmation réactive (RxSwift).", en: "MVVM architecture and reactive programming (RxSwift)." },
      { fr: "Intégrations vidéo, stockage cloud et notifications push.", en: "Video, cloud storage and push notification integrations." },
    ],
    stack: ["Swift", "UIKit", "MVVM", "RxSwift", "YouTube API", "AWS S3", "OneSignal"],
    images: [],
  },
];

export const more: L[] = [
  { fr: "Compagnon de réunion macOS (projet personnel, IA)", en: "macOS meeting companion (personal project, AI)" },
  { fr: "Secours Populaire", en: "Secours Populaire" },
  { fr: "TGV Pro", en: "TGV Pro" },
  { fr: "Moods", en: "Moods" },
  { fr: "Réseau social image (Pixide)", en: "Image social network (Pixide)" },
  { fr: "Audit réseaux mobiles (IP-Label)", en: "Mobile network audit (IP-Label)" },
  { fr: "Chiffrement et contrôle parental", en: "Encryption and parental control" },
];

export const journeyHead = {
  eyebrow: { fr: "Mon parcours", en: "Career" } as L,
  title: { fr: "14 ans auprès de grands acteurs", en: "14 years with major players" } as L,
  accent: { fr: "14 ans", en: "14 years" } as L,
};
export const journey: { year: L; role: L; meta: L; desc: L }[] = [
  { year: { fr: "2026, aujourd'hui", en: "2026, today" }, role: { fr: "Développeur iOS et macOS", en: "iOS and macOS developer" }, meta: { fr: "Projet personnel", en: "Personal project" }, desc: { fr: "Compagnon de réunion sur macOS, transcription et synthèse assistées par IA, en Swift 6.", en: "macOS meeting companion, AI-assisted transcription and summary, in Swift 6." } },
  { year: { fr: "2023 - 2026", en: "2023 - 2026" }, role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" }, meta: { fr: "Décathlon, Lille", en: "Décathlon, Lille" }, desc: { fr: "Applications RIDE et GearTrack. Conception de zéro, architecture modulaire et delivery autonome.", en: "RIDE and GearTrack apps. From-scratch design, modular architecture and autonomous delivery." } },
  { year: { fr: "2020 - 2023", en: "2020 - 2023" }, role: { fr: "Lead mobile et consultant iOS senior", en: "Mobile lead and senior iOS consultant" }, meta: { fr: "France Télévisions et Radio France, Paris", en: "France Télévisions and Radio France, Paris" }, desc: { fr: "Applications franceinfo, La Première et Régions. Migration vers SwiftUI et encadrement d'équipe.", en: "franceinfo, La Première and Régions apps. SwiftUI migration and team leadership." } },
  { year: { fr: "2016 - 2020", en: "2016 - 2020" }, role: { fr: "Lead iOS", en: "iOS lead" }, meta: { fr: "TF1, Paris", en: "TF1, Paris" }, desc: { fr: "Refonte de MYTF1 et conception du SDK lecteur vidéo interne, déployé sur l'écosystème du groupe.", en: "MYTF1 rebuild and design of the in-house video player SDK, deployed across the group's ecosystem." } },
  { year: { fr: "2012 - 2016", en: "2012 - 2016" }, role: { fr: "Développeur iOS et macOS", en: "iOS and macOS developer" }, meta: { fr: "Webnet, Pixide, IP-Label, EAG", en: "Webnet, Pixide, IP-Label, EAG" }, desc: { fr: "Applications métiers et grand public, réseau social image, audit réseaux, sécurité et chiffrement.", en: "Business and consumer apps, image social network, network audit, security and encryption." } },
  { year: { fr: "2009 - 2012", en: "2009 - 2012" }, role: { fr: "Ingénieur en télécommunications", en: "Telecommunications engineer" }, meta: { fr: "ESPRIT, Tunis", en: "ESPRIT, Tunis" }, desc: { fr: "Diplôme d'ingénieur, mention très bien. Projet de fin d'études déjà orienté vers le développement iOS.", en: "Engineering degree with highest honors. Final-year project already focused on iOS development." } },
];

export const skillsHead = {
  eyebrow: { fr: "Compétences et stack", en: "Skills and stack" } as L,
  title: { fr: "Une stack iOS moderne et maîtrisée", en: "A modern, mastered iOS stack" } as L,
  accent: { fr: "maîtrisée", en: "mastered" } as L,
};
export const skills: { icon: IconName; title: L; items: string[] }[] = [
  { icon: "Code", title: { fr: "Langages et frameworks", en: "Languages and frameworks" }, items: ["Swift", "SwiftUI", "UIKit", "Combine", "async / await"] },
  { icon: "LayoutGrid", title: { fr: "Architectures", en: "Architecture" }, items: ["MVVM", "MVVM-C", "Clean Architecture", "Modularisation", "SPM"] },
  { icon: "ShieldCheck", title: { fr: "Qualité et delivery", en: "Quality and delivery" }, items: ["Tests automatisés", "Intégration continue", "Revue de code", "Publication App Store"] },
];

export const stackMarquee: { name: string; slug: string }[] = [
  { name: "Swift", slug: "swift" },
  { name: "Xcode", slug: "xcode" },
  { name: "Apple", slug: "apple" },
  { name: "Claude API", slug: "claude" },
  { name: "Mapbox", slug: "mapbox" },
  { name: "RevenueCat", slug: "revenuecat" },
  { name: "Firebase", slug: "firebase" },
  { name: "GraphQL", slug: "graphql" },
  { name: "Fastlane", slug: "fastlane" },
  { name: "Jenkins", slug: "jenkins" },
  { name: "Git", slug: "git" },
];

export const contact = {
  eyebrow: { fr: "Contact", en: "Contact" } as L,
  heading: { fr: "Parlons de ton projet", en: "Let's talk about your project" } as L,
  accent: { fr: "ton projet", en: "your project" } as L,
  body: {
    fr: "Une idée à concrétiser ou des maquettes à développer ? Écris-moi, je reviens vers toi rapidement.",
    en: "An idea to bring to life or designs to build? Drop me a line, I will get back to you quickly.",
  } as L,
  cta: { fr: "Écrire un message", en: "Write a message" } as L,
};

export const modalLabels = {
  role: { fr: "Rôle", en: "Role" } as L,
  period: { fr: "Période", en: "Period" } as L,
  context: { fr: "Contexte", en: "Context" } as L,
  did: { fr: "Ce que j'ai fait", en: "What I did" } as L,
  stack: { fr: "Stack", en: "Stack" } as L,
  close: { fr: "Fermer", en: "Close" } as L,
};
