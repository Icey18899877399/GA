import { useEffect, useRef } from 'react'

export default function MarineSnow() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext('2d'), particles = []
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize)
    for (let i = 0; i < 60; i++) particles.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, vx: (Math.random()-0.5)*0.3, vy: Math.random()*0.4+0.1, size: Math.random()*1.5+0.5, opacity: Math.random()*0.3+0.1 })
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.y > canvas.height) { p.y = 0; p.x = Math.random()*canvas.width }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI*2)
        ctx.fillStyle = `rgba(77, 187, 213, ${p.opacity})`; ctx.fill()
      })
      requestAnimationFrame(animate)
    }; animate()
    return () => window.removeEventListener('resize', resize)
  }, [])
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" style={{ opacity: 0.15 }} />
}
