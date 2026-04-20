import { useEffect, useRef } from 'react'

export default function PolarAuroraCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return
    const ctx = canvas.getContext('2d'); let raf
    const resize = () => { const d=window.devicePixelRatio||1; canvas.width=canvas.clientWidth*d; canvas.height=canvas.clientHeight*d; ctx.setTransform(d,0,0,d,0,0) }
    resize()
    const draw = (t) => {
      const w=canvas.clientWidth,h=canvas.clientHeight; ctx.clearRect(0,0,w,h)
      /* Soft gradient background */
      const bg = ctx.createLinearGradient(0,0,0,h*0.5)
      bg.addColorStop(0,'rgba(0,160,135,0.06)'); bg.addColorStop(0.4,'rgba(0,160,135,0.02)'); bg.addColorStop(1,'transparent')
      ctx.fillStyle = bg; ctx.fillRect(0,0,w,h)
      /* Aurora waves */
      ctx.save(); ctx.globalAlpha=0.08
      for(let i=0;i<4;i++){
        const y=Math.sin(t*0.0006+i)*10+40+i*14
        ctx.strokeStyle=`rgba(0,160,135,${0.15+i*0.03})`; ctx.lineWidth=16; ctx.beginPath()
        ctx.moveTo(-60,y); ctx.bezierCurveTo(w*0.2,y+8,w*0.4,y-12,w*0.55,y+4); ctx.bezierCurveTo(w*0.75,y+16,w*0.9,y-8,w+60,y+2); ctx.stroke()
      }
      ctx.restore()
      raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw); window.addEventListener('resize',resize)
    return () => { window.removeEventListener('resize',resize); cancelAnimationFrame(raf) }
  }, [])

  return (
    <div className="relative overflow-hidden rounded-card border border-border bg-polar-light/20">
      <canvas ref={canvasRef} className="h-64 w-full block" aria-label="极光背景" />
    </div>
  )
}
