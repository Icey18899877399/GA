import { useEffect, useState } from 'react'
import { animate, motion } from 'framer-motion'

export function TypewriterText({ text, speed = 40 }) {
  const [value, setValue] = useState('')
  useEffect(() => {
    let i = 0
    const next = () => { setValue(text.slice(0, i)); i++; if (i <= text.length) requestAnimationFrame(() => setTimeout(next, speed)) }
    next()
  }, [text, speed])
  return <span className="text-muted">{value}</span>
}

export function AnimatedNumber({ value }) {
  const [display, setDisplay] = useState(0)
  useEffect(() => {
    const c = animate(0, value, { duration: 1.4, ease: 'easeOut', onUpdate: (v) => setDisplay(Math.round(v)) })
    return () => c.stop()
  }, [value])
  return <span>{display}</span>
}

export function SectionHeader({ title, subtitle, description }) {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ink">{title}</h2>
      {subtitle && <p className="max-w-3xl text-base leading-7 text-muted">{subtitle}</p>}
      {description && <p className="max-w-3xl text-sm leading-7 text-subtle">{description}</p>}
    </div>
  )
}

export function SectionIndex({ sections }) {
  return (
    <nav className="card p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted">快速索引</p>
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <a key={s.id} href={`#${s.id}`}
            className="rounded-card border border-border bg-surface px-3 py-1.5 text-sm font-medium text-ink transition hover:border-border-dark hover:shadow-card">
            {s.title}
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
        <motion.div key={item.label}
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5 }}
          className="card p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">{item.label}</p>
          <p className="mt-2 stat-number text-ink">
            <AnimatedNumber value={item.value} />
            <span className="ml-1 text-sm text-subtle">{item.unit}</span>
          </p>
        </motion.div>
      ))}
    </div>
  )
}
