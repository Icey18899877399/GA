import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { bioCopy } from '../data/bioData.js'

export default function BioRiskRadar() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = echarts.init(chartRef.current)
    const option = {
      backgroundColor: 'transparent',
      tooltip: { formatter: '{b}: {c}%' },
      radar: {
        radius: '72%',
        center: ['50%', '52%'],
        axisLine: { lineStyle: { color: 'rgba(0,255,65,0.18)' } },
        splitLine: { lineStyle: { color: 'rgba(0,255,65,0.1)' } },
        splitArea: { areaStyle: { color: ['transparent'] } },
        indicator: bioCopy.radarMetrics.map((item) => ({ name: item.name, max: 100, color: '#A9EFC2' })),
      },
      series: [
        {
          name: '风险评估',
          type: 'radar',
          lineStyle: { color: '#00FF41', width: 3 },
          areaStyle: { color: 'rgba(0,255,65,0.24)' },
          symbol: 'circle',
          symbolSize: 8,
          itemStyle: { color: '#FFAB00' },
          data: [{ value: bioCopy.radarMetrics.map((item) => item.value), name: '当前态势' }],
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
    <div className="rounded-[32px] border border-[#0d2d22] bg-[#00160f]/90 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 text-sm text-slate-300">
        <p className="uppercase tracking-[0.26em] text-[#9efac1]">生物风险雷达</p>
        <p className="mt-2 text-white text-lg font-semibold">传染、实验室、物种与生态四维评价</p>
      </div>
      <div ref={chartRef} className="h-[360px] w-full" />
    </div>
  )
}
