import { polarIceStats } from '../data/polarData.js'

export default function PolarIceBlockUI() {
  return (
    <div className="relative h-[680px] overflow-hidden rounded-[36px] border border-cyan-200/20 bg-[#07111d]/20 shadow-[0_0_80px_rgba(0,255,195,0.12)] px-6 py-8 backdrop-blur-xl">
      <div className="absolute inset-0 opacity-80" style={{
        background: 'radial-gradient(circle at 22% 18%, rgba(138, 230, 255, 0.16), transparent 18%), radial-gradient(circle at 72% 15%, rgba(36,224,255,0.12), transparent 22%), radial-gradient(circle at 40% 62%, rgba(90, 190, 255, 0.14), transparent 16%), radial-gradient(circle at 60% 78%, rgba(255,255,255,0.08), transparent 18%)'
      }} />
      <div
        className="relative h-full w-full rounded-[32px] border border-white/10 bg-white/10 backdrop-blur-[15px] shadow-[inset_0_0_60px_rgba(255,255,255,0.06)]"
        style={{
          border: '1px solid rgba(255,255,255,0.18)',
          boxShadow: '0 32px 80px rgba(0, 150, 255, 0.12)',
          animation: 'polarIceFloat 8s ease-in-out infinite',
          overflow: 'hidden',
        }}
      >
        <div
          className="relative h-full w-full overflow-hidden text-white"
          style={{ padding: '50px 42px 50px', boxSizing: 'border-box' }}
        >
          <div className="space-y-3">
            <p className="text-xs uppercase tracking-[0.38em] text-cyan-100/70">极地消融指标</p>
            <h2 className="text-3xl font-semibold text-white">冰层漂浮数据视图</h2>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[28px] border border-white/10 bg-[#0e262f]/70 p-5 backdrop-blur-md">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">冰盖覆盖率</p>
              <p className="mt-4 text-4xl font-semibold text-white">{polarIceStats.endCoverage}%</p>
              <p className="mt-2 text-sm text-slate-300">相较于 {polarIceStats.startYear} 年基准，极地冰盖已缩减近六成。</p>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-[#0e262f]/70 p-5 backdrop-blur-md">
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-100/70">融化速率</p>
              <p className="mt-4 text-4xl font-semibold text-[#7dd3fc]">13%</p>
              <p className="mt-2 text-sm text-slate-300">北极冰层每十年平均退缩约 13%，呈加速趋势。</p>
            </div>
          </div>

          <div className="mt-7 rounded-[28px] border border-white/10 bg-[#0e262f]/70 p-5 backdrop-blur-md text-sm text-slate-300">
            <div className="flex items-center justify-between">
              <span className="uppercase tracking-[0.24em] text-cyan-100/70">研究区间</span>
              <span className="text-white">{polarIceStats.startYear} - {polarIceStats.endYear}</span>
            </div>
            <div className="mt-4 rounded-3xl bg-white/10 p-4 text-xs text-cyan-100/80">
              极地冰层正在转变为气候与战略双重博弈的核心资产，冰块 UI 通过毛玻璃视觉表达“脆弱中的高价值”。
            </div>
          </div>
        </div>
      </div>
      <style>{
        `@keyframes polarIceFloat {
          0%, 100% { transform: translateY(0px) rotate(-0.1deg); }
          50% { transform: translateY(-10px) rotate(0.1deg); }
        }`
      }</style>
    </div>
  )
}
