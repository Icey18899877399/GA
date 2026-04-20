import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const debrisCount = 128
const orbitLayers = [
  { name: '低地轨道', mission: '遥感 · 通信 · 空间站', altitude: '800 km', color: 0x00f3ff, radius: 2.8 },
  { name: '中地轨道', mission: '导航中继 · 科研卫星', altitude: '8,000 km', color: 0xff4b2b, radius: 3.4 },
  { name: '静止轨道', mission: '广播 · 气象 · 监视', altitude: '35,786 km', color: 0x7f56ff, radius: 4.2 },
]

function randomPointOnSphere(radius) {
  const u = Math.random()
  const v = Math.random()
  const theta = 2 * Math.PI * u
  const phi = Math.acos(2 * v - 1)
  return new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.sin(phi) * Math.sin(theta),
    radius * Math.cos(phi)
  )
}

export default function EarthScene() {
  const wrapperRef = useRef(null)
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const hoverActive = useRef(false)
  const [hoverInfo, setHoverInfo] = useState(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setClearColor(0x000205, 1)

    const camera = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.4, 2000)
    camera.position.set(0, 0.9, 9)

    const ambient = new THREE.AmbientLight(0xffffff, 0.45)
    scene.add(ambient)
    const pointLight = new THREE.PointLight(0x00f3ff, 1.1, 45)
    pointLight.position.set(15, 12, 10)
    scene.add(pointLight)

    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2.3, 80, 80),
      new THREE.MeshStandardMaterial({
        color: 0x021122,
        emissive: 0x001f34,
        emissiveIntensity: 0.85,
        metalness: 0.15,
        roughness: 0.42,
      })
    )
    scene.add(earth)

    const ringGroup = new THREE.Group()
    orbitLayers.forEach((layer) => {
      const ring = new THREE.Line(
        new THREE.RingGeometry(layer.radius - 0.015, layer.radius + 0.015, 256),
        new THREE.LineBasicMaterial({ color: layer.color, transparent: true, opacity: 0.18 })
      )
      ring.rotation.x = Math.PI * 0.5
      ringGroup.add(ring)
    })
    scene.add(ringGroup)

    const orbitPointsGroup = new THREE.Group()
    orbitLayers.forEach((layer) => {
      const marker = new THREE.Mesh(
        new THREE.SphereGeometry(0.08, 12, 12),
        new THREE.MeshBasicMaterial({ color: layer.color, transparent: true, opacity: 0.9 })
      )
      marker.position.copy(randomPointOnSphere(layer.radius))
      marker.userData = {
        name: layer.name,
        mission: layer.mission,
        altitude: layer.altitude,
        risk: layer.name === '静止轨道' ? 8 : layer.name === '低地轨道' ? 9 : 7,
      }
      orbitPointsGroup.add(marker)
    })
    scene.add(orbitPointsGroup)

    const debrisGroup = new THREE.Group()
    for (let i = 0; i < debrisCount; i++) {
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.04, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xff6b4d, transparent: true, opacity: 0.12 })
      )
      particle.position.copy(randomPointOnSphere(3.15 + Math.random() * 0.35))
      particle.scale.setScalar(0.8 + Math.random() * 0.8)
      debrisGroup.add(particle)
    }
    scene.add(debrisGroup)

    const starGeometry = new THREE.BufferGeometry()
    const starCount = 550
    const starVertices = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 22 + Math.random() * 32
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(Math.random() * 2 - 1)
      starVertices[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      starVertices[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      starVertices[i * 3 + 2] = r * Math.cos(phi)
    }
    starGeometry.setAttribute('position', new THREE.BufferAttribute(starVertices, 3))
    const stars = new THREE.Points(
      starGeometry,
      new THREE.PointsMaterial({ color: 0xffffff, size: 0.07, transparent: true, opacity: 0.65 })
    )
    scene.add(stars)

    const resize = () => {
      const { clientWidth, clientHeight } = canvas
      if (clientWidth && clientHeight) {
        renderer.setSize(clientWidth, clientHeight, false)
        camera.aspect = clientWidth / clientHeight
        camera.updateProjectionMatrix()
      }
    }

    window.addEventListener('resize', resize)
    resize()

    const raycaster = new THREE.Raycaster()
    const pointer = new THREE.Vector2()
    const wheelRotation = { value: 0 }

    const onPointerMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1
      raycaster.setFromCamera(pointer, camera)
      const intersect = raycaster.intersectObjects(orbitPointsGroup.children, false)[0]
      if (intersect) {
        const { name, mission, altitude, risk } = intersect.object.userData
        setHoverInfo({ name, mission, altitude, risk, x: event.clientX - rect.left, y: event.clientY - rect.top })
        canvas.style.cursor = 'pointer'
      } else {
        setHoverInfo(null)
        canvas.style.cursor = 'default'
      }
    }

    const onPointerEnter = () => {
      hoverActive.current = true
    }

    const onPointerLeave = () => {
      hoverActive.current = false
      setHoverInfo(null)
    }

    const onWheel = (event) => {
      event.preventDefault()
      event.stopPropagation()
      const delta = event.deltaY * 0.0008
      wheelRotation.value = Math.max(-0.8, Math.min(0.8, wheelRotation.value + delta))
      gsap.to(earth.rotation, {
        x: earth.rotation.x + delta * 0.75,
        y: earth.rotation.y + delta * 0.4,
        duration: 0.35,
        ease: 'power2.out',
      })
      gsap.to(camera.position, {
        y: 0.9 + wheelRotation.value * 0.5,
        z: 9 - wheelRotation.value * 1.8,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    canvas.addEventListener('pointermove', onPointerMove)
    canvas.addEventListener('pointerenter', onPointerEnter)
    canvas.addEventListener('pointerleave', onPointerLeave)
    canvas.addEventListener('wheel', onWheel, { passive: false })

    const animate = () => {
      earth.rotation.y += 0.002
      ringGroup.rotation.y += 0.0012
      debrisGroup.rotation.y += 0.0008
      debrisGroup.children.forEach((particle, index) => {
        particle.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.001 + index * 0.00001)
      })
      stars.rotation.y -= 0.0001
      renderer.render(scene, camera)
      animationRef.current = requestAnimationFrame(animate)
    }
    animate()

    ScrollTrigger.create({
      trigger: wrapperRef.current,
      start: 'top center',
      end: 'bottom top',
      scrub: 0.6,
      onUpdate: (self) => {
        if (!hoverActive.current) return
        const progress = Math.min(1, Math.max(0, self.progress * 1.2))
        camera.position.set(0, -0.7 * progress, 9 - 5 * progress)
        camera.lookAt(0, 0, 0)

        debrisGroup.children.forEach((particle, index) => {
          const threshold = index / debrisCount
          const visibility = Math.min(1, Math.max(0, (progress - threshold * 0.7) * 2.2))
          particle.material.opacity = visibility
          particle.scale.setScalar(0.15 + 0.85 * visibility)
        })

        ringGroup.children.forEach((ring, idx) => {
          ring.material.opacity = 0.14 + progress * 0.3 + idx * 0.04
        })
        earth.material.emissiveIntensity = 0.85 + progress * 0.35
      },
    })

    return () => {
      cancelAnimationFrame(animationRef.current)
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onPointerMove)
      canvas.removeEventListener('pointerenter', onPointerEnter)
      canvas.removeEventListener('pointerleave', onPointerLeave)
      canvas.removeEventListener('wheel', onWheel)
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      renderer.dispose()
      scene.clear()
    }
  }, [])

  return (
    <div ref={wrapperRef} className="relative isolate h-[520px] w-full overflow-hidden rounded-[32px] border border-[#00F3FF33] bg-[#000205]/70 shadow-[0_0_80px_rgba(0,243,255,0.15)]">
      <canvas ref={canvasRef} className="h-full w-full" aria-label="星际轨道场景" />
      <div className="pointer-events-none absolute inset-x-0 top-6 flex justify-between px-6 text-xs uppercase tracking-[0.32em] text-[#A6F5FF]/70">
        <span>星域监测</span>
        <span>轨道碰撞预警</span>
      </div>
      {hoverInfo ? (
        <div
          className="pointer-events-none absolute z-20 rounded-3xl border border-[#00F3FF66] bg-[#00101e]/90 px-4 py-3 text-sm text-white shadow-glow"
          style={{ left: hoverInfo.x + 18, top: hoverInfo.y + 12, minWidth: 180 }}
        >
          <p className="text-xs uppercase tracking-[0.28em] text-[#7ce0ff]">{hoverInfo.name}</p>
          <p className="mt-2 text-sm">{hoverInfo.mission}</p>
          <p className="mt-2 text-xs text-[#ff7d63]">风险系数：{hoverInfo.risk}/10</p>
        </div>
      ) : null}
    </div>
  )
}
