export default function ScrollIndicator({ current }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-2 rounded-[28px] border border-white/10 bg-white/5 px-6 py-4 text-slate-400 shadow-glow">
      <p className="text-sm uppercase tracking-[0.32em] text-cyan-100/80">当前章节</p>
      <p className="text-base font-medium text-white">{current ?? '太空碎片态势'}</p>
      <p className="max-w-xl text-center text-sm text-slate-500">
        统一深色科技视觉，采用极光蓝 / 深海蓝 / 预警橙，贯穿滚动动画与动效节奏。
      </p>
    </div>
  )
}
