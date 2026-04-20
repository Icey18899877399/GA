import { useMemo } from 'react'

const submersibleData = [
  { name: '奋斗者号', depth: 10900, country: '中国' },
  { name: '克里森号', depth: 11034, country: '美国' },
  { name: '深海勇士', depth: 6000, country: '法国' },
  { name: '极地探索', depth: 4200, country: '日本' },
]

export default function DeepseaDepthLadder() {
  const maxDepth = useMemo(() => Math.max(...submersibleData.map((item) => item.depth)), [])

  return (
    <div className="rounded-[32px] border border-[#0d4055] bg-[#001426]/90 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 text-sm text-slate-300">
        <p className="uppercase tracking-[0.26em] text-[#7ce0ff]">深度阶梯分布</p>
        <p className="mt-2 text-white text-lg font-semibold">深潜器作业深度对比</p>
      </div>
      <div className="space-y-4">
        {submersibleData.map((item) => {
          const ratio = (item.depth / maxDepth) * 100
          return (
            <div key={item.name} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-slate-300">
                <span>{item.name}</span>
                <span className="text-[#00F3FF] font-semibold">{item.depth}m</span>
              </div>
              <div className="h-3 w-full rounded-full bg-[#0b1b28] overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-[#00F3FF] via-[#3cd6ff] to-[#1a85ff]" style={{ width: `${ratio}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
