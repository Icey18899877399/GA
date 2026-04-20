import React from 'react'
import ReactECharts from 'echarts-for-react'
import { orbitalGrowthData, orbitalAssetData } from '../data/spaceData.js'

const growthOptions = {
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,6,19,0.95)',
    borderColor: '#00F3FF',
    textStyle: { color: '#fff' },
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: orbitalGrowthData.map((item) => item.year),
    axisLine: { lineStyle: { color: '#00F3FF60' } },
    axisLabel: { color: '#A6F5FF' },
  },
  yAxis: {
    type: 'value',
    axisLine: { lineStyle: { color: '#00F3FF40' } },
    splitLine: { lineStyle: { color: '#00F3FF10' } },
    axisLabel: { color: '#A6F5FF' },
  },
  grid: { top: '15%', right: '5%', left: '5%', bottom: '10%' },
  series: [
    {
      name: '碎片数量',
      type: 'line',
      smooth: true,
      areaStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: 'rgba(0,243,255,0.35)' },
            { offset: 1, color: 'rgba(255,75,43,0.02)' },
          ],
        },
      },
      lineStyle: { color: '#FF4B2B', width: 3 },
      itemStyle: { color: '#FF4B2B' },
      data: orbitalGrowthData.map((item) => item.value),
      markPoint: {
        symbol: 'circle',
        symbolSize: 12,
        data: orbitalGrowthData
          .filter((item) => item.event)
          .map((item) => ({ value: item.event, xAxis: item.year, yAxis: item.value })),
        label: { color: '#fff', fontSize: 12, formatter: '{b}' },
      },
    },
  ],
}

const assetOptions = {
  tooltip: {
    trigger: 'item',
    backgroundColor: 'rgba(0,6,19,0.95)',
    borderColor: '#00F3FF',
    textStyle: { color: '#fff' },
  },
  legend: {
    orient: 'vertical',
    right: 10,
    top: 'center',
    textStyle: { color: '#A6F5FF' },
  },
  series: [
    {
      name: '在轨资产',
      type: 'pie',
      radius: ['38%', '60%'],
      center: ['40%', '50%'],
      avoidLabelOverlap: false,
      label: {
        show: true,
        formatter: '{b}\n{d}%',
        color: '#fff',
        fontSize: 12,
      },
      emphasis: {
        itemStyle: { shadowBlur: 15, shadowColor: 'rgba(0,243,255,0.35)' },
      },
      labelLine: { lineStyle: { color: '#00F3FF40' } },
      data: orbitalAssetData,
    },
  ],
}

export default function SpaceCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <div className="rounded-[32px] border border-[#00F3FF33] bg-[#000205]/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[#A6F5FF]">碎片增长态势</p>
            <h3 className="mt-3 text-2xl font-semibold text-white">1957-2026 指数级增长</h3>
          </div>
          <span className="rounded-full border border-[#00F3FF44] bg-[#00F3FF]/10 px-3 py-1 text-xs text-[#A6F5FF]">历史碰撞节点</span>
        </div>
        <ReactECharts option={growthOptions} style={{ height: '320px', width: '100%' }} />
      </div>
      <div className="rounded-[32px] border border-[#FF4B2B33] bg-[#000205]/70 p-6 shadow-glow backdrop-blur-xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.32em] text-[#FF8B72]">在轨资产分布</p>
          <h3 className="mt-3 text-2xl font-semibold text-white">按任务类别分析</h3>
        </div>
        <ReactECharts option={assetOptions} style={{ height: '320px', width: '100%' }} />
      </div>
    </div>
  )
}
