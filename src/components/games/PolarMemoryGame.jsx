/* src/components/games/PolarMemoryGame.jsx */
import { useState, useCallback, useEffect, useMemo } from 'react'
import { polarQuestions } from './gameData.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function Snowfall() {
  const flakes = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i, x: Math.random()*100, size: 3+Math.random()*6,
      dur: 4+Math.random()*6, delay: Math.random()*5, drift: -20+Math.random()*40,
    })), [])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-50">
      {flakes.map(f => (
        <span key={f.id} className="absolute text-polar-light"
          style={{ left:`${f.x}%`, top:'-5%', fontSize:f.size,
            animation:`snowfall ${f.dur}s linear ${f.delay}s infinite` }}>
          ❄
        </span>
      ))}
      <style>{`@keyframes snowfall{0%{transform:translateY(0) translateX(0);opacity:.6}100%{transform:translateY(500px) translateX(30px);opacity:0}}`}</style>
    </div>
  )
}

export default function PolarMemoryGame() {
  const [phase, setPhase] = useState('idle')
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState(new Set())
  const [moves, setMoves] = useState(0)
  const [locked, setLocked] = useState(false)
  const [peek, setPeek] = useState(false)
  const [peekTime, setPeekTime] = useState(0)
  const peekTimerRef = useState(null)

  const startGame = useCallback(() => {
    const pairs = shuffle(polarQuestions).slice(0, 6)
    const deck = []
    pairs.forEach((p, i) => {
      deck.push({ id:`q-${i}`, pairId:i, type:'q', text:p.q })
      deck.push({ id:`a-${i}`, pairId:i, type:'a', text:p.a })
    })
    setCards(shuffle(deck))
    setFlipped([]); setMatched(new Set()); setMoves(0); setLocked(false)
    setPhase('playing')
    // Start 60s peek
    setPeek(true)
    setPeekTime(60)
  }, [])

  // Peek countdown
  useEffect(() => {
    if (!peek) return
    if (peekTime <= 0) { setPeek(false); return }
    const t = setTimeout(() => setPeekTime(p => p - 1), 1000)
    return () => clearTimeout(t)
  }, [peek, peekTime])

  const skipPeek = () => { setPeek(false); setPeekTime(0) }

  const flipCard = (idx) => {
    if (locked || peek) return
    if (flipped.includes(idx) || matched.has(cards[idx].id)) return
    if (flipped.length >= 2) return

    const next = [...flipped, idx]
    setFlipped(next)

    if (next.length === 2) {
      setMoves(m => m + 1)
      setLocked(true)
      const c1 = cards[next[0]]
      const c2 = cards[next[1]]

      if (c1.pairId === c2.pairId && c1.type !== c2.type) {
        setTimeout(() => {
          setMatched(prev => {
            const s = new Set(prev); s.add(c1.id); s.add(c2.id)
            if (s.size === cards.length) setTimeout(() => setPhase('result'), 500)
            return s
          })
          setFlipped([]); setLocked(false)
        }, 500)
      } else {
        setTimeout(() => { setFlipped([]); setLocked(false) }, 800)
      }
    }
  }

  if (phase === 'idle') {
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <Snowfall />
        <p className="relative text-6xl mb-4">🧊</p>
        <p className="relative text-sm text-muted mb-1">冰层下藏着知识碎片！</p>
        <p className="relative text-xs text-subtle mb-5">开始后有60秒记忆时间（可跳过）· 共6对12张</p>
        <button onClick={startGame} className="relative rounded-lg bg-polar px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">开始挖掘</button>
      </div>
    )
  }

  if (phase === 'result') {
    const stars = moves<=10?'⭐⭐⭐':moves<=15?'⭐⭐':'⭐'
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <Snowfall />
        <p className="relative text-5xl mb-3">🏔️</p>
        <p className="relative text-sm text-muted mb-1">全部配对成功！</p>
        <p className="relative text-3xl font-bold text-polar mb-1">{moves} 步</p>
        <p className="relative text-2xl mb-4">{stars}</p>
        <button onClick={startGame} className="relative rounded-lg bg-polar px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">再来一轮</button>
      </div>
    )
  }

  const isRevealed = (idx) => peek || flipped.includes(idx) || matched.has(cards[idx].id)
  const isMatched = (idx) => matched.has(cards[idx].id)

  return (
    <div className="relative space-y-4 overflow-hidden rounded-xl">
      <Snowfall />

      {/* HUD */}
      <div className="relative flex items-center justify-between text-sm px-1">
        <span className="text-muted">已配对 {matched.size/2}/6</span>
        {peek ? (
          <div className="flex items-center gap-3">
            <span className="text-polar font-bold tabular-nums">记忆时间 {peekTime}s</span>
            <button onClick={skipPeek}
              className="rounded-md border border-polar/30 bg-polar-light px-3 py-1 text-xs font-medium text-polar hover:bg-polar/10 transition">
              跳过 →
            </button>
          </div>
        ) : (
          <span className="font-semibold text-ink">步数: {moves}</span>
        )}
      </div>

      {/* Peek progress bar */}
      {peek && (
        <div className="relative h-1.5 rounded-full bg-polar-light overflow-hidden">
          <div className="h-full rounded-full bg-polar transition-all duration-1000 ease-linear"
            style={{ width:`${(peekTime/60)*100}%` }} />
        </div>
      )}

      {/* Card grid */}
      <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-3">
        {cards.map((card, idx) => {
          const revealed = isRevealed(idx)
          const done = isMatched(idx)
          return (
            <button key={card.id} onClick={()=>flipCard(idx)} disabled={done||locked||peek}
              className={`relative aspect-square rounded-xl border-2 p-2 text-center flex flex-col items-center justify-center transition-all duration-300
                ${done ? 'border-polar/40 bg-polar-light scale-95' :
                  revealed ? 'border-polar bg-surface shadow-card-hover' :
                  'border-border bg-gradient-to-br from-blue-50 to-cyan-50 hover:border-polar/50 hover:shadow-card cursor-pointer'}
              `}>
              {revealed ? (
                <>
                  <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${card.type==='q'?'text-polar':'text-accent'}`}>
                    {card.type==='q'?'问':'答'}
                  </span>
                  <span className={`text-xs font-medium leading-tight ${done?'text-polar':'text-ink'}`}>
                    {card.text}
                  </span>
                </>
              ) : (
                <span className="text-2xl">🧊</span>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
