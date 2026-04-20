import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const debrisCount = 160
const orbitLayers = [
  { name: '低地轨道 LEO', mission: '遥感 · 通信 · 空间站', altitude: '200–2,000 km', color: 0x3c5488, radius: 2.8, risk: 9 },
  { name: '中地轨道 MEO', mission: '导航 · 通信中继', altitude: '2,000–20,000 km', color: 0xe64b35, radius: 3.4, risk: 7 },
  { name: '静止轨道 GEO', mission: '广播 · 气象 · 预警', altitude: '35,786 km', color: 0x8491b4, radius: 4.2, risk: 8 },
]

function rndSphere(r) {
  const u = Math.random(), v = Math.random(), t = 2 * Math.PI * u, p = Math.acos(2 * v - 1)
  return new THREE.Vector3(r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p))
}

export default function EarthScene() {
  const wrap = useRef(null), cvs = useRef(null), raf = useRef(null), hov = useRef(false)
  const [info, setInfo] = useState(null)

  useEffect(() => {
    const canvas = cvs.current; if (!canvas) return
    const scene = new THREE.Scene()
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    // ── 浅灰蓝底色，融入学术浅色页面 ──
    renderer.setClearColor(0xe8edf5, 1)

    const cam = new THREE.PerspectiveCamera(42, canvas.clientWidth / canvas.clientHeight, 0.4, 2000)
    cam.position.set(0, 0.9, 9)

    scene.add(new THREE.AmbientLight(0xffffff, 0.7))
    const pl = new THREE.PointLight(0x6a8ccc, 0.6, 45); pl.position.set(12, 10, 10); scene.add(pl)
    const pl2 = new THREE.PointLight(0xf0d0b0, 0.3, 30); pl2.position.set(-8, -5, 5); scene.add(pl2)

    // ── 地球：浅色学术风格 ──
    const earth = new THREE.Mesh(
      new THREE.SphereGeometry(2.3, 80, 80),
      new THREE.MeshStandardMaterial({
        color: 0x4a6a9a,       // 蓝灰色
        emissive: 0x2a4a7a,
        emissiveIntensity: 0.3,
        metalness: 0.1,
        roughness: 0.5,
      })
    )
    scene.add(earth)

    // ── 大气光晕 ──
    const atmo = new THREE.Mesh(
      new THREE.SphereGeometry(2.45, 64, 64),
      new THREE.MeshBasicMaterial({ color: 0x7aacdd, transparent: true, opacity: 0.08, side: THREE.BackSide })
    )
    scene.add(atmo)

    // ── 轨道环 ──
    const ringGrp = new THREE.Group()
    orbitLayers.forEach(l => {
      const ring = new THREE.Line(
        new THREE.RingGeometry(l.radius - 0.012, l.radius + 0.012, 256),
        new THREE.LineBasicMaterial({ color: l.color, transparent: true, opacity: 0.35 })
      )
      ring.rotation.x = Math.PI * 0.5
      ringGrp.add(ring)
    })
    scene.add(ringGrp)

    // ── 轨道标记点（每层多个）──
    const markers = new THREE.Group()
    orbitLayers.forEach(l => {
      const count = l.name.includes('LEO') ? 8 : l.name.includes('MEO') ? 5 : 4
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + Math.random() * 0.3
        const mk = new THREE.Mesh(
          new THREE.SphereGeometry(0.06, 12, 12),
          new THREE.MeshBasicMaterial({ color: l.color, transparent: true, opacity: 0.85 })
        )
        mk.position.set(Math.cos(angle) * l.radius, (Math.random() - 0.5) * 0.3, Math.sin(angle) * l.radius)
        mk.userData = { name: l.name, mission: l.mission, altitude: l.altitude, risk: l.risk }
        markers.add(mk)
      }
    })
    scene.add(markers)

    // ── 碎片云：用 NPG 配色 ──
    const debrisGrp = new THREE.Group()
    const debrisColors = [0xe64b35, 0xf39b7f, 0x3c5488, 0x8491b4]
    for (let i = 0; i < debrisCount; i++) {
      const p = new THREE.Mesh(
        new THREE.SphereGeometry(0.03 + Math.random() * 0.03, 8, 8),
        new THREE.MeshBasicMaterial({
          color: debrisColors[Math.floor(Math.random() * debrisColors.length)],
          transparent: true,
          opacity: 0.2 + Math.random() * 0.15,
        })
      )
      p.position.copy(rndSphere(2.6 + Math.random() * 1.8))
      p.scale.setScalar(0.6 + Math.random() * 0.8)
      debrisGrp.add(p)
    }
    scene.add(debrisGrp)

    // ── 背景微粒（代替深色星星）──
    const dotGeo = new THREE.BufferGeometry()
    const dotCount = 200, dv = new Float32Array(dotCount * 3)
    for (let i = 0; i < dotCount; i++) {
      const r = 14 + Math.random() * 20, t = Math.random() * Math.PI * 2, p = Math.acos(Math.random() * 2 - 1)
      dv[i * 3] = r * Math.sin(p) * Math.cos(t)
      dv[i * 3 + 1] = r * Math.sin(p) * Math.sin(t)
      dv[i * 3 + 2] = r * Math.cos(p)
    }
    dotGeo.setAttribute('position', new THREE.BufferAttribute(dv, 3))
    const dots = new THREE.Points(dotGeo, new THREE.PointsMaterial({ color: 0x8491b4, size: 0.04, transparent: true, opacity: 0.3 }))
    scene.add(dots)

    // ── Resize ──
    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas
      if (w && h) { renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix() }
    }
    window.addEventListener('resize', resize); resize()

    // ── Raycaster ──
    const ray = new THREE.Raycaster(), ptr = new THREE.Vector2(), wheelR = { value: 0 }

    const onMove = e => {
      const rect = canvas.getBoundingClientRect()
      ptr.x = ((e.clientX - rect.left) / rect.width) * 2 - 1
      ptr.y = -((e.clientY - rect.top) / rect.height) * 2 + 1
      ray.setFromCamera(ptr, cam)
      const hit = ray.intersectObjects(markers.children, false)[0]
      if (hit) {
        const d = hit.object.userData
        setInfo({ ...d, x: e.clientX - rect.left, y: e.clientY - rect.top })
        canvas.style.cursor = 'pointer'
      } else { setInfo(null); canvas.style.cursor = 'default' }
    }
    const onWheel = e => {
      e.preventDefault()
      const d = e.deltaY * 0.0006
      wheelR.value = Math.max(-0.6, Math.min(0.6, wheelR.value + d))
      gsap.to(earth.rotation, { x: earth.rotation.x + d * 0.6, y: earth.rotation.y + d * 0.3, duration: 0.3, ease: 'power2.out' })
      gsap.to(cam.position, { y: 0.9 + wheelR.value * 0.4, z: 9 - wheelR.value * 1.5, duration: 0.3, ease: 'power2.out' })
    }

    canvas.addEventListener('pointermove', onMove)
    canvas.addEventListener('pointerenter', () => { hov.current = true })
    canvas.addEventListener('pointerleave', () => { hov.current = false; setInfo(null) })
    canvas.addEventListener('wheel', onWheel, { passive: false })

    // ── Animate ──
    const animate = () => {
      earth.rotation.y += 0.0015
      ringGrp.rotation.y += 0.001
      debrisGrp.rotation.y += 0.0006
      debrisGrp.children.forEach((p, i) => p.position.applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.0008 + i * 0.000008))
      markers.rotation.y += 0.001
      dots.rotation.y -= 0.00008
      renderer.render(scene, cam)
      raf.current = requestAnimationFrame(animate)
    }
    animate()

    // ── ScrollTrigger ──
    ScrollTrigger.create({
      trigger: wrap.current, start: 'top center', end: 'bottom top', scrub: 0.6,
      onUpdate: self => {
        if (!hov.current) return
        const pr = Math.min(1, Math.max(0, self.progress * 1.2))
        cam.position.set(0, -0.5 * pr, 9 - 4 * pr); cam.lookAt(0, 0, 0)
        debrisGrp.children.forEach((p, i) => {
          const th = i / debrisCount, v = Math.min(1, Math.max(0, (pr - th * 0.7) * 2.2))
          p.material.opacity = 0.15 + v * 0.2; p.scale.setScalar(0.3 + 0.7 * v)
        })
        ringGrp.children.forEach((r, i) => { r.material.opacity = 0.25 + pr * 0.25 + i * 0.03 })
      },
    })

    return () => {
      cancelAnimationFrame(raf.current); window.removeEventListener('resize', resize)
      canvas.removeEventListener('pointermove', onMove); canvas.removeEventListener('wheel', onWheel)
      ScrollTrigger.getAll().forEach(t => t.kill()); renderer.dispose(); scene.clear()
    }
  }, [])

  return (
    <div ref={wrap} className="relative isolate h-[480px] w-full overflow-hidden rounded-card border border-border">
      <canvas ref={cvs} className="h-full w-full" aria-label="轨道碎片可视化" />
      {/* 顶部标签 */}
      <div className="pointer-events-none absolute inset-x-0 top-3 flex justify-between px-4 text-[10px] font-medium uppercase tracking-wider text-space-mid/60">
        <span>星域监测</span><span>轨道碰撞预警</span>
      </div>
      {/* 底部渐变融合 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-space-light to-transparent" />
      {/* Hover 信息卡 */}
      {info && (
        <div className="pointer-events-none absolute z-20 rounded-card border border-border bg-surface/95 px-3.5 py-2.5 shadow-card backdrop-blur-sm"
          style={{ left: info.x + 14, top: info.y + 10, minWidth: 160, maxWidth: 220 }}>
          <p className="text-[10px] font-medium uppercase tracking-wider text-space">{info.name}</p>
          <p className="mt-1 text-xs text-ink">{info.mission}</p>
          <p className="mt-1 text-xs text-muted">{info.altitude}</p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="text-[10px] text-subtle">风险系数</span>
            <span className="text-sm font-semibold" style={{ color: info.risk >= 8 ? '#E64B35' : info.risk >= 6 ? '#F39B7F' : '#8491B4' }}>
              {info.risk}/10
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
