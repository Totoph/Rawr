"use client"

import { useEffect, useState } from "react"
import { content } from "@/content/en"

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <>
      {/* Floating pill nav — always centered, floats above content */}
      <header className="fixed top-5 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
        <div
          className={`pointer-events-auto transition-all duration-500 ease-out w-full max-w-3xl rounded-2xl ${
            scrolled
              ? "shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.6)]"
              : "shadow-[0_4px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]"
          }`}
          style={{
            background: scrolled
              ? "rgba(250,248,245,0.72)"
              : "rgba(250,248,245,0.55)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(255,255,255,0.45)",
          }}
        >
          <nav className="px-5 h-14 flex items-center justify-between gap-4">
            {/* Logo */}
            <a
              href="/"
              className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold italic text-[#2D6A4F] tracking-tight shrink-0"
            >
              {content.nav.logo}
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-6">
              {content.nav.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] font-medium text-[#5C564F] hover:text-[#1C1C1A] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Desktop CTA */}
            <a
              href="#contact"
              className="hidden md:inline-flex items-center px-4 py-2 rounded-xl bg-[#2D6A4F] text-white text-[13px] font-semibold hover:bg-[#245940] transition-colors shrink-0"
            >
              {content.nav.cta}
            </a>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 text-[#1C1C1A] rounded-lg hover:bg-black/5 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M3 3l12 12M15 3L3 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              ) : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M2 4.5h14M2 9h14M2 13.5h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              )}
            </button>
          </nav>

          {/* Mobile drawer — expands inside the pill */}
          {mobileOpen && (
            <div
              className="md:hidden border-t px-5 pb-5 pt-3"
              style={{ borderColor: "rgba(224,216,206,0.6)" }}
            >
              <ul className="flex flex-col">
                {content.nav.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={handleLinkClick}
                      className="block py-3 text-sm font-medium text-[#5C564F] hover:text-[#1C1C1A] transition-colors border-b last:border-0"
                      style={{ borderColor: "rgba(224,216,206,0.5)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                onClick={handleLinkClick}
                className="flex items-center justify-center w-full mt-4 px-5 py-3 rounded-xl bg-[#2D6A4F] text-white text-sm font-semibold hover:bg-[#245940] transition-colors"
              >
                {content.nav.cta}
              </a>
            </div>
          )}
        </div>
      </header>
    </>
  )
}
