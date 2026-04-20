import bioVideo from '../videos/Bio.mp4'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { sections } from '../data/content.js'
import { bioCopy } from '../data/bioData.js'
import BioDNAModel from '../components/BioDNAModel.jsx'
import BioRiskRadar from '../components/BioRiskRadar.jsx'
import GlobalBiosurveillanceMap from '../components/GlobalBiosurveillanceMap.jsx'
import BioLinkGame from '../components/games/BioLinkGame.jsx'
gsap.registerPlugin(ScrollTrigger)

export default function BioPage() {
  const section = sections.find((item) => item.id === 'bio')
  const focusRef = useRef(null)
  const [selectedMarker, setSelectedMarker] = useState(null)

  useEffect(() => {
    const card = focusRef.current
    if (!card) return

    gsap.fromTo(
      card,
      { opacity: 0.7, y: 20 },
      {
        opacity: 1,
        y: 0,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      }
    )
  }, [])

  const markerInfo = selectedMarker
    ? bioCopy.dnaMarkers.find((marker) => marker.index === selectedMarker)
    : null

  return (
    <div className="min-h-screen bg-base text-ink">
      {/* 科普视频 */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-6">
        <video className="w-full rounded-2xl shadow-lg" controls>
          <source src={bioVideo} type="video/mp4" />
        </video>
      </div>
      
      <main className="relative mx-auto max-w-6xl space-y-16 px-6 py-14 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-label section-label-bio">生物安全专题</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
              {bioCopy.title}
            </h1>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-card border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-border-dark hover:text-ink"
          >
            ← 返回主页
          </Link>
        </div>

        <div className="h-px bg-border" />

        {/* Content layers */}
        <section className="card strip-bio p-6">
          <div className="space-y-5">
            {bioCopy.layers.map((layer, index) => (
              <motion.div
                key={layer.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-lg border border-border bg-bio-light/50 p-5"
              >
                <p className="text-xs font-medium uppercase tracking-wider text-bio">
                  {layer.title}
                </p>
                <p className="mt-2 text-sm leading-7 text-muted">{layer.content}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* DNA model + side panels */}
        <section className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] items-start">
          <div className="space-y-6">
            <div ref={focusRef} className="card strip-bio overflow-hidden p-5">
              <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label section-label-bio">显微镜聚焦</p>
                  <h2 className="mt-2 text-2xl font-semibold text-ink">
                    DNA 双螺旋风险可视化
                  </h2>
                </div>
                <p className="text-xs text-subtle">点击标记点查看风险说明</p>
              </div>

              <BioDNAModel onMarkerSelect={setSelectedMarker} />

              {markerInfo ? (
                <div className="mt-5 rounded-lg border border-bio/20 bg-bio-light p-4">
                  <p className="text-base font-semibold text-bio">{markerInfo.label}</p>
                  <p className="mt-2 text-sm leading-7 text-muted">
                    {markerInfo.description}
                  </p>
                </div>
              ) : (
                <div className="mt-5 rounded-lg border border-border bg-base p-4 text-sm text-subtle">
                  按需探索 DNA 风险节点，并观察高亮风险点的安全态势。
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="card overflow-hidden">
              <GlobalBiosurveillanceMap />
            </div>
            <div className="card p-5">
              <BioRiskRadar />
            </div>
          </div>
        </section>
        <section className="card strip-bio p-6">
  <p className="section-label section-label-bio mb-3">互动挑战</p>
  <h2 className="text-2xl font-semibold text-ink mb-4">🧬 基因配对连线</h2>
  <p className="text-sm text-muted mb-6">将左侧问题与右侧正确答案连线配对，完成基因序列拼接！</p>
  <BioLinkGame />
</section>
      </main>
    </div>
  )
}
