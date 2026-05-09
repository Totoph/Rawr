"use client"

import { useEffect, useState } from "react"

interface AnimatedTextRevealProps {
  textSize?: string
}

export function AnimatedTextReveal({ textSize = "text-6xl lg:text-8xl" }: AnimatedTextRevealProps) {
  const [word, setWord] = useState("talk")
  const [animate, setAnimate] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    setAnimate(true)

    const words = ["talk", "walk", "date"]
    let currentIndex = 0

    const timer = setInterval(() => {
      setAnimate(true)
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % words.length
        setWord(words[currentIndex])
      }, 700)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  const letters = word.split("")

  return (
    <>
      <style>{`
        @keyframes waveLetter {
          0% {
            opacity: 0;
            transform: translateY(8px);
            color: #a855f7;
          }
          60% {
            color: #a855f7;
          }
          100% {
            opacity: 1;
            transform: translateY(0);
            color: #000;
          }
        }

        .wave-letter {
          display: inline-block;
          animation: waveLetter 0.5s ease-out forwards;
        }

        .static-word {
          display: inline-block;
          color: #000;
        }
      `}</style>

      <div className={`mt-8 ${textSize} leading-tight`} style={{ minHeight: '1.2em' }}>
        <span className="font-normal">Go on a </span>
        <span style={{ minWidth: '140px', display: 'inline-block', fontWeight: 'bold' }}>
          {isMounted && animate ? (
            letters.map((letter, index) => (
              <span
                key={`${word}-${index}`}
                className="wave-letter"
                style={{
                  animationDelay: `${index * 0.07}s`,
                }}
              >
                {letter}
              </span>
            ))
          ) : (
            <span className="static-word">{word}</span>
          )}
        </span>
        <span className="font-normal"> with your pet</span>
      </div>
    </>
  )
}
