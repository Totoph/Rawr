# RAWR Rebranding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand la landing page de Llynne (SaaS restaurant) en RAWR (dating app pour propriétaires de chiens), avec nouveau contenu, nouvelle palette de couleurs, et une PhoneAnimation entièrement réécrite.

**Architecture:** Toutes les modifications passent par `src/content/en.ts` (textes) et les composants individuels (couleurs, structure). La `PhoneAnimation` est réécrite pour montrer le flux RAWR (profil → swipe → match → chat → balade confirmée). `ConnectionDiagram` et `ValueProps` sont supprimés ; `Benefits` devient la section "How It Works" avec le nouveau contenu.

**Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion, Lucide React

---

## Carte des fichiers

| Fichier | Action | Responsabilité |
|---|---|---|
| `src/content/en.ts` | Réécrire | Toutes les strings du site |
| `src/app/globals.css` | Modifier | Variables CSS couleurs |
| `src/app/page.tsx` | Modifier | Structure des sections |
| `src/components/Nav.tsx` | Modifier | Logo RAWR, liens, CTA |
| `src/components/Hero.tsx` | Modifier | Texte, couleurs, stats |
| `src/components/PhoneAnimation.tsx` | Réécrire | Flux RAWR complet |
| `src/components/Benefits.tsx` | Modifier | Contenu How It Works RAWR |
| `src/components/ChatContactForm.tsx` | Modifier | Formulaire email uniquement |
| `src/components/Contact.tsx` | Modifier | Texte Early Access, couleurs |
| `src/components/FAQ.tsx` | Modifier | Questions RAWR, couleurs |
| `src/components/Footer.tsx` | Modifier | Contenu RAWR, couleurs |
| `src/components/ConnectionDiagram.tsx` | Supprimer | — |
| `src/components/ValueProps.tsx` | Supprimer | — |
| `src/components/HowItWorks.tsx` | Supprimer (ou vider) | Remplacé par Benefits |

---

## Task 1 : Réécrire `src/content/en.ts`

**Fichiers :**
- Modifier : `src/content/en.ts`

- [ ] **Step 1 : Réécrire le fichier de contenu**

Remplacer intégralement `src/content/en.ts` par :

```typescript
export const content = {
  nav: {
    logo: "RAWR",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
    ],
    cta: "Join the waitlist",
  },

  hero: {
    headline: "The dating app\nfor dog owners.",
    subheadline:
      "Create a profile for you and your dog. Swipe, match, and plan your first walk together.",
    ctaPrimary: "See how it works",
    ctaSecondary: "Join the waitlist",
  },

  howItWorks: {
    label: "How it works",
    headline: "From first swipe to first walk.",
    steps: [
      {
        number: "01",
        title: "Create your profiles",
        description:
          "Build a profile for yourself and one for your dog. Add photos, personality traits, breed, and age — show the world who you both are.",
        photo:
          "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&q=80",
        alt: "Person with their dog outdoors",
      },
      {
        number: "02",
        title: "Swipe & discover",
        description:
          "Browse profiles of dog owners near you. Swipe right if the vibe is right — for you and your dog.",
        photo:
          "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
        alt: "Two dogs running together in a park",
      },
      {
        number: "03",
        title: "Match & connect",
        description:
          "When it's mutual, it's a match. Start a conversation directly in the app and get to know each other.",
        photo:
          "https://images.unsplash.com/photo-1552053831-71594a27632d?w=800&q=80",
        alt: "Happy person holding a dog",
      },
      {
        number: "04",
        title: "Plan your first walk",
        description:
          "Organise your first date — a walk together. A natural, relaxed first meeting with no pressure.",
        photo:
          "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&q=80",
        alt: "Two people walking their dogs together",
      },
    ],
  },

  benefits: {
    label: "How it works",
    headline: "Four simple steps, from swipe to first walk.",
    cta: "See how it works",
    metrics: [
      { value: "10k+", label: "dog owners waiting" },
      { value: "5", label: "cities at launch" },
      { value: "Free", label: "to join the waitlist" },
      { value: "100%", label: "dog lovers" },
    ],
    cards: [
      {
        number: "01",
        title: "Create your profiles.",
        description:
          "One profile for you, one for your dog. Photos, personality, breed — show who you both really are.",
        icon: "https://cdn-icons-png.flaticon.com/512/3004/3004458.png",
        alt: "Profile icon",
      },
      {
        number: "02",
        title: "Swipe & discover.",
        description:
          "Browse dog owners near you. Swipe right when the connection feels right.",
        icon: "https://cdn-icons-png.flaticon.com/512/833/833472.png",
        alt: "Swipe icon",
      },
      {
        number: "03",
        title: "Match & connect.",
        description:
          "A mutual like is a match. Say hello and start the conversation.",
        icon: "https://cdn-icons-png.flaticon.com/512/2107/2107845.png",
        alt: "Match heart icon",
      },
      {
        number: "04",
        title: "Plan your first walk.",
        description:
          "Organise a walk together. A relaxed, natural first date — with your dogs leading the way.",
        icon: "https://cdn-icons-png.flaticon.com/512/3448/3448636.png",
        alt: "Walk icon",
      },
    ],
  },

  contact: {
    label: "Early Access",
    photo:
      "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=1200&q=80",
    photoAlt: "Two people walking their dogs in a park",
    questions: [
      {
        key: "email",
        prompt: "What's your email address? We'll let you know when RAWR launches.",
        optional: false,
      },
    ],
    farewell: "You're on the list! We'll reach out as soon as RAWR launches. 🐾",
    farewellSub: "We'll be in touch very soon.",
  },

  footer: {
    tagline: "Where dog owners find each other.",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "FAQ", href: "#faq" },
      { label: "Join the waitlist", href: "#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Legal Notice", href: "#" },
    ],
    copyright: "© 2026 RAWR. All rights reserved.",
  },
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/content/en.ts
git commit -m "feat: rewrite content for RAWR — dog owner dating app"
```

---

## Task 2 : Mettre à jour les variables CSS

**Fichiers :**
- Modifier : `src/app/globals.css`

- [ ] **Step 1 : Mettre à jour les variables**

Dans `src/app/globals.css`, remplacer le bloc `:root` par :

```css
:root {
  --bg: #FAF8F5;
  --surface: #F2EDE6;
  --border: #E0D8CE;
  --primary: #1A1A1A;
  --accent: #1DB954;
  --accent-hover: #17a34a;
  --text: #1C1C1A;
  --muted: #5C564F;
}
```

Et mettre à jour le bloc `@theme inline` :

```css
@theme inline {
  --color-bg: var(--bg);
  --color-surface: var(--surface);
  --color-border: var(--border);
  --color-primary: var(--primary);
  --color-accent: var(--accent);
  --color-text: var(--text);
  --color-muted: var(--muted);
}
```

Et mettre à jour `::selection` :

```css
::selection {
  background: #1DB95422;
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/app/globals.css
git commit -m "feat: update CSS variables for RAWR color palette"
```

---

## Task 3 : Mettre à jour `Nav.tsx`

**Fichiers :**
- Modifier : `src/components/Nav.tsx`

- [ ] **Step 1 : Remplacer les couleurs vertes et le CTA**

Dans `src/components/Nav.tsx` :

1. Logo — remplacer `text-[#2D6A4F]` par `text-[#1DB954]`
2. CTA desktop — remplacer `bg-[#2D6A4F]` par `bg-[#1A1A1A]` et `hover:bg-[#245940]` par `hover:bg-[#333]`
3. CTA mobile (drawer) — mêmes remplacements

Le composant Nav lit `content.nav.logo`, `content.nav.links` et `content.nav.cta` depuis `en.ts` (déjà mis à jour en Task 1). Seules les couleurs inline sont à changer.

Résultat attendu dans `Nav.tsx` :
```tsx
// Logo
className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold italic text-[#1DB954] tracking-tight shrink-0"

// CTA desktop
className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-[#1A1A1A] text-white text-[13px] font-semibold hover:bg-[#333] transition-colors shrink-0"

// CTA mobile
className="flex items-center justify-center w-full mt-4 px-5 py-3 rounded-xl bg-[#1A1A1A] text-white text-sm font-semibold hover:bg-[#333] transition-colors"
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/Nav.tsx
git commit -m "feat: update Nav colors for RAWR brand"
```

---

## Task 4 : Mettre à jour `Hero.tsx`

**Fichiers :**
- Modifier : `src/components/Hero.tsx`

- [ ] **Step 1 : Remplacer le contenu et les couleurs du Hero**

Remplacer intégralement `src/components/Hero.tsx` par :

```tsx
"use client"

import { motion } from "framer-motion"
import { PhoneAnimation } from "./PhoneAnimation"
import { content } from "@/content/en"

export function Hero() {
  const lines = content.hero.headline.split("\n")

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#FAF8F5]" />
        <div
          className="absolute"
          style={{
            right: "-10%",
            top: "5%",
            width: "65%",
            height: "90%",
            background:
              "radial-gradient(ellipse at center, rgba(29,185,84,0.07) 0%, rgba(29,185,84,0.03) 45%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-5%",
            bottom: "10%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(26,26,26,0.04) 0%, transparent 65%)",
          }}
        />
        <svg className="absolute inset-0 w-full h-full opacity-[0.025]" aria-hidden="true">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 w-full pt-28 pb-6 lg:pt-32 lg:pb-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left — copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-7"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#1DB954]">
                Dating app
              </span>
              <span className="w-1 h-1 rounded-full bg-[#1A1A1A] opacity-40" />
              <span className="text-[11px] font-medium text-[#5C564F] tracking-wide">
                For dog owners
              </span>
            </motion.div>

            {/* Headline */}
            <h1
              className="font-[family-name:var(--font-cormorant)] font-bold tracking-[-0.02em] text-[#1C1C1A] mb-7"
              style={{ fontSize: "clamp(3rem, 5.5vw, 4.5rem)", lineHeight: 1.02 }}
            >
              {lines.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h1>

            {/* Subheadline */}
            <p className="text-[1.125rem] text-[#5C564F] leading-[1.7] mb-10 max-w-[420px]">
              {content.hero.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#1DB954] text-white font-semibold text-sm rounded-xl hover:bg-[#17a34a] transition-all duration-200 shadow-[0_2px_12px_rgba(29,185,84,0.35)] hover:shadow-[0_4px_20px_rgba(29,185,84,0.45)] hover:-translate-y-px"
              >
                {content.hero.ctaPrimary}
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden="true">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center px-7 py-3.5 border border-[#D4C9BC] text-[#1C1C1A] font-semibold text-sm rounded-xl hover:bg-[#F2EDE6] hover:border-[#C4B8AB] transition-all duration-200 hover:-translate-y-px"
              >
                {content.hero.ctaSecondary}
              </a>
            </div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-[12px] text-[#8C8279] tracking-wide"
            >
              10,000+ dog owners already on the waitlist
            </motion.p>
          </motion.div>

          {/* Right — phone animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start justify-center lg:justify-center -mt-4"
          >
            <div style={{ transform: "scale(0.90) translateY(40px)", transformOrigin: "top center" }}>
              <PhoneAnimation />
            </div>
          </motion.div>

        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 pt-6 border-t border-[#E8E2DA] grid grid-cols-2 md:grid-cols-4 gap-y-4"
        >
          {[
            { value: "10k+",  label: "Dog owners waiting" },
            { value: "5",     label: "Cities at launch" },
            { value: "Free",  label: "To join the waitlist" },
            { value: "100%",  label: "Dog lovers" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.07 }}
              className="flex flex-col gap-1 items-center text-center"
            >
              <span
                className="font-[family-name:var(--font-cormorant)] font-bold text-[#1C1C1A]"
                style={{ fontSize: "clamp(1.8rem, 3vw, 2.5rem)", lineHeight: 1 }}
              >
                {stat.value}
              </span>
              <span className="text-[11px] text-[#8C8279] leading-snug max-w-[160px]">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: update Hero for RAWR — new copy, green accent, no restaurantName prop"
```

---

## Task 5 : Réécrire `PhoneAnimation.tsx`

**Fichiers :**
- Modifier : `src/components/PhoneAnimation.tsx`

- [ ] **Step 1 : Réécrire le composant**

Remplacer intégralement `src/components/PhoneAnimation.tsx` par :

```tsx
"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Stage = "profile" | "swipe" | "match" | "chat" | "confirmed" | "pause"
interface ChatMessage { from: "app" | "user"; text: string }

const STAGE_DURATIONS: Record<Stage, number> = {
  profile:   4000,
  swipe:     2500,
  match:     3500,
  chat:     14000,
  confirmed: 3500,
  pause:     1000,
}
const TOTAL = Object.values(STAGE_DURATIONS).reduce((a, b) => a + b, 0)

function getStageAt(elapsed: number): Stage {
  let acc = 0
  for (const [s, d] of Object.entries(STAGE_DURATIONS) as [Stage, number][]) {
    acc += d
    if (elapsed < acc) return s
  }
  return "profile"
}

const MSG_APPEAR    = [800, 3500, 6500, 10000]
const TYPING_WINDOW = 900

// ── Status bar icons ───────────────────────────────────────────────────────────

function SignalBars({ color }: { color: string }) {
  const heights = [4, 6, 9, 12]
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      {heights.map((h, i) => (
        <rect key={i} x={i * 4.5} y={12 - h} width={3} height={h} rx={1} fill={color} opacity={i === 3 ? 1 : 0.9} />
      ))}
    </svg>
  )
}

function BatteryIcon({ color }: { color: string }) {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={color} strokeOpacity="0.35" />
      <rect x="2" y="2" width="17" height="9" rx="2" fill={color} />
      <path d="M24.5 4.5v4a2 2 0 000-4z" fill={color} fillOpacity="0.4" />
    </svg>
  )
}

function LiveClock({ color }: { color: string }) {
  const [time, setTime] = useState(() => {
    const d = new Date()
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
  })
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date()
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em", color, fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", lineHeight: 1 }}>
      {time}
    </span>
  )
}

function StatusBar({ onDark }: { onDark?: boolean }) {
  const fg = onDark ? "white" : "#1C1C1A"
  return (
    <div style={{ height: 50, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", background: "transparent" }}>
      <div style={{ display: "flex", alignItems: "center", width: 60 }}>
        <LiveClock color={fg} />
      </div>
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 74, height: 22, background: "#000", borderRadius: 12, zIndex: 10 }} />
      <div style={{ width: 60, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
        <SignalBars color={fg} />
        <BatteryIcon color={fg} />
      </div>
    </div>
  )
}

// ── Dog profile card ───────────────────────────────────────────────────────────

function DogProfileCard({ animateOut }: { animateOut: boolean }) {
  return (
    <motion.div
      animate={animateOut ? { x: 320, rotate: 20, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
      transition={animateOut ? { duration: 0.55, ease: [0.32, 0, 0.67, 0] } : { duration: 0.3 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #e8f5e9 0%, #faf8f5 60%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Dog photo placeholder */}
      <div style={{ height: 200, background: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)", position: "relative", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 72 }}>🐕</span>
        {animateOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "#1DB954",
              color: "white",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.1em",
              padding: "5px 14px",
              borderRadius: 999,
              border: "2.5px solid white",
              transform: "rotate(-12deg)",
            }}
          >
            LIKE
          </motion.div>
        )}
        {/* Distance badge */}
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.45)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 999, backdropFilter: "blur(4px)" }}>
          1.2 km away
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", fontFamily: "-apple-system, sans-serif" }}>Max</span>
          <span style={{ fontSize: 13, color: "#5C564F" }}>3 y.o. · Golden Retriever</span>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["Playful", "Morning walks", "Loves parks"].map((tag) => (
            <span key={tag} style={{ fontSize: 10, fontWeight: 600, background: "rgba(29,185,84,0.1)", color: "#17a34a", border: "1px solid rgba(29,185,84,0.25)", borderRadius: 999, padding: "2px 8px" }}>
              {tag}
            </span>
          ))}
        </div>

        {/* Owner mini-profile */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #1A1A1A, #444)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "white", fontSize: 13 }}>S</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A1A" }}>Sophie, 28</div>
            <div style={{ fontSize: 10, color: "#8C8279" }}>Dog lover · Paris</div>
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: "auto", paddingTop: 8 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "white", border: "2px solid #FF3B30", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(255,59,48,0.2)" }}>
            <span style={{ fontSize: 22 }}>✕</span>
          </div>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px_14px rgba(29,185,84,0.35)" }}>
            <span style={{ fontSize: 22 }}>♥</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PhoneAnimation() {
  const [elapsed, setElapsed] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [typingSide, setTypingSide] = useState<"left" | "right" | null>(null)
  const rafRef = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleMessages, typingSide])

  const messages: ChatMessage[] = [
    { from: "app",  text: "Hey! Your dogs would love each other 🐕" },
    { from: "user", text: "Haha totally! Want to meet this weekend?" },
    { from: "app",  text: "Saturday morning at Parc Monceau?" },
    { from: "user", text: "Perfect, see you at 10am! 🐾" },
  ]

  useEffect(() => {
    const startTime = performance.now()
    function tick(now: number) {
      const e = (now - startTime) % TOTAL
      setElapsed(e)

      const chatStart = STAGE_DURATIONS.profile + STAGE_DURATIONS.swipe + STAGE_DURATIONS.match
      const chatEnd   = chatStart + STAGE_DURATIONS.chat

      if (e >= chatStart && e < chatEnd) {
        const c = e - chatStart
        let count = 0
        for (const t of MSG_APPEAR) { if (c >= t) count++ }
        setVisibleMessages(count)

        let typing: "left" | "right" | null = null
        if (count < 1 && c >= MSG_APPEAR[0] - TYPING_WINDOW) typing = "left"
        if (count >= 1 && count < 2 && c >= MSG_APPEAR[1] - TYPING_WINDOW) typing = "right"
        if (count >= 2 && count < 3 && c >= MSG_APPEAR[2] - TYPING_WINDOW) typing = "left"
        if (count >= 3 && count < 4 && c >= MSG_APPEAR[3] - TYPING_WINDOW) typing = "right"
        setTypingSide(typing)
      } else {
        setVisibleMessages(0)
        setTypingSide(null)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const stage = getStageAt(elapsed)
  const isChat = stage === "chat" || stage === "confirmed" || stage === "pause"

  const SHELL_W  = 248
  const SHELL_H  = 504
  const SHELL_R  = 44
  const BEZEL    = 9
  const SCREEN_R = SHELL_R - BEZEL + 1

  return (
    <div className="relative flex items-center justify-center w-full" style={{ height: SHELL_H + 32 }}>
      {/* Ambient glow */}
      <div className="absolute pointer-events-none" style={{ width: SHELL_W + 100, height: SHELL_H + 60, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse at center, rgba(29,185,84,0.11) 0%, transparent 65%)", filter: "blur(20px)" }} />

      {/* iPhone shell */}
      <motion.div
        style={{
          position: "relative",
          width: SHELL_W,
          height: SHELL_H,
          borderRadius: SHELL_R,
          flexShrink: 0,
          background: "linear-gradient(160deg, #3a3a3a 0%, #1e1e1e 50%, #111 100%)",
          boxShadow: ["inset 1.5px 1.5px 0 rgba(255,255,255,0.13)", "inset -1px -1px 0 rgba(0,0,0,0.55)", "0 28px 70px rgba(0,0,0,0.35)", "0 6px 18px rgba(0,0,0,0.20)"].join(", "),
        }}
      >
        {/* Buttons */}
        {[{ top: 88, h: 24 }, { top: 122, h: 40 }, { top: 172, h: 40 }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: -3.5, top: b.top, width: 3.5, height: b.h, background: "linear-gradient(to right, #151515, #2a2a2a)", borderRadius: "2px 0 0 2px" }} />
        ))}
        <div style={{ position: "absolute", right: -3.5, top: 118, width: 3.5, height: 58, background: "linear-gradient(to left, #151515, #2a2a2a)", borderRadius: "0 2px 2px 0" }} />

        {/* Screen bezel */}
        <div style={{ position: "absolute", inset: BEZEL, borderRadius: SCREEN_R, overflow: "hidden", background: "#000" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: SCREEN_R, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>

            {/* Status bar */}
            <div style={{ background: isChat ? "#1A1A1A" : "transparent", flexShrink: 0 }}>
              <StatusBar onDark={isChat} />
            </div>

            {/* Screen content */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <AnimatePresence mode="wait">

                {/* PROFILE */}
                {stage === "profile" && (
                  <motion.div key="profile"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flex: 1, position: "relative", overflow: "hidden" }}
                  >
                    {/* RAWR app header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#FAF8F5", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
                      <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 18, fontWeight: 700, fontStyle: "italic", color: "#1DB954" }}>RAWR</span>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 14 }}>🔔</span>
                        <span style={{ fontSize: 14 }}>💬</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, top: 38 }}>
                      <DogProfileCard animateOut={false} />
                    </div>
                  </motion.div>
                )}

                {/* SWIPE */}
                {stage === "swipe" && (
                  <motion.div key="swipe"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flex: 1, position: "relative", overflow: "hidden", background: "#FAF8F5" }}
                  >
                    {/* Card behind (next profile) */}
                    <div style={{ position: "absolute", inset: 0, top: 38, transform: "scale(0.94)", transformOrigin: "top center", opacity: 0.6 }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #fce4ec 0%, #faf8f5 60%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 72 }}>🐩</span>
                        <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>Luna, 2 y.o.</div>
                        <div style={{ fontSize: 12, color: "#5C564F" }}>Poodle · 0.8 km</div>
                      </div>
                    </div>
                    {/* RAWR header */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#FAF8F5", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
                      <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 18, fontWeight: 700, fontStyle: "italic", color: "#1DB954" }}>RAWR</span>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 14 }}>🔔</span>
                        <span style={{ fontSize: 14 }}>💬</span>
                      </div>
                    </div>
                    {/* Swiping card */}
                    <div style={{ position: "absolute", inset: 0, top: 38 }}>
                      <DogProfileCard animateOut={true} />
                    </div>
                  </motion.div>
                )}

                {/* MATCH */}
                {stage === "match" && (
                  <motion.div key="match"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ flex: 1, background: "#0f0f0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 20px" }}
                  >
                    {/* Confetti dots */}
                    {[...Array(8)].map((_, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], x: Math.cos(i * 45 * Math.PI / 180) * 60, y: Math.sin(i * 45 * Math.PI / 180) * 60 }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 1.2 }}
                        style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: i % 2 === 0 ? "#1DB954" : "#fff", top: "40%", left: "50%" }}
                      />
                    ))}
                    {/* Two dog avatars */}
                    <div style={{ display: "flex", alignItems: "center", gap: -8 }}>
                      <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #a5d6a7, #66bb6a)", border: "3px solid #0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, zIndex: 2 }}>
                        🐕
                      </motion.div>
                      <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #f8bbd0, #f48fb1)", border: "3px solid #0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginLeft: -12 }}>
                        🐩
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 28, fontWeight: 700, fontStyle: "italic", color: "#1DB954", lineHeight: 1.1 }}>
                        It&apos;s a Match!
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
                        You and Sophie both liked each other
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                      style={{ background: "#1DB954", color: "white", fontWeight: 700, fontSize: 13, padding: "10px 28px", borderRadius: 999, cursor: "pointer" }}>
                      Send a message
                    </motion.div>
                  </motion.div>
                )}

                {/* CHAT */}
                {stage === "chat" && (
                  <motion.div key="chat"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
                  >
                    {/* Chat header */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 8px", background: "#1A1A1A" }}>
                      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                        <path d="M7.5 1.5L1.5 7.5l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #a5d6a7, #66bb6a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
                        🐕
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>Sophie & Max</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>1.2 km · online</div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} style={{ flex: 1, padding: "8px 10px", background: "#EBE0D6", display: "flex", flexDirection: "column", gap: 5, overflowY: "auto", scrollBehavior: "smooth" }}>
                      <AnimatePresence>
                        {messages.slice(0, visibleMessages).map((msg, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.93 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.27, type: "spring", stiffness: 300, damping: 26 }}
                            style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}
                          >
                            <div style={{
                              maxWidth: "80%", padding: "7px 10px",
                              borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                              background: msg.from === "user" ? "#DCF8C6" : "#fff",
                              fontSize: 12, lineHeight: 1.45, color: "#1C1C1A",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                            }}>
                              {msg.text}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
                                <span style={{ fontSize: 9.5, color: "#8C8279" }}>now</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {typingSide !== null && (
                          <motion.div key="typing"
                            initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", justifyContent: typingSide === "right" ? "flex-end" : "flex-start" }}
                          >
                            <div style={{ padding: "9px 13px", borderRadius: typingSide === "right" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: typingSide === "right" ? "#DCF8C6" : "#fff", display: "flex", gap: 4, alignItems: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
                              {[0, 1, 2].map(j => (
                                <motion.div key={j} style={{ width: 5.5, height: 5.5, borderRadius: "50%", background: "#8C8279" }}
                                  animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.72, delay: j * 0.14, ease: "easeInOut" }} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {/* CONFIRMED */}
                {(stage === "confirmed" || stage === "pause") && (
                  <motion.div key="confirmed"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.38 }}
                    style={{ flex: 1, background: "#f2f2f7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 22px", gap: 16 }}
                  >
                    <motion.div
                      initial={{ scale: 0.45, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 270, damping: 18, delay: 0.08 }}
                      style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(145deg, #1DB954, #17a34a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 26px rgba(29,185,84,0.34)" }}
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M8 17l6 6 12-12" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.36 }}
                      style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1A", letterSpacing: "-0.02em", fontFamily: "-apple-system, sans-serif", marginBottom: 6 }}>
                        Walk confirmed! 🐾
                      </div>
                      <div style={{ fontSize: 13, color: "#5C564F", lineHeight: 1.55 }}>Saturday · 10:00 am</div>
                      <div style={{ fontSize: 11, color: "#8C8279", marginTop: 3 }}>Parc Monceau, Paris</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.36 }}
                      style={{ width: "100%", background: "white", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(29,185,84,0.15)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                      {[["With", "Sophie & Max"], ["Date", "Saturday · 10:00 am"], ["Location", "Parc Monceau"]].map(([k, v], i, arr) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: i < arr.length - 1 ? 8 : 0, marginBottom: i < arr.length - 1 ? 8 : 0, borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                          <span style={{ fontSize: 10.5, color: "#8C8279", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                          <span style={{ fontSize: 11.5, color: "#1C1C1A", fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58 }}
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#1DB954", fontWeight: 600 }}>
                      <span>🐾</span>
                      <span>Organised via RAWR</span>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Glare */}
        <div style={{ position: "absolute", inset: BEZEL, borderRadius: SCREEN_R, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)", pointerEvents: "none", zIndex: 20 }} />
      </motion.div>

      {/* RAWR badge */}
      <AnimatePresence>
        {(stage === "match" || stage === "chat") && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 4 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ position: "absolute", right: -80, top: 52, background: "#1A1A1A", color: "white", fontSize: 10, fontWeight: 700, padding: "5px 11px", borderRadius: 999, boxShadow: "0 4px 14px rgba(0,0,0,0.3)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
          >
            🐾 RAWR
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
```

- [ ] **Step 2 : Commit**

```bash
git add src/components/PhoneAnimation.tsx
git commit -m "feat: rewrite PhoneAnimation with RAWR dog dating flow"
```

---

## Task 6 : Mettre à jour `Benefits.tsx` (section How It Works)

**Fichiers :**
- Modifier : `src/components/Benefits.tsx`

- [ ] **Step 1 : Mettre à jour les couleurs et icônes**

Dans `src/components/Benefits.tsx`, remplacer les couleurs et icônes des 4 étapes. Remplacer le tableau `processSteps` par :

```tsx
import { Dog, ScanHeart, Heart, MapPin } from "lucide-react"

const processSteps = [
  {
    number: "01",
    title: "Create your profiles",
    description:
      "Build a profile for yourself and one for your dog. Add photos, personality traits, breed, and age — show the world who you both are.",
    icon: Dog,
    iconBg: "from-[#1DB954] to-[#17a34a]",
  },
  {
    number: "02",
    title: "Swipe & discover",
    description:
      "Browse profiles of dog owners near you. Swipe right when the vibe feels right — for you and your dog.",
    icon: ScanHeart,
    iconBg: "from-[#1A1A1A] to-[#333]",
  },
  {
    number: "03",
    title: "Match & connect",
    description:
      "A mutual like is a match. Start a conversation and get to know each other before the first walk.",
    icon: Heart,
    iconBg: "from-[#1DB954] to-[#17a34a]",
  },
  {
    number: "04",
    title: "Plan your first walk",
    description:
      "Organise your first date — a walk with your dogs. Natural, relaxed, and no pressure.",
    icon: MapPin,
    iconBg: "from-[#1A1A1A] to-[#333]",
  },
]
```

Remplacer aussi dans le JSX la ligne de la vertical line et du dot de couleur `#C4714F` :
- La ligne verticale : `background: "linear-gradient(to bottom, transparent, #1DB95450 8%, #1DB95450 92%, transparent)"`
- Le dot : `border-[#1DB954]`
- Le badge label : `bg-[#1DB954]/10 border-[#1DB954]/20` et `text-[#1DB954]`

- [ ] **Step 2 : Commit**

```bash
git add src/components/Benefits.tsx
git commit -m "feat: update Benefits/HowItWorks with RAWR steps and colors"
```

---

## Task 7 : Mettre à jour `ChatContactForm.tsx` et `Contact.tsx`

**Fichiers :**
- Modifier : `src/components/ChatContactForm.tsx`
- Modifier : `src/components/Contact.tsx`

- [ ] **Step 1 : Mettre à jour les couleurs dans `ChatContactForm.tsx`**

Remplacer toutes les occurrences de couleur verte dans `ChatContactForm.tsx` :
- `bg-[#2D6A4F]` → `bg-[#1A1A1A]`
- `hover:bg-[#245940]` → `hover:bg-[#333]`
- `focus:border-[#2D6A4F]` → `focus:border-[#1DB954]`
- `bg-[#C4714F]` (bulle user) → `bg-[#1DB954]`

L'avatar "L" → changer en avatar "R" (RAWR) :
```tsx
// Header
<span className="text-white font-[family-name:var(--font-cormorant)] text-lg font-bold italic">R</span>
// ...titre
<div className="text-white text-sm font-semibold">RAWR</div>
<div className="text-white/70 text-xs">Early access</div>

// Avatar dans les messages
<span className="text-white text-xs font-bold font-[family-name:var(--font-cormorant)] italic">R</span>
```

- [ ] **Step 2 : Mettre à jour `Contact.tsx`**

Remplacer dans `Contact.tsx` :
- Le badge : `bg-[#C4714F]/10 border-[#C4714F]/20 text-[#C4714F]` → `bg-[#1DB954]/10 border-[#1DB954]/20 text-[#1DB954]`
- Le h2 : `"Ready to recover every reservation?"` → `"Be the first to find your match."`
- Ajouter sous le h2 un paragraphe : `"RAWR is launching soon. Join the waitlist and get access before everyone else."`
- Le texte de la citation photo : `"Every reservation, recovered."` → `"Where dog owners find each other."`

- [ ] **Step 3 : Commit**

```bash
git add src/components/ChatContactForm.tsx src/components/Contact.tsx
git commit -m "feat: update Contact section for RAWR waitlist — email only"
```

---

## Task 8 : Mettre à jour `FAQ.tsx`

**Fichiers :**
- Modifier : `src/components/FAQ.tsx`

- [ ] **Step 1 : Remplacer les questions et les couleurs**

Dans `src/components/FAQ.tsx`, remplacer le tableau `faqs` par :

```tsx
const faqs = [
  {
    question: "Is RAWR free to use?",
    answer:
      "Yes — RAWR is free to download and use. Creating your profile, swiping, and matching are all free. Premium features may be introduced in the future.",
  },
  {
    question: "Do I need a dog to join?",
    answer:
      "Yes! RAWR is built for dog owners. You'll create a profile for yourself and one for your dog — your dog is half the match.",
  },
  {
    question: "How does the matching work?",
    answer:
      "You browse profiles of dog owners near you and swipe right if you're interested. When both people swipe right, it's a match and you can start chatting.",
  },
  {
    question: "What breeds are on RAWR?",
    answer:
      "All breeds are welcome! From tiny Chihuahuas to gentle giants — every dog finds their match on RAWR.",
  },
  {
    question: "When is RAWR launching?",
    answer:
      "We're launching soon in Paris, Lyon, London, Berlin, and Amsterdam. Join the waitlist to be the first to know.",
  },
  {
    question: "How do I plan a first walk?",
    answer:
      "Once you match, you can chat directly in the app and organise a walk together. Most couples use the built-in suggestions for dog-friendly parks nearby.",
  },
]
```

Remplacer aussi les couleurs `#C4714F` dans le JSX par `#1DB954` :
- Badge : `bg-[#C4714F]/10 border-[#C4714F]/20 text-[#C4714F]` → `bg-[#1DB954]/10 border-[#1DB954]/20 text-[#1DB954]`
- Chevron button : `border-[#C4714F]/30 bg-[#C4714F]/5 text-[#C4714F] group-hover:bg-[#C4714F]/10` → `border-[#1A1A1A]/30 bg-[#1A1A1A]/5 text-[#1A1A1A] group-hover:bg-[#1A1A1A]/10`
- Hover question text : `group-hover:text-[#C4714F]` → `group-hover:text-[#1DB954]`
- Texte italic du h2 : `text-[#C4714F]` → `text-[#1DB954]`
- Ajouter `id="faq"` sur la `<section>`

- [ ] **Step 2 : Commit**

```bash
git add src/components/FAQ.tsx
git commit -m "feat: update FAQ with RAWR questions and green accent"
```

---

## Task 9 : Mettre à jour `Footer.tsx`

**Fichiers :**
- Modifier : `src/components/Footer.tsx`

- [ ] **Step 1 : Mettre à jour le logo et les couleurs**

Dans `src/components/Footer.tsx`, remplacer :
- `text-[#2D6A4F]` → `text-[#1DB954]`
- `Llynne` → `RAWR` (le texte hardcodé ligne 11)

- [ ] **Step 2 : Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: update Footer for RAWR brand"
```

---

## Task 10 : Mettre à jour `page.tsx` — supprimer les composants inutilisés

**Fichiers :**
- Modifier : `src/app/page.tsx`
- Supprimer : `src/components/ConnectionDiagram.tsx`
- Supprimer : `src/components/ValueProps.tsx`

- [ ] **Step 1 : Réécrire `page.tsx`**

Remplacer `src/app/page.tsx` par :

```tsx
import { Nav } from "@/components/Nav"
import { Hero } from "@/components/Hero"
import { Benefits } from "@/components/Benefits"
import { Contact } from "@/components/Contact"
import { FAQ } from "@/components/FAQ"
import { Footer } from "@/components/Footer"

export default async function Home() {
  return (
    <main className="bg-[#FAF8F5] overflow-x-hidden">
      <Nav />
      <Hero />
      <Benefits />
      <Contact />
      <FAQ />
      <Footer />
    </main>
  )
}
```

- [ ] **Step 2 : Supprimer les fichiers inutilisés**

```bash
rm src/components/ConnectionDiagram.tsx
rm src/components/ValueProps.tsx
```

- [ ] **Step 3 : Commit**

```bash
git add src/app/page.tsx
git add -u src/components/ConnectionDiagram.tsx src/components/ValueProps.tsx
git commit -m "feat: update page structure for RAWR — remove unused components"
```

---

## Task 11 : Vérification finale

- [ ] **Step 1 : Lancer le serveur de dev**

```bash
npm run dev
```

Ouvrir `http://localhost:3000` et vérifier visuellement :
- Logo "RAWR" en vert `#1DB954` dans la Nav
- Headline "The dating app for dog owners." dans le Hero
- Animation téléphone : profil chien → swipe → match → chat → balade confirmée
- Section How It Works avec 4 étapes RAWR
- Section Contact avec formulaire email uniquement
- FAQ avec 6 questions RAWR
- Footer "RAWR" et tagline "Where dog owners find each other."
- Aucune occurrence de "Llynne" visible sur la page
- Aucune couleur verte foncée `#2D6A4F` résiduelle

- [ ] **Step 2 : Vérifier qu'il n'y a pas d'occurrences résiduelles de "Llynne"**

```bash
grep -r "Llynne" src/ --include="*.tsx" --include="*.ts"
```

Résultat attendu : aucune ligne.

- [ ] **Step 3 : Vérifier qu'il n'y a pas d'occurrences résiduelles de `#2D6A4F`**

```bash
grep -r "2D6A4F" src/ --include="*.tsx" --include="*.ts" --include="*.css"
```

Résultat attendu : aucune ligne.

- [ ] **Step 4 : Commit final si tout est propre**

```bash
git add -A
git commit -m "chore: final cleanup and verification pass for RAWR rebranding"
```
