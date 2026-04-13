export const content = {
  nav: {
    logo: "Llynne",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Contact", href: "#contact" },
    ],
    cta: "Get in touch",
  },

  hero: {
    headline: "Never miss a\nreservation again.",
    subheadline:
      "A missed call is a lost booking. Llynne sends an automatic WhatsApp to your guest — in seconds.",
    ctaPrimary: "See how it works",
    ctaSecondary: "Get in touch",
  },

  howItWorks: {
    label: "How it works",
    headline: "From missed call to confirmed booking — in seconds.",
    steps: [
      {
        number: "01",
        title: "Your line receives a missed call",
        description:
          "No one picks up. The guest is about to move on and try somewhere else.",
        photo:
          "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
        alt: "Restaurant staff at the front of house",
      },
      {
        number: "02",
        title: "Llynne sends an instant WhatsApp",
        description:
          "Within seconds, your guest receives a personalised message — warm, professional, on your behalf.",
        photo:
          "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
        alt: "Person reading a WhatsApp message on phone",
      },
      {
        number: "03",
        title: "The guest confirms their booking",
        description:
          "They reply directly in the conversation. Llynne handles the exchange and locks in the reservation.",
        photo:
          "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80",
        alt: "Elegant restaurant dining room",
      },
      {
        number: "04",
        title: "Your team sees it — nothing else to do",
        description:
          "The reservation lands in your existing system. Your staff never had to lift a finger.",
        photo:
          "https://images.unsplash.com/photo-1600565193348-f74bd3960d29?w=800&q=80",
        alt: "Restaurant manager reviewing bookings",
      },
    ],
  },

  benefits: {
    label: "How it works",
    headline: "A simple 4-step flow, from missed call to confirmed table.",
    cta: "See how it works",
    metrics: [
      { value: "50+", label: "bookings recovered per month" },
      { value: "+4–7%", label: "annual revenue increase" },
      { value: "Zero", label: "staff intervention required" },
    ],
    cards: [
      {
        number: "01",
        title: "A guest calls while your team is busy.",
        description:
          "The call is missed, but the booking intent is still there. Llynne catches the opportunity before it disappears.",
        icon:
          "https://cdn-icons-png.flaticon.com/512/7269/7269995.png",
        alt: "Missed phone call icon",
      },
      {
        number: "02",
        title: "Llynne sends a WhatsApp in seconds.",
        description:
          "The guest gets a warm, branded message automatically. No voicemail, no waiting, no lost chance.",
        icon:
          "https://cdn-icons-png.flaticon.com/512/733/733585.png",
        alt: "Chat message icon",
      },
      {
        number: "03",
        title: "They reply and confirm the reservation.",
        description:
          "The conversation stays simple and personal. Guests answer fast because it feels natural and familiar.",
        icon:
          "https://cdn-icons-png.flaticon.com/512/5610/5610944.png",
        alt: "Confirmation check icon",
      },
      {
        number: "04",
        title: "The reservation lands in your system.",
        description:
          "Your team sees the booking where it belongs. No manual work, no extra steps, no missed revenue.",
        icon:
          "https://cdn-icons-png.flaticon.com/512/3144/3144456.png",
        alt: "Calendar booking icon",
      },
    ],
  },

  integrations: {
    label: "Integrations",
    headline: "Plugs into your existing tools.",
    subheadline:
      "Llynne connects to all major reservation platforms and telecom providers. No new software to learn.",
    note: "API access required. Additional costs may apply.",
  },

  contact: {
    label: "Contact",
    photo:
      "https://images.unsplash.com/photo-1424847651672-bf20a4b0982b?w=1200&q=80",
    photoAlt: "Warm bistro ambiance",
    questions: [
      { key: "name", prompt: "Hi! 👋 What's your name?" },
      { key: "restaurant", prompt: "Nice to meet you, {name}! What's your restaurant called?" },
      { key: "email", prompt: "Got it. What's the best email to reach you?" },
      { key: "phone", prompt: "And your phone number?" },
      {
        key: "message",
        prompt: "Anything you'd like to tell us? (optional — press Enter to skip)",
        optional: true,
      },
    ],
    farewell: "Perfect! We'll be in touch very soon. 🍽️",
    farewellSub: "We typically respond within one business day.",
  },

  footer: {
    tagline: "Every reservation, recovered.",
    links: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Integrations", href: "#integrations" },
      { label: "Contact", href: "#contact" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms & Conditions", href: "#" },
      { label: "Legal Notice", href: "#" },
    ],
    copyright: "© 2025 Llynne. All rights reserved.",
  },
}
