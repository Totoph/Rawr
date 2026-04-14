interface Stat {
  num: string
  label: string
}

interface StatsProps {
  stats: Stat[]
}

export function Stats({ stats }: StatsProps) {
  return (
    <div className="border-t border-b border-[#F0DFC8] px-[10%] py-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
      {stats.map((stat) => (
        <div key={stat.label}>
          <span className="block text-[36px] font-black text-[#3D2314] tracking-[-0.04em] leading-none mb-1">
            {stat.num}
          </span>
          <span className="text-[13px] text-[#7A4528] font-semibold">{stat.label}</span>
        </div>
      ))}
    </div>
  )
}
