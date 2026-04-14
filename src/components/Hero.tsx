"use client"

import { PhoneAnimation } from "./PhoneAnimation"

interface HeroProps {
  tag: string
  headline: string
  headlineHighlight: string
  headlineEnd: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  socialProof: {
    avatars: string[]
    text: string
    count: string
  }
}

export function Hero({
  tag,
  headline,
  headlineHighlight,
  headlineEnd,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  socialProof,
}: HeroProps) {
  return (
    <section className="relative min-h-[92vh] grid grid-cols-1 lg:grid-cols-2 items-center gap-[60px] px-[10%] pt-20 pb-16 overflow-hidden">
      {/* Background circle */}
      <div className="absolute -top-20 -right-20 w-[420px] h-[420px] rounded-full bg-[#FFF3C4] pointer-events-none" />

      {/* Left — copy */}
      <div className="relative z-10">
        {/* Tag */}
        <div className="inline-flex items-center gap-1.5 bg-[#F5C842] text-[#3D2314] text-[11px] font-extrabold px-[14px] py-[6px] rounded-full uppercase tracking-[0.08em] mb-6">
          {tag}
        </div>

        {/* Headline */}
        <h1
          className="font-black text-[#3D2314] tracking-[-0.04em] leading-[1.05] mb-5"
          style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
        >
          {headline}
          <br />
          your dog{" "}
          <span className="relative inline-block text-[#7A4528]">
            {headlineHighlight}
            <span className="absolute bottom-1 left-0 right-0 h-[10px] bg-[#F5C842] opacity-50 rounded-[4px] -z-10" />
          </span>{" "}
          {headlineEnd}
        </h1>

        {/* Subheadline */}
        <p className="text-base text-[#7A4528] leading-[1.7] mb-9 max-w-[440px]">
          {subheadline}
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap gap-3.5 mb-12">
          <button
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 bg-[#F5C842] text-[#3D2314] font-extrabold text-[15px] px-[30px] py-[15px] rounded-full hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(245,200,66,0.4)] transition-all duration-200"
          >
            {ctaPrimary}
          </button>
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center bg-transparent text-[#3D2314] font-bold text-[15px] px-[28px] py-[13px] rounded-full border-2 border-[#3D2314] hover:bg-[#3D2314] hover:text-[#F5C842] transition-all duration-200"
          >
            {ctaSecondary}
          </button>
        </div>

        {/* Social proof */}
        <div className="flex items-center gap-3.5">
          <div className="flex">
            {socialProof.avatars.map((emoji, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full border-[2.5px] border-[#FDF6EC] bg-[#F0DFC8] flex items-center justify-center text-[17px] -ml-2.5 first:ml-0"
              >
                {emoji}
              </div>
            ))}
          </div>
          <p className="text-[13px] text-[#7A4528] font-semibold">
            <strong className="text-[#3D2314]">{socialProof.count}</strong> {socialProof.text}
          </p>
        </div>
      </div>

      {/* Right — phone animation */}
      <div className="relative z-10 hidden lg:flex items-center justify-center">
        <PhoneAnimation />
      </div>
    </section>
  )
}
