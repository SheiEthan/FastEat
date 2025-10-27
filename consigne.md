Barème Projet Fil Rouge – Front (Nuxt / Next / SvelteKit + TypeScript)  (sur 100 points)
1. Architecture & qualité du code (/15)
Projet structuré et modulaire (pages, composants, stores, services, types)  (/3)
Typage strict avec TypeScript : API responses, props, stores, génériques, utility types  (/10)
Documentation minimale dans le code (types, services, choix techniques) (/2)



2. Routing & modes de rendu (/25)
Page liste des restaurants rendue côté serveur (SSR) avec SEO (/5)
Page détail d’un restaurant et sa liste de plats rendue avec SSR ou ISR (/5)


Page détail d’un plat rendue côté serveur (SEO produit balise meta et bonne balise html) (/5)
Pages authentification (login, register) fonctionnelles et rendues côté client (/5)


Pages nécessitant authentification (panier, commandes passées, compte utilisateur) rendues côté client avec middleware (/5)



3. Data fetching & State management (/20)
Data fetching optimisé (useFetch, useAsyncData) avec gestion du cache/revalidation  (/8)


Gestion explicite des erreurs réseau (/2)


Store global pour gérer authentification, panier,  (commandes, restaurants - faculatif)– (/5)


Au moins 2 getters nécessaires et fonctionnels pour un ou plusieurs stores (/5)




4. SEO, accessibilité & internationalisation (/15)
Balises SEO dynamiques (en fonction des data) sur les pages publiques  (/5)
Accessibilité : score Lighthouse ≥ 90 (/5)
Internationalisation FR/EN : interface et contenus traduits, switch fonctionnel via un toggle/bouton (/5)



5. Performance & PWA (/10)
Optimisation du bundle : lazy loading composants lourds + analyse bundle (/4)
Optimisation médias : images en WebP/AVIF avec fallback et responsive sizes (/3)


PWA installable : manifest.json complet + Service Worker, navigation offline basique (/3)



6. Tests & CI/CD (/15)
Tests unitaires sur au moins 2 stores (idéalement : auth + panier) – (/4)


Tests E2E pour les 3 principaux parcours utilisateurs (/8)


Pipeline CI/CD avec build + déploiement auto + badge de statut dans README (/3)
