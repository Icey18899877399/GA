import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SubmersibleModel() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.2
  })

  useEffect(() => {
    const el = document.querySelector('.deepsea-section')
    if (!el || !meshRef.current) return
    ScrollTrigger.create({
      trigger: el, start: 'top center', end: 'bottom center', scrub: true,
      onUpdate: (self) => { meshRef.current.position.y = -self.progress * 10 },
    })
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.5, 1, 3, 8]} />
      <meshStandardMaterial color="#4DBBD5" metalness={0.7} roughness={0.25} />
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#E64B35" emissive="#E64B35" emissiveIntensity={0.15} />
      </mesh>
    </mesh>
  )
}
