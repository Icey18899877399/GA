import { useEffect, useMemo, useRef, useState } from 'react'
import { bioCopy } from '../data/bioData.js'

export default function GeneStream() {
  const [offset, setOffset] = useState(0)
  const [mouseY, setMouseY] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setOffset((value) => (value + 1) % bioCopy.geneStream.length)
    }, 320)
    return () => window.clearInterval(interval)
  }, [])

  const lines = useMemo(() => {
    return Array.from({ length: 14 }, (_, idx) => {
      const slice = [...bioCopy.geneStream, ...bioCopy.geneStream].slice(offset + idx, offset + idx + 18)
      return slice.map((code, j) => ({ code, key: `${idx}-${j}` }))
    })
  }, [offset])

  return (
    <div
      ref={ref}
      onMouseMove={(event) => setMouseY(event.clientY)}
      className="pointer-events-none absolute right-0 top-16 hidden h-[calc(100vh-96px)] w-24 overflow-hidden rounded-l-3xl bg-[#00120d]/70 px-3 py-5 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-100/80 md:block"
    >
      <div className="space-y-1">
        {lines.map((line, idx) => {
          const drift = Math.sin((mouseY * 0.002) + idx) * 8
          return (
            <div key={idx} className="flex flex-col gap-1 text-left" style={{ transform: `translateX(${drift}px)` }}>
              {line.map((item) => (
                <span
                  key={item.key}
                  className={`inline-block ${item.code === 'G' || item.code === 'A' ? 'text-[#00FF41]' : 'text-slate-500'} ${item.code === 'C' ? 'text-[#FFAB00]' : ''}`}
                >
                  {item.code}
                </span>
              ))}
            </div>
          )
        })}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.8),transparent_20%,transparent_80%,rgba(0,0,0,0.85))]" />
    </div>
  )
}
