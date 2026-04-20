import { useEffect, useState } from 'react'

const concepts = ['轨道拥挤', '碎片链式反应', '资源博弈']

export default function TypingText() {
  const [ci, setCi] = useState(0)
  const [text, setText] = useState('')
  const [typing, setTyping] = useState(true)

  useEffect(() => {
    if (ci >= concepts.length) return
    const target = concepts[ci]
    let idx = 0
    const type = () => {
      if (idx < target.length) { setText(target.slice(0, idx + 1)); idx++; setTimeout(type, 100) }
      else { setTimeout(() => { setTyping(false); setTimeout(() => { setCi(ci + 1); setTyping(true); setText('') }, 2000) }, 500) }
    }
    type()
  }, [ci])

  return (
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-space">核心概念</h3>
      <div className="min-h-[1.8rem] text-lg font-medium text-ink">
        {text}
        {typing && <span className="animate-pulse text-space">|</span>}
      </div>
    </div>
  )
}
