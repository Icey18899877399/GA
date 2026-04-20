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
      onUpdate: (self) => {
        const progress = self.progress
        const currentDepth = Math.round(progress * 11000)
        setDepth(currentDepth)
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <div ref={meterRef} className="fixed right-8 top-1/2 -translate-y-1/2 z-50">
      <div className="bg-black/80 border border-cyan-400/30 rounded-2xl p-6 backdrop-blur-sm">
        <div className="text-center">
          <div className="text-3xl font-mono font-bold text-cyan-400 mb-2">
            {depth.toLocaleString()}m
          </div>
          <div className="text-sm text-cyan-300/70 uppercase tracking-wider">
            深度
          </div>
        </div>
        <div className="mt-4 w-4 h-64 bg-gradient-to-b from-cyan-400 to-blue-900 rounded-full relative overflow-hidden">
          <div
            className="absolute bottom-0 w-full bg-cyan-400 transition-all duration-300"
            style={{ height: `${(depth / 11000) * 100}%` }}
          />
        </div>
      </div>
    </div>
  )
}