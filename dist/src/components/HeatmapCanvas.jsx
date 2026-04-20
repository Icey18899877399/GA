import { useEffect, useRef } from 'react'

const points = Array.from({ length: 24 }, (_, idx) => ({
  angle: (idx / 24) * Math.PI * 2,
  radius: 110 + Math.sin(idx * 0.9) * 22,
  intensity: 0.32 + Math.random() * 0.68,
}))

export default function HeatmapCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const width = canvas.clientWidth * dpr
    const height = canvas.clientHeight * dpr
    canvas.width = width
    canvas.height = height
    ctx.scale(dpr, dpr)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      ctx.save()
      ctx.translate(canvas.clientWidth / 2, canvas.clientHeight / 2)

      points.forEach((point, index) => {
        const hue = 210 + point.intensity * 50
        const alpha = 0.12 + Math.sin(index * 0.7) * 0.1
        ctx.beginPath()
        ctx.fillStyle = `hsla(${hue}, 100%, 60%, ${alpha})`
        ctx.arc(Math.cos(point.angle) * point.radius * 0.9, Math.sin(point.angle) * point.radius * 0.7, 22, 0, Math.PI * 2)
        ctx.fill()
      })

      const gradient = ctx.createRadialGradient(0, 0, 10, 0, 0, 180)
      gradient.addColorStop(0, 'rgba(56,182,255,0.28)')
      gradient.addColorStop(0.6, 'rgba(255,139,45,0.15)')
      gradient.addColorStop(1, 'rgba(5,7,18,0)')
      ctx.fillStyle = gradient
      ctx.fillRect(-canvas.clientWidth / 2, -canvas.clientHeight / 2, canvas.clientWidth, canvas.clientHeight)

      ctx.restore()
    }

    draw()
  }, [])

  return (
    <div className="rounded-[32px] border border-white/10 bg-cosmic/80 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-300">
        极地消融热力对比图：高亮显示冰盖弱化区与预警趋势。
      </div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 bg-[#08111e]">
        <canvas ref={canvasRef} className="h-full w-full" aria-label="极地热力图可视化" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(56,182,255,0.14),transparent_40%)]" />
      </div>
    </div>
  )
}
