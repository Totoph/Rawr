"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { content } from "@/content/en"

export function FeatureCardGallery() {
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const cards = content.premiumFeatures.cards

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    container?.addEventListener("scroll", checkScroll)
    container?.addEventListener("scroll", () => {
      if (!scrollContainerRef.current) return
      const index = Math.round(
        scrollContainerRef.current.scrollLeft / (scrollContainerRef.current.offsetWidth + 24)
      )
      setCurrentIndex(Math.min(index, cards.length - 1))
    })
    window.addEventListener("resize", checkScroll)

    return () => {
      container?.removeEventListener("scroll", checkScroll)
      window.removeEventListener("resize", checkScroll)
    }
  }, [cards.length])

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.offsetWidth + 24
    const newPosition =
      scrollContainerRef.current.scrollLeft +
      (direction === "left" ? -scrollAmount : scrollAmount)

    scrollContainerRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    })
  }

  return (
    <div className="relative">
      <div className="relative group">
        {/* Left Navigation Button */}
        <motion.button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className="absolute -left-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-[#E0D8CE] shadow-lg hover:shadow-xl hover:border-[#C4714F] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: canScrollLeft ? 1.05 : 1 }}
          whileTap={{ scale: canScrollLeft ? 0.95 : 1 }}
        >
          <ChevronLeft className="w-5 h-5 text-[#1C1C1A]" strokeWidth={2.5} />
        </motion.button>

        {/* Scrollable Container */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
        >
          <div className="flex gap-6 px-4">
            {cards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] group/card"
              >
                <div className="relative h-full bg-white rounded-2xl border border-[#E0D8CE] overflow-hidden hover:border-[#C4714F]/50 hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col">
                  {/* Card Content */}
                  <div className="p-8 flex flex-col h-full">
                    {/* Label */}
                    <div className="text-xs font-semibold text-[#C4714F] uppercase tracking-wider mb-3">
                      {card.label}
                    </div>

                    {/* Headline */}
                    <h3 className="text-xl md:text-2xl font-bold text-[#1C1C1A] mb-3 leading-tight">
                      {card.headline}
                    </h3>

                    {/* Body */}
                    <p className="text-sm md:text-base text-[#5C564F] leading-relaxed mb-6 flex-grow">
                      {card.body}
                    </p>

                    {/* Image */}
                    <div className="relative w-full h-48 md:h-56 -m-8 mb-0 mt-auto rounded-b-2xl overflow-hidden">
                      <Image
                        src={card.photo}
                        alt={card.alt}
                        fill
                        className="object-cover group-hover/card:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  </div>

                  {/* Chevron Control Button */}
                  <div className="absolute top-8 right-8 z-10 inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/80 backdrop-blur group-hover/card:bg-[#C4714F] transition-all duration-300">
                    <ChevronRight className="w-5 h-5 text-[#1C1C1A] group-hover/card:text-white group-hover/card:translate-x-1 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Navigation Button */}
        <motion.button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className="absolute -right-6 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white border border-[#E0D8CE] shadow-lg hover:shadow-xl hover:border-[#C4714F] disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-300"
          whileHover={{ scale: canScrollRight ? 1.05 : 1 }}
          whileTap={{ scale: canScrollRight ? 0.95 : 1 }}
        >
          <ChevronRight className="w-5 h-5 text-[#1C1C1A]" strokeWidth={2.5} />
        </motion.button>
      </div>

      {/* Pagination Dots */}
      <div className="mt-8 flex justify-center gap-2">
        {cards.map((_, index) => (
          <motion.div
            key={index}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-[#C4714F]"
                : "w-2 bg-[#C4714F]/20 hover:bg-[#C4714F]/40"
            }`}
            onClick={() => {
              scrollContainerRef.current?.scrollTo({
                left:
                  index *
                  (scrollContainerRef.current.offsetWidth +
                    24),
                behavior: "smooth",
              })
            }}
          />
        ))}
      </div>
    </div>
  )
}
