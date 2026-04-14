interface FooterProps {
  logo: string
  copyright: string
}

export function Footer({ logo, copyright }: FooterProps) {
  return (
    <footer className="border-t border-[#F0DFC8] px-[10%] py-7 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div className="text-[18px] font-black text-[#3D2314]">
        {logo}<span className="text-[#E8B83A]">.</span>
      </div>
      <p className="text-[12px] text-[#7A4528]">{copyright}</p>
    </footer>
  )
}
