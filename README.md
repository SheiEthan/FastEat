

# FastEat

![CI](https://github.com/SheiEthan/FastEat/actions/workflows/playwright.yml/badge.svg)
[![Website](https://img.shields.io/website?url=https%3A%2F%2Ffast-eat.vercel.app)](https://fast-eat-sigma.vercel.app)

## Présentation

FastEat est une application web moderne de commande de plats en ligne, pensée pour offrir une expérience utilisateur fluide, rapide et accessible sur tous supports. Elle permet à des clients de découvrir des restaurants, parcourir leurs menus, ajouter des plats à leur panier, passer commande et suivre leur historique, le tout dans une interface multilingue et responsive.

Ce projet s’inscrit dans le cadre du Fil Rouge MBA FullStack et vise à mettre en œuvre les meilleures pratiques du développement web moderne (SSR, PWA, CI/CD, tests, accessibilité, etc.).

## Objectifs
- Proposer une expérience de commande en ligne complète (de la découverte à la commande)
- Garantir performance, accessibilité, SEO et internationalisation
- Illustrer une architecture modulaire, typée et testée

## Stack technique
- **Nuxt 3** (Vue 3, Composition API, SSR/CSR)
- **TypeScript** (typage strict partout)
- **Pinia** (state management, panier, auth, commandes)
- **@nuxtjs/i18n** (FR/EN, switch dynamique)
- **@vite-pwa/nuxt** (PWA, manifest, service worker, offline)
- **Bootstrap 5** (UI responsive, icônes)
- **Playwright** (tests E2E)
- **Vitest** (tests unitaires stores)
- **GitHub Actions** (CI/CD)
- **Vercel** (déploiement auto)

## Fonctionnalités principales
- Liste des restaurants (SSR, SEO, filtrage, accessibilité)
- Détail restaurant & plats (SSR/ISR, SEO produit, responsive)
- Authentification (login/register, Pinia, middleware)
- Panier persistant (ajout, suppression, quantité, validation)
- Commandes passées (historique, détail)
- Internationalisation FR/EN (interface, contenus, toggle)
- PWA installable (manifest, service worker, offline)
- Tests unitaires (Pinia stores) & E2E (Playwright)
- CI/CD GitHub Actions + déploiement auto Vercel

## Structure du projet

- `app/pages/` : pages Nuxt (restaurants, plats, auth, panier, profil, etc.)
- `app/components/` : composants UI réutilisables (cards, boutons, formulaires, notifications...)
- `app/stores/` : stores Pinia (panier, user, commandes, restaurants)
- `app/modules/` : types et modules métiers
- `app/assets/` : styles SCSS, images
- `public/` : icônes, manifest, robots.txt
- `server/api/` : endpoints mockés pour la démo
- `test/` : tests unitaires (unit/) et E2E (e2e/)

## Installation & démarrage local

```bash
git clone https://github.com/SheiEthan/FastEat.git
cd FastEat
npm install
npm run dev
```

## Scripts utiles
- `npm run dev` : Lancer le serveur de dev
- `npm run build` : Build production
- `npm run preview` : Preview production locale
- `npx playwright test` : Lancer les tests E2E

## Déploiement & CI/CD
- Build et tests automatiques à chaque push sur main (GitHub Actions)
- Déploiement auto sur Vercel (https://fast-eat.vercel.app)
- Badges CI et Vercel en haut du README

## PWA
- Manifest et service worker générés automatiquement
- Application installable sur mobile/desktop
- Fonctionne offline (page d’accueil et assets principaux)

## Contribution
Les PR sont les bienvenues pour toute amélioration, correction ou nouvelle fonctionnalité.

## Licence
MIT

---

> Projet Fil Rouge MBA FullStack – Ethan Tillier