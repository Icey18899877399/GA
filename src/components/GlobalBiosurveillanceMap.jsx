import { useEffect, useRef } from 'react'
import { bioCopy } from '../data/bioData.js'

export default function GlobalBiosurveillanceMap() {
  const svgRef = useRef(null)
  useEffect(() => {
    const svg = svgRef.current; if (!svg) return
    const pulses = svg.querySelectorAll('.pulse-ring')
    let cur = 0
    const iv = setInterval(() => { pulses.forEach((r,i) => { r.style.opacity = i===cur?'1':'0.2' }); cur=(cur+1)%pulses.length }, 900)
    return () => clearInterval(iv)
  }, [])

  return (
    <div className="p-5">
      <p className="section-label section-label-bio mb-2">全球监测网</p>
      <h3 className="text-lg font-semibold text-ink mb-4">高等级实验室节点与预警路径</h3>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-bio-light/20 p-3">
        <svg ref={svgRef} viewBox="0 0 240 180" className="h-full w-full">
          <rect x="0" y="0" width="240" height="180" rx="12" fill="rgba(253,238,235,0.4)" />
          {/* Flow paths */}
          <path d="M 35 80 C 70 40 110 40 145 75" fill="none" stroke="#E64B35" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
          <path d="M 145 75 C 180 100 170 135 120 145" fill="none" stroke="#E64B35" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
          <path d="M 80 130 C 100 110 125 95 160 100" fill="none" stroke="#E64B35" strokeWidth="1.5" strokeLinecap="round" opacity="0.25" />
          {/* Links */}
          {bioCopy.globalLinks.map(([src,tgt],i) => {
            const f=bioCopy.globalNodes.find(n=>n.id===src), t=bioCopy.globalNodes.find(n=>n.id===tgt)
            return <line key={i} x1={f.x} y1={f.y} x2={t.x} y2={t.y} stroke="#E64B35" strokeWidth="1" strokeDasharray="3 4" opacity="0.3" />
          })}
          {/* Nodes */}
          {bioCopy.globalNodes.map((node,i) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="3.5" fill="#E64B35" />
              <circle className="pulse-ring" cx={node.x} cy={node.y} r="8" fill="none" stroke="#E64B35" strokeWidth="1" opacity={i===0?'1':'0.2'} style={{transition:'opacity 0.3s'}} />
              <text x={node.x+7} y={node.y+3.5} fill="#6B6B68" fontSize="5.5" fontWeight="600">{node.id}</text>
            </g>
          ))}
        </svg>
      </div>
    </div>
  )
}
