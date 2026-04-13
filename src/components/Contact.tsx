"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ChatContactForm } from "./ChatContactForm"
import { content } from "@/content/en"

export function Contact() {
  return (
    <section id="contact" className="py-24 bg-[#F2EDE6]">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C4714F]/10 border border-[#C4714F]/20 mb-1">
            <span className="text-xs font-medium text-[#C4714F]">{content.contact.label}</span>
          </span>
          <h2 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl font-bold text-[#1C1C1A] mt-3">
            Ready to recover every reservation?
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Left — photo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative rounded-2xl overflow-hidden min-h-[400px]"
          >
            <Image
              src={content.contact.photo}
              alt={content.contact.photoAlt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A]/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <p className="font-[family-name:var(--font-cormorant)] text-white text-2xl font-semibold italic">
                &ldquo;Every reservation, recovered.&rdquo;
              </p>
            </div>
          </motion.div>

          {/* Right — chat form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl border border-[#E0D8CE] shadow-sm overflow-hidden"
          >
            <ChatContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
