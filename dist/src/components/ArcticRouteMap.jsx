import { useState } from 'react'
import { polarCopy } from '../data/polarData.js'

export default function ArcticRouteMap() {
  const [active, setActive] = useState(null)

  return (
    <div className="rounded-[32px] border border-cyan-300/20 bg-[#06131f]/80 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
        <div className="space-y-2">
          <p className="uppercase tracking-[0.26em] text-cyan-200/70">航道热力图</p>
          <p className="text-white text-lg font-semibold">NSR 与 NWP 的通行潜力展示</p>
        </div>
        <div className="rounded-3xl border border-cyan-400/20 bg-white/5 px-4 py-3 text-xs text-cyan-100">
          悬停航线以查看敏感区域与缩短距离
        </div>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-[#04101a] p-4">
        <svg viewBox="0 0 220 160" className="h-full w-full">
          <defs>
            <filter id="glowLine" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <rect x="0" y="0" width="220" height="160" rx="24" fill="rgba(0,5,10,0.65)" />
          <circle cx="110" cy="80" r="46" fill="rgba(0,255,195,0.08)" />
          <circle cx="110" cy="80" r="28" fill="transparent" stroke="rgba(0,255,195,0.2)" strokeWidth="1.5" />
          {polarCopy.routes.map((route) => (
            <path
              key={route.id}
              d={route.path}
              fill="none"
              stroke={route.color}
              strokeWidth={route.id === active ? 5 : 3}
              strokeLinecap="round"
              opacity={route.id === active ? 1 : 0.68}
              filter="url(#glowLine)"
              onMouseEnter={() => setActive(route.id)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer"
            />
          ))}
          {polarCopy.routes.map((route) => (
            <circle key={`${route.id}-dot`} cx={route.label[0]} cy={route.label[1]} r="3" fill={route.color} />
          ))}
        </svg>

        {active && (
          <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-cyan-300/20 bg-[#03101a]/95 p-4 text-sm text-slate-200 shadow-[0_0_40px_rgba(0,255,195,0.12)]">
            <p className="font-semibold text-cyan-200">{polarCopy.routes.find((item) => item.id === active)?.name}</p>
            <p className="mt-2 text-sm">{polarCopy.routes.find((item) => item.id === active)?.distance}</p>
            <p className="mt-1 text-xs text-slate-400">{polarCopy.routes.find((item) => item.id === active)?.region}</p>
          </div>
        )}
      </div>
    </div>
  )
}
