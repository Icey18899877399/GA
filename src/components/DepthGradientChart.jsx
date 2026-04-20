import { motion } from 'framer-motion'

const layers = [
  { label: '稀有金属', value: 86, color: 'from-deepsea to-deepsea-mid' },
  { label: '能源通道', value: 62, color: 'from-deepsea-mid to-deepsea-light' },
  { label: '防护带', value: 43, color: 'from-accent to-bio-light' },
]

export default function DepthGradientChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="card strip-deepsea p-6"
    >
      <p className="section-label section-label-deepsea mb-2">深海梯度态势</p>
      <p className="text-sm leading-7 text-muted mb-6">
        资源梯度图以色块强度呈现资源密度与安全带分布，体现深度探测与通道防护的复合态势。
      </p>
      <div className="space-y-5">
        {layers.map((item) => (
          <div key={item.label} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink">{item.label}</span>
              <span className="stat-number text-xl" style={{ color: '#4DBBD5' }}>{item.value}%</span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-deepsea-light">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${item.value}%` }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
