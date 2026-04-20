import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { threatFactors } from '../data/deepseaData.js'

export default function RadarChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 400, height = 400, radius = Math.min(width,height)/2-40
    const g = svg.attr('width',width).attr('height',height).append('g').attr('transform',`translate(${width/2},${height/2})`)
    const angleSlice = (Math.PI*2)/threatFactors.length
    const rScale = d3.scaleLinear().range([0,radius]).domain([0,100])

    /* Grid rings */
    for(let lv=0;lv<5;lv++){
      const f=radius*((lv+1)/5)
      g.selectAll(`.level-${lv}`).data(threatFactors).enter().append('line')
        .attr('x1',(d,i)=>f*Math.cos(angleSlice*i-Math.PI/2))
        .attr('y1',(d,i)=>f*Math.sin(angleSlice*i-Math.PI/2))
        .attr('x2',(d,i)=>f*Math.cos(angleSlice*(i+1)-Math.PI/2))
        .attr('y2',(d,i)=>f*Math.sin(angleSlice*(i+1)-Math.PI/2))
        .style('stroke','#E5E4E0').style('stroke-width','1px')
    }

    /* Axes */
    const axis = g.selectAll('.axis').data(threatFactors).enter().append('g')
    axis.append('line')
      .attr('x1',0).attr('y1',0)
      .attr('x2',(d,i)=>rScale(100)*Math.cos(angleSlice*i-Math.PI/2))
      .attr('y2',(d,i)=>rScale(100)*Math.sin(angleSlice*i-Math.PI/2))
      .style('stroke','#D1D0CC').style('stroke-width','1px')

    /* Labels */
    axis.append('text')
      .style('font-size','11px').attr('text-anchor','middle').attr('dy','1.5em')
      .attr('x',(d,i)=>rScale(115)*Math.cos(angleSlice*i-Math.PI/2))
      .attr('y',(d,i)=>rScale(115)*Math.sin(angleSlice*i-Math.PI/2))
      .text(d=>d.factor).style('fill','#6B6B68').style('font-weight','500')

    /* Data polygon */
    const radarLine = d3.lineRadial().radius(d=>rScale(d.value)).angle((d,i)=>i*angleSlice).curve(d3.curveLinearClosed)
    g.append('path').datum(threatFactors).attr('d',radarLine)
      .style('stroke-width','2px').style('stroke','#4DBBD5').style('fill','#4DBBD5').style('fill-opacity',0.1)

    /* Dots */
    threatFactors.forEach((d,i)=>{
      g.append('circle')
        .attr('cx',rScale(d.value)*Math.cos(angleSlice*i-Math.PI/2))
        .attr('cy',rScale(d.value)*Math.sin(angleSlice*i-Math.PI/2))
        .attr('r',3.5).style('fill','#E64B35').style('stroke','#fff').style('stroke-width','2px')
    })
  }, [])

  return (
    <div className="card strip-deepsea p-5">
      <p className="section-label section-label-deepsea mb-2">威胁因子</p>
      <h3 className="text-lg font-semibold text-ink mb-4">海洋安全威胁评估</h3>
      <svg ref={svgRef} className="w-full" viewBox="0 0 400 400" />
    </div>
  )
}
