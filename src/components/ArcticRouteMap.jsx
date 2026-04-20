import { useState } from 'react'
import { polarCopy } from '../data/polarData.js'

export default function ArcticRouteMap() {
  const [active, setActive] = useState(null)

  return (
    <div className="card strip-polar p-6">
      <div className="mb-5 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="section-label section-label-polar">航道热力图</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">NSR 与 NWP 通行潜力</h3>
        </div>
        <p className="text-xs text-subtle">悬停航线查看缩短距离</p>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-polar-light/30 p-4">
        <svg viewBox="0 0 220 160" className="h-full w-full">
          {/* Grid */}
          <circle cx="110" cy="80" r="46" fill="none" stroke="#00A08720" strokeWidth="1" />
          <circle cx="110" cy="80" r="28" fill="none" stroke="#00A08715" strokeWidth="1" />
          <circle cx="110" cy="80" r="64" fill="none" stroke="#00A08710" strokeWidth="0.5" />
          {/* Routes */}
          {polarCopy.routes.map((route) => (
            <path
              key={route.id}
              d={route.path}
              fill="none"
              stroke={route.id === active ? route.color : '#00A087'}
              strokeWidth={route.id === active ? 4 : 2.5}
              strokeLinecap="round"
              opacity={route.id === active ? 1 : 0.5}
              onMouseEnter={() => setActive(route.id)}
              onMouseLeave={() => setActive(null)}
              className="cursor-pointer transition-all duration-200"
            />
          ))}
          {polarCopy.routes.map((route) => (
            <circle key={`${route.id}-dot`} cx={route.label[0]} cy={route.label[1]} r="3.5"
              fill={route.id === active ? route.color : '#00A087'} opacity={route.id === active ? 1 : 0.6} />
          ))}
        </svg>

        {active && (
          <div className="absolute bottom-4 left-4 right-4 rounded-card border border-border bg-surface/95 p-3 shadow-card text-sm backdrop-blur-sm">
            <p className="font-semibold text-polar">{polarCopy.routes.find(r => r.id === active)?.name}</p>
            <p className="mt-1 text-muted">{polarCopy.routes.find(r => r.id === active)?.distance}</p>
            <p className="mt-0.5 text-xs text-subtle">{polarCopy.routes.find(r => r.id === active)?.region}</p>
          </div>
        )}
      </div>
    </div>
  )
}
