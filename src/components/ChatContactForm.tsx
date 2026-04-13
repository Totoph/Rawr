"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send } from "lucide-react"
import { content } from "@/content/en"

type Message = {
  from: "llynne" | "user"
  text: string
}

export function ChatContactForm() {
  const { questions, farewell, farewellSub } = content.contact
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [done, setDone] = useState(false)
  const [typing, setTyping] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Resolve prompt with collected answers
  function resolvePrompt(template: string): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => answers[key] ?? key)
  }

  // Push the bot question for the current step
  function askStep(currentStep: number, currentAnswers: Record<string, string>) {
    if (currentStep >= questions.length) return
    const q = questions[currentStep]
    const prompt = resolvePrompt(q.prompt).replace(/\{(\w+)\}/g, (_, key) => currentAnswers[key] ?? key)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [...prev, { from: "llynne", text: prompt }])
      inputRef.current?.focus()
    }, 600)
  }

  // Initial question
  useEffect(() => {
    askStep(0, {})
  }, [])

  // Scroll chat container to bottom on new message
  useEffect(() => {
    const el = bottomRef.current?.parentElement
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, typing])

  function handleSend() {
    const value = input.trim()
    const q = questions[step]

    // Allow skipping optional
    if (!value && !q.optional) return

    const newAnswers = { ...answers, [q.key]: value || "(skipped)" }
    setAnswers(newAnswers)
    setMessages((prev) => [...prev, { from: "user", text: value || "(skipped)" }])
    setInput("")

    const nextStep = step + 1
    if (nextStep >= questions.length) {
      // Done
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        setMessages((prev) => [...prev, { from: "llynne", text: farewell }])
        setDone(true)
      }, 800)
    } else {
      setStep(nextStep)
      setTimeout(() => askStep(nextStep, newAnswers), 200)
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full max-h-[520px] min-h-[400px]">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 bg-[#1A1A1A] rounded-t-2xl">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <span className="text-white font-[family-name:var(--font-cormorant)] text-lg font-bold italic">R</span>
        </div>
        <div>
          <div className="text-white text-sm font-semibold">RAWR</div>
          <div className="text-white/70 text-xs">Early access</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-[#ECE5DD]">
        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.22, type: "spring" }}
              className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
            >
              {msg.from === "llynne" && (
                <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                  <span className="text-white text-xs font-bold font-[family-name:var(--font-cormorant)] italic">R</span>
                </div>
              )}
              <div
                className={`max-w-[78%] px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  msg.from === "user"
                    ? "bg-[#1DB954] text-white rounded-br-sm"
                    : "bg-white text-[#1C1C1A] rounded-bl-sm"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-end gap-2"
            >
              <div className="w-7 h-7 rounded-full bg-[#1A1A1A] flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold font-[family-name:var(--font-cormorant)] italic">R</span>
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm flex gap-1 items-center">
                {[0, 1, 2].map((j) => (
                  <motion.div
                    key={j}
                    className="w-1.5 h-1.5 bg-[#7A7167] rounded-full"
                    animate={{ y: [0, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8, delay: j * 0.15 }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done summary */}
        {done && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-xl p-4 border border-[#E0D8CE] shadow-sm text-sm"
          >
            <p className="text-xs text-[#7A7167] mb-2">{farewellSub}</p>
            <div className="space-y-1">
              {questions.map((q) => (
                answers[q.key] && answers[q.key] !== "(skipped)" ? (
                  <div key={q.key} className="flex gap-2 text-xs">
                    <span className="text-[#7A7167] capitalize w-20 flex-shrink-0">{q.key}:</span>
                    <span className="text-[#1C1C1A] font-medium">{answers[q.key]}</span>
                  </div>
                ) : null
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {!done && (
        <div className="flex items-center gap-2 px-4 py-3 bg-[#F2EDE6] border-t border-[#E0D8CE] rounded-b-2xl">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              questions[step]?.optional ? "Type your message… (optional)" : "Type your answer…"
            }
            className="flex-1 bg-white border border-[#E0D8CE] rounded-full px-4 py-2 text-sm text-[#1C1C1A] placeholder:text-[#7A7167] outline-none focus:border-[#1DB954] transition-colors"
            disabled={typing}
          />
          <button
            onClick={handleSend}
            disabled={typing || (!input.trim() && !questions[step]?.optional)}
            className="w-9 h-9 rounded-full bg-[#1A1A1A] flex items-center justify-center disabled:opacity-40 hover:bg-[#333] transition-colors"
          >
            <Send size={14} className="text-white" />
          </button>
        </div>
      )}
    </div>
  )
}
