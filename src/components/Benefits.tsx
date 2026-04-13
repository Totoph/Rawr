"use client"

import { motion } from "framer-motion"
import { Dog, ScanHeart, Heart, MapPin } from "lucide-react"
import { content } from "@/content/en"

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

export function Benefits() {
  return (
    <section id="how-it-works" className="py-14 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <header className="mb-10 md:mb-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 mb-1">
              <span className="text-xs font-medium text-[#1DB954]">{content.benefits.label}</span>
            </span>
            <h2 className="mt-4 font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-[0.95] max-w-3xl mx-auto">
              {content.benefits.headline}
            </h2>
          </motion.div>
        </header>

        {/* Stepper */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line — desktop only */}
          <div
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: "linear-gradient(to bottom, transparent, #1DB95450 8%, #1DB95450 92%, transparent)" }}
            aria-hidden="true"
          />

          <div className="flex flex-col gap-16">
            {processSteps.map((step, index) => {
              const Icon = step.icon
              const isLeft = index % 2 === 0

              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: isLeft ? -32 : 32 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative grid md:grid-cols-2 gap-8 md:gap-0 items-center"
                >
                  {/* Dot on the line — desktop */}
                  <div
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FAF8F5] border-2 border-[#1DB954] z-10"
                    aria-hidden="true"
                  />

                  {/* Content block */}
                  <div className={`relative ${isLeft ? "md:pr-20 md:col-start-1" : "md:pl-20 md:col-start-2"}`}>
                    {/* Actual content */}
                    <div className={`relative z-10 flex gap-6 items-start ${isLeft ? "md:flex-row-reverse md:text-right" : "flex-row"}`}>
                      {/* Icon */}
                      <div className={`shrink-0 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${step.iconBg}`}>
                        <Icon className="h-7 w-7 text-white" aria-hidden="true" />
                      </div>

                      {/* Text */}
                      <div>
                        <h3 className="font-[family-name:var(--font-cormorant)] text-2xl md:text-3xl font-bold text-[#1C1C1A] mb-3 leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-base text-[#6B7280] leading-relaxed max-w-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Empty column — big number lives here, opposite side to content */}
                  <div
                    className={`hidden md:flex items-center justify-center ${isLeft ? "md:col-start-2" : "md:col-start-1 md:row-start-1"}`}
                    aria-hidden="true"
                  >
                    <span
                      className="font-[family-name:var(--font-cormorant)] font-bold select-none pointer-events-none leading-none"
                      style={{
                        fontSize: "clamp(140px, 16vw, 220px)",
                        color: "#1C1C1A",
                        opacity: 0.06,
                      }}
                    >
                      {step.number}
                    </span>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
