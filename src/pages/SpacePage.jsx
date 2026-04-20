import spaceVideo from '../videos/Space.mp4'
import { Link } from 'react-router-dom'
import { sections } from '../data/content.js'
import EarthScene from '../components/EarthScene.jsx'
import SpaceCharts from '../components/SpaceCharts.jsx'
import { SectionHeader } from '../components/PageCommon.jsx'
import { orbitLayerInfo } from '../data/spaceData.js'
import SpaceInterceptGame from '../components/games/SpaceInterceptGame.jsx'
const narrativeSteps = [
  {
    title: '拥挤的苍穹',
    label: '远景 · 轨道现状',
    body: '在距地面 200 至 36,000 公里的高度，数万颗卫星正构建起现代文明的神经系统。但这片有限的轨道资源，正变得前所未有的拥挤。',
  },
  {
    title: '凯斯勒现象',
    label: '中景 · 危机触发',
    body: '碎片碰撞碎片的链式反应。一旦临界点突破，产生的太空垃圾将封锁人类通往宇宙的门户，让轨道变成无法逾越的雷区。',
  },
  {
    title: '太空红线',
    label: '近景 · 未来治理',
    body: '太空不是法外之地。从碎片清理到轨道规则，维护太空主权与共有安全，是星际时代人类的共同责任。',
  },
]

/* Risk level color mapping */
function riskColor(risk) {
  if (risk >= 8) return '#DC0000'
  if (risk >= 6) return '#E64B35'
  if (risk >= 4) return '#F39B7F'
  return '#8491B4'
}

export default function SpacePage() {
  const section = sections.find((item) => item.id === 'space')

  return (
    <div className="min-h-screen bg-base text-ink">
      {/* 科普视频 */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-6">
        <video className="w-full rounded-2xl shadow-lg" controls>
          <source src={spaceVideo} type="video/mp4" />
        </video>
      </div>

      <main className="relative mx-auto max-w-6xl space-y-16 px-6 py-14 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-label section-label-space">太空安全 · 星际预警</p>
            <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">
              {section.title}
            </h1>
            <p className="text-base leading-7 text-muted">{section.description}</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-card border border-border bg-surface px-4 py-2.5 text-sm font-medium text-muted transition hover:border-border-dark hover:text-ink"
          >
            ← 返回主页
          </Link>
        </div>

        <div className="h-px bg-border" />

        {/* Main content: two columns */}
        <section className="grid gap-10 xl:grid-cols-[1.05fr_0.95fr] items-start">
          <div className="space-y-6">
            {/* Intro card */}
            <div className="card strip-space p-6">
              <SectionHeader {...section} />
              <p className="mt-4 text-sm leading-7 text-muted">
                伴随滚动,3D 地球从宏观星域逐步缩放，碎片云与轨道风险层层涌现，形成星际史诗与警示科技兼具的卷轴叙事。
              </p>
            </div>

            {/* Narrative steps */}
            <div className="space-y-4">
              {narrativeSteps.map((item, index) => (
                <div
                  key={item.title}
                  className="card p-5 transition hover:shadow-card-hover"
                >
                  <p className="text-xs font-medium uppercase tracking-wider text-space-mid">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 3D Earth */}
          <div className="card overflow-hidden" style={{ minHeight: '420px' }}>
            <EarthScene />
          </div>
        </section>

        {/* Charts */}
        <section className="space-y-6">
          <SpaceCharts />
        </section>

        {/* Orbit layer cards */}
        <section className="grid gap-5 sm:grid-cols-3">
          {orbitLayerInfo.map((layer) => (
            <div key={layer.name} className="card strip-space p-5">
              <div className="flex items-center gap-2 text-sm font-medium text-space">
                <span
                  className="inline-flex h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: layer.color }}
                />
                <span>{layer.name}</span>
              </div>
              <h3 className="mt-3 text-2xl font-semibold text-ink">{layer.altitude}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{layer.mission}</p>
              <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
                <p className="text-xs font-medium uppercase tracking-wider text-subtle">
                  风险系数
                </p>
                <p
                  className="stat-number"
                  style={{ color: riskColor(layer.risk) }}
                >
                  {layer.risk}<span className="text-lg text-subtle">/10</span>
                </p>
              </div>
            </div>
          ))}
        </section>
        <section className="card strip-space p-6">
  <p className="section-label section-label-space mb-3">互动挑战</p>
  <h2 className="text-2xl font-semibold text-ink mb-4">🚀 轨道碎片拦截</h2>
  <p className="text-sm text-muted mb-6">碎片正在逼近！快速选择正确答案击碎它们，保护空间站安全。</p>
  <SpaceInterceptGame />
</section>
      </main>
    </div>
  )
}