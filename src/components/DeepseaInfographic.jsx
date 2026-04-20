export default function DeepseaInfographic() {
  return (
    <div className="card strip-deepsea overflow-hidden">
      <div className="relative p-8 text-center">
        {/* Subtle wave pattern bg */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 18px, #4DBBD5 18px, #4DBBD5 19px)' }} />
        <div className="relative space-y-4 max-w-2xl mx-auto">
          <p className="section-label section-label-deepsea justify-center">领域安全 · 全域监测</p>
          <h2 className="font-display text-3xl font-semibold text-ink">深海资源与安全通道</h2>
          <p className="text-base leading-7 text-muted">
            深海资源勘探与通道控制正在成为国家级战略资产。深海安全可视化呈现资源梯度、海底通道与防护网络，帮助理解海洋领域的控制权分布和防御态势。
          </p>
        </div>
      </div>
      {/* Depth illustration */}
      <div className="relative h-48 bg-gradient-to-b from-deepsea-light via-deepsea-mid/20 to-deepsea/10 overflow-hidden">
        {/* Particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="absolute rounded-full bg-deepsea/10 animate-pulse"
            style={{ top: `${15 + i * 10}%`, left: `${10 + i * 11}%`, width: 3 + i, height: 3 + i, animationDelay: `${i * 0.4}s` }} />
        ))}
        {/* Abstract trapezoidal depth */}
        <svg className="absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-20 opacity-20" viewBox="0 0 160 80">
          <path d="M 30 0 L 130 0 L 160 80 L 0 80 Z" fill="#4DBBD5" />
        </svg>
      </div>
    </div>
  )
}
