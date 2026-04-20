import { useEffect, useRef } from 'react'

export default function BioMicroscopeBackground() {
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

    const draw = (time) => {
      const w = canvas.clientWidth, h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      /* Light warm background */
      ctx.fillStyle = '#FDFAF8'
      ctx.fillRect(0, 0, w, h)

      /* Subtle floating particles in bio red/pink */
      for (let i = 0; i < 80; i++) {
        const x = (Math.sin(time * 0.0002 + i * 1.1) * 0.5 + 0.5) * w
        const y = (Math.cos(time * 0.0003 + i * 0.7) * 0.5 + 0.5) * h
        const r = 1 + Math.abs(Math.sin(time * 0.0008 + i * 0.4)) * 1.5
        ctx.beginPath()
        ctx.fillStyle = `rgba(230, 75, 53, ${0.04 + Math.sin(time * 0.001 + i) * 0.02})`
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      /* Very subtle horizontal scan lines */
      ctx.save()
      ctx.strokeStyle = 'rgba(230, 75, 53, 0.03)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < 12; i++) {
        const offset = Math.sin(time * 0.0005 + i) * 4
        ctx.beginPath()
        ctx.moveTo(0, (h / 13) * (i + 1) + offset)
        ctx.lineTo(w, (h / 13) * (i + 1) + offset)
        ctx.stroke()
      }
      ctx.restore()

      raf = requestAnimationFrame(draw)
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block opacity-60" aria-hidden="true" />
}
