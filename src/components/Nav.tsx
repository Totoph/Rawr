"use client"

import { useEffect, useState } from "react"

interface NavLink {
  label: string
  href: string
}

interface NavProps {
  logo: string
  links: NavLink[]
  cta: string
}

export function Nav({ logo, links, cta }: NavProps) {
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
    <header className={`sticky top-0 z-50 border-b border-black transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md" : "bg-white"}`}>
      <nav className="px-[10%] h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="text-[22px] font-black text-black tracking-tight">
          {logo}<span className="text-[#BC4AD8]">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="text-sm font-semibold text-black hover:text-[#BC4AD8] transition-colors">
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <a
          href="#waitlist"
          className="hidden md:inline-flex items-center px-[22px] py-[10px] rounded-full bg-[#BC4AD8] text-white text-[13px] font-bold border border-black hover:bg-[#a03abf] transition-all duration-200 hover:scale-[1.04]"
        >
          {cta}
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-1.5 text-black rounded-lg hover:bg-black/5 transition-colors"
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

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden border-t border-black px-[10%] pb-5 pt-3 bg-white">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className="block py-3 text-sm font-semibold text-black hover:text-[#BC4AD8] transition-colors border-b border-black/10 last:border-0"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            onClick={handleLinkClick}
            className="flex items-center justify-center w-full mt-4 px-5 py-3 rounded-full bg-[#BC4AD8] text-white text-sm font-bold border border-black hover:bg-[#a03abf] transition-colors"
          >
            {cta}
          </a>
        </div>
      )}
    </header>
  )
}
