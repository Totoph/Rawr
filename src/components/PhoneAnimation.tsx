"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

type Stage = "profile" | "swipe" | "match" | "chat" | "confirmed" | "pause"
interface ChatMessage { from: "app" | "user"; text: string }

const STAGE_DURATIONS: Record<Stage, number> = {
  profile:   4000,
  swipe:     2500,
  match:     3500,
  chat:     14000,
  confirmed: 3500,
  pause:     1000,
}
const TOTAL = Object.values(STAGE_DURATIONS).reduce((a, b) => a + b, 0)

function getStageAt(elapsed: number): Stage {
  let acc = 0
  for (const [s, d] of Object.entries(STAGE_DURATIONS) as [Stage, number][]) {
    acc += d
    if (elapsed < acc) return s
  }
  return "profile"
}

const MSG_APPEAR    = [800, 3500, 6500, 10000]
const TYPING_WINDOW = 900

function SignalBars({ color }: { color: string }) {
  const heights = [4, 6, 9, 12]
  return (
    <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
      {heights.map((h, i) => (
        <rect key={i} x={i * 4.5} y={12 - h} width={3} height={h} rx={1} fill={color} opacity={i === 3 ? 1 : 0.9} />
      ))}
    </svg>
  )
}

function BatteryIcon({ color }: { color: string }) {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={color} strokeOpacity="0.35" />
      <rect x="2" y="2" width="17" height="9" rx="2" fill={color} />
      <path d="M24.5 4.5v4a2 2 0 000-4z" fill={color} fillOpacity="0.4" />
    </svg>
  )
}

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
    <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em", color, fontFamily: "-apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif", lineHeight: 1 }}>
      {time}
    </span>
  )
}

function StatusBar({ onDark }: { onDark?: boolean }) {
  const fg = onDark ? "white" : "#1C1C1A"
  return (
    <div style={{ height: 50, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", position: "relative", background: "transparent" }}>
      <div style={{ display: "flex", alignItems: "center", width: 60 }}>
        <LiveClock color={fg} />
      </div>
      <div style={{ position: "absolute", top: 12, left: "50%", transform: "translateX(-50%)", width: 74, height: 22, background: "#000", borderRadius: 12, zIndex: 10 }} />
      <div style={{ width: 60, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
        <SignalBars color={fg} />
        <BatteryIcon color={fg} />
      </div>
    </div>
  )
}

function DogProfileCard({ animateOut }: { animateOut: boolean }) {
  return (
    <motion.div
      animate={animateOut ? { x: 320, rotate: 20, opacity: 0 } : { x: 0, rotate: 0, opacity: 1 }}
      transition={animateOut ? { duration: 0.55, ease: [0.32, 0, 0.67, 0] } : { duration: 0.3 }}
      style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(180deg, #e8f5e9 0%, #faf8f5 60%)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <div style={{ height: 200, background: "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)", position: "relative", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 72 }}>🐕</span>
        {animateOut && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              position: "absolute",
              top: 16,
              left: 16,
              background: "#1DB954",
              color: "white",
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: "0.1em",
              padding: "5px 14px",
              borderRadius: 999,
              border: "2.5px solid white",
              transform: "rotate(-12deg)",
            }}
          >
            LIKE
          </motion.div>
        )}
        <div style={{ position: "absolute", top: 12, right: 12, background: "rgba(0,0,0,0.45)", color: "white", fontSize: 10, fontWeight: 600, padding: "3px 9px", borderRadius: 999, backdropFilter: "blur(4px)" }}>
          1.2 km away
        </div>
      </div>

      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
          <span style={{ fontSize: 20, fontWeight: 700, color: "#1A1A1A", fontFamily: "-apple-system, sans-serif" }}>Max</span>
          <span style={{ fontSize: 13, color: "#5C564F" }}>3 y.o. · Golden Retriever</span>
        </div>

        <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
          {["Playful", "Morning walks", "Loves parks"].map((tag) => (
            <span key={tag} style={{ fontSize: 10, fontWeight: 600, background: "rgba(29,185,84,0.1)", color: "#17a34a", border: "1px solid rgba(29,185,84,0.25)", borderRadius: 999, padding: "2px 8px" }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 6, borderTop: "1px solid rgba(0,0,0,0.06)" }}>
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg, #1A1A1A, #444)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ color: "white", fontSize: 13 }}>S</span>
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1A1A1A" }}>Sophie, 28</div>
            <div style={{ fontSize: 10, color: "#8C8279" }}>Dog lover · Paris</div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: "auto", paddingTop: 8 }}>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "white", border: "2px solid #FF3B30", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(255,59,48,0.2)" }}>
            <span style={{ fontSize: 22 }}>✕</span>
          </div>
          <div style={{ width: 50, height: 50, borderRadius: "50%", background: "#1DB954", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 14px rgba(29,185,84,0.35)" }}>
            <span style={{ fontSize: 22 }}>♥</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function PhoneAnimation() {
  const [elapsed, setElapsed] = useState(0)
  const [visibleMessages, setVisibleMessages] = useState(0)
  const [typingSide, setTypingSide] = useState<"left" | "right" | null>(null)
  const rafRef = useRef<number>(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [visibleMessages, typingSide])

  const messages: ChatMessage[] = [
    { from: "app",  text: "Hey! Your dogs would love each other 🐕" },
    { from: "user", text: "Haha totally! Want to meet this weekend?" },
    { from: "app",  text: "Saturday morning at Parc Monceau?" },
    { from: "user", text: "Perfect, see you at 10am! 🐾" },
  ]

  useEffect(() => {
    const startTime = performance.now()
    function tick(now: number) {
      const e = (now - startTime) % TOTAL
      setElapsed(e)

      const chatStart = STAGE_DURATIONS.profile + STAGE_DURATIONS.swipe + STAGE_DURATIONS.match
      const chatEnd   = chatStart + STAGE_DURATIONS.chat

      if (e >= chatStart && e < chatEnd) {
        const c = e - chatStart
        let count = 0
        for (const t of MSG_APPEAR) { if (c >= t) count++ }
        setVisibleMessages(count)

        let typing: "left" | "right" | null = null
        if (count < 1 && c >= MSG_APPEAR[0] - TYPING_WINDOW) typing = "left"
        if (count >= 1 && count < 2 && c >= MSG_APPEAR[1] - TYPING_WINDOW) typing = "right"
        if (count >= 2 && count < 3 && c >= MSG_APPEAR[2] - TYPING_WINDOW) typing = "left"
        if (count >= 3 && count < 4 && c >= MSG_APPEAR[3] - TYPING_WINDOW) typing = "right"
        setTypingSide(typing)
      } else {
        setVisibleMessages(0)
        setTypingSide(null)
      }
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const stage = getStageAt(elapsed)
  const isChat = stage === "chat" || stage === "confirmed" || stage === "pause"

  const SHELL_W  = 248
  const SHELL_H  = 504
  const SHELL_R  = 44
  const BEZEL    = 9
  const SCREEN_R = SHELL_R - BEZEL + 1

  return (
    <div className="relative flex items-center justify-center w-full" style={{ height: SHELL_H + 32 }}>
      <div className="absolute pointer-events-none" style={{ width: SHELL_W + 100, height: SHELL_H + 60, top: "50%", left: "50%", transform: "translate(-50%, -50%)", background: "radial-gradient(ellipse at center, rgba(29,185,84,0.11) 0%, transparent 65%)", filter: "blur(20px)" }} />

      <motion.div
        style={{
          position: "relative",
          width: SHELL_W,
          height: SHELL_H,
          borderRadius: SHELL_R,
          flexShrink: 0,
          background: "linear-gradient(160deg, #3a3a3a 0%, #1e1e1e 50%, #111 100%)",
          boxShadow: ["inset 1.5px 1.5px 0 rgba(255,255,255,0.13)", "inset -1px -1px 0 rgba(0,0,0,0.55)", "0 28px 70px rgba(0,0,0,0.35)", "0 6px 18px rgba(0,0,0,0.20)"].join(", "),
        }}
      >
        {[{ top: 88, h: 24 }, { top: 122, h: 40 }, { top: 172, h: 40 }].map((b, i) => (
          <div key={i} style={{ position: "absolute", left: -3.5, top: b.top, width: 3.5, height: b.h, background: "linear-gradient(to right, #151515, #2a2a2a)", borderRadius: "2px 0 0 2px" }} />
        ))}
        <div style={{ position: "absolute", right: -3.5, top: 118, width: 3.5, height: 58, background: "linear-gradient(to left, #151515, #2a2a2a)", borderRadius: "0 2px 2px 0" }} />

        <div style={{ position: "absolute", inset: BEZEL, borderRadius: SCREEN_R, overflow: "hidden", background: "#000" }}>
          <div style={{ width: "100%", height: "100%", borderRadius: SCREEN_R, overflow: "hidden", background: "#fff", display: "flex", flexDirection: "column" }}>

            <div style={{ background: isChat ? "#1A1A1A" : "transparent", flexShrink: 0 }}>
              <StatusBar onDark={isChat} />
            </div>

            <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <AnimatePresence mode="wait">

                {stage === "profile" && (
                  <motion.div key="profile"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ flex: 1, position: "relative", overflow: "hidden" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#FAF8F5", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
                      <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 18, fontWeight: 700, fontStyle: "italic", color: "#1DB954" }}>RAWR</span>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 14 }}>🔔</span>
                        <span style={{ fontSize: 14 }}>💬</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, top: 38 }}>
                      <DogProfileCard animateOut={false} />
                    </div>
                  </motion.div>
                )}

                {stage === "swipe" && (
                  <motion.div key="swipe"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flex: 1, position: "relative", overflow: "hidden", background: "#FAF8F5" }}
                  >
                    <div style={{ position: "absolute", inset: 0, top: 38, transform: "scale(0.94)", transformOrigin: "top center", opacity: 0.6 }}>
                      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, #fce4ec 0%, #faf8f5 60%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: 72 }}>🐩</span>
                        <div style={{ marginTop: 12, fontSize: 16, fontWeight: 700, color: "#1A1A1A" }}>Luna, 2 y.o.</div>
                        <div style={{ fontSize: 12, color: "#5C564F" }}>Poodle · 0.8 km</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 14px", background: "#FAF8F5", borderBottom: "1px solid rgba(0,0,0,0.06)", position: "absolute", top: 0, left: 0, right: 0, zIndex: 10 }}>
                      <span style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 18, fontWeight: 700, fontStyle: "italic", color: "#1DB954" }}>RAWR</span>
                      <div style={{ display: "flex", gap: 10 }}>
                        <span style={{ fontSize: 14 }}>🔔</span>
                        <span style={{ fontSize: 14 }}>💬</span>
                      </div>
                    </div>
                    <div style={{ position: "absolute", inset: 0, top: 38 }}>
                      <DogProfileCard animateOut={true} />
                    </div>
                  </motion.div>
                )}

                {stage === "match" && (
                  <motion.div key="match"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    style={{ flex: 1, background: "#0f0f0f", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16, padding: "20px 20px" }}
                  >
                    {[...Array(8)].map((_, i) => (
                      <motion.div key={i}
                        initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], x: Math.cos(i * 45 * Math.PI / 180) * 60, y: Math.sin(i * 45 * Math.PI / 180) * 60 }}
                        transition={{ delay: 0.2 + i * 0.05, duration: 1.2 }}
                        style={{ position: "absolute", width: 6, height: 6, borderRadius: "50%", background: i % 2 === 0 ? "#1DB954" : "#fff", top: "40%", left: "50%" }}
                      />
                    ))}
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #a5d6a7, #66bb6a)", border: "3px solid #0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, zIndex: 2 }}>
                        🐕
                      </motion.div>
                      <motion.div initial={{ x: 40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, type: "spring", stiffness: 260, damping: 20 }}
                        style={{ width: 56, height: 56, borderRadius: "50%", background: "linear-gradient(135deg, #f8bbd0, #f48fb1)", border: "3px solid #0f0f0f", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, marginLeft: -12 }}>
                        🐩
                      </motion.div>
                    </div>
                    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                      style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "var(--font-cormorant), serif", fontSize: 28, fontWeight: 700, fontStyle: "italic", color: "#1DB954", lineHeight: 1.1 }}>
                        It&apos;s a Match!
                      </div>
                      <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
                        You and Sophie both liked each other
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                      style={{ background: "#1DB954", color: "white", fontWeight: 700, fontSize: 13, padding: "10px 28px", borderRadius: 999, cursor: "pointer" }}>
                      Send a message
                    </motion.div>
                  </motion.div>
                )}

                {stage === "chat" && (
                  <motion.div key="chat"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}
                    style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 12px 8px", background: "#1A1A1A" }}>
                      <svg width="9" height="15" viewBox="0 0 9 15" fill="none">
                        <path d="M7.5 1.5L1.5 7.5l6 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #a5d6a7, #66bb6a)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 18 }}>
                        🐕
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "white", fontSize: 13, fontWeight: 600 }}>Sophie & Max</div>
                        <div style={{ color: "rgba(255,255,255,0.5)", fontSize: 10 }}>1.2 km · online</div>
                      </div>
                    </div>

                    <div ref={scrollRef} style={{ flex: 1, padding: "8px 10px", background: "#EBE0D6", display: "flex", flexDirection: "column", gap: 5, overflowY: "auto", scrollBehavior: "smooth" }}>
                      <AnimatePresence>
                        {messages.slice(0, visibleMessages).map((msg, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 10, scale: 0.93 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.27, type: "spring", stiffness: 300, damping: 26 }}
                            style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}
                          >
                            <div style={{
                              maxWidth: "80%", padding: "7px 10px",
                              borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                              background: msg.from === "user" ? "#DCF8C6" : "#fff",
                              fontSize: 12, lineHeight: 1.45, color: "#1C1C1A",
                              boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
                            }}>
                              {msg.text}
                              <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
                                <span style={{ fontSize: 9.5, color: "#8C8279" }}>now</span>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        {typingSide !== null && (
                          <motion.div key="typing"
                            initial={{ opacity: 0, y: 8, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex", justifyContent: typingSide === "right" ? "flex-end" : "flex-start" }}
                          >
                            <div style={{ padding: "9px 13px", borderRadius: typingSide === "right" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: typingSide === "right" ? "#DCF8C6" : "#fff", display: "flex", gap: 4, alignItems: "center", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
                              {[0, 1, 2].map(j => (
                                <motion.div key={j} style={{ width: 5.5, height: 5.5, borderRadius: "50%", background: "#8C8279" }}
                                  animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.72, delay: j * 0.14, ease: "easeInOut" }} />
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}

                {(stage === "confirmed" || stage === "pause") && (
                  <motion.div key="confirmed"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.38 }}
                    style={{ flex: 1, background: "#f2f2f7", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 22px", gap: 16 }}
                  >
                    <motion.div
                      initial={{ scale: 0.45, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 270, damping: 18, delay: 0.08 }}
                      style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(145deg, #1DB954, #17a34a)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 8px 26px rgba(29,185,84,0.34)" }}
                    >
                      <svg width="34" height="34" viewBox="0 0 34 34" fill="none">
                        <path d="M8 17l6 6 12-12" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22, duration: 0.36 }}
                      style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 18, fontWeight: 700, color: "#1C1C1A", letterSpacing: "-0.02em", fontFamily: "-apple-system, sans-serif", marginBottom: 6 }}>
                        Walk confirmed! 🐾
                      </div>
                      <div style={{ fontSize: 13, color: "#5C564F", lineHeight: 1.55 }}>Saturday · 10:00 am</div>
                      <div style={{ fontSize: 11, color: "#8C8279", marginTop: 3 }}>Parc Monceau, Paris</div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.36 }}
                      style={{ width: "100%", background: "white", borderRadius: 14, padding: "12px 14px", border: "1px solid rgba(29,185,84,0.15)", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
                      {[["With", "Sophie & Max"], ["Date", "Saturday · 10:00 am"], ["Location", "Parc Monceau"]].map(([k, v], i, arr) => (
                        <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: i < arr.length - 1 ? 8 : 0, marginBottom: i < arr.length - 1 ? 8 : 0, borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,0.05)" : "none" }}>
                          <span style={{ fontSize: 10.5, color: "#8C8279", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>{k}</span>
                          <span style={{ fontSize: 11.5, color: "#1C1C1A", fontWeight: 600 }}>{v}</span>
                        </div>
                      ))}
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.58 }}
                      style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "#1DB954", fontWeight: 600 }}>
                      <span>🐾</span>
                      <span>Organised via RAWR</span>
                    </motion.div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </div>
        </div>

        <div style={{ position: "absolute", inset: BEZEL, borderRadius: SCREEN_R, background: "linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 45%)", pointerEvents: "none", zIndex: 20 }} />
      </motion.div>

      <AnimatePresence>
        {(stage === "match" || stage === "chat") && (
          <motion.div
            initial={{ opacity: 0, x: 10, y: 4 }} animate={{ opacity: 1, x: 0, y: 0 }} exit={{ opacity: 0, scale: 0.88 }}
            transition={{ type: "spring", stiffness: 320, damping: 26 }}
            style={{ position: "absolute", right: -80, top: 52, background: "#1A1A1A", color: "white", fontSize: 10, fontWeight: 700, padding: "5px 11px", borderRadius: 999, boxShadow: "0 4px 14px rgba(0,0,0,0.3)", letterSpacing: "0.04em", whiteSpace: "nowrap" }}
          >
            🐾 RAWR
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
