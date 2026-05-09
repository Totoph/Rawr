interface Stat {
  num: string
  label: string
}

interface StatsProps {
  stats: Stat[]
  className?: string
}

export function Stats({ stats, className = "" }: StatsProps) {
  return (
    <div className={`relative z-10 border-t border-b border-black px-[10%] py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center bg-white -mt-20 ${className}`}>
      {stats.map((stat) => (
        <div key={stat.label}>
          <span className="block text-[36px] font-black text-[#BC4AD8] tracking-[-0.04em] leading-none mb-1">
            {stat.num}
          </span>
          <span className="text-[13px] text-black font-semibold">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
