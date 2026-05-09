"use client"

import Image from "next/image"
import { AnimatedTextReveal } from "./AnimatedTextReveal"

interface HeroProps {
  tag: string
  headline: string
  subheadlineStart: string
  subheadlineHighlight1: string
  subheadlineMiddle: string
  subheadlineHighlight2: string
  subheadlineEnd: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  socialProof: {
    avatars: string[]
    text: string
    count: string
  }
  logoImageWidth?: number
  logoImageHeight?: number
  logoImageMaxWidth?: string
  logoImageScale?: number
}

export function Hero({
  tag,
  headline,
  subheadlineStart,
  subheadlineHighlight1,
  subheadlineMiddle,
  subheadlineHighlight2,
  subheadlineEnd,
  subheadline,
  ctaPrimary,
  ctaSecondary,
  socialProof,
  logoImageWidth = 1000,
  logoImageHeight = 400,
  logoImageMaxWidth = "xl",
  logoImageScale = 100,
}: HeroProps) {
  return (
    <section className="relative bg-white overflow-visible pb-12">
      {/* Background border frame */}
      <div className="absolute z-0 pointer-events-none" style={{
        top: '80px',
        left: '3%',
        right: '3%',
        bottom: '150px',
        border: '2px solid black',
        borderRadius: '24px',
        margin: '0',
      }} />

      {/* Heart decoration - positioned to overlap */}
      <div className="absolute -left-96 z-10 w-[800px] h-[800px] pointer-events-none hidden lg:block" style={{
        top: '228px',
      }}>
        <Image
          src="/assets/design/Plan de travail 1landing1Coeur.png"
          alt=""
          width={800}
          height={800}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Main content grid */}
      <div className="relative z-20 grid grid-cols-1 lg:grid-cols-[70%_30%] gap-0 min-h-screen pt-16 lg:pt-12">
        {/* Left — copy */}
        <div className="flex flex-col justify-center pl-[8%] pr-[8%] py-8 lg:py-0 order-2 lg:order-1">
          {/* Full design with logo and tagline */}
          <div className={`mb-6 max-w-${logoImageMaxWidth}`} style={{
            marginLeft: '8%',
            marginTop: '-40px',
            marginBottom: '-90px',
            transform: `scale(${logoImageScale / 150})`,
            transformOrigin: 'left',
          }}>
            <Image
              src="/assets/design/Meet_throught_your_pet.png"
              alt="Rawr — Because your dog was tired of watching you be single"
              width={logoImageWidth}
              height={logoImageHeight}
              className="w-full h-auto object-contain"
            />
          </div>

          {/* Animated text reveal */}
          <div style={{ marginLeft: '8%', marginRight: '-18%', paddingRight: '8%' }}>
            <AnimatedTextReveal textSize="text-xl lg:text-5xl" />
          </div>

          {/* Descriptive text */}
          <p className="text-base lg:text-lg text-[#000000] leading-[1.7] mb-6" style={{
            marginLeft: '8%',
            marginRight: '-10%',
            paddingRight: '10%'
          }}>
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 mb-8" style={{ marginLeft: '8%' }}>
            <button
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 bg-[#BC4AD8] text-white font-bold text-base px-8 py-3.5 rounded-full hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(188,74,216,0.5)] transition-all duration-200"
            >
              {ctaPrimary}
            </button>
            <button
              onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center bg-white text-black font-bold text-base px-8 py-3 rounded-full border-2 border-black hover:bg-black hover:text-white transition-all duration-200"
            >
              {ctaSecondary}
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3" style={{ marginLeft: '8%' }}>
            <div className="flex">
              {socialProof.avatars.map((emoji, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-[2px] border-black bg-[#EFCA9E] flex items-center justify-center text-[15px] -ml-2.5 first:ml-0"
                >
                  {emoji}
                </div>
              ))}
            </div>
            <p className="text-[12px] text-[#6A4125] font-semibold">
              <strong className="text-black">{socialProof.count}</strong> {socialProof.text}
            </p>
          </div>
        </div>

        {/* Right — Dog image */}
        <div className="relative flex items-center justify-center py-8 lg:py-0 flex-col order-1 lg:order-2" style={{
          paddingRight: '5%', // Espacement droit de la section
          paddingLeft: '5%',
        }}>
          {/* Dog image with shadow */}
          <div className="relative w-full flex items-end justify-center" style={{
            maxWidth: 'clamp(200px, 50vw, 320px)', // Responsive: 200px on mobile, 50vw scaling, max 320px on desktop
            marginBottom: '-80px', // AJUSTABLE: espace avant l'ombre du sol
            // === Image shadow (drop-shadow) ===
            filter: 'drop-shadow(0px 40px 60px rgba(0, 0, 0, 0.15))',
            // Format: drop-shadow(offset-x offset-y blur-radius color)
            // Ajuste: offset-x (0px), offset-y (40px), blur-radius (60px), opacity (0.15)
          }}>
            <Image
              src="/assets/photos/chien_noir_frontpage.png"
              alt="Black dog"
              width={280}
              height={420}
              className="w-full h-auto object-contain"
              priority
            />
          </div>

          {/* Ground shadow (ellipse) */}
          <div className="w-full flex justify-center" style={{
            maxWidth: 'clamp(200px, 50vw, 320px)', // Doit correspondre à maxWidth ci-dessus
          }}>
            <div style={{
              // === Shadow dimensions ===
              width: '75%', // AJUSTABLE: largeur relative de l'ombre
              height: '25px', // AJUSTABLE: hauteur de l'ombre

              // === Shadow gradient & shape ===
              background: 'radial-gradient(ellipse 100% 100% at center, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0) 70%)',
              // Ajuste l'opacité: 0.3 (noir) → 0 (transparent)
              borderRadius: '50%',

              // === Shadow blur ===
              filter: 'blur(10px)', // AJUSTABLE: intensité du flou
            }} />
          </div>
        </div>
      </div>
    </section>
  )
}
