import React from 'react'
import ReactECharts from 'echarts-for-react'
import * as echarts from 'echarts'
import { Radar, RadarChart, PolarAngleAxis, PolarRadiusAxis, PolarGrid, ResponsiveContainer } from 'recharts'
import { polarCopy } from '../data/polarData.js'

const radarData = polarCopy.radarMetrics.map(m => ({ subject: m.name, A: m.value, fullMark: 100 }))

export function PolarRadarPanel() {
  return (
    <>
      <p className="section-label section-label-polar mb-2">极地安全雷达</p>
      <h3 className="text-lg font-semibold text-ink mb-1">五维评估：军事 / 资源 / 气候 / 主权 / 科研</h3>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData} outerRadius="78%">
            <PolarGrid stroke="#E5E4E0" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: '#6B6B68', fontSize: 11 }} />
            <PolarRadiusAxis angle={30} domain={[0,100]} tick={false} axisLine={false} />
            <Radar name="极地安全" dataKey="A" stroke="#00A087" fill="#00A087" fillOpacity={0.15} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}

export function TemperatureTrendChart() {
  const option = {
    backgroundColor: 'transparent',
    tooltip: { trigger:'axis', backgroundColor:'#fff', borderColor:'#E5E4E0', textStyle:{color:'#1A1A1A'} },
    xAxis: { type:'category', data:polarCopy.temperatureSeries.map(d=>d.year), axisLine:{lineStyle:{color:'#E5E4E0'}}, axisTick:{show:false}, axisLabel:{color:'#6B6B68',fontSize:11} },
    yAxis: { type:'value', axisLine:{show:false}, axisTick:{show:false}, splitLine:{lineStyle:{color:'#E5E4E020'}}, axisLabel:{color:'#6B6B68',fontSize:11,formatter:'{value}°C'} },
    grid: { left:'8%', right:'6%', top:'15%', bottom:'12%' },
    series: [{
      data: polarCopy.temperatureSeries.map(d=>d.anomaly), type:'line', smooth:true,
      symbol:'circle', symbolSize:5,
      lineStyle:{color:'#00A087',width:2.5},
      itemStyle:{color:'#00A087',borderColor:'#fff',borderWidth:2},
      areaStyle:{ color:new echarts.graphic.LinearGradient(0,0,0,1,[{offset:0,color:'rgba(0,160,135,0.12)'},{offset:1,color:'rgba(0,160,135,0)'}]) },
    }],
  }
  return (
    <>
      <p className="section-label section-label-polar mb-2">气温异常偏移</p>
      <h3 className="text-lg font-semibold text-ink mb-1">历史趋势与极地升温压力</h3>
      <div className="h-[300px] w-full">
        <ReactECharts option={option} style={{width:'100%',height:'100%'}} />
      </div>
    </>
  )
}
