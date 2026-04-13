"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useRef, useState, useCallback } from "react"
import { content } from "@/content/en"

const leftLogos = [
  { name: "Orange",    file: "/logos/Orange_logo.svg",           aspect: "square", filter: "none" },
  { name: "Bouygues",  file: "/logos/Bouygues_Telecom_logo.svg", aspect: "wide",   filter: "none" },
  { name: "AT&T",      file: "/logos/AT&T_logo.svg",             aspect: "wide",   filter: "none" },
  { name: "Verizon",   file: "/logos/Verizon_logo.svg",          aspect: "wide",   filter: "none" },
  { name: "3CX",       file: "/logos/3CX_logo.svg",              aspect: "wide",   filter: "none" },
  { name: "WhatsApp",  file: "/logos/WhatsApp_logo.svg",         aspect: "square", filter: "none" },
  { name: "Instagram", file: "/logos/Instagram_logo.svg",        aspect: "square", filter: "none" },
]

const rightLogos = [
  { name: "TheFork",    file: "/logos/Thefork_logo.svg",      aspect: "wide", filter: "none" },
  { name: "OpenTable",  file: "/logos/OpenTable_logo.svg",     aspect: "wide", filter: "none" },
  { name: "Resy",       file: "/logos/Resy_logo.svg",          aspect: "wide", filter: "none" },
  { name: "SevenRooms", file: "/logos/SevenRooms_logo.png",    aspect: "wide", filter: "none" },
  { name: "Lightspeed", file: "/logos/Lightspeed_logo.svg",    aspect: "wide", filter: "none" },
  { name: "Zenchef",    file: "/logos/zenchef_logo.svg",       aspect: "wide", filter: "none" },
  { name: "TripAdvisor",file: "/logos/TripAdvisor_Logo.svg",   aspect: "wide", filter: "none" },
]

const GAP        = 20   // px gap between logo edge and line start
const HUB_RADIUS = 62   // outer ring radius (96px * 1.28 / 2) where lines terminate

// Spread N points equally across an arc on the left or right side of the hub.
// arcSpan in radians: how much of the semicircle to use (π = full half)
const ARC_SPAN = Math.PI * 0.55  // 99° arc, centred on the equator

function hubPoints(count: number, side: "left" | "right", hx: number, hy: number): { tx: number; ty: number }[] {
  return Array.from({ length: count }, (_, i) => {
    // Spread evenly: from -ARC_SPAN/2 to +ARC_SPAN/2
    const t     = count === 1 ? 0 : (i / (count - 1)) - 0.5
    const angle = t * ARC_SPAN   // angle from the equator
    const tx    = hx + HUB_RADIUS * (side === "left" ? -Math.cos(angle) : Math.cos(angle))
    const ty    = hy + HUB_RADIUS * Math.sin(angle)
    return { tx, ty }
  })
}

function makePathLeft(
  el: HTMLDivElement,
  cr: DOMRect,
  hx: number,
  hy: number,
  hubPoint: { tx: number; ty: number }
): string {
  const r  = el.getBoundingClientRect()
  const ox = r.right - cr.left + GAP
  const oy = r.top   - cr.top + r.height / 2
  const { tx, ty } = hubPoint
  const mx = (ox + tx) / 2
  return `M${ox},${oy} C${mx},${oy} ${mx},${ty} ${tx},${ty}`
}

function makePathRight(
  el: HTMLDivElement,
  cr: DOMRect,
  hx: number,
  hy: number,
  hubPoint: { tx: number; ty: number }
): string {
  const r  = el.getBoundingClientRect()
  const ox = r.left  - cr.left - GAP
  const oy = r.top   - cr.top + r.height / 2
  const { tx, ty } = hubPoint
  const mx = (ox + tx) / 2
  return `M${tx},${ty} C${mx},${ty} ${mx},${oy} ${ox},${oy}`
}

export function ConnectionDiagram() {
  const containerRef = useRef<HTMLDivElement>(null)
  const hubRef       = useRef<HTMLDivElement>(null)
  const leftRefs     = useRef<(HTMLDivElement | null)[]>([])
  const rightRefs    = useRef<(HTMLDivElement | null)[]>([])

  const [leftPaths,  setLeftPaths]  = useState<string[]>([])
  const [rightPaths, setRightPaths] = useState<string[]>([])
  const [svgSize,    setSvgSize]    = useState({ w: 0, h: 0 })

  const calculate = useCallback(() => {
    const container = containerRef.current
    const hub       = hubRef.current
    if (!container || !hub) return

    const cr = container.getBoundingClientRect()
    const hr = hub.getBoundingClientRect()
    const hx = hr.left - cr.left + hr.width  / 2
    const hy = hr.top  - cr.top  + hr.height / 2

    setSvgSize({ w: cr.width, h: cr.height })

    const lPoints = hubPoints(leftRefs.current.length,  "left",  hx, hy)
    const rPoints = hubPoints(rightRefs.current.length, "right", hx, hy)
    setLeftPaths(leftRefs.current.map((el, i)  => el ? makePathLeft(el,  cr, hx, hy, lPoints[i])  : ""))
    setRightPaths(rightRefs.current.map((el, i) => el ? makePathRight(el, cr, hx, hy, rPoints[i]) : ""))
  }, [])

  useEffect(() => {
    const t = setTimeout(calculate, 80)
    window.addEventListener("resize", calculate)
    return () => { clearTimeout(t); window.removeEventListener("resize", calculate) }
  }, [calculate])

  return (
    <section id="integrations" className="py-28 bg-[#F5F1EB] overflow-hidden">
      <div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-[#C4714F]/10 border border-[#C4714F]/20 mb-1">
            <span className="text-xs font-medium text-[#C4714F]">{content.integrations.label}</span>
          </span>
          <h2 className="mt-3 font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl font-bold text-[#1C1C1A] leading-[1.05]">
            {content.integrations.headline}
          </h2>
          <p className="mt-4 text-[#7A7167] text-base max-w-lg mx-auto leading-relaxed">
            {content.integrations.subheadline}
          </p>
        </motion.div>

        {/* Diagram */}
        <div ref={containerRef} className="relative">

          {/* SVG lines — rendered behind everything */}
          {svgSize.w > 0 && (
            <svg
              className="absolute inset-0 pointer-events-none z-0 overflow-visible"
              width={svgSize.w}
              height={svgSize.h}
              aria-hidden="true"
            >
              {/* Static rails */}
              {leftPaths.map((d, i) => d ? (
                <path key={`lr${i}`} d={d} stroke="#DDD6CC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              ) : null)}
              {rightPaths.map((d, i) => d ? (
                <path key={`rr${i}`} d={d} stroke="#DDD6CC" strokeWidth="1.5" fill="none" strokeLinecap="round" />
              ) : null)}

              {/* Left pulses: travels logo→hub in first 30% of cycle */}
              {leftPaths.map((d, i) => d ? (
              <path 
                key={`lp${i}`} 
                d={d} 
                fill="none" 
                stroke="#C4714F" 
                strokeWidth="2" 
                strokeLinecap="round"
                pathLength="1000" 
                strokeDasharray="40 1000"
                /* FIXED: Set base state to hidden so it doesn't flash on mount or reset */
                opacity="0"
                strokeDashoffset="1040" 
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  dur="9s" 
                  repeatCount="indefinite" 
                  calcMode="linear"
                  values="1040; 0; 0" 
                  keyTimes="0; 0.30; 1" 
                />
                <animate 
                  attributeName="opacity" 
                  dur="9s" 
                  repeatCount="indefinite"
                  /* FIXED: Drop opacity to 0 slightly BEFORE the offset hits 0 */
                  values="1; 1; 0; 0" 
                  keyTimes="0; 0.28; 0.29; 1" 
                />
              </path>
            ) : null)}

            {/* Right pulses: hidden first 30%, travels hub→logo next 30%, hidden rest */}
            {rightPaths.map((d, i) => d ? (
              <path 
                key={`rp${i}`} 
                d={d} 
                fill="none" 
                stroke="#C4714F" 
                strokeWidth="2" 
                strokeLinecap="round"
                pathLength="1000" 
                strokeDasharray="40 1000"
                /* FIXED: Set base state to hidden */
                opacity="0"
                strokeDashoffset="1040"
              >
                <animate 
                  attributeName="stroke-dashoffset" 
                  dur="9s" 
                  repeatCount="indefinite" 
                  calcMode="linear"
                  /* FIXED: Ending at -100 ensures it's physically off the path when finishing */
                  values="1040; 1040; 0; -100; -100" 
                  keyTimes="0; 0.30; 0.60; 0.70; 1" 
                />
                <animate 
                  attributeName="opacity" 
                  dur="9s" 
                  repeatCount="indefinite"
                  /* FIXED: Tighter window to ensure it's gone before it stops moving */
                  values="0; 0; 1; 1; 0; 0" 
                  keyTimes="0; 0.31; 0.33; 0.58; 0.59; 1" 
                />
              </path>
            ) : null)}
            </svg>
          )}

          {/* Three-column layout */}
          <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center" style={{ columnGap: "14vw" }}>

            {/* Left column — logos right-aligned so they sit flush toward the hub */}
            <div className="flex flex-col gap-4 items-end">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A8A09A] self-end">
                Inbound channels
              </p>
              {leftLogos.map((logo, i) => (
                <motion.div
                  key={logo.name}
                  ref={el => { leftRefs.current[i] = el }}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center justify-end"
                  style={{ height: "40px" }}
                  aria-label={logo.name}
                >
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={logo.aspect === "square" ? 28 : 100}
                    height={28}
                    style={{
                      maxWidth: logo.aspect === "square" ? "28px" : "100px",
                      height: "28px",
                      width: "auto",
                      filter: logo.filter,
                    }}
                  />
                </motion.div>
              ))}
            </div>

            {/* Llynne hub */}
            <motion.div
              ref={hubRef}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring", stiffness: 180 }}
              className="relative flex flex-col items-center justify-center w-[96px] h-[96px] rounded-full bg-[#2D6A4F] shadow-2xl flex-shrink-0"
            >
              <span className="absolute inset-0 rounded-full border-2 border-[#2D6A4F] opacity-60 scale-110 pointer-events-none" />
              <span className="absolute inset-0 rounded-full border border-[#2D6A4F]/30 opacity-40 scale-[1.28] pointer-events-none" />
              <span className="text-white font-bold text-sm tracking-wide">Llynne</span>
            </motion.div>

            {/* Right column — logos left-aligned */}
            <div className="flex flex-col gap-4 items-start">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-[#A8A09A] self-start">
                Reservation platforms
              </p>
              {rightLogos.map((logo, i) => (
                <motion.div
                  key={logo.name}
                  ref={el => { rightRefs.current[i] = el }}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.07 }}
                  className="flex items-center justify-start"
                  style={{ height: "40px" }}
                  aria-label={logo.name}
                >
                  <Image
                    src={logo.file}
                    alt={logo.name}
                    width={100}
                    height={28}
                    style={{
                      maxWidth: "100px",
                      height: "28px",
                      width: "auto",
                      filter: logo.filter,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* API note */}
        <p className="text-center text-[11px] text-[#A8A09A] mt-12 max-w-xl mx-auto leading-relaxed">
          {content.integrations.note}
        </p>

      </div>
    </section>
  )
}
