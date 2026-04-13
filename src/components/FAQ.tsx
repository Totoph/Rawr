"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

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
        <span className={`text-xl md:text-2xl font-semibold leading-snug transition-colors duration-200 ${isOpen ? "text-[#1C1C1A]" : "text-[#9CA3AF] group-hover:text-[#1DB954]"}`}>
          {faq.question}
        </span>
        <span className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#1A1A1A]/30 bg-[#1A1A1A]/5 text-[#1A1A1A] transition-all duration-300 group-hover:bg-[#1A1A1A]/10">
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
    <section id="faq" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 md:mb-16 text-center"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#1DB954]/10 border border-[#1DB954]/20 mb-4">
            <span className="text-xs font-medium text-[#1DB954]">Frequently asked questions</span>
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-[0.95]">
            Everything you
            <br />
            <em className="not-italic text-[#1DB954]">want to know</em>
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
