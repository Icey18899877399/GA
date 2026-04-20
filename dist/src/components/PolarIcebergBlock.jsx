import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js'

gsap.registerPlugin(ScrollTrigger)

function createIceGeometry() {
  const geometry = new THREE.IcosahedronGeometry(2.2, 1)
  const noise = new ImprovedNoise()
  const position = geometry.attributes.position
  const normal = new THREE.Vector3()

  for (let i = 0; i < position.count; i += 1) {
    const x = position.getX(i)
    const y = position.getY(i)
    const z = position.getZ(i)
    normal.set(x, y, z).normalize()
    const n = noise.noise(x * 0.9, y * 0.9, z * 0.9)
    position.setXYZ(i, x + normal.x * n * 0.45, y + normal.y * n * 0.45, z + normal.z * n * 0.45)
  }

  geometry.computeVertexNormals()
  return geometry
}

function IcebergMesh({ containerRef }) {
  const meshRef = useRef(null)
  const materialRef = useRef(null)
  const iceGeometry = useMemo(() => createIceGeometry(), [])

  useEffect(() => {
    const material = materialRef.current
    if (!material) return

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uCracked = { value: 0 }
      material.userData.shader = shader

      shader.vertexShader = `varying vec3 vPos;\n${shader.vertexShader}`
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        'vec3 transformed = vec3(position);\n vPos = transformed;\n#include <begin_vertex>'
      )

      const noiseGLSL = `
        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                  + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                  + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.y;
          vec4 y = y_ * ns.x + ns.y;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x;
          p1 *= norm.y;
          p2 *= norm.z;
          p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }
      `

      shader.fragmentShader = `uniform float uCracked; varying vec3 vPos;\n${noiseGLSL}${shader.fragmentShader}`
      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        'float crack = smoothstep(0.25, 0.38, abs(sin(vPos.y * 12.0 + snoise(vPos * 2.2) * 5.4)) * uCracked);\n' +
          'vec3 crackColor = mix(vec3(0.8, 0.95, 1.0), vec3(1.0, 0.45, 0.35), crack);\n' +
          'gl_FragColor.rgb = mix(gl_FragColor.rgb, crackColor, crack * 0.55);\n' +
          '#include <dithering_fragment>'
      )
    }
  }, [])

  useEffect(() => {
    const material = materialRef.current
    if (!material) return
    const updateCrack = () => {
      const shader = material.userData.shader
      if (!shader) return
      gsap.to(shader.uniforms.uCracked, {
        value: 1,
        duration: 0.6,
        ease: 'power1.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 40%',
          scrub: 0.45,
        },
      })
    }
    updateCrack()
  }, [containerRef])

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0014
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.16) * 0.08
    }
  })

  return (
    <mesh ref={meshRef} geometry={iceGeometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        ref={materialRef}
        color="#D6F2FF"
        emissive="#9ce0ff"
        emissiveIntensity={0.35}
        transmission={0.7}
        roughness={0.12}
        ior={1.31}
        thickness={1.6}
        envMapIntensity={1.8}
        metalness={0}
        clearcoat={0.22}
        clearcoatRoughness={0.1}
        specularIntensity={0.85}
        transparent
        opacity={0.98}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default function PolarIcebergBlock() {
  const containerRef = useRef(null)

  return (
    <div ref={containerRef} className="relative h-[520px] overflow-hidden rounded-[32px] border border-cyan-300/20 bg-[#03101a]/95 shadow-glow backdrop-blur-xl">
      <Canvas className="h-full w-full" camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.4} />
        <hemisphereLight skyColor="#b8dfff" groundColor="#001a2c" intensity={0.4} />
        <directionalLight position={[4, 5, 6]} intensity={1.3} color="#c8f4ff" />
        <directionalLight position={[-4, -2, -3]} intensity={0.55} color="#5bd2ff" />
        <IcebergMesh containerRef={containerRef} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
          <ringGeometry args={[2.45, 2.75, 64]} />
          <meshStandardMaterial color="#00f3ff" transparent opacity={0.1} />
        </mesh>
        <Environment preset="sunset" background={false} />
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 top-6 flex items-center justify-between px-6 text-xs uppercase tracking-[0.32em] text-cyan-100/70">
        <span>冰川核心</span>
        <span>冰裂预警</span>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#000a12] to-transparent" />
    </div>
  )
}
