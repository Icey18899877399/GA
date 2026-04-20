export default function ScrollIndicator({ current }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-1.5 rounded-card border border-border bg-surface px-5 py-3 shadow-card">
      <p className="text-[10px] font-medium uppercase tracking-wider text-muted">当前章节</p>
      <p className="text-sm font-semibold text-ink">{current ?? '太空碎片态势'}</p>
      <p className="max-w-md text-center text-xs text-subtle">
        NPG 色板 · 可视化 · 滚动驱动叙事
      </p>
    </div>
  )
}
