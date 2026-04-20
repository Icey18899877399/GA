import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function DepthMeter() {
  const [depth, setDepth] = useState(0)
  const meterRef = useRef(null)

  useEffect(() => {
    const element = meterRef.current
    if (!element) return
    ScrollTrigger.create({
      trigger: element,
      start: 'top bottom',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => setDepth(Math.round(self.progress * 11000)),
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <div ref={meterRef} className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <div className="rounded-card border border-border bg-surface/95 px-4 py-5 shadow-card backdrop-blur-sm">
        <div className="text-center">
          <div className="text-2xl font-semibold tabular-nums text-deepsea">
            {depth.toLocaleString()}m
          </div>
          <div className="mt-1 text-[10px] font-medium uppercase tracking-wider text-muted">
            深度
          </div>
        </div>
        <div className="relative mt-4 h-52 w-3 mx-auto rounded-full bg-deepsea-light overflow-hidden">
          <div
            className="absolute bottom-0 w-full rounded-full bg-gradient-to-t from-deepsea to-deepsea-mid transition-all duration-300"
            style={{ height: `${(depth / 11000) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}
