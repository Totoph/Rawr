"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Stage = "ringing" | "missed" | "detected" | "chat" | "confirmed" | "pause"
interface ChatMessage { from: "llynne" | "guest"; text: string }

const STAGE_DURATIONS: Record<Stage, number> = {
  ringing:   4000,
  missed:    2400,
  detected:  3800,
  chat:     16000,
  confirmed: 4000,
  pause:     1000,
}
const TOTAL = Object.values(STAGE_DURATIONS).reduce((a, b) => a + b, 0)

function getStageAt(elapsed: number): Stage {
  let acc = 0
  for (const [s, d] of Object.entries(STAGE_DURATIONS) as [Stage, number][]) {
    acc += d
    if (elapsed < acc) return s
  }
  return "ringing"
}

// 5 messages: timings spread across 16000ms chat window
const MSG_APPEAR    = [600, 3000, 5800, 9000, 12500]
const TYPING_WINDOW = 1000

// ── Pixel-perfect iOS status bar icons ────────────────────────────────────────

function SignalBars({ color }: { color: string }) {
  // 4 bars: widths equal (3px each), heights 4,6,9,12px, gap 1.5px
  const heights = [4, 6, 9, 12]
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none" style={{ display: "block" }}>
      {heights.map((h, i) => (
        <rect
          key={i}
          x={i * 4.5}
          y={12 - h}
          width={3}
          height={h}
          rx={1}
          fill={color}
          opacity={i === 3 ? 1 : 0.9}
        />
      ))}
    </svg>
  )
}

function WifiIcon({ color }: { color: string }) {
  // 3 arcs + dot — exact iOS proportions
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" style={{ display: "block" }}>
      {/* Dot */}
      <circle cx="8" cy="11" r="1.2" fill={color} />
      {/* Inner arc */}
      <path d="M5.2 8.4a3.8 3.8 0 015.6 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Mid arc */}
      <path d="M2.8 5.8a7.0 7.0 0 0110.4 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" />
      {/* Outer arc */}
      <path d="M0.4 3.2a10.2 10.2 0 0115.2 0" stroke={color} strokeWidth="1.4" strokeLinecap="round" fill="none" opacity="0.5"/>
    </svg>
  )
}

function BatteryIcon({ color }: { color: string }) {
  // iOS battery: 25×12 body, 2px nub on right
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none" style={{ display: "block" }}>
      {/* Body */}
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={color} strokeOpacity="0.35" />
      {/* Fill (75%) */}
      <rect x="2" y="2" width="17" height="9" rx="2" fill={color} />
      {/* Nub */}
      <path d="M24.5 4.5v4a2 2 0 000-4z" fill={color} fillOpacity="0.4" />
    </svg>
  )
}

// Live clock — updates every second
function LiveClock({ color }: { color: string }) {
  const [time, setTime] = useState(() => {
    const d = new Date()
    return `${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`
  })
  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date()
      setTime(`${d.getHours()}:${String(d.getMinutes()).padStart(2, "0")}`)
    }, 1000)
    return () => clearInterval(id)
  }, [])
  return (
    <span
      style={{
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: "-0.03em",
        color,
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
        lineHeight: 1,
      }}
    >
      {time}
    </span>
  )
}

// Pixel-accurate iOS status bar — matches the reference screenshot exactly
function StatusBar({ onDark }: { onDark?: boolean }) {
  const fg = onDark ? "white" : "#1C1C1A"
  return (
    <div
      style={{
        height: 50,
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        // Horizontal padding must keep icons from touching the rounded corners
        // Dynamic Island is 110px wide, centered. Left/right content must clear it.
        padding: "0 20px",
        position: "relative",
        background: "transparent",
      }}
    >
      {/* ── Time — left ── */}
      <div style={{ display: "flex", alignItems: "center", width: 60 }}>
        <LiveClock color={fg} />
      </div>

      {/* ── Dynamic Island — absolute center ── */}
      {/* Real iPhone 15: 126pt wide × 37pt tall on 393pt screen = 32% × 9.4% */}
      {/* Our screen = 230px → 230 × 0.32 = 74px wide, 74 × 0.294 = 22px tall */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: "50%",
          transform: "translateX(-50%)",
          width: 74,
          height: 22,
          background: "#000",
          borderRadius: 12,
          zIndex: 10,
        }}
      />

      {/* ── Right indicators — signal · battery ── */}
      {/* Fixed width matching time so they're symmetric */}
      <div
        style={{
          width: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: 6,
        }}
      >
        <SignalBars color={fg} />
        <BatteryIcon color={fg} />
      </div>
    </div>
  )
}

// WhatsApp-style double-tick (side by side, no overlap)
function DoubleTick() {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none" style={{ display: "inline-block", verticalAlign: "middle" }}>
      {/* First tick */}
      <path d="M1 5l3 3 5-5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Second tick offset to the right */}
      <path d="M7 5l3 3 5-5" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PhoneAnimation({ restaurantName }: { restaurantName: string }) {
  const [elapsed,        setElapsed]        = useState(0)
  const [visibleMessages,setVisibleMessages] = useState(0)
  const [typingSide,     setTypingSide]      = useState<"left" | "right" | null>(null)
  const rafRef    = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom whenever a new message or typing indicator appears
  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleMessages, typingSide])

  // Tomorrow's date formatted
  const tomorrow = (() => {
    const d = new Date()
    d.setDate(d.getDate() + 1)
    return d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })
  })()

  const messages: ChatMessage[] = [
    { from: "llynne", text: `Hello, it's the restaurant ${restaurantName}, you tried to make a reservation for 5 people for tomorrow night 7PM?` },
    { from: "guest",  text: "Yes that's correct" },
    { from: "llynne", text: "Very good, can you give us a name for the reservation?" },
    { from: "guest",  text: "On the name of Nicole" },
    { from: "llynne", text: `Thanks Nicole, our team has been informed and will come back to you very soon. Your reservation has been confirmed for ${tomorrow} at 7PM.` },
  ]

  useEffect(() => {
    const startTime = performance.now()
    function tick(now: number) {
      const e = (now - startTime) % TOTAL
      setElapsed(e)

      const chatStart = STAGE_DURATIONS.ringing + STAGE_DURATIONS.missed + STAGE_DURATIONS.detected
      const chatEnd   = chatStart + STAGE_DURATIONS.chat

      if (e >= chatStart && e < chatEnd) {
        const c = e - chatStart
        let count = 0
        for (const t of MSG_APPEAR) { if (c >= t) count++ }
        setVisibleMessages(count)

        // Typing indicator: show before each incoming message
        let typing: "left" | "right" | null = null
        if (count < 1 && c >= MSG_APPEAR[0] - TYPING_WINDOW) typing = "left"
        if (count >= 1 && count < 2 && c >= MSG_APPEAR[1] - TYPING_WINDOW) typing = "right"
        if (count >= 2 && count < 3 && c >= MSG_APPEAR[2] - TYPING_WINDOW) typing = "left"
        if (count >= 3 && count < 4 && c >= MSG_APPEAR[3] - TYPING_WINDOW) typing = "right"
        if (count >= 4 && count < 5 && c >= MSG_APPEAR[4] - TYPING_WINDOW) typing = "left"
        setTypingSide(typing)
      } else {
        setVisibleMessages(0)
        setTypingSide(null)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [restaurantName])

  const stage = getStageAt(elapsed)

  // ── Shell dimensions — sized to fit inside the hero column ──────────────────
  const SHELL_W  = 248
  const SHELL_H  = 504
  const SHELL_R  = 44
  const BEZEL    = 9
  const SCREEN_R = SHELL_R - BEZEL + 1   // 36px

  const isChat = stage === "chat" || stage === "confirmed" || stage === "pause"

  return (
    <div
      className="relative flex items-center justify-center w-full"
      style={{ height: SHELL_H + 32 }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: SHELL_W + 100,
          height: SHELL_H + 60,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background: "radial-gradient(ellipse at center, rgba(45,106,79,0.13) 0%, transparent 65%)",
          filter: "blur(20px)",
        }}
      />

      {/* ── Outer iPhone shell ─────────────────────────────────────────────── */}
      <motion.div
        style={{
          position: "relative",
          width: SHELL_W,
          height: SHELL_H,
          borderRadius: SHELL_R,
          flexShrink: 0,
          // Dark titanium finish
          background: "linear-gradient(160deg, #3a3a3a 0%, #1e1e1e 50%, #111 100%)",
          boxShadow: [
            "inset 1.5px 1.5px 0 rgba(255,255,255,0.13)",
            "inset -1px -1px 0 rgba(0,0,0,0.55)",
            "0 28px 70px rgba(0,0,0,0.35)",
            "0 6px 18px rgba(0,0,0,0.20)",
          ].join(", "),
        }}
        animate={stage === "missed" ? { x: [-6, 6, -5, 5, -3, 3, 0] } : { x: 0 }}
        transition={{ duration: 0.48, ease: "easeInOut" }}
      >
        {/* Left side buttons */}
        {[{ top: 88, h: 24 }, { top: 122, h: 40 }, { top: 172, h: 40 }].map((b, i) => (
          <div key={i} style={{
            position: "absolute", left: -3.5, top: b.top,
            width: 3.5, height: b.h,
            background: "linear-gradient(to right, #151515, #2a2a2a)",
            borderRadius: "2px 0 0 2px",
            boxShadow: "inset 1px 0 0 rgba(255,255,255,0.07)",
          }} />
        ))}
        {/* Right power button */}
        <div style={{
          position: "absolute", right: -3.5, top: 118,
          width: 3.5, height: 58,
          background: "linear-gradient(to left, #151515, #2a2a2a)",
          borderRadius: "0 2px 2px 0",
          boxShadow: "inset -1px 0 0 rgba(255,255,255,0.07)",
        }} />

        {/* ── Screen bezel ─────────────────────────────────────────────────── */}
        <div style={{
          position: "absolute",
          inset: BEZEL,
          borderRadius: SCREEN_R,
          overflow: "hidden",
          background: "#000",
        }}>
          {/* Screen surface */}
          <div style={{
            width: "100%",
            height: "100%",
            borderRadius: SCREEN_R,
            overflow: "hidden",
            background: "#fff",
            display: "flex",
            flexDirection: "column",
          }}>

            {/* Status bar — colored bg when chat is open */}
            <div style={{ background: isChat ? "#2D6A4F" : "transparent", flexShrink: 0 }}>
              <StatusBar onDark={isChat} />
            </div>

            {/* Screen content */}
            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <AnimatePresence mode="wait">

                {/* ── RINGING ─────────────────────────────────────────── */}
                {stage === "ringing" && (
                  <motion.div key="ringing"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "16px 24px 28px", background: "#f2f2f7", gap: 40 }}
                  >
                    {/* Caller info */}
                    <div style={{ textAlign: "center" }}>
                      <div style={{ position: "relative", display: "inline-block", marginBottom: 14 }}>
                        <motion.div
                          animate={{ scale: [1, 1.45, 1], opacity: [0.3, 0, 0.3] }}
                          transition={{ repeat: Infinity, duration: 2.1, ease: "easeInOut" }}
                          style={{ position: "absolute", inset: -18, borderRadius: "50%", background: "rgba(45,106,79,0.14)" }}
                        />
                        <div style={{
                          width: 76, height: 76, borderRadius: "50%",
                          background: "linear-gradient(145deg, #2D6A4F, #3a8760)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          boxShadow: "0 6px 18px rgba(45,106,79,0.3)",
                        }}>
                          <span style={{ color: "white", fontSize: 30, fontWeight: 700, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>
                            {restaurantName[0]}
                          </span>
                        </div>
                      </div>
                      <div style={{ fontSize: 20, fontWeight: 600, color: "#1C1C1A", letterSpacing: "-0.02em", fontFamily: "-apple-system, sans-serif", marginBottom: 3 }}>
                        {restaurantName}
                      </div>
                      <div style={{ fontSize: 12, color: "#8C8279" }}>mobile</div>
                    </div>

                    {/* Accept / Decline */}
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                      {[
                        { label: "Decline", bg: "#FF3B30", shadow: "rgba(255,59,48,0.4)", rotate: true },
                        { label: "Accept",  bg: "#34C759", shadow: "rgba(52,199,89,0.4)",  rotate: false },
                      ].map(({ label, bg, shadow, rotate }) => (
                        <div key={label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                          <div style={{
                            width: 58, height: 58, borderRadius: "50%",
                            background: bg, display: "flex", alignItems: "center", justifyContent: "center",
                            boxShadow: `0 4px 14px ${shadow}`,
                          }}>
                            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
                              <g transform={rotate ? "rotate(135 14 14)" : undefined}>
                                <path d="M8.1 11.8a14 14 0 006.1 6.1l2-2c.3-.3.7-.4 1.1-.2 1 .3 2.1.5 3.3.5.5 0 .9.4.9.9v3.2c0 .5-.4.9-.9.9-9.7 0-17.5-7.8-17.5-17.5 0-.5.4-.9.9-.9H7.2c.5 0 .9.4.9.9 0 1.2.2 2.3.5 3.3.1.4 0 .8-.2 1l-2.3 1.8z" fill="white"/>
                              </g>
                            </svg>
                          </div>
                          <span style={{ fontSize: 12, color: "#5C564F", fontWeight: 500 }}>{label}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* ── MISSED ──────────────────────────────────────────── */}
                {stage === "missed" && (
                  <motion.div key="missed"
                    initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flex: 1, background: "#f2f2f7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "0 24px 48px" }}
                  >
                    <motion.div initial={{ scale: 0.75 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 340, damping: 22 }}>
                      <div style={{
                        width: 64, height: 64, borderRadius: "50%",
                        background: "rgba(255,59,48,0.11)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 0 0 10px rgba(255,59,48,0.06)",
                      }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                          <path d="M8.1 11.8a14 14 0 006.1 6.1l2-2c.3-.3.7-.4 1.1-.2 1 .3 2.1.5 3.3.5.5 0 .9.4.9.9v3.2c0 .5-.4.9-.9.9-9.7 0-17.5-7.8-17.5-17.5 0-.5.4-.9.9-.9H7.2c.5 0 .9.4.9.9 0 1.2.2 2.3.5 3.3.1.4 0 .8-.2 1l-2.3 1.8z" fill="#FF3B30"/>
                        </svg>
                      </div>
                    </motion.div>
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 17, fontWeight: 600, color: "#FF3B30", marginBottom: 5, fontFamily: "-apple-system, sans-serif" }}>Missed call</div>
                      <div style={{ fontSize: 14, color: "#1C1C1A", fontWeight: 500, marginBottom: 3 }}>{restaurantName}</div>
                      <div style={{ fontSize: 12, color: "#8C8279" }}>Just now</div>
                    </div>
                  </motion.div>
                )}

                {/* ── DETECTED ────────────────────────────────────────── */}
                {stage === "detected" && (
                  <motion.div key="detected"
                    initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.36 }}
                    style={{ flex: 1, background: "#f2f2f7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14, padding: "0 24px 48px" }}
                  >
                    <motion.div
                      initial={{ scale: 0.82, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 22 }}
                      style={{
                        display: "flex", alignItems: "center", gap: 9,
                        background: "rgba(45,106,79,0.09)", border: "1px solid rgba(45,106,79,0.18)",
                        borderRadius: 16, padding: "11px 18px",
                      }}
                    >
                      <span style={{ fontSize: 15, color: "#2D6A4F" }}>✦</span>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#2D6A4F", fontFamily: "-apple-system, sans-serif" }}>Llynne detected a missed call</span>
                    </motion.div>
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.48 }}
                      style={{ fontSize: 12, color: "#8C8279", textAlign: "center" }}>
                      Sending WhatsApp to your guest...
                    </motion.p>
                  </motion.div>
                )}

                {/* ── CHAT ────────────────────────────────────────────── */}
                {stage === "chat" && (
                  <motion.div key="chat"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
                  >
                    {/* Nav bar */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 8px", background: "#2D6A4F" }}>
                      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                        <path d="M7.5 1.5L1.5 7.5l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <span style={{ color: "white", fontSize: 15, fontWeight: 700, fontFamily: "var(--font-cormorant), serif", fontStyle: "italic" }}>{restaurantName[0]}</span>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ color: "white", fontSize: 13, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{restaurantName}</div>
                        <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 10 }}>via Llynne · online</div>
                      </div>
                      <div style={{ display: "flex", gap: 12, opacity: 0.8 }}>
                        <svg width="16" height="13" viewBox="0 0 16 13" fill="none"><rect x="0.75" y="1.75" width="9.5" height="9.5" rx="1.75" stroke="white" strokeWidth="1.5"/><path d="M10.25 5l5-3v9l-5-3V5z" stroke="white" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M5 7.2A8.8 8.8 0 009 11l1.3-1.3c.2-.2.5-.3.7-.1.7.2 1.4.4 2.2.4.4 0 .7.3.7.7v2c0 .4-.3.7-.7.7C5.6 13.4 1.6 9.4 1.6 4.4c0-.4.3-.7.7-.7h2c.4 0 .7.3.7.7 0 .8.1 1.5.4 2.2.1.2 0 .5-.2.7L5 7.2z" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} style={{ flex: 1, padding: "8px 10px", background: "#EBE0D6", display: "flex", flexDirection: "column", gap: 5, overflowY: "auto", scrollBehavior: "smooth" }}>
                      <AnimatePresence>
                        {messages.slice(0, visibleMessages).map((msg, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.93 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.27, type: "spring", stiffness: 300, damping: 26 }}
                            style={{ display: "flex", justifyContent: msg.from === "guest" ? "flex-end" : "flex-start" }}
                          >
                            <div style={{
                              maxWidth: "80%", padding: "7px 10px",
                              borderRadius: msg.from === "guest" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                              background: msg.from === "guest" ? "#DCF8C6" : "#fff",
                              fontSize: 12, lineHeight: 1.45, color: "#1C1C1A",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                            }}>
                              {msg.text}
                              {/* Timestamp */}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
                                <span style={{ fontSize: 9.5, color: "#8C8279" }}>now</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing indicator */}
                        {typingSide !== null && (
                          <motion.div key="typing"
                            initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", justifyContent: typingSide === "right" ? "flex-end" : "flex-start" }}
                          >
                            <div style={{
                              padding: "9px 13px",
                              borderRadius: typingSide === "right" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                              background: typingSide === "right" ? "#DCF8C6" : "#fff",
                              display: "flex", gap: 4, alignItems: "center",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                            }}>
                              {[0, 1, 2].map(j => (
                                <motion.div key={j}
                                  style={{ width: 5.5, height: 5.5, borderRadius: "50%", background: "#8C8279" }}
                                  animate={{ y: [0, -4, 0] }}
                                  transition={{ repeat: Infinity, duration: 0.72, delay: j * 0.14, ease: "easeInOut" }}
                                />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                  </motion.div>
                )}

                {/* ── CONFIRMED — full-screen centered ────────────────── */}
                {(stage === "confirmed" || stage === "pause") && (
                  <motion.div key="confirmed"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.38 }}
                    style={{ flex: 1, background: "#f2f2f7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 22px", gap: 16 }}
                  >
                    {/* Big check */}
                    <motion.div
                      initial={{ scale: 0.45, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 270, damping: 18, delay: 0.08 }}
                      style={{
                        width: 72, height: 72, borderRadius: "50%",
                        background: "linear-gradient(145deg, #2D6A4F, #3a8760)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        boxShadow: "0 8px 26px rgba(45,106,79,0.34)",
                      }}
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M8 17l6 6 12-12" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </motion.div>

                    {/* Headline */}
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.36 }}
                      style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1A", letterSpacing: "-0.02em", fontFamily: "-apple-system, sans-serif", marginBottom: 6 }}>
                        Reservation confirmed
                      </div>
                      <div style={{ fontSize: 13, color: "#5C564F", lineHeight: 1.55 }}>{tomorrow} · 7:00 pm · 5 guests</div>
                      <div style={{ fontSize: 11, color: "#8C8279", marginTop: 3 }}>Saved to your booking system</div>
                    </motion.div>

                    {/* Detail card */}
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.36 }}
                      style={{ width: "100%", background: "white", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(45,106,79,0.11)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                      {[["Guest", "Nicole"], ["Date", `${tomorrow} · 7:00 pm`], ["Covers", "5 guests"]].map(([k, v], i, arr) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: i < arr.length - 1 ? 8 : 0, marginBottom: i < arr.length - 1 ? 8 : 0, borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                          <span style={{ fontSize: 10.5, color: "#8C8279", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                          <span style={{ fontSize: 11.5, color: "#1C1C1A", fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                    </motion.div>

                    {/* Llynne attribution */}
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58 }}
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#2D6A4F", fontWeight: 600 }}>
                      <span>✦</span>
                      <span>Handled automatically by Llynne</span>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>{/* screen surface */}
        </div>{/* screen bezel */}

        {/* Glare highlight */}
        <div style={{ position: "absolute", inset: BEZEL, borderRadius: SCREEN_R, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)", pointerEvents: "none", zIndex: 20 }} />
      </motion.div>

      {/* Llynne badge */}
      <AnimatePresence>
        {(stage === "detected" || stage === "chat") && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 4 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ position: "absolute", right: -90, top: 52, background: "#2D6A4F", color: "white", fontSize: 10, fontWeight: 700, padding: "5px 11px", borderRadius: 999, boxShadow: "0 4px 14px rgba(45,106,79,0.44)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
          >
            ✦ Llynne
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
