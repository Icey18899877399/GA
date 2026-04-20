/* src/components/games/SpaceInterceptGame.jsx */
import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { spaceQuestions } from './gameData.js'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      dur: 2 + Math.random() * 3,
      delay: Math.random() * 3,
    })), [])
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-xl opacity-60">
      {stars.map(s => (
        <span key={s.id} className="absolute rounded-full bg-space-mid"
          style={{ left:`${s.x}%`, top:`${s.y}%`, width:s.size, height:s.size,
            animation:`twinkle ${s.dur}s ease-in-out ${s.delay}s infinite alternate` }} />
      ))}
      <style>{`@keyframes twinkle{0%{opacity:.12;transform:scale(.8)}100%{opacity:.55;transform:scale(1.2)}}`}</style>
    </div>
  )
}

export default function SpaceInterceptGame() {
  const [phase, setPhase] = useState('idle')
  const [questions, setQuestions] = useState([])
  const [qi, setQi] = useState(0)
  const [score, setScore] = useState(0)
  const [hp, setHp] = useState(3)
  const [timeLeft, setTimeLeft] = useState(0)
  const [feedback, setFeedback] = useState(null)
  const [shakeIdx, setShakeIdx] = useState(-1)
  const [optsMap, setOptsMap] = useState({})
  const timerRef = useRef(null)

  const current = questions[qi]
  const total = questions.length

  const startGame = useCallback(() => {
    const qs = shuffle(spaceQuestions).slice(0, 10)
    const map = {}
    qs.forEach((q, i) => { map[i] = shuffle([q.a, ...q.wrong]) })
    setOptsMap(map)
    setQuestions(qs)
    setQi(0)
    setScore(0)
    setHp(3)
    setFeedback(null)
    setPhase('playing')
  }, [])

  useEffect(() => {
    if (phase !== 'playing' || !current) return
    setTimeLeft(8)
    timerRef.current = setInterval(() => {
      setTimeLeft(p => {
        if (p <= 1) { clearInterval(timerRef.current); handleTimeout(); return 0 }
        return p - 1
      })
    }, 1000)
    return () => clearInterval(timerRef.current)
  }, [phase, qi])

  const handleTimeout = () => {
    setHp(p => { const n=p-1; if(n<=0)setTimeout(()=>setPhase('result'),300); return n })
    setFeedback({ text:'⏰ 超时！', ok:false, answer:current?.a })
    setTimeout(advance, 1000)
  }

  const advance = () => {
    setFeedback(null)
    setShakeIdx(-1)
    setQi(p => { if(p+1>=total){setTimeout(()=>setPhase('result'),100);return p} return p+1 })
  }

  const pick = (text, idx) => {
    if (feedback) return
    clearInterval(timerRef.current)
    const ok = text === current.a
    if (ok) {
      setScore(s => s + 10 + Math.max(0, timeLeft-3)*2)
      setFeedback({ text:'✓ 击碎！', ok:true, answer:current.a })
    } else {
      setShakeIdx(idx)
      setHp(p=>{ const n=p-1; if(n<=0)setTimeout(()=>setPhase('result'),400); return n })
      setFeedback({ text:'✗ 未命中', ok:false, answer:current.a })
    }
    setTimeout(advance, 1000)
  }

  if (phase === 'idle') {
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <StarField />
        <p className="relative text-6xl mb-4">☄️</p>
        <p className="relative text-sm text-muted mb-1">碎片正在逼近空间站！</p>
        <p className="relative text-xs text-subtle mb-5">每道题限时8秒 · 选择正确答案击碎碎片</p>
        <button onClick={startGame} className="relative rounded-lg bg-space px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">开始拦截</button>
      </div>
    )
  }

  if (phase === 'result') {
    const msg = score>=100?'太空安全专家！🌟':score>=60?'优秀宇航员！🚀':'继续加油！'
    return (
      <div className="relative text-center py-10 overflow-hidden rounded-xl">
        <StarField />
        <p className="relative text-5xl mb-3">🛡️</p>
        <p className="relative text-3xl font-bold text-space mb-1">{score} 分</p>
        <p className="relative text-sm text-muted mb-4">{msg}</p>
        <button onClick={startGame} className="relative rounded-lg bg-space px-6 py-2.5 text-sm font-semibold text-white hover:opacity-90">再来一次</button>
      </div>
    )
  }

  const opts = optsMap[qi] || []

  return (
    <div className="relative space-y-4 overflow-hidden rounded-xl">
      <StarField />
      <div className="relative flex items-center justify-between text-sm px-1">
        <span className="text-muted">{qi+1}/{total}</span>
        <span className="font-semibold text-ink">{score} 分</span>
        <span>{'❤️'.repeat(Math.max(0,hp))}{'🖤'.repeat(3-Math.max(0,hp))}</span>
      </div>

      <div className="relative h-1.5 rounded-full bg-border overflow-hidden">
        <div className="h-full rounded-full transition-all duration-1000 ease-linear"
          style={{ width:`${(timeLeft/8)*100}%`, background:timeLeft<=3?'#E64B35':'#3C5488' }} />
      </div>

      <div className="relative rounded-xl border border-space/20 bg-space-light/80 p-5 text-center backdrop-blur-sm">
        <p className="text-xs text-space font-medium tracking-wider uppercase mb-2">☄️ 碎片 #{qi+1}</p>
        <p className="text-lg font-semibold text-ink">{current.q}</p>
        {feedback && (
          <div className={`absolute inset-0 flex items-center justify-center rounded-xl backdrop-blur-sm ${feedback.ok?'bg-polar-light/85':'bg-bio-light/85'}`}>
            <span className={`text-2xl font-bold ${feedback.ok?'text-polar':'text-bio'}`}>{feedback.text}</span>
          </div>
        )}
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-3">
        {opts.map((opt, i) => {
          const isAnswer = feedback && opt === feedback.answer
          const isWrongPick = feedback && shakeIdx === i && opt !== feedback.answer
          return (
            <button key={`${qi}-${i}`} onClick={()=>pick(opt,i)} disabled={!!feedback}
              className={`rounded-lg border p-3 text-sm font-medium transition-all duration-200
                ${shakeIdx===i?'animate-[shake_0.3s_ease]':''}
                ${isAnswer?'border-polar bg-polar-light text-polar font-bold ring-2 ring-polar/20':''}
                ${isWrongPick?'border-bio bg-bio-light text-bio':''}
                ${!feedback?'border-border bg-surface text-ink hover:border-space hover:shadow-card-hover cursor-pointer':'cursor-default opacity-70'}
                ${feedback && !isAnswer && !isWrongPick ? 'opacity-40':''}
              `}>
              {opt}
            </button>
          )
        })}
      </div>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-4px)}75%{transform:translateX(4px)}}`}</style>
    </div>
  )
}
