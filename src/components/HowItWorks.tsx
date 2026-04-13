"use client"

import { motion } from "framer-motion"
import { content } from "@/content/en"
import { ImageAccordion } from "./ImageAccordion"

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 bg-gradient-to-b from-[#FAF8F5] to-[#F5F1ED]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C4714F]/10 border border-[#C4714F]/20 mb-1">
            <span className="text-xs font-medium text-[#C4714F]">{content.howItWorks.label}</span>
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1A] mt-4 max-w-2xl leading-tight">
            {content.howItWorks.headline}
          </h2>
        </motion.div>

        {/* Image Accordion */}
        <ImageAccordion />
      </div>
    </section>
  )
}
