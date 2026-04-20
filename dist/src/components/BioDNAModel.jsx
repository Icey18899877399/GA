import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { bioCopy } from '../data/bioData.js'

function DNAHelix({ onSelect }) {
  const group = useRef()
  const [hovered, setHovered] = useState(null)

  const basePairs = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      const t = index / 24 * Math.PI * 4
      const radius = 1.2
      const x = Math.cos(t) * radius
      const z = Math.sin(t) * radius
      const y = (index - 12) * 0.25
      return { index, x, y, z, phase: t }
    })
  }, [])

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y += 0.002
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.15) * 0.08
    }
  })

  return (
    <group ref={group}>
      {basePairs.map((pair) => {
        const highlight = bioCopy.dnaMarkers.some((marker) => marker.index === pair.index)
        return (
          <group key={pair.index} position={[pair.x, pair.y, pair.z]}>
            <mesh>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial color={highlight ? '#00FF41' : '#64FFA8'} emissive={highlight ? '#00FF41' : '#11332a'} emissiveIntensity={highlight ? 0.8 : 0.2} />
            </mesh>
            {highlight && (
              <mesh position={[0, 0, 0.42]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#FFAB00" emissive="#FFAB00" emissiveIntensity={0.4} transparent opacity={0.6} />
              </mesh>
            )}
            <mesh
              position={[0, 0, 0.25]}
              onClick={() => onSelect(pair.index)}
              onPointerOver={() => setHovered(pair.index)}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.28, 18, 18]} />
              <meshStandardMaterial color={hovered === pair.index ? '#00FF41' : 'transparent'} transparent opacity={hovered === pair.index ? 0.15 : 0} />
            </mesh>
          </group>
        )
      })}
      <mesh position={[0, 0, 0]}> 
        <cylinderGeometry args={[0.08, 0.08, 6.2, 32]} />
        <meshStandardMaterial color="#002b24" opacity={0.8} transparent />
      </mesh>
    </group>
  )
}

export default function BioDNAModel({ onMarkerSelect }) {
  return (
    <div className="relative h-[520px] w-full overflow-hidden rounded-[36px] border border-cyan-200/10 bg-[#01110d]/90 shadow-[0_0_80px_rgba(0,255,65,0.16)]">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.45} />
        <pointLight position={[6, 6, 6]} intensity={1} color="#8affc9" />
        <pointLight position={[-6, -6, -3]} intensity={0.5} color="#ffab00" />
        <DNAHelix onSelect={onMarkerSelect} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(0,255,65,0.12),transparent_35%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#001a15] to-transparent" />
    </div>
  )
}
