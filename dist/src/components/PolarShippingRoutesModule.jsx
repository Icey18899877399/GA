import { useEffect, useMemo, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

const routeData = [
  {
    id: 'nsr',
    title: 'NSR',
    subtitle: 'Northeast Passage',
    description: '沿俄罗斯北冰洋沿岸，东亚与欧洲航程近 40% 缩短。是未来大动脉，也是主权争端前沿。',
    color: '#00CCFF',
    points: [
      [90, 40],
      [70, 60],
      [50, 30],
      [20, 20],
    ],
    metrics: '上海 → 鹿特丹 via NSR: ~14 天 | via Suez: ~24 天',
  },
  {
    id: 'nwp',
    title: 'NWP',
    subtitle: 'Northwest Passage',
    description: '穿越加拿大北极群岛，连接北美东海岸与欧洲，带来主权与生态严峻考验。',
    color: '#00FFC3',
    points: [
      [100, 58],
      [80, 60],
      [60, 40],
      [30, 20],
    ],
    metrics: '西雅图 → 鹿特丹 via NWP: ~16 天 | via Panama: ~22 天',
  },
  {
    id: 'tsr',
    title: 'TSR',
    subtitle: 'Transpolar Sea Route',
    description: '未来中央航道，横穿北极圈核心海域。尚在构想阶段，代表潜在战略新通道。',
    color: '#FF4B2B',
    points: [
      [95, 45],
      [80, 35],
      [55, 18],
      [35, 10],
    ],
    metrics: '未来中心航线，适合极端冰况与高风险航行。',
  },
]

const iceCoverageData = [
  { year: 1979, coverage: 100 },
  { year: 2026, coverage: 42 },
]

function polarToCartesian(radius, angleDeg, offset = 0) {
  const theta = ((angleDeg - 90) * Math.PI) / 180
  return new THREE.Vector3(radius * Math.cos(theta) + offset, radius * Math.sin(theta), 0)
}

function RouteLine({ points, color, progress }) {
  const meshRef = useRef(null)
  const curve = useMemo(() => {
    const pts = points.map((pt) => polarToCartesian(3.5, pt[0], 0))
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.4)
  }, [points])

  const geometry = useMemo(() => {
    const positions = curve.getPoints(80)
    const buffer = new Float32Array(positions.length * 3)
    positions.forEach((pos, idx) => {
      buffer[idx * 3] = pos.x
      buffer[idx * 3 + 1] = pos.y
      buffer[idx * 3 + 2] = pos.z
    })
    const geom = new THREE.BufferGeometry()
    geom.setAttribute('position', new THREE.BufferAttribute(buffer, 3))
    return geom
  }, [curve])

  useFrame(() => {
    if (!meshRef.current) return
    meshRef.current.material.dashOffset -= 0.002
  })

  return (
    <line ref={meshRef} geometry={geometry}>
      <lineDashedMaterial
        attach="material"
        color={color}
        linewidth={2}
        scale={1}
        dashSize={0.15}
        gapSize={0.12}
        transparent
        opacity={progress}
      />
    </line>
  )
}

function PolarRouteScene({ stage }) {
  const groupRef = useRef(null)
  const { camera } = useThree()

  useEffect(() => {
    const target = {
      nsr: { position: [1.8, 1.8, 7], lookAt: [0, 0, 0] },
      nwp: { position: [-1.4, 1.6, 7], lookAt: [0, 0.2, 0] },
      tsr: { position: [0.2, 2.5, 7], lookAt: [0, 0.4, 0] },
    }
    const current = target[stage] || target.nsr
    gsap.to(camera.position, {
      x: current.position[0],
      y: current.position[1],
      z: current.position[2],
      duration: 1.2,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(...current.lookAt),
    })
  }, [camera, stage])

  return (
    <group ref={groupRef}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[3.4, 3.8, 128]} />
        <meshBasicMaterial color="#0e151f" transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.2, 128]} />
        <meshBasicMaterial color="#04101c" transparent opacity={0.95} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[3.05, 128]} />
        <meshBasicMaterial color="#0f2538" transparent opacity={0.55} />
      </mesh>
      {routeData.map((route) => (
        <RouteLine
          key={route.id}
          points={route.points}
          color={route.color}
          progress={stage === route.id || (stage === 'tsr' && route.id === 'tsr') ? 1 : 0.18}
        />
      ))}
      <mesh position={[0, 0, 0.01]}>
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial color="#00FFC3" emissive="#00FFC3" emissiveIntensity={0.7} transparent opacity={0.95} />
      </mesh>
      <mesh position={polarToCartesian(3.5, 135)}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00CCFF" emissive="#00CCFF" emissiveIntensity={0.5} transparent opacity={0.88} />
      </mesh>
      <mesh position={polarToCartesian(3.5, 270)}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#00FFC3" emissive="#00FFC3" emissiveIntensity={0.5} transparent opacity={0.88} />
      </mesh>
    </group>
  )
}

function PolarIceCoverageHeatmap({ currentYear }) {
  const canvasRef = useRef(null)
  const yearRef = useRef(currentYear)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1
    const resize = () => {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw(yearRef.current)
    }
    const draw = (year) => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      ctx.clearRect(0, 0, width, height)
      const coverage = year === 1979 ? 100 : 42
      const gradient = ctx.createLinearGradient(0, 0, width, 0)
      gradient.addColorStop(0, '#002031')
      gradient.addColorStop(0.5, '#004d7a')
      gradient.addColorStop(1, '#0084c7')
      ctx.fillStyle = '#03121d'
      ctx.fillRect(0, 0, width, height)
      ctx.fillStyle = gradient
      ctx.fillRect(0, height * 0.3, width * (coverage / 100), height * 0.4)
      ctx.fillStyle = 'rgba(0, 204, 255, 0.18)'
      ctx.fillRect(width * (coverage / 100), height * 0.3, width * ((100 - coverage) / 100), height * 0.4)
      ctx.fillStyle = '#A8F0FF'
      ctx.font = '600 20px Inter'
      ctx.fillText(`${year} Arctic Ice Cover`, 18, 32)
      ctx.font = '500 14px Inter'
      ctx.fillText(`Coverage: ${coverage}%`, 18, 56)
      ctx.fillStyle = 'rgba(0, 255, 195, 0.15)'
      for (let i = 0; i < 10; i += 1) {
        ctx.fillRect(width * 0.08 + i * (width * 0.082), height * 0.22 + Math.sin(i * 1.2) * 4, 4, 8)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useEffect(() => {
    yearRef.current = currentYear
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const width = canvas.clientWidth
    const height = canvas.clientHeight
    const coverage = currentYear === 1979 ? 100 : 42
    ctx.clearRect(0, 0, width, height)
    const gradient = ctx.createLinearGradient(0, 0, width, 0)
    gradient.addColorStop(0, '#002031')
    gradient.addColorStop(0.5, '#004d7a')
    gradient.addColorStop(1, '#0084c7')
    ctx.fillStyle = '#03121d'
    ctx.fillRect(0, 0, width, height)
    ctx.fillStyle = gradient
    ctx.fillRect(0, height * 0.3, width * (coverage / 100), height * 0.4)
    ctx.fillStyle = 'rgba(0, 204, 255, 0.18)'
    ctx.fillRect(width * (coverage / 100), height * 0.3, width * ((100 - coverage) / 100), height * 0.4)
    ctx.fillStyle = '#A8F0FF'
    ctx.font = '600 20px Inter'
    ctx.fillText(`${currentYear} Arctic Ice Cover`, 18, 32)
    ctx.font = '500 14px Inter'
    ctx.fillText(`Coverage: ${coverage}%`, 18, 56)
    ctx.fillStyle = 'rgba(0, 255, 195, 0.15)'
    for (let i = 0; i < 10; i += 1) {
      ctx.fillRect(width * 0.08 + i * (width * 0.082), height * 0.22 + Math.sin(i * 1.2) * 4, 4, 8)
    }
  }, [currentYear])

  return <canvas ref={canvasRef} className="h-64 w-full rounded-[28px] border border-[#00CCFF30] bg-[#031b27]/70 shadow-[0_0_60px_rgba(0,204,255,0.12)]" />
}

export default function PolarShippingRoutesModule() {
  const sectionRef = useRef(null)
  const [stage, setStage] = useState('nsr')
  const [heatYear, setHeatYear] = useState(1979)

  useEffect(() => {
    const sections = sectionRef.current?.querySelectorAll('[data-route]')
    if (!sections) return

    sections.forEach((section) => {
      const id = section.getAttribute('data-route')
      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setStage(id)
          if (id === 'nsr') setHeatYear(1979)
          if (id === 'nwp') setHeatYear(2026)
          if (id === 'tsr') setHeatYear(2026)
        },
        onEnterBack: () => {
          setStage(id)
          if (id === 'nsr') setHeatYear(1979)
          if (id === 'nwp') setHeatYear(2026)
          if (id === 'tsr') setHeatYear(2026)
        },
      })
    })

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  }, [])

  return (
    <section className="relative overflow-hidden bg-[#04090f] px-6 py-16 lg:px-12" ref={sectionRef}>
      <div className="mx-auto max-w-7xl space-y-14">
        <div className="space-y-4 text-slate-200">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#00FFC330] bg-[#00FFC320] px-4 py-2 text-xs uppercase tracking-[0.35em] text-[#00FFC3]">Polar Shipping Routes</div>
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">冰上丝绸之路：北极航道的开启与地缘政治</h1>
          <p className="max-w-3xl text-lg leading-8 text-slate-300">
            气候变暖正在融化封存数千年的极地冰盖。这不仅是一场生态危机，更是在北冰洋重新划定全球贸易与地缘政治格局的新契机。
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:gap-14">
          <div className="space-y-8">
            {routeData.map((route) => (
              <article
                key={route.id}
                data-route={route.id}
                className="rounded-[32px] border border-[#00CCFF20] bg-[#06111d]/90 p-8 shadow-glow backdrop-blur-xl"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.36em] text-[#00FFC3]">{route.subtitle}</p>
                    <h2 className="mt-3 text-2xl font-semibold text-white">{route.title}</h2>
                  </div>
                  <span className="rounded-full bg-[#00CCFF14] px-3 py-1 text-xs uppercase tracking-[0.25em] text-[#00CCFF]">{route.id.toUpperCase()}</span>
                </div>
                <p className="mt-5 text-base leading-7 text-slate-300">{route.description}</p>
                <div className="mt-6 rounded-3xl border border-[#00FFC330] bg-[#0a1d28]/80 p-4 text-sm text-slate-200">
                  {route.metrics}
                </div>
              </article>
            ))}
          </div>

          <div className="space-y-8">
            <div className="relative overflow-hidden rounded-[36px] border border-[#00CCFF20] bg-[#02070f]/90 p-4 shadow-[0_0_90px_rgba(0,204,255,0.16)]">
              <div className="absolute inset-x-4 top-4 h-2 rounded-full bg-gradient-to-r from-[#00CCFF] via-[#00FFC3] to-[#7FFFE8] opacity-30" />
              <div className="relative h-[520px] w-full">
                <Canvas camera={{ position: [1.8, 1.8, 7], fov: 42 }}>
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 6, 5]} intensity={1.1} color="#98f7ff" />
                  <directionalLight position={[-4, -3, -2]} intensity={0.5} color="#00ffc3" />
                  <Suspense fallback={null}>
                    <PolarRouteScene stage={stage} />
                    <Environment preset="city" background={false} />
                  </Suspense>
                </Canvas>
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute left-5 top-8 rounded-full border border-[#00CCFF70] bg-[#00000030] px-4 py-2 text-xs uppercase tracking-[0.3em] text-[#00CCFF]">North Pole</div>
                  <div className="absolute right-6 top-16 rounded-2xl border border-[#00FFC370] bg-[#001626]/90 p-3 text-xs text-slate-200">
                    <div className="font-semibold text-white">Canadian Arctic Archipelago</div>
                  </div>
                  <div className="absolute left-6 bottom-16 rounded-full border border-[#00FFC330] bg-[#001526]/90 px-4 py-2 text-xs text-[#A5F7FF]">Murmansk</div>
                  <div className="absolute right-10 bottom-24 rounded-full border border-[#00FFC330] bg-[#001526]/90 px-4 py-2 text-xs text-[#A5F7FF]">Seattle</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-[32px] border border-[#00CCFF20] bg-[#06111d]/90 p-6 shadow-glow backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.36em] text-[#00FFC3]">Sea Ice Coverage</p>
                  <h3 className="text-2xl font-semibold text-white">冰盖变化热力图</h3>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-[#00CCFF30] bg-[#00CCFF10] px-3 py-2 text-xs uppercase tracking-[0.32em] text-[#00CCFF]">
                  {heatYear}
                </div>
              </div>
              <PolarIceCoverageHeatmap currentYear={heatYear} />
              <div className="rounded-3xl border border-[#00FFC330] bg-[#001622]/80 p-4 text-sm text-slate-200">
                1979 年与 2026 年对比，海冰覆盖率从峰值 100% 下跌至 42%，显现极地航道开放与生态压力双重叠加。
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
