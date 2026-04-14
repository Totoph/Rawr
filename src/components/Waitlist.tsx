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
    <section id="waitlist" className="mx-[10%] mb-20 bg-[#3D2314] rounded-[28px] px-8 md:px-16 py-16 text-center relative overflow-hidden">
      <h2
        className="font-black text-[#F5C842] tracking-[-0.04em] leading-[1.1] mx-auto mb-4 max-w-[500px]"
        style={{ fontSize: "clamp(28px, 4vw, 46px)" }}
      >
        {headline}
      </h2>
      <p className="text-[rgba(253,246,236,0.7)] text-base mb-9">
        {subheadline}
      </p>

      {joined ? (
        <p className="text-[#F5C842] text-lg font-extrabold">{successMessage}</p>
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
            className="flex-1 px-5 py-[14px] rounded-full border-2 border-[rgba(245,200,66,0.3)] bg-[rgba(255,255,255,0.08)] text-[#FDF6EC] placeholder:text-[rgba(253,246,236,0.4)] text-sm outline-none focus:border-[#F5C842] transition-colors"
          />
          <button
            type="submit"
            className="px-6 py-[14px] rounded-full bg-[#F5C842] text-[#3D2314] text-sm font-extrabold whitespace-nowrap hover:scale-[1.04] transition-transform duration-150"
          >
            {cta}
          </button>
        </form>
      )}
    </section>
  )
}
