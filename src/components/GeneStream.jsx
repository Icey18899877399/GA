import { useEffect, useMemo, useRef, useState } from 'react'
import { bioCopy } from '../data/bioData.js'

export default function GeneStream() {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)
  useEffect(() => { const iv = setInterval(() => setOffset(v => (v+1)%bioCopy.geneStream.length), 320); return () => clearInterval(iv) }, [])
  const lines = useMemo(() => Array.from({length:14},(_,i)=>{
    const s=[...bioCopy.geneStream,...bioCopy.geneStream].slice(offset+i,offset+i+18)
    return s.map((code,j)=>({code,key:`${i}-${j}`}))
  }),[offset])

  return (
    <div ref={ref} className="pointer-events-none absolute right-0 top-16 hidden h-[calc(100vh-96px)] w-20 overflow-hidden rounded-l-card border-l border-border bg-bio-light/30 px-2 py-4 text-center text-[9px] font-semibold uppercase tracking-wider md:block">
      <div className="space-y-0.5">
        {lines.map((line,i) => (
          <div key={i} className="flex flex-col gap-0.5 text-left">
            {line.map(item => (
              <span key={item.key} className={`inline-block ${item.code==='G'||item.code==='A'?'text-bio':'text-border-dark'} ${item.code==='C'?'text-accent':''}`}>
                {item.code}
              </span>
            ))}
          </div>
        ))}
      </div>
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(250,250,248,0.9),transparent_15%,transparent_85%,rgba(250,250,248,0.9))]" />
    </div>
  )
}
