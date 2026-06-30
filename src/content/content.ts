/* =====================================================================
   Contenu du portfolio (version fusionnee React + charte Wara Studio)
   Bilingue { fr, en }. Voix charte : sentence case, tutoiement en francais.
   ===================================================================== */

export type Locale = "fr" | "en";
export type L = { fr: string; en: string };
export type IconName =
  | "Compass" | "PencilRuler" | "CodeXml" | "FlaskConical" | "Rocket"
  | "LifeBuoy" | "Layers" | "Frame" | "Code" | "LayoutGrid" | "ShieldCheck"
  | "Gauge" | "Users" | "MessagesSquare" | "Sparkles";

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
  availability: {
    fr: "Disponible, missions, forfait ou régie",
    en: "Available, projects, fixed-price or staffing",
  } as L,
};

export const nav: { id: string; label: L }[] = [
  { id: "apropos", label: { fr: "À propos", en: "About" } },
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
    fr: "14 ans d'expérience. Je prends en charge ton app du cadrage jusqu'à la mise en production, ou je la développe à partir de tes maquettes. En mission, au forfait ou en régie.",
    en: "14 years of experience. I take your app from scoping all the way to release, or build it from your existing designs. As a contractor, fixed-price or on a staffing basis.",
  } as L,
  cta1: { fr: "Démarrer un projet", en: "Start a project" } as L,
  cta2: { fr: "Voir les projets", en: "View the work" } as L,
  meta: [
    { t: { fr: "iOS, iPadOS, macOS, watchOS", en: "iOS, iPadOS, macOS, watchOS" }, d: { fr: "Swift, SwiftUI, UIKit", en: "Swift, SwiftUI, UIKit" } },
    { t: { fr: "De l'idée à l'App Store", en: "From idea to the App Store" }, d: { fr: "Cadrage, dev, mise en ligne", en: "Scoping, dev, release" } },
    { t: { fr: "Disponible", en: "Available" }, d: { fr: "Missions, forfait ou régie", en: "Projects, fixed-price or staffing" } },
  ] as { t: L; d: L }[],
};

export const clientsIntro = { fr: "Ils m'ont fait confiance", en: "Trusted by" } as L;
/* Logos officiels (masque CSS charcoal) ou repli wordmark texte. ratio = largeur/hauteur du logo. */
export const clients: { name: string; logo?: string; ratio?: number }[] = [
  // TF1 et Décathlon : SVG en aplat plein (inexploitables en masque monochrome) -> wordmark texte
  { name: "TF1" },
  { name: "France Télévisions", logo: "/logos/francetv.svg", ratio: 9.93 },
  { name: "Décathlon" },
  { name: "Radio France", logo: "/logos/radiofrance.svg", ratio: 6.61 },
  { name: "SNCF", logo: "/logos/sncf.svg", ratio: 4.31 },
  { name: "France Info" },
  { name: "IP-Label" },
  { name: "Webnet" },
  { name: "EAG" },
  { name: "Pic Side" },
  { name: "Secours Populaire" },
  { name: "workoutLife" },
];

export const aboutHead = {
  eyebrow: { fr: "À propos", en: "About" } as L,
  title: { fr: "Un seul interlocuteur, du cadrage à la production", en: "A single contact, from scoping to production" } as L,
  accent: { fr: "interlocuteur", en: "contact" } as L,
};
export const about = {
  bio: [
    {
      fr: "Développeur iOS depuis 14 ans, j'accompagne aussi bien de grands groupes que des clients directs sur des applications à forte exigence : streaming vidéo, information en continu, sport connecté, outils métiers B2B.",
      en: "An iOS developer for 14 years, I work with major groups and direct clients alike on demanding applications: video streaming, rolling news, connected sport, B2B business tools.",
    },
    {
      fr: "J'interviens en freelance, comme unique interlocuteur senior, de l'idée à la mise en production. Tu parles directement à la personne qui conçoit, développe et livre ton app, sans relais ni perte de contexte, en mission, au forfait ou en régie.",
      en: "I work as a freelancer, your single senior contact, from idea to release. You talk straight to the person who designs, builds and ships your app, with no handoffs and no lost context, on a project, fixed-price or staffing basis.",
    },
  ] as L[],
  traits: [
    {
      icon: "Gauge",
      title: { fr: "Senior et autonome", en: "Senior and autonomous" },
      body: { fr: "Je prends en charge ton app de bout en bout : cadrage, architecture, développement, tests et publication, sans avoir besoin d'être encadré.", en: "I own your app end to end: scoping, architecture, development, testing and release, with no need to be supervised." },
    },
    {
      icon: "Sparkles",
      title: { fr: "Exigence produit", en: "Product standards" },
      body: { fr: "Code propre et maintenable, performance, accessibilité et soin du détail. La qualité se voit à l'usage, pas seulement dans le dépôt.", en: "Clean, maintainable code, performance, accessibility and attention to detail. Quality shows in use, not just in the repo." },
    },
    {
      icon: "Users",
      title: { fr: "Sens du collectif", en: "Team player" },
      body: { fr: "Habitué à faire grandir une équipe mobile et à poser des standards techniques repris par d'autres applications du groupe.", en: "Used to growing a mobile team and setting technical standards reused across other group apps." },
    },
    {
      icon: "MessagesSquare",
      title: { fr: "Communication directe", en: "Direct communication" },
      body: { fr: "Un seul interlocuteur, des points clairs et réguliers, des décisions tracées. Tu sais toujours où en est ton projet.", en: "One contact, clear and regular updates, traceable decisions. You always know where your project stands." },
    },
  ] as { icon: IconName; title: L; body: L }[],
};

export const offersHead = {
  eyebrow: { fr: "Ce que je fais", en: "What I do" } as L,
  title: { fr: "Deux façons de travailler ensemble", en: "Two ways to work together" } as L,
  accent: { fr: "ensemble", en: "together" } as L,
  lead: {
    fr: "Un seul interlocuteur, senior, de l'idée à la production. Tu parles directement à la personne qui conçoit et développe ton app, sans relais ni perte de contexte.",
    en: "A single senior contact, from idea to production. You talk straight to the person who designs and builds your app, with no handoffs and no lost context.",
  } as L,
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
      { fr: "Conception et développement de zéro, seul développeur iOS, d'une application B2B de gestion de flotte d'équipements en SwiftUI.", en: "Designed and built from scratch, as the sole iOS developer, a B2B equipment fleet management app in SwiftUI." },
      { fr: "Mise en place d'une architecture modulaire (SPM, MVVM) pensée pour être réutilisée sur d'autres métiers que la plongée.", en: "Set up a modular architecture (SPM, MVVM) designed to be reused on domains beyond diving." },
      { fr: "Communication Bluetooth (BLE) avec le matériel connecté et synchronisation des données hors ligne.", en: "Bluetooth (BLE) communication with connected hardware and offline data synchronization." },
      { fr: "Chaîne d'intégration continue complète : build, tests et distribution automatisés sur Bitrise.", en: "Full continuous integration pipeline: automated builds, tests and distribution on Bitrise." },
    ],
    stack: ["Swift", "SwiftUI", "Combine", "async/await", "BLE", "SPM", "Bitrise"],
    images: ["/projects/GearTrack.png"],
  },
  {
    id: "ride", name: "RIDE", client: "Décathlon", index: "02",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    period: "2023 - 2024",
    highlight: { fr: "Navigation temps réel et suivi d'activité dans une app de cyclisme grand public exigeante.", en: "Real-time navigation and activity tracking in a demanding consumer cycling app." },
    context: { fr: "Application de tracking et de navigation pour cyclistes. Forte exigence de performance et d'autonomie sur le terrain.", en: "Tracking and navigation app for cyclists. Strong demands on performance and battery life in the field." },
    contributions: [
      { fr: "Contribution au développement de cette application grand public de cyclisme (suivi d'activité et navigation).", en: "Contributed to the development of this consumer cycling app (activity tracking and navigation)." },
      { fr: "Intégration de l'algorithme de notation.", en: "Integration of the rating algorithm." },
      { fr: "Mise en place de la navigation en temps réel, d'un point A à un point B (itinéraire tourne-à-tourne).", en: "Built the real-time, point A to point B turn-by-turn navigation." },
      { fr: "Cartographie et optimisation des performances via Mapbox.", en: "Mapping and performance optimization with Mapbox." },
    ],
    stack: ["Swift", "UIKit", "RxSwift", "MVVM-C", "Mapbox"],
    images: ["/projects/RIDE.png"],
  },
  {
    id: "mytf1", name: "MYTF1", client: "TF1", index: "03",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    period: "2016 - 2020",
    highlight: { fr: "La plateforme de streaming de TF1, reprise en Objective-C puis refondue en Swift.", en: "TF1's streaming platform, taken over in Objective-C then rebuilt in Swift." },
    context: { fr: "Application grand public de streaming et de replay du groupe TF1, à fort trafic. À mon arrivée, une base Objective-C que j'ai fait évoluer avant une refonte complète.", en: "High-traffic consumer streaming and replay app of the TF1 group. When I arrived, an Objective-C codebase that I improved before a full rebuild." },
    contributions: [
      { fr: "À mon arrivée, application en Objective-C : migrations ciblées de MVC vers MVVM et améliorations sur l'existant.", en: "On arrival, an Objective-C app: targeted MVC to MVVM migrations and improvements on the existing code." },
      { fr: "Contribution à la refonte complète de l'application en Swift : architecture MVI et navigation modulaire.", en: "Contributed to the full rebuild of the app in Swift: MVI architecture and modular navigation." },
      { fr: "Programmation réactive avec RxSwift.", en: "Reactive programming with RxSwift." },
      { fr: "Migration progressive des appels REST vers GraphQL côté iOS.", en: "Gradual migration of REST calls to GraphQL on iOS." },
    ],
    stack: ["Swift", "Objective-C", "UIKit", "RxSwift", "MVVM", "MVI", "GraphQL"],
    images: ["/projects/MYTF1.png", "/projects/tfoumax.png"],
  },
  {
    id: "franceinfo", name: "franceinfo", client: "France Télévisions", index: "04",
    role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" },
    period: "2022 - 2023",
    highlight: { fr: "L'app d'info de référence du service public, modernisée en SwiftUI pour des millions de lecteurs.", en: "Public broadcasting's flagship news app, modernized in SwiftUI for millions of readers." },
    context: { fr: "Application d'information en continu de France Télévisions et Radio France. L'un des premiers usages de SwiftUI sur l'application, avec un module design system partagé.", en: "Rolling news app from France Télévisions and Radio France. One of the first uses of SwiftUI on the app, with a shared design system module." },
    contributions: [
      { fr: "Migration de l'application de UIKit vers SwiftUI, écran par écran, sans figer la production.", en: "Migrated the app from UIKit to SwiftUI, screen by screen, without freezing the release train." },
      { fr: "Intégration et développement, au sein de l'app franceinfo, du module design system partagé décidé en amont.", en: "Integrated and built, within the franceinfo app, the shared design system module that had been decided upstream." },
      { fr: "Module design system que j'ai ensuite réutilisé comme référence sur d'autres projets.", en: "Design system module I later reused as a reference on other projects." },
      { fr: "Accessibilité complète exigée par le service public (VoiceOver, Dynamic Type, contrastes).", en: "Full accessibility required by public broadcasting (VoiceOver, Dynamic Type, contrast)." },
    ],
    stack: ["Swift", "SwiftUI", "UIKit", "Combine", "SPM", "Jenkins", "Fastlane"],
    images: ["/projects/FranceInfos.png", "/projects/FranceInfos1.png", "/projects/FranceInfos2.png", "/projects/FranceInfos3.png"],
  },
  {
    id: "lapremiere", name: "Outre-mer La1ere", client: "France Télévisions", index: "05",
    role: { fr: "Seul développeur iOS au départ, puis référent technique", en: "Sole iOS developer at first, then technical lead" },
    period: "2020 - 2022",
    highlight: { fr: "Démarrée seul développeur, puis référent d'une équipe mobile montée pour porter l'app outre-mer du prototype au natif.", en: "Started as the sole developer, then technical lead of a mobile team built to take the overseas app from prototype to native." },
    context: { fr: "Application du réseau outre-mer de France Télévisions. Démarrée seul sur iOS, je suis ensuite devenu référent technique de l'équipe mobile iOS et Android, du prototype à la production.", en: "France Télévisions overseas network app. Started solo on iOS, I then became technical lead of the iOS and Android mobile team, from prototype to production." },
    contributions: [
      { fr: "Seul développeur iOS au lancement du projet, du cadrage au premier build livré.", en: "Sole iOS developer at project kickoff, from scoping to the first shipped build." },
      { fr: "Référent technique une fois l'équipe mobile constituée : choix d'architecture, revue de code et montée en compétence.", en: "Technical lead once the mobile team was formed: architecture decisions, code review and upskilling." },
      { fr: "Refonte de l'application du réseau outre-mer sur iOS et Android, en cohérence entre les deux plateformes.", en: "Rebuild of the overseas network app on iOS and Android, kept consistent across both platforms." },
      { fr: "Passage d'une approche PWA vers le natif après une phase de prototypage.", en: "Shift from a PWA approach to native after a prototyping phase." },
    ],
    stack: ["Swift", "Objective-C", "UIKit", "MVVM-C", "Jenkins", "Fastlane"],
    images: ["/projects/La1ere.png"],
  },
  {
    id: "workoutlife", name: "workoutLife", client: { fr: "Client direct", en: "Direct client" }, index: "06",
    role: { fr: "Développeur iOS, seul sur le projet", en: "iOS developer, sole on the project" },
    period: "2019 - 2020",
    highlight: { fr: "Une app de fitness grand public livrée de bout en bout, du concept au lancement, en solo pour un client direct.", en: "A consumer fitness app delivered end to end, from concept to launch, solo for a direct client." },
    context: { fr: "Application de fitness grand public développée intégralement pour un client, de la conception à la livraison.", en: "Consumer fitness app built end to end for a client, from design to delivery." },
    contributions: [
      { fr: "Conception et développement de zéro, seul sur le projet, d'une application de fitness grand public.", en: "Designed and built from scratch, solo on the project, a consumer fitness app." },
      { fr: "Architecture MVI et programmation réactive (RxSwift) pour un état d'interface prévisible.", en: "MVI architecture and reactive programming (RxSwift) for predictable UI state." },
      { fr: "Intégrations vidéo (YouTube), stockage cloud (AWS S3) et notifications push (OneSignal).", en: "Video (YouTube), cloud storage (AWS S3) and push notification (OneSignal) integrations." },
      { fr: "Mise en ligne sur l'App Store et suivi des premières versions.", en: "App Store release and support of the first versions." },
    ],
    stack: ["Swift", "UIKit", "MVI", "RxSwift", "YouTube API", "AWS S3", "OneSignal"],
    images: ["/projects/WorkoutLife.png"],
  },
];

export const more: { title: L; client: L; desc: L }[] = [
  {
    title: { fr: "SDK lecteur vidéo", en: "Video player SDK" },
    client: { fr: "TF1", en: "TF1" },
    desc: { fr: "Lead du SDK lecteur vidéo interne (AVFoundation, HLS, FairPlay, AirPlay), déployé sur tout l'écosystème du groupe.", en: "Lead on the in-house video player SDK (AVFoundation, HLS, FairPlay, AirPlay), deployed across the whole group ecosystem." },
  },
  {
    title: { fr: "TFOU MAX", en: "TFOU MAX" },
    client: { fr: "TF1", en: "TF1" },
    desc: { fr: "Application de streaming jeunesse du groupe TF1.", en: "Kids streaming app of the TF1 group." },
  },
  {
    title: { fr: "Compagnon de réunion macOS", en: "macOS meeting companion" },
    client: { fr: "Projet personnel", en: "Personal project" },
    desc: { fr: "Transcription et synthèse de réunion assistées par IA, en Swift 6.", en: "AI-assisted meeting transcription and summary, in Swift 6." },
  },
  {
    title: { fr: "TGV Pro", en: "TGV Pro" },
    client: { fr: "SNCF", en: "SNCF" },
    desc: { fr: "Application mobile à destination des agents et voyageurs professionnels.", en: "Mobile app for staff and professional travelers." },
  },
  {
    title: { fr: "Secours Populaire", en: "Secours Populaire" },
    client: { fr: "Association", en: "Nonprofit" },
    desc: { fr: "Application mobile pour un acteur associatif de premier plan.", en: "Mobile app for a leading nonprofit organization." },
  },
  {
    title: { fr: "Pic Side", en: "Pic Side" },
    client: { fr: "Pic Side", en: "Pic Side" },
    desc: { fr: "Réseau social autour de l'image, du concept à l'application.", en: "Image-based social network, from concept to app." },
  },
  {
    title: { fr: "Moods", en: "Moods" },
    client: { fr: "Client direct", en: "Direct client" },
    desc: { fr: "Application grand public iOS, conçue et développée de zéro.", en: "Consumer iOS app, designed and built from scratch." },
  },
  {
    title: { fr: "Audit de réseaux mobiles", en: "Mobile network audit" },
    client: { fr: "IP-Label", en: "IP-Label" },
    desc: { fr: "Outils de mesure et d'audit de la qualité des réseaux mobiles.", en: "Mobile network quality measurement and audit tools." },
  },
  {
    title: { fr: "Sécurité et contrôle parental", en: "Security and parental control" },
    client: { fr: "Webnet, EAG", en: "Webnet, EAG" },
    desc: { fr: "Chiffrement, contrôle parental et applications métiers sécurisées.", en: "Encryption, parental control and secure business apps." },
  },
];

export const journeyHead = {
  eyebrow: { fr: "Mon parcours", en: "Career" } as L,
  title: { fr: "14 ans auprès de grands acteurs", en: "14 years with major players" } as L,
  accent: { fr: "14 ans", en: "14 years" } as L,
};
export const journey: { year: L; role: L; meta: L; desc: L }[] = [
  { year: { fr: "2026, aujourd'hui", en: "2026, today" }, role: { fr: "Développeur iOS et macOS", en: "iOS and macOS developer" }, meta: { fr: "Projet personnel", en: "Personal project" }, desc: { fr: "Compagnon de réunion sur macOS, transcription et synthèse assistées par IA, en Swift 6.", en: "macOS meeting companion, AI-assisted transcription and summary, in Swift 6." } },
  { year: { fr: "2023 - 2026", en: "2023 - 2026" }, role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" }, meta: { fr: "Décathlon, Lille", en: "Décathlon, Lille" }, desc: { fr: "Applications RIDE et GearTrack. Conception de zéro, architecture modulaire et delivery autonome, seul développeur iOS sur GearTrack.", en: "RIDE and GearTrack apps. From-scratch design, modular architecture and autonomous delivery, sole iOS developer on GearTrack." } },
  { year: { fr: "2020 - 2023", en: "2020 - 2023" }, role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" }, meta: { fr: "France Télévisions et Radio France, Paris", en: "France Télévisions and Radio France, Paris" }, desc: { fr: "Applications franceinfo, Outre-mer La1ere et Régions. Migration vers SwiftUI ; seul développeur puis référent technique de l'équipe mobile sur l'outre-mer.", en: "franceinfo, Outre-mer La1ere and Régions apps. SwiftUI migration; sole developer then technical lead of the overseas mobile team." } },
  { year: { fr: "2016 - 2020", en: "2016 - 2020" }, role: { fr: "Consultant iOS senior", en: "Senior iOS consultant" }, meta: { fr: "TF1, Paris", en: "TF1, Paris" }, desc: { fr: "Refonte de MYTF1 comme consultant développeur, et conception en tant que lead du SDK lecteur vidéo interne, déployé sur tout l'écosystème du groupe.", en: "MYTF1 rebuild as a consultant developer, and lead design of the in-house video player SDK, deployed across the whole group ecosystem." } },
  { year: { fr: "2012 - 2016", en: "2012 - 2016" }, role: { fr: "Développeur iOS et macOS", en: "iOS and macOS developer" }, meta: { fr: "Webnet, Pic Side, IP-Label, EAG", en: "Webnet, Pic Side, IP-Label, EAG" }, desc: { fr: "Applications métiers et grand public, réseau social image, audit réseaux, sécurité et chiffrement.", en: "Business and consumer apps, image social network, network audit, security and encryption." } },
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
  { name: "Bitrise", slug: "bitrise" },
  { name: "Git", slug: "git" },
  { name: "GitHub", slug: "github" },
  { name: "GitLab", slug: "gitlab" },
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
