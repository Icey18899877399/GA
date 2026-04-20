import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

export default function SubmersibleModel() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  useEffect(() => {
    const element = document.querySelector('.deepsea-section')
    if (!element || !meshRef.current) return

    ScrollTrigger.create({
      trigger: element,
      start: 'top center',
      end: 'bottom center',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress
        meshRef.current.position.y = -progress * 10
      },
    })

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [])

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <cylinderGeometry args={[0.5, 1, 3, 8]} />
      <meshStandardMaterial color="#00F3FF" metalness={0.8} roughness={0.2} />
      <mesh position={[0, -1.5, 0]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial color="#FF4B2B" emissive="#FF4B2B" emissiveIntensity={0.2} />
      </mesh>
    </mesh>
  )
}