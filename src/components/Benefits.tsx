"use client"

import { motion } from "framer-motion"
import { CalendarCheck2, PhoneOff, Sparkles, UserCheck } from "lucide-react"
import { content } from "@/content/en"

const processSteps = [
  {
    number: "01",
    title: "No Guest Left Behind",
    description:
      "Connected to your phone line, Llynne captures missed calls instantly and continues the conversation on WhatsApp.",
    icon: PhoneOff,
    iconBg: "from-[#C4714F] to-[#9E583A]",
  },
  {
    number: "02",
    title: "Instant Guest Recognition",
    description:
      "Seconds later, guests receive a personalized message for bookings, opening hours, or private event requests.",
    icon: UserCheck,
    iconBg: "from-[#2D6A4F] to-[#1E4D39]",
  },
  {
    number: "03",
    title: "Effortless Reservations",
    description:
      "Bookings sync into your existing system in real time, while special requests are collected and sent to your team.",
    icon: CalendarCheck2,
    iconBg: "from-[#B58A5A] to-[#8F6B42]",
  },
  {
    number: "04",
    title: "A Five-Star Experience",
    description:
      "Recover around 50 bookings per month while guests get instant replies and your team avoids phone stress.",
    icon: Sparkles,
    iconBg: "from-[#D4A843] to-[#A67C2E]",
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
            <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C4714F]/10 border border-[#C4714F]/20 mb-1">
              <span className="text-xs font-medium text-[#C4714F]">{content.benefits.label}</span>
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
            style={{ background: "linear-gradient(to bottom, transparent, #C4714F50 8%, #C4714F50 92%, transparent)" }}
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
                    className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-[#FAF8F5] border-2 border-[#C4714F] z-10"
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
