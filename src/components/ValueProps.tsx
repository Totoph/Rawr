"use client"

import { motion } from "framer-motion"

const benefits = [
  {
    label: "Revenue Growth",
    body: "Recover more then 7000$ in revenue each month — a measurable lift on an annual basis, just by never missing a call.",
  },
  {
    label: "Guest Experience",
    body: "WhatsApp is how your guests already communicate. Llynne feels warm and human, not like a bot.",
  },
  {
    label: "Team Relief",
    body: "Llynne is available 24/7, capturing reservations even while your doors are closed. No callback lists. No voicemail marathons. Your team stays focused on the floor.",
  },
]

export function ValueProps() {
  return (
    <section id="why-llynne" className="py-24 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          {/* Left — dominant anchor */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-[#1C1C1A] leading-[1.05]">
              Most restaurants don&apos;t know how much they&apos;re losing.
            </h2>
            <div className="mt-10 md:mt-14">
              <p className="font-[family-name:var(--font-cormorant)] text-[clamp(4rem,10vw,7rem)] font-bold text-[#C4714F] leading-none">
                50+
              </p>
              <p className="mt-2 text-base text-[#5C564F]">
                bookings recovered every month
              </p>
            </div>
          </motion.div>

          {/* Right — compact benefits */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="flex flex-col divide-y divide-[#E0D8CE]"
          >
            {benefits.map((item) => (
              <div key={item.label} className="py-7 first:pt-0 last:pb-0">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C4714F] mb-2">
                  {item.label}
                </p>
                <p className="text-base text-[#5C564F] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  )
}
