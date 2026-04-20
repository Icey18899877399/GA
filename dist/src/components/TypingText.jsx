import { useEffect, useState } from 'react'

const concepts = [
  '轨道拥挤',
  '碎片链式反应',
  '资源博弈',
]

export default function TypingText() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    if (currentIndex >= concepts.length) return

    const text = concepts[currentIndex]
    let index = 0

    const type = () => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
        setTimeout(type, 100)
      } else {
        setTimeout(() => {
          setIsTyping(false)
          setTimeout(() => {
            setCurrentIndex(currentIndex + 1)
            setIsTyping(true)
            setDisplayText('')
          }, 2000)
        }, 500)
      }
    }

    type()
  }, [currentIndex])

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-semibold text-aurora">核心概念</h3>
      <div className="min-h-[2rem] text-lg text-white">
        {displayText}
        {isTyping && <span className="animate-pulse text-aurora">|</span>}
      </div>
    </div>
  )
}