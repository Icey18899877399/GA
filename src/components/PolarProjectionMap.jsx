import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const routeData = [
  { id:'nsr', title:'NSR', fullName:'东北航道', color:'#00A087',
    points:[[12,2.2],[45,2.6],[78,2.9],[120,2.4]],
    description:'沿俄罗斯北冰洋沿岸，东亚与欧洲航程近 40% 缩短。',
    metrics:'苏伊士运河 24 天 → NSR 14 天' },
  { id:'nwp', title:'NWP', fullName:'西北航道', color:'#4DBBD5',
    points:[[160,2.3],[135,2.7],[110,2.3],[80,1.8]],
    description:'穿越加拿大北极群岛，连接北美东海岸与欧洲。',
    metrics:'巴拿马运河 22 天 → NWP 16 天' },
  { id:'tsr', title:'TSR', fullName:'跨极航道（规划）', color:'#E64B35',
    points:[[45,2.4],[75,2.85],[105,2.85],[135,2.2]],
    description:'未来中央航道，横穿北极圈核心海域，高风险高回报。',
    metrics:'未来选项：最短路径，极端冰况' },
]

const portNodes = [
  { id:'murmansk', name:'摩尔曼斯克', desc:'俄罗斯北极港口，NSR 关键补给站', position:[2.0,-0.5,0.14], color:'#00A087' },
  { id:'seattle', name:'西雅图', desc:'北美西海岸港口，NWP 西端节点', position:[-2.6,-0.9,0.14], color:'#4DBBD5' },
  { id:'tromso', name:'特罗姆瑟', desc:'挪威北极门户，科研与补给枢纽', position:[1.2,0.8,0.14], color:'#3C5488' },
  { id:'shanghai', name:'上海', desc:'东亚最大港口，NSR 东端起点', position:[-1.8,-1.2,0.14], color:'#F39B7F' },
]

function p2c(a,r,z=0){const t=((a-90)*Math.PI)/180;return new THREE.Vector3(r*Math.cos(t),r*Math.sin(t),z)}

function PolarGlobe(){
  const ref=useRef(null)
  useFrame(({clock})=>{if(ref.current){ref.current.rotation.z=clock.elapsedTime*0.06;ref.current.rotation.x=Math.sin(clock.elapsedTime*0.12)*0.08}})
  return(
    <group>
      {/* 浅色地球 */}
      <mesh ref={ref} rotation={[Math.PI/2,0,0]}>
        <icosahedronGeometry args={[2.05,5]}/>
        <meshStandardMaterial color="#5a8a7a" metalness={0.2} roughness={0.4} emissive="#3a6a5a" emissiveIntensity={0.3}/>
      </mesh>
      {/* 冰盖区域 */}
      <mesh rotation={[Math.PI/2,0,0]} position={[0,0,0.01]}>
        <circleGeometry args={[1.2,64]}/>
        <meshBasicMaterial color="#d0eaf2" transparent opacity={0.4}/>
      </mesh>
    </group>
  )
}

function RouteCurve({points,color}){
  const ref=useRef(null)
  const curve=useMemo(()=>{const pts=points.map(([a,r])=>p2c(a,r,0.16));return new THREE.CatmullRomCurve3(pts,false,'catmullrom',0.4)},[points])
  const pos=useMemo(()=>curve.getPoints(80),[curve])
  useFrame(()=>{if(ref.current)ref.current.material.dashOffset-=0.004})
  return(<line ref={ref}><bufferGeometry attach="geometry" setFromPoints={pos}/><lineDashedMaterial attach="material" color={color} dashSize={0.08} gapSize={0.06} linewidth={1.5} transparent opacity={0.85}/></line>)
}

function PortNode({position,color,onHover,onLeave}){
  return(
    <group>
      <mesh position={position} onPointerOver={onHover} onPointerOut={onLeave}>
        <sphereGeometry args={[0.1,16,16]}/>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} transparent opacity={0.9}/>
      </mesh>
      {/* 脉冲环 */}
      <mesh position={position} rotation={[Math.PI/2,0,0]}>
        <ringGeometry args={[0.12,0.16,32]}/>
        <meshBasicMaterial color={color} transparent opacity={0.2}/>
      </mesh>
    </group>
  )
}

export default function PolarProjectionMap(){
  const [hovered,setHovered]=useState(null)

  return(
    <section className="space-y-6">
      <div>
        <p className="section-label section-label-polar">Polar Shipping Routes</p>
        <h2 className="mt-2 font-display text-3xl font-semibold text-ink">冰上丝绸之路：可视化北极航道</h2>
        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">展示极地航道的核心航线与港口节点。2024 年加拿大群岛西北航道夏季冰情达卫星记录最低。</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] items-start">
        {/* 左：航线卡片 */}
        <div className="space-y-4">
          {routeData.map(route=>(
            <div key={route.id} className="card p-5" style={{borderLeft:`3px solid ${route.color}`}}>
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-wider" style={{color:route.color}}>{route.fullName}</p>
                  <h3 className="mt-0.5 text-lg font-semibold text-ink">{route.title}</h3>
                </div>
                <span className="rounded-card border border-border bg-base px-2 py-0.5 text-[10px] font-medium text-muted">{route.id.toUpperCase()}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{route.description}</p>
              <p className="mt-2 rounded-md bg-polar-light/50 px-3 py-2 text-xs text-polar">{route.metrics}</p>
            </div>
          ))}
        </div>

        {/* 右：3D 地球 — 浅冰蓝底色 */}
        <div className="relative overflow-hidden rounded-card border border-border" style={{background:'linear-gradient(180deg,#e0f0f0,#c8dfe8)'}}>
          <div className="relative h-[480px] w-full">
            <Canvas camera={{position:[1.8,1.8,7],fov:42}}>
              <ambientLight intensity={0.7}/>
              <directionalLight position={[3,4,3]} intensity={0.8} color="#b0d8d0"/>
              <directionalLight position={[-3,-2,-3]} intensity={0.4} color="#90c8c0"/>
              <PolarGlobe/>
              {routeData.map(r=><RouteCurve key={r.id} points={r.points} color={r.color}/>)}
              {portNodes.map(n=><PortNode key={n.id} position={n.position} color={n.color}
                onHover={()=>setHovered(n)} onLeave={()=>setHovered(null)}/>)}
            </Canvas>

            {/* 标签 */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute left-4 top-4 rounded-md bg-surface/70 px-2.5 py-1 text-[10px] font-medium text-muted backdrop-blur-sm">North Pole</div>
              <div className="absolute right-4 top-10 rounded-md bg-surface/70 px-2.5 py-1 text-[10px] text-subtle backdrop-blur-sm">Canadian Arctic Archipelago</div>
            </div>

            {/* 图例 */}
            <div className="pointer-events-none absolute left-3 bottom-3 flex flex-wrap gap-1.5">
              {routeData.map(r=>(
                <span key={r.id} className="flex items-center gap-1 rounded-sm bg-surface/70 px-1.5 py-0.5 text-[9px] text-muted backdrop-blur-sm">
                  <i className="inline-block h-1.5 w-1.5 rounded-full" style={{background:r.color}}/>{r.title}
                </span>
              ))}
            </div>

            {/* Hover 港口信息 */}
            {hovered&&(
              <div className="pointer-events-none absolute right-3 bottom-3 z-20 rounded-card border border-border bg-surface/95 p-3 shadow-card backdrop-blur-sm" style={{maxWidth:200}}>
                <p className="text-[10px] font-medium uppercase tracking-wider text-polar">港口节点</p>
                <p className="mt-1 text-sm font-semibold text-ink">{hovered.name}</p>
                <p className="mt-1 text-xs leading-4 text-muted">{hovered.desc}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
