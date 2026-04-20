import { polarIceStats } from '../data/polarData.js'

export default function PolarIceBlockUI() {
  return (
    <div className="relative h-full min-h-[520px] overflow-hidden rounded-card border border-polar/15 bg-gradient-to-b from-polar-light via-white to-polar-light/40 p-6"
      style={{ animation: 'polarIceFloat 8s ease-in-out infinite' }}>
      {/* Subtle ice-crystal radial highlights */}
      <div className="pointer-events-none absolute inset-0 opacity-40" style={{
        background: 'radial-gradient(circle at 22% 18%,rgba(0,160,135,0.1),transparent 25%),radial-gradient(circle at 72% 70%,rgba(0,160,135,0.06),transparent 20%)'
      }} />

      <div className="relative space-y-6">
        <div>
          <p className="section-label section-label-polar">极地消融指标</p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">冰层数据视图</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-card border border-border bg-surface/80 p-5 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">冰盖覆盖率</p>
            <p className="mt-3 stat-number text-polar">{polarIceStats.endCoverage}%</p>
            <p className="mt-2 text-xs leading-5 text-subtle">
              较 {polarIceStats.startYear} 年基准缩减近六成
            </p>
          </div>
          <div className="rounded-card border border-border bg-surface/80 p-5 backdrop-blur-sm">
            <p className="text-xs font-medium uppercase tracking-wider text-muted">融化速率</p>
            <p className="mt-3 stat-number text-polar-mid">13%</p>
            <p className="mt-2 text-xs leading-5 text-subtle">
              每十年平均退缩，呈加速趋势
            </p>
          </div>
        </div>

        <div className="rounded-card border border-border bg-surface/80 p-5 backdrop-blur-sm">
          <div className="flex items-center justify-between text-sm">
            <span className="text-xs font-medium uppercase tracking-wider text-muted">研究区间</span>
            <span className="font-medium text-ink">{polarIceStats.startYear} – {polarIceStats.endYear}</span>
          </div>
          <p className="mt-3 text-xs leading-5 text-subtle">
            极地冰层正转变为气候与战略双重博弈的核心资产。毛玻璃视觉表达"脆弱中的高价值"。
          </p>
        </div>
      </div>

      <style>{`@keyframes polarIceFloat{0%,100%{transform:translateY(0) rotate(-0.05deg)}50%{transform:translateY(-6px) rotate(0.05deg)}}`}</style>
    </div>
  )
}
