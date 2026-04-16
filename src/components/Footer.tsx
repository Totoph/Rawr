interface FooterProps {
  logo: string
  copyright: string
}

export function Footer({ logo, copyright }: FooterProps) {
  return (
    <footer className="border-t border-black px-[10%] py-7 flex flex-col sm:flex-row items-center justify-between gap-2 bg-white">
      <div className="text-[18px] font-black text-black">
        {logo}<span className="text-[#BC4AD8]">.</span>
      </div>
      <p className="text-[12px] text-[#6A4125]">{copyright}</p>
    </footer>
  )
}
