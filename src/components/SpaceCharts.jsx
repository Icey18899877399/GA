import React from 'react'
import ReactECharts from 'echarts-for-react'
import { orbitalGrowthData, orbitalAssetData } from '../data/spaceData.js'

const growthOptions = {
  tooltip: { trigger:'axis', backgroundColor:'#fff', borderColor:'#E5E4E0', textStyle:{color:'#1A1A1A'} },
  xAxis: { type:'category', boundaryGap:false, data:orbitalGrowthData.map(d=>d.year),
    axisLine:{lineStyle:{color:'#E5E4E0'}}, axisLabel:{color:'#6B6B68',fontSize:11} },
  yAxis: { type:'value', axisLine:{lineStyle:{color:'#E5E4E0'}},
    splitLine:{lineStyle:{color:'#E5E4E010'}}, axisLabel:{color:'#6B6B68',fontSize:11} },
  grid: { top:'15%', right:'5%', left:'8%', bottom:'10%' },
  series: [{
    name:'碎片数量', type:'line', smooth:true,
    areaStyle:{ color:{ type:'linear', x:0,y:0,x2:0,y2:1,
      colorStops:[{offset:0,color:'rgba(60,84,136,0.15)'},{offset:1,color:'rgba(60,84,136,0)'}] } },
    lineStyle:{color:'#3C5488',width:2.5},
    itemStyle:{color:'#3C5488',borderColor:'#fff',borderWidth:2},
    data:orbitalGrowthData.map(d=>d.value),
    markPoint:{
      symbol:'circle', symbolSize:10,
      data:orbitalGrowthData.filter(d=>d.event).map(d=>({value:d.event,xAxis:d.year,yAxis:d.value})),
      label:{color:'#E64B35',fontSize:10,formatter:'{b}'}, itemStyle:{color:'#E64B35',borderColor:'#fff',borderWidth:2},
    },
  }],
}

const assetOptions = {
  tooltip: { trigger:'item', backgroundColor:'#fff', borderColor:'#E5E4E0', textStyle:{color:'#1A1A1A'} },
  legend: { orient:'vertical', right:10, top:'center', textStyle:{color:'#6B6B68',fontSize:11} },
  series: [{
    name:'在轨资产', type:'pie', radius:['38%','60%'], center:['40%','50%'],
    avoidLabelOverlap:false,
    label:{ show:true, formatter:'{b}\n{d}%', color:'#1A1A1A', fontSize:11 },
    emphasis:{ itemStyle:{shadowBlur:8,shadowColor:'rgba(0,0,0,0.08)'} },
    labelLine:{ lineStyle:{color:'#D1D0CC'} },
    data:orbitalAssetData,
  }],
}

export default function SpaceCharts() {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
      <div className="card strip-space p-5">
        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="section-label section-label-space">碎片增长态势</p>
            <h3 className="mt-2 text-xl font-semibold text-ink">1957–2026 指数级增长</h3>
          </div>
          <span className="rounded-card border border-space/20 bg-space-light px-2.5 py-1 text-[10px] font-medium text-space">历史碰撞节点</span>
        </div>
        <ReactECharts option={growthOptions} style={{height:'300px',width:'100%'}} />
      </div>
      <div className="card strip-bio p-5">
        <div className="mb-5">
          <p className="section-label section-label-bio">在轨资产分布</p>
          <h3 className="mt-2 text-xl font-semibold text-ink">按任务类别分析</h3>
        </div>
        <ReactECharts option={assetOptions} style={{height:'300px',width:'100%'}} />
      </div>
    </div>
  )
}
