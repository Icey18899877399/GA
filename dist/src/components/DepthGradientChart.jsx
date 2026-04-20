import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const layers = [
  { label: '稀有金属', value: 86, color: 'from-cyan-400/80 to-blue-700/20' },
  { label: '能源通道', value: 62, color: 'from-sky-400/80 to-cyan-900/20' },
  { label: '防护带', value: 43, color: 'from-amber-400/70 to-slate-900/20' },
]

export default function DepthGradientChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="rounded-[32px] border border-white/10 bg-cosmic/70 p-8 shadow-glow backdrop-blur-xl"
    >
      <div className="space-y-8">
        <div className="rounded-[28px] bg-white/5 p-6 shadow-[inset_0_0_0_1px_rgba(56,182,255,0.08)]">
          <p className="text-sm uppercase tracking-[0.32em] text-cyan-100/70">深海梯度态势</p>
          <p className="mt-4 text-base leading-7 text-slate-300">
            深海资源梯度图以色块强度呈现资源密度与安全带分布，体现“深度探测 + 通道防护”的复合态势。
          </p>
        </div>

        <div className="grid gap-6">
          {layers.map((item) => (
            <div key={item.label} className="space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-[0.26em] text-slate-400">{item.label}</span>
                <span className="text-xl font-semibold text-white">{item.value}%</span>
              </div>
              <div className="h-4 overflow-hidden rounded-full bg-slate-900/70">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.value}%` }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 1.2, ease: 'easeOut' }}
                  className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
