import deepseaVideo from '../videos/Deepsea.mp4'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useEffect, useRef, useState } from 'react'
import { sections } from '../data/content.js'
import { copywriting } from '../data/deepseaData.js'
import DepthMeter from '../components/DepthMeter.jsx'
import SubseaCableModel from '../components/SubseaCableModel.jsx'
import DeepseaDepthLadder from '../components/DeepseaDepthLadder.jsx'
import DeepseaThreatRadar from '../components/DeepseaThreatRadar.jsx'
import { SectionHeader } from '../components/PageCommon.jsx'
import { motion } from 'framer-motion'
import DeepseaDiveGame from '../components/games/DeepseaDiveGame.jsx'
gsap.registerPlugin(ScrollTrigger)

export default function DeepseaPage() {
  const section = sections.find((item) => item.id === 'deepsea')
  const [activeSection, setActiveSection] = useState(0)
  const [activeRoute, setActiveRoute] = useState(null)
  const sectionRefs = useRef([])

  useEffect(() => {
    const triggers = copywriting.triggers.map((_, index) => {
      return ScrollTrigger.create({
        trigger: sectionRefs.current[index],
        start: 'top 75%',
        end: 'top 55%',
        onEnter: () => setActiveSection(index),
        onEnterBack: () => setActiveSection(index),
      })
    })

    return () => {
      triggers.forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div className="min-h-screen bg-base text-ink">
      <DepthMeter />
       {/* 科普视频 */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-6">
        <video className="w-full rounded-2xl shadow-lg" controls>
          <source src={deepseaVideo} type="video/mp4" />
        </video>
      </div>

      <main className="relative mx-auto max-w-6xl space-y-16 px-6 py-14 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-label section-label-deepsea">深海域安全专题</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
              {copywriting.title}
            </h1>
            <p className="text-base leading-7 text-muted">{copywriting.intro}</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-card border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-border-dark hover:text-ink"
          >
            ← 返回主页
          </Link>
        </div>

        <div className="h-px bg-border" />

        {/* Main content */}
        <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-6">
            {/* Intro */}
            <div className="card strip-deepsea p-6">
              <SectionHeader {...section} />
              <p className="mt-4 text-sm leading-7 text-muted">
                随着深度增加，海洋从"可见蓝"变成"压抑黑"，每一层下潜都映射出新的战略与生态风险。
              </p>
            </div>

            {/* Cable model */}
            <div className="card overflow-hidden p-5">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="section-label section-label-deepsea">海底光缆 3D 线网</p>
                  <h2 className="mt-2 text-2xl font-semibold text-ink">深海电流脉冲</h2>
                </div>
                <p className="text-xs text-subtle">鼠标划过光缆，查看航线战略地位</p>
              </div>
              <SubseaCableModel activeRoute={activeRoute} onRouteSelect={setActiveRoute} />
            </div>
          </div>

          {/* Depth trigger cards */}
          <div className="space-y-5">
            {copywriting.triggers.map((item, index) => (
              <motion.article
                key={item.title}
                ref={(el) => (sectionRefs.current[index] = el)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className={`card p-6 transition-all duration-300 ${
                  activeSection === index
                    ? 'border-deepsea/40 shadow-card-hover'
                    : ''
                }`}
              >
                <div className="space-y-3">
                  <div className="depth-indicator">
                    <span className="dot" />
                    <span className="font-medium text-deepsea">{item.depth}m</span>
                    <span className="text-subtle">深度层级</span>
                  </div>
                  <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="text-sm leading-7 text-muted">{item.content}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Charts */}
        <section className="grid gap-6 xl:grid-cols-2">
          <DeepseaDepthLadder />
          <DeepseaThreatRadar />
        </section>
        <section className="card strip-deepsea p-6">
  <p className="section-label section-label-deepsea mb-3">互动挑战</p>
  <h2 className="text-2xl font-semibold text-ink mb-4">🌊 深海下潜挑战</h2>
  <p className="text-sm text-muted mb-6">驾驶潜艇探索深海，每答对一题下潜一层，看看你能到达多深！</p>
  <DeepseaDiveGame />
</section>
      </main>
    </div>
  )
}
