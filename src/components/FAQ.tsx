"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

const faqs = [
  {
    question: "How does booking work with your solution?",
    answer:
      "When a guest leaves a voicemail, our AI reads the request and replies on WhatsApp — asking follow-up questions if needed. It then forwards the booking to your team for validation. No reservation is confirmed without your approval.",
  },
  {
    question: "Is setup complicated?",
    answer:
      "Not at all. Activation takes a single click — no technical skills required. The system is ready to handle calls immediately.",
  },
  {
    question: "What languages does your AI support?",
    answer:
      "Our AI automatically detects the guest's language — French, English, Spanish, and more — and replies naturally in the same language.",
  },
  {
    question: "Does Llynne replace my team?",
    answer:
      "No — it works alongside your team. The AI handles the basics and forwards reservations for your staff to confirm, freeing them to focus on hospitality.",
  },
  {
    question: "What are the benefits for a small restaurant?",
    answer:
      "Llynne reduces phone stress during service, costs less than an extra hire, and ensures every guest gets a response — even during a rush.",
  },
  {
    question: "Does Llynne integrate with my booking system?",
    answer:
      "Yes. We can connect to any reservation system that provides an API key. Some providers may charge additional fees for API access.",
  },
]

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string }
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      className="border-b border-[#1C1C1A]/10 last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className={`text-xl md:text-2xl font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-[#1C1C1A]" : "text-[#9CA3AF] group-hover:text-[#C4714F]"}`}>
          {faq.question}
        </span>
        <span className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#C4714F]/30 bg-[#C4714F]/5 text-[#C4714F] transition-all duration-300 group-hover:bg-[#C4714F]/10">
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-[#6B7280] leading-relaxed max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C4714F]/10 border border-[#C4714F]/20 mb-4">
            <span className="text-xs font-medium text-[#C4714F]">Frequently asked questions</span>
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-[0.95]">
            Everything you
            <br />
            <em className="not-italic text-[#C4714F]">want to know</em>
          </h2>
        </motion.header>

        {/* Accordion */}
        <div className="rounded-2xl border border-[#1C1C1A]/8 bg-white/60 backdrop-blur-sm px-6 md:px-10 shadow-sm">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
