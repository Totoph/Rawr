"use client"

import React, { useEffect, useRef, ReactNode } from "react"

interface TextSegment {
  text: string
  className?: string
}

interface DiaTextRevealProps {
  segments: (TextSegment | string)[]
  duration?: number
}

export function DiaTextReveal({ segments, duration = 3000 }: DiaTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const totalSegments = segments.length
    const segmentDuration = duration / totalSegments

    segments.forEach((segment, index) => {
      const segmentElement = container.children[index] as HTMLElement
      if (!segmentElement) return

      setTimeout(() => {
        segmentElement.style.animation = `revealText 0.6s ease-out forwards`
      }, index * segmentDuration)
    })
  }, [segments, duration])

  return (
    <>
      <style>{`
        @keyframes revealText {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <div ref={containerRef} className="flex flex-wrap gap-1">
        {segments.map((segment, index) => {
          const isString = typeof segment === "string"
          const text = isString ? segment : segment.text
          const className = isString ? "" : (segment.className || "")

          return (
            <span
              key={index}
              className={`inline-block opacity-0 ${className}`}
              style={{ whiteSpace: "nowrap" }}
            >
              {text}
            </span>
          )
        })}
      </div>
    </>
  )
}
