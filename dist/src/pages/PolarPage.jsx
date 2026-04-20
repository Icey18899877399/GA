import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { sections } from '../data/content.js'
import { polarCopy } from '../data/polarData.js'
import PolarIceBlockUI from '../components/PolarIceBlockUI.jsx'
import PolarProjectionMap from '../components/PolarProjectionMap.jsx'
import { PolarRadarPanel, TemperatureTrendChart } from '../components/PolarCharts.jsx'
import { SectionHeader } from '../components/PageCommon.jsx'

export default function PolarPage() {
  const section = sections.find((item) => item.id === 'polar')

  return (
    <div className="min-h-screen bg-base text-ink">
      <main className="relative mx-auto max-w-6xl space-y-16 px-6 py-14 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-label section-label-polar">极地域安全专题</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
              {polarCopy.title}
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-card border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-border-dark hover:text-ink"
          >
            ← 返回主页
          </Link>
        </div>

        <div className="h-px bg-border" />

        {/* Intro */}
        <section className="card strip-polar p-6">
          <p className="text-base leading-8 text-muted">{polarCopy.intro}</p>
        </section>

        {/* Content + Ice block */}
        <section className="grid gap-10 xl:grid-cols-[1.2fr_0.8fr] items-start">
          <div className="space-y-6">
            <SectionHeader {...section} />
            {polarCopy.viewpoints.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="card p-5"
              >
                <h3 className="text-lg font-semibold text-polar">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-muted">{item.content}</p>
              </motion.div>
            ))}
          </div>
          <div className="card overflow-hidden" style={{ minHeight: '360px' }}>
            <PolarIceBlockUI />
          </div>
        </section>

        {/* Map */}
        <section className="card overflow-hidden">
          <PolarProjectionMap />
        </section>

        {/* Charts */}
        <section className="grid gap-6 xl:grid-cols-2">
          <div className="card p-5">
            <PolarRadarPanel />
          </div>
          <div className="card p-5">
            <TemperatureTrendChart />
          </div>
        </section>
      </main>
    </div>
  )
}
