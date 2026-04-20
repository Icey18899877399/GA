import { motion } from 'framer-motion'

const nodes = [
  { id:'A', x:20, y:30, label:'前沿实验' },
  { id:'B', x:75, y:20, label:'城市防线' },
  { id:'C', x:45, y:65, label:'生物隔离' },
  { id:'D', x:20, y:78, label:'疫源追踪' },
  { id:'E', x:80, y:72, label:'数据中枢' },
]
const links = [['A','B'],['A','C'],['B','E'],['C','D'],['D','E']]

export default function TopologyGraph() {
  return (
    <motion.div initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}}
      viewport={{once:true,amount:0.4}} transition={{duration:0.5}}
      className="card strip-bio p-6">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.6fr]">
        <div className="space-y-4">
          <p className="text-sm leading-7 text-muted">
            生物安全防护网络采用"节点 + 链路"双层表达，强调重点节点和动态隔离带。
          </p>
          <div className="space-y-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-bio">关键节点</p>
            {nodes.map(node => (
              <div key={node.id} className="flex items-center gap-3 rounded-card border border-border bg-surface p-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-bio-light text-xs font-semibold text-bio">{node.id}</span>
                <div>
                  <p className="text-sm font-medium text-ink">{node.label}</p>
                  <p className="text-xs text-subtle">态势感知节点</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative overflow-hidden rounded-card border border-border bg-bio-light/20 p-3">
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {links.map(([s,e],i) => {
              const f=nodes.find(n=>n.id===s), t=nodes.find(n=>n.id===e)
              return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="#E64B35" strokeWidth="1.2" strokeLinecap="round" opacity="0.35" />
            })}
            {nodes.map(node => (
              <g key={node.id}>
                <circle cx={node.x} cy={node.y} r="3.5" fill="#E64B35" />
                <circle cx={node.x} cy={node.y} r="7" fill="rgba(230,75,53,0.08)" />
                <text x={node.x+6} y={node.y+3.5} fill="#6B6B68" fontSize="4.5" fontWeight="600">{node.id}</text>
              </g>
            ))}
          </svg>
        </div>
      </div>
    </motion.div>
  )
}
