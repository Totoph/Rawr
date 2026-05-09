"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

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
    const onScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true)
      }
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleLinkClick = () => setMobileOpen(false)

  return (
    <header className={`fixed top-8 z-50 rounded-2xl py-4 transition-all duration-500 ease-out bg-white/40 border backdrop-blur-xl`} style={{
        left: scrolled ? '5%' : '50%',
        right: scrolled ? '5%' : 'auto',
        transform: scrolled ? 'translateX(0)' : 'translateX(-50%)',
        width: scrolled ? 'auto' : 'auto',
        borderColor: scrolled ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.2)',
        boxShadow: scrolled ? '0 8px 32px rgba(0, 0, 0, 0.1)' : 'none',
        paddingLeft: scrolled ? '3rem' : '2rem',
        paddingRight: scrolled ? '3rem' : '2rem',
      }}>
      <nav className={`h-auto flex items-center transition-all duration-500 ease-out ${scrolled ? "justify-between gap-20" : "justify-center"}`}>
        {/* Logo */}
        <a href="/" className="flex items-center h-10">
          <Image
            src="/assets/logo/Plan de travail 1LogoRawr_Noir.png"
            alt="Rawr"
            height={40}
            width={80}
            className="object-contain"
          />
        </a>

        {/* Desktop links */}
        <ul className={`hidden md:flex items-center gap-8 transition-all duration-500 ${scrolled ? "opacity-100" : "opacity-0 hidden"}`}>
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
          className={`hidden md:inline-flex items-center px-[22px] py-[10px] rounded-full bg-[#BC4AD8] text-white text-[13px] font-bold hover:bg-[#a03abf] transition-all duration-500 hover:scale-[1.04] ${scrolled ? "opacity-100" : "opacity-0 hidden"}`}
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
            className="flex items-center justify-center w-full mt-4 px-5 py-3 rounded-full bg-[#BC4AD8] text-white text-sm font-bold hover:bg-[#a03abf] transition-colors"
          >
            {cta}
          </a>
        </div>
      )}
    </header>
  )
}
