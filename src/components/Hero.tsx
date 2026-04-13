"use client"

import { motion } from "framer-motion"
import { PhoneAnimation } from "./PhoneAnimation"
import { content } from "@/content/en"

export function Hero({ restaurantName }: { restaurantName: string }) {
  const lines = content.hero.headline.split("\n")

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Base warm tone */}
        <div className="absolute inset-0 bg-[#FAF8F5]" />
        {/* Large soft green bloom — right side, behind phone */}
        <div
          className="absolute"
          style={{
            right: "-10%",
            top: "5%",
            width: "65%",
            height: "90%",
            background:
              "radial-gradient(ellipse at center, rgba(45,106,79,0.09) 0%, rgba(45,106,79,0.04) 45%, transparent 70%)",
            filter: "blur(1px)",
          }}
        />
        {/* Warm terracotta whisper — lower left */}
        <div
          className="absolute"
          style={{
            left: "-5%",
            bottom: "10%",
            width: "40%",
            height: "50%",
            background:
              "radial-gradient(ellipse at center, rgba(196,113,79,0.06) 0%, transparent 65%)",
          }}
        />
        {/* Very subtle noise grain via SVG filter */}
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
            {/* Eyebrow label */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 mb-7"
            >
              <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#2D6A4F]">
                AI for restaurants
              </span>
              <span className="w-1 h-1 rounded-full bg-[#C4714F] opacity-60" />
              <span className="text-[11px] font-medium text-[#5C564F] tracking-wide">
                Zero staff effort
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
                className="group inline-flex items-center gap-2 px-7 py-3.5 bg-[#2D6A4F] text-white font-semibold text-sm rounded-xl hover:bg-[#245940] transition-all duration-200 shadow-[0_2px_12px_rgba(45,106,79,0.35)] hover:shadow-[0_4px_20px_rgba(45,106,79,0.45)] hover:-translate-y-px"
              >
                {content.hero.ctaPrimary}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden="true"
                >
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

            {/* Social proof whisper */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-8 text-[12px] text-[#8C8279] tracking-wide"
            >
              Trusted by restaurants in Paris, Lyon &amp; London
            </motion.p>
          </motion.div>

          {/* Right — phone animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-start justify-center lg:justify-center -mt-4"
          >
            <div className="scale-[0.90] origin-top" style={{ transform: "scale(0.90) translateY(40px)", transformOrigin: "top center" }}>
              <PhoneAnimation restaurantName={restaurantName} />
            </div>
          </motion.div>

        </div>

        {/* ── Stats row ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 pt-6 border-t border-[#E8E2DA] grid grid-cols-2 md:grid-cols-4 gap-y-4"
        >
          {[
            { value: "50+",  label: "Bookings recovered per month" },
            { value: "4–7%", label: "Annual revenue increase" },
            { value: "<30s", label: "WhatsApp response time" },
            { value: "Zero", label: "Staff effort required" },
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
