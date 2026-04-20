import React from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { Radar, RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, ResponsiveContainer } from 'recharts'
import { polarCopy } from '../data/polarData.js'

const radarData = polarCopy.radarMetrics.map((item) => ({ subject: item.name, A: item.value, fullMark: 100 }))

export function PolarRadarPanel() {
  return (
    <div className="rounded-[32px] border border-cyan-300/20 bg-[#06131f]/80 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 text-sm text-slate-300">
        <p className="uppercase tracking-[0.26em] text-cyan-200/70">极地安全雷达</p>
        <p className="mt-2 text-white text-lg font-semibold">五维评估：军事 / 资源 / 气候 / 主权 / 科研</p>
      </div>
      <div className="h-[340px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="80%">
            <PolarGrid stroke="rgba(56,182,255,0.18)" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#A4DCE2', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
            <Radar name="极地安全" dataKey="A" stroke="#00FFC3" fill="#00FFC3" fillOpacity={0.25} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export function TemperatureTrendChart() {
  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(4,12,20,0.95)',
      borderColor: '#0a1320',
      textStyle: { color: '#eaf7ff' },
    },
    xAxis: {
      type: 'category',
      data: polarCopy.temperatureSeries.map((item) => item.year),
      axisLine: { lineStyle: { color: '#113044' } },
      axisTick: { show: false },
      axisLabel: { color: '#A1CFE8', fontSize: 12 },
    },
    yAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      splitLine: { lineStyle: { color: 'rgba(56,182,255,0.12)' } },
      axisLabel: { color: '#A1CFE8', fontSize: 12, formatter: '{value}°C' },
    },
    grid: { left: '8%', right: '6%', top: '18%', bottom: '12%' },
    series: [
      {
        data: polarCopy.temperatureSeries.map((item) => item.anomaly),
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: { color: '#00FFC3', width: 3 },
        itemStyle: { color: '#7CDBFF', borderColor: '#00FFC3', borderWidth: 2 },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(0,255,195,0.28)' },
            { offset: 1, color: 'rgba(0,255,195,0)' },
          ]),
        },
      },
    ],
  }

  return (
    <div className="rounded-[32px] border border-cyan-300/20 bg-[#06131f]/80 p-6 shadow-glow backdrop-blur-xl">
      <div className="mb-6 text-sm text-slate-300">
        <p className="uppercase tracking-[0.26em] text-cyan-200/70">气温异常偏移</p>
        <p className="mt-2 text-white text-lg font-semibold">历史趋势与极地升温压力</p>
      </div>
      <div className="h-[340px] w-full">
        <ReactECharts option={option} style={{ width: '100%', height: '100%' }} />
      </div>
    </div>
  )
}
