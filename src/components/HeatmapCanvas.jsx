/* HeatmapCanvas.jsx — kept as-is internally, just container changed */
/* NOTE: This file should be saved as HeatmapCanvas.jsx */
import { useEffect, useRef } from 'react'

const points = Array.from({ length: 24 }, (_, i) => ({ angle: (i/24)*Math.PI*2, radius: 110+Math.sin(i*0.9)*22, intensity: 0.32+Math.random()*0.68 }))

export default function HeatmapCanvas() {
  const canvasRef = useRef(null)
  useEffect(() => {
    const canvas = canvasRef.current; if(!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio||1
    canvas.width = canvas.clientWidth*dpr; canvas.height = canvas.clientHeight*dpr; ctx.scale(dpr,dpr)
    ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    ctx.save(); ctx.translate(canvas.clientWidth/2,canvas.clientHeight/2)
    points.forEach((p,i) => {
      ctx.beginPath(); ctx.fillStyle = `hsla(${180+p.intensity*30},45%,55%,${0.08+Math.sin(i*0.7)*0.06})`
      ctx.arc(Math.cos(p.angle)*p.radius*0.9,Math.sin(p.angle)*p.radius*0.7,20,0,Math.PI*2); ctx.fill()
    })
    const g = ctx.createRadialGradient(0,0,10,0,0,160)
    g.addColorStop(0,'rgba(0,160,135,0.12)'); g.addColorStop(0.6,'rgba(230,75,53,0.06)'); g.addColorStop(1,'transparent')
    ctx.fillStyle = g; ctx.fillRect(-canvas.clientWidth/2,-canvas.clientHeight/2,canvas.clientWidth,canvas.clientHeight)
    ctx.restore()
  }, [])

  return (
    <div className="card strip-polar p-5">
      <p className="text-sm text-muted mb-4">极地消融热力对比图：高亮显示冰盖弱化区与预警趋势。</p>
      <div className="relative aspect-[4/3] overflow-hidden rounded-card border border-border bg-polar-light/20">
        <canvas ref={canvasRef} className="h-full w-full" aria-label="极地热力图" />
      </div>
    </div>
  )
}
