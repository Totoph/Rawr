"use client"

import { useState } from "react"

interface WaitlistProps {
  headline: string
  subheadline: string
  placeholder: string
  cta: string
  successMessage: string
}

export function Waitlist({ headline, subheadline, placeholder, cta, successMessage }: WaitlistProps) {
  const [email, setEmail] = useState("")
  const [joined, setJoined] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) setJoined(true)
  }

  return (
    <section id="waitlist" className="mx-[10%] mt-8 mb-20 bg-[#d6a6e2] rounded-3xl px-8 md:px-16 py-16 text-center relative overflow-hidden">
      <img
        src="/assets/assets/design/coeur_waitlist.png"
        alt="heart decoration"
        className="absolute -bottom-10 -right-10 w-96 h-96 object-cover pointer-events-none"
      />
      <div className="relative z-10">
        <h2
          className="font-black text-black tracking-[-0.04em] leading-[1.1] mx-auto mb-4 max-w-[500px]"
          style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
        >
          {headline}
        </h2>
        <p className="text-black/70 text-base mb-9">
          {subheadline}
        </p>

        {joined ? (
          <p className="text-[#6A4125] text-lg font-extrabold">{successMessage}</p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-[440px] mx-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholder}
              required
              className="flex-1 px-5 py-[14px] rounded-full border border-black bg-white/30 text-black placeholder:text-black/50 text-sm outline-none focus:bg-white/50 transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-[14px] rounded-full bg-[#BC4AD8] text-white text-sm font-extrabold whitespace-nowrap hover:scale-[1.04] transition-transform duration-150"
            >
              {cta}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}
