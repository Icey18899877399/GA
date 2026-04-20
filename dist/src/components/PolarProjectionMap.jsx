import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const routeData = [
  {
    id: 'nsr',
    title: 'NSR',
    color: '#00FFC3',
    points: [
      [12, 2.2],
      [45, 2.6],
      [78, 2.9],
      [120, 2.4],
    ],
    description: '沿俄罗斯北冰洋沿岸，东亚与欧洲航程近 40% 缩短。',
    metrics: '苏伊士运河 24 天 | NSR 14 天',
  },
  {
    id: 'nwp',
    title: 'NWP',
    color: '#00CCFF',
    points: [
      [160, 2.3],
      [135, 2.7],
      [110, 2.3],
      [80, 1.8],
    ],
    description: '穿越加拿大北极群岛，连接北美东海岸与欧洲。',
    metrics: '巴拿马运河 22 天 | NWP 16 天',
  },
  {
    id: 'tsr',
    title: 'TSR',
    color: '#E0E0E0',
    points: [
      [45, 2.4],
      [75, 2.85],
      [105, 2.85],
      [135, 2.2],
    ],
    description: '未来中央航道，横穿高纬度极圈核心海域。',
    metrics: '未来选项：高风险/高回报',
  },
]

const portNodes = [
  {
    id: 'murmansk',
    name: 'Murmansk',
    description: '俄罗斯北极港口，NSR 的关键补给节点。',
    position: [2.0, -0.5, 0.14],
    color: '#00FFC3',
  },
  {
    id: 'seattle',
    name: 'Seattle',
    description: '北美西海岸港口，NWP 的西端节点。',
    position: [-2.6, -0.9, 0.14],
    color: '#00CCFF',
  },
]

function polarToCartesian(angle, radius, z = 0) {
  const theta = ((angle - 90) * Math.PI) / 180
  return new THREE.Vector3(radius * Math.cos(theta), radius * Math.sin(theta), z)
}

function PolarGlobe() {
  const ref = useRef(null)

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.elapsedTime * 0.08
      ref.current.rotation.x = Math.sin(clock.elapsedTime * 0.14) * 0.1
    }
  })

  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <icosahedronGeometry args={[2.05, 5]} />
      <meshStandardMaterial color="#052236" metalness={0.4} roughness={0.25} emissive="#0f2f48" emissiveIntensity={0.7} />
    </mesh>
  )
}

function RouteCurve({ points, color }) {
  const lineRef = useRef(null)
  const curve = useMemo(() => {
    const pts = points.map(([angle, radius]) => polarToCartesian(angle, radius, 0.16))
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.4)
  }, [points])

  const positions = useMemo(() => curve.getPoints(80), [curve])

  useFrame(() => {
    if (lineRef.current) {
      lineRef.current.material.dashOffset -= 0.005
    }
  })

  return (
    <line ref={lineRef}>
      <bufferGeometry attach="geometry" setFromPoints={positions} />
      <lineDashedMaterial attach="material" color={color} dashSize={0.08} gapSize={0.08} linewidth={1.2} transparent opacity={0.9} />
    </line>
  )
}

function PortNode({ position, name, description, color, onHover }) {
  return (
    <mesh position={position} onPointerOver={() => onHover({ name, description, color })} onPointerOut={() => onHover(null)}>
      <sphereGeometry args={[0.08, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.4} transparent opacity={0.92} />
    </mesh>
  )
}

export default function PolarProjectionMap() {
  const [hoveredNode, setHoveredNode] = useState(null)

  return (
    <section className="relative overflow-hidden bg-[#04090f] px-6 py-16 lg:px-12">
      <div className="mx-auto max-w-7xl space-y-12">
        <div className="space-y-4 text-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00FFC330] bg-[#00FFC320] px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#00FFC3]">
            Polar Shipping Routes
          </div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">冰上丝绸之路：可视化北极航道</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            该模块展示极地航道的核心航线与港口节点，使用简单稳定的 3D 可视化呈现。
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] xl:gap-14">
          <div className="space-y-8">
            {routeData.map((route) => (
              <article key={route.id} className="rounded-[32px] border border-[#00CCFF20] bg-[#06111d]/90 p-8 shadow-glow backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.36em] text-[#00FFC3]">{route.title}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{route.title}</h2>
                  </div>
                  <span className="rounded-full bg-[#00CCFF14] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#00CCFF]">
                    {route.id.toUpperCase()}
                  </span>
                </div>
                <p className="mt-5 text-base leading-7 text-slate-300">{route.description}</p>
                <div className="mt-6 rounded-3xl border border-[#00FFC330] bg-[#0a1d28]/80 p-4 text-sm text-slate-200">{route.metrics}</div>
              </article>
            ))}
          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[36px] border border-[#00CCFF20] bg-[#02070f]/90 p-4 shadow-[0_0_90px_rgba(0,204,255,0.16)]">
              <div className="absolute inset-x-4 top-4 h-2 rounded-full bg-gradient-to-r from-[#00CCFF] via-[#00FFC3] to-[#7FFFE8] opacity-30" />
              <div className="relative h-[520px] w-full">
                <Canvas camera={{ position: [1.8, 1.8, 7], fov: 42 }}>
                  <ambientLight intensity={0.5} />
                  <directionalLight position={[3, 4, 3]} intensity={1.1} color="#9ce7ff" />
                  <directionalLight position={[-3, -2, -3]} intensity={0.6} color="#00ffc3" />
                  <PolarGlobe />
                  {routeData.map((route) => (
                    <RouteCurve key={route.id} points={route.points} color={route.color} />
                  ))}
                  {portNodes.map((node) => (
                    <PortNode key={node.id} {...node} onHover={setHoveredNode} />
                  ))}
                </Canvas>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-6 top-8 rounded-full border border-[#00CCFF70] bg-[#00000030] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#00CCFF]">North Pole</div>
                  <div className="absolute right-6 top-16 rounded-2xl border border-[#00FFC370] bg-[#001626]/90 p-3 text-xs text-slate-200">
                    Canadian Arctic Archipelago
                  </div>
                </div>
                {hoveredNode && (
                  <div className="pointer-events-none absolute right-6 bottom-6 z-20 max-w-xs rounded-3xl border border-white/10 bg-[#00101f]/95 p-4 text-sm text-slate-100 shadow-[0_0_100px_rgba(0,255,195,0.14)]">
                    <p className="text-[10px] uppercase tracking-[0.35em] text-[#00FFC3]">港口节点</p>
                    <p className="mt-3 text-lg font-semibold text-white">{hoveredNode.name}</p>
                    <p className="mt-2 leading-6 text-slate-300">{hoveredNode.description}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
