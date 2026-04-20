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
      tooltip: {
        trigger: 'item',
        backgroundColor: '#fff',
        borderColor: '#E5E4E0',
        textStyle: { color: '#1A1A1A' },
      },
      radar: {
        radius: '68%',
        center: ['50%', '54%'],
        splitNumber: 4,
        axisLine: { lineStyle: { color: '#E5E4E0' } },
        splitLine: { lineStyle: { color: '#E5E4E0' } },
        splitArea: { areaStyle: { color: ['transparent', 'rgba(77,187,213,0.03)'] } },
        indicator: threatMetrics.map((item) => ({
          name: item.name, max: 100, color: '#6B6B68',
        })),
        axisName: { fontSize: 11, color: '#6B6B68' },
      },
      series: [{
        name: '安全威胁',
        type: 'radar',
        lineStyle: { color: '#4DBBD5', width: 2 },
        areaStyle: { color: 'rgba(77,187,213,0.12)' },
        symbol: 'circle',
        symbolSize: 6,
        itemStyle: { color: '#E64B35', borderColor: '#fff', borderWidth: 2 },
        data: [{ value: threatMetrics.map((item) => item.value), name: '当前权重' }],
      }],
    }
    chart.setOption(option)
    const onResize = () => chart.resize()
    window.addEventListener('resize', onResize)
    return () => { window.removeEventListener('resize', onResize); chart.dispose() }
  }, [])

  return (
    <>
      <p className="section-label section-label-deepsea mb-2">安全威胁雷达</p>
      <h3 className="text-lg font-semibold text-ink mb-1">四维深海态势评估</h3>
      <div ref={chartRef} className="h-[320px] w-full" />
    </>
  )
}
