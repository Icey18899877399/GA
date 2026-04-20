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
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)

      ctx.fillStyle = '#001A15'
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < 120; i += 1) {
        const x = (Math.sin(time * 0.0003 + i) * 0.5 + 0.5) * width
        const y = (Math.cos(time * 0.0005 + i * 0.7) * 0.5 + 0.5) * height
        const r = 0.5 + Math.sin(time * 0.001 + i) * 0.7
        ctx.beginPath()
        ctx.fillStyle = `rgba(0, 255, 65, ${0.03 + (r * 0.02)})`
        ctx.arc(x, y, 1.2 + Math.abs(Math.sin(time * 0.0011 + i * 0.3)) * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      ctx.save()
      ctx.strokeStyle = 'rgba(0, 255, 65, 0.12)'
      ctx.lineWidth = 1
      for (let i = 0; i < 8; i += 1) {
        const offset = Math.sin(time * 0.0007 + i) * 8
        ctx.beginPath()
        ctx.moveTo(0, (height / 9) * i + offset)
        ctx.lineTo(width, (height / 9) * i + offset)
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

  return (
    <canvas ref={canvasRef} className="absolute inset-0 h-full w-full block" aria-hidden="true" />
  )
}
