import { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { bioCopy } from '../data/bioData.js'

function DNAHelix({ onSelect }) {
  const group = useRef()
  const [hovered, setHovered] = useState(null)

  const basePairs = useMemo(() => {
    return Array.from({ length: 24 }, (_, index) => {
      const t = (index / 24) * Math.PI * 4
      const radius = 1.2
      return { index, x: Math.cos(t) * radius, y: (index - 12) * 0.25, z: Math.sin(t) * radius, phase: t }
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
        const highlight = bioCopy.dnaMarkers.some((m) => m.index === pair.index)
        return (
          <group key={pair.index} position={[pair.x, pair.y, pair.z]}>
            <mesh>
              <sphereGeometry args={[0.16, 16, 16]} />
              <meshStandardMaterial
                color={highlight ? '#E64B35' : '#F39B7F'}
                emissive={highlight ? '#E64B35' : '#e8c4b8'}
                emissiveIntensity={highlight ? 0.5 : 0.1}
              />
            </mesh>
            {highlight && (
              <mesh position={[0, 0, 0.42]}>
                <sphereGeometry args={[0.2, 16, 16]} />
                <meshStandardMaterial color="#E64B35" emissive="#E64B35" emissiveIntensity={0.3} transparent opacity={0.5} />
              </mesh>
            )}
            <mesh
              position={[0, 0, 0.25]}
              onClick={() => onSelect(pair.index)}
              onPointerOver={() => setHovered(pair.index)}
              onPointerOut={() => setHovered(null)}
            >
              <sphereGeometry args={[0.28, 18, 18]} />
              <meshStandardMaterial
                color={hovered === pair.index ? '#E64B35' : 'transparent'}
                transparent opacity={hovered === pair.index ? 0.12 : 0}
              />
            </mesh>
          </group>
        )
      })}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 6.2, 32]} />
        <meshStandardMaterial color="#d4c4be" opacity={0.6} transparent />
      </mesh>
    </group>
  )
}

export default function BioDNAModel({ onMarkerSelect }) {
  return (
    <div className="relative h-[480px] w-full overflow-hidden rounded-card border border-border bg-bio-light/40">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <pointLight position={[6, 6, 6]} intensity={0.8} color="#f5d5cc" />
        <pointLight position={[-6, -6, -3]} intensity={0.4} color="#E64B35" />
        <DNAHelix onSelect={onMarkerSelect} />
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,_rgba(230,75,53,0.04),transparent_45%)]" />
    </div>
  )
}
