import { polarIceStats } from '../data/polarData.js'

export default function PolarIceBlockUI() {
  return (
    <div className="relative h-full min-h-[480px] overflow-hidden rounded-card border border-polar/20 bg-gradient-to-b from-polar-light via-white to-polar-light/50 p-6"
      style={{ animation: 'iceFloat 8s ease-in-out infinite' }}>
      {/* Subtle ice texture */}
      <div className="pointer-events-none absolute inset-0 opacity-30"
        style={{ backgroundImage:'radial-gradient(circle at 20% 15%,rgba(0,160,135,0.12),transparent 30%),radial-gradient(circle at 75% 70%,rgba(0,160,135,0.08),transparent 25%)' }} />

      <div className="relative space-y-5">
        <div>
          <p className="section-label section-label-polar">极地消融指标</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">冰层数据视图</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-surface/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">冰盖覆盖率</p>
            <p className="mt-3 stat-number text-polar">{polarIceStats.endCoverage}%</p>
            <p className="mt-2 text-xs text-subtle">较 {polarIceStats.startYear} 年缩减近六成</p>
          </div>
          <div className="rounded-card border border-border bg-surface/80 p-4 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">融化速率</p>
            <p className="mt-3 stat-number text-polar-mid">13%</p>
            <p className="mt-2 text-xs text-subtle">每十年平均退缩，呈加速趋势</p>
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface/80 p-4 backdrop-blur-sm text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">研究区间</span>
            <span className="font-medium text-ink">{polarIceStats.startYear} – {polarIceStats.endYear}</span>
          </div>
          <p className="mt-3 text-xs text-subtle leading-5">
            极地冰层正转变为气候与战略双重博弈的核心资产，毛玻璃视觉表达"脆弱中的高价值"。
          </p>
        </div>
      </div>

      <style>{`@keyframes iceFloat{0%,100%{transform:translateY(0) rotate(-0.05deg)}50%{transform:translateY(-6px) rotate(0.05deg)}}`}</style>
    </div>
  )
}
