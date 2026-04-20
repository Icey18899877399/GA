import { motion } from 'framer-motion'

const nodes = [
  { id: 'A', x: 20, y: 30, label: '前沿实验' },
  { id: 'B', x: 75, y: 20, label: '城市防线' },
  { id: 'C', x: 45, y: 65, label: '生物隔离' },
  { id: 'D', x: 20, y: 78, label: '疫源追踪' },
  { id: 'E', x: 80, y: 72, label: '数据中枢' },
]
const links = [
  ['A', 'B'],
  ['A', 'C'],
  ['B', 'E'],
  ['C', 'D'],
  ['D', 'E'],
]

export default function TopologyGraph() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-cosmic/80 p-8 shadow-glow backdrop-blur-xl"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_0.65fr]">
        <div className="space-y-5">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-sm text-slate-300">
            生物安全防护网络采用“节点 + 链路”双层表达，强调重点节点和两个动态隔离带。
          </div>
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-200/70">关键节点</p>
            {nodes.map((node) => (
              <div key={node.id} className="flex items-center gap-3 rounded-3xl border border-white/10 bg-white/5 p-4">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-aurora/15 text-sm font-semibold text-cyan-100">{node.id}</span>
                <div>
                  <p className="font-medium text-white">{node.label}</p>
                  <p className="text-sm text-slate-400">深度防护与态势感知节点</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[#08111e]/90 p-4">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {links.map(([start, end], index) => {
              const from = nodes.find((node) => node.id === start)
              const to = nodes.find((node) => node.id === end)
              return (
                <line
                  key={`${start}-${end}`}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(56, 182, 255, 0.65)"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              )
            })}
            {nodes.map((node) => (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r="4.5" fill="#38B6FF" opacity="0.96" />
                <circle cx={node.x} cy={node.y} r="9" fill="rgba(56, 182, 255, 0.12)" />
                <text x={node.x + 7} y={node.y + 4} fill="#E8EBF3" fontSize="5" fontWeight="600">
                  {node.id}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
