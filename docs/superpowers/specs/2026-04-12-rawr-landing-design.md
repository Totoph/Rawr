# RAWR — Landing Page Design Spec
**Date :** 2026-04-12  
**Statut :** Approuvé

---

## 1. Contexte & Objectif

RAWR est une application de rencontre premium destinée aux célibataires propriétaires de chiens. Le site web est une landing page marketing dont l'unique objectif est de **collecter des inscriptions à la liste d'attente** (early access) avant le lancement de l'app.

**Public cible :** Célibataires qui cherchent une relation sérieuse et qui possèdent un chien.  
**Ton :** Premium, sérieux, élégant — comme une app de rencontre haut de gamme, avec les chiens comme point de connexion.

---

## 2. Identité visuelle

### Palette de couleurs
| Rôle | Valeur | Usage |
|---|---|---|
| Fond global | `#FAF8F5` | Background de toutes les sections |
| Primaire / texte fort | `#1A1A1A` | Titres, éléments UI forts, CTA principaux |
| Accent vert | `#1DB954` | Boutons primaires, highlights, badges |
| Accent vert (hover) | `#17a34a` | Hover sur les éléments verts |
| Texte secondaire | `#5C564F` | Sous-titres, paragraphes |
| Texte tertiaire | `#8C8279` | Labels, métadonnées |
| Surface | `#F2EDE6` | Cards, fonds de sections secondaires |
| Bordure | `#E0D8CE` | Séparateurs, bordures de cards |

### Typographie
- **Titres** : Cormorant Garamond (variable `--font-cormorant`) — élégant, serif premium
- **Corps** : Plus Jakarta Sans (variable `--font-jakarta`) — moderne, lisible

### Logo
- Texte : **RAWR** (tout en majuscules)
- Style : Cormorant, italic, bold, couleur accent vert `#1DB954`

### Remplacement des couleurs vertes existantes
- Toutes les occurrences de `#2D6A4F` → `#1DB954`
- Toutes les occurrences de `#245940` → `#17a34a`
- Toutes les occurrences de `rgba(45,106,79,...)` → `rgba(29,185,84,...)`
- Retirer les dégradés verts dans les backgrounds Hero (remplacer par neutre ou supprimer)

---

## 3. Structure des sections

### 3.1 Nav
- Logo : **RAWR** (Cormorant italic, vert)
- Liens : "How it works", "Profiles", "FAQ"
- CTA : "Join the waitlist" (bouton noir ou vert)
- Comportement : identique à l'existant (glassmorphism, floating pill)

### 3.2 Hero
- **Headline** : "The dating app for dog owners."
- **Sous-headline** : "Create a profile for you and your dog. Swipe, match, and plan your first walk together."
- **CTA primaire** : "See how it works" → ancre `#how-it-works`
- **CTA secondaire** : "Join the waitlist" → ancre `#contact`
- **Colonne droite** : PhoneAnimation (voir section 5)
- **Stats row** : 4 métriques clés (ex. "10k+ dog owners", "5 cities", "Free to join", "Match in minutes")
- Retirer le social proof "Trusted by restaurants" → remplacer par une stat RAWR

### 3.3 How It Works (Comment ça marche)
4 étapes illustrées avec photo et numéro :
1. **Create your profiles** — Un profil pour toi, un profil pour ton chien. Photos, traits de caractère, race, âge.
2. **Swipe & discover** — Parcours les profils de propriétaires et leurs chiens. Swipe à droite si ça te parle.
3. **Match & connect** — Quand c'est réciproque, c'est un match. Lance la conversation directement dans l'app.
4. **Plan your first walk** — Organisez votre première balade ensemble. Un premier date naturel et sans pression.

### 3.4 Profiles (Aperçu profils)
Section visuelle illustrant les profils :
- Cards de profil avec : photo du chien, nom du chien, race, âge, quelques tags de caractère (ex. "Playful", "Morning walks", "Loves big dogs")
- En dessous : mini-profil du proprio avec prénom, âge, quelques traits personnels
- 2–3 cards en mise en page horizontale scrollable ou grille
- Objectif : montrer le produit sans qu'il soit encore disponible

### 3.5 Early Access / Waitlist (Contact)
- **Label** : "Early Access"
- **Headline** : "Be the first to find your match."
- **Sous-headline** : "RAWR is launching soon. Join the waitlist and get access before everyone else."
- **Formulaire chat** (reprend le composant ChatContactForm existant) avec une seule question :
  1. "What's your email address? We'll let you know when RAWR launches."
- **Message de fin** : "You're on the list! We'll reach out as soon as RAWR launches. 🐾"
- Photo de fond : image lifestyle (propriétaire de chien en balade)

### 3.6 FAQ
Questions pertinentes pour RAWR :
- "Is RAWR free to use?"
- "What breeds are on RAWR?"
- "Do I need a dog to join?"
- "How does the matching work?"
- "When is RAWR launching?"

### 3.7 Footer
- Tagline : "Where dog owners find each other."
- Liens : How it works, Profiles, FAQ, Join the waitlist
- Legal : Privacy Policy, Terms & Conditions
- Copyright : "© 2026 RAWR. All rights reserved."

---

## 4. Changements de contenu dans `src/content/en.ts`

Réécrire l'intégralité du fichier `en.ts` pour remplacer tout le contenu Llynne par le contenu RAWR selon les sections ci-dessus. Supprimer les clés `integrations` (ConnectionDiagram non utilisé dans la nouvelle structure).

---

## 5. PhoneAnimation — Nouveau flux RAWR

### Séquence (boucle continue)
| Stage | Durée | Description |
|---|---|---|
| `profile` | 4 000 ms | Écran de profil — photo chien + infos + propriétaire |
| `swipe` | 2 500 ms | Animation de swipe vers la droite (like) |
| `match` | 3 500 ms | Écran "It's a Match!" avec les deux avatars |
| `chat` | 14 000 ms | 4 messages s'affichent progressivement pour organiser une balade |
| `confirmed` | 3 500 ms | Carte récapitulative de la balade confirmée |
| `pause` | 1 000 ms | Pause avant reset |

### Écran `profile`
- Header : barre de navigation de l'app RAWR (fond noir ou vert)
- Photo principale : placeholder d'un chien (image Unsplash)
- Nom du chien + race + âge
- Tags : "Playful · Golden Retriever · 3 y.o."
- Mini-profil proprio : prénom, âge, distance
- Boutons : ✕ (rouge) et ♥ (vert) en bas

### Écran `swipe`
- La carte de profil s'anime vers la droite avec rotation légère
- Badge vert "LIKE" apparaît en overlay
- Fond : carte suivante visible en dessous (stack effect)

### Écran `match`
- Fond : noir profond ou dégradé sombre
- Texte : "It's a Match!" en grand, Cormorant italic
- Deux avatars circulaires (chien 1 + chien 2) qui s'approchent
- CTA : "Send a message" (bouton vert)

### Écran `chat`
- Interface de messagerie simple (style SMS/iMessage)
- 4 messages progressifs pour organiser une balade :
  1. App (gauche) : "Hey! Your dogs would love each other 🐕"
  2. User (droite) : "Haha totally! Want to meet this weekend?"
  3. App (gauche) : "Saturday morning at Parc Monceau?"
  4. User (droite) : "Perfect, see you at 10am! 🐾"

### Écran `confirmed`
- Check vert animé
- "Walk confirmed!"
- Détails : "Saturday · 10:00 am · Parc Monceau"

### Couleurs dans PhoneAnimation
- Header de l'app : `#1A1A1A` (noir profond) au lieu de `#2D6A4F`
- Badges/accents : `#1DB954` (vert vif)
- Messages envoyés : bulle verte claire (conserver `#DCF8C6` ou adapter)
- Bouton like : `#1DB954`

---

## 6. Composants à conserver / modifier / supprimer

| Composant | Action |
|---|---|
| `Nav.tsx` | Modifier — logo, liens, CTA |
| `Hero.tsx` | Modifier — texte, couleurs, stats row |
| `PhoneAnimation.tsx` | Réécrire — nouveau flux RAWR |
| `HowItWorks.tsx` | Modifier — nouveau contenu |
| `Benefits.tsx` | Renommer/repurposer en `Profiles.tsx` |
| `ValueProps.tsx` | Supprimer ou réutiliser pour Profiles |
| `ConnectionDiagram.tsx` | Supprimer — non pertinent |
| `Contact.tsx` / `ChatContactForm.tsx` | Modifier — nouveau formulaire waitlist |
| `FAQ.tsx` | Modifier — nouvelles questions |
| `Footer.tsx` | Modifier — nouveau contenu |
| `page.tsx` | Modifier — nouvelle structure de sections |

---

## 7. Fichiers à modifier

- `src/content/en.ts` — réécriture complète
- `src/app/globals.css` — mise à jour variables CSS (`--primary` → `#1A1A1A`, garder `--accent` vert)
- `src/app/page.tsx` — nouvelle structure de sections
- `src/components/Nav.tsx` — logo + liens + CTA
- `src/components/Hero.tsx` — texte + couleurs + stats
- `src/components/PhoneAnimation.tsx` — réécriture complète du flux
- `src/components/HowItWorks.tsx` — nouveau contenu
- `src/components/Benefits.tsx` — repurposer en section Profiles
- `src/components/Contact.tsx` + `ChatContactForm.tsx` — formulaire waitlist
- `src/components/FAQ.tsx` — nouvelles questions
- `src/components/Footer.tsx` — nouveau contenu
- Supprimer `src/components/ConnectionDiagram.tsx` et retirer de `page.tsx`

---

## 8. Ce qui ne change pas

- Architecture Next.js App Router
- Framer Motion pour les animations
- Tailwind CSS pour le styling
- Structure glassmorphism de la Nav
- Composant `ChatContactForm` (logique réutilisée, contenu changé)
- Fonts (Cormorant + Jakarta)
- Fond global `#FAF8F5`
