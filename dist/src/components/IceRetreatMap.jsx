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
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top center',
      end: 'bottom top',
      scrub: 0.8,
      onUpdate: (self) => setProgress(self.progress),
    })

    return () => trigger.kill()
  }, [])

  const coverage = useMemo(() => {
    return (
      polarIceStats.startCoverage -
      (polarIceStats.startCoverage - polarIceStats.endCoverage) * progress
    )
  }, [progress])

  const icePath = useMemo(() => {
    const projection = d3
      .geoOrthographic()
      .scale(90)
      .translate([150, 150])
      .center([0, 90])
      .rotate([0, -30, 0])
    const pathGenerator = d3.geoPath(projection)
    const iceRadius = 100 * (polarIceStats.endCoverage / 100 + (1 - progress) * 0.58)
    const iceSphere = d3.geoCircle().center([0, 90]).radius(iceRadius)()
    return pathGenerator(iceSphere)
  }, [progress])

  return (
    <div ref={containerRef} className="rounded-[32px] border border-cyan-300/20 bg-[#06101b]/80 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-300">
        <div className="space-y-2">
          <p className="uppercase tracking-[0.26em] text-cyan-200/70">冰盖缩减对比</p>
          <p className="text-white text-lg font-semibold">1979 vs 2026 实时映射</p>
        </div>
        <div className="rounded-3xl border border-cyan-400/20 bg-white/5 px-4 py-3 text-xs text-cyan-100">
          当前冰盖覆盖：{coverage.toFixed(0)}%
        </div>
      </div>
      <div className="relative aspect-square overflow-hidden rounded-[28px] border border-white/10 bg-[#02101d]">
        <svg viewBox="0 0 300 300" className="h-full w-full">
          <defs>
            <radialGradient id="iceGlow" cx="50%" cy="40%" r="65%">
              <stop offset="0%" stopColor="#E8F8FF" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#0A1522" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="150" cy="150" r="142" fill="rgba(2,16,29,0.9)" stroke="rgba(64, 233, 255, 0.18)" strokeWidth="2" />
          <path d="M 40 190 Q 80 56 156 36 Q 218 54 270 192 Q 246 212 150 250 Q 58 212 40 190" fill="rgba(255,255,255,0.06)" />
          <path d={icePath} fill="rgba(255,255,255,0.64)" stroke="rgba(0,255,195,0.25)" strokeWidth="1.5" />
          <circle cx="150" cy="150" r="110" fill="url(#iceGlow)" opacity="0.12" />
          <g fill="#00FFC3" opacity="0.85">
            <circle cx="90" cy="170" r="2" />
            <circle cx="170" cy="98" r="2" />
            <circle cx="218" cy="160" r="2" />
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,195,0.08),transparent_35%)]" />
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
          <p className="text-cyan-200 font-semibold">1979 年</p>
          <p className="mt-2 text-sm">白色冰盖几乎覆盖整个北极航道，稳定性最高。</p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-xs text-slate-300">
          <p className="text-cyan-200 font-semibold">2026 年</p>
          <p className="mt-2 text-sm">冰层萎缩至 42%，新航道开放同时风险与不确定性飙升。</p>
        </div>
      </div>
    </div>
  )
}
