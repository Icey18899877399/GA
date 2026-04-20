
import { Link } from 'react-router-dom'
import { sections } from '../data/content.js'
import { TypewriterText } from '../components/PageCommon.jsx'

const themeMap = {
  space: {
    strip: 'strip-space',
    label: 'section-label-space',
    color: '#3C5488',
  },
  deepsea: {
    strip: 'strip-deepsea',
    label: 'section-label-deepsea',
    color: '#4DBBD5',
  },
  polar: {
    strip: 'strip-polar',
    label: 'section-label-polar',
    color: '#00A087',
  },
  bio: {
    strip: 'strip-bio',
    label: 'section-label-bio',
    color: '#E64B35',
  },
}

export default function Home() {
  return (
    <div className="min-h-screen bg-base text-ink">
      <main className="relative mx-auto flex min-h-screen max-w-5xl flex-col justify-center gap-10 px-6 py-16 lg:px-8">
        {/* Hero area */}
        <section className="max-w-3xl space-y-5">
          <p className="text-xs font-medium uppercase tracking-wider text-muted">
            新型领域安全导航
          </p>
          <h1 className="font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            探索四大核心领域安全专题
          </h1>
          <p className="text-lg leading-8 text-muted">
            <TypewriterText text="从太空轨道碎片、深海资源通道、极地消融预警，到生物安全拓扑防护，四个独立专题页面带来深度科普与交互体验。" />
          </p>
          <div className="h-px w-20 bg-border-dark" />
        </section>

        {/* Navigation card grid */}
        <section className="grid gap-5 sm:grid-cols-2">
          {sections.map((section) => {
            const theme = themeMap[section.id] || themeMap.space
            return (
              <Link
                key={section.id}
                to={`/${section.id}`}
                className={`card ${theme.strip} p-6 text-left transition hover:-translate-y-0.5 hover:shadow-card-hover`}
              >
                <p className={`section-label ${theme.label} mb-3`}>
                  {section.id.toUpperCase()}
                </p>
                <h2 className="text-xl font-semibold text-ink">{section.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{section.subtitle}</p>
                <div
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: theme.color }}
                >
                  进入页面
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </Link>
            )
          })}
        </section>

        {/* Game entry */}
        <section className="text-center">
          <Link
            to="/game"
            className="card inline-flex items-center gap-3 px-6 py-4 transition hover:-translate-y-0.5 hover:shadow-card-hover"
          >
            <span className="text-2xl">🛸</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-ink">知识挑战小游戏</p>
              <p className="text-xs text-muted">驾驶飞船，收集正确知识，躲避错误知识</p>
            </div>
            <span className="text-sm text-muted">→</span>
          </Link>
        </section>

        {/* Footer note */}
        <p className="text-center text-xs text-subtle">
          配色参考 Nature Publishing Group (NPG) 学术色板
        </p>
      </main>
    </div>
  )
}
