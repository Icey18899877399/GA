import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { bioCopy } from '../data/bioData.js'

export default function BioRiskRadar() {
  const chartRef = useRef(null)

  useEffect(() => {
    if (!chartRef.current) return
    const chart = echarts.init(chartRef.current)
    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        formatter: '{b}: {c}%',
        backgroundColor: '#fff',
        borderColor: '#E5E4E0',
        textStyle: { color: '#1A1A1A' },
      },
      radar: {
        radius: '68%',
        center: ['50%', '54%'],
        axisLine: { lineStyle: { color: '#E5E4E0' } },
        splitLine: { lineStyle: { color: '#E5E4E0' } },
        splitArea: { areaStyle: { color: ['transparent', 'rgba(230,75,53,0.02)'] } },
        indicator: bioCopy.radarMetrics.map((item) => ({
          name: item.name, max: 100, color: '#6B6B68',
        })),
        axisName: { fontSize: 11, color: '#6B6B68' },
      },
      series: [{
        name: '风险评估',
        type: 'radar',
        lineStyle: { color: '#E64B35', width: 2 },
        areaStyle: { color: 'rgba(230,75,53,0.12)' },
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#E64B35', borderColor: '#fff', borderWidth: 2 },
        data: [{ value: bioCopy.radarMetrics.map((item) => item.value), name: '当前态势' }],
      }],
    }
    chart.setOption(option)
    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); chart.dispose() }
  }, [])

  return (
    <>
      <p className="section-label section-label-bio mb-2">生物风险雷达</p>
      <h3 className="text-lg font-semibold text-ink mb-1">传染、实验室、物种与生态四维评价</h3>
      <div ref={chartRef} className="h-[320px] w-full" />
    </>
  )
}
