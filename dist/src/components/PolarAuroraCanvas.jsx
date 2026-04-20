import { useEffect, useRef } from 'react'

export default function PolarAuroraCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = null

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    resize()

    const draw = (time) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = '#00050A'
      ctx.fillRect(0, 0, width, height)

      const gradient = ctx.createLinearGradient(0, 0, 0, height * 0.5)
      gradient.addColorStop(0, 'rgba(0, 255, 195, 0.26)')
      gradient.addColorStop(0.35, 'rgba(0, 255, 195, 0.08)')
      gradient.addColorStop(1, 'transparent')
      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.globalAlpha = 0.16
      for (let i = 0; i < 5; i += 1) {
        const y = Math.sin((time * 0.0008) + i) * 14 + 70 + i * 16
        const alpha = 0.12 + i * 0.04
        ctx.strokeStyle = `rgba(0, 255, 195, ${alpha})`
        ctx.lineWidth = 24
        ctx.beginPath()
        ctx.moveTo(-80, y)
        ctx.bezierCurveTo(width * 0.15, y + 12, width * 0.35, y - 18, width * 0.52, y + 6)
        ctx.bezierCurveTo(width * 0.72, y + 24, width * 0.88, y - 12, width + 80, y + 4)
        ctx.stroke()
      }
      ctx.restore()

      ctx.save()
      for (let i = 0; i < 120; i += 1) {
        const x = Math.random() * width
        const y = Math.random() * height
        const radius = Math.random() * 1.3
        ctx.fillStyle = 'rgba(255,255,255,0.06)'
        ctx.beginPath()
        ctx.arc(x, y, radius, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      ctx.save()
      ctx.fillStyle = 'rgba(255,255,255,0.06)'
      for (let i = 0; i < 18; i += 1) {
        const px = 24 + (i * 28)
        const py = height - 62 + Math.sin((time * 0.0012) + i) * 8
        ctx.beginPath()
        ctx.arc(px, py, 3, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#00050A]/90 shadow-glow">
      <canvas ref={canvasRef} className="h-96 w-full block" aria-label="极光背景动画" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,195,0.16),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#00050A] to-transparent" />
    </div>
  )
}
