"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"

interface FAQItem {
  question: string
  answer: string
}

interface FAQProps {
  tag: string
  headline: string
  headlineHighlight: string
  items: FAQItem[]
}

function FAQAccordionItem({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FAQItem
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
      className="border-b border-[#F0DFC8] last:border-0"
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start justify-between gap-6 py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-lg md:text-xl font-bold leading-snug transition-colors duration-200 ${
            isOpen ? "text-[#3D2314]" : "text-[#C4845A] group-hover:text-[#7A4528]"
          }`}
        >
          {item.question}
        </span>
        <span className="shrink-0 mt-1 flex h-7 w-7 items-center justify-center rounded-full border border-[#F0DFC8] bg-[#FFF3C4] text-[#3D2314] transition-all duration-300 group-hover:bg-[#F5C842]">
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
            <p className="pb-6 text-sm text-[#7A4528] leading-relaxed max-w-3xl">
              {item.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQ({ tag, headline, headlineHighlight, items }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="px-[10%] py-20">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center bg-[#FFF3C4] text-[#7A4528] text-[11px] font-extrabold px-[14px] py-[6px] rounded-full uppercase tracking-[0.08em] mb-4">
            {tag}
          </div>
          <h2
            className="font-black text-[#3D2314] tracking-[-0.04em] leading-[1.1]"
            style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
          >
            {headline}
            <br />
            <em className="not-italic text-[#7A4528]">{headlineHighlight}</em>
          </h2>
        </motion.header>

        {/* Accordion */}
        <div className="rounded-2xl border border-[#F0DFC8] bg-white px-6 md:px-10 shadow-sm">
          {items.map((item, index) => (
            <FAQAccordionItem
              key={index}
              item={item}
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
