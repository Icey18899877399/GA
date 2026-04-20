import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { threatFactors } from '../data/deepseaData.js'

export default function RadarChart() {
  const svgRef = useRef(null)

  useEffect(() => {
    const svg = d3.select(svgRef.current)
    svg.selectAll('*').remove()

    const width = 400
    const height = 400
    const radius = Math.min(width, height) / 2 - 40

    const g = svg
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const angleSlice = (Math.PI * 2) / threatFactors.length

    // Scales
    const rScale = d3.scaleLinear()
      .range([0, radius])
      .domain([0, 100])

    // Draw grid
    const levels = 5
    for (let level = 0; level < levels; level++) {
      const levelFactor = radius * ((level + 1) / levels)
      g.selectAll('.levels')
        .data(threatFactors)
        .enter()
        .append('line')
        .attr('x1', (d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2))
        .attr('y1', (d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2))
        .attr('x2', (d, i) => levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2))
        .attr('y2', (d, i) => levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2))
        .attr('class', 'line')
        .style('stroke', '#00F3FF')
        .style('stroke-opacity', 0.3)
        .style('stroke-width', '1px')
    }

    // Draw axes
    const axis = g.selectAll('.axis')
      .data(threatFactors)
      .enter()
      .append('g')
      .attr('class', 'axis')

    axis.append('line')
      .attr('x1', 0)
      .attr('y1', 0)
      .attr('x2', (d, i) => rScale(100) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y2', (d, i) => rScale(100) * Math.sin(angleSlice * i - Math.PI / 2))
      .attr('class', 'line')
      .style('stroke', '#00F3FF')
      .style('stroke-width', '1px')

    // Draw labels
    axis.append('text')
      .attr('class', 'legend')
      .style('font-size', '12px')
      .attr('text-anchor', 'middle')
      .attr('dy', '1.5em')
      .attr('x', (d, i) => rScale(110) * Math.cos(angleSlice * i - Math.PI / 2))
      .attr('y', (d, i) => rScale(110) * Math.sin(angleSlice * i - Math.PI / 2))
      .text(d => d.factor)
      .style('fill', '#00F3FF')

    // Draw data polygon
    const radarLine = d3.lineRadial()
      .radius(d => rScale(d.value))
      .angle((d, i) => i * angleSlice)
      .curve(d3.curveLinearClosed)

    g.append('path')
      .datum(threatFactors)
      .attr('d', radarLine)
      .style('stroke-width', '3px')
      .style('stroke', '#FF4B2B')
      .style('fill', '#FF4B2B')
      .style('fill-opacity', 0.1)
  }, [])

  return (
    <div className="bg-black/50 rounded-2xl border border-cyan-400/20 p-6">
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">海洋安全威胁因子</h3>
      <svg ref={svgRef} className="w-full h-96"></svg>
    </div>
  )
}