import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'

const threatMetrics = [
  { name: '光缆监听风险', value: 88 },
  { name: '非法资源开采', value: 76 },
  { name: '通道封锁能力', value: 82 },
  { name: '海洋环境破坏', value: 70 },
]

export default function DeepseaThreatRadar() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = echarts.init(chartRef.current)
    const option = {
      backgroundColor: 'transparent',
      tooltip: { trigger: 'item' },
      radar: {
        radius: '72%',
        center: ['50%', '52%'],
        splitNumber: 4,
        axisLine: { lineStyle: { color: 'rgba(0,243,255,0.15)' } },
        splitLine: { lineStyle: { color: 'rgba(0,243,255,0.1)' } },
        splitArea: { areaStyle: { color: ['transparent'] } },
        indicator: threatMetrics.map((item) => ({ name: item.name, max: 100, color: '#B4F6FF' })),
      },
      series: [
        {
          name: '安全威胁',
          type: 'radar',
          lineStyle: { color: '#00F3FF', width: 3 },
          areaStyle: { color: 'rgba(0,243,255,0.18)' },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#FF3E3E' },
          data: [{ value: threatMetrics.map((item) => item.value), name: '当前权重' }],
        },
      ],
    }
    chart.setOption(option)
    window.addEventListener('resize', chart.resize)
    return () => {
      window.removeEventListener('resize', chart.resize)
      chart.dispose()
    }
  }, [])

  return (
    <div className="rounded-[32px] border border-[#0d4055] bg-[#001525]/85 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 text-sm text-slate-300">
        <p className="uppercase tracking-[0.26em] text-[#7ce0ff]">安全威胁雷达</p>
        <p className="mt-2 text-white text-lg font-semibold">四维深海态势评估</p>
      </div>
      <div ref={chartRef} className="h-[360px] w-full" />
    </div>
  )
}
