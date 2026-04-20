/* src/components/games/BioLinkGame.jsx */
import { useState, useCallback, useMemo } from 'react'
import { bioQuestions } from './gameData.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function DNADeco() {
  const rungs = useMemo(() => Array.from({ length: 14 }, (_, i) => i), [])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-[0.07]">
      <svg viewBox="0 0 100 400" className="absolute right-0 top-0 h-full w-16" preserveAspectRatio="none">
        {rungs.map(i => {
          const y = i * 30 + 10
          const x1 = 30 + Math.sin(i * 0.8) * 20
          const x2 = 70 + Math.sin(i * 0.8 + Math.PI) * 20
          return <line key={i} x1={x1} y1={y} x2={x2} y2={y} stroke="#E64B35" strokeWidth="1.5" />
        })}
        <path d={rungs.map((i) => {
          const y = i * 30 + 10
          const x = 30 + Math.sin(i * 0.8) * 20
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')} fill="none" stroke="#E64B35" strokeWidth="2" />
        <path d={rungs.map((i) => {
          const y = i * 30 + 10
          const x = 70 + Math.sin(i * 0.8 + Math.PI) * 20
          return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
        }).join(' ')} fill="none" stroke="#E64B35" strokeWidth="2" />
      </svg>
    </div>
  )
}

export default function BioLinkGame() {
  const [phase, setPhase] = useState('idle')
  const [pairs, setPairs] = useState([])
  const [leftOrder, setLeftOrder] = useState([])
  const [rightOrder, setRightOrder] = useState([])
  const [selectedLeft, setSelectedLeft] = useState(null)
  const [selectedRight, setSelectedRight] = useState(null)
  const [matched, setMatched] = useState(new Set())
  const [wrongPair, setWrongPair] = useState(null)
  const [attempts, setAttempts] = useState(0)
  const [errors, setErrors] = useState(0)

  const startGame = useCallback(() => {
    const ps = shuffle(bioQuestions).slice(0, 6)
    setPairs(ps)
    setLeftOrder(shuffle(ps.map((_, i) => i)))
    setRightOrder(shuffle(ps.map((_, i) => i)))
    setSelectedLeft(null); setSelectedRight(null)
    setMatched(new Set()); setWrongPair(null)
    setAttempts(0); setErrors(0); setPhase('playing')
  }, [])

  const tryMatch = (lIdx, rIdx) => {
    setAttempts(a => a + 1)
    if (lIdx === rIdx) {
      setMatched(prev => {
        const s = new Set(prev); s.add(lIdx)
        if (s.size === pairs.length) setTimeout(() => setPhase('result'), 500)
        return s
      })
      setSelectedLeft(null); setSelectedRight(null)
    } else {
      setErrors(e => e + 1)
      setWrongPair({ l: lIdx, r: rIdx })
      setTimeout(() => { setWrongPair(null); setSelectedLeft(null); setSelectedRight(null) }, 600)
    }
  }

  const clickLeft = (pairIdx) => {
    if (matched.has(pairIdx) || wrongPair) return
    setSelectedLeft(pairIdx)
    if (selectedRight !== null) tryMatch(pairIdx, selectedRight)
  }

  const clickRight = (pairIdx) => {
    if (matched.has(pairIdx) || wrongPair) return
    setSelectedRight(pairIdx)
    if (selectedLeft !== null) tryMatch(selectedLeft, pairIdx)
  }

  if (phase === 'idle') {
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <DNADeco />
        <p className="relative text-6xl mb-4">🧬</p>
        <p className="relative text-sm text-muted mb-1">完成基因配对连线！</p>
        <p className="relative text-xs text-subtle mb-5">先点左侧问题，再点右侧答案</p>
        <button onClick={startGame} className="relative rounded-lg bg-bio px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">开始配对</button>
      </div>
    )
  }

  if (phase === 'result') {
    const accuracy = attempts > 0 ? Math.round(((attempts - errors) / attempts) * 100) : 0
    const stars = errors <= 1 ? '⭐⭐⭐' : errors <= 3 ? '⭐⭐' : '⭐'
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <DNADeco />
        <p className="relative text-5xl mb-3">🔬</p>
        <p className="relative text-sm text-muted mb-1">全部配对完成！</p>
        <p className="relative text-3xl font-bold text-bio mb-1">正确率 {accuracy}%</p>
        <p className="relative text-sm text-muted mb-1">{attempts} 次尝试 · {errors} 次错误</p>
        <p className="relative text-2xl mb-4">{stars}</p>
        <button onClick={startGame} className="relative rounded-lg bg-bio px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">再来一轮</button>
      </div>
    )
  }

  return (
    <div className="relative space-y-4 overflow-hidden rounded-xl">
      <DNADeco />
      <div className="relative flex items-center justify-between text-sm px-1">
        <span className="text-muted">已配对 {matched.size}/{pairs.length}</span>
        <span className="text-subtle">错误 {errors} 次</span>
      </div>

      <div className="relative grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-bio mb-1">问题</p>
          {leftOrder.map(pi => {
            const p = pairs[pi]
            const done = matched.has(pi)
            const sel = selectedLeft === pi
            const wrong = wrongPair && wrongPair.l === pi
            return (
              <button key={`l-${pi}`} onClick={()=>clickLeft(pi)} disabled={done||!!wrongPair}
                className={`w-full text-left rounded-lg border p-3 text-xs font-medium transition-all duration-200
                  ${done?'border-polar/40 bg-polar-light text-polar line-through opacity-60':''}
                  ${sel&&!done?'border-bio bg-bio-light text-bio ring-2 ring-bio/30':''}
                  ${wrong?'border-bio bg-bio-light/60 text-bio animate-[shake_0.3s_ease]':''}
                  ${!done&&!sel&&!wrong?'border-border bg-surface text-ink hover:border-bio/40 cursor-pointer':''}
                `}>{p.q}</button>
            )
          })}
        </div>
        <div className="space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-accent mb-1">答案</p>
          {rightOrder.map(pi => {
            const p = pairs[pi]
            const done = matched.has(pi)
            const sel = selectedRight === pi
            const wrong = wrongPair && wrongPair.r === pi
            return (
              <button key={`r-${pi}`} onClick={()=>clickRight(pi)} disabled={done||!!wrongPair}
                className={`w-full text-left rounded-lg border p-3 text-xs font-medium transition-all duration-200
                  ${done?'border-polar/40 bg-polar-light text-polar line-through opacity-60':''}
                  ${sel&&!done?'border-accent bg-bio-light text-accent ring-2 ring-accent/30':''}
                  ${wrong?'border-bio bg-bio-light/60 text-bio animate-[shake_0.3s_ease]':''}
                  ${!done&&!sel&&!wrong?'border-border bg-surface text-ink hover:border-accent/40 cursor-pointer':''}
                `}>{p.a}</button>
            )
          })}
        </div>
      </div>
      <p className="relative text-center text-[11px] text-subtle">先点击左侧问题，再点击右侧对应答案</p>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}`}</style>
    </div>
  )
}
