import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const routeData = [
  { id:'nsr', title:'NSR', subtitle:'Northeast Passage', color:'#00A087',
    description:'沿俄罗斯北冰洋沿岸，东亚与欧洲航程近 40% 缩短。是未来大动脉，也是主权争端前沿。',
    points:[[90,40],[70,60],[50,30],[20,20]],
    metrics:'上海 → 鹿特丹 via NSR: ~14 天 | via Suez: ~24 天' },
  { id:'nwp', title:'NWP', subtitle:'Northwest Passage', color:'#4DBBD5',
    description:'穿越加拿大北极群岛，连接北美东海岸与欧洲，带来主权与生态严峻考验。',
    points:[[100,58],[80,60],[60,40],[30,20]],
    metrics:'西雅图 → 鹿特丹 via NWP: ~16 天 | via Panama: ~22 天' },
  { id:'tsr', title:'TSR', subtitle:'Transpolar Sea Route', color:'#E64B35',
    description:'未来中央航道，横穿北极圈核心海域。尚在构想阶段，代表潜在战略新通道。',
    points:[[95,45],[80,35],[55,18],[35,10]],
    metrics:'未来中心航线，适合极端冰况与高风险航行。' },
]

function polarToCartesian(r,a,o=0){const t=((a-90)*Math.PI)/180;return new THREE.Vector3(r*Math.cos(t)+o,r*Math.sin(t),0)}

function RouteLine({points,color,progress}){
  const ref=useRef(null)
  const curve=useMemo(()=>{const pts=points.map(pt=>polarToCartesian(3.5,pt[0],0));return new THREE.CatmullRomCurve3(pts,false,'catmullrom',0.4)},[points])
  const geo=useMemo(()=>{const pos=curve.getPoints(80);const buf=new Float32Array(pos.length*3);pos.forEach((p,i)=>{buf[i*3]=p.x;buf[i*3+1]=p.y;buf[i*3+2]=p.z});const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(buf,3));return g},[curve])
  useFrame(()=>{if(ref.current)ref.current.material.dashOffset-=0.002})
  return(<line ref={ref} geometry={geo}><lineDashedMaterial attach="material" color={color} linewidth={2} scale={1} dashSize={0.15} gapSize={0.12} transparent opacity={progress}/></line>)
}

function PolarRouteScene({stage}){
  const ref=useRef(null);const{camera}=useThree()
  useEffect(()=>{
    const t={nsr:{p:[1.8,1.8,7],l:[0,0,0]},nwp:{p:[-1.4,1.6,7],l:[0,0.2,0]},tsr:{p:[0.2,2.5,7],l:[0,0.4,0]}}
    const c=t[stage]||t.nsr
    gsap.to(camera.position,{x:c.p[0],y:c.p[1],z:c.p[2],duration:1.2,ease:'power2.inOut',onUpdate:()=>camera.lookAt(...c.l)})
  },[camera,stage])
  return(
    <group ref={ref}>
      <mesh rotation={[Math.PI/2,0,0]}><ringGeometry args={[3.4,3.8,128]}/><meshBasicMaterial color="#0e151f" transparent opacity={0.35}/></mesh>
      <mesh rotation={[Math.PI/2,0,0]}><circleGeometry args={[3.2,128]}/><meshBasicMaterial color="#04101c" transparent opacity={0.95}/></mesh>
      <mesh rotation={[Math.PI/2,0,0]}><circleGeometry args={[3.05,128]}/><meshBasicMaterial color="#0f2538" transparent opacity={0.55}/></mesh>
      {routeData.map(r=><RouteLine key={r.id} points={r.points} color={r.color} progress={stage===r.id?1:0.18}/>)}
      <mesh position={[0,0,0.01]}><sphereGeometry args={[0.18,24,24]}/><meshStandardMaterial color="#00A087" emissive="#00A087" emissiveIntensity={0.7} transparent opacity={0.95}/></mesh>
      <mesh position={polarToCartesian(3.5,135)}><sphereGeometry args={[0.08,16,16]}/><meshStandardMaterial color="#4DBBD5" emissive="#4DBBD5" emissiveIntensity={0.5} transparent opacity={0.88}/></mesh>
      <mesh position={polarToCartesian(3.5,270)}><sphereGeometry args={[0.08,16,16]}/><meshStandardMaterial color="#00A087" emissive="#00A087" emissiveIntensity={0.5} transparent opacity={0.88}/></mesh>
    </group>
  )
}

/* Heatmap canvas — stays dark internally, it's a data viz */
function PolarIceCoverageHeatmap({currentYear}){
  const canvasRef=useRef(null),yearRef=useRef(currentYear)
  const draw=(ctx,w,h,year)=>{
    ctx.clearRect(0,0,w,h);const cov=year===1979?100:42
    const g=ctx.createLinearGradient(0,0,w,0);g.addColorStop(0,'#002031');g.addColorStop(0.5,'#004d7a');g.addColorStop(1,'#0084c7')
    ctx.fillStyle='#03121d';ctx.fillRect(0,0,w,h)
    ctx.fillStyle=g;ctx.fillRect(0,h*0.3,w*(cov/100),h*0.4)
    ctx.fillStyle='rgba(0,204,255,0.18)';ctx.fillRect(w*(cov/100),h*0.3,w*((100-cov)/100),h*0.4)
    ctx.fillStyle='#A8F0FF';ctx.font='600 18px "Noto Sans SC",sans-serif';ctx.fillText(`${year} Arctic Ice Cover`,16,28)
    ctx.font='500 13px "Noto Sans SC",sans-serif';ctx.fillText(`Coverage: ${cov}%`,16,48)
  }
  useEffect(()=>{
    const c=canvasRef.current,ctx=c.getContext('2d'),dpr=window.devicePixelRatio||1
    const resize=()=>{c.width=c.clientWidth*dpr;c.height=c.clientHeight*dpr;ctx.setTransform(dpr,0,0,dpr,0,0);draw(ctx,c.clientWidth,c.clientHeight,yearRef.current)}
    resize();window.addEventListener('resize',resize);return()=>window.removeEventListener('resize',resize)
  },[])
  useEffect(()=>{yearRef.current=currentYear;const c=canvasRef.current;if(!c)return;const ctx=c.getContext('2d');draw(ctx,c.clientWidth,c.clientHeight,currentYear)},[currentYear])
  return <canvas ref={canvasRef} className="h-52 w-full rounded-card border border-border"/>
}

export default function PolarShippingRoutesModule(){
  const sectionRef=useRef(null),[stage,setStage]=useState('nsr'),[heatYear,setHeatYear]=useState(1979)

  useEffect(()=>{
    const secs=sectionRef.current?.querySelectorAll('[data-route]');if(!secs)return
    secs.forEach(sec=>{
      const id=sec.getAttribute('data-route')
      ScrollTrigger.create({trigger:sec,start:'top center',end:'bottom center',
        onEnter:()=>{setStage(id);setHeatYear(id==='nsr'?1979:2026)},
        onEnterBack:()=>{setStage(id);setHeatYear(id==='nsr'?1979:2026)},
      })
    })
    return()=>ScrollTrigger.getAll().forEach(t=>t.kill())
  },[])

  return(
    <section className="space-y-10" ref={sectionRef}>
      <div className="space-y-3">
        <p className="section-label section-label-polar">Polar Shipping Routes</p>
        <h2 className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          冰上丝绸之路：北极航道的开启与地缘政治
        </h2>
        <p className="max-w-3xl text-base leading-7 text-muted">
          气候变暖正在融化封存数千年的极地冰盖。这不仅是一场生态危机，更是在北冰洋重新划定全球贸易与地缘政治格局的新契机。
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        {/* Route cards */}
        <div className="space-y-5">
          {routeData.map(route=>(
            <article key={route.id} data-route={route.id} className="card strip-polar p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider text-polar">{route.subtitle}</p>
                  <h3 className="mt-1 text-xl font-semibold text-ink">{route.title}</h3>
                </div>
                <span className="rounded-card border border-polar/20 bg-polar-light px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-polar">
                  {route.id.toUpperCase()}
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-muted">{route.description}</p>
              <div className="mt-4 rounded-card border border-border bg-polar-light/50 p-3 text-xs text-muted">{route.metrics}</div>
            </article>
          ))}
        </div>

        {/* 3D + Heatmap */}
        <div className="space-y-5">
          <div className="relative overflow-hidden rounded-card border border-border">
            <div className="absolute inset-x-3 top-3 h-1 rounded-full bg-gradient-to-r from-polar to-deepsea opacity-20"/>
            <div className="relative h-[480px] w-full bg-[#04101c]">
              <Canvas camera={{position:[1.8,1.8,7],fov:42}}>
                <ambientLight intensity={0.4}/>
                <directionalLight position={[5,6,5]} intensity={1.1} color="#98f7ff"/>
                <directionalLight position={[-4,-3,-2]} intensity={0.5} color="#00a087"/>
                <Suspense fallback={null}>
                  <PolarRouteScene stage={stage}/>
                  <Environment preset="city" background={false}/>
                </Suspense>
              </Canvas>
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-4 top-5 rounded-card border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-white/70">North Pole</div>
                <div className="absolute right-4 top-12 rounded-card border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/60">Canadian Arctic Archipelago</div>
                <div className="absolute left-4 bottom-12 rounded-card border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/60">Murmansk</div>
                <div className="absolute right-4 bottom-20 rounded-card border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] text-white/60">Seattle</div>
              </div>
            </div>
          </div>

          <div className="card strip-polar p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-wider text-polar">Sea Ice Coverage</p>
                <h3 className="mt-1 text-xl font-semibold text-ink">冰盖变化热力图</h3>
              </div>
              <span className="rounded-card border border-polar/20 bg-polar-light px-2.5 py-1 text-xs font-medium tabular-nums text-polar">{heatYear}</span>
            </div>
            <PolarIceCoverageHeatmap currentYear={heatYear}/>
            <p className="text-xs text-muted leading-5">
              1979 年与 2026 年对比，海冰覆盖率从峰值 100% 下跌至 42%，显现极地航道开放与生态压力双重叠加。
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
