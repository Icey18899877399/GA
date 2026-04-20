import { useEffect, useMemo, useRef, useState } from 'react'
import * as d3 from 'd3'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { polarIceStats } from '../data/polarData.js'
gsap.registerPlugin(ScrollTrigger)

export default function IceRetreatMap() {
  const containerRef = useRef(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    if (!containerRef.current) return
    const t = ScrollTrigger.create({ trigger:containerRef.current, start:'top center', end:'bottom top', scrub:0.8, onUpdate:s=>setProgress(s.progress) })
    return () => t.kill()
  }, [])

  const coverage = useMemo(() => polarIceStats.startCoverage-(polarIceStats.startCoverage-polarIceStats.endCoverage)*progress, [progress])
  const icePath = useMemo(() => {
    const proj=d3.geoOrthographic().scale(90).translate([150,150]).center([0,90]).rotate([0,-30,0])
    const r=100*(polarIceStats.endCoverage/100+(1-progress)*0.58)
    return d3.geoPath(proj)(d3.geoCircle().center([0,90]).radius(r)())
  }, [progress])

  return (
    <div ref={containerRef} className="card strip-polar p-6">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="section-label section-label-polar">冰盖缩减对比</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">1979 vs 2026</h3>
        </div>
        <span className="rounded-card border border-border bg-polar-light px-3 py-1.5 text-xs font-medium text-polar tabular-nums">
          覆盖 {coverage.toFixed(0)}%
        </span>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-card border border-border bg-polar-light/20">
        <svg viewBox="0 0 300 300" className="h-full w-full">
          <circle cx="150" cy="150" r="142" fill="rgba(224,245,240,0.5)" stroke="#00A08730" strokeWidth="1.5" />
          <path d="M 40 190 Q 80 56 156 36 Q 218 54 270 192 Q 246 212 150 250 Q 58 212 40 190" fill="rgba(0,160,135,0.04)" />
          <path d={icePath} fill="rgba(255,255,255,0.8)" stroke="#00A08740" strokeWidth="1" />
          <g fill="#00A087" opacity="0.6"><circle cx="90" cy="170" r="2"/><circle cx="170" cy="98" r="2"/><circle cx="218" cy="160" r="2"/></g>
        </svg>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <div className="rounded-card border border-border bg-surface p-3 text-xs text-muted">
          <p className="font-semibold text-polar">1979 年</p>
          <p className="mt-1">冰盖几乎覆盖整个北极航道</p>
        </div>
        <div className="rounded-card border border-border bg-surface p-3 text-xs text-muted">
          <p className="font-semibold text-polar">2026 年</p>
          <p className="mt-1">冰层萎缩至 42%，新航道开放</p>
        </div>
      </div>
    </div>
  )
}
