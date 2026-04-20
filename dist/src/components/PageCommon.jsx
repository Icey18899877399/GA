import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

export function TypewriterText({ text, speed = 40 }) {
  const [value, setValue] = useState('')

  useEffect(() => {
    let index = 0
    const next = () => {
      setValue(text.slice(0, index))
      index += 1
      if (index <= text.length) {
        window.requestAnimationFrame(() => setTimeout(next, speed))
      }
    }
    next()
  }, [text, speed])

  return <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-orange-400">{value}</span>
}

export function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate(latest) {
        setDisplay(Math.round(latest))
      },
    })
    return () => controls.stop()
  }, [value])

  return <span>{display}</span>
}

export function SectionHeader({ title, subtitle, description }) {
  return (
    <div className="space-y-4">
      <p className="text-sm uppercase tracking-[0.36em] text-cyan-200/70">领域安全 · 全域监测</p>
      <h2 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">{title}</h2>
      <p className="max-w-3xl text-lg leading-8 text-slate-300">{subtitle}</p>
      <p className="max-w-3xl text-base leading-7 text-slate-400">{description}</p>
    </div>
  )
}

export function SectionIndex({ sections }) {
  return (
    <nav className="scroll-mt-24 rounded-[32px] border border-white/10 bg-white/5 px-4 py-4 shadow-glow backdrop-blur-xl lg:px-6">
      <p className="mb-3 text-xs uppercase tracking-[0.32em] text-cyan-100/70">快速索引</p>
      <div className="flex flex-wrap gap-3">
        {sections.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-2xl border border-cyan-300/20 bg-cyan-400/10 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:border-cyan-200/40 hover:bg-cyan-400/15 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          >
            {section.title}
          </a>
        ))}
      </div>
    </nav>
  )
}

export function MetricsPanel({ metrics }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {metrics.map((item) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
          <p className="mt-3 text-4xl font-semibold text-white">
            <AnimatedNumber value={item.value} />
            <span className="ml-2 text-base text-cyan-200">{item.unit}</span>
          </p>
        </motion.div>
      ))}
    </div>
  )
}
