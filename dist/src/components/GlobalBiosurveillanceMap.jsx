import { useEffect, useRef } from 'react'
import { bioCopy } from '../data/bioData.js'

export default function GlobalBiosurveillanceMap() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const pulses = svg.querySelectorAll('.pulse-ring')
    let current = 0
    const interval = setInterval(() => {
      pulses.forEach((ring, index) => {
        ring.style.opacity = index === current ? '1' : '0.18'
      })
      current = (current + 1) % pulses.length
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="rounded-[32px] border border-[#0d2d22] bg-[#00160f]/92 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 text-sm text-slate-300">
        <p className="uppercase tracking-[0.26em] text-[#9efac1]">全球监测网</p>
        <p className="mt-2 text-white text-lg font-semibold">高等级实验室节点与流光预警路径</p>
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-[#03120d]/90 p-4">
        <svg ref={svgRef} viewBox="0 0 240 180" className="h-full w-full">
          <defs>
            <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00FF41" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#FFAB00" stopOpacity="0.2" />
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="240" height="180" rx="24" fill="rgba(0, 26, 21, 0.92)" />
          <path d="M 35 80 C 70 40 110 40 145 75" fill="none" stroke="url(#lineGlow)" strokeWidth="2.5" strokeLinecap="round" opacity="0.8" />
          <path d="M 145 75 C 180 100 170 135 120 145" fill="none" stroke="url(#lineGlow)" strokeWidth="2.5" strokeLinecap="round" opacity="0.75" />
          <path d="M 80 130 C 100 110 125 95 160 100" fill="none" stroke="url(#lineGlow)" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          {bioCopy.globalLinks.map(([source, target], idx) => {
            const from = bioCopy.globalNodes.find((node) => node.id === source)
            const to = bioCopy.globalNodes.find((node) => node.id === target)
            return (
              <g key={`link-${idx}`}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke="rgba(0,255,65,0.45)"
                  strokeWidth="1.6"
                  strokeDasharray="4 6"
                />
              </g>
            )
          })}
          {bioCopy.globalNodes.map((node, idx) => (
            <g key={node.id}>
              <circle cx={node.x} cy={node.y} r="4" fill="#00FF41" />
              <circle className="pulse-ring" cx={node.x} cy={node.y} r="9" fill="none" stroke="#00FF41" strokeWidth="1.4" opacity={idx === 0 ? '1' : '0.2'} />
              <text x={node.x + 8} y={node.y + 4} fill="#E8F3E8" fontSize="6" fontWeight="600">
                {node.id}
              </text>
            </g>
          ))}
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,65,0.12),transparent_45%)]" />
      </div>
    </div>
  )
}
