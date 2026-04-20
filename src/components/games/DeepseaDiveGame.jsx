/* src/components/games/DeepseaDiveGame.jsx */
import { useState, useCallback, useMemo } from 'react'
import { deepseaQuestions } from './gameData.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

const DEPTH_PER_Q = 500
const ZONES = [
  { min:0, label:'光照层', color:'#4DBBD5', emoji:'🐠' },
  { min:1000, label:'中层带', color:'#3A9AB5', emoji:'🦑' },
  { min:2000, label:'深海层', color:'#1E6E8C', emoji:'🐙' },
  { min:3500, label:'深渊带', color:'#0D3F5C', emoji:'🦐' },
  { min:5000, label:'超深渊带', color:'#041E2F', emoji:'🔬' },
]
function getZone(depth) {
  for (let i=ZONES.length-1;i>=0;i--) if(depth>=ZONES[i].min) return ZONES[i]
  return ZONES[0]
}

function Bubbles({ depth }) {
  const bubbles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i, x: Math.random()*100, size: 4+Math.random()*10,
      dur: 3+Math.random()*5, delay: Math.random()*4,
    })), [])
  const opacity = Math.max(0.15, 0.5 - depth/8000)
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl" style={{opacity}}>
      {bubbles.map(b => (
        <span key={b.id} className="absolute rounded-full border border-deepsea/30"
          style={{ left:`${b.x}%`, bottom:'-10%', width:b.size, height:b.size,
            animation:`rise ${b.dur}s ease-in ${b.delay}s infinite` }} />
      ))}
      <style>{`@keyframes rise{0%{transform:translateY(0);opacity:.4}100%{transform:translateY(-600px);opacity:0}}`}</style>
    </div>
  )
}

export default function DeepseaDiveGame() {
  const [phase, setPhase] = useState('idle')
  const [questions, setQuestions] = useState([])
  const [qi, setQi] = useState(0)
  const [depth, setDepth] = useState(0)
  const [maxDepth, setMaxDepth] = useState(0)
  const [hp, setHp] = useState(3)
  const [feedback, setFeedback] = useState(null)
  const [locked, setLocked] = useState(false)
  const [optsMap, setOptsMap] = useState({})

  const current = questions[qi]
  const zone = getZone(depth)

  const startGame = useCallback(() => {
    const qs = shuffle(deepseaQuestions).slice(0, 10)
    const map = {}
    qs.forEach((q, i) => { map[i] = shuffle([q.a, ...q.wrong]) })
    setOptsMap(map)
    setQuestions(qs)
    setQi(0); setDepth(0); setMaxDepth(0); setHp(3)
    setFeedback(null); setLocked(false); setPhase('playing')
  }, [])

  const pick = (text) => {
    if (locked || !current) return
    setLocked(true)
    const ok = text === current.a
    if (ok) {
      const nd = depth + DEPTH_PER_Q
      setDepth(nd); setMaxDepth(d=>Math.max(d,nd))
      setFeedback({ text:`▼ 下潜至 ${nd}m`, ok:true, answer:current.a })
    } else {
      setHp(p=>{ const n=p-1; if(n<=0)setTimeout(()=>setPhase('result'),600); return n })
      setDepth(d=>Math.max(0,d-200))
      setFeedback({ text:'△ 碰到障碍！上浮200m', ok:false, answer:current.a })
    }
    setTimeout(() => {
      setFeedback(null); setLocked(false)
      if(qi+1>=questions.length) setPhase('result'); else setQi(q=>q+1)
    }, 1000)
  }

  if (phase === 'idle') {
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <Bubbles depth={0} />
        <p className="relative text-6xl mb-4">🤿</p>
        <p className="relative text-sm text-muted mb-1">驾驶潜艇探索深海!</p>
        <p className="relative text-xs text-subtle mb-5">答对下潜500m · 答错上浮200m · 3条命</p>
        <button onClick={startGame} className="relative rounded-lg bg-deepsea px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">开始下潜</button>
      </div>
    )
  }

  if (phase === 'result') {
    const msg = maxDepth>=4000?'深海探险家！🏆':maxDepth>=2000?'优秀潜航员！🐋':'继续加油！'
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <Bubbles depth={maxDepth} />
        <p className="relative text-5xl mb-3">🌊</p>
        <p className="relative text-sm text-muted mb-1">最深到达</p>
        <p className="relative text-4xl font-bold text-deepsea mb-1">{maxDepth}m</p>
        <p className="relative text-sm text-muted mb-4">{msg}</p>
        <button onClick={startGame} className="relative rounded-lg bg-deepsea px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">再次下潜</button>
      </div>
    )
  }

  const opts = optsMap[qi] || []
  const depthPct = Math.min(100, (depth/6000)*100)

  return (
    <div className="relative space-y-4 overflow-hidden rounded-xl">
      <Bubbles depth={depth} />

      <div className="relative flex items-center justify-between text-sm px-1">
        <div className="flex items-center gap-2">
          <span className="text-lg">{zone.emoji}</span>
          <span className="font-medium" style={{color:zone.color}}>{zone.label}</span>
        </div>
        <span className="font-bold text-deepsea text-lg tabular-nums">{depth}m</span>
        <span>{'❤️'.repeat(Math.max(0,hp))}</span>
      </div>

      <div className="relative h-3 rounded-full bg-deepsea-light overflow-hidden">
        <div className="absolute left-0 top-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width:`${depthPct}%`, background:zone.color }} />
        {ZONES.slice(1).map(z => (
          <div key={z.min} className="absolute top-0 bottom-0 w-px bg-deepsea/30" style={{left:`${(z.min/6000)*100}%`}} />
        ))}
      </div>

      <div className="relative rounded-xl border border-deepsea/20 bg-deepsea-light/80 p-5 text-center backdrop-blur-sm">
        <p className="text-xs text-deepsea font-medium mb-2">Q{qi+1}/{questions.length}</p>
        <p className="text-lg font-semibold text-ink">{current.q}</p>
        {feedback && (
          <div className={`absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm ${feedback.ok?'bg-polar-light/90':'bg-bio-light/90'}`}>
            <span className={`text-xl font-bold ${feedback.ok?'text-polar':'text-bio'}`}>{feedback.text}</span>
          </div>
        )}
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
        {opts.map((opt, i) => {
          const isAnswer = feedback && opt === feedback.answer
          return (
            <button key={`${qi}-${i}`} onClick={()=>pick(opt)} disabled={locked}
              className={`rounded-lg border p-3 text-sm font-medium transition-all duration-200
                ${isAnswer?'border-polar bg-polar-light text-polar font-bold ring-2 ring-polar/20':''}
                ${feedback && !isAnswer?'opacity-40 cursor-default':''}
                ${!feedback?'border-border bg-surface text-ink hover:border-deepsea hover:shadow-card-hover cursor-pointer':'cursor-default'}
              `}>
              {opt}
            </button>
          )
        })}
      </div>
    </div>
  )
}
