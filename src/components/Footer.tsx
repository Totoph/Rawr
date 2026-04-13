import { content } from "@/content/en"

export function Footer() {
  return (
    <footer className="bg-[#1C1C1A] text-white py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold italic text-[#1DB954] mb-2">
              RAWR
            </div>
            <p className="text-sm text-white/50">{content.footer.tagline}</p>
          </div>

          {/* Nav links */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
              Navigation
            </div>
            {content.footer.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Legal links */}
          <div className="flex flex-col gap-2">
            <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-1">
              Legal
            </div>
            {content.footer.legal.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-white/60 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-white/30">{content.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
