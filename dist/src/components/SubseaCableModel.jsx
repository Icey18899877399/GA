import { useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const cableRoutes = [
  {
    id: 'atlantic',
    label: '跨大西洋干线',
    description: '核心跨洋通道，承载全球金融与通信主干流。',
    color: '#00F3FF',
    points: [[-4, 1, 0], [-2, 0.5, 1.5], [0, 0.1, 0.5], [2, -0.5, 1.8], [4, -1, 0]],
  },
  {
    id: 'pacific',
    label: '跨太平洋链路',
    description: '连接亚太与北美的重要战略航线。',
    color: '#56E4FF',
    points: [[-4, -1.2, 0], [-2.4, -0.5, -1.5], [0, -0.2, -0.7], [2.4, 0.4, -1.7], [4, 1.2, 0]],
  },
]

function CableLine({ route, onHover, onLeave, active }) {
  const curve = useMemo(() => {
    const pts = route.points.map((p) => new THREE.Vector3(...p))
    return new THREE.CatmullRomCurve3(pts)
  }, [route.points])

  const tubeRef = useState(() => new THREE.TubeGeometry(curve, 80, active ? 0.08 : 0.05, 20, false))[0]

  useFrame(({ clock }) => {
    if (tubeRef) {
      const offset = (clock.elapsedTime * 0.4) % 1
      tubeRef.attributes.uv.array.forEach((v, idx) => {
        if (idx % 2 === 0) tubeRef.attributes.uv.array[idx] = v + offset * 0.02
      })
      tubeRef.attributes.uv.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh
        geometry={tubeRef}
        onPointerOver={() => onHover(route.id)}
        onPointerOut={onLeave}
      >
        <meshStandardMaterial
          color={route.color}
          emissive={route.color}
          emissiveIntensity={active ? 1 : 0.6}
          transparent
          opacity={active ? 1 : 0.72}
        />
      </mesh>
    </group>
  )
}

export default function SubseaCableModel({ onRouteSelect, activeRoute }) {
  const [hoveredRoute, setHoveredRoute] = useState(null)

  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[36px] border border-cyan-200/10 bg-[#00101b]/90 shadow-[0_0_90px_rgba(0,243,255,0.16)]">
      <Canvas camera={{ position: [0, 0, 12], fov: 38 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} color="#60f2ff" />
        <pointLight position={[-5, -5, -2]} intensity={0.45} color="#ff4b4b" />
        <group rotation={[0.2, 0.8, 0]}> 
          {cableRoutes.map((route) => (
            <CableLine
              key={route.id}
              route={route}
              active={activeRoute === route.id || hoveredRoute === route.id}
              onHover={setHoveredRoute}
              onLeave={() => setHoveredRoute(null)}
            />
          ))}
        </group>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,243,255,0.14),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#00050A] to-transparent" />
      {(activeRoute || hoveredRoute) && (
        <div className="absolute left-5 top-5 rounded-3xl border border-cyan-300/20 bg-[#00121b]/95 px-4 py-3 text-sm text-cyan-100 shadow-[0_0_30px_rgba(0,255,195,0.15)]">
          <p className="font-semibold text-[#00F3FF]">{cableRoutes.find((item) => item.id === (hoveredRoute || activeRoute))?.label}</p>
          <p className="mt-2 text-xs text-slate-300">{cableRoutes.find((item) => item.id === (hoveredRoute || activeRoute))?.description}</p>
        </div>
      )}
    </div>
  )
}
