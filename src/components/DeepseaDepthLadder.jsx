import { useMemo } from 'react'

const submersibleData = [
  { name: '奋斗者号', depth: 10909, country: '🇨🇳 中国' },
  { name: 'Limiting Factor', depth: 10928, country: '🇺🇸 美国' },
  { name: '深海勇士号', depth: 4500, country: '🇨🇳 中国' },
  { name: 'しんかい6500', depth: 6527, country: '🇯🇵 日本' },
]

export default function DeepseaDepthLadder() {
  const maxDepth = useMemo(() => Math.max(...submersibleData.map(d => d.depth)), [])

  return (
    <>
      <p className="section-label section-label-deepsea mb-2">深度阶梯分布</p>
      <h3 className="text-lg font-semibold text-ink mb-4">深潜器作业深度对比</h3>
      <div className="space-y-4">
        {submersibleData.map((item) => {
          const ratio = (item.depth / maxDepth) * 100
          return (
            <div key={item.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink font-medium">{item.name} <span className="text-xs text-subtle ml-1">{item.country}</span></span>
                <span className="font-semibold tabular-nums text-deepsea">{item.depth.toLocaleString()}m</span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-deepsea-light overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-deepsea-mid to-deepsea transition-all duration-700"
                  style={{ width: `${ratio}%` }} />
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}
