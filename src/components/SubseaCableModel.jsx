import { useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const cableRoutes = [
  { id:'atlantic', label:'跨大西洋干线', description:'承载全球约 40% 金融与通信数据主干流。', color:'#3C5488',
    points:[[-4,1,0],[-2,0.5,1.5],[0,0.1,0.5],[2,-0.5,1.8],[4,-1,0]] },
  { id:'pacific', label:'跨太平洋链路', description:'连接亚太与北美，云计算与 AI 数据枢纽。', color:'#4DBBD5',
    points:[[-4,-1.2,0],[-2.4,-0.5,-1.5],[0,-0.2,-0.7],[2.4,0.4,-1.7],[4,1.2,0]] },
  { id:'indian', label:'印度洋—红海通道', description:'欧亚数据咽喉，2024 年红海事件致 25% 流量中断。', color:'#E64B35',
    points:[[-3,-0.3,1.8],[-1,0.8,1.2],[1,0.4,0.3],[3,-0.6,-0.8]] },
  { id:'intra-asia', label:'亚洲区域互联', description:'东亚—东南亚高密度互联，承载区域 10% 流量。', color:'#00A087',
    points:[[-3.5,0.6,-1],[- 1.5,1.2,-0.5],[0.5,0.8,0.8],[2.5,0.2,1.5]] },
  { id:'arctic', label:'北极海底光缆（规划中）', description:'连接欧亚的潜在新路径，受冰层融化影响可行性上升。', color:'#8491B4',
    points:[[-3,1.8,0.5],[-1,2.0,-0.5],[1,1.6,0.5],[3,1.2,-0.3]] },
]

/* 登陆节点 */
const landingNodes = [
  { pos:[-4,1,0], label:'纽约' },
  { pos:[4,-1,0], label:'伦敦' },
  { pos:[-4,-1.2,0], label:'东京' },
  { pos:[4,1.2,0], label:'洛杉矶' },
  { pos:[-3,-0.3,1.8], label:'孟买' },
  { pos:[3,-0.6,-0.8], label:'马赛' },
  { pos:[2.5,0.2,1.5], label:'新加坡' },
  { pos:[-3,1.8,0.5], label:'摩尔曼斯克' },
]

function CableLine({ route, active, onHover, onLeave }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(route.points.map(p => new THREE.Vector3(...p))), [route.points])
  const tube = useMemo(() => new THREE.TubeGeometry(curve, 80, active ? 0.07 : 0.04, 16, false), [curve, active])

  useFrame(({ clock }) => {
    if (tube && tube.attributes?.uv) {
      const off = (clock.elapsedTime * 0.3) % 1
      const arr = tube.attributes.uv.array
      for (let i = 0; i < arr.length; i += 2) arr[i] += off * 0.008
      tube.attributes.uv.needsUpdate = true
    }
  })

  return (
    <mesh geometry={tube} onPointerOver={() => onHover(route.id)} onPointerOut={onLeave}>
      <meshStandardMaterial color={route.color} emissive={route.color} emissiveIntensity={active ? 0.6 : 0.25} transparent opacity={active ? 0.95 : 0.6} />
    </mesh>
  )
}

function LandingNode({ pos }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.08, 12, 12]} />
      <meshBasicMaterial color="#E64B35" transparent opacity={0.7} />
    </mesh>
  )
}

export default function SubseaCableModel({ onRouteSelect, activeRoute }) {
  const [hovered, setHovered] = useState(null)
  const active = activeRoute || hovered
  const info = cableRoutes.find(r => r.id === active)

  return (
    <div className="relative h-[440px] w-full overflow-hidden rounded-card border border-border">
      {/* 浅色 3D 画布 */}
      <div className="h-full w-full" style={{ background: 'linear-gradient(180deg, #e4f5f9, #d0eaf2)' }}>
        <Canvas camera={{ position: [0, 0, 12], fov: 38 }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={0.7} color="#b8d8e8" />
          <pointLight position={[-5, -5, -2]} intensity={0.3} color="#f0d0c0" />
          <group rotation={[0.2, 0.8, 0]}>
            {cableRoutes.map(route => (
              <CableLine key={route.id} route={route} active={active === route.id}
                onHover={setHovered} onLeave={() => setHovered(null)} />
            ))}
            {landingNodes.map((n, i) => <LandingNode key={i} pos={n.pos} />)}
          </group>
          <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
        </Canvas>
      </div>
      {/* 图例 */}
      <div className="pointer-events-none absolute left-3 bottom-3 flex flex-wrap gap-1.5">
        {cableRoutes.map(r => (
          <span key={r.id} className="flex items-center gap-1 rounded-sm bg-surface/80 px-1.5 py-0.5 text-[9px] text-muted backdrop-blur-sm">
            <i className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: r.color }} />
            {r.label}
          </span>
        ))}
      </div>
      {/* Hover 信息卡 */}
      {info && (
        <div className="absolute right-3 top-3 rounded-card border border-border bg-surface/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm" style={{ maxWidth: 220 }}>
          <p className="text-xs font-semibold" style={{ color: info.color }}>{info.label}</p>
          <p className="mt-1 text-[11px] leading-4 text-muted">{info.description}</p>
        </div>
      )}
    </div>
  )
}
